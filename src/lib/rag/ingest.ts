/**
 * Content Ingestion & ETL Pipeline for J K Fertilizers
 * (jkfertilizers.com)
 */

import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { parseFrontmatter, cleanMdxBody, formatSpecsToText, formatStructuredBlocks } from './cleaner';
import { chunkDocument } from './chunk';
import { embedBatch, measureEmbeddingDimension } from './embeddings';
import { ensureCollection, upsertChunks } from './qdrant';
import type { DocumentChunk, DocumentCategory, DocumentType, IngestionStats } from './types';

function computeHash(content: string): string {
  return crypto.createHash('sha256').update(content).digest('hex').slice(0, 16);
}

export interface MasterDocument {
  url: string;
  title: string;
  category: DocumentCategory;
  type: DocumentType;
  content: string;
  metadata: Record<string, unknown>;
}

export function loadAllProducts(rootDir?: string): MasterDocument[] {
  const baseDir = rootDir || process.cwd();
  const productsDir = path.join(baseDir, 'src/content/products');
  if (!fs.existsSync(productsDir)) return [];

  const items: MasterDocument[] = [];
  const folders = fs.readdirSync(productsDir);

  for (const slug of folders) {
    const file = path.join(productsDir, slug, 'index.mdx');
    if (!fs.existsSync(file)) continue;

    const raw = fs.readFileSync(file, 'utf8');
    const { data, body } = parseFrontmatter(raw);

    const title = String(data.title || slug);
    const summary = String(data.summary || data.tagline || '');
    const cleanedBody = cleanMdxBody(body);

    const specsText = formatSpecsToText(data.specs || []);
    const structuredText = formatStructuredBlocks(data.benefits, data.howToApply, data.comparison);

    const fullContent = [
      `# ${title}`,
      `> **Manufacturer:** J K Fertilizers | **Plant:** Vasad, Anand, Gujarat | **Compliance:** FCO Approved`,
      summary ? `\n## Summary\n${summary}` : '',
      data.fit ? `\n## Key Characteristics\n${(data.fit as string[]).map((f: string) => `• ${f}`).join('\n')}` : '',
      specsText ? `\n## Technical & Chemical Specifications (FCO 1985)\n${specsText}` : '',
      cleanedBody ? `\n## Detailed Description & Mechanisms\n${cleanedBody}` : '',
      structuredText ? `\n${structuredText}` : '',
      `\n## B2B Commercials & Contact\n- **Inquiries:** Call +91 98250 45894 | Email: sales@jkfertilizers.com\n- **Plant Location:** NH. 48, Vasad, Anand, Gujarat - 388305`,
    ]
      .filter(Boolean)
      .join('\n\n');

    items.push({
      url: `/products/${slug}`,
      title,
      category: 'Product',
      type: 'product',
      content: fullContent,
      metadata: {
        slug,
        category: data.category || 'Organic Fertilizers',
        fit: data.fit || [],
        fcoCompliant: true,
      },
    });
  }

  return items;
}

export function loadAllServices(rootDir?: string): MasterDocument[] {
  const baseDir = rootDir || process.cwd();
  const servicesDir = path.join(baseDir, 'src/content/services');
  if (!fs.existsSync(servicesDir)) return [];

  const items: MasterDocument[] = [];
  const folders = fs.readdirSync(servicesDir);

  for (const slug of folders) {
    const file = path.join(servicesDir, slug, 'index.mdx');
    if (!fs.existsSync(file)) continue;

    const raw = fs.readFileSync(file, 'utf8');
    const { data, body } = parseFrontmatter(raw);

    const title = String(data.title || slug);
    const description = String(data.description || data.tagline || '');
    const cleanedBody = cleanMdxBody(body);

    const fullContent = [
      `# ${title}`,
      `> **Service Provider:** J K Fertilizers | **Facility:** Vasad, Anand, Gujarat | **Capacity:** 700 MT/day`,
      description ? `\n## Overview\n${description}` : '',
      cleanedBody ? `\n${cleanedBody}` : '',
      `\n## Commercial Engagement\n- **Facility:** 100,000+ sq. ft. covered warehousing & multi-drum granulation lines\n- **Inquiries:** sales@jkfertilizers.com | +91 98250 45894`,
    ]
      .filter(Boolean)
      .join('\n\n');

    items.push({
      url: `/services/${slug}`,
      title,
      category: 'Service',
      type: 'service',
      content: fullContent,
      metadata: {
        slug,
        concept: data.concept || 'Manufacturing',
      },
    });
  }

  return items;
}

export function loadAllBlogs(rootDir?: string): MasterDocument[] {
  const baseDir = rootDir || process.cwd();
  const blogDir = path.join(baseDir, 'src/content/blog');
  if (!fs.existsSync(blogDir)) return [];

  const items: MasterDocument[] = [];
  const folders = fs.readdirSync(blogDir);

  for (const slug of folders) {
    const file = path.join(blogDir, slug, 'index.mdx');
    if (!fs.existsSync(file)) continue;

    const raw = fs.readFileSync(file, 'utf8');
    const { data, body } = parseFrontmatter(raw);

    const title = String(data.title || slug);
    const excerpt = String(data.excerpt || data.description || '');
    const date = String(data.dateDisplay || data.date || '2026-08-01');
    const author = String(data.author || 'J K Fertilizers');
    const cleanedBody = cleanMdxBody(body);

    const fullContent = [
      `# ${title}`,
      `> **Author:** ${author} | **Published:** ${date} | **Publisher:** J K Fertilizers`,
      excerpt ? `\n*${excerpt}*\n` : '',
      cleanedBody ? `\n${cleanedBody}` : '',
      `\n---\n**Source:** https://jkfertilizers.com/blog/${slug}`,
    ]
      .filter(Boolean)
      .join('\n\n');

    items.push({
      url: `/blog/${slug}`,
      title,
      category: 'Blog',
      type: 'blog',
      content: fullContent,
      metadata: {
        slug,
        date,
        topic: data.topic || 'Agronomy',
        tags: data.tags || [],
      },
    });
  }

  return items;
}

export function loadStaticPages(): MasterDocument[] {
  return [
    {
      url: '/',
      title: 'J K Fertilizers: Organic Fertilizer Manufacturer',
      category: 'Company',
      type: 'page',
      content: `# J K Fertilizers: Organic Fertilizer Manufacturer

> **Location:** Anand, Gujarat, India | **Founded:** 2006 by Mr. Akash Dadhania | **Capacity:** 700 MT/day | **Warehousing:** 100,000+ sq. ft. | **Compliance:** FCO Approved

## Overview
J K Fertilizers is a premier B2B manufacturer of FCO-approved organic fertilizers, mineral-coated base carrier granules, and customized soil conditioners in Western India. Headquartered along NH-48 in Vasad, Anand, Gujarat, we partner with fertilizer corporations, state federations, commercial blenders, and institutional buyers nationwide.

## Manufacturing Capabilities & Scale
- **Processing Capacity:** 700 MT per day through dedicated rotary drum granulation lines.
- **Warehousing:** Over 100,000 sq. ft. of dry covered storage ensuring zero moisture contamination.
- **In-House Laboratory:** Batch-by-batch physical and chemical analytical QC testing for moisture, crushing hardness, organic carbon, and NPK assays.
- **Packaging Lines:** Automated bagging from 1 kg retail pouches to 50 kg HDPE bags and 1,000 kg jumbo bulk bags.

## Core Product Portfolio
1. **Phosphate Rich Organic Manure (PROM):** FCO-certified organic bio-phosphorus (min. 10.4% P2O5, min. 7.9% Organic Carbon) replacing chemical DAP and SSP without calcium lockup.
2. **Potash Derived from Molasses (PDM):** Organic potassium fertilizer (min. 14.5% K2O, min. 16% Organic Carbon) replacing synthetic MOP.
3. **Organic Manure:** Humic-rich composted organic fertilizer restoring soil organic carbon.
4. **Mycorrhiza Biofertilizer Granules:** High-potency VAM living fungal inoculants for enhanced root surface area.
5. **Coated Base Granules (Bio NPK & Mycorrhiza):** Protective mineral cores with active biological inoculants.
6. **Engineered Base Granules:** Pancharatna 5-in-1, Organic Carbon Granules, Humic Matrix Granules, Plant Available Silica, Diatomite Silicon.

## Commercial Contacts
- **Phone:** +91 98250 45894 | +91 98250 45892 | +91 98250 45891
- **Emails:** sales@jkfertilizers.com | info@jkfertilizers.com
- **Address:** NH. 48, Opp. IOC Petrol Pump, B/H Adas Bus Stop, Vasad, Dist: Anand, Gujarat - 388305 INDIA`,
      metadata: { page: 'home' },
    },
    {
      url: '/about',
      title: 'About J K Fertilizers — Leadership, Mission & Standards',
      category: 'Company',
      type: 'page',
      content: `# About J K Fertilizers

Founded in 2006 by Mr. Akash Dadhania (Founder & Director), J K Fertilizers has grown into a leading Western India granulation and bio-fertilizer manufacturing complex located in Vasad, Anand, Gujarat.

## Leadership & Vision
- **Founder & Director:** Mr. Akash Dadhania
- **Mission:** To manufacture dependable, FCO-compliant organic fertilizers and engineered carrier granules that rebuild soil organic carbon and ensure sustainable crop productivity.
- **Philosophy:** "Tested specifications, consistent granules, dependable bulk delivery."

## Facility Infrastructure
- **Location:** Strategically situated on National Highway 48 (NH-48) in Vasad, Anand district, Gujarat, facilitating direct multi-axle freight transport across India.
- **Production Lines:** Multiple industrial rotary drum granulators with precision temperature and moisture controls.
- **QC Laboratory:** Continuous in-house analysis guaranteeing that every batch strictly satisfies Fertilizer Control Order (FCO, 1985) Schedule IV parameters.`,
      metadata: { page: 'about' },
    },
    {
      url: '/history',
      title: 'Company History & Milestones — J K Fertilizers',
      category: 'Company',
      type: 'page',
      content: `# J K Fertilizers History & Milestones

- **2006:** Founded first organic manure processing unit in Anand, Gujarat under Mr. Akash Dadhania.
- **2011:** Commissioned commercial rotary drum granulation facility for engineered base carrier granules.
- **2016:** Introduced specialized biological coating lines for living Mycorrhizal spores and Bio NPK inoculants.
- **2020:** Expanded covered dry warehousing beyond 100,000 sq. ft. and achieved 700 MT/day processing capacity.
- **2024–Present:** Pan-India institutional supply contracts, private-label manufacturing partnerships, and agricultural export operations.`,
      metadata: { page: 'history' },
    },
    {
      url: '/pricing.md',
      title: 'Commercial Terms, Pricing & B2B Orders — J K Fertilizers',
      category: 'Commercial',
      type: 'guide',
      content: `# B2B Commercial Terms, Pricing & Order Guidelines

## Minimum Order Quantities (MOQ)
- **Standard Catalog Products (PROM, PDM, Organic Manure, Mycorrhiza):** 10 Metric Tons (MT).
- **Custom Coated Granules & Formulations:** 20 Metric Tons (MT).
- **Toll Manufacturing & Job Work:** 50 Metric Tons (MT) batch size.

## Packaging Options
- 1 kg, 4 kg, 5 kg retail boxes & pouches (custom printed for private labels).
- 25 kg & 50 kg multi-layer HDPE woven bags with inner LDPE moisture barrier.
- 1,000 kg (1 Ton) Jumbo Bulk Bags with lifting loops.

## Commercial Terms & Inquiries
- **Payment:** 30% advance on PO confirmation, balance 70% against LR / dispatch invoice (Letter of Credit accepted for corporate/PSU orders).
- **Dispatch Hub:** Ex-Factory Vasad, Anand, Gujarat.
- **Sales Hotline:** +91 98250 45894 | sales@jkfertilizers.com`,
      metadata: { page: 'pricing' },
    },
    {
      url: '/contact',
      title: 'Contact & Factory Address — J K Fertilizers',
      category: 'Company',
      type: 'page',
      content: `# Contact J K Fertilizers

- **Plant & Office Address:** NH. 48, Opp. IOC Petrol Pump, B/H Adas Bus Stop, Vasad, Dist: Anand, Gujarat - 388305 INDIA
- **Founder & Director:** Mr. Akash Dadhania
- **Primary Sales Phone:** +91 98250 45894
- **Alternate Phone Numbers:** +91 98250 45892 | +91 98250 45891
- **Emails:** sales@jkfertilizers.com | info@jkfertilizers.com
- **Working Hours:** Monday to Saturday: 09:00 AM – 06:00 PM IST
- **Inquiry Services:** Bulk Supply, Custom Formulations, Toll Manufacturing, Private Label Packaging, Plant Inspection Visits.`,
      metadata: { page: 'contact' },
    },
  ];
}

export async function ingestAllContent(rootDir?: string): Promise<IngestionStats> {
  const startTime = Date.now();
  console.log('🚀 Starting J K Fertilizers RAG Content Ingestion Pipeline...');

  const baseDir = rootDir || process.cwd();
  const products = loadAllProducts(baseDir);
  const services = loadAllServices(baseDir);
  const blogs = loadAllBlogs(baseDir);
  const staticPages = loadStaticPages();

  const allDocuments = [...products, ...services, ...blogs, ...staticPages];
  console.log(`[ingest] Loaded ${allDocuments.length} master documents (${products.length} products, ${services.length} services, ${blogs.length} blogs, ${staticPages.length} pages).`);

  const allChunks: DocumentChunk[] = [];
  for (const doc of allDocuments) {
    const docChunks = chunkDocument(doc);
    for (const ch of docChunks) {
      ch.contentHash = computeHash(ch.content);
      allChunks.push(ch);
    }
  }
  console.log(`[ingest] Created ${allChunks.length} semantic chunks with hierarchical breadcrumbs.`);

  console.log('\n[1/3] Probing embedding dimension...');
  const dimension = await measureEmbeddingDimension();
  await ensureCollection(dimension);

  console.log(`[2/3] Generating dense vector embeddings (Dimension: ${dimension})...`);
  const textsToEmbed = allChunks.map((c) => c.content);
  const embeddings = await embedBatch(textsToEmbed, (done, total) => {
    if (done % 30 === 0 || done === total) {
      console.log(`[embeddings] Progress: ${done}/${total} (${Math.round((done / total) * 100)}%)`);
    }
  });

  // Validate vector dimensions before upsert — never write mixed-size vectors
  const badIndex = embeddings.findIndex((v) => !Array.isArray(v) || v.length !== dimension);
  if (badIndex !== -1) {
    throw new Error(
      `[ingest] Embedding dimension mismatch at chunk ${badIndex}: got ${
        Array.isArray(embeddings[badIndex]) ? embeddings[badIndex].length : 'non-array'
      }, expected ${dimension}. Refusing to upsert.`
    );
  }

  for (let i = 0; i < allChunks.length; i++) {
    allChunks[i].embedding = embeddings[i];
    allChunks[i].embeddingDimension = dimension;
  }

  console.log(`[3/3] Upserting ${allChunks.length} vectors to Qdrant Cloud...`);
  const upsertedCount = await upsertChunks(allChunks);
  console.log(`✅ Upserted ${upsertedCount} points into Qdrant Cloud successfully!`);

  const durationMs = Date.now() - startTime;
  console.log(`🎉 Ingestion completed in ${(durationMs / 1000).toFixed(2)}s.`);

  return {
    documentsIndexed: allDocuments.length,
    chunksCreated: allChunks.length,
    skippedUnchanged: 0,
    durationMs,
  };
}
