# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Vite + React 19 + React Router 7 + MDX (content as code, frontmatter as source of truth) + Tailwind CSS 4 + VitePWA, existing codebase — delegated deployment on Vercel (vercel.json present)

## Users

**Primary audiences are both equally important:**

1. **B2B buyers — fertilizer brands, blenders, distributors, institutional procurement and agribusiness partners** — evaluating bulk supply, toll / job-work manufacturing, private-label packaging, granule technology, and infrastructure leasing. Their job is to verify FCO compliance, capacity, quality control, customization options, MOQ/pricing tiers, and lead times, then request a quotation or site visit.
2. **Progressive farmers, agronomists, and agro-consultants** — researching specific products (Organic Manure, PROM, PDM, Mycorrhiza granules), specifications, benefits, and application guidance for their crop and soil context. Their job is to understand which product and dosage fits their need and to contact sales for samples or local availability.

Secondary audiences: general visitors seeking company history, commitments, and blog insights on sustainable agriculture.

## Product Purpose

jkfertilizers.com is the official web presence for J K Fertilizers, an organic fertilizer manufacturer based in Vasad, Anand, Gujarat (operating since 2006). It makes it possible for buyers and growers to discover, evaluate, and inquire about FCO-approved organic fertilizers, base granules, and custom coated granules — without a phone call as the only channel.

Success means a qualified visitor can (a) quickly understand what is manufactured and at what scale, (b) compare products by composition and use-case, (c) assess credibility (FCO compliance, lab testing, capacity, history), and (d) submit a B2B inquiry or contact sales with minimal friction. For the business, success is inbound bulk and contract-manufacturing leads generated through organic search and direct referral.

## Positioning

The meaningfully different mechanism is **integrated granulation manufacturing at scale in Western India**: a single Vasad complex with ~700 MT/day processing capacity, rotary drum granulation lines, automated bagging, 100,000+ sq. ft. covered warehousing, and in-house batch QC (moisture, crushing strength, nutrient assay) — producing FCO-approved Organic Manure, PROM, PDM, and Mycorrhiza biofertilizer granules plus custom mineral carrier cores and bio-inoculant coatings.

Competitors may sell organic inputs; few offer the same combination of *FCO-certified product range + custom formulation/coating + private-label packaging + toll manufacturing and infrastructure leasing* from one plant, operating continuously since 2006 under founder Akash Dadhania. The promise is "Tested specifications, consistent granules, dependable bulk delivery."

## Operating Context

- **Physical plant:** NH. 48, Opp. IOC Petrol Pump, B/H Adas Bus Stop, Vasad, Dist. Anand, Gujarat 388305, India (22.4475, 72.8573) — referenced throughout SEO/local schema.
- **Commercial workflows:** bulk ordering (1 kg–50 kg bags, 1,000 kg jumbo bags), volume pricing tiers and MOQ, quotation requests (product + tonnage + email), sample requests, and toll-manufacturing discussions. Pricing details served as machine-readable `pricing.md` and via `get_pricing_tiers` tool intent.
- **Content workflows:** products and blog posts authored as MDX with frontmatter in `src/content/products/*/index.mdx` and `src/content/blogs`; gallery images auto-discovered from product folders; sitemap, RSS, robots, markdown-llms, and prerender generated at build (`scripts/generate-*.mjs`, `scripts/prerender.mjs`).
- **Discovery surfaces:** organic search (extensive per-page SEO, JSON-LD Organization/LocalBusiness/WebSite schemas, geo and Dublin Core meta), social previews (OG/Twitter), PWA installability, and agent discoverability (`llms.txt`, sitemap.xml, `.well-known/agent-skills`, MCP/A2A cards, WebMCP tool registrations).
- **User journeys:** Home → Products/Services → Product/Service Detail → Inquiry/Contact; Blog → Article; About/History/Commitment → credibility proof. All routes are client-side (BrowserRouter) with GA4 pageview tracking and scroll-reveal interactions.

## Capabilities and Constraints

**Confirmed capabilities:**
- Product catalog with MDX-driven detail pages, spec tables, benefits, how-to-apply steps, comparison tables, gallery, and SEO head per product.
- Services catalog (Granule Technology, Infrastructure Leasing, Custom Packaging Solutions, Job Work Services, Warehouse & Storage) with detail pages.
- Blog with MDX articles, listing and post views.
- Static pages: About, History, Portfolio, Commitment, Privacy, Return/Refund Policy, Contact, 404.
- Inquiry flow via `@formspree/react` (`InquiryForm`) with direct phone (`tel:+919825045894`) and email (`info@jkfertilizers.com`, `sales@jkfertilizers.com`) fallbacks; alt phones +919825045892 / +919825045891 on record.
- Search headroom: client-side Fuse.js product search and WebMCP `search_products` / `get_product_details` intents.
- PWA (autoUpdate), image optimization, prerendered HTML, GA4 + Umami analytics.

**Constraints and terminology:**
- Product claims must remain FCO-compliant; no invented certifications, test results, or customer names beyond what is in `src/content` and `src/data/products.ts:1`.
- Chemistry/material terminology is load-bearing (PROM = Phosphate-Rich Organic Manure, PDM = Potash Derived from Molasses, Mycorrhiza biofertilizer/Bio NPK, base vs. coated base granules, drum granulation, bio-inoculants, humic acids, micronutrients).
- Existing site copy is incumbent authority for any refinement — do not replace factual copy or add pricing/testimonials without user confirmation.

**Explicitly undecided:** future e-commerce checkout vs. inquiry-only flow; additional language localization beyond `en-IN/gu-IN/hi-IN` schema declarations; whether `pricing.md` tiers should become interactive UI.

## Brand Commitments

- **Name:** J K Fertilizers (alt: JK Fertilizers, JKF, J K Fertilizers Pvt Ltd).
- **Taglines in use:** "Organic, Naturally", "Manufacturers of Organic Fertilizers", "High-Quality Granules for Resilient Soils", and homepage hero "Organic Fertilizer & Granule Manufacturer in Gujarat".
- **Visual commitments carried from code (not to be contradicted):** deep forest green `#163D26` / `#2D7A4A` primary, warm amber/gold `#F59E0B` accent, warm cream neutrals (`#F9F7F2`, `#FEFDF8`), Outfit for headings, Manrope for body, Playfair Display for accent quotes; existing logo `logo.webp` and OG image `og-image.webp`.
- **Voice:** factual, specification-led, B2B-credible with an agronomic/organic sustainability register; avoids synthetic/chemical framing.
- **Founder attribution:** Mr. Akash Dadhania, Founder & Director (consistent across index.html JSON-LD and siteData).
- **Legal footprint:** © 2026 J K Fertilizers, classification Business/Agriculture/Organic Fertilizer Manufacturing.

## Evidence on Hand

- **Real codebase evidence:** 14 routes in `src/App.tsx:46`, product model in `src/data/products.ts:46`, site constants in `src/data/siteData.ts:1`, homepage sections in `src/components/HomePage.tsx:206`, per-page SEO in `src/components/SEOHead.tsx` and `src/data/seoSchemas.ts`, MDX content under `src/content/products` and `src/content/blogs`, generated artifacts (`sitemap.xml`, `rss.xml`, `llms.txt`, `pricing.md`, `.well-known/*`), and analytics IDs (GA4 `G-L1BQM1V3E3`, Umami `57ab23b0-35e3-4868-9718-3c17b45138ee`).
- **Testimonial copy present in HomePage:** three quotes (Dr. Arvind Patel, Rajeshwar Sharma, Mukeshbhai Desai) — treat as on-page claims, not independently verified case studies.
- **Images:** `public/images/*` and product-folder galleries; `logo.webp` and `og-image.webp` at root.
- **Absences that must not be fabricated:** no verified third-party reviews/ratings store, no published MOQ/price sheet beyond `pricing.md` intent, no lab certificates or audit PDFs linked in the live site; introduction of any such proof requires a real source file or user-provided asset.

## Product Principles

1. **Specification over sloganeering** — every product and service claim is tied to a testable spec (FCO, assay, crushing strength, coating) rather than vague benefits.
2. **One plant, many outputs** — the site explains how a single manufacturing complex serves multiple outputs (own brand, private label, toll manufacturing, infrastructure lease) without fragmenting the story.
3. **Inbound efficiency** — reduce the distance from "is this credible and available at my tonnage?" to a submitted inquiry; search, structured data, and agent discoverability are part of the product, not afterthoughts.
4. **Soil-first credibility** — sustainable soil health (organic carbon, microbial life, water retention) frames product benefits, not just yield.
5. **Content as inventory** — MDX frontmatter and folder-colocated galleries are the source of truth; adding a product is adding a folder, not editing plumbing.

## Accessibility & Inclusion

- No product-specific accessibility mandate was established beyond general web expectations. The site is content/informational with forms; future work should preserve keyboard navigation, focus visibility, sufficient contrast (cream-on-green / amber-on-slate combinations need checking), and respectful use of `prefers-reduced-motion` (already handled in `src/index.css:536`). Mobile web remains the dominant agrarian access context — responsive fidelity is load-bearing.
