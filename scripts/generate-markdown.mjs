#!/usr/bin/env node
/**
 * generate-markdown.mjs
 * Generates static .md representations for every route on jkfertilizers.com.
 * Enables Content Negotiation (Accept: text/markdown) for AI agents and LLMs.
 *
 * Run manually: node scripts/generate-markdown.mjs
 * Run on build: npm run build
 */

import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

const SITE_URL = 'https://jkfertilizers.com';
const ROOT_DIR = resolve(process.cwd());
const DIST_DIR = join(ROOT_DIR, 'dist');
const PUBLIC_DIR = join(ROOT_DIR, 'public');

function parseFrontmatter(raw) {
  const match = raw.match(/^---[\r\n]([\s\S]*?)[\r\n]---/);
  if (!match) return { data: {}, body: raw };
  const block = match[1];
  const body = raw.slice(match[0].length).trim();
  const data = {};
  for (const line of block.split(/\r?\n/)) {
    if (line.startsWith(' ') || line.startsWith('\t')) continue;
    const colonIdx = line.indexOf(':');
    if (colonIdx === -1) continue;
    const key = line.slice(0, colonIdx).trim();
    let val = line.slice(colonIdx + 1).trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    data[key] = val;
  }
  return { data, body };
}

function cleanMdxBody(body = '') {
  return body
    .replace(/import\s+.*?from\s+['"].*?['"];?/g, '')
    .replace(/<[A-Z][A-Za-z0-9]*(?:\s+[^>]*?)?\/>/g, '')
    .replace(/<[A-Z][A-Za-z0-9]*(?:\s+[^>]*?)?>[\s\S]*?<\/[A-Z][A-Za-z0-9]*>/g, '')
    .replace(/<div(?:\s+[^>]*?)?>([\s\S]*?)<\/div>/gi, '$1')
    .replace(/<p(?:\s+[^>]*?)?>([\s\S]*?)<\/p>/gi, '$1\n\n')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function estimateTokens(text) {
  return Math.ceil(text.length / 4);
}

// ─── Pages Definitions ────────────────────────────────────────────────────────
const staticPages = [
  {
    path: '/',
    title: 'J K Fertilizers: Organic Fertilizer Manufacturer',
    description: 'Manufacturer of FCO-approved organic fertilizers, base granules, and coated granules in Anand, Gujarat, India. Operating since 2006.',
    content: `# J K Fertilizers: Organic Fertilizer Manufacturer

> **Location:** Anand, Gujarat, India | **Founded:** 2006 | **Capacity:** 700 MT/day | **Compliance:** FCO Approved

## Overview
J K Fertilizers is a B2B manufacturer of organic fertilizers, mineral-coated base granules, and customized soil conditioners. Headquartered in Vasad, Anand, Gujarat, we partner with agribusiness brands, state federations, corporate distributors, and farming enterprises across India.

## Core Product Categories
1. **Organic Fertilizers:** Organic Manure, PROM (Phosphate Rich Organic Manure), PDM (Potash Derived from Molasses), Mycorrhiza Bio-Fertilizers.
2. **Coated Base Granules:** Bio NPK Coated Granules, Mycorrhiza Coated Granules, Customized Biological Coated Formulations.
3. **Engineered Base Granules:** Pancharatna 5-in-1 Base Granules, Organic Carbon Carriers, Humic Matrix Granules, Plant Available Silica, Diatomite Silicon.

## Manufacturing & B2B Services
- **Granule Technology:** High-hardness spherical granulation with 70%+ active ingredient absorption capacity.
- **Contract Manufacturing & Job Work:** Custom formulation and large-scale bulk processing.
- **Private Label Packaging:** Automated packaging from 1 kg retail pouches to 50 kg HDPE bags and jumbo bulk bags.
- **Infrastructure Leasing & Warehousing:** 100,000+ sq. ft. storage and dedicated production lines.

## Contact & Commercial Inquiries
- **Sales Email:** sales@jkfertilizers.com | info@jkfertilizers.com
- **Phone:** +91 98250 45894
- **Plant Address:** NH. 48, Opp. IOC Petrol Pump, B/H Adas Bus Stop, Vasad, Dist: Anand, Gujarat - 388305 INDIA
- **Catalog & Pricing:** [Pricing & Commercials](${SITE_URL}/pricing.md) | [Full Catalog](${SITE_URL}/products)`
  },
  {
    path: '/about',
    title: 'About J K Fertilizers',
    description: 'Company history, leadership under Akash Dadhania, and manufacturing standards in Gujarat.',
    content: `# About J K Fertilizers

Founded in 2006 by Mr. Akash Dadhania, J K Fertilizers operates a 700 MT/day organic granulation and bio-fertilizer manufacturing plant in Vasad, Anand, Gujarat.

## Our Mission
To advance sustainable agriculture by manufacturing high-efficiency, eco-friendly organic fertilizers and carrier granules that restore soil carbon and balance crop nutrition without harmful residues.

## Quality & Lab Testing
- 100% Fertilizer Control Order (FCO) compliant formulations.
- In-house testing laboratory analyzing moisture, bulk density, crushing strength, organic carbon, and N-P-K nutrient assays on every batch.
- High-efficiency production capacity exceeding 700 MT per day.`
  },
  {
    path: '/history',
    title: 'Company History & Milestones',
    description: 'Milestones of J K Fertilizers since 2006.',
    content: `# J K Fertilizers: Company History & Milestones

- **2006:** Founded first organic manure processing unit in Anand, Gujarat.
- **2011:** Commissioned commercial drum granulation facility for engineered base granules.
- **2016:** Introduced specialized biological coating lines for Mycorrhiza and Bio NPK granules.
- **2020:** Expanded covered warehousing to 100,000+ sq. ft. and attained 700 MT/day processing capacity.
- **2024–Present:** Pan-India corporate supply contracts, contract manufacturing partnerships, and export operations.`
  },
  {
    path: '/products',
    title: 'Products Catalog: J K Fertilizers',
    description: 'Complete range of organic fertilizers, base granules, and coated granules.',
    content: `# Organic Fertilizer Products Catalog

J K Fertilizers manufactures a comprehensive portfolio of 16 specialized organic fertilizers and carrier platforms:

## Organic Fertilizers
- **Organic Manure:** Composted natural organic matter enriched with microbial humic matrix.
- **PROM (Phosphate Rich Organic Manure):** Biological organic alternative to chemical DAP and SSP.
- **PDM (Potash Derived from Molasses):** Eco-friendly potassium fertilizer replacing chemical MOP.
- **Mycorrhiza Granules:** VAM fungal root expansion biofertilizer for root growth.

## Coated & Base Granules
- **Customized Coated Granules:** Engineered carrier granules ready for client-specified bio-actives.
- **Coated Base Granules Bio NPK:** Triple-action biological nitrogen, phosphorus, and potassium delivery.
- **Coated Base Granules Mycorrhiza:** Mineral carrier with protected active mycorrhizal spores.
- **Pancharatna Base Granules:** 5-in-1 foundational multi-nutrient granule.
- **Organic Carbon Base Granules:** High humic and organic matter soil conditioner.
- **Humic Based Granules:** Concentrated humic-fulvic root stimulator.
- **Plant Available Silica & Diatomite Silicon:** Natural silica fertilizers for cell wall strength and pest resistance.`
  },
  {
    path: '/services',
    title: 'Fertilizer Manufacturing Services',
    description: 'Contract manufacturing, custom granulation, packaging, and infrastructure leasing.',
    content: `# Fertilizer Manufacturing & B2B Services

J K Fertilizers provides end-to-end contract manufacturing and infrastructure services for agri-input companies:

1. **Granule Technology & Formulation:** Custom granule design (Recipe Granules) matching specific nutrient and hardness specifications.
2. **Job Work & Contract Manufacturing:** High-volume granulation, blending, and batch manufacturing.
3. **Custom Packaging Solutions:** Automated packaging, moisture-proof liners, and private branding.
4. **Infrastructure Leasing:** Dedicated granulation and storage facility leasing.
5. **Warehousing & Distribution:** Secure covered warehousing with direct access to NH-48 national highway logistics.`
  },
  {
    path: '/portfolio',
    title: 'Client Portfolio & Case Studies',
    description: 'Agricultural supply track record and corporate client trust.',
    content: `# J K Fertilizers: Portfolio & Case Studies

- **150+ Corporate & PSU Clients:** Trusted manufacturing partner for leading national fertilizer brands and state agricultural marketing federations.
- **10,000+ Tons Shipped Annually:** High-volume bulk deliveries with guaranteed batch consistency.
- **Sustainable Impact:** Restored organic carbon in thousands of hectares of commercial farmland across India.`
  },
  {
    path: '/commitment',
    title: 'Sustainability & Quality Commitment',
    description: 'Environmental stewardship and rigorous FCO quality assurance.',
    content: `# Sustainability & Quality Commitment

- **100% Organic & Eco-Friendly:** Zero chemical fillers, zero synthetic heavy metal contaminants.
- **FCO Compliance:** Strict adherence to the Fertilizer Control Order (FCO), 1985 guidelines.
- **Circular Economy:** Utilizing organic by-products and renewable mineral sources to promote soil regeneration.`
  },
  {
    path: '/blog',
    title: 'Agriculture & Fertilizer Insights Blog',
    description: 'Expert articles on fertilizer manufacturing, soil biology, and B2B procurement.',
    content: `# J K Fertilizers: Agriculture & Fertilizer Insights Blog

Expert insights, procurement guides, and technical agronomy articles published by J K Fertilizers specialists:

- [4 Non-Negotiables for Dependable B2B Granule Supply](${SITE_URL}/blog/b2b-supply-non-negotiables)
- [The Link Between Animal Nutrition and Crop Nutrition](${SITE_URL}/blog/animal-nutrition-crop-nutrition-link)
- [Granular Fertilizer Application Timing for Maximum Yield](${SITE_URL}/blog/granular-fertilizer-timing-yield)
- [Organic Farming Philosophy Meets Modern Granule Design](${SITE_URL}/blog/organic-farming-philosophy-granule-design)
- [Quality Assurance Systems for Fertilizer Distribution](${SITE_URL}/blog/quality-systems-for-large-distribution)
- [Building Brand Trust with Stronger Base Granules](${SITE_URL}/blog/stronger-base-granule-brand-promise)`
  },
  {
    path: '/contact',
    title: 'Contact J K Fertilizers',
    description: 'Contact details, factory address, and B2B sales inquiry.',
    content: `# Contact J K Fertilizers

- **Headquarters & Plant:** NH. 48, Opp. IOC Petrol Pump, B/H Adas Bus Stop, Vasad, Dist: Anand, Gujarat - 388305 INDIA
- **Phone:** +91 98250 45894
- **Email:** sales@jkfertilizers.com | info@jkfertilizers.com
- **Business Hours:** Monday – Saturday: 09:00 AM – 06:00 PM IST
- **Inquiries:** Contact our B2B team for bulk pricing, sample batches, and custom formulations.`
  }
];

function generateMarkdownFiles() {
  const outputs = [];

  // 1. Static Pages
  for (const page of staticPages) {
    outputs.push({
      path: page.path,
      markdown: page.content
    });
  }

  // 2. Dynamic Products
  const productsDir = join(ROOT_DIR, 'src/content/products');
  if (existsSync(productsDir)) {
    for (const slug of readdirSync(productsDir)) {
      const file = join(productsDir, slug, 'index.mdx');
      if (existsSync(file)) {
        const raw = readFileSync(file, 'utf8');
        const { data, body } = parseFrontmatter(raw);
        const title = data.title || slug;
        const summary = data.summary || data.tagline || '';
        const cleanedBody = cleanMdxBody(body);

        const md = `# ${title}

> **Manufacturer:** J K Fertilizers | **Location:** Anand, Gujarat, India | **Compliance:** FCO Approved

${summary ? `## Summary\n${summary}\n` : ''}

${cleanedBody}

---
- **Canonical URL:** ${SITE_URL}/products/${slug}
- **Inquiries:** Call +91 98250 45894 or email sales@jkfertilizers.com`;

        outputs.push({
          path: `/products/${slug}`,
          markdown: md
        });
      }
    }
  }

  // 3. Dynamic Services
  const servicesDir = join(ROOT_DIR, 'src/content/services');
  if (existsSync(servicesDir)) {
    for (const slug of readdirSync(servicesDir)) {
      const file = join(servicesDir, slug, 'index.mdx');
      if (existsSync(file)) {
        const raw = readFileSync(file, 'utf8');
        const { data, body } = parseFrontmatter(raw);
        const title = data.title || slug;
        const tagline = data.tagline || '';
        const cleanedBody = cleanMdxBody(body);

        const md = `# ${title}

> **Provider:** J K Fertilizers | **Facility:** Anand, Gujarat, India

${tagline ? `**${tagline}**\n` : ''}

${cleanedBody}

---
- **Canonical URL:** ${SITE_URL}/services/${slug}
- **Inquiries:** Call +91 98250 45894 or email sales@jkfertilizers.com`;

        outputs.push({
          path: `/services/${slug}`,
          markdown: md
        });
      }
    }
  }

  // 4. Dynamic Blog Posts
  const blogDir = join(ROOT_DIR, 'src/content/blog');
  if (existsSync(blogDir)) {
    for (const slug of readdirSync(blogDir)) {
      const file = join(blogDir, slug, 'index.mdx');
      if (existsSync(file)) {
        const raw = readFileSync(file, 'utf8');
        const { data, body } = parseFrontmatter(raw);
        const title = data.title || slug;
        const excerpt = data.excerpt || data.description || '';
        const date = data.date || '2024-01-01';
        const author = data.author || 'J K Fertilizers';
        const cleanedBody = cleanMdxBody(body);

        const md = `# ${title}

> **Author:** ${author} | **Date:** ${date} | **Published by:** J K Fertilizers

${excerpt ? `*${excerpt}*\n` : ''}

${cleanedBody}

---
- **Canonical URL:** ${SITE_URL}/blog/${slug}
- **Website:** ${SITE_URL}`;

        outputs.push({
          path: `/blog/${slug}`,
          markdown: md
        });
      }
    }
  }

  console.log(`[markdown] Generated ${outputs.length} Markdown route documents.`);

  // Write outputs to public and dist
  for (const item of outputs) {
    const relPath = item.path === '/' ? 'index' : item.path.replace(/^\//, '');

    // Write index.md or [slug].md and [slug]/index.md for complete routing compatibility
    const targets = [];

    if (item.path === '/') {
      targets.push('index.md');
    } else {
      targets.push(`${relPath}.md`);
      targets.push(join(relPath, 'index.md'));
    }

    for (const target of targets) {
      // Write to public/
      const pubFile = join(PUBLIC_DIR, target);
      const pubDir = join(PUBLIC_DIR, target, '..');
      if (!existsSync(pubDir)) mkdirSync(pubDir, { recursive: true });
      writeFileSync(pubFile, item.markdown, 'utf8');

      // Write to dist/ if it exists
      if (existsSync(DIST_DIR)) {
        const distFile = join(DIST_DIR, target);
        const distDir = join(DIST_DIR, target, '..');
        if (!existsSync(distDir)) mkdirSync(distDir, { recursive: true });
        writeFileSync(distFile, item.markdown, 'utf8');
      }
    }
  }

  console.log(`[markdown] Written markdown files to public/ and dist/!`);
  return outputs.length;
}

generateMarkdownFiles();
