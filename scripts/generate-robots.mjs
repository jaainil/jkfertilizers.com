#!/usr/bin/env node
/**
 * generate-robots.mjs
 * Comprehensive robots.txt Generator for J K Fertilizers.
 *
 * Features:
 * - Allows ALL global search engines, web crawlers, AI search agents (GEO/LLMO), and social bots
 * - Explicitly lists all modern AI crawlers (GPTBot, ClaudeBot, PerplexityBot, Gemini, xAI, etc.)
 * - Links to Sitemap and RSS feeds
 * - Outputs to both /public/robots.txt and /dist/robots.txt on build
 *
 * Run manually: node scripts/generate-robots.mjs
 * Run on build: npm run build
 */

import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

const SITE_URL = 'https://jkfertilizers.com';
const ROOT_DIR = resolve(process.cwd());
const DIST_DIR = join(ROOT_DIR, 'dist');
const PUBLIC_DIR = join(ROOT_DIR, 'public');

const crawlers = [
  {
    category: 'Universal Fallback',
    bots: ['*'],
  },
  {
    category: 'Google Search & Media Bots',
    bots: [
      'Googlebot',
      'Googlebot-Image',
      'Googlebot-Video',
      'Googlebot-News',
      'Google-InspectionTool',
      'Storebot-Google',
      'GoogleOther',
      'Google-Extended',
      'Mediapartners-Google',
      'AdsBot-Google',
    ],
  },
  {
    category: 'OpenAI (ChatGPT & SearchGPT)',
    bots: ['GPTBot', 'ChatGPT-User', 'OAI-SearchBot'],
  },
  {
    category: 'Anthropic (Claude)',
    bots: ['ClaudeBot', 'Claude-Web', 'anthropic-ai'],
  },
  {
    category: 'Perplexity AI',
    bots: ['PerplexityBot', 'Perplexity-User'],
  },
  {
    category: 'Google Gemini AI',
    bots: ['Gemini-Web', 'Google-Extended'],
  },
  {
    category: 'Microsoft Bing & Copilot',
    bots: ['Bingbot', 'msnbot', 'msnbot-media', 'BingPreview'],
  },
  {
    category: 'Apple & Siri Bots',
    bots: ['Applebot', 'Applebot-Extended'],
  },
  {
    category: 'Meta (Facebook / Instagram / Llama AI)',
    bots: [
      'Meta-ExternalAgent',
      'Meta-ExternalFetcher',
      'FacebookBot',
      'facebookexternalhit',
    ],
  },
  {
    category: 'xAI (Grok)',
    bots: ['xAI-Bot'],
  },
  {
    category: 'Cohere AI',
    bots: ['cohere-ai', 'cohere-training-data-crawler'],
  },
  {
    category: 'DeepSeek AI',
    bots: ['DeepSeekBot'],
  },
  {
    category: 'ByteDance & TikTok',
    bots: ['Bytespider'],
  },
  {
    category: 'Amazon',
    bots: ['Amazonbot'],
  },
  {
    category: 'Independent Search & AI Engines',
    bots: [
      'BraveBot',
      'DuckDuckBot',
      'YouBot',
      'YandexBot',
      'YandexImages',
      'Baiduspider',
      'Sogou web spider',
      'NaverBot',
      'Yeti',
      'SeznamBot',
      'Qwantify',
      'MojeekBot',
    ],
  },
  {
    category: 'Research, Open Knowledge & Archiving Bots',
    bots: [
      'CCBot',
      'ia_archiver',
      'SemanticScholarBot',
      'Diffbot',
      'Scrapy',
    ],
  },
  {
    category: 'Social Media Previews & Messengers',
    bots: [
      'LinkedInBot',
      'Twitterbot',
      'WhatsApp',
      'TelegramBot',
      'Pinterestbot',
      'Slackbot',
      'Discordbot',
      'SkypeUriPreview',
    ],
  },
];

function generateRobotsTxt() {
  const dateStr = new Date().toISOString().split('T')[0];

  let text = `# =================================================
# robots.txt for J K Fertilizers
# Website: ${SITE_URL}
# Last updated: ${dateStr}
# =================================================

# ─── Content Signals (IETF draft / contentsignals.org) ───
# Explicitly allowing AI training, search indexing, and AI retrieval
Content-Signal: ai-train=yes, search=yes, ai-input=yes

`;

  for (const group of crawlers) {
    text += `# ─── ${group.category} ───\n`;
    for (const bot of group.bots) {
      text += `User-agent: ${bot}\nAllow: /\nContent-Signal: ai-train=yes, search=yes, ai-input=yes\n\n`;
    }
  }

  text += `# ─── Sitemap & Discovery ───
Sitemap: ${SITE_URL}/sitemap.xml
Sitemap: ${SITE_URL}/rss.xml
Host: ${SITE_URL}
`;

  return text;
}

function writeRobots() {
  const content = generateRobotsTxt();

  if (!existsSync(PUBLIC_DIR)) mkdirSync(PUBLIC_DIR, { recursive: true });
  writeFileSync(join(PUBLIC_DIR, 'robots.txt'), content, 'utf8');
  console.log('[robots] Written → public/robots.txt');

  if (existsSync(DIST_DIR)) {
    writeFileSync(join(DIST_DIR, 'robots.txt'), content, 'utf8');
    console.log('[robots] Written → dist/robots.txt');
  }
}

writeRobots();
