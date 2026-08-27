/**
 * Markdown & MDX Content Cleaner and Sanitizer
 * (jkfertilizers.com)
 */

export interface ParsedFrontmatter {
  data: Record<string, any>;
  body: string;
}

/**
 * Parses YAML frontmatter from raw MDX/MD strings
 */
export function parseFrontmatter(raw: string): ParsedFrontmatter {
  const match = raw.match(/^\uFEFF?---[\r\n]([\s\S]*?)[\r\n]---/);
  if (!match) return { data: {}, body: raw };

  const block = match[1];
  const body = raw.slice(match[0].length).trim();
  const data: Record<string, any> = {};

  let currentKey = '';
  let isList = false;

  for (const line of block.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;

    // Check for list item
    if (trimmed.startsWith('- ') && currentKey) {
      if (!isList) {
        data[currentKey] = [];
        isList = true;
      }
      let val = trimmed.slice(2).trim();
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      data[currentKey].push(val);
      continue;
    }

    const colonIdx = line.indexOf(':');
    if (colonIdx === -1) continue;

    const key = line.slice(0, colonIdx).trim();
    let val = line.slice(colonIdx + 1).trim();

    if (val === '' || val === '|' || val === '>') {
      currentKey = key;
      isList = false;
      continue;
    }

    currentKey = key;
    isList = false;

    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    } else if (val === 'true') {
      val = true as any;
    } else if (val === 'false') {
      val = false as any;
    } else if (!isNaN(Number(val)) && val !== '') {
      val = Number(val) as any;
    }

    data[key] = val;
  }

  return { data, body };
}

/**
 * Cleans MDX body by stripping imports, JSX tags, and normalizing formatting
 */
export function cleanMdxBody(body: string = ''): string {
  return body
    .replace(/import\s+.*?from\s+['"].*?['"];?/g, '')
    .replace(/export\s+.*?;\n?/g, '')
    .replace(/<[A-Z][A-Za-z0-9]*(?:\s+[^>]*?)?\/>/g, '')
    .replace(/<[A-Z][A-Za-z0-9]*(?:\s+[^>]*?)?>([\s\S]*?)<\/[A-Z][A-Za-z0-9]*>/g, '$1')
    .replace(/<div(?:\s+[^>]*?)?>([\s\S]*?)<\/div>/gi, '$1')
    .replace(/<p(?:\s+[^>]*?)?>([\s\S]*?)<\/p>/gi, '$1\n\n')
    .replace(/<span(?:\s+[^>]*?)?>([\s\S]*?)<\/span>/gi, '$1')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, '[Image: $1]') // replace images with descriptive label
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1') // unwrap links for cleaner embeddings
    .replace(/\r\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

/**
 * Format structured frontmatter specs (e.g. Total P2O5, Organic Carbon, C:N ratio)
 * into high-fidelity search text.
 */
export function formatSpecsToText(specs: Array<{ label: string; value: string }> = []): string {
  if (!specs || specs.length === 0) return '';
  return specs.map((s) => `• ${s.label}: ${s.value}`).join('\n');
}

/**
 * Format benefits and howToApply into searchable text
 */
export function formatStructuredBlocks(
  benefits?: Array<{ title: string; detail: string }>,
  howToApply?: Array<{ step: string; title: string; detail: string }>,
  comparison?: { title?: string; rows: Array<{ feature: string; traditional: string; ours: string }> }
): string {
  const parts: string[] = [];

  if (benefits && benefits.length > 0) {
    parts.push('## Product Benefits\n' + benefits.map((b) => `### ${b.title}\n${b.detail}`).join('\n\n'));
  }

  if (howToApply && howToApply.length > 0) {
    parts.push(
      '## How to Apply & Dosage Instructions\n' +
        howToApply.map((h) => `Step ${h.step}: ${h.title}\n${h.detail}`).join('\n\n')
    );
  }

  if (comparison && comparison.rows && comparison.rows.length > 0) {
    parts.push(
      `## ${comparison.title || 'Product Comparison Matrix'}\n` +
        comparison.rows.map((r) => `• ${r.feature}: Traditional: ${r.traditional} | J K Fertilizers: ${r.ours}`).join('\n')
    );
  }

  return parts.join('\n\n');
}
