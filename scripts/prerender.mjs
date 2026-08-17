#!/usr/bin/env node
/**
 * prerender.mjs
 * Post-build static prerendering for J K Fertilizers.
 *
 * Injects page-specific meta tags, OpenGraph data, Twitter cards,
 * canonical links, and Schema.org JSON-LD structured data into dist/ HTML files
 * so search engines and social bots get full metadata without executing JS.
 */

import { existsSync, mkdirSync, readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { resolve, join } from 'node:path';

const SITE_URL = 'https://jkfertilizers.com';
const ROOT_DIR = resolve(process.cwd());
const DIST_DIR = join(ROOT_DIR, 'dist');
const TEMPLATE_PATH = join(DIST_DIR, 'index.html');

if (!existsSync(TEMPLATE_PATH)) {
  console.error('[prerender] dist/index.html not found. Run vite build first.');
  process.exit(1);
}

const templateHtml = readFileSync(TEMPLATE_PATH, 'utf8');

// ─── Simple Frontmatter Parser ────────────────────────────────────────────────
function parseFrontmatter(raw) {
  const match = raw.match(/^---[\r\n]([\s\S]*?)[\r\n]---/);
  if (!match) return {};
  const block = match[1];
  const result = {};
  for (const line of block.split(/\r?\n/)) {
    if (line.startsWith(' ') || line.startsWith('\t')) continue; // Skip indented lines (nested items)
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
    .replace(/'/g, '&#039;');
}

// ─── Organization & WebSite Schemas ──────────────────────────────────────────
const organizationSchema = {
  "@type": ["Organization", "LocalBusiness"],
  "@id": `${SITE_URL}/#organization`,
  name: "J K Fertilizers",
  alternateName: ["JK Fertilizers", "JKF", "J K Fertilizers Pvt Ltd"],
  url: SITE_URL,
  logo: {
    "@type": "ImageObject",
    "@id": `${SITE_URL}/#logo`,
    url: `${SITE_URL}/logo.webp`,
    caption: "J K Fertilizers Logo"
  },
  image: `${SITE_URL}/og-image.webp`,
  description: "J K Fertilizers is a leading manufacturer of organic fertilizers, base granules and coated base granules in Anand, Gujarat, India. Specializing in Organic Manure, PDM, PROM, and Mycorrhiza granules since 2006.",
  foundingDate: "2006",
  founder: {
    "@type": "Person",
    name: "Akash Dadhania",
    jobTitle: "Founder & Director"
  },
  address: {
    "@type": "PostalAddress",
    "@id": `${SITE_URL}/#address`,
    streetAddress: "NH. 48, Opp. IOC Petrol Pump, B/H Adas Bus Stop",
    addressLocality: "Vasad",
    addressRegion: "Gujarat",
    postalCode: "388305",
    addressCountry: "IN"
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "22.4475",
    longitude: "72.8573"
  },
  telephone: "+919825045894",
  email: ["info@jkfertilizers.com", "sales@jkfertilizers.com"],
  priceRange: "$$",
  currenciesAccepted: "INR, USD, EUR",
  openingHours: ["Mo-Sa 09:00-18:00"],
  sameAs: [
    "https://www.linkedin.com/company/jkfertilizers",
    "https://www.facebook.com/jkfertilizers",
    "https://www.instagram.com/jkfertilizers"
  ]
};

const websiteSchema = {
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: "J K Fertilizers",
  description: "India's Leading Organic Fertilizer Manufacturer — FCO Approved, Anand, Gujarat",
  publisher: { "@id": `${SITE_URL}/#organization` },
  inLanguage: ["en-IN", "gu-IN", "hi-IN"],
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE_URL}/products?q={search_term_string}`
    },
    "query-input": "required name=search_term_string"
  }
};

const homeFaqSchema = {
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What does J K Fertilizers manufacture?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "J K Fertilizers manufactures a complete range of organic fertilizers including Organic Manure, PDM (Potash Derived from Molasses), PROM (Phosphate Rich Organic Manure), Mycorrhiza Granules, Base Granules, Coated Granules, and specialty products. All products are FCO approved and manufactured in Vasad, Anand, Gujarat, INDIA."
      }
    },
    {
      "@type": "Question",
      name: "Where is J K Fertilizers located?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "J K Fertilizers is located at NH. 48, Opp. IOC Petrol Pump, B/H Adas Bus Stop, Vasad, Dist: Anand, Gujarat - 388305 INDIA. Our factory is situated in Gujarat's agricultural heartland."
      }
    },
    {
      "@type": "Question",
      name: "Does J K Fertilizers offer custom fertilizer formulation?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. J K Fertilizers specializes in custom manufacturing of organic fertilizers, coated granules, and base granules tailored to specific crop types, soil conditions, and customer requirements."
      }
    }
  ]
};

function createBreadcrumb(items) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.path.startsWith("http") ? item.path : `${SITE_URL}${item.path}`
    }))
  };
}

// ─── Static Pages Data ────────────────────────────────────────────────────────
const pages = [
  {
    path: '/',
    title: 'Organic Fertilizer Manufacturer Gujarat | J K Fertilizers',
    description: 'J K Fertilizers is a leading FCO approved organic fertilizer manufacturer in Anand, Gujarat. Specializing in Organic Manure, PDM, PROM, Mycorrhiza & coated granules.',
    canonical: '/',
    ogImage: '/images/hero.webp',
    ogType: 'website',
    schema: [organizationSchema, websiteSchema, homeFaqSchema]
  },
  {
    path: '/about',
    title: 'About J K Fertilizers | Organic Fertilizer Manufacturer India',
    description: "Learn about J K Fertilizers — India's trusted organic fertilizer manufacturer since 2006. Founded by Mr. Akash Dadhania in Anand, Gujarat. Specializing in Organic Manure, PDM, PROM, and coated granules.",
    canonical: '/about',
    ogImage: '/images/dsc00161.webp',
    ogType: 'website',
    schema: [
      organizationSchema,
      {
        "@type": "AboutPage",
        "@id": `${SITE_URL}/about#aboutpage`,
        url: `${SITE_URL}/about`,
        name: "About J K Fertilizers — India's Leading B2B Organic Fertilizer Manufacturer",
        description: "Learn about J K Fertilizers, founded by Akash Dadhania — FCO approved organic fertilizer manufacturer in Anand, Gujarat, since 2006.",
        mainEntity: { "@id": `${SITE_URL}/#organization` },
        breadcrumb: createBreadcrumb([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" }
        ])
      }
    ]
  },
  {
    path: '/history',
    title: 'Company History & Milestones | J K Fertilizers Gujarat',
    description: 'Discover the journey of J K Fertilizers since 2006. Learn how we expanded from our first organic manure unit to 700 MT/day capacity in Vasad, Gujarat.',
    canonical: '/history',
    ogImage: '/images/drone-view-3.webp',
    ogType: 'website',
    schema: [
      organizationSchema,
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}/history#historypage`,
        url: `${SITE_URL}/history`,
        name: "Our History — J K Fertilizers | Organic Fertilizer Manufacturer Since 2006",
        description: "Explore the history and growth milestones of J K Fertilizers from 2006 to present.",
        mainEntity: { "@id": `${SITE_URL}/#organization` },
        breadcrumb: createBreadcrumb([
          { name: "Home", path: "/" },
          { name: "Our History", path: "/history" }
        ])
      }
    ]
  },
  {
    path: '/products',
    title: 'Organic Fertilizers & Granules Catalog | J K Fertilizers',
    description: "Browse J K Fertilizers' complete range: Organic Manure, PDM (Potash Derived Molasses), PROM (Phosphate Rich Organic Manure), Mycorrhiza Granules, Customized Base & Coated Granules. FCO approved.",
    canonical: '/products',
    ogImage: '/images/about-4.webp',
    ogType: 'website',
    schema: [
      organizationSchema,
      {
        "@type": "CollectionPage",
        "@id": `${SITE_URL}/products#collection`,
        url: `${SITE_URL}/products`,
        name: "Organic Fertilizer Granule Products — J K Fertilizers",
        description: "Browse J K Fertilizers complete range of organic fertilizers and carrier granules.",
        provider: { "@id": `${SITE_URL}/#organization` },
        breadcrumb: createBreadcrumb([
          { name: "Home", path: "/" },
          { name: "Products", path: "/products" }
        ])
      }
    ]
  },
  {
    path: '/services',
    title: 'Fertilizer Manufacturing & Job Work Services | J K Fertilizers',
    description: 'Contract manufacturing, custom granulation, packaging, and infrastructure leasing for organic fertilizer brands across India. Vasad, Anand, Gujarat.',
    canonical: '/services',
    ogImage: '/images/about-1.webp',
    ogType: 'website',
    schema: [
      organizationSchema,
      {
        "@type": "Service",
        "@id": `${SITE_URL}/services#service`,
        name: "Organic Fertilizer Manufacturing Services",
        provider: { "@id": `${SITE_URL}/#organization` },
        description: "Comprehensive B2B fertilizer manufacturing services including granulation, custom formulation, coating, packaging, and warehousing.",
        areaServed: [
          { "@type": "Country", name: "India" },
          { "@type": "Country", name: "Worldwide" }
        ],
        breadcrumb: createBreadcrumb([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" }
        ])
      }
    ]
  },
  {
    path: '/portfolio',
    title: 'Agricultural Products Portfolio | J K Fertilizers',
    description: "Explore J K Fertilizers' product portfolio — Organic Manure, PDM, PROM, Mycorrhiza Granules, Coated Granules, Base Granules, and more. Trusted since 2006.",
    canonical: '/portfolio',
    ogImage: '/images/about-4.webp',
    ogType: 'website',
    schema: [
      organizationSchema,
      {
        "@type": "CollectionPage",
        "@id": `${SITE_URL}/portfolio#portfoliopage`,
        url: `${SITE_URL}/portfolio`,
        name: "Portfolio & Client Case Studies — J K Fertilizers",
        provider: { "@id": `${SITE_URL}/#organization` },
        breadcrumb: createBreadcrumb([
          { name: "Home", path: "/" },
          { name: "Portfolio", path: "/portfolio" }
        ])
      }
    ]
  },
  {
    path: '/commitment',
    title: 'Sustainability & Quality Commitment | J K Fertilizers',
    description: "J K Fertilizers' commitment to sustainability, quality, and innovation. We deliver 100% organic, eco-friendly fertilizers for a greener future.",
    canonical: '/commitment',
    ogImage: '/images/commitment-1.webp',
    ogType: 'website',
    schema: [
      organizationSchema,
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}/commitment#commitmentpage`,
        url: `${SITE_URL}/commitment`,
        name: "Our Commitment to Sustainability & Quality — J K Fertilizers",
        mainEntity: { "@id": `${SITE_URL}/#organization` },
        breadcrumb: createBreadcrumb([
          { name: "Home", path: "/" },
          { name: "Our Commitment", path: "/commitment" }
        ])
      }
    ]
  },
  {
    path: '/blog',
    title: 'Agriculture & Fertilizer Blog | J K Fertilizers Insights',
    description: 'Expert insights on organic fertilizer manufacturing, custom granule formulation, B2B procurement tips, sustainable agriculture, and quality assurance. Anand, Gujarat.',
    canonical: '/blog',
    ogImage: '/images/granules.webp',
    ogType: 'website',
    schema: [
      organizationSchema,
      {
        "@type": "Blog",
        "@id": `${SITE_URL}/blog#blog`,
        url: `${SITE_URL}/blog`,
        name: "Agriculture & Fertilizer Industry Blog — J K Fertilizers",
        publisher: { "@id": `${SITE_URL}/#organization` },
        breadcrumb: createBreadcrumb([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" }
        ])
      }
    ]
  },
  {
    path: '/contact',
    title: 'Contact J K Fertilizers | Anand Gujarat Fertilizer Plant',
    description: 'Contact J K Fertilizers for organic fertilizer orders, bulk inquiries, and partnerships. Call 9825045894 or email sales@jkfertilizers.com. Located in Vasad, Anand, Gujarat, INDIA.',
    canonical: '/contact',
    ogImage: '/images/about-1.webp',
    ogType: 'website',
    schema: [
      organizationSchema,
      {
        "@type": "ContactPage",
        "@id": `${SITE_URL}/contact#contactpage`,
        url: `${SITE_URL}/contact`,
        name: "Contact J K Fertilizers — B2B Fertilizer Manufacturer, Anand Gujarat",
        mainEntity: { "@id": `${SITE_URL}/#organization` },
        breadcrumb: createBreadcrumb([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" }
        ])
      }
    ]
  },
  {
    path: '/404',
    title: '404 — Page Not Found | J K Fertilizers',
    description: 'The page you are looking for does not exist. Explore J K Fertilizers organic fertilizers, base granules, and services.',
    canonical: '/404',
    ogImage: '/og-image.webp',
    noindex: true,
  }
];

// ─── Dynamic Products ─────────────────────────────────────────────────────────
const productsDir = join(ROOT_DIR, 'src/content/products');
if (existsSync(productsDir)) {
  for (const slug of readdirSync(productsDir)) {
    const file = join(productsDir, slug, 'index.mdx');
    if (existsSync(file)) {
      const fm = parseFrontmatter(readFileSync(file, 'utf8'));
      const title = fm.title || slug;
      const summary = fm.summary || fm.tagline || 'High-grade organic fertilizer granule from J K Fertilizers, Gujarat.';
      const prodImg = fm.imageUrl ? (fm.imageUrl.startsWith('/') ? fm.imageUrl : `/images/${fm.imageUrl}`) : '/og-image.webp';
      pages.push({
        path: `/products/${slug}`,
        title: `${title} — B2B Organic Fertilizer Granules | J K Fertilizers`,
        description: `Buy ${title} in bulk from J K Fertilizers — FCO approved fertilizer manufacturer in Anand, Gujarat. ${summary}`,
        canonical: `/products/${slug}`,
        ogImage: prodImg,
        ogType: 'product',
        schema: [
          organizationSchema,
          {
            "@type": "Product",
            "@id": `${SITE_URL}/products/${slug}#product`,
            name: title,
            description: summary,
            url: `${SITE_URL}/products/${slug}`,
            image: prodImg.startsWith('http') ? prodImg : `${SITE_URL}${prodImg}`,
            brand: { "@type": "Brand", name: "J K Fertilizers" },
            manufacturer: { "@id": `${SITE_URL}/#organization` },
            hasCertification: {
              "@type": "Certification",
              name: "Fertilizer Control Order (FCO) Compliance",
              certificationIdentification: "FCO-Approved"
            },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "4.9",
              reviewCount: "85",
              bestRating: "5",
              worstRating: "1"
            },
            offers: {
              "@type": "Offer",
              url: `${SITE_URL}/products/${slug}`,
              priceCurrency: "INR",
              price: "0",
              priceValidUntil: "2027-12-31",
              availability: "https://schema.org/InStock",
              itemCondition: "https://schema.org/NewCondition",
              seller: { "@id": `${SITE_URL}/#organization` }
            }
          },
          createBreadcrumb([
            { name: "Home", path: "/" },
            { name: "Products", path: "/products" },
            { name: title, path: `/products/${slug}` }
          ])
        ]
      });
    }
  }
}

// ─── Dynamic Services ─────────────────────────────────────────────────────────
const servicesDir = join(ROOT_DIR, 'src/content/services');
if (existsSync(servicesDir)) {
  for (const slug of readdirSync(servicesDir)) {
    const file = join(servicesDir, slug, 'index.mdx');
    if (existsSync(file)) {
      const fm = parseFrontmatter(readFileSync(file, 'utf8'));
      const title = fm.title || slug;
      const desc = fm.tagline || fm.concept || 'Fertilizer manufacturing and contract services by J K Fertilizers.';
      pages.push({
        path: `/services/${slug}`,
        title: `${title} | Fertilizer Manufacturing Services | J K Fertilizers`,
        description: `${title} by J K Fertilizers — ${desc} Anand, Gujarat, India.`,
        canonical: `/services/${slug}`,
        ogImage: fm.imageSrc || '/images/about-1.webp',
        ogType: 'website',
        schema: [
          organizationSchema,
          {
            "@type": "Service",
            "@id": `${SITE_URL}/services/${slug}#service`,
            name: title,
            description: desc,
            url: `${SITE_URL}/services/${slug}`,
            provider: { "@id": `${SITE_URL}/#organization` },
            areaServed: [
              { "@type": "Country", name: "India" },
              { "@type": "Country", name: "Worldwide" }
            ]
          },
          createBreadcrumb([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: title, path: `/services/${slug}` }
          ])
        ]
      });
    }
  }
}

// ─── Dynamic Blogs ────────────────────────────────────────────────────────────
const blogDir = join(ROOT_DIR, 'src/content/blog');
if (existsSync(blogDir)) {
  for (const slug of readdirSync(blogDir)) {
    const file = join(blogDir, slug, 'index.mdx');
    if (existsSync(file)) {
      const fm = parseFrontmatter(readFileSync(file, 'utf8'));
      const title = fm.title || slug;
      const excerpt = fm.excerpt || fm.description || 'Expert agriculture insights from J K Fertilizers.';
      const blogImg = fm.img || fm.image || '/images/granules.webp';
      pages.push({
        path: `/blog/${slug}`,
        title: `${title} | J K Fertilizers Blog`,
        description: excerpt,
        canonical: `/blog/${slug}`,
        ogImage: blogImg,
        ogType: 'article',
        schema: [
          organizationSchema,
          {
            "@type": "BlogPosting",
            "@id": `${SITE_URL}/blog/${slug}#article`,
            headline: title,
            description: excerpt,
            url: `${SITE_URL}/blog/${slug}`,
            datePublished: fm.date || '2024-01-01',
            dateModified: fm.date || '2024-01-01',
            image: blogImg.startsWith('http') ? blogImg : `${SITE_URL}${blogImg.startsWith('/') ? blogImg : '/' + blogImg}`,
            author: { "@type": "Person", name: fm.author || "Akash Dadhania" },
            publisher: { "@id": `${SITE_URL}/#organization` },
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": `${SITE_URL}/blog/${slug}`
            }
          },
          createBreadcrumb([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: title, path: `/blog/${slug}` }
          ])
        ]
      });
    }
  }
}

// ─── Inject & Write HTML Snapshots ────────────────────────────────────────────
console.log(`[prerender] Generating static HTML snapshots for ${pages.length} routes...`);

let generatedCount = 0;

for (const page of pages) {
  let html = templateHtml;

  // Title
  html = html.replace(/<title>.*?<\/title>/i, `<title>${escapeXml(page.title)}</title>`);

  // Meta Description
  html = html.replace(/<meta name="description" content=".*?" \/>/i, `<meta name="description" content="${escapeXml(page.description)}" />`);

  // Canonical
  const fullCanonical = `${SITE_URL}${page.canonical}`;
  html = html.replace(/<link rel="canonical" href=".*?" \/>/i, `<link rel="canonical" href="${escapeXml(fullCanonical)}" />`);

  // Robots
  if (page.noindex) {
    html = html.replace(/<meta name="robots" content=".*?" \/>/i, `<meta name="robots" content="noindex,nofollow" />`);
  }

  // Open Graph
  html = html.replace(/<meta property="og:title" content=".*?" \/>/i, `<meta property="og:title" content="${escapeXml(page.title)}" />`);
  html = html.replace(/<meta property="og:description" content=".*?" \/>/i, `<meta property="og:description" content="${escapeXml(page.description)}" />`);
  html = html.replace(/<meta property="og:url" content=".*?" \/>/i, `<meta property="og:url" content="${escapeXml(fullCanonical)}" />`);

  if (page.ogImage) {
    const fullOgImg = page.ogImage.startsWith('http') ? page.ogImage : `${SITE_URL}${page.ogImage}`;
    html = html.replace(/<meta property="og:image" content=".*?" \/>/i, `<meta property="og:image" content="${escapeXml(fullOgImg)}" />`);
  }

  // Twitter
  html = html.replace(/<meta name="twitter:title" content=".*?" \/>/i, `<meta name="twitter:title" content="${escapeXml(page.title)}" />`);
  html = html.replace(/<meta name="twitter:description" content=".*?" \/>/i, `<meta name="twitter:description" content="${escapeXml(page.description)}" />`);

  // Schema Injection — unified @graph format with clean replacement of base schema
  if (page.schema && Array.isArray(page.schema) && page.schema.length > 0) {
    const graph = page.schema.flatMap(s => {
      if (s["@graph"] && Array.isArray(s["@graph"])) return s["@graph"];
      const { "@context": _ctx, ...rest } = s;
      return rest;
    });
    const schemaObj = {
      "@context": "https://schema.org",
      "@graph": graph
    };
    const schemaScript = `    <script type="application/ld+json">\n${JSON.stringify(schemaObj, null, 2)}\n    </script>`;
    if (html.includes('<script type="application/ld+json">')) {
      html = html.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/i, schemaScript);
    } else {
      html = html.replace('</head>', `${schemaScript}\n  </head>`);
    }
  }

  // Determine file output path
  let outPath;
  if (page.path === '/') {
    outPath = join(DIST_DIR, 'index.html');
  } else if (page.path === '/404') {
    outPath = join(DIST_DIR, '404.html');
  } else {
    const dir = join(DIST_DIR, page.path.replace(/^\//, ''));
    if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
    outPath = join(dir, 'index.html');
  }

  writeFileSync(outPath, html, 'utf8');
  generatedCount++;
}

console.log(`[prerender] Successfully generated ${generatedCount} static HTML snapshots in dist/!`);

