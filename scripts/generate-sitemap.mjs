#!/usr/bin/env node
/**
 * generate-sitemap.mjs
 * Comprehensive XML Sitemap Generator for J K Fertilizers.
 *
 * Features:
 * - Full Google Image Extensions support (xmlns:image) for Image SEO
 * - Accurate per-route <lastmod> from MDX frontmatter or file modification times
 * - Standardized changefreq & priority hierarchy
 * - Automatic discovery of static pages, products, services, and blog posts
 * - Outputs to both /public/sitemap.xml (for dev) and /dist/sitemap.xml (for prod)
 *
 * Run manually: node scripts/generate-sitemap.mjs
 * Run on build: npm run build
 */

import { existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

const SITE_URL = 'https://jkfertilizers.com';
const ROOT_DIR = resolve(process.cwd());
const DIST_DIR = join(ROOT_DIR, 'dist');
const PUBLIC_DIR = join(ROOT_DIR, 'public');

// ─── Simple Frontmatter Parser ────────────────────────────────────────────────
function parseFrontmatter(raw) {
  const match = raw.match(/^---[\r\n]([\s\S]*?)[\r\n]---/);
  if (!match) return {};
  const block = match[1];
  const result = {};
  for (const line of block.split(/\r?\n/)) {
    if (line.startsWith(' ') || line.startsWith('\t')) continue;
    const colonIdx = line.indexOf(':');
    if (colonIdx === -1) continue;
    const key = line.slice(0, colonIdx).trim();
    let val = line.slice(colonIdx + 1).trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    result[key] = val;
  }
  return result;
}

function escapeXml(str = '') {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function formatDate(date) {
  if (!date) return new Date().toISOString().split('T')[0];
  if (typeof date === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(date)) return date;
  const d = new Date(date);
  if (isNaN(d.getTime())) return new Date().toISOString().split('T')[0];
  return d.toISOString().split('T')[0];
}

function getFileLastMod(filePath) {
  try {
    if (existsSync(filePath)) {
      const stats = statSync(filePath);
      return formatDate(stats.mtime);
    }
  } catch {
    // fallback
  }
  return formatDate(new Date());
}

// ─── Collect Routes ───────────────────────────────────────────────────────────
function collectRoutes() {
  const routes = [];
  const today = formatDate(new Date());

  // 1. Core Static Pages
  const staticPages = [
    {
      path: '/',
      priority: '1.0',
      changefreq: 'weekly',
      image: '/images/hero.jpg',
      imageTitle: 'J K Fertilizers — Organic Fertilizer Manufacturer Gujarat',
      caption: 'Leading manufacturer of organic fertilizers, base granules and coated base granules in Anand, Gujarat.',
      file: 'src/components/HomePage.tsx',
    },
    {
      path: '/products',
      priority: '0.9',
      changefreq: 'weekly',
      image: '/images/about-4.jpg',
      imageTitle: 'Organic Fertilizer Granules Catalog',
      caption: 'Browse complete range of organic fertilizers, base granules, and bio-fertilizers.',
      file: 'src/pages/ProductsPage.tsx',
    },
    {
      path: '/contact',
      priority: '0.9',
      changefreq: 'monthly',
      image: '/images/about-1.jpg',
      imageTitle: 'Contact J K Fertilizers Anand Gujarat',
      caption: 'Contact J K Fertilizers for bulk B2B fertilizer orders and partnerships.',
      file: 'src/pages/ContactPage.tsx',
    },
    {
      path: '/services',
      priority: '0.85',
      changefreq: 'monthly',
      image: '/images/about-1.jpg',
      imageTitle: 'Fertilizer Manufacturing & Job Work Services',
      caption: 'Granule technology, contract manufacturing, custom packaging, and infrastructure leasing.',
      file: 'src/pages/ServicesPage.tsx',
    },
    {
      path: '/about',
      priority: '0.8',
      changefreq: 'monthly',
      image: '/images/dsc00161.jpg',
      imageTitle: 'About J K Fertilizers',
      caption: 'Founded by Akash Dadhania in 2006. FCO approved organic fertilizer manufacturer.',
      file: 'src/pages/AboutPage.tsx',
    },
    {
      path: '/blog',
      priority: '0.8',
      changefreq: 'weekly',
      image: '/images/granules.jpg',
      imageTitle: 'Agriculture & Fertilizer Insights Blog',
      caption: 'Expert insights on organic fertilizer manufacturing, soil health, and sustainable agriculture.',
      file: 'src/pages/BlogPage.tsx',
    },
    {
      path: '/portfolio',
      priority: '0.75',
      changefreq: 'monthly',
      image: '/images/about-4.jpg',
      imageTitle: 'J K Fertilizers Product Portfolio',
      caption: 'Client partnerships and large-scale agricultural fertilizer projects.',
      file: 'src/pages/PortfolioPage.tsx',
    },
    {
      path: '/commitment',
      priority: '0.75',
      changefreq: 'monthly',
      image: '/images/commitment-1.jpg',
      imageTitle: 'Sustainability & Quality Commitment',
      caption: '100% organic, eco-friendly fertilizers with rigorous FCO quality assurance.',
      file: 'src/pages/CommitmentPage.tsx',
    },
    {
      path: '/history',
      priority: '0.7',
      changefreq: 'yearly',
      image: '/images/drone-view-3.jpg',
      imageTitle: 'Company History & Milestones',
      caption: 'The journey of J K Fertilizers from 2006 to high-volume manufacturing capacity.',
      file: 'src/pages/HistoryPage.tsx',
    },
  ];

  for (const page of staticPages) {
    const fullPath = join(ROOT_DIR, page.file);
    routes.push({
      loc: `${SITE_URL}${page.path === '/' ? '' : page.path}`,
      lastmod: getFileLastMod(fullPath) || today,
      changefreq: page.changefreq,
      priority: page.priority,
      image: page.image
        ? {
            loc: page.image.startsWith('http') ? page.image : `${SITE_URL}${page.image}`,
            title: page.imageTitle,
            caption: page.caption,
          }
        : null,
    });
  }

  // 2. Dynamic Products
  const productsDir = join(ROOT_DIR, 'src/content/products');
  if (existsSync(productsDir)) {
    const entries = readdirSync(productsDir);
    for (const slug of entries) {
      const file = join(productsDir, slug, 'index.mdx');
      if (existsSync(file)) {
        const raw = readFileSync(file, 'utf8');
        const fm = parseFrontmatter(raw);
        const title = fm.title || slug;
        const summary = fm.summary || fm.tagline || 'Organic fertilizer granule from J K Fertilizers';
        const img = fm.imageUrl ? (fm.imageUrl.startsWith('/') ? fm.imageUrl : `/images/${fm.imageUrl}`) : '/og-image.png';

        routes.push({
          loc: `${SITE_URL}/products/${slug}`,
          lastmod: fm.date ? formatDate(fm.date) : getFileLastMod(file),
          changefreq: 'weekly',
          priority: '0.85',
          image: {
            loc: img.startsWith('http') ? img : `${SITE_URL}${img}`,
            title: `${title} — J K Fertilizers`,
            caption: summary,
          },
        });
      }
    }
  }

  // 3. Dynamic Services
  const servicesDir = join(ROOT_DIR, 'src/content/services');
  if (existsSync(servicesDir)) {
    const entries = readdirSync(servicesDir);
    for (const slug of entries) {
      const file = join(servicesDir, slug, 'index.mdx');
      if (existsSync(file)) {
        const raw = readFileSync(file, 'utf8');
        const fm = parseFrontmatter(raw);
        const title = fm.title || slug;
        const summary = fm.tagline || fm.concept || 'Fertilizer manufacturing services by J K Fertilizers';
        const img = fm.imageSrc || '/images/about-1.jpg';

        routes.push({
          loc: `${SITE_URL}/services/${slug}`,
          lastmod: fm.date ? formatDate(fm.date) : getFileLastMod(file),
          changefreq: 'monthly',
          priority: '0.8',
          image: {
            loc: img.startsWith('http') ? img : `${SITE_URL}${img}`,
            title: `${title} — J K Fertilizers Services`,
            caption: summary,
          },
        });
      }
    }
  }

  // 4. Dynamic Blog Posts
  const blogDir = join(ROOT_DIR, 'src/content/blog');
  if (existsSync(blogDir)) {
    const entries = readdirSync(blogDir);
    for (const slug of entries) {
      const file = join(blogDir, slug, 'index.mdx');
      if (existsSync(file)) {
        const raw = readFileSync(file, 'utf8');
        const fm = parseFrontmatter(raw);
        const title = fm.title || slug;
        const excerpt = fm.excerpt || fm.description || 'Agriculture insights by J K Fertilizers';
        const img = fm.img || fm.image || '/images/granules.jpg';

        routes.push({
          loc: `${SITE_URL}/blog/${slug}`,
          lastmod: fm.date ? formatDate(fm.date) : getFileLastMod(file),
          changefreq: 'monthly',
          priority: '0.75',
          image: {
            loc: img.startsWith('http') ? img : `${SITE_URL}${img.startsWith('/') ? img : '/' + img}`,
            title: `${title} — J K Fertilizers Blog`,
            caption: excerpt,
          },
        });
      }
    }
  }

  return routes;
}

// ─── Build XML ────────────────────────────────────────────────────────────────
function generateSitemapXml(routes) {
  const urlTags = routes
    .map((r) => {
      let imageBlock = '';
      if (r.image) {
        imageBlock = `
    <image:image>
      <image:loc>${escapeXml(r.image.loc)}</image:loc>
      <image:title>${escapeXml(r.image.title)}</image:title>
      <image:caption>${escapeXml(r.image.caption)}</image:caption>
    </image:image>`;
      }

      return `  <url>
    <loc>${escapeXml(r.loc)}</loc>
    <lastmod>${escapeXml(r.lastmod)}</lastmod>
    <changefreq>${escapeXml(r.changefreq)}</changefreq>
    <priority>${escapeXml(r.priority)}</priority>${imageBlock}
  </url>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urlTags}
</urlset>
`;
}

// ─── Write Sitemap Files ──────────────────────────────────────────────────────
function writeSitemap() {
  const routes = collectRoutes();
  console.log(`[sitemap] Discovered ${routes.length} indexable routes.`);

  const xml = generateSitemapXml(routes);

  // Write to public/
  if (!existsSync(PUBLIC_DIR)) mkdirSync(PUBLIC_DIR, { recursive: true });
  const publicPath = join(PUBLIC_DIR, 'sitemap.xml');
  writeFileSync(publicPath, xml, 'utf8');
  console.log(`[sitemap] Written → public/sitemap.xml (${routes.length} URLs)`);

  // Write to dist/ if it exists
  if (existsSync(DIST_DIR)) {
    const distPath = join(DIST_DIR, 'sitemap.xml');
    writeFileSync(distPath, xml, 'utf8');
    console.log(`[sitemap] Written → dist/sitemap.xml (${routes.length} URLs)`);
  }

  return routes.length;
}

writeSitemap();
