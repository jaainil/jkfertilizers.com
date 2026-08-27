/**
 * Hybrid Search & Vector Retrieval Engine for J K Fertilizers
 * (jkfertilizers.com)
 */

import { embedQuery } from './embeddings';
import { searchQdrant } from './qdrant';
import { classifyIntent, extractKeyTerms } from './intent';
import { RAG_CONFIG } from './config';
import type { SearchResult, QueryIntent } from './types';

export interface SearchOptions {
  limit?: number;
  filterType?: string;
  minScore?: number;
}

/**
 * Normalizes query string for uniform matching
 */
export function normalizeQuery(query: string): string {
  return query
    .toLowerCase()
    .trim()
    .replace(/[?!.,;:]+$/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Perform hybrid semantic retrieval with keyword boosting
 */
export async function hybridSearch(
  query: string,
  options: SearchOptions = {}
): Promise<{
  results: SearchResult[];
  intent: QueryIntent;
  queryVector: number[];
}> {
  const cleanQuery = normalizeQuery(query);
  const intent = classifyIntent(cleanQuery);
  const keyTerms = extractKeyTerms(cleanQuery);

  const limit = options.limit || RAG_CONFIG.retrieval.topK * 2;
  const minScore = options.minScore || RAG_CONFIG.retrieval.minSimilarityThreshold;

  // 1. Generate query vector (RETRIEVAL_QUERY task type)
  const queryVector = await embedQuery(cleanQuery);

  // 2. Vector Search in Qdrant
  const rawResults = await searchQdrant(queryVector, limit * 2, options.filterType);

  // 3. Keyword and Direct Slug Re-Scoring
  const rescored = rawResults.map((item) => {
    let boost = 0;
    const contentLower = item.content.toLowerCase();
    const titleLower = item.title.toLowerCase();
    const urlLower = item.url.toLowerCase();

    // Direct product / service slug matches
    const productSlugs = [
      'prom',
      'pdm',
      'organic-manure',
      'mycorrhiza-granules-biofertilizers',
      'coated-base-granules-bio-npk',
      'coated-base-granules-mycorrhiza',
      'pancharatna-base-granules',
      'plant-available-silica',
      'diatomite-silicon',
      'humic-based-granules',
      'organic-carbon-base-granules',
      'customized-base-granules',
      'customized-coated-granules',
      'enriched-base-granules',
      'other-nutrients-base-granules',
      'base-granules',
    ];

    const serviceSlugs = [
      'granule-technology',
      'job-work-services',
      'custom-packaging-solutions',
      'infrastructure-leasing',
      'warehouse-storage',
    ];

    for (const slug of productSlugs) {
      const slugClean = slug.replace(/-/g, ' ');
      if (cleanQuery.includes(slugClean) || cleanQuery.includes(slug)) {
        if (urlLower.includes(slug)) {
          boost += 0.25;
        }
      }
    }

    for (const slug of serviceSlugs) {
      const slugClean = slug.replace(/-/g, ' ');
      if (cleanQuery.includes(slugClean) || cleanQuery.includes(slug)) {
        if (urlLower.includes(slug)) {
          boost += 0.25;
        }
      }
    }

    // Check exact key terms
    for (const term of keyTerms) {
      if (titleLower.includes(term)) {
        boost += 0.12;
      } else if (contentLower.includes(term)) {
        boost += 0.05;
      }
    }

    // Intent alignment boost
    if (intent === 'product' && item.type === 'product') boost += 0.06;
    if (intent === 'service' && item.type === 'service') boost += 0.06;
    if (intent === 'company' && item.type === 'page') boost += 0.06;
    if (intent === 'blog_agronomy' && item.type === 'blog') boost += 0.06;
    if (intent === 'specifications' && (contentLower.includes('specification') || titleLower.includes('specification'))) boost += 0.08;

    const finalScore = Math.min(1.0, (item.vectorScore || item.score) + boost);

    return {
      ...item,
      score: finalScore,
      keywordScore: boost,
    };
  });

  // Sort by finalScore descending
  rescored.sort((a, b) => b.score - a.score);

  // Filter out very low quality results
  const filtered = rescored.filter((r) => r.score >= minScore);

  return {
    results: filtered.slice(0, limit),
    intent,
    queryVector,
  };
}
