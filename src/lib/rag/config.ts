/**
 * Configuration & Constants for J K Fertilizers RAG Engine
 * (Server-Side Isolated Configuration)
 */

export const RAG_CONFIG = {
  qdrant: {
    url:
      process.env.QDRANT_URL ||
      'https://f7814cb5-ba72-40dc-b1a4-2734c9ce0a91.europe-west3-0.gcp.cloud.qdrant.io',
    apiKey: process.env.QDRANT_API_KEY || '',
    collectionName: process.env.QDRANT_COLLECTION || 'jk_fertilizers_rag',
  },
  embedding: {
    provider: 'openwebui',
    model: process.env.EMBEDDING_MODEL || 'embeddinggemma:latest',
    openWebUiBaseUrl: process.env.OPENWEBUI_BASE_URL || '',
    openWebUiApiKey: process.env.OPENWEBUI_API_KEY || '',
    dimension: Number(process.env.EMBEDDING_DIMENSION) || 0, // 0 = measured at runtime
  },
  llm: {
    openRouterApiKey: process.env.OPENROUTER_API_KEY || '',
    geminiApiKey: process.env.GEMINI_API_KEY || '',
    geminiModel: process.env.GEMINI_MODEL || 'gemini-3.5-flash-lite',
    temperature: 0.1,
    maxTokens: 1024,
  },
  retrieval: {
    topK: 4,
    rerankModel: process.env.RERANK_MODEL || 'nvidia/llama-nemotron-rerank-vl-1b-v2:free',
    minSimilarityThreshold: 0.38,
    decisiveSimilarityThreshold: 0.65,
    marginThreshold: 0.08,
  },
  company: {
    name: 'J K Fertilizers',
    tagline: 'Organic, Naturally — High-Quality Granules for Resilient Soils',
    founder: 'Mr. Akash Dadhania',
    founderTitle: 'Founder & Director',
    establishedYear: 2006,
    facilityLocation: 'Vasad, Anand, Gujarat (NH-48)',
    address: 'NH. 48, Opp. IOC Petrol Pump, B/H Adas Bus Stop, Vasad, Dist: Anand, Gujarat - 388305 INDIA',
    capacity: '700 MT/day processing capacity',
    warehousing: '100,000+ sq. ft. covered warehousing',
    phone: '+91 98250 45894',
    phoneAlt: '+91 98250 45892',
    phoneAlt2: '+91 98250 45891',
    emails: ['sales@jkfertilizers.com', 'info@jkfertilizers.com'],
    website: 'https://jkfertilizers.com',
    compliance: 'FCO 1985 (Fertilizer Control Order) Schedule IV Compliant',
  },
};
