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
  phoneDisplay: "9825045894",
  phoneRaw: "+919825045894",
};

const productHighlights = [
  "FCO Approved Products — certified under Fertilizer Control Order",
  "100% Organic — eco-friendly, chemical-free fertilizers",
  "Mycorrhiza Coated Granules — advanced root health solutions",
  "Customized Base & Coated Granules for specific crop needs",
];

const images = {
  hero: "/images/about-4.jpg",
  factory: "/images/about-2.jpg",
  granules: "/images/about-3.jpg",
  soil: "/images/about-5.jpg",
  lab: "/images/about-1.jpg",
  partnership: "/images/about-5.jpg",
};

import { useScrollReveal, staggerDelay } from "@/hooks/useScrollReveal";

export const ProductsPage = () => {
  const introReveal = useScrollReveal();
  const listReveal = useScrollReveal();
  const detailsReveal = useScrollReveal();

  return (
  <>
    <SEOHead
      title="Products — J K Fertilizers | Organic Manure, PDM, PROM, Base & Coated Granules | Gujarat"
      description="Browse J K Fertilizers' complete range: Organic Manure, PDM (Potash Derived Molasses), PROM (Phosphate Rich Organic Manure), Mycorrhiza Granules, Customized Base & Coated Granules, and more. FCO approved. Anand, Gujarat."
      canonical="/products"
      ogImage="/images/about-4.jpg"
      keywords="organic fertilizer products gujarat, organic manure, PDM fertilizer, PROM fertilizer, mycorrhiza granules, base granules, coated granules, J K Fertilizers products, FCO approved fertilizer"
      schema={[organizationSchema, productsPageSchema, productsItemListSchema]}
    />
    <PageHero
      eyebrow="Products"
      title="Premium Organic Fertilizer Products"
      description="High-quality organic fertilizers, base granules, and coated granules engineered for sustainable agriculture and superior crop yields."
      imageSrc={images.hero}
      imageAlt="J K Fertilizers products"
      badges={["FCO Approved", "100% Organic", "Since 2006"]}
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
          title="Complete Product Range"
          description="From organic manure to advanced coated granules — every product is manufactured with quality and sustainability at its core."
        />
      </div>
      <div
        ref={listReveal.ref}
        className={`grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3 reveal-scale ${listReveal.isVisible ? 'visible' : ''}`}
      >
        {products.map((product, i) => (
          <div key={product.slug} {...staggerDelay(i, 100)} className="h-full flex flex-col">
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
        <ImagePanel src={images.soil} alt="J K Fertilizers — quality products" testId="products-highlight-image-panel" className="aspect-[4/4.6] min-h-[360px]" />
        <div className="space-y-5">
          <div className="inline-flex rounded-full border border-border bg-surface-overlay px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-primary">
            Quality You Can Rely On
          </div>
          <h2 className="font-heading text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">Top-Rated High-Demand Agricultural Products from J K Fertilizer</h2>
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
