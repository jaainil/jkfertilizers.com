/**
 * Neural Reranker Integration using OpenRouter
 * Single model (pinned in .env -> RERANK_MODEL): nvidia/llama-nemotron-rerank-vl-1b-v2:free
 * On rerank failure the original hybrid-score order is kept as-is (no reorder).
 */

import { RAG_CONFIG } from './config';
import type { SearchResult } from './types';

export interface RerankResult {
  results: SearchResult[];
  reranked: boolean;
  model: string;
  durationMs: number;
}

/**
 * Re-ranks candidate documents using the configured OpenRouter reranker
 */
export async function rerankCandidates(
  query: string,
  candidates: SearchResult[],
  topN: number = 4
): Promise<RerankResult> {
  const startTime = Date.now();
  const keepOrder = () => ({
    results: candidates.slice(0, topN),
    reranked: false,
    model: 'hybrid-order',
    durationMs: Date.now() - startTime,
  });

  if (candidates.length <= 1 || !RAG_CONFIG.llm.openRouterApiKey) {
    return keepOrder();
  }

  const model = RAG_CONFIG.retrieval.rerankModel;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4500);

    const documents = candidates.map((c) => ({
      text: `${c.title} > ${c.heading || 'Overview'}\n${c.content.slice(0, 500)}`,
    }));

    const response = await fetch('https://openrouter.ai/api/v1/rerank', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RAG_CONFIG.llm.openRouterApiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://jkfertilizers.com',
        'X-OpenRouter-Title': 'JK Fertilizers RAG',
      },
      body: JSON.stringify({
        model,
        query,
        documents,
        top_n: topN,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      console.warn(`[rerank] OpenRouter rerank failed (${response.status}). Keeping hybrid order.`);
      return keepOrder();
    }

    const data = await response.json();
    const rankedIndices: Array<{ index: number; score: number }> = (data.results || []).map((r: any) => ({
      index: typeof r.index === 'number' ? r.index : 0,
      score: typeof r.relevance_score === 'number' ? r.relevance_score : 0,
    }));

    if (rankedIndices.length === 0) return keepOrder();

    const rerankedList: SearchResult[] = [];
    const seenIndices = new Set<number>();

    for (const item of rankedIndices) {
      const doc = candidates[item.index];
      if (doc && !seenIndices.has(item.index)) {
        seenIndices.add(item.index);
        rerankedList.push({
          ...doc,
          score: Math.max(doc.score, item.score),
        });
      }
    }

    // Append any omitted candidates in original order
    candidates.forEach((c, idx) => {
      if (!seenIndices.has(idx) && rerankedList.length < topN) {
        rerankedList.push(c);
      }
    });

    return {
      results: rerankedList.slice(0, topN),
      reranked: true,
      model,
      durationMs: Date.now() - startTime,
    };
  } catch (err: any) {
    console.warn('[rerank] Neural reranking error:', err?.message || err);
    return keepOrder();
  }
}
