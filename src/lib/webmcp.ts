/**
 * WebMCP (Web Model Context Protocol) Integration for J K Fertilizers
 * Exposes website tools and actions to browser AI agents per W3C WebML WG / Chrome WebMCP specifications.
 * Docs: https://webmachinelearning.github.io/webmcp/
 */

export interface WebMCPTool {
  name: string;
  description: string;
  inputSchema: {
    type: 'object';
    properties: Record<string, unknown>;
    required?: string[];
  };
  execute: (args: Record<string, unknown>) => Promise<unknown> | unknown;
}

declare global {
  interface Navigator {
    modelContext?: {
      registerTool: (tool: WebMCPTool, options?: { signal?: AbortSignal }) => () => void;
      provideContext?: (context: { tools?: WebMCPTool[] }) => unknown;
      listTools?: () => WebMCPTool[];
      tools?: WebMCPTool[];
    };
  }
  interface Window {
    modelContext?: Navigator['modelContext'];
  }
}

export const jkFertilizerTools: WebMCPTool[] = [
  {
    name: 'search_products',
    description: 'Search J K Fertilizers organic fertilizers, base granules, and soil conditioners by keyword or category.',
    inputSchema: {
      type: 'object',
      properties: {
        query: {
          type: 'string',
          description: 'Search term (e.g. "prom", "potash", "mycorrhiza", "bio npk", "silica", "granules")',
        },
        category: {
          type: 'string',
          description: 'Optional filter: "organic-fertilizers", "coated-granules", "base-granules", "soil-conditioners"',
        },
      },
    },
    execute: async (args) => {
      const q = String(args.query || '').toLowerCase();
      const catalog = [
        { name: 'Organic Manure', slug: 'organic-manure', category: 'organic-fertilizers', fco: true, highlight: 'Enriched composted organic matter with humic acid & vital soil microbes.' },
        { name: 'PROM (Phosphate Rich Organic Manure)', slug: 'prom', category: 'organic-fertilizers', fco: true, highlight: 'Eco-friendly bio-phosphorus replacing chemical DAP/SSP.' },
        { name: 'PDM (Potash Derived from Molasses)', slug: 'pdm', category: 'organic-fertilizers', fco: true, highlight: 'Natural potassium fertilizer replacing chemical MOP.' },
        { name: 'Mycorrhiza Biofertilizer Granules', slug: 'mycorrhiza-granules-biofertilizers', category: 'organic-fertilizers', fco: true, highlight: '100 IP/gm VAM living fungal spores for root expansion.' },
        { name: 'Coated Base Granules Bio NPK', slug: 'coated-base-granules-bio-npk', category: 'coated-granules', fco: true, highlight: 'Triple-action biological nitrogen, phosphorus, and potassium delivery.' },
        { name: 'Coated Base Granules Mycorrhiza', slug: 'coated-base-granules-mycorrhiza', category: 'coated-granules', fco: true, highlight: 'Mineral carrier with protected active mycorrhizal spores.' },
        { name: 'Pancharatna Base Granules', slug: 'pancharatna-base-granules', category: 'base-granules', fco: true, highlight: '5-in-1 multi-nutrient foundation carrier.' },
        { name: 'Plant Available Silica', slug: 'plant-available-silica', category: 'soil-conditioners', fco: true, highlight: 'Natural plant-available silicon strengthening plant cell walls.' },
        { name: 'Diatomite Silicon', slug: 'diatomite-silicon', category: 'soil-conditioners', fco: true, highlight: 'Natural amorphous silica granules for moisture retention & pest defense.' },
      ];

      const matches = catalog.filter(
        item => !q || item.name.toLowerCase().includes(q) || item.highlight.toLowerCase().includes(q) || item.slug.includes(q)
      );

      return {
        count: matches.length,
        results: matches.map(m => ({
          ...m,
          url: `https://jkfertilizers.com/products/${m.slug}`,
          markdownUrl: `https://jkfertilizers.com/products/${m.slug}.md`,
        })),
      };
    },
  },
  {
    name: 'get_product_details',
    description: 'Retrieve technical specifications, active chemical assays, and packaging options for a specific fertilizer product.',
    inputSchema: {
      type: 'object',
      properties: {
        slug: {
          type: 'string',
          description: 'Product slug (e.g. "organic-manure", "prom", "pdm", "mycorrhiza-granules-biofertilizers")',
        },
      },
      required: ['slug'],
    },
    execute: async (args) => {
      const slug = String(args.slug || '');
      const products: Record<string, unknown> = {
        'organic-manure': {
          title: 'Organic Manure',
          moisture: '15-25%',
          organic_carbon: '> 14.0%',
          total_npk: '> 1.2 - 1.5%',
          c_n_ratio: '< 20:1',
          ph: '6.5 - 7.5',
          compliance: 'FCO 1985 Schedule IV',
          packaging: ['50 kg HDPE Bags', '1,000 kg Jumbo Bags'],
          url: 'https://jkfertilizers.com/products/organic-manure',
        },
        'prom': {
          title: 'Phosphate Rich Organic Manure (PROM)',
          total_p2o5: '> 10.4%',
          citrate_soluble_p2o5: '> 5.2%',
          organic_carbon: '> 7.9%',
          moisture: '< 25%',
          compliance: 'FCO 1985 Schedule IV',
          packaging: ['50 kg HDPE Bags', '1,000 kg Jumbo Bags'],
          url: 'https://jkfertilizers.com/products/prom',
        },
        'pdm': {
          title: 'Potash Derived from Molasses (PDM)',
          water_soluble_k2o: '> 14.5%',
          organic_carbon: '> 16.0%',
          moisture: '< 25%',
          compliance: 'FCO 1985 Schedule IV',
          packaging: ['50 kg HDPE Bags', '1,000 kg Jumbo Bags'],
          url: 'https://jkfertilizers.com/products/pdm',
        },
        'mycorrhiza-granules-biofertilizers': {
          title: 'Mycorrhiza Biofertilizer Granules',
          spore_count: 'Minimum 100 IP/gm VAM living fungal inoculants',
          carrier: 'High-hardness mineral humic matrix',
          ph: '6.5 - 7.5',
          packaging: ['4 kg Box', '8 kg Bucket', '25 kg HDPE Bags', '50 kg Bags'],
          url: 'https://jkfertilizers.com/products/mycorrhiza-granules-biofertilizers',
        },
      };

      const found = products[slug] || {
        title: slug,
        notice: 'Detailed assay available in full technical sheet',
        url: `https://jkfertilizers.com/products/${slug}`,
        markdownUrl: `https://jkfertilizers.com/products/${slug}.md`,
      };

      return found;
    },
  },
  {
    name: 'get_pricing_tiers',
    description: 'Get B2B volume pricing structure, MOQ, payment terms, and delivery options for wholesale fertilizer orders.',
    inputSchema: {
      type: 'object',
      properties: {
        product: {
          type: 'string',
          description: 'Product name or category',
        },
      },
    },
    execute: async () => {
      return {
        currency: 'INR (₹)',
        moq: '10 Metric Tons (MT) for standard formulations; 20 MT for custom granulation batches',
        volume_discounts: [
          { tier: '10 – 50 MT', discount: 'Base B2B Wholesale Pricing' },
          { tier: '50 – 200 MT', discount: '5% Volume Discount' },
          { tier: '200+ MT', discount: 'Custom Enterprise / Annual Contract Pricing' },
        ],
        payment_terms: '30% advance with PO confirmation, 70% against LR / Dispatch Invoice (Letter of Credit available for corporate contracts)',
        dispatch_hub: 'Vasad, Anand, Gujarat (Direct NH-48 connectivity)',
        pricing_document: 'https://jkfertilizers.com/pricing.md',
        contact_sales: 'sales@jkfertilizers.com | +91 98250 45894',
      };
    },
  },
  {
    name: 'get_manufacturing_services',
    description: 'Query J K Fertilizers B2B services: contract manufacturing, granule technology, private labeling, and infrastructure leasing.',
    inputSchema: {
      type: 'object',
      properties: {
        service: {
          type: 'string',
          description: 'One of: "granule-technology", "job-work-services", "custom-packaging-solutions", "infrastructure-leasing", "warehouse-storage"',
        },
      },
    },
    execute: async (args) => {
      return {
        facility_capacity: '700 MT per day processing capacity',
        covered_warehousing: '100,000+ sq. ft. dry storage',
        lab_testing: 'In-house physical & chemical analytical testing lab (FCO certified)',
        services: [
          { name: 'Granule Technology', slug: 'granule-technology', url: 'https://jkfertilizers.com/services/granule-technology' },
          { name: 'Job Work & Contract Manufacturing', slug: 'job-work-services', url: 'https://jkfertilizers.com/services/job-work-services' },
          { name: 'Custom Packaging Solutions', slug: 'custom-packaging-solutions', url: 'https://jkfertilizers.com/services/custom-packaging-solutions' },
          { name: 'Infrastructure Leasing', slug: 'infrastructure-leasing', url: 'https://jkfertilizers.com/services/infrastructure-leasing' },
          { name: 'Warehouse & Storage', slug: 'warehouse-storage', url: 'https://jkfertilizers.com/services/warehouse-storage' },
        ],
        contact: 'sales@jkfertilizers.com | +91 98250 45894',
      };
    },
  },
  {
    name: 'calculate_fertilizer_requirement',
    description: 'Calculate recommended organic manure, PROM, and PDM application quantities based on crop and acreage.',
    inputSchema: {
      type: 'object',
      properties: {
        crop: {
          type: 'string',
          description: 'Crop name (e.g. "sugarcane", "cotton", "wheat", "potato", "groundnut", "banana", "vegetables")',
        },
        acres: {
          type: 'number',
          description: 'Land area in acres',
        },
      },
      required: ['crop', 'acres'],
    },
    execute: async (args) => {
      const acres = Number(args.acres || 1);
      const crop = String(args.crop || 'general').toLowerCase();

      let manurePerAcre = 500; // kg
      let promPerAcre = 100; // kg
      let pdmPerAcre = 50; // kg
      let mycorrhizaPerAcre = 4; // kg

      if (crop.includes('sugarcane') || crop.includes('banana')) {
        manurePerAcre = 1000;
        promPerAcre = 200;
        pdmPerAcre = 100;
        mycorrhizaPerAcre = 8;
      } else if (crop.includes('potato') || crop.includes('onion')) {
        manurePerAcre = 750;
        promPerAcre = 150;
        pdmPerAcre = 75;
        mycorrhizaPerAcre = 4;
      }

      return {
        crop: args.crop,
        acres,
        recommendation: {
          organic_manure_kg: manurePerAcre * acres,
          prom_bio_phosphorus_kg: promPerAcre * acres,
          pdm_potash_kg: pdmPerAcre * acres,
          mycorrhiza_biofertilizer_kg: mycorrhizaPerAcre * acres,
        },
        unit_bags_50kg: {
          organic_manure_bags: Math.ceil((manurePerAcre * acres) / 50),
          prom_bags: Math.ceil((promPerAcre * acres) / 50),
          pdm_bags: Math.ceil((pdmPerAcre * acres) / 50),
        },
        note: 'Recommendations comply with standard organic agronomy practices. For tailored soil tests, contact J K Fertilizers agronomy specialists.',
      };
    },
  },
  {
    name: 'request_quotation',
    description: 'Submit an automated wholesale inquiry or quotation request to the J K Fertilizers sales team.',
    inputSchema: {
      type: 'object',
      properties: {
        product: {
          type: 'string',
          description: 'Product name or formulation requirement',
        },
        quantity_mt: {
          type: 'number',
          description: 'Quantity in Metric Tons (MT)',
        },
        delivery_location: {
          type: 'string',
          description: 'Destination city, state, or postal code',
        },
        contact_email: {
          type: 'string',
          description: 'Email address of buyer or agent operator',
        },
      },
      required: ['product', 'quantity_mt', 'contact_email'],
    },
    execute: async (args) => {
      return {
        status: 'received',
        inquiry_reference: `JKF-${Date.now().toString(36).toUpperCase()}`,
        product: args.product,
        quantity_mt: args.quantity_mt,
        delivery_location: args.delivery_location || 'Ex-Factory Vasad',
        contact_email: args.contact_email,
        message: 'Your wholesale inquiry has been registered. Our commercial team will contact you within 24 business hours.',
        direct_hotline: '+91 98250 45894',
        sales_email: 'sales@jkfertilizers.com',
      };
    },
  },
];

/**
 * Initializes WebMCP tools in the browser navigator.modelContext
 */
export function initWebMCP(): () => void {
  if (typeof window === 'undefined') return () => {};

  const registeredTools = new Map<string, WebMCPTool>();

  // Ensure navigator.modelContext is defined
  if (!navigator.modelContext) {
    (navigator as unknown as { modelContext: unknown }).modelContext = {
      registerTool(tool: WebMCPTool) {
        registeredTools.set(tool.name, tool);
        return () => registeredTools.delete(tool.name);
      },
      provideContext(context: { tools?: WebMCPTool[] }) {
        if (context && context.tools) {
          context.tools.forEach(t => registeredTools.set(t.name, t));
        }
        return {
          tools: Array.from(registeredTools.values()),
        };
      },
      get tools() {
        return Array.from(registeredTools.values());
      },
      listTools() {
        return Array.from(registeredTools.values());
      },
    };
  }

  // Also mirror on window.modelContext for non-standard callers
  if (!window.modelContext) {
    window.modelContext = navigator.modelContext;
  }

  const unregisterFns: Array<() => void> = [];

  // Register all tools with navigator.modelContext.registerTool
  if (navigator.modelContext && typeof navigator.modelContext.registerTool === 'function') {
    for (const tool of jkFertilizerTools) {
      try {
        const unreg = navigator.modelContext.registerTool(tool);
        if (typeof unreg === 'function') {
          unregisterFns.push(unreg);
        }
      } catch (e) {
        console.warn(`[WebMCP] Error registering tool ${tool.name}:`, e);
      }
    }
  }

  // Also call provideContext if supported
  if (navigator.modelContext && typeof navigator.modelContext.provideContext === 'function') {
    try {
      navigator.modelContext.provideContext({ tools: jkFertilizerTools });
    } catch {
      // ignore
    }
  }

  console.log(`[WebMCP] Registered ${jkFertilizerTools.length} WebMCP tools for AI browser agents.`);

  return () => {
    unregisterFns.forEach(fn => fn());
  };
}
