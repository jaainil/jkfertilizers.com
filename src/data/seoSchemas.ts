/**
 * Central JSON-LD / Schema.org structured data for J K Fertilizers.
 * Built to meet the latest Google Rich Results & Schema.org standards.
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
  value?: number;
  minValue?: number;
  maxValue?: number;
  unitCode?: string;
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

interface OfferItem {
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
  itemListElement: OfferItem[];
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

interface Certification {
  "@type": "Certification";
  name: string;
  certificationIdentification?: string;
  issuedBy?: {
    "@type": string;
    name: string;
  };
}

interface AggregateRating {
  "@type": "AggregateRating";
  ratingValue: string;
  reviewCount: string;
  bestRating?: string;
  worstRating?: string;
}

interface MerchantReturnPolicy {
  "@type": "MerchantReturnPolicy";
  applicableCountry: string;
  returnPolicyCategory: string;
  merchantReturnDays: number;
  returnMethod: string;
  returnFees: string;
}

interface OfferShippingDetails {
  "@type": "OfferShippingDetails";
  shippingRate?: {
    "@type": "MonetaryAmount";
    value: string;
    currency: string;
  };
  shippingDestination?: {
    "@type": "DefinedRegion";
    addressCountry: string;
  }[];
  deliveryTime?: {
    "@type": "ShippingDeliveryTime";
    handlingTime: QuantitativeValue;
    transitTime: QuantitativeValue;
  };
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
  priceRange?: string;
  currenciesAccepted?: string;
  paymentAccepted?: string;
  hasCertification?: Certification[];
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
  hasCertification?: Certification;
  aggregateRating?: AggregateRating;
  offers?: {
    "@type": "Offer";
    url: string;
    priceCurrency: string;
    price: string;
    priceValidUntil?: string;
    availability: string;
    itemCondition: string;
    seller: { "@id": string };
    areaServed?: (Country | { "@type": "Country"; name: string })[];
    eligibleRegion?: (Country | { "@type": "Country"; name: string })[];
    hasMerchantReturnPolicy?: MerchantReturnPolicy;
    shippingDetails?: OfferShippingDetails;
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
  author: Person | { "@id": string };
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
  hasMap: "https://maps.app.goo.gl/wxxAwGrF7c3Yn6VSA",
  telephone: "+919825045894",
  email: ["info@jkfertilizers.com", "sales@jkfertilizers.com"],
  priceRange: "$$",
  currenciesAccepted: "INR, USD, EUR",
  paymentAccepted: "Cash, Cheque, Bank Transfer, Letter of Credit, RTGS/NEFT",
  hasCertification: [
    {
      "@type": "Certification",
      name: "Fertilizer Control Order (FCO) Compliance",
      certificationIdentification: "FCO-Approved",
      issuedBy: {
        "@type": "GovernmentOrganization",
        name: "Ministry of Agriculture and Farmers Welfare, Government of India",
      },
    },
  ],
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
    name: "Organic Fertilizer Granule Products & Services",
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
          name: "PROM (Phosphate Rich Organic Manure)",
          url: `${SITE_URL}/products/prom`,
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Product",
          name: "PDM (Potash Derived from Molasses)",
          url: `${SITE_URL}/products/pdm`,
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Product",
          name: "Mycorrhiza Biofertilizer Granules",
          url: `${SITE_URL}/products/mycorrhiza-granules-biofertilizers`,
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Product",
          name: "Customized Coated Granules",
          url: `${SITE_URL}/products/customized-coated-granules`,
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Product",
          name: "Coated Base Granules Bio NPK",
          url: `${SITE_URL}/products/coated-base-granules-bio-npk`,
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Product",
          name: "Coated Base Granules Mycorrhiza",
          url: `${SITE_URL}/products/coated-base-granules-mycorrhiza`,
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Product",
          name: "Customized Base Granules",
          url: `${SITE_URL}/products/customized-base-granules`,
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Product",
          name: "Pancharatna Base Granules",
          url: `${SITE_URL}/products/pancharatna-base-granules`,
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Product",
          name: "Organic Carbon Base Granules",
          url: `${SITE_URL}/products/organic-carbon-base-granules`,
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Product",
          name: "Humic Based Granules",
          url: `${SITE_URL}/products/humic-based-granules`,
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Product",
          name: "Enriched Base Granules",
          url: `${SITE_URL}/products/enriched-base-granules`,
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Product",
          name: "Other Nutrients Base Granules",
          url: `${SITE_URL}/products/other-nutrients-base-granules`,
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
          name: "Plant Available Silica",
          url: `${SITE_URL}/products/plant-available-silica`,
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Product",
          name: "Diatomite Silicon Granules",
          url: `${SITE_URL}/products/diatomite-silicon`,
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Granule Technology",
          url: `${SITE_URL}/services/granule-technology`,
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Infrastructure Leasing",
          url: `${SITE_URL}/services/infrastructure-leasing`,
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Custom Packaging Solutions",
          url: `${SITE_URL}/services/custom-packaging-solutions`,
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Job Work Services",
          url: `${SITE_URL}/services/job-work-services`,
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Warehouse & Storage Solutions",
          url: `${SITE_URL}/services/warehouse-storage`,
        },
      },
    ],
  },
  numberOfEmployees: { "@type": "QuantitativeValue", value: 50 },
  award: "FCO Approved Quality Management System",
  slogan: "Organic Naturally — Empowering Farmers, Enriching Communities",
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
  inLanguage: ["en-IN", "gu-IN", "hi-IN"],
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
        text: "J K Fertilizers operates with high-capacity granulation plants, coating facilities, and processing lines capable of supplying large-scale domestic and international orders.",
      },
    },
    {
      "@type": "Question",
      name: "Does J K Fertilizers export fertilizers worldwide?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. J K Fertilizers supplies fertilizer brands, distributors, and corporate clients across India and exports to international markets worldwide. Contact sales@jkfertilizers.com for export specifications.",
      },
    },
    {
      "@type": "Question",
      name: "Are J K Fertilizers products FCO certified?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. All products manufactured by J K Fertilizers meet strict Fertilizer Control Order (FCO) compliance standards with full batch testing in our in-house laboratory.",
      },
    },
    {
      "@type": "Question",
      name: "How can I get a B2B quote from J K Fertilizers?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Request a B2B quote via our website at https://jkfertilizers.com/contact, by calling +91 98250 45894, or emailing sales@jkfertilizers.com. We provide comprehensive pricing for domestic and export delivery.",
      },
    },
  ],
};

/* ─────────────────────────────────────────────
   5. Product Schema builder (Rich Results 2025/2026 Compliant)
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
    hasCertification: {
      "@type": "Certification",
      name: "Fertilizer Control Order (FCO) Compliance",
      certificationIdentification: "FCO-Approved",
      issuedBy: {
        "@type": "GovernmentOrganization",
        name: "Ministry of Agriculture and Farmers Welfare, Government of India",
      },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "85",
      bestRating: "5",
      worstRating: "1",
    },
    additionalProperty: product.specs.map((spec): PropertyValue => ({
      "@type": "PropertyValue",
      name: spec.label,
      value: spec.value,
    })),
    offers: {
      "@type": "Offer",
      url: `${SITE_URL}/products/${product.slug}`,
      priceCurrency: "INR",
      price: "0",
      priceValidUntil: "2027-12-31",
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
      hasMerchantReturnPolicy: {
        "@type": "MerchantReturnPolicy",
        applicableCountry: "IN",
        returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
        merchantReturnDays: 30,
        returnMethod: "https://schema.org/ReturnByMail",
        returnFees: "https://schema.org/FreeReturn",
      },
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingRate: {
          "@type": "MonetaryAmount",
          value: "0",
          currency: "INR",
        },
        shippingDestination: [
          { "@type": "DefinedRegion", addressCountry: "IN" },
          { "@type": "DefinedRegion", addressCountry: "US" },
          { "@type": "DefinedRegion", addressCountry: "AE" },
        ],
        deliveryTime: {
          "@type": "ShippingDeliveryTime",
          handlingTime: {
            "@type": "QuantitativeValue",
            minValue: 1,
            maxValue: 3,
            unitCode: "DAY",
          },
          transitTime: {
            "@type": "QuantitativeValue",
            minValue: 3,
            maxValue: 7,
            unitCode: "DAY",
          },
        },
      },
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
        name: `Where can I buy ${product.title} in bulk in India?`,
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
          text: `Yes. J K Fertilizers's in-house FCO approved laboratory can develop custom ${product.title} formulations tailored to your specific crop targets, soil conditions, and brand requirements. Contact sales@jkfertilizers.com to discuss your requirements.`,
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
   8. Complete Products ItemList schema (All 16 Products)
   ───────────────────────────────────────────── */
export const productsItemListSchema: ItemList = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "@id": `${SITE_URL}/products#itemlist`,
  name: "Organic Fertilizer Granule Products — J K Fertilizers",
  description:
    "Complete range of 16 B2B organic fertilizer products and base granules manufactured by J K Fertilizers in Anand, Gujarat, India.",
  url: `${SITE_URL}/products`,
  numberOfItems: 16,
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Organic Manure",
      url: `${SITE_URL}/products/organic-manure`,
      description: "FCO approved organic manure for comprehensive soil enrichment and conditioning",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "PROM (Phosphate Rich Organic Manure)",
      url: `${SITE_URL}/products/prom`,
      description: "Organic phosphorus alternative to chemical DAP and SSP fertilizers",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "PDM (Potash Derived from Molasses)",
      url: `${SITE_URL}/products/pdm`,
      description: "Natural organic potash alternative to chemical MOP for superior crop quality",
    },
    {
      "@type": "ListItem",
      position: 4,
      name: "Mycorrhiza Biofertilizer Granules",
      url: `${SITE_URL}/products/mycorrhiza-granules-biofertilizers`,
      description: "VAM fungal root expansion and nutrient uptake enhancer granules",
    },
    {
      "@type": "ListItem",
      position: 5,
      name: "Customized Coated Granules",
      url: `${SITE_URL}/products/customized-coated-granules`,
      description: "High absorption carrier granules for active biological and nutrient coating",
    },
    {
      "@type": "ListItem",
      position: 6,
      name: "Coated Base Granules Bio NPK",
      url: `${SITE_URL}/products/coated-base-granules-bio-npk`,
      description: "Triple-action bio-nitrogen, phosphorus, and potassium delivery granules",
    },
    {
      "@type": "ListItem",
      position: 7,
      name: "Coated Base Granules Mycorrhiza",
      url: `${SITE_URL}/products/coated-base-granules-mycorrhiza`,
      description: "Mineral-mycorrhiza blend for rapid root inoculation and phosphorus solubilization",
    },
    {
      "@type": "ListItem",
      position: 8,
      name: "Customized Base Granules",
      url: `${SITE_URL}/products/customized-base-granules`,
      description: "Bespoke recipe granules formulated with dolomite, gypsum, and organic compost",
    },
    {
      "@type": "ListItem",
      position: 9,
      name: "Pancharatna Base Granules",
      url: `${SITE_URL}/products/pancharatna-base-granules`,
      description: "5-in-1 foundational multi-nutrient carrier granule",
    },
    {
      "@type": "ListItem",
      position: 10,
      name: "Organic Carbon Base Granules",
      url: `${SITE_URL}/products/organic-carbon-base-granules`,
      description: "Humus and organic carbon enriched soil conditioning granules",
    },
    {
      "@type": "ListItem",
      position: 11,
      name: "Humic Based Granules",
      url: `${SITE_URL}/products/humic-based-granules`,
      description: "Humic acid and fulvic matrix granules for root stimulation and soil aeration",
    },
    {
      "@type": "ListItem",
      position: 12,
      name: "Enriched Base Granules",
      url: `${SITE_URL}/products/enriched-base-granules`,
      description: "Fortified mineral carrier granules designed for secondary nutrient delivery",
    },
    {
      "@type": "ListItem",
      position: 13,
      name: "Other Nutrients Base Granules",
      url: `${SITE_URL}/products/other-nutrients-base-granules`,
      description: "Micronutrient-tailored granule base for custom blending and coating",
    },
    {
      "@type": "ListItem",
      position: 14,
      name: "Base Granules",
      url: `${SITE_URL}/products/base-granules`,
      description: "Universal carrier granule platform engineered with 70%+ coating capacity",
    },
    {
      "@type": "ListItem",
      position: 15,
      name: "Plant Available Silica",
      url: `${SITE_URL}/products/plant-available-silica`,
      description: "Soluble silicon granules enhancing plant structural strength and biotic resistance",
    },
    {
      "@type": "ListItem",
      position: 16,
      name: "Diatomite Silicon Granules",
      url: `${SITE_URL}/products/diatomite-silicon`,
      description: "FCO approved natural silica granules for pest resistance and soil conditioning",
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
    dateModified: date || "2026-01-01",
    author: author === "J K Fertilizers" || !author
      ? { "@id": `${SITE_URL}/#organization` }
      : {
          "@type": "Person",
          name: author,
          jobTitle: "Agricultural Specialist",
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
   11. Services Page Schema (All 5 Services)
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
          name: "Warehouse & Storage Solutions",
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
    "Explore the history and growth milestones of J K Fertilizers. From our organic manure plant in 2006 to high-volume granulation capacity in Vasad, Anand, Gujarat, INDIA.",
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

/* ─────────────────────────────────────────────
   17. Portfolio Page Schema
   ───────────────────────────────────────────── */
export const portfolioPageSchema: CollectionPage = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": `${SITE_URL}/portfolio#portfoliopage`,
  url: `${SITE_URL}/portfolio`,
  name: "Portfolio & Client Case Studies — J K Fertilizers",
  description:
    "Explore J K Fertilizers' product portfolio and client trust. Manufacturing partner for government, PSU, and corporate fertilizer brands across India and global export markets.",
  provider: { "@id": `${SITE_URL}/#organization` },
  inLanguage: "en-IN",
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Portfolio", item: `${SITE_URL}/portfolio` },
    ],
  },
};

export const portfolioItemListSchema: ItemList = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "@id": `${SITE_URL}/portfolio#itemlist`,
  name: "Featured Projects & Client Initiatives — J K Fertilizers",
  description: "Key agricultural initiatives, custom blend developments, and export programs by J K Fertilizers.",
  url: `${SITE_URL}/portfolio`,
  numberOfItems: 8,
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Advancing Organic Agriculture",
      description: "Transforming farming with innovative organic fertilizers restoring soil health nationwide.",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Custom Blends for Industry Giants",
      description: "Tailored fertilizer formulations for leading corporate and PSU agriculture partners.",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Coated Granules Innovation",
      description: "Pioneering nutrient delivery with eco-friendly mineral and biological coated base granules.",
    },
    {
      "@type": "ListItem",
      position: 4,
      name: "Global Outreach & Export",
      description: "Export-grade organic fertilizer manufacturing for international markets and distributors.",
    },
    {
      "@type": "ListItem",
      position: 5,
      name: "Sustainability Leadership",
      description: "Eco-friendly agricultural manufacturing processes minimizing environmental impact.",
    },
    {
      "@type": "ListItem",
      position: 6,
      name: "Government & Semi-Government Initiatives",
      description: "Reliable bulk fertilizer manufacturing for large-scale agricultural development programs.",
    },
    {
      "@type": "ListItem",
      position: 7,
      name: "Grassroots Farmer Empowerment",
      description: "Delivering high-efficiency organic inputs and sustainable soil health solutions to rural farming communities.",
    },
    {
      "@type": "ListItem",
      position: 8,
      name: "Advanced Research & Development",
      description: "Continuous formulation R&D for next-generation biofertilizers and mineral carriers.",
    },
  ],
};

/* ─────────────────────────────────────────────
   18. Commitment Page Schema
   ───────────────────────────────────────────── */
export const commitmentPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${SITE_URL}/commitment#commitmentpage`,
  url: `${SITE_URL}/commitment`,
  name: "Our Commitment to Sustainability & Quality — J K Fertilizers",
  description:
    "J K Fertilizers' commitment to sustainable agriculture, 100% organic eco-friendly inputs, zero harmful residues, and rigorous FCO certified quality control.",
  mainEntity: { "@id": `${SITE_URL}/#organization` },
  inLanguage: "en-IN",
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Our Commitment", item: `${SITE_URL}/commitment` },
    ],
  },
};