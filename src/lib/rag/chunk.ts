/**
 * Hierarchical Heading-Aware Chunker for Agronomy & Fertilizer Knowledge
 * (jkfertilizers.com)
 */

import type { DocumentChunk, DocumentCategory, DocumentType } from './types';

export interface ChunkOptions {
  maxChunkChars?: number;
  overlapChars?: number;
  minChunkChars?: number;
}

const DEFAULT_OPTIONS: Required<ChunkOptions> = {
  maxChunkChars: 1500,
  overlapChars: 250,
  minChunkChars: 120,
};

/**
 * Split text into semantic chunks while preserving hierarchical breadcrumb headers
 */
export function chunkDocument(
  doc: {
    url: string;
    title: string;
    category: DocumentCategory;
    type: DocumentType;
    content: string;
    metadata?: Record<string, unknown>;
  },
  options: ChunkOptions = {}
): DocumentChunk[] {
  const opts = { ...DEFAULT_OPTIONS, ...options };
  const rawText = doc.content.trim();
  if (!rawText) return [];

  // Split document by markdown headings (H1, H2, H3, H4)
  const headingRegex = /^(#{1,4}\s+[^\n]+)/gm;
  const sections: Array<{ heading: string; body: string }> = [];

  let lastIndex = 0;
  let currentHeading = 'Overview';
  let match: RegExpExecArray | null;

  while ((match = headingRegex.exec(rawText)) !== null) {
    const headingText = match[1].replace(/^#+\s*/, '').trim();
    const sectionBody = rawText.slice(lastIndex, match.index).trim();

    if (sectionBody) {
      sections.push({
        heading: currentHeading,
        body: sectionBody,
      });
    }

    currentHeading = headingText;
    lastIndex = match.index + match[0].length;
  }

  // Trailing section
  const trailingBody = rawText.slice(lastIndex).trim();
  if (trailingBody) {
    sections.push({
      heading: currentHeading,
      body: trailingBody,
    });
  }

  const chunks: DocumentChunk[] = [];
  let chunkIndex = 0;

  for (const section of sections) {
    const breadcrumb = `[${doc.type.toUpperCase()}: ${doc.title}] > [Section: ${section.heading}]`;
    const sectionText = section.body;

    if (sectionText.length <= opts.maxChunkChars) {
      if (sectionText.length >= opts.minChunkChars || sections.length === 1) {
        chunks.push({
          url: doc.url,
          title: doc.title,
          heading: section.heading,
          chunkIndex: chunkIndex++,
          category: doc.category,
          type: doc.type,
          content: `${breadcrumb}\n\n${sectionText}`,
          metadata: doc.metadata,
        });
      }
      continue;
    }

    // Split long section across paragraph boundaries
    const paragraphs = sectionText.split(/\n\n+/);
    let currentChunkText = '';

    for (let i = 0; i < paragraphs.length; i++) {
      const p = paragraphs[i].trim();
      if (!p) continue;

      if ((currentChunkText + '\n\n' + p).length <= opts.maxChunkChars) {
        currentChunkText = currentChunkText ? `${currentChunkText}\n\n${p}` : p;
      } else {
        if (currentChunkText.length >= opts.minChunkChars) {
          chunks.push({
            url: doc.url,
            title: doc.title,
            heading: section.heading,
            chunkIndex: chunkIndex++,
            category: doc.category,
            type: doc.type,
            content: `${breadcrumb}\n\n${currentChunkText}`,
            metadata: doc.metadata,
          });
        }

        // Apply overlap from end of previous chunk if possible
        const overlap = currentChunkText.slice(-opts.overlapChars);
        currentChunkText = overlap ? `${overlap}\n\n${p}` : p;

        // If a single paragraph is longer than maxChunkChars, hard slice it
        while (currentChunkText.length > opts.maxChunkChars) {
          const slice = currentChunkText.slice(0, opts.maxChunkChars);
          chunks.push({
            url: doc.url,
            title: doc.title,
            heading: section.heading,
            chunkIndex: chunkIndex++,
            category: doc.category,
            type: doc.type,
            content: `${breadcrumb}\n\n${slice}`,
            metadata: doc.metadata,
          });
          currentChunkText = currentChunkText.slice(opts.maxChunkChars - opts.overlapChars);
        }
      }
    }

    if (currentChunkText.trim().length >= opts.minChunkChars) {
      chunks.push({
        url: doc.url,
        title: doc.title,
        heading: section.heading,
        chunkIndex: chunkIndex++,
        category: doc.category,
        type: doc.type,
        content: `${breadcrumb}\n\n${currentChunkText.trim()}`,
        metadata: doc.metadata,
      });
    }
  }

  return chunks;
}
