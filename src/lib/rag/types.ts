/**
 * Types & Schemas for J K Fertilizers RAG Engine
 * (jkfertilizers.com)
 */

export type DocumentCategory =
  | 'Product'
  | 'Service'
  | 'Blog'
  | 'Company'
  | 'Agronomy'
  | 'Policy'
  | 'Commercial';

export type DocumentType = 'product' | 'service' | 'blog' | 'page' | 'guide';

export type QueryIntent =
  | 'product'
  | 'service'
  | 'specifications'
  | 'application'
  | 'manufacturing_b2b'
  | 'pricing_commercial'
  | 'company'
  | 'blog_agronomy'
  | 'general';

export interface DocumentRecord {
  id?: string | number;
  url: string;
  title: string;
  type: DocumentType;
  category: DocumentCategory;
  description?: string;
  tags?: string[];
  sourceHash?: string;
  publishedAt?: string;
  indexedAt?: string;
  isPrivate?: boolean;
}

export interface DocumentChunk {
  id?: string;
  documentId?: string | number;
  url: string;
  title: string;
  heading: string;
  chunkIndex: number;
  content: string;
  contentHash?: string;
  category: DocumentCategory;
  type: DocumentType;
  metadata?: Record<string, unknown>;
  embedding?: number[];
  embeddingModel?: string;
  embeddingDimension?: number;
}

export interface SearchResult {
  id: string;
  url: string;
  title: string;
  heading: string;
  category: DocumentCategory;
  type: DocumentType;
  content: string;
  score: number; // 0.0 - 1.0 similarity score
  vectorScore?: number;
  keywordScore?: number;
  metadata?: Record<string, unknown>;
}

export interface SourceCitation {
  id: number;
  url: string;
  title: string;
  heading?: string;
  category?: string;
  snippet: string;
  score: number;
}

export interface ConfidenceFeatures {
  topVectorScore: number;
  vectorMargin: number;
  keywordAgreement: boolean;
  intentMatch: boolean;
  isRefusal: boolean;
  isDecisive: boolean;
  reason: string;
}

export interface RAGResponse {
  answer: string;
  sources: SourceCitation[];
  confidence: number;
  intent: QueryIntent;
  model: string;
  latencyMs: number;
  path: 'INSTANT_RAIL' | 'EARLY_REFUSAL' | 'FAST_PATH' | 'HYBRID_RETRIEVAL' | 'STATIC_FALLBACK';
  cached?: boolean;
}

export interface IngestionStats {
  documentsIndexed: number;
  chunksCreated: number;
  skippedUnchanged: number;
  durationMs: number;
}
