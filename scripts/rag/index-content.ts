#!/usr/bin/env node
/**
 * Ingest & Index All Products, Services, Blogs & Pages into Qdrant Cloud
 * Usage: npm run rag:index  OR  bun scripts/rag/index-content.ts
 */

import { ingestAllContent } from '../../src/lib/rag/ingest';
import { getCollectionStats } from '../../src/lib/rag/qdrant';

async function main() {
  console.log('────────────────────────────────────────────────────────');
  console.log('🌱 J K FERTILIZERS RAG — ETL CONTENT INGESTION');
  console.log('────────────────────────────────────────────────────────');

  const stats = await ingestAllContent(process.cwd());

  const qdrantStats = await getCollectionStats();
  console.log('────────────────────────────────────────────────────────');
  console.log('📊 INGESTION SUMMARY REPORT');
  console.log('────────────────────────────────────────────────────────');
  console.log(`Documents Processed: ${stats.documentsIndexed}`);
  console.log(`Semantic Chunks:     ${stats.chunksCreated}`);
  console.log(`Total Points in DB:  ${qdrantStats.pointsCount}`);
  console.log(`Duration:            ${(stats.durationMs / 1000).toFixed(2)}s`);
  console.log('────────────────────────────────────────────────────────');
  console.log('🎉 Knowledge base is live and ready for search & chat queries!\n');
}

main().catch((err) => {
  console.error('❌ Content ingestion failed:', err);
  process.exit(1);
});
