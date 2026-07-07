import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, CheckCircle2, ChevronRight, MoveRight, Phone, X, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { getProductBySlug, getRelatedProducts, getProductGallery } from "@/data/products";
import { SEOHead } from "@/components/SEOHead";
import { organizationSchema, buildProductSchema, buildProductFaqSchema, buildProductHowToSchema, breadcrumbSchema } from "@/data/seoSchemas";

const company = {
  phoneDisplay: "9825045894",
  phoneRaw: "+919825045894",
  emails: ["info@jkfertilizers.com", "sales@jkfertilizers.com"],
};

export const ProductDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const product = getProductBySlug(slug);
  const related = getRelatedProducts(slug).slice(0, 3);
  const gallery = getProductGallery(slug || "");

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    if (!product) {
      navigate("/products", { replace: true });
    }
  }, [product, navigate]);

  if (!product) return null;

  const allImages = [product.imageUrl, ...(gallery || [])];

  return (
    <>
      <SEOHead
        title={`${product.title} — B2B Organic Fertilizer Granules | J K Fertilizers Gujarat`}
        description={`Buy ${product.title} in bulk from J K Fertilizers — FCO approved ${product.category} fertilizer manufacturer in Anand, Gujarat, India. ${product.summary} Bulk supply available.`}
        canonical={`/products/${product.slug}`}
        ogImage={product.imageUrl}
        ogType="product"
        keywords={`${product.title}, ${product.title} manufacturer india, ${product.title} gujarat, ${product.category} fertilizer granules manufacturer, organic fertilizer manufacturer india, b2b fertilizer manufacturer gujarat, buy ${product.title} bulk, J K Fertilizers`}
        product={{
          availability: "in stock",
          currency: "INR",
        }}
        schema={[
          organizationSchema,
          buildProductSchema(product),
          buildProductFaqSchema(product),
          buildProductHowToSchema(product),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Products", path: "/products" },
            { name: product.title, path: `/products/${product.slug}` },
          ]),
        ].filter(Boolean)}
      />
      {/* Breadcrumb */}
      <div className="border-b border-border bg-muted/60">
        <div className="mx-auto flex max-w-7xl items-center gap-2 px-4 py-3 text-sm text-muted-foreground sm:px-6 lg:px-8">
          <Link to="/" className="transition hover:text-foreground">Home</Link>
          <ChevronRight className="h-4 w-4 shrink-0" />
          <Link to="/products" className="transition hover:text-foreground">Products</Link>
          <ChevronRight className="h-4 w-4 shrink-0" />
          <span className="text-foreground font-medium">{product.title}</span>
        </div>
      </div>

      {/* Hero section */}
      <section className="bg-secondary text-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:grid lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-8 lg:py-24">
          {/* Left: text */}
          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <Link
                to="/products"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/80 transition hover:bg-white/20"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                All Products
              </Link>
              <span className="inline-flex rounded-full border border-accent/40 bg-accent/15 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                {product.category}
              </span>
            </div>

            <div>
              <h1 className="font-heading text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
                {product.title}
              </h1>
              <p className="mt-4 text-lg font-medium text-accent">{product.tagline}</p>
            </div>

            <p className="text-base leading-8 text-white/75">{product.summary}</p>

            <div className="flex flex-wrap gap-2">
              {product.fit.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-medium text-white/85"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-4 pt-2">
              <Button asChild className="h-12 rounded-full bg-accent px-6 text-secondary font-semibold hover:bg-accent/90">
                <Link to="/contact">Request a Quote</Link>
              </Button>
              <Button asChild variant="outline" className="h-12 rounded-full border-white/30 px-6 text-white hover:bg-white/10">
                <a href={`tel:${company.phoneRaw}`}>
                  <Phone className="mr-2 h-4 w-4" />
                  {company.phoneDisplay}
                </a>
              </Button>
            </div>
          </div>

          {/* Right: Interactive Gallery */}
          <div className="mt-12 lg:mt-0 space-y-4">
            <div className="relative overflow-hidden rounded-3xl border border-white/10 shadow-[0_32px_80px_rgba(0,0,0,0.4)] bg-neutral-900 aspect-[4/3]">
              <img
                src={allImages[selectedImageIndex]}
                alt={product.title}
                className="h-full w-full object-cover transition-all duration-300"
              />
              
              {/* Zoom Button "+" */}
              <button
                onClick={() => {
                  setActiveImageIndex(selectedImageIndex);
                  setLightboxOpen(true);
                }}
                className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white hover:bg-black/60 hover:scale-105 active:scale-95 transition-all duration-200 backdrop-blur-xs"
                aria-label="Zoom image"
              >
                <span className="text-2xl font-light leading-none">+</span>
              </button>

              <div className="absolute inset-0 bg-linear-to-t from-secondary/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6 right-6 pointer-events-none">
                <div className="rounded-[20px] border border-white/20 bg-secondary/70 p-4 backdrop-blur-md">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/60">Product Showcase</p>
                  <p className="mt-1 font-heading text-base font-semibold text-white">
                    {selectedImageIndex === 0 ? "Default View" : `Detail View ${selectedImageIndex}`}
                  </p>
                </div>
              </div>
            </div>

            {/* Thumbnails list */}
            {allImages.length > 1 && (
              <div className="flex flex-wrap gap-2.5 pt-1">
                {allImages.map((imgUrl, idx) => (
                  <button
                    key={imgUrl}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative overflow-hidden rounded-2xl border-2 aspect-square w-16 sm:w-20 transition-all duration-200 ${
                      selectedImageIndex === idx
                        ? "border-accent scale-105 shadow-md shadow-accent/25"
                        : "border-white/10 opacity-70 hover:opacity-100 hover:scale-102"
                    }`}
                  >
                    <img
                      src={imgUrl}
                      alt={`${product.title} thumb ${idx}`}
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Specs strip */}
      <div className="border-b border-border bg-surface-card">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 divide-x divide-border sm:grid-cols-3 lg:grid-cols-5">
            {product.specs.map((spec) => (
              <div key={spec.label} className="px-6 py-6 first:pl-0 last:pr-0">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">{spec.label}</p>
                <p className="mt-2 text-sm font-semibold text-foreground leading-snug">{spec.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Description */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="lg:grid lg:grid-cols-[1fr_1.3fr] lg:gap-20 lg:items-start">
          <div className="space-y-5 lg:sticky lg:top-28">
            <div className="inline-flex rounded-full border border-border bg-surface-overlay px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-primary">
              About This Product
            </div>
            <h2 className="font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              What Are {product.title}?
            </h2>
            <p className="text-sm leading-8 text-muted-foreground">
              Manufactured by J K Fertilizers under FCO approved processes.
            </p>
            <div className="rounded-3xl border border-border bg-surface-card p-6 space-y-3">
              {product.specs.map((spec) => (
                <div key={spec.label} className="flex items-center justify-between gap-4 text-sm">
                  <span className="text-muted-foreground">{spec.label}</span>
                  <span className="font-medium text-foreground text-right">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 lg:mt-0 space-y-6">
            {product.description.split("\n\n").map((para) => (
              <p key={para.slice(0, 30)} className="text-base leading-8 text-muted-foreground">
                {para}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal Overlay */}
      {lightboxOpen && allImages && allImages.length > 0 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md animate-in fade-in duration-200">
          {/* Close button */}
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute right-6 top-6 rounded-full bg-white/10 p-3 text-white hover:bg-white/20 transition-all duration-200"
            aria-label="Close lightbox"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Navigation left */}
          {allImages.length > 1 && (
            <button
              onClick={() => setActiveImageIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1))}
              className="absolute left-6 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white hover:bg-white/20 transition-all duration-200"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
          )}

          {/* Main Showcase Image */}
          <div className="max-h-[80vh] max-w-[85vw] overflow-hidden rounded-xl bg-neutral-900 border border-white/10 shadow-2xl flex flex-col justify-center items-center">
            <img
              src={allImages[activeImageIndex]}
              alt={`${product.title} slide`}
              className="max-h-[70vh] w-auto max-w-full object-contain"
            />
            {/* Caption */}
            <div className="w-full bg-neutral-900/90 py-3 text-center text-xs font-medium text-white/80 border-t border-white/5">
              Image {activeImageIndex + 1} of {allImages.length} — {product.title}
            </div>
          </div>

          {/* Navigation right */}
          {allImages.length > 1 && (
            <button
              onClick={() => setActiveImageIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1))}
              className="absolute right-6 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white hover:bg-white/20 transition-all duration-200"
              aria-label="Next image"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          )}
        </div>
      )}

      {/* How to Apply */}
      <section className="bg-muted py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-14 text-center">
            <div className="inline-flex rounded-full border border-border bg-surface-overlay px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-primary">
              Application Guide
            </div>
            <h2 className="mt-5 font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              How to Apply {product.title}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground">
              Follow these steps for optimal results and maximum agronomic benefit from each application.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {product.howToApply.map((step) => (
              <div
                key={step.step}
                className="relative rounded-[28px] border border-border bg-surface-card p-8 shadow-sm"
              >
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
                  <span className="font-heading text-sm font-bold text-primary">{step.step}</span>
                </div>
                <h3 className="font-heading text-xl font-semibold text-foreground">{step.title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{step.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mb-14">
          <div className="inline-flex rounded-full border border-border bg-surface-overlay px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-primary">
            Key Benefits
          </div>
          <div className="mt-5 lg:grid lg:grid-cols-[1fr_1.4fr] lg:items-end lg:gap-10">
            <h2 className="font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              The Clear Benefits of {product.title}
            </h2>
            <p className="mt-4 text-base text-muted-foreground lg:mt-0">
              Choosing our solution provides compounding advantages for both soil health and crop productivity over time.
            </p>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
          {product.benefits.map((benefit) => (
            <div
              key={benefit.title}
              className="flex gap-5 rounded-[28px] border border-border bg-surface-card p-7 transition hover:shadow-[0_16px_48px_rgba(16,24,40,0.06)]"
            >
              <div className="mt-1 shrink-0">
                <CheckCircle2 className="h-6 w-6 text-accent" />
              </div>
              <div>
                <h3 className="font-heading text-xl font-semibold text-foreground">{benefit.title}</h3>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">{benefit.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA band */}
      <section className="bg-primary py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:flex lg:items-center lg:justify-between lg:gap-12 lg:px-8">
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/70">Ready to Partner?</p>
            <h2 className="font-heading text-3xl font-semibold text-white sm:text-4xl">
              Interested in {product.title}?
            </h2>
            <p className="text-base text-white/75">
              Talk to our team about quantities, custom formulations, and supply agreements.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-4 lg:mt-0 lg:shrink-0">
            <Button asChild className="h-12 rounded-full bg-white px-6 font-semibold text-primary hover:bg-white/90">
              <Link to="/contact">Request a Discussion</Link>
            </Button>
            <Button asChild variant="outline" className="h-12 rounded-full border-white/30 px-6 text-white hover:bg-white/15">
              <a href={`tel:${company.phoneRaw}`}>
                <Phone className="mr-2 h-4 w-4" />
                Call Now
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Related Products Carousel */}
      {related.length > 0 && (
        <section className="bg-muted py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 flex flex-col gap-5 lg:mb-12 lg:flex-row lg:items-end lg:justify-between">
              <div className="space-y-4">
                <div className="inline-flex rounded-full border border-border bg-surface-overlay px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-primary">
                  Related Products
                </div>
                <h2 className="font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                  Explore Other Product Lines
                </h2>
                <p className="max-w-2xl text-base leading-7 text-muted-foreground">
                  Browse the full J K Fertilizers portfolio — each granule line engineered for a specific agronomic purpose.
                </p>
              </div>
              <Button asChild variant="outline" className="h-11 rounded-full border-primary px-5 text-primary hover:bg-primary hover:text-white shrink-0 self-start lg:self-auto">
                <Link to="/products">
                  View all products
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <Carousel opts={{ align: "start", loop: true }} className="w-full">
              <CarouselContent className="-ml-6 items-stretch">
                {related.map((relProduct) => (
                  <CarouselItem key={relProduct.slug} className="pl-6 md:basis-1/2 lg:basis-1/3">
                    <Link
                      to={`/products/${relProduct.slug}`}
                      className="group flex h-full flex-col overflow-hidden rounded-[28px] border border-border bg-surface-card shadow-[0_16px_50px_rgba(16,24,40,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(16,24,40,0.1)]"
                    >
                      <div className="relative h-56 w-full shrink-0 overflow-hidden">
                        <img
                          src={relProduct.imageUrl}
                          alt={relProduct.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent" />
                        <div className="absolute left-4 top-4">
                          <span className="inline-flex rounded-full border border-white/30 bg-black/40 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-sm">
                            {relProduct.category}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-1 flex-col p-6">
                        <h3 className="font-heading text-lg font-semibold text-foreground">{relProduct.title}</h3>
                        <p className="mt-2 flex-1 text-sm leading-6 text-muted-foreground">{relProduct.summary}</p>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {relProduct.fit.map((tag) => (
                            <span key={tag} className="rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-medium text-primary">
                              {tag}
                            </span>
                          ))}
                        </div>
                        <div className="mt-5 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                          Read more
                          <MoveRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                        </div>
                      </div>
                    </Link>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="-left-4 top-1/2 -translate-y-1/2" />
              <CarouselNext className="-right-4 top-1/2 -translate-y-1/2" />
            </Carousel>
          </div>
        </section>
      )}
    </>
  );
};
