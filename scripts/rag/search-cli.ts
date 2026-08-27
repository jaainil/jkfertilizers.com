#!/usr/bin/env node
/**
 * CLI Search Tool for Inspecting Vector & Keyword Retrieval
 * Usage: bun scripts/rag/search-cli.ts "PROM specifications"
 */

import { hybridSearch } from '../../src/lib/rag/search';

async function main() {
  const query = process.argv.slice(2).join(' ').trim() || 'PROM specifications';

  console.log('────────────────────────────────────────────────────────');
  console.log(`🔍 HYBRID RETRIEVAL INSPECTOR: "${query}"`);
  console.log('────────────────────────────────────────────────────────');

  const startTime = Date.now();
  const { results, intent } = await hybridSearch(query, { limit: 5 });
  const latency = Date.now() - startTime;

  console.log(`Classified Intent: ${intent}`);
  console.log(`Retrieval Latency: ${latency}ms`);
  console.log(`Total Matches:     ${results.length}\n`);

  if (results.length === 0) {
    console.log('⚠️ No matching documents found.');
    return;
  }

  results.forEach((r, idx) => {
    console.log(`[#${idx + 1}] Score: ${r.score.toFixed(3)} | Type: ${r.type} | Cat: ${r.category}`);
    console.log(`Title:    ${r.title}`);
    console.log(`Heading:  ${r.heading}`);
    console.log(`URL:      https://jkfertilizers.com${r.url}`);
    console.log(`Snippet:  ${r.content.slice(0, 180).replace(/\n+/g, ' ')}...`);
    console.log('────────────────────────────────────────────────────────');
  });
}

main().catch((err) => {
  console.error('❌ Search failed:', err);
  process.exit(1);
});
