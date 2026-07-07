#!/usr/bin/env node
/**
 * generate-rss.mjs
 * Generates /dist/rss.xml and /public/rss.xml for J K Fertilizers blog.
 *
 * Run automatically after build:  npm run build
 * Run manually:                   node scripts/generate-rss.mjs
 *
 * Reads MDX frontmatter directly — no bundler required.
 * Supports fields: title, excerpt, date, author, topic, img
 */

import { readdirSync, readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { resolve, join } from 'node:path';

const SITE_URL   = 'https://jkfertilizers.com';
const SITE_TITLE = 'J K Fertilizers - Blog & Insights';
const SITE_DESC  = 'Expert insights on organic fertilizers, sustainable agriculture, granule technology and B2B supply from J K Fertilizers, Gujarat.';
const SITE_LANG  = 'en-IN';
const EDITOR     = 'info@jkfertilizers.com (J K Fertilizers)';
const WEBMASTER  = 'info@jkfertilizers.com (J K Fertilizers)';

const ROOT_DIR   = resolve(process.cwd());
const BLOG_DIR   = join(ROOT_DIR, 'src/content/blog');
const DIST_DIR   = join(ROOT_DIR, 'dist');
const PUBLIC_DIR = join(ROOT_DIR, 'public');

// ─── Simple frontmatter parser (no external deps) ────────────────────────────
function parseFrontmatter(raw) {
  const match = raw.match(/^---[\r\n]([\s\S]*?)[\r\n]---/);
  if (!match) return {};

  const block = match[1];
  const result = {};

  for (const line of block.split(/\r?\n/)) {
    const colonIdx = line.indexOf(':');
    if (colonIdx === -1) continue;

    const key = line.slice(0, colonIdx).trim();
    let val = line.slice(colonIdx + 1).trim();

    // Strip surrounding quotes (single or double)
    if ((val.startsWith('"') && val.endsWith('"')) ||
        (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }

    // Boolean coercion
    if (val === 'true')  { result[key] = true; continue; }
    if (val === 'false') { result[key] = false; continue; }

    result[key] = val;
  }

  return result;
}

// ─── Escape XML entities ──────────────────────────────────────────────────────
function escapeXml(str = '') {
  return String(str)
    .replace(/&/g,  '&amp;')
    .replace(/</g,  '&lt;')
    .replace(/>/g,  '&gt;')
    .replace(/"/g,  '&quot;')
    .replace(/'/g,  '&apos;');
}

// ─── Load & sort blog posts ───────────────────────────────────────────────────
function loadPosts() {
  if (!existsSync(BLOG_DIR)) {
    console.warn(`[rss] Blog directory not found: ${BLOG_DIR}`);
    return [];
  }

  const files = readdirSync(BLOG_DIR).filter(f => f.endsWith('.mdx'));

  return files
    .map(file => {
      const slug = file.replace(/\.mdx$/, '');
      const raw  = readFileSync(join(BLOG_DIR, file), 'utf8');
      const fm   = parseFrontmatter(raw);

      return {
        slug,
        title:    fm.title   || slug,
        excerpt:  fm.excerpt || fm.description || '',
        date:     fm.date    || '',
        author:   fm.author  || 'J K Fertilizers',
        topic:    fm.topic   || 'Agriculture',
        img:      fm.img     || fm.image || '',
        url:      `${SITE_URL}/blog/${slug}`,
      };
    })
    .filter(p => p.date) // only posts with a date
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

// ─── Build RSS XML ────────────────────────────────────────────────────────────
function buildRSS(posts) {
  const buildDate = new Date().toUTCString();
  const lastBuild = posts.length ? new Date(posts[0].date).toUTCString() : buildDate;

  const items = posts.map(p => {
    const pubDate = new Date(p.date).toUTCString();
    const imgTag  = p.img
      ? `\n      <enclosure url="${escapeXml(p.img.startsWith('http') ? p.img : SITE_URL + p.img)}" type="image/jpeg" length="0" />`
      : '';

    return `
  <item>
    <title>${escapeXml(p.title)}</title>
    <link>${escapeXml(p.url)}</link>
    <guid isPermaLink="true">${escapeXml(p.url)}</guid>
    <description>${escapeXml(p.excerpt)}</description>
    <author>${escapeXml(EDITOR)}</author>
    <category>${escapeXml(p.topic)}</category>
    <pubDate>${pubDate}</pubDate>${imgTag}
  </item>`;
  }).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
  xmlns:atom="http://www.w3.org/2005/Atom"
  xmlns:content="http://purl.org/rss/1.0/modules/content/"
  xmlns:dc="http://purl.org/dc/elements/1.1/"
  xmlns:media="http://search.yahoo.com/mrss/">

  <channel>
    <title>${escapeXml(SITE_TITLE)}</title>
    <link>${SITE_URL}</link>
    <description>${escapeXml(SITE_DESC)}</description>
    <language>${SITE_LANG}</language>
    <managingEditor>${escapeXml(EDITOR)}</managingEditor>
    <webMaster>${escapeXml(WEBMASTER)}</webMaster>
    <lastBuildDate>${lastBuild}</lastBuildDate>
    <pubDate>${lastBuild}</pubDate>
    <ttl>10080</ttl>
    <image>
      <url>${SITE_URL}/logo.png</url>
      <title>${escapeXml(SITE_TITLE)}</title>
      <link>${SITE_URL}</link>
      <width>144</width>
      <height>144</height>
    </image>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />${items}
  </channel>
</rss>
`;
}

// ─── Write output ─────────────────────────────────────────────────────────────
function writeRSS(xml) {
  let written = 0;

  // Always write to public/ (served in dev mode and as static fallback)
  if (!existsSync(PUBLIC_DIR)) mkdirSync(PUBLIC_DIR, { recursive: true });
  writeFileSync(join(PUBLIC_DIR, 'rss.xml'), xml, 'utf8');
  console.log(`[rss] Written → public/rss.xml`);
  written++;

  // Write to dist/ if it exists (production build output)
  if (existsSync(DIST_DIR)) {
    writeFileSync(join(DIST_DIR, 'rss.xml'), xml, 'utf8');
    console.log(`[rss] Written → dist/rss.xml`);
    written++;
  }

  return written;
}

// ─── Main ─────────────────────────────────────────────────────────────────────
const posts = loadPosts();
console.log(`[rss] Found ${posts.length} blog post(s) with dates`);

const xml = buildRSS(posts);
const count = writeRSS(xml);

console.log(`[rss] Done — ${posts.length} items in ${count} file(s).`);
if (posts.length > 0) {
  console.log(`[rss] Latest post: "${posts[0].title}" (${posts[0].date})`);
}
