import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/PageHero";
import { ImagePanel } from "@/components/ImagePanel";
import { SectionIntro } from "@/components/SectionIntro";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/data/products";
import { SEOHead } from "@/components/SEOHead";
import { organizationSchema, productsPageSchema, productsItemListSchema } from "@/data/seoSchemas";

const company = {
  phoneDisplay: "+91 98250 45894",
  phoneRaw: "+919825045894",
};

const productHighlights = [
  "Customized 'Recipe Granules' - superior alternative to standard bentonite",
  "Unique nutrient profiles using Gypsum, Dolomite, organic compost, and mineral blends",
  "Supports diverse crop types and agricultural requirements",
  "Every product manufactured under ISO 9001:2015 certified processes",
];

const images = {
  hero: "/images/hero.jpg",
  factory: "/images/factory.jpg",
  granules: "/images/granules.jpg",
  soil: "/images/soil.jpg",
  lab: "/images/lab.jpg",
  partnership: "/images/partnership.jpg",
};

import { useScrollReveal, staggerDelay } from "@/hooks/useScrollReveal";

export const ProductsPage = () => {
  const introReveal = useScrollReveal();
  const listReveal = useScrollReveal();
  const detailsReveal = useScrollReveal();

  return (
  <>
    <SEOHead
      title="Organic Fertilizer Base Granules — Mineral, Bio, Organic Products | Gujarat India"
      description="Shop Adit Biorganic's complete range of B2B organic fertilizer base granules: Mineral, Bio-Fertilizer, Bio-Stimulant, Mix Micro, Bio-Pesticide, Pesticide, Base & Organic Granules. ISO 9001:2015 certified. Manufactured in Gujarat, India. Bulk supply & export."
      canonical="/products"
      ogImage="/images/products-overview.png"
      keywords="organic fertilizer granules india, mineral base granules manufacturer, bio fertilizer base granules, bio stimulant granules, mix micro base granules, bio pesticide base granules, organic base granules gujarat, fertilizer granule manufacturer india, b2b fertilizer products"
      schema={[organizationSchema, productsPageSchema, productsItemListSchema]}
    />
    <PageHero
      eyebrow="Products"
      title="Premium Organic Fertilizer Products"
      description="High-quality granular fertilizers engineered for consistent performance and sustainable agriculture."
      imageSrc={images.granules}
      imageAlt="Granular fertilizer close-up"
      badges={["Organic bases", "Mineral bases", "Customizable recipes"]}
      primaryCta={
        <Button asChild className="h-12 rounded-full bg-primary px-6 text-white hover:bg-primary/90">
          <Link to="/contact">Request a product discussion</Link>
        </Button>
      }
      secondaryCta={
        <Button asChild variant="outline" className="h-12 rounded-full border-primary px-6 text-primary hover:bg-primary hover:text-white">
          <a href={`tel:${company.phoneRaw}`}>Call our team</a>
        </Button>
      }
    />

    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div 
        ref={introReveal.ref}
        className={`reveal ${introReveal.isVisible ? 'visible' : ''}`}
      >
        <SectionIntro
          eyebrow="Catalog overview"
          title="Core Product Families"
          description="Eight specialized granule lines — each engineered for a distinct agronomic purpose — available for B2B supply and contract manufacturing across India."
        />
      </div>
      <div 
        ref={listReveal.ref}
        className={`grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3 reveal-scale ${listReveal.isVisible ? 'visible' : ''}`}
      >
        {products.map((product, i) => (
          <div key={product.slug} {...staggerDelay(i, 100)}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>

    <section className="bg-muted py-20 lg:py-28 section-wave">
      <div 
        ref={detailsReveal.ref}
        className={`mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8 lg:items-center reveal ${detailsReveal.isVisible ? 'visible' : ''}`}
      >
        <ImagePanel src={images.soil} alt="Healthy soil and organic performance" testId="products-highlight-image-panel" className="aspect-[4/4.6] min-h-[360px]" />
        <div className="space-y-5">
          <div className="inline-flex rounded-full border border-border bg-surface-overlay px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-primary">
            What Can Be Customized
          </div>
          <h2 className="font-heading text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">Recipe Granules Built Around Partner Requirements</h2>
          <div className="grid gap-4">
          {productHighlights.map((item, i) => (
            <div key={item.slice(0, 20)} {...staggerDelay(i, 100)} className="flex items-start gap-3 rounded-[24px] border border-border bg-surface-card p-5">
              <svg className="mt-1 h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <p className="text-sm leading-7 text-muted-foreground">{item}</p>
            </div>
          ))}
          </div>
        </div>
      </div>
    </section>
  </>
  );
};
