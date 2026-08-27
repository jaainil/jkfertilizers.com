/**
 * Dense Vector Embedding Generator for J K Fertilizers RAG
 * Single provider: self-hosted Open WebUI gateway -> Ollama
 *   model: EMBEDDING_MODEL (default embeddinggemma:latest, 768-dim)
 * Asymmetric prompt prefixes per embeddinggemma training format:
 *   - Documents: "title: none | text: {...}"
 *   - Queries:   "task: search result | query: {...}"
 */

import { RAG_CONFIG } from './config';

let measuredDimension: number | null = null;

function embedDocText(text: string): string {
  return `title: none | text: ${text.slice(0, 2048)}`;
}

export async function embedOllama(inputs: string[]): Promise<number[][]> {
  const baseUrl = RAG_CONFIG.embedding.openWebUiBaseUrl;
  const apiKey = RAG_CONFIG.embedding.openWebUiApiKey;
  if (!baseUrl || !apiKey) throw new Error('OPENWEBUI_BASE_URL / OPENWEBUI_API_KEY not configured');

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 90000);

  const response = await fetch(`${baseUrl}/ollama/api/embed`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ model: RAG_CONFIG.embedding.model, input: inputs }),
    signal: controller.signal,
  }).finally(() => clearTimeout(timeoutId));

  if (!response.ok) {
    const body = await response.text().catch(() => '');
    throw new Error(`Open WebUI embedding failed (${response.status}): ${body.slice(0, 200)}`);
  }

  const data = await response.json();
  const items = data?.embeddings;
  if (!Array.isArray(items) || items.length !== inputs.length || !Array.isArray(items[0])) {
    throw new Error('[embeddings] Open WebUI returned malformed embedding response');
  }
  return items;
}

/**
 * Generate a single document embedding. Throws on failure.
 */
export async function embedText(text: string): Promise<number[]> {
  const [vec] = await embedOllama([embedDocText(text)]);
  return vec;
}

/**
 * Generate embeddings for multiple documents, one API request per batch of 32.
 */
export async function embedBatch(
  texts: string[],
  onProgress?: (completed: number, total: number) => void
): Promise<number[][]> {
  const results: number[][] = [];
  const BATCH_SIZE = 32;

  for (let i = 0; i < texts.length; i += BATCH_SIZE) {
    results.push(...(await embedOllama(texts.slice(i, i + BATCH_SIZE).map(embedDocText))));
    if (onProgress) onProgress(results.length, texts.length);
  }

  return results;
}

/**
 * Generate a query embedding using the search-result task prefix.
 */
export async function embedQuery(query: string): Promise<number[]> {
  const [vec] = await embedOllama([`task: search result | query: ${query.slice(0, 2048)}`]);
  return vec;
}

/**
 * Resolve the true vector dimension of the active model.
 * Explicit EMBEDDING_DIMENSION env override wins; otherwise probes one real embedding.
 */
export async function measureEmbeddingDimension(): Promise<number> {
  if (measuredDimension !== null) return measuredDimension;

  const override = Number(process.env.EMBEDDING_DIMENSION);
  if (override > 0) {
    measuredDimension = override;
    return measuredDimension;
  }

  const probe = await embedOllama(['dimension probe']);
  measuredDimension = probe[0].length;
  console.log(`[embeddings] Detected ${RAG_CONFIG.embedding.model} dimension: ${measuredDimension}`);
  return measuredDimension;
}
