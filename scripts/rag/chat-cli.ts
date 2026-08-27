#!/usr/bin/env node
/**
 * Interactive Terminal REPL & Question CLI for J K Fertilizers RAG
 * Usage:
 *   bun scripts/rag/chat-cli.ts "What is PROM?"
 *   bun scripts/rag/chat-cli.ts  (interactive mode)
 */

import readline from 'node:readline';
import { askRag } from '../../src/lib/rag/chat';

async function typewriterPrint(text: string, delay: number = 8) {
  for (const char of text) {
    process.stdout.write(char);
    if (delay > 0) {
      await new Promise((r) => setTimeout(r, delay));
    }
  }
  process.stdout.write('\n');
}

async function handleQuestion(question: string) {
  process.stdout.write('\n🧠 Searching knowledge base...');
  let res;
  try {
    res = await askRag(question);
  } catch (err: any) {
    process.stdout.write('\r\x1b[K');
    console.error(`❌ ${err?.message || err}`);
    return;
  }
  process.stdout.write('\r\x1b[K'); // clear line

  console.log('────────────────────────────────────────────────────────');
  console.log(`⏱️ Latency: ${res.latencyMs}ms | Path: ${res.path} | Model: ${res.model} | Intent: ${res.intent}`);
  console.log('────────────────────────────────────────────────────────\n');

  await typewriterPrint(res.answer);

  if (res.sources.length > 0) {
    console.log('\n📚 Verified Grounding Sources:');
    res.sources.forEach((s) => {
      console.log(`  [${s.id}] ${s.title} (${s.url}) — Score: ${s.score}`);
    });
  }
  console.log('\n────────────────────────────────────────────────────────');
}

async function main() {
  const argQuery = process.argv.slice(2).join(' ').trim();

  if (argQuery) {
    await handleQuestion(argQuery);
    return;
  }

  console.log('────────────────────────────────────────────────────────');
  console.log('🌱 J K FERTILIZERS AI REPL — Ask anything about products & services');
  console.log('Type "exit" or "quit" to leave.');
  console.log('────────────────────────────────────────────────────────\n');

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const promptUser = () => {
    rl.question('\n🌾 You: ', async (input) => {
      const q = input.trim();
      if (!q || q.toLowerCase() === 'exit' || q.toLowerCase() === 'quit') {
        console.log('Goodbye!');
        rl.close();
        process.exit(0);
      }

      await handleQuestion(q);
      if (!rl.closed) {
        promptUser();
      }
    });
  };

  promptUser();
}

main().catch((err) => {
  console.error('❌ Chat CLI failed:', err?.message || err);
  process.exit(1);
});
