import { useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/PageHero";
import { ImagePanel } from "@/components/ImagePanel";
import { SectionIntro } from "@/components/SectionIntro";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/data/products";
import { SEOHead } from "@/components/SEOHead";
import { organizationSchema, productsPageSchema, productsItemListSchema } from "@/data/seoSchemas";
import { useScrollReveal, staggerDelay } from "@/hooks/useScrollReveal";

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
  hero: "/images/about-4.webp",
  factory: "/images/about-2.webp",
  granules: "/images/about-3.webp",
  soil: "/images/about-5.webp",
  lab: "/images/about-1.webp",
  partnership: "/images/about-5.webp",
};

export const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  const introReveal = useScrollReveal();
  const listReveal = useScrollReveal();
  const detailsReveal = useScrollReveal();

  const filteredProducts = useMemo(() => {
    if (!query.trim()) return products;
    const lower = query.toLowerCase().trim();
    return products.filter(
      (p) =>
        p.title.toLowerCase().includes(lower) ||
        p.category.toLowerCase().includes(lower) ||
        p.summary.toLowerCase().includes(lower) ||
        p.benefits.some((b) => b.toLowerCase().includes(lower))
    );
  }, [query]);

  return (
  <>
    <SEOHead
      title={query ? `Search: ${query} — Products | J K Fertilizers` : "Organic Fertilizers & Granules Catalog | J K Fertilizers"}
      description="Browse J K Fertilizers' complete range: Organic Manure, PDM (Potash Derived Molasses), PROM (Phosphate Rich Organic Manure), Mycorrhiza Granules, Customized Base & Coated Granules. FCO approved."
      canonical={query ? `/products?q=${encodeURIComponent(query)}` : "/products"}
      ogImage="/images/about-4.webp"
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

    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div
        ref={introReveal.ref}
        className={`reveal ${introReveal.isVisible ? 'visible' : ''}`}
      >
        <SectionIntro
          eyebrow="Catalog overview"
          title="Complete Product Range"
          description="From organic manure to advanced coated granules — every product is manufactured with quality and sustainability at its core."
        />

        {/* Search Bar for sitelinks & user filtering */}
        <div className="mt-8 mb-10 max-w-md mx-auto relative">
          <div className="relative flex items-center">
            <Search className="absolute left-3.5 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              value={query}
              onChange={(e) => {
                const val = e.target.value;
                if (val) setSearchParams({ q: val });
                else setSearchParams({});
              }}
              placeholder="Search products (e.g., PROM, Mycorrhiza, Manure)..."
              className="w-full rounded-full border border-border bg-background py-2.5 pl-10 pr-10 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary shadow-xs"
            />
            {query && (
              <button
                type="button"
                onClick={() => setSearchParams({})}
                className="absolute right-3.5 p-0.5 text-muted-foreground hover:text-foreground"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          {query && (
            <p className="mt-2 text-center text-xs text-muted-foreground">
              Showing {filteredProducts.length} result{filteredProducts.length === 1 ? "" : "s"} for "{query}"
            </p>
          )}
        </div>
      </div>
      <div
        ref={listReveal.ref}
        className={`grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3 reveal-scale ${listReveal.isVisible ? 'visible' : ''}`}
      >
        {filteredProducts.map((product, i) => (
          <div key={product.slug} {...staggerDelay(i)} className="h-full flex flex-col">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No products found matching "{query}".</p>
          <Button
            variant="outline"
            className="mt-4 rounded-full"
            onClick={() => setSearchParams({})}
          >
            View all products
          </Button>
        </div>
      )}
    </section>

    <section className="bg-muted py-20 lg:py-28">
      <div
        ref={detailsReveal.ref}
        className={`mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8 lg:items-center reveal ${detailsReveal.isVisible ? 'visible' : ''}`}
      >
        <ImagePanel src={images.soil} alt="J K Fertilizers — quality products" testId="products-highlight-image-panel" className="aspect-[4/4.6] min-h-[360px]" />
        <div className="space-y-5">
          <span className="eyebrow">Quality You Can Rely On</span>
          <h2 className="font-heading type-section-h2 font-semibold tracking-tight text-foreground">Top-Rated High-Demand Agricultural Products from J K Fertilizers</h2>
          <div className="grid gap-4">
          {productHighlights.map((item, i) => (
            <div key={item.slice(0, 20)} {...staggerDelay(i)} className="flex items-start gap-3 rounded-2xl border border-border bg-surface-card p-5">
              <svg className="mt-1 h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <p className="type-body-sm text-muted-foreground">{item}</p>
            </div>
          ))}
          </div>
        </div>
      </div>
    </section>
  </>
  );
};
