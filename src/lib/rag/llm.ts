/**
 * LLM Generation Engine for J K Fertilizers RAG
 * Single provider: Google Gemini (model pinned in .env -> GEMINI_MODEL)
 */

import { RAG_CONFIG } from './config';

export interface GenerationPrompt {
  systemPrompt: string;
  userPrompt: string;
}

/**
 * Generate completion with Gemini. Throws on failure — no fallback providers.
 * Honors a single rate-limit retry (429) using Gemini's reported retryDelay.
 */
export async function generateAnswer(prompt: GenerationPrompt): Promise<{ text: string; model: string }> {
  try {
    return { text: await callGemini(prompt), model: `google/${RAG_CONFIG.llm.geminiModel}` };
  } catch (err: any) {
    const msg = String(err?.message || err);
    if (!msg.includes('Gemini 429')) throw err;
    console.warn('[llm] Rate limited, waiting 15s before one retry...');
  }

  await new Promise((r) => setTimeout(r, 15000));
  return { text: await callGemini(prompt), model: `google/${RAG_CONFIG.llm.geminiModel}` };
}

async function callGemini(prompt: GenerationPrompt): Promise<string> {
  if (!RAG_CONFIG.llm.geminiApiKey) {
    throw new Error('GEMINI_API_KEY not configured');
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 15000);

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${RAG_CONFIG.llm.geminiModel}:generateContent`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-goog-api-key': RAG_CONFIG.llm.geminiApiKey,
      },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: prompt.systemPrompt }] },
        contents: [{ role: 'user', parts: [{ text: prompt.userPrompt }] }],
        generationConfig: {
          temperature: RAG_CONFIG.llm.temperature,
          maxOutputTokens: RAG_CONFIG.llm.maxTokens,
        },
      }),
      signal: controller.signal,
    }
  ).finally(() => clearTimeout(timeoutId));

  if (!response.ok) {
    const body = await response.text().catch(() => '');
    throw new Error(`Gemini ${response.status}: ${body.slice(0, 160)}`);
  }

  const data = await response.json();
  const candidate = data?.candidates?.[0];
  const generated: string = (candidate?.content?.parts || [])
    .map((p: any) => p.text || '')
    .join('')
    .trim();

  if (!generated) {
    throw new Error(`Gemini empty response (finishReason: ${candidate?.finishReason || 'unknown'})`);
  }

  return generated;
}
