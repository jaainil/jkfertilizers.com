# AGENT.md — JK Fertilizers Website

> This file gives AI assistants full context to work on this codebase without needing to explore it from scratch.
> Keep it updated whenever you make significant structural changes.

---

## 1. Project Overview

**Site:** [jkfertilizers.com](https://jkfertilizers.com)
**Business:** J K Fertilizers — organic fertilizer manufacturer in Vasad, Anand, Gujarat, India. Founded 2006 by Mr. Akash Dadhania.
**Purpose:** B2B marketing website. Primary goal is lead generation (inquiry form) and product/service discovery for distributors, farmers, and contract manufacturing clients.
**Package name in package.json:** `jkfertilizers`

---

## 2. Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + TypeScript |
| Build tool | Vite 8 |
| Styling | Tailwind CSS v4 (via `@tailwindcss/vite`) |
| Routing | React Router DOM v7 |
| Content (blog/products/services) | MDX (`@mdx-js/rollup` + `@mdx-js/react`) |
| Forms | Formspree (`@formspree/react` v3) — form ID: `mjybrvgp` |
| SEO | `react-helmet-async` + custom `SEOHead` component |
| Analytics | Google Analytics 4 (`react-ga4`, ID: `G-L1BQM1V3E3`) |
| Toast notifications | `sonner` |
| Icons | `lucide-react` |
| Carousel | `embla-carousel-react` + `embla-carousel-autoplay` |
| PWA | `vite-plugin-pwa` |
| Sitemap | `vite-plugin-sitemap` (auto-generates from routes + slugs) |
| RSS | Custom script `scripts/generate-rss.mjs` |
| Package manager | Bun (has `bun.lock`) — use `bun install`, `bun run dev` etc. |
| Port | Dev server runs on **port 3000** |

---

## 3. Scripts

```bash
bun run dev        # Start dev server (localhost:3000)
bun run build      # vite build + generate-rss.mjs
bun run preview    # Preview production build
bun run rss        # Regenerate RSS feed only
```

---

## 4. Directory Structure

```
jkfertilizers.com/
├── public/
│   ├── images/
│   │   └── about-*.jpg        # About/team/factory photos (products/services images live in src/content/)
│   └── favicon.ico, icon-192.png, icon-512.png, apple-touch-icon.png
│
├── src/
│   ├── index.tsx              # Entry point
│   ├── App.tsx                # Router, GA4 init, layout shell
│   ├── index.css              # Global styles + design tokens (TW v4)
│   │
│   ├── data/
│   │   ├── products.ts        # Product MDX loader + gallery helpers (see Section 8)
│   │   ├── siteData.ts        # company info, navigation array
│   │   └── seoSchemas.ts      # JSON-LD structured data builders
│   │
│   ├── content/
│   │   ├── blog/              # one folder per post: <slug>/index.mdx + its images
│   │   ├── products/          # one folder per product: <slug>/index.mdx + all its images
│   │   └── services/          # one folder per service: <slug>/index.mdx + all its images
│   │
│   ├── hooks/
│   │   └── useScrollReveal.ts # IntersectionObserver scroll reveal
│   │
│   ├── lib/
│   │   ├── content.ts         # MDX content loader utilities
│   │   └── utils.ts           # cn() helper (clsx + tailwind-merge)
│   │
│   ├── components/
│   │   ├── ui/                # Shadcn-style primitives
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── carousel.tsx
│   │   │   ├── input.tsx
│   │   │   ├── sonner.tsx
│   │   │   └── textarea.tsx
│   │   ├── HomePage.tsx       # Full homepage (~56KB)
│   │   ├── SiteNavbar.tsx     # Sticky header + mega menu
│   │   ├── SiteFooter.tsx     # Full footer
│   │   ├── SiteShell.tsx      # Layout wrapper
│   │   ├── InquiryForm.tsx    # B2B inquiry form (Formspree)
│   │   ├── ProductCard.tsx    # Card for /products listing
│   │   ├── ServiceCard.tsx
│   │   ├── ExpertiseCard.tsx
│   │   ├── InsightCard.tsx    # Blog post card
│   │   ├── PageHero.tsx       # Reusable inner-page hero
│   │   ├── ImagePanel.tsx
│   │   ├── SectionIntro.tsx
│   │   └── SEOHead.tsx        # Helmet SEO + JSON-LD injector
│   │
│   └── pages/
│       ├── AboutPage.tsx
│       ├── BlogPage.tsx
│       ├── BlogPostPage.tsx
│       ├── CommitmentPage.tsx
│       ├── ContactPage.tsx
│       ├── HistoryPage.tsx
│       ├── PortfolioPage.tsx
│       ├── ProductDetailPage.tsx   # Gallery viewer, lightbox
│       ├── ProductsPage.tsx        # Product grid listing
│       ├── ServiceDetailPage.tsx
│       └── ServicesPage.tsx
│
├── scripts/
│   └── generate-rss.mjs
│
├── vite.config.ts
├── tsconfig.json              # Path alias: @/ → src/
└── AGENT.md                   # ← this file
```

---

## 5. Routing

All routes in `src/App.tsx`:

| Path | Component |
|---|---|
| `/` | `HomePage` |
| `/about` | `AboutPage` |
| `/history` | `HistoryPage` |
| `/products` | `ProductsPage` |
| `/products/:slug` | `ProductDetailPage` |
| `/services` | `ServicesPage` |
| `/services/:slug` | `ServiceDetailPage` |
| `/blog` | `BlogPage` |
| `/blog/:slug` | `BlogPostPage` |
| `/portfolio` | `PortfolioPage` |
| `/commitment` | `CommitmentPage` |
| `/contact` | `ContactPage` |
| `*` | `HomePage` (fallback) |

Scroll-to-top + GA4 pageview fired on every route change via `AnalyticsAndScrollTracker`.

---

## 6. Design System

### Fonts
- **Heading/UI:** `Outfit Variable` → `font-heading` utility
- **Accent:** `Playfair Display Variable` → `font-accent` utility
- **Body:** `Manrope Variable` (default)

### Color Palette (HSL tokens in `src/index.css`)

| Token | HSL | Usage |
|---|---|---|
| `--primary` | `146 52% 28%` | Deep forest green — CTAs, links |
| `--secondary` | `155 45% 14%` | Dark earthy slate-green — hero bg |
| `--accent` | `38 92% 50%` | Warm amber/gold — highlights |
| `--background` | `42 30% 97%` | Warm cream |
| `--muted` | `90 18% 94%` | Warm sage — alt section bg |
| `--border` | `90 12% 88%` | Soft sage border |

In Tailwind classes: `bg-primary`, `text-secondary`, `border-accent`, `bg-muted`, `text-muted-foreground`, etc.
Custom surfaces: `bg-surface-card`, `bg-surface-overlay`.

### Type Scale Utilities
Always use these — **never raw `text-xl`** etc. for content:

| Utility | Size | Usage |
|---|---|---|
| `type-label` | 12px | Eyebrow pills, badges |
| `type-caption` | 11px | Overlay labels, dates |
| `type-body-sm` | 13→14px | Card descriptions |
| `type-body` | 14→16px | Section body text |
| `type-card-title` | 18→20→22px | h3 inside cards |
| `type-section-h2` | 28→36→44px | In-page h2 headings |
| `type-page-h1` | 28→38→52→60px | Inner-page hero h1 |
| `type-hero-h1` | 30→44→60→72px | Homepage hero h1 only |

### Surface & Pill Utilities
- `shadow-card` / `shadow-card-hover` — the **only** two card elevations. Never use arbitrary `shadow-[...]`.
- `eyebrow` (light bg) / `eyebrow-dark` (dark section) / `eyebrow-accent` (amber tint) — the **only** pill/badge styling for section labels. Never hand-write pill class strings.
- Letter-spacing on uppercase labels: max `tracking-[0.16em]`.
- Radii: cards `rounded-2xl` mobile → `rounded-3xl` on `sm+`. No arbitrary `rounded-[28px]` etc.

### Large Display Scaling
`index.css` bumps `html` root font-size at wide breakpoints (112.5% @2000px, 125% @2560px, 150% @3840px) — everything is rem-based, so typography, spacing, and the 90rem container scale proportionally on 4K/8K. Do not add per-component `xl:`/`2xl:` sizes for big screens; the root scaling handles it.

### Scroll Reveal
```tsx
import { useScrollReveal, staggerDelay } from "@/hooks/useScrollReveal";

const myReveal = useScrollReveal();

<div ref={myReveal.ref} className={`reveal ${myReveal.isVisible ? 'visible' : ''}`}>
  {items.map((item, i) => (
    <div key={item.id} {...staggerDelay(i)}>...</div>
  ))}
</div>

// Variants: reveal | reveal-scale
```

---

## 7. Key Components

### `SiteNavbar`
- Desktop mega menu for Products — shows featured product preview card on hover
- Uses `hoveredProductSlug` state + `getProductCoverImage` for preview image
- `menuForceClosed` briefly disables menu on link click to prevent stuck-open state
- Mobile: hamburger drawer with `openMobileSection` accordion state

### `InquiryForm`
- Formspree form ID: `mjybrvgp`
- Fields: name, company, email, phone, interest (select), message, consent checkbox
- **CRITICAL:** Do NOT call `e.preventDefault()` before `handleSubmit(e)`.
  Formspree v3 calls it internally — if you call it first, `e.currentTarget` becomes null and submission silently fails.
  Only call `e.preventDefault()` yourself if you're returning early (e.g. consent check failed).

### `ProductCard`
- Always use `getProductCoverImage(product.slug, product.imageUrl)` for `<img src>` — never `product.imageUrl` directly

### `SEOHead`
- Props: `title`, `description`, `canonical`, `ogImage`, `keywords`, `schema[]`, `product`
- Always include `organizationSchema` in every page's `schema` array

---

## 8. Products Data Architecture

**Each product is a folder:** `src/content/products/<slug>/`

```
src/content/products/diatomite-silicon/
├── index.mdx     ← frontmatter: title, imageUrl (cover filename), summary, fit[],
│                    category, tagline, description, howToApply[], benefits[], specs[],
│                    comparison? { title, headers, rows[] }
├── 1.png         ← cover image (referenced by imageUrl)
└── *.png         ← gallery photos (auto-discovered)
```

**Loader:** `src/data/products.ts` — reads everything via `import.meta.glob` (eager):
- `../content/products/*/index.mdx` → product data (frontmatter is the single source of truth)
- `../content/products/*/*.{jpg,jpeg,png,webp,avif,gif,svg}` → gallery URLs (bundled, hashed)
- `imageUrl` in frontmatter is just the **filename** of the cover inside the folder — the loader resolves it to the bundled URL.
- `comparison` in frontmatter provides optional technical comparison data against traditional alternatives (rendered on `ProductDetailPage`).

### All 16 Products

| Slug | Title | Category |
|---|---|---|
| `organic-manure` | Organic Manure | Organic Fertilizers |
| `pdm` | PDM (Potash Derived from Molasses) | Organic Fertilizers |
| `prom` | PROM (Phosphate Rich Organic Manure) | Organic Fertilizers |
| `mycorrhiza-granules-biofertilizers` | Mycorrhiza Biofertilizer | Biofertilizers |
| `customized-base-granules` | Customized Base Granules | Base Granules |
| `customized-coated-granules` | Customized Coated Granules | Coated Granules |
| `coated-base-granules-bio-npk` | Coated Base Granules Bio NPK | Coated Granules |
| `coated-base-granules-mycorrhiza` | Coated Base Granules Mycorrhiza | Coated Granules |
| `pancharatna-base-granules` | Pancharatna Base Granules | Base Granules |
| `organic-carbon-base-granules` | Organic Carbon Base Granules | Base Granules |
| `humic-based-granules` | Humic Based Granules | Base Granules |
| `enriched-base-granules` | Enriched Base Granules | Base Granules |
| `other-nutrients-base-granules` | Other Nutrients Base Granules | Base Granules |
| `base-granules` | Base Granules | Base Granules |
| `plant-available-silica` | Plant Available Silica | Base Granules |
| `diatomite-silicon` | Diatomite Silicon | Base Granules |

### Exported Helpers & Types

```ts
export interface HowToApplyStep {
  step: string;     // e.g. "01", "02", "03"
  title: string;    // Step headline
  detail: string;   // Actionable instructions
}

export interface ProductBenefit {
  title: string;    // Benefit headline
  detail: string;   // Technical advantage explanation
}

export interface ProductSpec {
  label: string;    // e.g. "Product Type", "Certification", "Form", "Heavy Metal"
  value: string;    // e.g. "FCO Approved", "Low (< 10%)", "Uniform Round Granules"
}

export interface ComparisonRow {
  feature: string;      // e.g. "Customizable Base Material", "Heavy Metal Content"
  traditional: string;  // e.g. "High (more than 18%)"
  ours: string;         // e.g. "Low (less than or around 10%)"
}

export interface ProductComparison {
  title?: string;
  headers?: {
    feature?: string;      // default: "Feature"
    traditional?: string;  // default: "Bentonite Granules"
    ours?: string;         // default: "Our Recipe Granules"
  };
  rows: ComparisonRow[];
}

export interface Product {
  slug: string;
  title: string;
  imageUrl: string;
  summary: string;
  fit: string[];
  category: string;
  tagline: string;
  description: string;
  howToApply: HowToApplyStep[];
  benefits: ProductBenefit[];
  specs: ProductSpec[];
  comparison?: ProductComparison;
  gallery?: string[];
  Component?: ComponentType;
}

products: Product[]                            // all products, glob-driven
getProductBySlug(slug): Product | undefined
getRelatedProducts(slug): Product[]            // all except current
getProductGallery(slug): string[]              // auto-discovered gallery images
getProductCoverImage(slug, imageUrl): string   // declared cover, or first gallery photo
```

### Complete Product Frontmatter Parameter Reference

Every product `src/content/products/<slug>/index.mdx` accepts the following frontmatter fields:

| Parameter | Type | Required | Description |
|---|---|---|---|
| `title` | `string` | **Yes** | Full product display name (e.g. `"Diatomite Silicon"`). |
| `imageUrl` | `string` | **Yes** | Filename of the cover image inside the folder (e.g. `"1.png"`). Resolved automatically by Vite. |
| `summary` | `string` | **Yes** | 1–2 sentence summary used on listing cards, hero overview, and meta tags. |
| `tagline` | `string` | **Yes** | Subtitle / slogan displayed directly under the h1 title on the detail page. |
| `category` | `string` | **Yes** | Category label (e.g. `"Base Granules"`, `"Coated Granules"`, `"Organic Fertilizers"`). |
| `fit` | `string[]` | **Yes** | Array of 3–5 badge tags (e.g. `["FCO Approved", "Soil Health", "Sustainable Farming"]`). |
| `description` | `string` (multiline `\|`) | **Yes** | 2–3 paragraph long-form description of the product, mechanisms, and agronomic value. |
| `howToApply` | `HowToApplyStep[]` | **Yes** | 3-step application guide. Each item must have `step` (`"01"`), `title`, and `detail`. |
| `benefits` | `ProductBenefit[]` | **Yes** | List of key agronomic benefits. Each item must have `title` and `detail`. |
| `specs` | `ProductSpec[]` | **Yes** | Quick-spec attributes rendered in the top spec bar & sidebar card. Each item has `label` and `value`. |
| `comparison` | `ProductComparison` | *Optional* | Technical head-to-head comparison table rendered on `ProductDetailPage`. |
| `comparison.title` | `string` | *Optional* | Heading for the comparison section. |
| `comparison.headers` | `object` | *Optional* | Column header labels (`feature`, `traditional`, `ours`). |
| `comparison.rows` | `ComparisonRow[]` | *Optional* | Array of rows comparing attributes (`feature`, `traditional`, `ours`). |

#### Full Frontmatter Example with Comparison Table

```yaml
---
title: "Diatomite Silicon"
imageUrl: "1.png"
summary: "A certified, government-approved fertilizer under FCO enriched with silica to improve soil health and crop resilience."
fit:
  - "FCO Approved"
  - "Silica Enriched"
  - "Crop Resilience"
  - "Soil Health"
  - "Sustainable Farming"
category: "Base Granules"
tagline: "A Government-Approved FCO Product"
description: |
  Diatomite Silicon is a certified, government-approved fertilizer under the Fertilizer Control Order (FCO), guaranteeing quality and compliance. This high-quality, mineral-based product is enriched with silica to improve soil health and crop performance sustainably.

  Designed to enhance plant resilience against environmental stress, it promotes robust growth, improves nutrient uptake, and strengthens crops.
howToApply:
  - step: "01"
    title: "Direct Soil Application"
    detail: "Apply directly to the soil during basal application or field preparation."
  - step: "02"
    title: "Fertilizer Blending"
    detail: "Blend seamlessly with NPK or organic fertilizers."
  - step: "03"
    title: "Broadcasting"
    detail: "Broadcast evenly across fields and incorporate into topsoil."
benefits:
  - title: "FCO Certified Quality"
    detail: "Government-approved under the Fertilizer Control Order (FCO)."
  - title: "Enhanced Crop Resilience"
    detail: "Strengthens cellular walls against lodging, pests, and drought."
specs:
  - label: "Product Type"
    value: "Diatomite Silicon Granules"
  - label: "Category"
    value: "Base Granules"
  - label: "Certification"
    value: "FCO Approved (Govt. of India)"
  - label: "Heavy Metal"
    value: "Low (< 10%)"
comparison:
  title: "Comprehensive Comparison: Traditional Bentonite Granules vs. Advanced Custom Mineral-Based Granules"
  headers:
    feature: "Feature"
    traditional: "Bentonite Granules"
    ours: "Our Recipe Granules"
  rows:
    - feature: "Customizable Base Material"
      traditional: "Yes"
      ours: "Yes (Ca, Mg, Phosphorus, Silica, and other minerals)"
    - feature: "Enhanced Nutrient Addition"
      traditional: "No (coating only)"
      ours: "Yes (can be integrated into the base)"
    - feature: "Heavy Metal Content"
      traditional: "High (more than 18%)"
      ours: "Low (less than or around 10%)"
    - feature: "Order Flexibility"
      traditional: "Yes (Bulk Orders)"
      ours: "Yes (customizable quantities per demand)"
---
```

### Adding a New Product

1. Create `src/content/products/<slug>/index.mdx` with the frontmatter fields above (optionally including `comparison: { title, headers, rows }`)
2. Drop the cover + gallery images into the same folder
3. Add the product route/link to `src/components/SiteNavbar.tsx`
4. Done — product appears on /products, homepage marquee, mega menu, and sitemap automatically

---

## 9. Vite Config Highlights

- **`@/` alias** → `src/`
- **MDX** with frontmatter via remark plugins
- **Sitemap** auto-generated from product/blog/service slugs (product/service slugs = folder names under `src/content/`)
- **PWA** service worker — caches all assets including images
- **`import.meta.glob('/public/**')`** works — Vite resolves from project root

---

## 10. Content (MDX)

### Blog — `src/content/blog/<slug>/index.mdx`
Frontmatter: `title`, `date`, `dateDisplay`, `excerpt`, `author`, `topic`, `img` (cover **filename** inside the folder — resolved by the loader), `featured`, `tags`

Note: blog cover images are copies — the originals in `public/images/` (hero.jpg, soil.jpg, etc.) are shared with other pages, so they are NOT deleted from public.

### Services — `src/content/services/<slug>/index.mdx`
Slugs: `custom-packaging-solutions`, `granule-technology`, `infrastructure-leasing`, `job-work-services`, `warehouse-storage`

Frontmatter: `title`, `concept`, `description`, `image` (cover **filename** inside the folder — resolved by the loader).
Images live in the same folder and are auto-discovered; `getServiceGallery(slug)` in `src/lib/content.ts` returns them (used by `ServiceDetailPage` — no hardcoded image lists).
Body (MDX) is the long-form service content.

### Adding a New Service

1. Create `src/content/services/<slug>/index.mdx` with frontmatter
2. Drop cover + gallery images into the same folder
3. Done — appears on /services and sitemap automatically

---

## 11. SEO

- **GA4 ID:** `G-L1BQM1V3E3`
- **JSON-LD schemas** (`src/data/seoSchemas.ts`):
  - `organizationSchema` — include on every page
  - `contactPageSchema`
  - `productsPageSchema`, `productsItemListSchema`
  - `buildProductSchema(product)`
  - `buildProductFaqSchema(product)`
  - `buildProductHowToSchema(product)`
  - `breadcrumbSchema(items)`

---

## 12. Forms

### Inquiry Form
- Formspree endpoint: `https://formspree.io/f/mjybrvgp`
- Component: `src/components/InquiryForm.tsx`
- **Do NOT** call `e.preventDefault()` before `handleSubmit(e)` — see Section 7

---

## 13. Company Reference Data

```
Name:     J K Fertilizers
Tagline:  Organic, Naturally
Founded:  2006
Founder:  Mr. Akash Dadhania (Founder & Director)
Address:  NH. 48, Opp. IOC Petrol Pump, B/H Adas Bus Stop,
          Vasad, Dist: Anand, Gujarat - 388305, INDIA
Phone:    9825045894 / 9825045892 / 9825045891
Email:    info@jkfertilizers.com | sales@jkfertilizers.com
Maps:     https://maps.app.goo.gl/wxxAwGrF7c3Yn6VSA
Hours:    Mon–Sat, 9:00 AM – 6:00 PM
Clients:  150+ trusted clients
Cert:     FCO Approved (Fertilizer Control Order)
```

---

## 14. Rules & Conventions

### DO
- Use `@/` alias for all imports from `src/`
- Use `getProductCoverImage(slug, imageUrl)` for any product `<img src>`
- Use type scale utilities (`type-card-title`, `type-section-h2`, etc.) for content headings
- Import company data from `src/data/siteData.ts` — never hardcode phone/email/address
- Reset gallery state (`selectedImageIndex`, `activeImageIndex`) in `useEffect([slug])` on `ProductDetailPage`
- Use `bun` not `npm` for package management

### DO NOT
- ❌ Use `product.imageUrl` directly in `<img>` — always use `getProductCoverImage()`
- ❌ Manually list files in `getProductGallery` — just drop images into the folder
- ❌ Call `e.preventDefault()` before Formspree's `handleSubmit(e)`
- ❌ Hardcode company info in page components
- ❌ Use raw `text-xl`/`text-2xl` for content headings — use type utilities
- ❌ Use arbitrary `shadow-[0_...px_rgba(...)]` — use `shadow-card` / `hover:shadow-card-hover`
- ❌ Hand-write eyebrow pill class strings — use `eyebrow` / `eyebrow-dark` / `eyebrow-accent`
- ❌ Add decorative gradient/noise/glow-blob layers, `backdrop-blur` glassmorphism, or `blur-[...]` ambience divs
- ❌ Use relative imports from `src/` — use `@/` alias
- ❌ Run `npm install` — use `bun install`
- ❌ Use `key={imageUrl}` when mapping product images — use `key={idx}` or `key={slug}`

---

## 15. Additional Context

### TypeScript Config (`tsconfig.json`)
- `strict: false`, `noImplicitAny: false` — lenient typing, many components have untyped props
- **`noUnusedLocals: true`, `noUnusedParameters: true`** — these ARE enforced. Clean up unused vars.
- Path alias: `@/` → `src/`
- Target: ES2020, moduleResolution: bundler

### Public Static Files & Agent Discovery
- `public/.htaccess` — Apache config (SPA fallback + caching headers + Agent Link headers for shared hosting)
- `public/_worker.js` — Cloudflare Pages Worker (Content negotiation, Agent Skills, MCP discovery, A2A discovery, PRM, RFC 8288 link headers)
- `public/_headers` & `vercel.json` — Edge headers for Netlify/Cloudflare/Vercel
- `public/.well-known/agent-card.json` — Agent2Agent (A2A) Agent Card (Linux Foundation A2A Protocol)
- `public/.well-known/mcp/server-card.json` — Model Context Protocol (MCP) Server Card (SEP-1649 / SEP-2127)
- `public/.well-known/agent-skills/index.json` — Agent Skills Discovery Index (RFC v0.2.0)
- `public/.well-known/api-catalog` — API Catalog (RFC 9727 / RFC 9264)
- `public/dns-aid.zone` — DNS for AI Discovery (DNS-AID) SVCB/HTTPS zone records (draft-mozleywilliams-dnsop-dnsaid / RFC 9460)
- `public/rss.xml` — Blog RSS feed, regenerated by `bun run rss`
- `public/llms.txt` — GEO (Generative Engine Optimization) file for AI crawlers
- `public/auth.md` — Agent authentication and identity assertion specification

### No i18n in use
`tKey` fields on nav items (`nav.home`, `nav.about`, etc.) are placeholder fields — there is no i18n library installed. Do not add i18n logic.

### No test suite
No testing framework is configured. Do not reference or add test files.

### No global state management
Only React `useState` / `useEffect`. No Redux, Zustand, Context API for state (HelmetProvider and BrowserRouter are providers, not state managers).

### Git identity
Commits are made as `emergent-agent-e1 <github@emergent.sh>` — this is the AI agent identity.

### Adding new content
| Content type | What to do |
|---|---|
| New blog post | Create `src/content/blog/<slug>/` with `index.mdx` + cover image — auto-discovered; run `bun run rss` |
| New service page | Create `src/content/services/<slug>/` with `index.mdx` + images — auto-discovered |
| New product | Create `src/content/products/<slug>/` with `index.mdx` + images — auto-discovered |
| New product/service images | Drop files into the content folder — auto-discovered by `import.meta.glob`, no code change needed |
| Rebuild sitemap | Automatic on `bun run build` |
| Update RSS | Run `bun run rss` after adding blog posts |
