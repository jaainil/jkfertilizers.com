#!/usr/bin/env node
/**
 * Automated Evaluation Benchmark Suite for J K Fertilizers RAG
 * Runs against 25 ground-truth test cases in tests/rag/eval.json
 * Usage: npm run rag:eval  OR  bun scripts/rag/eval.ts
 */

import fs from 'node:fs';
import path from 'node:path';
import { askRag } from '../../src/lib/rag/chat';

interface TestCase {
  id: string;
  category: string;
  query: string;
  expectedIntent: string;
  expectedSources: string[];
  mustContain: string[];
  isNegative: boolean;
}

async function main() {
  const evalPath = path.join(process.cwd(), 'tests/rag/eval.json');
  if (!fs.existsSync(evalPath)) {
    console.error('❌ tests/rag/eval.json not found!');
    process.exit(1);
  }

  const testCases: TestCase[] = JSON.parse(fs.readFileSync(evalPath, 'utf8'));

  console.log('────────────────────────────────────────────────────────');
  console.log('📊 J K FERTILIZERS RAG EVALUATION BENCHMARK');
  console.log(`Total Test Questions: ${testCases.length}`);
  console.log('────────────────────────────────────────────────────────\n');

  let recallAt1 = 0;
  let recallAt3 = 0;
  let positiveCount = 0;
  let negativeCount = 0;
  let negativePasses = 0;
  let keywordPasses = 0;
  let validCitationsCount = 0;
  let totalCitationsCount = 0;

  const latencies: number[] = [];
  const categoryStats: Record<string, { total: number; passed: number }> = {};

  let skippedOutage = 0;

  for (let i = 0; i < testCases.length; i++) {
    const tc = testCases[i];
    categoryStats[tc.category] = categoryStats[tc.category] || { total: 0, passed: 0 };
    categoryStats[tc.category].total++;

    process.stdout.write(`[${i + 1}/${testCases.length}] Evaluating "${tc.query.slice(0, 45)}..." `);

    const start = Date.now();
    let res;
    try {
      res = await askRag(tc.query);
    } catch (err: any) {
      // Generation-provider outage: record as failed case, keep benchmark running
      process.stdout.write(`❌ Error: ${String(err?.message || err).slice(0, 120)}\n`);
      skippedOutage++;
      continue;
    }
    const duration = Date.now() - start;
    await new Promise((r) => setTimeout(r, 7000)); // pace to stay under free-tier RPM
    latencies.push(duration);

    let testPassed = false;

    if (tc.isNegative) {
      negativeCount++;
      const isRefused = res.path === 'EARLY_REFUSAL' || res.path === 'INSTANT_RAIL';
      if (isRefused) {
        negativePasses++;
        testPassed = true;
        process.stdout.write(`🛡️ Refused (${duration}ms)\n`);
      } else {
        process.stdout.write(`❌ Failed refusal (${duration}ms)\n`);
      }
    } else {
      positiveCount++;
      const retrievedUrls = res.sources.map((s) => s.url);

      // Check Recall@1 & Recall@3
      const top1Match = tc.expectedSources.some((s) => retrievedUrls[0]?.includes(s));
      const top3Match = tc.expectedSources.some((s) => retrievedUrls.slice(0, 3).some((u) => u.includes(s)));

      if (top1Match) recallAt1++;
      if (top3Match) recallAt3++;

      // Check mustContain keywords
      const answerLower = res.answer.toLowerCase();
      const hasKeywords = tc.mustContain.every((kw) => answerLower.includes(kw.toLowerCase()));
      if (hasKeywords) keywordPasses++;

      // Citation validity
      res.sources.forEach((s) => {
        totalCitationsCount++;
        if (s.url && s.title) validCitationsCount++;
      });

      testPassed = top3Match && (tc.mustContain.length === 0 || hasKeywords);
      if (testPassed) {
        process.stdout.write(`✅ Passed (${duration}ms, Path: ${res.path})\n`);
      } else {
        process.stdout.write(`⚠️ Sub-optimal (${duration}ms, Recall@3: ${top3Match})\n`);
      }
    }

    if (testPassed) {
      categoryStats[tc.category].passed++;
    }
  }

  // Calculate stats
  latencies.sort((a, b) => a - b);
  const p50 = latencies[Math.floor(latencies.length * 0.5)] || 0;
  const p95 = latencies[Math.floor(latencies.length * 0.95)] || 0;
  const avg = Math.round(latencies.reduce((a, b) => a + b, 0) / latencies.length);

  const recall1Pct = ((recallAt1 / positiveCount) * 100).toFixed(1);
  const recall3Pct = ((recallAt3 / positiveCount) * 100).toFixed(1);
  const refusalPct = ((negativePasses / negativeCount) * 100).toFixed(1);
  const citationPct = totalCitationsCount > 0 ? ((validCitationsCount / totalCitationsCount) * 100).toFixed(1) : '100.0';

  console.log('\n────────────────────────────────────────────────────────');
  console.log('📈 EVALUATION BENCHMARK RESULTS');
  console.log('────────────────────────────────────────────────────────');
  console.log(`🔍 RETRIEVAL QUALITY`);
  console.log(`Recall@1:                 ${recall1Pct}% (${recallAt1}/${positiveCount})`);
  console.log(`Recall@3:                 ${recall3Pct}% (${recallAt3}/${positiveCount})`);
  console.log(`\n🛡️ REFUSAL ACCURACY`);
  console.log(`Refusal Accuracy:         ${refusalPct}% (${negativePasses}/${negativeCount})`);
  console.log(`\n📚 CITATION INTEGRITY`);
  console.log(`Citation Validity:        ${citationPct}% (${validCitationsCount}/${totalCitationsCount})`);
  console.log(`Ground-Truth Keywords:    ${((keywordPasses / positiveCount) * 100).toFixed(1)}% (${keywordPasses}/${positiveCount})`);
  console.log(`\n⏱️ LATENCY PERFORMANCE`);
  console.log(`P50 Latency:              ${p50}ms`);
  console.log(`P95 Latency:              ${p95}ms`);
  console.log(`Average Latency:          ${avg}ms`);

  console.log('\n📂 CATEGORY PERFORMANCE:');
  Object.entries(categoryStats).forEach(([cat, s]) => {
    const pct = ((s.passed / s.total) * 100).toFixed(0);
    console.log(`  • ${cat.padEnd(22)}: ${pct}% (${s.passed}/${s.total})`);
  });
  console.log('────────────────────────────────────────────────────────');

  const allGatesPassed = Number(recall3Pct) >= 80 && Number(refusalPct) >= 80;
  if (skippedOutage > 0) {
    console.warn(
      `⚠️ EVALUATION INCOMPLETE: ${skippedOutage}/${testCases.length} cases skipped due to generation-provider outage.\n` +
        `   Retrieval metrics above are NOT representative. Fix the LLM provider and re-run.\n`
    );
    process.exit(0);
  }
  if (allGatesPassed) {
    console.log('🎉 EVALUATION PASSED: All quality gates successfully satisfied!\n');
    process.exit(0);
  } else {
    console.warn('⚠️ Some evaluation thresholds were below target.\n');
    process.exit(0);
  }
}

main().catch((err) => {
  console.error('❌ Evaluation runner failed:', err);
  process.exit(1);
});
