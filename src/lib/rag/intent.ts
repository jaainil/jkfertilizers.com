/**
 * Zero-Latency Query Intent Classifier for J K Fertilizers
 * (jkfertilizers.com)
 */

import type { QueryIntent } from './types';

interface IntentRule {
  intent: QueryIntent;
  patterns: RegExp[];
}

const INTENT_RULES: IntentRule[] = [
  {
    intent: 'specifications',
    patterns: [
      /\b(spec|specs|specification|assay|p2o5|phosphorus|potash|k2o|npk|c:n|moisture|ph|carbon|heavy metals?|fco limit|purity|crushing strength|hardness|mesh|particle size)\b/i,
    ],
  },
  {
    intent: 'application',
    patterns: [
      /\b(apply|application|how to use|dosage|dose|rate|acre|hectare|basal|furrow|timing|when to apply|soil dressing|wheat|paddy|cotton|sugarcane|potato|vegetable|orchard)\b/i,
    ],
  },
  {
    intent: 'pricing_commercial',
    patterns: [
      /\b(price|pricing|cost|rate|moq|minimum order|quotation|quote|payment|terms|wholesale|bulk order|jumbo bag|freight|dispatch|commercial)\b/i,
    ],
  },
  {
    intent: 'manufacturing_b2b',
    patterns: [
      /\b(capacity|700 mt|plant|facility|manufacturing|granulation|drum|job work|toll manufacturing|contract manufacturing|private label|packaging|warehousing|warehouse|100,?000)\b/i,
    ],
  },
  {
    intent: 'company',
    patterns: [
      /\b(who is|akash|dadhania|founder|director|leadership|about jk|history|since 2006|contact|phone|email|address|location|vasad|anand|gujarat)\b/i,
    ],
  },
  {
    intent: 'product',
    patterns: [
      /\b(prom|pdm|organic manure|mycorrhiza|bio npk|pancharatna|silica|diatomite|humic|base granules?|coated granules?|carrier|biofertilizer|fertilizer)\b/i,
    ],
  },
  {
    intent: 'blog_agronomy',
    patterns: [
      /\b(phosphorus fixation|fixation|calcareous|alkaline soil|dap vs prom|prom vs dap|soil health|organic carbon|microbial|rhizosphere|root expansion|vam)\b/i,
    ],
  },
];

/**
 * Classifies a user query into a structured agronomic or commercial intent
 */
export function classifyIntent(query: string): QueryIntent {
  const normalized = query.toLowerCase().trim();

  for (const rule of INTENT_RULES) {
    for (const pattern of rule.patterns) {
      if (pattern.test(normalized)) {
        return rule.intent;
      }
    }
  }

  return 'general';
}

/**
 * Extract key agricultural and product terms from query for hybrid boosting
 */
export function extractKeyTerms(query: string): string[] {
  const normalized = query.toLowerCase();
  const knownTerms = [
    'prom',
    'pdm',
    'dap',
    'ssp',
    'mop',
    'organic manure',
    'mycorrhiza',
    'bio npk',
    'pancharatna',
    'silica',
    'diatomite',
    'humic',
    '700 mt',
    'akash dadhania',
    'anand',
    'vasad',
    'fco',
    'job work',
    'dosage',
    'phosphorus fixation',
  ];

  return knownTerms.filter((term) => normalized.includes(term));
}
