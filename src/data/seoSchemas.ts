/**
 * Central JSON-LD / Schema.org structured data for J K Fertilizers.
 * Used by SEOHead on every page for maximum Google Rich Results eligibility.
 */

const SITE_URL = "https://jkfertilizers.com";
const LOGO_URL = `${SITE_URL}/logo.png`;
const OG_IMAGE_URL = `${SITE_URL}/og-image.png`;

// ─── Schema.org Type Definitions ───────────────────────────────────────────────

interface SchemaBase {
  "@context"?: string;
  "@type": string | string[];
}

interface ImageObject {
  "@type": "ImageObject";
  "@id"?: string;
  url: string;
  width?: number;
  height?: number;
  caption?: string;
  contentUrl?: string;
}

interface Person {
  "@type": "Person";
  name: string;
  jobTitle?: string;
  worksFor?: { "@id": string };
}

interface PostalAddress {
  "@type": "PostalAddress";
  "@id": string;
  streetAddress: string;
  addressLocality: string;
  addressRegion: string;
  postalCode: string;
  addressCountry: string;
}

interface GeoCoordinates {
  "@type": "GeoCoordinates";
  latitude: string;
  longitude: string;
}

interface OpeningHoursSpecification {
  "@type": "OpeningHoursSpecification";
  dayOfWeek?: string[];
  opens?: string;
  closes?: string;
}

interface ContactPoint {
  "@type": "ContactPoint";
  telephone?: string;
  email?: string;
  contactType: string;
  contactOption?: string;
  areaServed: string | string[];
  availableLanguage?: string[];
  hoursAvailable?: OpeningHoursSpecification;
}

interface PropertyValue {
  "@type": "PropertyValue";
  name: string;
  value: string;
}

interface QuantitativeValue {
  "@type": "QuantitativeValue";
  value: number;
}

interface Country {
  "@type": "Country";
  name: string;
}

interface State {
  "@type": "State";
  name: string;
}

interface City {
  "@type": "City";
  name: string;
}

interface AdministrativeArea {
  "@type": "AdministrativeArea";
  name: string;
}

interface Offer {
  "@type": "Offer";
  itemOffered: ProductItem | ServiceItem;
  url?: string;
}

interface ProductItem {
  "@type": "Product";
  name: string;
  url?: string;
}

interface ServiceItem {
  "@type": "Service";
  name: string;
  description?: string;
  url?: string;
}

interface OfferCatalog {
  "@type": "OfferCatalog";
  name: string;
  itemListElement: Offer[];
}

interface BreadcrumbItem {
  name: string;
  path: string;
}

interface ListItem {
  "@type": "ListItem";
  position: number;
  name: string;
  item?: string;
  url?: string;
  description?: string;
}

interface Question {
  "@type": "Question";
  name: string;
  acceptedAnswer: {
    "@type": "Answer";
    text: string;
  };
}

interface HowToSupply {
  "@type": "HowToSupply";
  name: string;
}

interface HowToTool {
  "@type": "HowToTool";
  name: string;
}

interface HowToStep {
  "@type": "HowToStep";
  position: number;
  name: string;
  text: string;
}

interface EntryPoint {
  "@type": "EntryPoint";
  urlTemplate: string;
}

interface SearchAction {
  "@type": "SearchAction";
  target: EntryPoint;
  "query-input": string;
}

interface Organization extends SchemaBase {
  "@id": string;
  name: string;
  alternateName?: string[];
  url: string;
  logo?: ImageObject;
  image?: ImageObject[];
  description?: string;
  foundingDate?: string;
  founder?: Person;
  address?: PostalAddress;
  geo?: GeoCoordinates;
  hasMap?: string;
  telephone?: string;
  email?: string | string[];
  contactPoint?: ContactPoint[];
  openingHours?: string[];
  sameAs?: string[];
  hasOfferCatalog?: OfferCatalog;
  numberOfEmployees?: QuantitativeValue;
  award?: string;
  slogan?: string;
  areaServed?: (Country | State | City | AdministrativeArea)[];
  knowsAbout?: string[];
  memberOf?: { "@type": "Organization"; name: string }[];
}

interface WebSite extends SchemaBase {
  "@id": string;
  url: string;
  name: string;
  description?: string;
  publisher?: { "@id": string };
  inLanguage?: string[];
  potentialAction?: SearchAction;
}

interface BreadcrumbList extends SchemaBase {
  itemListElement: ListItem[];
}

interface FAQPage extends SchemaBase {
  mainEntity: Question[];
}

interface Product extends SchemaBase {
  "@id": string;
  name: string;
  description?: string;
  image: ImageObject | ImageObject[];
  brand?: { "@type": "Brand"; name: string };
  manufacturer?: { "@id": string };
  category?: string;
  additionalProperty?: PropertyValue[];
  offers?: {
    "@type": "Offer";
    url: string;
    priceCurrency: string;
    availability: string;
    itemCondition: string;
    seller: { "@id": string };
    areaServed?: (Country | { "@type": "Country"; name: string })[];
    eligibleRegion?: (Country | { "@type": "Country"; name: string })[];
  };
  keywords?: string;
  countryOfOrigin?: Country;
  isSimilarTo?: { "@type": "Product"; name: string }[];
}

interface HowTo extends SchemaBase {
  name?: string;
  description?: string;
  image?: ImageObject;
  supply?: HowToSupply[];
  tool?: HowToTool[];
  step?: HowToStep[];
}

interface ItemList extends SchemaBase {
  "@id": string;
  name?: string;
  description?: string;
  url?: string;
  numberOfItems?: number;
  itemListElement: ListItem[];
}

interface BlogPosting extends SchemaBase {
  "@id": string;
  headline: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified: string;
  author: Person;
  publisher?: { "@id": string };
  image: ImageObject;
  mainEntityOfPage: { "@type": "WebPage"; "@id": string };
  isPartOf: {
    "@type": "Blog";
    "@id": string;
    name: string;
    url: string;
  };
  inLanguage?: string;
  keywords?: string;
  about?: { "@id": string };
  mentions?: { "@id": string };
}

interface Blog extends SchemaBase {
  "@id": string;
  url: string;
  name: string;
  description?: string;
  publisher?: { "@id": string };
  inLanguage?: string;
  about?: { "@id": string };
}

interface Service extends SchemaBase {
  "@id": string;
  name: string;
  description?: string;
  url?: string;
  provider?: { "@id": string };
  areaServed?: (Country | { "@type": "Country"; name: string })[];
  serviceType?: string[];
  hasOfferCatalog?: OfferCatalog;
  image?: ImageObject;
  mainEntityOfPage?: { "@type": "WebPage"; "@id": string };
  breadcrumb?: BreadcrumbList;
}

interface AboutPage extends SchemaBase {
  "@id": string;
  url: string;
  name: string;
  description?: string;
  mainEntity: { "@id": string };
  inLanguage?: string;
  breadcrumb?: BreadcrumbList;
}

interface ContactPage extends SchemaBase {
  "@id": string;
  url: string;
  name: string;
  description?: string;
  mainEntity: { "@id": string };
  inLanguage?: string;
  breadcrumb?: BreadcrumbList;
}

interface CollectionPage extends SchemaBase {
  "@id": string;
  url: string;
  name: string;
  description?: string;
  provider?: { "@id": string };
  inLanguage?: string;
  breadcrumb?: BreadcrumbList;
}

/* ─────────────────────────────────────────────
   1. Organization + LocalBusiness (Extended)
   ───────────────────────────────────────────── */
export const organizationSchema: Organization = {
  "@context": "https://schema.org",
  "@type": ["Organization", "LocalBusiness", "ManufacturingBusiness"],
  "@id": `${SITE_URL}/#organization`,
  name: "J K Fertilizers",
  alternateName: ["JK Fertilizers", "JKF", "J K Fertilizers Pvt Ltd"],
  url: SITE_URL,
  logo: {
    "@type": "ImageObject",
    "@id": `${SITE_URL}/#logo`,
    url: LOGO_URL,
    contentUrl: LOGO_URL,
    width: 200,
    height: 60,
    caption: "J K Fertilizers Logo",
  },
  image: [
    {
      "@type": "ImageObject",
      url: OG_IMAGE_URL,
      width: 1200,
      height: 630,
      caption: "J K Fertilizers — Manufacturers of Organic Fertilizers, Anand Gujarat",
    },
    {
      "@type": "ImageObject",
      url: `${SITE_URL}/images/factory.jpg`,
      caption: "J K Fertilizers Manufacturing Facility — Anand, Gujarat, INDIA",
    },
  ],
  description:
    "J K Fertilizers is a leading manufacturer of organic fertilizers, base granules and coated base granules based in Vasad, Anand, Gujarat, INDIA. Founded in 2006, we specialize in producing eco-friendly, FCO-approved organic fertilizers including Organic Manure, PDM, PROM, Mycorrhiza-coated granules, and soil conditioners that enhance soil health and improve crop yield.",
  foundingDate: "2006",
  founder: {
    "@type": "Person",
    name: "Akash Dadhania",
    jobTitle: "Founder & Director",
    worksFor: { "@id": `${SITE_URL}/#organization` },
  },
  address: {
    "@type": "PostalAddress",
    "@id": `${SITE_URL}/#address`,
    streetAddress: "NH. 48, Opp. IOC Petrol Pump, B/H Adas Bus Stop",
    addressLocality: "Vasad",
    addressRegion: "Gujarat",
    postalCode: "388305",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "22.4475",
    longitude: "72.8573",
  },
  hasMap: "https://maps.google.com/?q=Vasad,Anand,Gujarat",
  telephone: "+919825045894",
  email: ["info@jkfertilizers.com", "sales@jkfertilizers.com"],
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+919825045894",
      contactType: "sales",
      contactOption: "TollFree",
      areaServed: ["IN", "Worldwide"],
      availableLanguage: ["English", "Gujarati", "Hindi"],
      hoursAvailable: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "09:00",
        closes: "18:00",
      },
    },
    {
      "@type": "ContactPoint",
      email: "sales@jkfertilizers.com",
      contactType: "sales",
      areaServed: ["IN", "Worldwide"],
    },
    {
      "@type": "ContactPoint",
      email: "info@jkfertilizers.com",
      contactType: "customer support",
      areaServed: ["IN", "Worldwide"],
    },
  ],
  openingHours: ["Mo-Sa 09:00-18:00"],
  sameAs: [
    "https://www.linkedin.com/company/jkfertilizers",
    "https://www.facebook.com/jkfertilizers",
    "https://www.instagram.com/jkfertilizers",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Organic Fertilizer Granule Products",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Product",
          name: "Organic Manure",
          url: `${SITE_URL}/products/organic-manure`,
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Product",
          name: "PDM",
          url: `${SITE_URL}/products/pdm`,
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Product",
          name: "PROM",
          url: `${SITE_URL}/products/prom`,
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Product",
          name: "Mix Micro Base Granules",
          url: `${SITE_URL}/products/mix-micro-base-granules`,
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Product",
          name: "Bio-Pesticide Base Granules",
          url: `${SITE_URL}/products/bio-pesticide-base-granules`,
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Product",
          name: "Pesticide Base Granules",
          url: `${SITE_URL}/products/pesticide-base-granules`,
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Product",
          name: "Base Granules",
          url: `${SITE_URL}/products/base-granules`,
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Product",
          name: "Organic Base Granules",
          url: `${SITE_URL}/products/organic-base-granules`,
        },
      },
    ],
  },
  numberOfEmployees: { "@type": "QuantitativeValue", value: 50 },
  award: "FCO Approved Quality Management System",
  slogan: "Organic Naturally — Nurturing Farms, Preserving Nature",
  areaServed: [
    { "@type": "Country", name: "India" },
    { "@type": "State", name: "Gujarat" },
    { "@type": "City", name: "Anand" },
    { "@type": "AdministrativeArea", name: "Worldwide Export" },
  ],
  knowsAbout: [
    "Organic Fertilizer Manufacturing",
    "Granular Fertilizer Production",
    "Bio-Fertilizer Manufacturing",
    "Bio-Stimulant Granules",
    "Organic Base Granules",
    "Mineral Base Granules",
    "Custom Fertilizer Formulation",
    "Contract Manufacturing",
    "Agricultural Inputs",
    "Sustainable Agriculture",
    "Recipe Granules",
    "Fertilizer Coating Technology",
    "FCO Approved Quality Standards",
    "B2B Agricultural Supply",
    "Organic Farming",
  ],
  memberOf: [
    {
      "@type": "Organization",
      name: "Fertilizer Association of India",
    },
  ],
};

/* ─────────────────────────────────────────────
   2. WebSite (with SearchAction for Sitelinks)
   ───────────────────────────────────────────── */
export const websiteSchema: WebSite = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: "J K Fertilizers",
  description:
    "India's Leading Organic Fertilizer Manufacturer — FCO Approved, Anand, Gujarat",
  publisher: { "@id": `${SITE_URL}/#organization` },
  inLanguage: ["en-IN", "gu-IN"],
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE_URL}/products?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

/* ─────────────────────────────────────────────
   3. BreadcrumbList helper
   ───────────────────────────────────────────── */
export function breadcrumbSchema(items: BreadcrumbItem[]): BreadcrumbList {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i: number): ListItem => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

/* ─────────────────────────────────────────────
   4. Home Page FAQ
   ───────────────────────────────────────────── */
export const homeFaqSchema: FAQPage = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What does J K Fertilizers manufacture?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "J K Fertilizers manufactures a complete range of organic fertilizers including Organic Manure, PDM (Potash Derived from Molasses), PROM (Phosphate Rich Organic Manure), Mycorrhiza Granules, Base Granules, Coated Granules, and specialty products. All products are FCO approved and manufactured in Vasad, Anand, Gujarat, INDIA.",
      },
    },
    {
      "@type": "Question",
      name: "Where is J K Fertilizers located?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "J K Fertilizers is located at NH. 48, Opp. IOC Petrol Pump, B/H Adas Bus Stop, Vasad, Dist: Anand, Gujarat - 388305 INDIA. Our factory is situated in Gujarat's agricultural heartland.",
      },
    },
    {
      "@type": "Question",
      name: "Does J K Fertilizers offer custom fertilizer formulation?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. J K Fertilizers specializes in custom manufacturing of organic fertilizers, coated granules, and base granules tailored to specific crop types, soil conditions, and customer requirements.",
      },
    },
    {
      "@type": "Question",
      name: "What is J K Fertilizers's daily production capacity?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "J K Fertilizers operates with multiple manufacturing plants including granulation plants, coating plants, and powder plants to meet diverse production requirements.",
      },
    },
    {
      "@type": "Question",
      name: "Does J K Fertilizers export fertilizers worldwide?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. J K Fertilizers supplies farmers, government agencies, and corporate clients across India. Contact our sales team at sales@jkfertilizers.com or call 9825045894 for inquiries.",
      },
    },
    {
      "@type": "Question",
      name: "Is J K Fertilizers ISO certified?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "J K Fertilizers manufactures FCO-approved products and maintains rigorous quality standards at every stage of production to ensure consistent, premium-grade fertilizers.",
      },
    },
    {
      "@type": "Question",
      name: "What is a Recipe Granule (Base Granule)?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "J K Fertilizers manufactures a variety of base granules and coated granules using high-quality raw materials including Gypsum, Dolomite, organic compost, and mineral blends for superior agricultural performance.",
      },
    },
    {
      "@type": "Question",
      name: "How can I get a quote from J K Fertilizers?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Contact J K Fertilizers by: (1) visiting our Contact page, (2) calling 9825045894, or (3) emailing info@jkfertilizers.com. Our team responds within 24 hours on business days.",
      },
    },
    {
      "@type": "Question",
      name: "Can J K Fertilizers manufacture under my brand name?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "J K Fertilizers offers custom manufacturing services including job work, custom formulation, and custom packaging solutions to meet diverse client requirements.",
      },
    },
    {
      "@type": "Question",
      name: "Which states in India does J K Fertilizers supply to?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "J K Fertilizers supplies across Gujarat and other Indian states. Contact info@jkfertilizers.com for your region.",
      },
    },
  ],
};

/* ─────────────────────────────────────────────
   5. Product Schema builder
   ───────────────────────────────────────────── */
export function buildProductSchema(product: import('./products').Product): Product {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${SITE_URL}/products/${product.slug}#product`,
    name: product.title,
    description: product.summary,
    image: [
      {
        "@type": "ImageObject",
        url: product.imageUrl.startsWith("http")
          ? product.imageUrl
          : `${SITE_URL}${product.imageUrl}`,
        caption: `${product.title} — manufactured by J K Fertilizers, Anand Gujarat India`,
      },
    ],
    brand: {
      "@type": "Brand",
      name: "J K Fertilizers",
    },
    manufacturer: {
      "@id": `${SITE_URL}/#organization`,
    },
    category: `${product.category} Fertilizer Granules`,
    additionalProperty: product.specs.map((spec): PropertyValue => ({
      "@type": "PropertyValue",
      name: spec.label,
      value: spec.value,
    })),
    offers: {
      "@type": "Offer",
      url: `${SITE_URL}/products/${product.slug}`,
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
      seller: { "@id": `${SITE_URL}/#organization` },
      areaServed: [
        { "@type": "Country", name: "India" },
        { "@type": "Country", name: "Worldwide" },
      ],
      eligibleRegion: [
        { "@type": "Country", name: "India" },
        { "@type": "Country", name: "Worldwide" },
      ],
    },
    keywords: [
      product.title,
      `${product.title} manufacturer India`,
      `${product.title} Gujarat`,
      `${product.category} fertilizer granules`,
      "organic fertilizer manufacturer",
      "B2B fertilizer manufacturer India",
      "recipe granules",
      "base granules manufacturer Gujarat",
      "J K Fertilizers",
    ].join(", "),
    countryOfOrigin: {
      "@type": "Country",
      name: "India",
    },
    isSimilarTo: [
      { "@type": "Product", name: "Organic Base Granules" },
      { "@type": "Product", name: "Bio-Fertilizer Base Granules" },
    ],
  };
}

/* ─────────────────────────────────────────────
   6. Product FAQ builder (per-product)
   ───────────────────────────────────────────── */
export function buildProductFaqSchema(product: import('./products').Product): FAQPage {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `What are ${product.title}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: product.summary,
        },
      },
      {
        "@type": "Question",
        name: `What are the key benefits of ${product.title}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: product.benefits
            .map((b) => `${b.title}: ${b.detail}`)
            .join(" "),
        },
      },
      {
        "@type": "Question",
        name: `How do I apply ${product.title}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: product.howToApply
            .map((s) => `${s.title}: ${s.detail}`)
            .join(" "),
        },
      },
      {
        "@type": "Question",
        name: `Where can I buy ${product.title} in India?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `${product.title} are manufactured and supplied B2B by J K Fertilizers, located in Anand, Gujarat, India. We supply fertilizer brands, distributors, and exporters across India and worldwide. Contact us at sales@jkfertilizers.com or call +91 98250 45894.`,
        },
      },
      {
        "@type": "Question",
        name: `Does J K Fertilizers offer custom formulation for ${product.title}?`,
        acceptedAnswer: {
          "@type": "Answer",
           text: `Yes. J K Fertilizers's in-house FCO approved laboratory can develop custom ${product.title} formulations (Recipe Granules) tailored to your specific crop targets, soil conditions, and brand requirements. Contact sales@jkfertilizers.com to discuss your requirements.`,
        },
      },
    ],
  };
}

/* ─────────────────────────────────────────────
   7. Product HowTo schema builder
   ───────────────────────────────────────────── */
export function buildProductHowToSchema(product: import('./products').Product): HowTo | null {
  if (!product.howToApply || product.howToApply.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: `How to Apply ${product.title}`,
    description: `Step-by-step guide for applying ${product.title} manufactured by J K Fertilizers for optimal crop results.`,
    image: {
      "@type": "ImageObject",
      url: product.imageUrl.startsWith("http")
        ? product.imageUrl
        : `${SITE_URL}${product.imageUrl}`,
    },
    supply: [
      {
        "@type": "HowToSupply",
        name: product.title,
      },
    ],
    tool: [
      {
        "@type": "HowToTool",
        name: "Broadcast spreader or soil applicator",
      },
    ],
    step: product.howToApply.map((step, i: number): HowToStep => ({
      "@type": "HowToStep",
      position: i + 1,
      name: step.title,
      text: step.detail,
    })),
  };
}

/* ─────────────────────────────────────────────
   8. Products ItemList schema
   ───────────────────────────────────────────── */
export const productsItemListSchema: ItemList = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "@id": `${SITE_URL}/products#itemlist`,
  name: "Organic Fertilizer Granule Products — J K Fertilizers",
  description:
    "Complete range of B2B organic fertilizer base granules manufactured by J K Fertilizers: Mineral, Bio-Fertilizer, Bio-Stimulant, Mix Micro, Bio-Pesticide, Pesticide, Base, and Organic granules.",
  url: `${SITE_URL}/products`,
  numberOfItems: 8,
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Mineral Base Granules",
      url: `${SITE_URL}/products/mineral-base-granules`,
      description: "Slow-release mineral fertilizer carrier with Gypsum, Dolomite and micronutrients",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Bio-Fertilizer Base Granules",
      url: `${SITE_URL}/products/bio-fertilizer-base-granules`,
      description: "Microbial carrier granule with beneficial microorganisms for soil health",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Bio-Stimulant Base Granules",
      url: `${SITE_URL}/products/bio-stimulant-base-granules`,
      description: "Plant growth stimulant carrier for enhanced yield and stress tolerance",
    },
    {
      "@type": "ListItem",
      position: 4,
      name: "Mix Micro Base Granules",
      url: `${SITE_URL}/products/mix-micro-base-granules`,
      description: "Custom multi-micronutrient granule with Ca, Mg, P2O5, Zn, Bo and Organic Carbon",
    },
    {
      "@type": "ListItem",
      position: 5,
      name: "Bio-Pesticide Base Granules",
      url: `${SITE_URL}/products/bio-pesticide-base-granules`,
      description: "Eco-friendly biological pest control granule — residue-free crop protection",
    },
    {
      "@type": "ListItem",
      position: 6,
      name: "Pesticide Base Granules",
      url: `${SITE_URL}/products/pesticide-base-granules`,
      description: "Dual-action granule combining precision pest control with nutrient delivery",
    },
    {
      "@type": "ListItem",
      position: 7,
      name: "Base Granules",
      url: `${SITE_URL}/products/base-granules`,
      description: "Multi-purpose carrier platform with 70%+ coating capacity — Recipe Granules concept",
    },
    {
      "@type": "ListItem",
      position: 8,
      name: "Organic Base Granules",
      url: `${SITE_URL}/products/organic-base-granules`,
      description: "100% organic matter-based granule — organic-certified ready for finished products",
    },
  ],
};

/* ─────────────────────────────────────────────
   9. BlogPosting schema builder
   ───────────────────────────────────────────── */
interface BlogPostingParams {
  slug: string;
  title: string;
  excerpt?: string;
  date?: string;
  author?: string;
  image?: string;
  tags?: string[];
}

export function buildBlogPostingSchema({ slug, title, excerpt, date, author, image, tags }: BlogPostingParams): BlogPosting {
  const postUrl = `${SITE_URL}/blog/${slug}`;
  const imageUrl = image
    ? image.startsWith("http") ? image : `${SITE_URL}${image}`
    : OG_IMAGE_URL;

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${postUrl}#article`,
    headline: title,
    description: excerpt || title,
    url: postUrl,
    datePublished: date || "2026-01-01",
    dateModified: date || "2026-03-12",
    author: {
      "@type": "Person",
      name: author || "Akash Dadhania",
      jobTitle: "Founder & Director",
      worksFor: { "@id": `${SITE_URL}/#organization` },
    },
    publisher: {
      "@id": `${SITE_URL}/#organization`,
    },
    image: {
      "@type": "ImageObject",
      url: imageUrl,
      width: 1200,
      height: 630,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": postUrl,
    },
    isPartOf: {
      "@type": "Blog",
      "@id": `${SITE_URL}/blog#blog`,
      name: "Agriculture & Fertilizer Industry Blog — J K Fertilizers",
      url: `${SITE_URL}/blog`,
    },
    inLanguage: "en-IN",
    keywords: tags ? tags.join(", ") : "organic fertilizer, agriculture, granule manufacturing, Gujarat India",
    about: {
      "@id": `${SITE_URL}/#organization`,
    },
    mentions: {
      "@id": `${SITE_URL}/#organization`,
    },
  };
}

/* ─────────────────────────────────────────────
   10. Blog Listing Page Schema
   ───────────────────────────────────────────── */
export const blogPageSchema: Blog = {
  "@context": "https://schema.org",
  "@type": "Blog",
  "@id": `${SITE_URL}/blog#blog`,
  url: `${SITE_URL}/blog`,
  name: "Agriculture & Fertilizer Industry Blog — J K Fertilizers",
  description:
    "Expert B2B insights on organic fertilizer manufacturing, granule formulation, sustainable agriculture, and supply chain for fertilizer brands and distributors.",
  publisher: { "@id": `${SITE_URL}/#organization` },
  inLanguage: "en-IN",
  about: { "@id": `${SITE_URL}/#organization` },
};

/* ─────────────────────────────────────────────
   11. Services Page Schema
   ───────────────────────────────────────────── */
export const servicesSchema: Service = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${SITE_URL}/services#service`,
  name: "Organic Fertilizer Manufacturing Services",
  provider: { "@id": `${SITE_URL}/#organization` },
  description:
    "J K Fertilizers offers comprehensive B2B fertilizer manufacturing services including organic granule production, custom formulation (Recipe Granules), job work/contract manufacturing, advanced coating, FCO approved laboratory testing, custom packaging & private labeling, and warehouse facilities in Anand, Gujarat, India.",
  areaServed: [
    { "@type": "Country", name: "India" },
    { "@type": "Country", name: "Worldwide" },
  ],
  serviceType: [
    "Organic Granule Manufacturing",
    "Custom Fertilizer Formulation",
    "Contract Manufacturing",
    "Fertilizer Coating Services",
    "Laboratory Testing",
    "Private Label Packaging",
    "Warehouse Facilities",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Manufacturing Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Organic Fertilizer Manufacturing",
          description:
            "Manufacturing Organic Fertilizers & Coated Granules — Eco-friendly fertilizers crafted for maximum efficiency and crop benefits.",
          url: `${SITE_URL}/services/organic-fertilizer-manufacturing`,
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Granule Technology",
          description:
            "Innovative Coating Solutions for Enhanced Fertilizer Performance — Precisely engineered granules for optimal soil enrichment.",
          url: `${SITE_URL}/services/granule-technology`,
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Infrastructure Leasing",
          description:
            "State-of-the-Art Infrastructure Leasing for Fertilizer Production — Cost-effective options to help businesses scale.",
          url: `${SITE_URL}/services/infrastructure-leasing`,
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Custom Packaging Solutions",
          description:
            "Smart, Sustainable Packaging for Agriculture — Tailored packaging services to protect and promote your products.",
          url: `${SITE_URL}/services/custom-packaging-solutions`,
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Job Work Services",
          description:
            "Reliable Job Work Services for Custom Fertilizer Manufacturing — Customized manufacturing solutions for organic fertilizers and coated granules.",
          url: `${SITE_URL}/services/job-work-services`,
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Warehouse & Storage",
          description:
            "Secure and Efficient Warehouse, Storage, and Godown Solutions — Well-maintained facilities to support seamless supply chain management.",
          url: `${SITE_URL}/services/warehouse-storage`,
        },
      },
    ],
  },
};

/* ─────────────────────────────────────────────
   12. Individual Service schema builder
   ───────────────────────────────────────────── */
interface BuildServiceParams {
  slug: string;
  name: string;
  description: string;
  image?: string;
}

export function buildServiceSchema({ slug, name, description, image }: BuildServiceParams): Service {
  const serviceUrl = `${SITE_URL}/services/${slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${serviceUrl}#service`,
    name,
    description,
    url: serviceUrl,
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: [
      { "@type": "Country", name: "India" },
      { "@type": "Country", name: "Worldwide" },
    ],
    image: image
      ? { "@type": "ImageObject", url: image.startsWith("http") ? image : `${SITE_URL}${image}` }
      : undefined,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": serviceUrl,
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Services", item: `${SITE_URL}/services` },
        { "@type": "ListItem", position: 3, name, item: serviceUrl },
      ],
    },
  };
}

/* ─────────────────────────────────────────────
   13. About Page Schema
   ───────────────────────────────────────────── */
export const aboutPageSchema: AboutPage = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "@id": `${SITE_URL}/about#aboutpage`,
  url: `${SITE_URL}/about`,
  name: "About J K Fertilizers — India's Leading B2B Organic Fertilizer Manufacturer",
  description:
    "Learn about J K Fertilizers, founded by Akash Dadhania — FCO approved organic fertilizer manufacturer in Anand, Gujarat, since 2006.",
  mainEntity: { "@id": `${SITE_URL}/#organization` },
  inLanguage: "en-IN",
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "About", item: `${SITE_URL}/about` },
    ],
  },
};

/* ─────────────────────────────────────────────
   14. Contact Page Schema
   ───────────────────────────────────────────── */
export const contactPageSchema: ContactPage = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "@id": `${SITE_URL}/contact#contactpage`,
  url: `${SITE_URL}/contact`,
  name: "Contact J K Fertilizers — B2B Fertilizer Manufacturer, Anand Gujarat",
  description:
    "Get in touch with J K Fertilizers for B2B fertilizer granule inquiries, bulk orders, custom formulation (Recipe Granules), and worldwide export partnerships. Call +91 98250 45894 or email sales@jkfertilizers.com.",
  mainEntity: { "@id": `${SITE_URL}/#organization` },
  inLanguage: "en-IN",
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Contact", item: `${SITE_URL}/contact` },
    ],
  },
};

/* ─────────────────────────────────────────────
   15. Products Listing Page Schema
   ───────────────────────────────────────────── */
export const productsPageSchema: CollectionPage = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": `${SITE_URL}/products#collection`,
  url: `${SITE_URL}/products`,
  name: "Organic Fertilizer Granule Products — J K Fertilizers",
  description:
    "Browse J K Fertilizers's complete range of organic fertilizers: Organic Manure, PDM, PROM, Mycorrhiza Granules, Customized Base Granules, Coated Granules, and more. FCO approved, manufactured in Anand, Gujarat, India.",
  provider: { "@id": `${SITE_URL}/#organization` },
  inLanguage: "en-IN",
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Products", item: `${SITE_URL}/products` },
    ],
  },
};

/* ─────────────────────────────────────────────
   16. History Page Schema
   ───────────────────────────────────────────── */
export const historyPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${SITE_URL}/history#historypage`,
  url: `${SITE_URL}/history`,
  name: "Our History — J K Fertilizers | Organic Fertilizer Manufacturer Since 2006",
  description:
    "Explore the history and growth milestones of J K Fertilizers. From our organic manure plant in 2006 to a Daily Production Capacity of 700 MT in Vasad, Anand, Gujarat, INDIA.",
  mainEntity: { "@id": `${SITE_URL}/#organization` },
  inLanguage: "en-IN",
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Our History", item: `${SITE_URL}/history` },
    ],
  },
};