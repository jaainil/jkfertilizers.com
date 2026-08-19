import { useState, useMemo, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Search, X, Sparkles } from "lucide-react";
import Fuse from "fuse.js";
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
  "FCO-Approved Products certified under Fertilizer Control Order",
  "100% Organic and mineral-based formulations",
  "Mycorrhiza and bio-NPK coated granules for root development",
  "Customized mineral base and coated carrier granules",
];

const images = {
  hero: "/images/about-4.webp",
  factory: "/images/about-2.webp",
  granules: "/images/about-3.webp",
  soil: "/images/about-5.webp",
  lab: "/images/about-1.webp",
  partnership: "/images/about-5.webp",
};

const fuseInstance = new Fuse(products, {
  includeScore: true,
  threshold: 0.35,
  ignoreLocation: true,
  keys: [
    { name: "title", weight: 0.35 },
    { name: "tagline", weight: 0.15 },
    { name: "category", weight: 0.15 },
    { name: "summary", weight: 0.1 },
    { name: "fit", weight: 0.1 },
    { name: "benefits.title", weight: 0.05 },
    { name: "benefits.detail", weight: 0.05 },
    { name: "specs.label", weight: 0.025 },
    { name: "specs.value", weight: 0.025 },
  ],
});

export const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [selectedCategory, setSelectedCategory] = useState("All");

  const introReveal = useScrollReveal();
  const listReveal = useScrollReveal();
  const detailsReveal = useScrollReveal();

  // 1. Text search matches
  const searchMatches = useMemo(() => {
    if (!query.trim()) return products;
    return fuseInstance.search(query.trim()).map((r) => r.item);
  }, [query]);

  // 2. Dynamically compute available categories & counts (only categories with > 0 products)
  const { availableCategories, categoryCounts } = useMemo(() => {
    const counts: Record<string, number> = { All: searchMatches.length };
    const categoriesSet = new Set<string>();

    searchMatches.forEach((p) => {
      if (p.category) {
        counts[p.category] = (counts[p.category] || 0) + 1;
        categoriesSet.add(p.category);
      }
    });

    const categoryList = ["All", ...Array.from(categoriesSet)];
    return { availableCategories: categoryList, categoryCounts: counts };
  }, [searchMatches]);

  // 3. Reset selected category if it no longer has matches in current search
  useEffect(() => {
    if (selectedCategory !== "All" && !availableCategories.includes(selectedCategory)) {
      setSelectedCategory("All");
    }
  }, [availableCategories, selectedCategory]);

  // 4. Filtered products list
  const filteredProducts = useMemo(() => {
    if (selectedCategory === "All") return searchMatches;
    return searchMatches.filter((p) => p.category === selectedCategory);
  }, [searchMatches, selectedCategory]);

  const handleSearchChange = (val: string) => {
    if (val.trim()) {
      setSearchParams({ q: val }, { replace: true });
    } else {
      setSearchParams({}, { replace: true });
    }
  };

  const handleClearAll = () => {
    setSearchParams({}, { replace: true });
    setSelectedCategory("All");
  };

  return (
  <>
    <SEOHead
      title={query ? `Search: ${query} | Products | J K Fertilizers` : "Organic Fertilizers & Granules Catalog | J K Fertilizers"}
      description="Browse J K Fertilizers' catalog: Organic Manure, PDM, PROM, Mycorrhiza Granules, and custom base granules. FCO approved bulk supply from Gujarat."
      canonical={query ? `/products?q=${encodeURIComponent(query)}` : "/products"}
      ogImage="/images/about-4.webp"
      keywords="organic fertilizer products gujarat, organic manure, PDM fertilizer, PROM fertilizer, mycorrhiza granules, base granules, coated granules, J K Fertilizers products, FCO approved fertilizer"
      schema={[organizationSchema, productsPageSchema, productsItemListSchema]}
    />
    <PageHero
      eyebrow="Products"
      title="FCO-Approved Organic Fertilizers & Granules"
      description="Organic manures, bio-fertilizers, and mineral carrier granules engineered for soil carbon building and balanced crop nutrition."
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
          description="Every product is manufactured to strict FCO quality parameters in our Vasad, Anand processing facility."
        />

        {/* Unified Filter & Search Toolbar */}
        <div className="mb-10 rounded-2xl sm:rounded-3xl border border-border bg-surface-card p-3 sm:p-4 shadow-card">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Horizontal Category Tabs with Count Badges */}
            {availableCategories.length > 1 && (
              <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 lg:pb-0 scrollbar-none flex-nowrap">
                {availableCategories.map((cat) => {
                  const isSelected = selectedCategory === cat;
                  const count = categoryCounts[cat] ?? 0;
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setSelectedCategory(cat)}
                      className={`inline-flex shrink-0 items-center gap-2 rounded-xl sm:rounded-full px-3.5 py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer whitespace-nowrap ${
                        isSelected
                          ? "bg-primary text-white shadow-xs"
                          : "bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground"
                      }`}
                    >
                      <span>{cat}</span>
                      <span
                        className={`inline-flex h-5 min-w-[20px] items-center justify-center rounded-full px-1.5 text-[10px] font-bold ${
                          isSelected
                            ? "bg-white/20 text-white"
                            : "bg-background text-muted-foreground"
                        }`}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}

            {/* Search Input Box */}
            <div className="relative w-full lg:w-80 shrink-0">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
              <input
                type="text"
                value={query}
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder="Search products (e.g. PROM, Silica)..."
                className="w-full rounded-xl sm:rounded-full border border-border bg-background py-2 pl-10 pr-9 text-xs sm:text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 shadow-xs transition-colors"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => handleSearchChange("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
                  aria-label="Clear search"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Active Filter Bar (shown if filtered) */}
          {(query || selectedCategory !== "All") && (
            <div className="mt-3 pt-3 border-t border-border flex items-center justify-between gap-3 text-xs text-muted-foreground px-1">
              <span>
                Found <strong className="text-foreground font-semibold">{filteredProducts.length}</strong> product{filteredProducts.length === 1 ? "" : "s"}
                {selectedCategory !== "All" && <span> in <strong className="text-foreground font-medium">{selectedCategory}</strong></span>}
                {query && <span> matching "<strong className="text-foreground font-medium">{query}</strong>"</span>}
              </span>
              <button
                type="button"
                onClick={handleClearAll}
                className="text-primary font-semibold hover:underline cursor-pointer inline-flex items-center gap-1"
              >
                Reset all
              </button>
            </div>
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
        <div className="text-center py-16 rounded-3xl border border-border bg-surface-card max-w-xl mx-auto p-8 shadow-card">
          <p className="type-card-title font-semibold text-foreground">No matching products found</p>
          <p className="mt-2 type-body-sm text-muted-foreground">
            We couldn't find any products matching {query ? `"${query}"` : ""} {selectedCategory !== "All" ? `in category "${selectedCategory}"` : ""}. Try adjusting your search query.
          </p>
          <Button
            variant="outline"
            className="mt-6 rounded-full border-primary text-primary hover:bg-primary hover:text-white"
            onClick={handleClearAll}
          >
            View all 16 products
          </Button>
        </div>
      )}
    </section>

    <section className="bg-muted py-20 lg:py-28">
      <div
        ref={detailsReveal.ref}
        className={`mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8 lg:items-center reveal ${detailsReveal.isVisible ? 'visible' : ''}`}
      >
        <ImagePanel src={images.soil} alt="J K Fertilizers laboratory and quality testing" testId="products-highlight-image-panel" className="aspect-[4/4.6] min-h-[360px]" />
        <div className="space-y-5">
          <span className="eyebrow">Quality Controls</span>
          <h2 className="font-heading type-section-h2 font-semibold tracking-tight text-foreground">Agricultural Inputs Manufactured to FCO Specifications</h2>
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
