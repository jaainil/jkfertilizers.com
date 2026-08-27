/**
 * Multi-Feature Confidence Estimator & Adaptive Decision Gate
 * (jkfertilizers.com)
 */

import { RAG_CONFIG } from './config';
import type { SearchResult, ConfidenceFeatures, QueryIntent } from './types';

/**
 * Estimates confidence and determines whether to fast-track, generate, or refuse
 */
export function estimateConfidence(
  results: SearchResult[],
  intent: QueryIntent,
  query: string
): ConfidenceFeatures {
  if (results.length === 0) {
    return {
      topVectorScore: 0,
      vectorMargin: 0,
      keywordAgreement: false,
      intentMatch: false,
      isRefusal: true,
      isDecisive: false,
      reason: 'No candidate documents retrieved.',
    };
  }

  const top1 = results[0];
  const top2 = results[1];

  const topVectorScore = top1.vectorScore ?? top1.score;
  const rank2Score = top2 ? (top2.vectorScore ?? top2.score) : 0;
  const vectorMargin = topVectorScore - rank2Score;

  const keywordAgreement = (top1.keywordScore || 0) > 0;
  const intentMatch =
    (intent === 'product' && top1.type === 'product') ||
    (intent === 'service' && top1.type === 'service') ||
    (intent === 'company' && top1.type === 'page') ||
    (intent === 'blog_agronomy' && top1.type === 'blog') ||
    intent === 'specifications' ||
    intent === 'pricing_commercial' ||
    intent === 'application' ||
    intent === 'manufacturing_b2b';

  // 1. Check for Early Refusal (Out of domain query)
  const isRefusal =
    (intent === 'general' && !keywordAgreement && topVectorScore < 0.58) ||
    (topVectorScore < 0.48 && !keywordAgreement);

  // 2. Check for Decisive Match
  const decisiveThreshold = RAG_CONFIG.retrieval.decisiveSimilarityThreshold; // ~0.65
  const isDecisive =
    topVectorScore >= decisiveThreshold ||
    (topVectorScore >= 0.52 && vectorMargin >= RAG_CONFIG.retrieval.marginThreshold) ||
    (keywordAgreement && topVectorScore >= 0.50);

  return {
    topVectorScore,
    vectorMargin,
    keywordAgreement,
    intentMatch,
    isRefusal,
    isDecisive,
    reason: isRefusal
      ? 'Score below domain threshold and no agricultural keyword agreement.'
      : isDecisive
      ? 'High confidence decisive match.'
      : 'Standard multi-source match.',
  };
}

export const OUT_OF_DOMAIN_ANSWER =
  "I couldn't find sufficient information regarding your question in the J K Fertilizers knowledge base.\n\n" +
  "I specialize in **J K Fertilizers** organic products (such as **PROM**, **PDM**, **Organic Manure**, **Mycorrhiza bio-fertilizers**, **Coated Base Granules**), chemical specifications, FCO compliance, crop dosage guidelines, and B2B manufacturing capabilities (700 MT/day plant in Anand, Gujarat).\n\n" +
  "Feel free to ask about our fertilizer formulations, application methods, or contact our sales desk at **sales@jkfertilizers.com** / **+91 98250 45894**.";
