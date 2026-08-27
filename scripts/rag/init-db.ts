#!/usr/bin/env node
/**
 * Initialize Qdrant Cloud Collection & Payload Indexes
 * Usage: npx tsx scripts/rag/init-db.ts  OR  bun scripts/rag/init-db.ts
 */

import { ensureCollection, getCollectionStats, getQdrantClient } from '../../src/lib/rag/qdrant';
import { RAG_CONFIG } from '../../src/lib/rag/config';
import { measureEmbeddingDimension } from '../../src/lib/rag/embeddings';

async function main() {
  console.log('────────────────────────────────────────────────────────');
  console.log('🌱 J K FERTILIZERS RAG — QDRANT INITIALIZATION');
  console.log('────────────────────────────────────────────────────────');
  console.log(`Endpoint:   ${RAG_CONFIG.qdrant.url}`);
  console.log(`Collection: ${RAG_CONFIG.qdrant.collectionName}`);

  console.log('\n[1/3] Probing embedding dimension...');
  let dimension: number;
  try {
    dimension = await measureEmbeddingDimension();
  } catch (err: any) {
    console.error(
      `❌ Could not resolve embedding dimension: ${err?.message || err}\n` +
        `   Check OPENWEBUI_BASE_URL / OPENWEBUI_API_KEY and that the embedding model is running\n`
    );
    process.exit(1);
  }
  console.log(`Embedding:  ${RAG_CONFIG.embedding.model} (dim: ${dimension})`);

  console.log('\n[2/3] Connecting to Qdrant Cloud and verifying schema...');
  await ensureCollection(dimension);

  console.log('\n[3/3] Fetching collection statistics...');
  const stats = await getCollectionStats();
  console.log('Collection Status:', stats.status);
  console.log('Points Count:     ', stats.pointsCount);

  console.log('\n✅ Qdrant database initialized successfully!');
  console.log('Run "npm run rag:index" to ingest product and agronomy content.\n');
}

main().catch((err) => {
  console.error('❌ Database initialization failed:', err);
  process.exit(1);
});
