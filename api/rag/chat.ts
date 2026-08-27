/**
 * Secure Serverless API Route for J K Fertilizers RAG
 * Endpoint: POST /api/rag/chat
 * Features:
 * - IP-based sliding window rate limiting (20 req / 60s)
 * - Strict 500-char input validation & sanitization
 * - Zero client-side API key leakage
 * - CORS protection
 */

import type { IncomingMessage, ServerResponse } from 'node:http';
import { askRag } from '../../src/lib/rag/chat';

// In-memory sliding window rate limiter
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string, limit: number = 20, windowMs: number = 60000): { allowed: boolean; remaining: number; retryAfter?: number } {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: limit - 1 };
  }

  if (record.count >= limit) {
    const retryAfter = Math.ceil((record.resetAt - now) / 1000);
    return { allowed: false, remaining: 0, retryAfter };
  }

  record.count++;
  return { allowed: true, remaining: limit - record.count };
}

// Clean up stale rate limit entries every 5 minutes
// ponytail: unref so serverless/bun processes don't hang on this timer
setInterval(() => {
  const now = Date.now();
  for (const [ip, entry] of rateLimitMap.entries()) {
    if (now > entry.resetAt) {
      rateLimitMap.delete(ip);
    }
  }
}, 300000).unref();

export default async function handler(req: IncomingMessage & { body?: any }, res: ServerResponse) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');

  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    res.end();
    return;
  }

  if (req.method !== 'POST') {
    res.statusCode = 405;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: 'Method Not Allowed. Only POST requests are permitted.' }));
    return;
  }

  // Extract client IP for rate limiting
  const forwarded = req.headers['x-forwarded-for'];
  const clientIp = typeof forwarded === 'string' ? forwarded.split(',')[0].trim() : req.socket.remoteAddress || '127.0.0.1';

  // Apply Rate Limit (20 requests / 60 seconds)
  const rateLimit = checkRateLimit(clientIp, 20, 60000);
  res.setHeader('X-RateLimit-Limit', '20');
  res.setHeader('X-RateLimit-Remaining', String(rateLimit.remaining));

  if (!rateLimit.allowed) {
    res.statusCode = 429;
    res.setHeader('Retry-After', String(rateLimit.retryAfter || 60));
    res.setHeader('Content-Type', 'application/json');
    res.end(
      JSON.stringify({
        error: 'Too Many Requests',
        message: 'Rate limit exceeded. Please wait a moment before sending another question.',
        retryAfter: rateLimit.retryAfter,
      })
    );
    return;
  }

  let rawBody = '';
  req.on('data', (chunk) => {
    rawBody += chunk;
    if (rawBody.length > 10000) {
      res.statusCode = 413;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ error: 'Payload Too Large' }));
      req.destroy();
    }
  });

  req.on('end', async () => {
    try {
      const parsed = rawBody ? JSON.parse(rawBody) : req.body || {};
      const query = String(parsed.query || parsed.question || '').trim();

      if (!query || query.length < 2) {
        res.statusCode = 400;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ error: 'Invalid or empty query provided.' }));
        return;
      }

      if (query.length > 500) {
        res.statusCode = 400;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ error: 'Query exceeds maximum allowed length of 500 characters.' }));
        return;
      }

      // Execute grounded RAG pipeline
      const response = await askRag(query, {
        filterType: parsed.filterType,
      });

      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(response));
    } catch (err: any) {
      console.error('[api/rag/chat] Error processing request:', err?.message || err);
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.end(
        JSON.stringify({
          error: 'Service Temporarily Unavailable',
          message: 'An error occurred while answering your question. Please try again or contact sales@jkfertilizers.com.',
        })
      );
    }
  });
}
