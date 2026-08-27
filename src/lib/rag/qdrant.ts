/**
 * Qdrant Cloud Storage & Vector Search Client
 * (jkfertilizers.com)
 */

import { QdrantClient } from '@qdrant/js-client-rest';
import { RAG_CONFIG } from './config';
import type { DocumentChunk, SearchResult } from './types';

let qdrantClientInstance: QdrantClient | null = null;

export function getQdrantClient(): QdrantClient {
  if (!qdrantClientInstance) {
    qdrantClientInstance = new QdrantClient({
      url: RAG_CONFIG.qdrant.url,
      apiKey: RAG_CONFIG.qdrant.apiKey,
      checkCompatibility: false,
    });
  }
  return qdrantClientInstance;
}

/**
 * Generate a deterministic UUID string from a string key
 */
export function generatePointId(key: string): string {
  let hash1 = 5381;
  let hash2 = 52711;
  for (let i = 0; i < key.length; i++) {
    const char = key.charCodeAt(i);
    hash1 = (hash1 * 33) ^ char;
    hash2 = (hash2 * 33) ^ char;
  }
  const hex1 = Math.abs(hash1).toString(16).padStart(16, '0');
  const hex2 = Math.abs(hash2).toString(16).padStart(16, '0');
  const fullHex = hex1 + hex2;
  return `${fullHex.slice(0, 8)}-${fullHex.slice(8, 12)}-4${fullHex.slice(13, 16)}-a${fullHex.slice(17, 20)}-${fullHex.slice(20, 32)}`;
}

/**
 * Ensure collection exists in Qdrant with proper vector dimensions and payload indexes
 * Dimension must be supplied explicitly (measured from the active embedding provider).
 */
export async function ensureCollection(dimension: number): Promise<void> {
  if (!dimension || dimension <= 0) {
    throw new Error('[qdrant] ensureCollection requires a valid positive vector dimension');
  }
  const client = getQdrantClient();
  const collectionName = RAG_CONFIG.qdrant.collectionName;

  try {
    const collectionsRes = await client.getCollections();
    const exists = collectionsRes.collections.some((c) => c.name === collectionName);

    if (!exists) {
      console.log(`[qdrant] Creating collection "${collectionName}" with dimension ${dimension} (Cosine)...`);
      await client.createCollection(collectionName, {
        vectors: {
          size: dimension,
          distance: 'Cosine',
        },
        optimizers_config: {
          default_segment_number: 2,
        },
      });

      // Create payload indexes for fast filtering
      try {
        await client.createPayloadIndex(collectionName, {
          field_name: 'category',
          field_schema: 'keyword',
        });
        await client.createPayloadIndex(collectionName, {
          field_name: 'type',
          field_schema: 'keyword',
        });
        await client.createPayloadIndex(collectionName, {
          field_name: 'url',
          field_schema: 'keyword',
        });
      } catch (e) {
        // Payload index creation can be async or already present
      }
      console.log(`[qdrant] Collection "${collectionName}" created successfully!`);
    } else {
      // Check dimension of existing collection
      const collectionInfo = await client.getCollection(collectionName);
      const currentSize =
        typeof collectionInfo.config.params.vectors === 'object' &&
        'size' in collectionInfo.config.params.vectors
          ? collectionInfo.config.params.vectors.size
          : null;

      if (currentSize && currentSize !== dimension) {
        console.warn(`[qdrant] Dimension mismatch (existing: ${currentSize}, required: ${dimension}). Recreating collection...`);
        await client.deleteCollection(collectionName);
        await ensureCollection(dimension);
      }
    }
  } catch (err) {
    console.error('[qdrant] Error checking/creating collection:', err);
    throw err;
  }
}

/**
 * Upsert chunks into Qdrant in batches
 */
export async function upsertChunks(chunks: DocumentChunk[]): Promise<number> {
  if (chunks.length === 0) return 0;
  const client = getQdrantClient();
  const collectionName = RAG_CONFIG.qdrant.collectionName;

  const points = chunks.map((chunk) => {
    const pointId = generatePointId(`${chunk.url}#${chunk.chunkIndex}#${chunk.heading}`);
    return {
      id: pointId,
      vector: chunk.embedding || [],
      payload: {
        url: chunk.url,
        title: chunk.title,
        heading: chunk.heading,
        chunkIndex: chunk.chunkIndex,
        content: chunk.content,
        category: chunk.category,
        type: chunk.type,
        contentHash: chunk.contentHash,
        metadata: chunk.metadata || {},
        updatedAt: new Date().toISOString(),
      },
    };
  });

  const BATCH_SIZE = 40;
  let totalUpserted = 0;

  for (let i = 0; i < points.length; i += BATCH_SIZE) {
    const batch = points.slice(i, i + BATCH_SIZE);
    await client.upsert(collectionName, {
      wait: true,
      points: batch,
    });
    totalUpserted += batch.length;
  }

  return totalUpserted;
}

/**
 * Search Qdrant by query vector with optional filtering using modern Universal Query API
 */
export async function searchQdrant(
  queryVector: number[],
  limit: number = RAG_CONFIG.retrieval.topK * 2,
  filterType?: string
): Promise<SearchResult[]> {
  const client = getQdrantClient();
  const collectionName = RAG_CONFIG.qdrant.collectionName;

  try {
    const filter = filterType
      ? {
          must: [
            {
              key: 'type',
              match: {
                value: filterType,
              },
            },
          ],
        }
      : undefined;

    const response = await client.query(collectionName, {
      query: queryVector,
      limit,
      filter,
      with_payload: true,
    });

    const points = response.points || [];

    return points.map((item) => {
      const payload = item.payload || {};
      return {
        id: String(item.id),
        url: String(payload.url || ''),
        title: String(payload.title || ''),
        heading: String(payload.heading || ''),
        category: (payload.category as any) || 'Product',
        type: (payload.type as any) || 'product',
        content: String(payload.content || ''),
        score: item.score,
        vectorScore: item.score,
        metadata: (payload.metadata as Record<string, unknown>) || {},
      };
    });
  } catch (err) {
    console.error('[qdrant] Search error:', err);
    return [];
  }
}

/**
 * Get Collection Statistics
 */
export async function getCollectionStats(): Promise<{
  pointsCount: number;
  status: string;
  vectorsCount?: number;
}> {
  const client = getQdrantClient();
  const collectionName = RAG_CONFIG.qdrant.collectionName;

  try {
    const info = await client.getCollection(collectionName);
    return {
      pointsCount: info.points_count || 0,
      status: info.status,
      vectorsCount: (info as any).vectors_count || info.points_count || 0,
    };
  } catch (err) {
    return { pointsCount: 0, status: 'not_found' };
  }
}
