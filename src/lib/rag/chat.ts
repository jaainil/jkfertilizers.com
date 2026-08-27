/**
 * Main RAG Pipeline Orchestrator & Citation Engine for J K Fertilizers
 * (jkfertilizers.com)
 */

import {
  normalizeInput,
  isInjectionAttempt,
  isIdentityQuestion,
  getIdentityAnswer,
  INJECTION_ANSWER,
  redactPii,
} from './guardrails';
import { hybridSearch } from './search';
import { estimateConfidence, OUT_OF_DOMAIN_ANSWER } from './confidence';
import { generateAnswer } from './llm';
import { rerankCandidates } from './rerank';
import { RAG_CONFIG } from './config';
import type { RAGResponse, SourceCitation, SearchResult } from './types';

const SYSTEM_PROMPT = `You are the J K Fertilizers AI Assistant representing J K Fertilizers (jkfertilizers.com), an organic fertilizer and granule manufacturer based in Vasad, Anand, Gujarat (operating since 2006 under Founder & Director Mr. Akash Dadhania).

Core Company Facts:
- Facility: Western India's premier rotary drum granulation complex with 700 MT/day processing capacity and 100,000+ sq. ft. covered warehousing on NH-48 (Vasad, Anand, Gujarat).
- Compliance: 100% Fertilizer Control Order (FCO 1985 Schedule IV) approved formulations with in-house batch QC testing (moisture, crushing strength, NPK assays).
- Core Products:
  * PROM (Phosphate Rich Organic Manure): FCO approved, min. 10.4% Total P2O5, min. 7.9% Organic Carbon, C:N < 20:1, zero phosphorus fixation in alkaline soils.
  * PDM (Potash Derived from Molasses): FCO approved, min. 14.5% K2O, min. 16% Organic Carbon, eco-friendly MOP alternative.
  * Organic Manure: Composted humic matrix restoring soil organic carbon.
  * Mycorrhiza Bio-Fertilizer Granules: 100 IP/gm VAM living fungal inoculants for root expansion.
  * Coated & Base Granules: Bio NPK Coated, Mycorrhiza Coated, Pancharatna 5-in-1, Plant Available Silica, Diatomite Silicon, Humic Granules.
- B2B Services: Granule Technology, Toll / Job-Work Manufacturing, Custom Private-Label Packaging (1 kg to 1,000 kg jumbo bags), Infrastructure Leasing & Storage.
- Commercial Contacts: sales@jkfertilizers.com, info@jkfertilizers.com | Phone: +91 98250 45894.

Grounding & Citation Rules:
1. Every factual statement must cite its supporting source using [SOURCE: N] tags (e.g. [SOURCE: 1]).
2. Do not invent markdown links or URLs yourself. The system automatically converts [SOURCE: N] into verified links.
3. Rely strictly on the provided context excerpts. Do not fabricate chemical values, certifications, or unmentioned claims.
4. If a question is outside J K Fertilizers products, agronomy, or manufacturing services, politely decline.
5. Provide clear, structured, professional answers with bullet points and bold headers where appropriate.`;

/**
 * Executes the complete RAG pipeline for a user question
 */
export async function askRag(
  query: string,
  options: { filterType?: string } = {}
): Promise<RAGResponse> {
  const startTime = Date.now();

  // 1. Stage 0: Input Guardrails & Normalization
  const cleanedInput = normalizeInput(query);
  if (!cleanedInput || cleanedInput.length < 2) {
    return {
      answer: "Please enter a valid question regarding J K Fertilizers' products, specifications, or services.",
      sources: [],
      confidence: 0,
      intent: 'general',
      model: 'deterministic-guardrail',
      latencyMs: Date.now() - startTime,
      path: 'INSTANT_RAIL',
    };
  }

  // 1.1 Check Prompt Injection
  if (isInjectionAttempt(cleanedInput)) {
    return {
      answer: INJECTION_ANSWER,
      sources: [],
      confidence: 1.0,
      intent: 'general',
      model: 'injection-rail',
      latencyMs: Date.now() - startTime,
      path: 'INSTANT_RAIL',
    };
  }

  // 1.2 Check Identity Meta-Questions
  if (isIdentityQuestion(cleanedInput)) {
    return {
      answer: getIdentityAnswer(),
      sources: [
        {
          id: 1,
          url: '/about',
          title: 'About J K Fertilizers',
          snippet: 'Company background, leadership under Mr. Akash Dadhania, and 700 MT/day facility in Anand, Gujarat.',
          score: 1.0,
        },
      ],
      confidence: 1.0,
      intent: 'company',
      model: 'identity-rail',
      latencyMs: Date.now() - startTime,
      path: 'INSTANT_RAIL',
    };
  }

  // 2. Hybrid Retrieval
  let retrieval;
  try {
    retrieval = await hybridSearch(cleanedInput, {
      filterType: options.filterType,
      limit: RAG_CONFIG.retrieval.topK * 2,
    });
  } catch (err: any) {
    // Embedding/search provider outage (e.g. rate limit) — degrade honestly instead of crashing
    console.error('[chat] Retrieval failed:', err?.message || err);
    return {
      answer:
        'Our AI assistant is temporarily unable to reach its knowledge base. Please try again in a moment, or contact **sales@jkfertilizers.com** / **+91 98250 45894** for immediate assistance.',
      sources: [],
      confidence: 0,
      intent: 'general',
      model: 'retrieval-outage',
      latencyMs: Date.now() - startTime,
      path: 'INSTANT_RAIL',
    };
  }
  const { results, intent } = retrieval;

  // 3. Multi-Feature Confidence Estimation
  const confidence = estimateConfidence(results, intent, cleanedInput);

  // 3.1 Early Refusal Gate (<50ms, 0 tokens)
  if (confidence.isRefusal || results.length === 0) {
    return {
      answer: OUT_OF_DOMAIN_ANSWER,
      sources: [],
      confidence: confidence.topVectorScore,
      intent,
      model: 'confidence-gate',
      latencyMs: Date.now() - startTime,
      path: 'EARLY_REFUSAL',
    };
  }

  // 4. Adaptive Fast-Path / Deep-Path (Neural Reranker)
  let candidateSources = results.slice(0, 4);
  let executionPath: 'FAST_PATH' | 'HYBRID_RETRIEVAL' = 'FAST_PATH';

  if (!confidence.isDecisive && results.length > 2) {
    // Deep-Path: Route through OpenRouter Nvidia Nemotron Reranker
    const rerankOutcome = await rerankCandidates(cleanedInput, results, 4);
    candidateSources = rerankOutcome.results;
    executionPath = 'HYBRID_RETRIEVAL';
  }

  // 5. Candidate Source Formatting
  const contextBlocks = candidateSources
    .map((s, idx) => `[SOURCE: ${idx + 1}] Document: ${s.title} (${s.url})\n${s.content}`)
    .join('\n\n---\n\n');

  const userPrompt = `User Question: "${cleanedInput}"\n\nVerified Knowledge Base Excerpts:\n${contextBlocks}\n\nPlease provide a clear, accurate, and grounded response citing sources as [SOURCE: N].`;

  // 6. LLM Generation (Gemini)
  const { text: rawAnswer, model } = await generateAnswer({
    systemPrompt: SYSTEM_PROMPT,
    userPrompt,
  });

  // 7. Post-Generation Output Guardrails & Safety
  let safeAnswer = rawAnswer;
  safeAnswer = redactPii(safeAnswer);

  // 8. Citation Formatting & Phantom Stripping
  const { formattedAnswer, verifiedSources } = formatCitations(safeAnswer, candidateSources);

  const latencyMs = Date.now() - startTime;

  return {
    answer: formattedAnswer,
    sources: verifiedSources,
    confidence: confidence.topVectorScore,
    intent,
    model,
    latencyMs,
    path: executionPath,
  };
}

/**
 * Formats [SOURCE: N] citations into markdown links and removes phantom citations
 */
export function formatCitations(
  text: string,
  sources: SearchResult[]
): {
  formattedAnswer: string;
  verifiedSources: SourceCitation[];
} {
  const verifiedSources: SourceCitation[] = sources.map((s, idx) => ({
    id: idx + 1,
    url: s.url,
    title: s.title,
    heading: s.heading,
    category: s.category,
    snippet: s.content.replace(/^\[[^\]]+\] > \[[^\]]+\]\s*/g, '').slice(0, 200) + '...',
    score: Number((s.score || 0).toFixed(3)),
  }));

  const formattedAnswer = text.replace(/\[SOURCE:\s*(\d+(?:\s*,\s*\d+)*)\]/gi, (match, list: string) => {
    const parts = list.split(',').map((n) => parseInt(n.trim(), 10));
    const converted = parts
      .map((idx) => {
        const source = verifiedSources[idx - 1];
        return source ? `[[${idx}]](${source.url})` : '';
      })
      .filter(Boolean);
    if (converted.length === 0) return '';
    return converted.length === 1 ? converted[0] : `(${converted.join(', ')})`;
  });

  return {
    formattedAnswer: formattedAnswer.replace(/\s{2,}/g, ' ').trim(),
    verifiedSources,
  };
}
