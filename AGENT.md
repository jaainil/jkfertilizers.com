# AGENT.md: JK Fertilizers Website

> This file gives AI assistants full context to work on this codebase without needing to explore it from scratch.
> Keep it updated whenever you make significant structural changes.

---

## 1. Project Overview

**Site:** [jkfertilizers.com](https://jkfertilizers.com)
**Business:** J K Fertilizers (organic fertilizer manufacturer in Vasad, Anand, Gujarat, India. Founded 2006 by Mr. Akash Dadhania).
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
| Forms | Formspree (`@formspree/react` v3) - form ID: `mjybrvgp` |
| SEO | `react-helmet-async` + custom `SEOHead` component |
| Fuzzy Search | `fuse.js` v7 (weighted typo-tolerant catalog search) |
| Analytics | Google Analytics 4 (`G-L1BQM1V3E3`) + Umami Analytics (`57ab23b0-35e3-4868-9718-3c17b45138ee`) |
| Toast notifications | `sonner` |
| Icons | `lucide-react` |
| Carousel | `embla-carousel-react` + `embla-carousel-autoplay` |
| PWA | `vite-plugin-pwa` |
| Sitemap | `vite-plugin-sitemap` (auto-generates from routes + slugs) |
| RSS | Custom script `scripts/generate-rss.mjs` |
| Package manager | Bun (has `bun.lock`) - use `bun install`, `bun run dev` etc. |
| Port | Dev server runs on **port 3000** |

---

## 3. Scripts

```bash
bun run dev             # Start dev server (localhost:3000)
bun run build           # vite build + sitemap + rss + markdown + skills + prerender
bun run preview         # Preview production build
bun run rss             # Regenerate RSS feed only
bun run sitemap         # Regenerate sitemap.xml
bun run optimize-images # ImageMagick image resizing & compression pipeline
```

---

## 4. Directory Structure

```
jkfertilizers.com/
├── public/
│   ├── images/                # Site hero, factory, soil, overview photos (optimized WebP)
│   ├── logo.webp              # Brand logo (240x240 optimized)
│   ├── og-image.webp          # OpenGraph social card (1200x630 optimized)
│   └── favicon.ico, icon-192.webp, icon-512.webp, apple-touch-icon.webp
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
│   │   ├── HomePage.tsx       # Full homepage
│   │   ├── SiteNavbar.tsx     # Sticky header + mega menu
│   │   ├── SiteFooter.tsx     # Full footer
│   │   ├── SiteShell.tsx      # Layout wrapper
│   │   ├── InquiryForm.tsx    # B2B inquiry form (Formspree)
│   │   ├── ProductCard.tsx    # Card for /products listing with lazy & async decoding
│   │   ├── ServiceCard.tsx
│   │   ├── ExpertiseCard.tsx
│   │   ├── InsightCard.tsx    # Blog post card
│   │   ├── PageHero.tsx       # Reusable inner-page hero
│   │   ├── ImagePanel.tsx     # Performance-tuned image panel with fetchPriority & decoding
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
│   ├── optimize-images.sh     # Batch ImageMagick image compressor
│   ├── generate-robots.mjs
│   ├── generate-sitemap.mjs
│   ├── generate-rss.mjs
│   ├── generate-markdown.mjs
│   ├── generate-skills-index.mjs
│   └── prerender.mjs
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
| `--primary` | `146 52% 28%` | Deep forest green - CTAs, links |
| `--secondary` | `155 45% 14%` | Dark earthy slate-green - hero bg |
| `--accent` | `38 92% 50%` | Warm amber/gold - highlights |
| `--background` | `42 30% 97%` | Warm cream |
| `--muted` | `90 18% 94%` | Warm sage - alt section bg |
| `--border` | `90 12% 88%` | Soft sage border |

In Tailwind classes: `bg-primary`, `text-secondary`, `border-accent`, `bg-muted`, `text-muted-foreground`, etc.
Custom surfaces: `bg-surface-card`, `bg-surface-overlay`.

### Type Scale Utilities
Always use these - **never raw `text-xl`** etc. for content:

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
- `shadow-card` / `shadow-card-hover` - the **only** two card elevations. Never use arbitrary `shadow-[...]`.
- `eyebrow` (light bg) / `eyebrow-dark` (dark section) / `eyebrow-accent` (amber tint) - the standard pill/badge utility styling for section labels.
- Letter-spacing on uppercase labels: max `tracking-[0.16em]` or `tracking-wider`.
- Radii: cards `rounded-2xl` mobile -> `rounded-3xl` on `sm+`. No arbitrary `rounded-[28px]` etc.

### Large Display Scaling
`index.css` bumps `html` root font-size at wide breakpoints (112.5% @2000px, 125% @2560px, 150% @3840px) - everything is rem-based, so typography, spacing, and the 90rem container scale proportionally on 4K/8K. Do not add per-component `xl:`/`2xl:` sizes for big screens; the root scaling handles it.

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
- Desktop mega menu for Products - shows featured product preview card on hover
- Uses `hoveredProductSlug` state + `getProductCoverImage` for preview image
- `menuForceClosed` briefly disables menu on link click to prevent stuck-open state
- Mobile: hamburger drawer with `openMobileSection` accordion state

### `ProductDetailPage`
- **Hero Badge Hierarchy**:
  - *Tier 1 (Navigation Link)*: `<Link to="/products">` styled as a frosted-glass button (`border-white/25 bg-white/10 text-white`) with back arrow.
  - *Tier 2 (Category Badge)*: `{product.category}` styled with an accent amber pill (`border-accent/40 bg-accent/15 text-accent`) and indicator dot.
  - *Tier 3 (Suitability Tags)*: `product.fit` rendered below summary with check icons (`CheckCircle2`).
  - *Mobile Layout*: Badges rendered in `flex-nowrap shrink-0 whitespace-nowrap` container so they always display side-by-side without wrapping prematurely.
- **State Management**:
  - Image slider and modal share `[selectedImageIndex, setSelectedImageIndex]`.
  - Always provide defensive fallback arrays `(specs || [])`, `(fit || [])`, `(howToApply || [])`, `(benefits || [])`, and `(comparison?.rows || [])`.
- **Helpers**:
  - Uses `getProductBySlug`, `getRelatedProducts`, `getProductGallery`, `getProductCoverImage`, and `NotFoundPage`.

### `InquiryForm`
- Formspree form ID: `mjybrvgp`
- Fields: name, company, email, phone, interest (select), message, consent checkbox
- **CRITICAL:** Do NOT call `e.preventDefault()` before `handleSubmit(e)`.
  Formspree v3 calls it internally - if you call it first, `e.currentTarget` becomes null and submission silently fails.
  Only call `e.preventDefault()` yourself if you're returning early (e.g. consent check failed).

### `ProductCard`
- Always use `getProductCoverImage(product.slug, product.imageUrl)` for `<img src>` - never `product.imageUrl` directly
- Always include `width={400}`, `height={300}`, `loading="lazy"`, and `decoding="async"` to prevent layout shifts (CLS)

### `ImagePanel`
- Reusable performance container with responsive rounded borders and shadow elevation
- Props: `src`, `alt`, `width`, `height`, `eager` (defaults `fetchPriority="high"` when true), `fetchPriority`, `decoding` (default `"async"`), `overlay`, `className`
- Use `eager={true}` with `fetchPriority="high"` on the Homepage hero LCP image

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
├── 1.webp         ← cover image (referenced by imageUrl)
└── *.png         ← gallery photos (auto-discovered)
```

**Loader:** `src/data/products.ts` (reads everything via `import.meta.glob` eager):
- `../content/products/*/index.mdx` -> product data (frontmatter is the single source of truth)
- `../content/products/*/*.{jpg,jpeg,png,webp,avif,gif,svg}` -> gallery URLs (bundled, hashed)
- `imageUrl` in frontmatter is just the **filename** of the cover inside the folder - the loader resolves it to the bundled URL.
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
| `imageUrl` | `string` | **Yes** | Filename of the cover image inside the folder (e.g. `"1.webp"`). Resolved automatically by Vite. |
| `summary` | `string` | **Yes** | 1–2 sentence summary used on listing cards, hero overview, and meta tags. |
| `tagline` | `string` | **Yes** | Subtitle / slogan displayed directly under the h1 title on the detail page. |
| `category` | `string` | **Yes** | Category label (e.g. `"Base Granules"`, `"Coated Granules"`, `"Organic Fertilizers"`). |
| `fit` | `string[]` | **Yes** | Array of 3–6 badge tags highlighting active chemistry, certifications, and soil mechanics. |
| `description` | `string` (multiline `\|`) | **Yes** | 2–3 paragraph long-form description of the product, chemical stoichiometry, reaction mechanisms, and agronomic value. |
| `howToApply` | `HowToApplyStep[]` | **Yes** | 3-step application guide. Each item must have `step` (`"01"`), `title`, and `detail`. |
| `benefits` | `ProductBenefit[]` | **Yes** | List of 4 key agronomic benefits. Each item must have `title` and `detail`. |
| `specs` | `ProductSpec[]` | **Yes** | Quick-spec attributes rendered in the top spec bar & sidebar card. Each item has `label` and `value`. |
| `comparison` | `ProductComparison` | *Optional* | Technical head-to-head comparison table rendered on `ProductDetailPage`. |
| `comparison.title` | `string` | *Optional* | Heading for the comparison section (e.g. `"Comparison: PROM vs. Synthetic DAP & SSP"`). |
| `comparison.headers` | `object` | *Optional* | Column header labels (`feature`, `traditional`, `ours`). |
| `comparison.rows` | `ComparisonRow[]` | *Optional* | Array of rows comparing attributes (`feature`, `traditional`, `ours`). |

#### Chemical & Formula Formatting Rules in MDX
- **Always use standard Unicode subscripts and superscripts** in product descriptions, summaries, and benefits:
  - Ions & Cations: `Ca²⁺`, `Mg²⁺`, `SO₄²⁻`, `Zn²⁺`, `Fe²⁺/Fe³⁺`, `Mn²⁺`, `BO₃³⁻`, `Na⁺`, `K⁺`, `NH₄⁺`, `H₂PO₄⁻`
  - Mineral & Chemical Formulas: `CaSO₄·2H₂O`, `CaMg(CO₃)₂`, `CaCO₃`, `SiO₂·nH₂O`, `H₄SiO₄`, `Ca₅(PO₄)₃(OH,F)`, `P₂O₅`, `K₂O`, `N₂`
- **Use standard parentheses `(...)`** for chemical formulas and explanations—avoid raw square brackets `[...]` or LaTeX carets `^2-` in plain text to ensure seamless, clean rendering in browser HTML without parser issues.

#### Full Frontmatter Example with Chemistry & Comparison Table

```yaml
---
title: "Diatomite Silicon"
imageUrl: "1.webp"
summary: "FCO-certified amorphous biogenic silica granules (SiO₂·nH₂O) releasing bio-available monomeric orthosilicic acid (H₄SiO₄) for plant cell wall reinforcement, anti-lodging defense, and soil moisture retention."
fit:
  - "FCO Certified Quality"
  - "Amorphous Biogenic Silica (SiO₂·nH₂O)"
  - "Soluble Orthosilicic Acid (H₄SiO₄)"
  - "Anti-Lodging Cellular Armor"
  - "High Internal Porosity (65–75%)"
  - "Sustainable Farming"
category: "Base Granules"
tagline: "FCO-certified amorphous biogenic silica granules for cellular armor, lodging prevention, and rhizosphere water conservation."
description: |
  Diatomite Silicon is an FCO-certified mineral fertilizer manufactured from purified natural amorphous diatomaceous earth (biogenic hydrous silicon dioxide, SiO₂·nH₂O). Unlike unreactive crystalline quartz or sand, biogenic diatomite features a microscopic porous frustule architecture that gradually hydrolyzes in soil moisture into bio-absorbable orthosilicic acid (H₄SiO₄).

  Absorbed silicon translocates through xylem sap to leaf and culm epidermis, polymerizing into rigid opal phytoliths and forming a dense silica-cuticle double layer. This mechanical reinforcement deters piercing-sucking pests (stem borers, aphids), prevents fungal haustorium penetration, thickens stem vascular walls to stop crop lodging in heavy-grain cereals, and reduces non-stomatal transpiration under high thermal and water stress.
howToApply:
  - step: "01"
    title: "Direct Soil Basal Dressing"
    detail: "Apply 25–50 kg per acre during field preparation or prior to sowing to establish long-term bioavailable silica reserves."
  - step: "02"
    title: "NPK & Organic Blending"
    detail: "Blend seamlessly with granular Urea, DAP, PROM, or compost to reinforce vegetative structure and nutrient uptake efficiency."
  - step: "03"
    title: "Standing Crop Top-Dressing"
    detail: "Broadcast during early vegetative or tillering stages before stem elongation to maximize culm mechanical hardness."
benefits:
  - title: "FCO-Certified Amorphous Silica Chemistry"
    detail: "High-purity biogenic diatomite providing reactive silica without hazardous crystalline quartz content."
  - title: "Anti-Lodging & Cellular Reinforcement"
    detail: "Induces silicified phytolith deposition along stem vascular bundles to prevent stem breakage in high-yield crops."
  - title: "Biotic Pest & Fungal Defense"
    detail: "Forms an abrasive silica-cuticle barrier that abrades insect mouthparts and restricts fungal haustorium entry."
  - title: "High Rhizosphere Water Retention"
    detail: "Micro-porous frustule matrix absorbs up to 120% its weight in moisture, buffering crops during irrigation delays."
specs:
  - label: "Product Type"
    value: "Diatomite Silicon Granules"
  - label: "Category"
    value: "Base Granules & Soil Conditioners"
  - label: "Silicon Form"
    value: "Amorphous Hydrous Silica (SiO₂·nH₂O)"
  - label: "Bioactive Species"
    value: "Orthosilicic Acid (H₄SiO₄)"
  - label: "Certification"
    value: "FCO Approved (Govt. of India)"
  - label: "Granule Sizing"
    value: "2–4 mm Round Uniform Granules"
  - label: "Crush Strength"
    value: "> 4.0 kg / granule"
  - label: "Moisture Content"
    value: "Maximum 5.0% by weight"
  - label: "Heavy Metals"
    value: "Low (< 10% FCO safety limit)"
  - label: "Application"
    value: "Direct soil application, dry NPK blending, top dressing"
comparison:
  title: "Comparison: Diatomite Amorphous Silicon vs. Crystalline Quartz & Sand Fillers"
  headers:
    feature: "Agronomic & Chemical Metric"
    traditional: "Crystalline Sand / Quartz Fillers"
    ours: "Diatomite Silicon (J K Fertilizers)"
  rows:
    - feature: "Silicon Bio-Availability"
      traditional: "0% plant-available (insoluble crystalline lattice)"
      ours: "High solubility; hydrolyzes directly into H₄SiO₄"
    - feature: "Cellular Armor & Anti-Lodging"
      traditional: "Zero deposition in plant xylem or epidermal tissue"
      ours: "Forms rigid phytoliths and silica-cuticle double layers"
    - feature: "Internal Porosity & Water Storage"
      traditional: "Non-porous solid particles; 0% internal water hold"
      ours: "65–75% internal frustule porosity; retains 120% water"
    - feature: "Granule Hardness & Dust"
      traditional: "Abrasive dust that damages blending machinery"
      ours: "Uniform 2–4 mm granules with >4.0 kg crush strength"
    - feature: "FCO Regulatory Certification"
      traditional: "Unregulated inert mineral sand / clay filler"
      ours: "100% FCO compliant with batch test certification"
---
```

### Adding a New Product

1. Create `src/content/products/<slug>/index.mdx` with the frontmatter fields above (including clean Unicode chemical formulas and product-specific `comparison: { title, headers, rows }`)
2. Drop the cover + gallery images into the same folder
3. Add the product route/link to `src/components/SiteNavbar.tsx`
4. Done - product appears on /products, homepage marquee, mega menu, and sitemap automatically

---

## 9. Vite Config Highlights

- **`@/` alias** -> `src/`
- **MDX Plugins:** `@mdx-js/rollup` configured with `remarkFrontmatter`, `remarkMdxFrontmatter`, and `remarkGfm` (enables GFM tables, autolinks, and strikethrough).
- **Sitemap** auto-generated from product/blog/service slugs (product/service slugs = folder names under `src/content/`)
- **PWA** service worker - caches all assets including images
- **`import.meta.glob('/public/**')`** works - Vite resolves from project root

---

## 10. Content (MDX)

### Blog: `src/content/blog/<slug>/index.mdx`
Frontmatter: `title`, `date`, `dateDisplay`, `excerpt`, `author`, `topic`, `img` (cover **filename** inside the folder - resolved by the loader), `featured`, `tags`

The `BlogPostPage` component renders rich prose components via `@mdx-js/react`:
- **Headings & Typography:** Custom styled `h2`, `h3`, `p`, `ul`, `ol`, `li`, `blockquote`, `code`, and `hr`.
- **Responsive GFM Tables:** `table`, `thead`, `tbody`, `tr`, `th`, and `td` styled into a rounded, horizontal-scrolling card container with alternating row highlights.
- **Dynamic Image Resolution:** `img` tag resolves relative paths (`./inline-1.jpg`, `inline-2.webp`, etc.) dynamically to hashed Vite asset URLs via `getBlogImage(slug, filename)` from `@/lib/content`, rendering inside a styled `<figure>` with `<figcaption>` captions.

#### All 16 Blog Posts:
1. `prom-vs-dap-soil-phosphorus-fixation-guide` - PROM vs DAP: Chemical Mechanisms, Soil Phosphorus Fixation, and Agronomic Economics
2. `from-bentonite-to-minerals` - From Bentonite to Minerals: Pioneering Sustainable Fertilizer Coatings for a Greener Tomorrow
3. `phosphate-rich-organic-manure-prom` - Phosphate Rich Organic Manure (PROM): A Game-Changer for Sustainable Agriculture
4. `mycorrhiza` - The Science of Mycorrhiza: How These Beneficial Fungi Revolutionize Plant Growth
5. `micro-nutrients-role-in-crop-growth` - Less is More: How Micro-Nutrients Play a Macro Role in Crop Growth and Soil Health
6. `the-role-of-organic-fertilizers` - The Role of Organic Fertilizers in Climate-Smart Agriculture
7. `coated-fertilizer-granules` - Understanding Coated Fertilizer Granules: Why Coatings Matter and How They Boost Plant Health
8. `misconceptions-about-organic-fertilizers` - Breaking Myths: Common Misconceptions About Organic Fertilizers and Their Truths
9. `sustainable-solutions-role-of-gypsum-and-other-mineral-coatings` - Sustainable Solutions for Saline and Alkaline Soils: The Role of Gypsum and Other Mineral Coatings
10. `choose-the-right-fertilizer` - How to Choose the Right Fertilizer: A Guide to Organic Fertilizer Types and Their Applications
11. `b2b-supply-non-negotiables` - The 4 Non-Negotiables for Dependable B2B Granule Supply
12. `animal-nutrition-crop-nutrition-link` - The Link Between Animal Nutrition and Crop Nutrition
13. `granular-fertilizer-timing-yield` - Granular Fertilizer Application Timing for Maximum Yield
14. `organic-farming-philosophy-granule-design` - Organic Farming Philosophy Meets Modern Granule Design
15. `quality-systems-for-large-distribution` - Quality Systems for Large Fertilizer Distribution Networks
16. `stronger-base-granule-brand-promise` - Building Brand Trust with Stronger Base Granules

Note: blog cover images and inline assets live within each post's folder (`src/content/blog/<slug>/`). The `content.ts` loader automatically discovers them via `import.meta.glob`.

### Services: `src/content/services/<slug>/index.mdx`
Slugs: `custom-packaging-solutions`, `granule-technology`, `infrastructure-leasing`, `job-work-services`, `warehouse-storage`

Frontmatter: `title`, `concept`, `description`, `image` (cover **filename** inside the folder - resolved by the loader).
Images live in the same folder and are auto-discovered; `getServiceGallery(slug)` in `src/lib/content.ts` returns them (used by `ServiceDetailPage` - no hardcoded image lists).
Body (MDX) is the long-form service content.

### Adding a New Service

1. Create `src/content/services/<slug>/index.mdx` with frontmatter
2. Drop cover + gallery images into the same folder
3. Done - appears on /services and sitemap automatically

---

## 11. SEO & Analytics

- **GA4 ID:** `G-L1BQM1V3E3`
- **Umami Analytics:**
  - Script: `https://umami.altctrlreturn.com/script.js`
  - Website ID: `57ab23b0-35e3-4868-9718-3c17b45138ee`
- **JSON-LD schemas** (`src/data/seoSchemas.ts`):
  - `organizationSchema` - include on every page
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
- **Do NOT** call `e.preventDefault()` before `handleSubmit(e)` - see Section 7

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
- Import company data from `src/data/siteData.ts` - never hardcode phone/email/address
- Reset gallery state (`selectedImageIndex`, `activeImageIndex`) in `useEffect([slug])` on `ProductDetailPage`
- Use standard Unicode subscripts/superscripts (`Ca²⁺`, `SO₄²⁻`, `SiO₂`, `H₄SiO₄`) and parentheses `(...)` for chemical notation in MDX
- Ensure every product has a dedicated, tailored head-to-head comparison table against its specific market alternative
- Keep `public/llms.txt` and `public/products.md` updated whenever product formulations or specs change
- Use `bun` not `npm` for package management
- Run `bun run optimize-images` whenever new WebP/PNG images are added
- Add explicit `width`, `height`, `loading="lazy"`, and `decoding="async"` on all below-the-fold `<img>` tags
- Keep LCP hero images eager with `fetchPriority="high"` and a matching `<link rel="preload">` in `index.html`
- Adhere strictly to the Unslop Copy Guidelines (see Section 17)

### DO NOT
- ❌ Use `product.imageUrl` directly in `<img>` - always use `getProductCoverImage()`
- ❌ Manually list files in `getProductGallery` - just drop images into the folder
- ❌ Call `e.preventDefault()` before Formspree's `handleSubmit(e)`
- ❌ Hardcode company info in page components
- ❌ Use raw `text-xl`/`text-2xl` for content headings - use type utilities
- ❌ Use arbitrary `shadow-[0_...px_rgba(...)]` - use `shadow-card` / `hover:shadow-card-hover`
- ❌ Hand-write eyebrow pill class strings - use `eyebrow` / `eyebrow-dark` / `eyebrow-accent`
- ❌ Add decorative gradient/noise/glow-blob layers, `backdrop-blur` glassmorphism, or `blur-[...]` ambience divs
- ❌ Use relative imports from `src/` - use `@/` alias
- ❌ Run `npm install` - use `bun install`
- ❌ Use raw LaTeX caret syntax (`^2-`) or raw square brackets (`[...]`) in MDX product descriptions
- ❌ Use generic placeholder comparison rows across different products - every product must have tailored comparisons
- ❌ Use `key={imageUrl}` when mapping product images - use `key={idx}` or `key={slug}`
- ❌ Commit uncompressed multi-megabyte images (raw 1080p/4K camera photos) - always optimize down to 15KB–100KB first
- ❌ Insert em dashes (`—` or `--`) in user-facing copy, schemas, or markdown
- ❌ Use AI fluff adjectives (*pivotal, testament, tapestry, delve, leverage, seamless, robust*)

---

## 15. Additional Context

### TypeScript Config (`tsconfig.json`)
- `strict: false`, `noImplicitAny: false` - lenient typing, many components have untyped props
- **`noUnusedLocals: true`, `noUnusedParameters: true`** - these ARE enforced. Clean up unused vars.
- Path alias: `@/` -> `src/`
- Target: ES2020, moduleResolution: bundler

### Public Static Files & Agent Discovery
- `public/.htaccess` - Apache config (SPA fallback + caching headers + Agent Link headers for shared hosting)
- `public/_worker.js` - Cloudflare Pages Worker (Content negotiation, Agent Skills, MCP discovery, A2A discovery, PRM, RFC 8288 link headers)
- `public/_headers` & `vercel.json` - Edge headers for Netlify/Cloudflare/Vercel
- `public/.well-known/agent-card.json` - Agent2Agent (A2A) Agent Card (Linux Foundation A2A Protocol)
- `public/.well-known/mcp/server-card.json` - Model Context Protocol (MCP) Server Card (SEP-1649 / SEP-2127)
- `public/.well-known/agent-skills/index.json` - Agent Skills Discovery Index (RFC v0.2.0)
- `public/.well-known/api-catalog` - API Catalog (RFC 9727 / RFC 9264)
- `public/dns-aid.zone` - DNS for AI Discovery (DNS-AID) SVCB/HTTPS zone records (draft-mozleywilliams-dnsop-dnsaid / RFC 9460)
- `public/rss.xml` - Blog RSS feed, regenerated by `bun run rss`
- `public/llms.txt` - GEO (Generative Engine Optimization) file for AI crawlers
- `public/auth.md` - Agent authentication and identity assertion specification

### No i18n in use
`tKey` fields on nav items (`nav.home`, `nav.about`, etc.) are placeholder fields - there is no i18n library installed. Do not add i18n logic.

### No test suite
No testing framework is configured. Do not reference or add test files.

### No global state management
Only React `useState` / `useEffect`. No Redux, Zustand, Context API for state (HelmetProvider and BrowserRouter are providers, not state managers).

### Git identity
Commits are made as `emergent-agent-e1 <github@emergent.sh>` - this is the AI agent identity.

### Adding new content
| Content type | What to do |
|---|---|
| New blog post | Create `src/content/blog/<slug>/` with `index.mdx` + cover image - auto-discovered; run `bun run optimize-images` & `bun run rss` |
| New service page | Create `src/content/services/<slug>/` with `index.mdx` + images - auto-discovered; run `bun run optimize-images` |
| New product | Create `src/content/products/<slug>/` with `index.mdx` + images - auto-discovered; run `bun run optimize-images` |
| New product/service images | Drop files into the content folder - auto-discovered by `import.meta.glob`, run `bun run optimize-images` |
| Rebuild sitemap | Automatic on `bun run build` |
| Update RSS | Run `bun run rss` after adding blog posts |

---

## 16. Image Optimization & Web Performance Architecture

### Image Compression Standards
All images in the repository must be pre-optimized WebP using the ImageMagick pipeline in `scripts/optimize-images.sh` (`bun run optimize-images`):

| Image Type | Target Resolution | Quality Level | Typical Target Size |
|---|---|---|---|
| **Hero Images (LCP)** | Max `1200px` width | `78` | 80–120 KB |
| **Product Covers & Galleries** | Max `640x800px` | `78` | 20–60 KB |
| **Service & Infrastructure Photos** | Max `900–1000px` width | `75` | 30–80 KB |
| **Blog Post Covers** | Max `1200px` width | `75` | 30–100 KB |
| **Brand Logo (`logo.webp`)** | `240x240px` | `82` | ~12 KB |
| **OpenGraph Social Card (`og-image.webp`)** | `1200x630px` | `80` | ~130 KB |

### Core Web Vitals & Loading Strategy
1. **LCP Optimization (Largest Contentful Paint < 2.5s)**:
   - Homepage hero image is preloaded in `index.html`:
     ```html
     <link rel="preload" as="image" href="/images/hero.webp" fetchpriority="high" />
     ```
   - Rendered with `eager` loading, `fetchPriority="high"`, and `decoding="async"`.
2. **CLS Elimination (Cumulative Layout Shift < 0.1)**:
   - All `<img>` elements declare explicit `width` and `height` attributes matching their aspect ratios.
3. **Below-the-fold Assets**:
   - All cards, galleries, tickers, and footer assets use `loading="lazy"` and `decoding="async"`.

---

## 17. Content Writing, Unslop & SEO Guidelines

### Zero Em Dashes Policy
- Do not use em dashes (`—` or `--`) anywhere in the website copy, schema titles, meta descriptions, or MDX files. Use colons, commas, periods, parentheses, or rewrite the sentence with active syntax.

### Banned AI Jargon & Filler
- Never use generic AI filler words:
  *pivotal, testament, tapestry, enhance, foster, delve, utilize, leverage, state-of-the-art, seamless, groundbreaking, robust, vital, game-changer, beacon, realm, beacon of excellence, unlock, delve into, spearhead, harness.*
- Write plain, direct, expert B2B copy targeted at fertilizer procurement managers, blenders, and institutional agricultural buyers.

### Concrete Operational Facts
Always ground product claims in verified company operational specs:
- **Manufacturing Capacity:** 700 MT/day processing capacity at the Vasad plant (Anand, Gujarat).
- **Compliance:** Full Fertilizer Control Order (FCO 1985) certification on organic manures, PROM, and PDM.
- **Formulation:** Mineral base granules engineered from gypsum, silica, dolomite, and secondary minerals (avoiding inert clay / high-heavy-metal bentonite carriers).
- **Testing:** In-house laboratory testing for bulk density, moisture, crushing hardness, and heavy metals (< 10%).

### Chemistry, Bio-Inoculants & Agronomic Rigor
Ground all fertilizer product descriptions and technical documentation in verified chemical and agronomic mechanisms:
- **Rock Phosphate / PROM:** Apatite $\text{Ca}_5(\text{PO}_4)_3(\text{OH,F})$ co-composting; low-molecular-weight organic acids (citric, oxalic, malic) chelating $\text{Ca}^{2+}$ to prevent phosphate precipitation in alkaline soils ($pH > 7.2$).
- **Bio-Potash / PDM:** Sugarcane distillery spent wash organic potassium; chloride-safe ($< 2\%$ Cl⁻ vs $47\%$ in synthetic MOP); activating pyruvate kinase/ATPase enzymes for phloem carbohydrate transport and fruit Brix.
- **Diatomite & Silica:** Natural amorphous biogenic silica ($\text{SiO}_2\cdot n\text{H}_2\text{O}$) hydrolyzing into monosilicic/orthosilicic acid ($\text{H}_4\text{SiO}_4$); Lsi1/Lsi2 root channel absorption; polymerization into opal phytoliths for anti-lodging and silica-cuticle pest armor.
- **Biofertilizers & Consortia:** Guaranteed viable endo-mycorrhizal spores (min 100 IP/gm *Glomus intraradices / Rhizophagus irregularis*), glomalin secretion, and Bio-NPK microbial counts ($> 10^7$ CFU/g for *Azotobacter, Bacillus, Frateuria*).
- **Secondary & Trace Elements:** Homogeneous core fortification delivering $\text{Ca}^{2+}, \text{Mg}^{2+}, \text{SO}_4^{2-}, \text{Zn}^{2+}, \text{BO}_3^{3-}, \text{Fe}^{2+}, \text{Mn}^{2+}$ to prevent ballistic segregation in dry bulk blends.

### AI Search Optimization (GEO / LLMO)
- Maintain `public/llms.txt` and `public/products.md` with structured, factual, citable summaries of all 16 products, chemical formulas, and FCO parameters.
- Provide clear, direct answers formatted for extraction by LLM answer engines (ChatGPT, Perplexity, Claude, Gemini, Google AI Overviews).



