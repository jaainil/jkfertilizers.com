import { Helmet } from "react-helmet-async";

const SITE_URL = "https://jkfertilizers.com";
const SITE_NAME = "J K Fertilizers";
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;
const DEFAULT_TWITTER_HANDLE = "@JKFertilizers";
const DEFAULT_KEYWORDS =
  "organic fertilizer manufacturer India, J K Fertilizers, organic manure, PDM fertilizer, PROM fertilizer, mycorrhiza granules, fertilizer manufacturer Gujarat, coated granules, base granules, organic fertilizer Anand, FCO approved fertilizer";

interface ArticleMeta {
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
  tags?: string[];
}

interface ProductMeta {
  price?: string;
  currency?: string;
  availability?: string;
}

interface SEOHeadProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  keywords?: string;
  schema?: object | object[];
  noindex?: boolean;
  article?: ArticleMeta;
  product?: ProductMeta;
}

export function SEOHead({
  title,
  description,
  canonical,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = "website",
  keywords,
  schema,
  noindex = false,
  article,
  product,
}: SEOHeadProps) {
  // Only append brand suffix when the passed title doesn't already reference JK Fertilizers.
  // This prevents 130-150 char duplicate titles like:
  // "Contact Us — J K Fertilizers | ... | J K Fertilizers — Manufacturers of Organic Fertilizers"
  const fullTitle = title
    ? title.includes("J K Fertilizers")
      ? title
      : `${title} | J K Fertilizers`
    : "J K Fertilizers — Manufacturers of Organic Fertilizers | Anand, Gujarat";

  const canonicalUrl = canonical ? `${SITE_URL}${canonical}` : SITE_URL;

  const ogImageUrl = ogImage.startsWith("http") ? ogImage : `${SITE_URL}${ogImage}`;
  const ogImageAlt = title
    ? `${title} — J K Fertilizers, Organic Fertilizer Manufacturer Gujarat India`
    : "J K Fertilizers — Manufacturers of Organic Fertilizers";

  const schemas = schema ? (Array.isArray(schema) ? schema : [schema]) : [];

  const allKeywords = keywords
    ? `${keywords}, ${DEFAULT_KEYWORDS}`
    : DEFAULT_KEYWORDS;

  return (
    <Helmet>
      {/* ── Core ── */}
      <html lang="en-IN" />
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={allKeywords} />
      <meta
        name="robots"
        content={
          noindex
            ? "noindex,nofollow"
            : "index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1"
        }
      />
      <link rel="canonical" href={canonicalUrl} />

      {/* ── Author / Brand ── */}
      <meta name="author" content="J K Fertilizers" />
      <meta name="copyright" content="© 2026 J K Fertilizers. All rights reserved." />
      <meta name="publisher" content="J K Fertilizers" />

      {/* ── Business Classification ── */}
      <meta name="classification" content="Business, Agriculture, Organic Fertilizer Manufacturing" />
      <meta name="category" content="Organic Fertilizer Manufacturer, Agricultural Inputs" />
      <meta name="coverage" content="Worldwide" />
      <meta name="distribution" content="Global" />
      <meta name="target" content="all" />
      <meta name="rating" content="general" />
      <meta name="language" content="en-IN" />
      <meta name="revisit-after" content="7 days" />

      {/* ── Geo / Local targeting ── */}
      <meta name="geo.region" content="IN-GJ" />
      <meta name="geo.placename" content="Vasad, Anand, Gujarat, INDIA" />
      <meta name="geo.position" content="22.4475;72.8573" />
      <meta name="ICBM" content="22.4475, 72.8573" />

      {/* ── Dublin Core Metadata ── */}
      <meta name="DC.title" content={fullTitle} />
      <meta name="DC.description" content={description} />
      <meta name="DC.publisher" content="J K Fertilizers" />
      <meta name="DC.creator" content="Akash Dadhania" />
      <meta name="DC.language" content="en-IN" />
      <meta name="DC.coverage" content="India, Gujarat, Worldwide" />
      <meta name="DC.rights" content="© 2026 J K Fertilizers" />
      <meta name="DC.identifier" content={canonicalUrl} />
      <meta name="DC.subject" content="Organic Fertilizer Manufacturing, Agricultural Inputs, Gujarat INDIA" />
      {article?.publishedTime && (
        <meta name="DC.date" content={article.publishedTime} />
      )}

      {/* ── Open Graph — Core ── */}
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:locale" content="en_IN" />
      <meta property="og:locale:alternate" content="en_US" />
      <meta property="og:locale:alternate" content="gu_IN" />

      {/* ── Open Graph — Image ── */}
      <meta property="og:image" content={ogImageUrl} />
      <meta property="og:image:secure_url" content={ogImageUrl} />
      <meta property="og:image:type" content={ogImageUrl.endsWith(".png") ? "image/png" : "image/jpeg"} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={ogImageAlt} />

      {/* ── Open Graph — Business ── */}
      <meta property="og:see_also" content="https://www.linkedin.com/company/jkfertilizers" />
      <meta property="og:see_also" content="https://www.facebook.com/jkfertilizers" />
      <meta property="og:see_also" content="https://www.instagram.com/jkfertilizers" />

      {/* ── Open Graph — Article (for blog posts) ── */}
      {article && (
        <>
          {article.publishedTime && (
            <meta property="article:published_time" content={article.publishedTime} />
          )}
          {article.modifiedTime && (
            <meta property="article:modified_time" content={article.modifiedTime} />
          )}
          {article.author && (
            <meta property="article:author" content={article.author} />
          )}
          {article.section && (
            <meta property="article:section" content={article.section} />
          )}
          {article.tags?.map((tag) => (
            <meta key={tag} property="article:tag" content={tag} />
          ))}
        </>
      )}

      {/* ── Open Graph — Product ── */}
      {product && (
        <>
          {product.price && (
            <meta property="product:price:amount" content={product.price} />
          )}
          {product.currency && (
            <meta property="product:price:currency" content={product.currency} />
          )}
          {product.availability && (
            <meta property="product:availability" content={product.availability} />
          )}
        </>
      )}

      {/* ── Twitter / X Cards ── */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={DEFAULT_TWITTER_HANDLE} />
      <meta name="twitter:creator" content={DEFAULT_TWITTER_HANDLE} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImageUrl} />
      <meta name="twitter:image:alt" content={ogImageAlt} />
      <meta name="twitter:domain" content="jkfertilizers.com" />
      
      {/* ── JSON-LD Structured Data ── */}
      {schemas.map((s) => (
        <script key={JSON.stringify(s)} type="application/ld+json">
          {JSON.stringify(s, null, 0)}
        </script>
      ))}
    </Helmet>
  );
}
