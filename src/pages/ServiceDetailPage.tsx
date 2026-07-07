import { useParams, Link, Navigate } from "react-router-dom";
import { MDXProvider } from "@mdx-js/react";
import { ArrowLeft, ArrowRight, X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SEOHead } from "@/components/SEOHead";
import { getServiceBySlug, getAllServices } from "@/lib/content";
import { organizationSchema, buildServiceSchema } from "@/data/seoSchemas";
import { useState } from "react";

/** Prose component map for service MDX content */
const mdxComponents = {
  h2: (props) => {
    const { children, ...rest } = props;
    return (
      <h2
        className="font-heading mt-10 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl first:mt-0"
        {...rest}
      >{children}</h2>
    );
  },
  h3: (props) => {
    const { children, ...rest } = props;
    return (
      <h3
        className="font-heading mt-8 text-xl font-semibold text-foreground"
        {...rest}
      >{children}</h3>
    );
  },
  p: (props) => (
    <p className="mt-5 text-base leading-8 text-muted-foreground" {...props} />
  ),
  ul: (props) => (
    <ul
      className="mt-5 space-y-2 pl-6 text-base leading-8 text-muted-foreground list-disc"
      {...props}
    />
  ),
  ol: (props) => (
    <ol
      className="mt-5 space-y-2 pl-6 text-base leading-8 text-muted-foreground list-decimal"
      {...props}
    />
  ),
  li: (props) => <li className="leading-7" {...props} />,
  strong: (props) => (
    <strong className="font-semibold text-foreground" {...props} />
  ),
  blockquote: (props) => (
    <blockquote
      className="mt-6 border-l-4 border-primary pl-5 italic text-muted-foreground"
      {...props}
    />
  ),
  hr: () => <hr className="my-10 border-border" />,
  a: (props) => (
    <a
      className="font-medium text-primary underline underline-offset-4 hover:text-primary/80"
      {...props}
    />
  ),
};

import { useScrollReveal } from "@/hooks/useScrollReveal";

const SERVICE_IMAGES: Record<string, string[]> = {
  "granule-technology": [
    "/images/Service/Coating/Machinery-9-scaled.jpeg",
    "/images/Service/Coating/DSC00412-scaled.jpeg"
  ],
  "infrastructure-leasing": [
    "/images/Service/Infrastructure Leasing/Drone-View-J-K-3-scaled.jpeg",
    "/images/Service/Infrastructure Leasing/DSC00334-scaled.jpeg",
    "/images/Service/Infrastructure Leasing/DSC00224-scaled.jpeg",
    "/images/Service/Infrastructure Leasing/DSC00627-scaled.jpg",
    "/images/Service/Infrastructure Leasing/6-5.jpeg",
    "/images/Service/Infrastructure Leasing/DSC00263-scaled.jpeg"
  ],
  "job-work-services": [
    "/images/Service/Job Work/Job-Work-2-scaled.jpeg",
    "/images/Service/Job Work/DSC00459-scaled.jpeg",
    "/images/Service/Job Work/Infra-scaled.jpeg",
    "/images/Service/Job Work/DSC00269-scaled.jpeg",
    "/images/Service/Job Work/DSC00275-scaled.jpeg"
  ],
  "custom-packaging-solutions": [
    "/images/Service/Packaging/DSC00358-scaled.jpeg",
    "/images/Service/Packaging/DSC00356-scaled.jpeg",
    "/images/Service/Packaging/DSC00269-scaled.jpeg",
    "/images/Service/Packaging/DSC00200-scaled.jpeg"
  ],
  "warehouse-storage": [
    "/images/Service/Warehouse, Storage and Godown Facilities/Drone-View-Heaps-scaled.jpeg",
    "/images/Service/Warehouse, Storage and Godown Facilities/DSC00127-scaled.jpeg",
    "/images/Service/Warehouse, Storage and Godown Facilities/DSC00263-1-scaled.jpeg",
    "/images/Service/Warehouse, Storage and Godown Facilities/DSC00185-scaled.jpeg",
    "/images/Service/Warehouse, Storage and Godown Facilities/DSC00261-1-scaled.jpeg",
    "/images/Service/Warehouse, Storage and Godown Facilities/DSC00388-scaled.jpeg",
    "/images/Service/Warehouse, Storage and Godown Facilities/Warehousing-2-scaled.jpeg"
  ]
};

const ServiceImageGallery = ({ images, title }: { images: string[]; title: string }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  if (!images || images.length === 0) return null;

  const nextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setActiveIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-10">
      <div className="group relative aspect-video w-full overflow-hidden rounded-3xl border border-border bg-muted shadow-lg">
        {/* Main image */}
        <img
          src={images[activeIndex]}
          alt={`${title} - Gallery Image ${activeIndex + 1}`}
          className="h-full w-full object-cover transition-all duration-500 cursor-zoom-in"
          onClick={() => setLightboxOpen(true)}
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

        {/* Hover zoom-in hint */}
        <button
          onClick={() => setLightboxOpen(true)}
          className="absolute right-4 top-4 rounded-full bg-black/50 p-2.5 text-white opacity-0 hover:bg-black/70 hover:scale-105 transition-all duration-300 group-hover:opacity-100 shadow-md backdrop-blur-xs flex items-center justify-center cursor-pointer"
          aria-label="View Fullscreen"
        >
          <Maximize2 className="h-4.5 w-4.5" />
        </button>

        {/* Next/Prev Navigation arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-3 text-white opacity-0 hover:bg-black/70 hover:scale-105 transition-all duration-300 group-hover:opacity-100 shadow-md backdrop-blur-xs flex items-center justify-center cursor-pointer"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-3 text-white opacity-0 hover:bg-black/70 hover:scale-105 transition-all duration-300 group-hover:opacity-100 shadow-md backdrop-blur-xs flex items-center justify-center cursor-pointer"
              aria-label="Next image"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </>
        )}

        {/* Image index badge */}
        <div className="absolute bottom-4 left-4 rounded-full bg-black/60 px-3 py-1.5 text-xs font-semibold text-white tracking-wide backdrop-blur-xs select-none">
          {activeIndex + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnails list */}
      {images.length > 1 && (
        <div className="mt-4 flex gap-3 overflow-x-auto pb-2 scrollbar-none snap-x snap-mandatory">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`relative aspect-[4/3] w-24 shrink-0 overflow-hidden rounded-xl border-2 transition-all duration-300 snap-start hover:opacity-90 cursor-pointer ${
                idx === activeIndex
                  ? "border-primary scale-[1.02] shadow-md ring-2 ring-primary/20"
                  : "border-transparent opacity-60"
              }`}
            >
              <img
                src={img}
                alt={`${title} Thumbnail ${idx + 1}`}
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Fullscreen Lightbox Modal */}
      {lightboxOpen && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md animate-in fade-in duration-300"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute right-6 top-6 rounded-full bg-white/10 p-3 text-white hover:bg-white/20 transition-all duration-200 cursor-pointer"
            aria-label="Close"
          >
            <X className="h-6 w-6" />
          </button>

          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-6 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-4 text-white hover:bg-white/20 transition-all duration-200 flex items-center justify-center cursor-pointer"
                aria-label="Previous"
              >
                <ChevronLeft className="h-8 w-8" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-6 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-4 text-white hover:bg-white/20 transition-all duration-200 flex items-center justify-center cursor-pointer"
                aria-label="Next"
              >
                <ChevronRight className="h-8 w-8" />
              </button>
            </>
          )}

          <div className="max-h-[85vh] max-w-[90vw]" onClick={(e) => e.stopPropagation()}>
            <img
              src={images[activeIndex]}
              alt={title}
              className="max-h-[85vh] max-w-[90vw] rounded-2xl object-contain shadow-2xl select-none"
            />
            <p className="mt-4 text-center text-sm text-white/60 tracking-wider font-medium select-none">
              {activeIndex + 1} / {images.length}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export const ServiceDetailPage = () => {
  const { slug } = useParams();
  const service = getServiceBySlug(slug);
  const pageReveal = useScrollReveal();

  if (!service) return <Navigate to="/services" replace />;

  const { Component, title, concept, description, image, imageSrc, seoTitle, seoDescription } = service;
  const finalImage = image || imageSrc;

  // Other services for the sidebar nav
  const otherServices = getAllServices().filter((s) => s.slug !== slug);

  const serviceDetailSchema = buildServiceSchema({
    slug,
    name: seoTitle || title,
    description: seoDescription || description,
    image: finalImage,
  });

  return (
    <>
      <SEOHead
        title={seoTitle || `${title} | J K Fertilizers Services`}
        description={seoDescription || description}
        canonical={`/services/${slug}`}
        ogImage={finalImage}
        keywords={`${title}, fertilizer manufacturing services India, B2B fertilizer service Gujarat, contract manufacturing India`}
        schema={[organizationSchema, serviceDetailSchema]}
      />

      {/* ── Hero ── */}
      <section className="relative overflow-hidden border-b border-border bg-background">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(27,77,62,0.08),transparent_35%)]" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            All Services
          </Link>
          <div className="mt-6 flex">
            <div className="inline-flex rounded-full border border-border bg-surface-overlay px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-primary">
              {concept}
            </div>
          </div>
          <h1 className="mt-4 font-heading text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
            {description}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button asChild className="h-12 rounded-full bg-primary px-6 text-white hover:bg-primary/90">
              <Link to="/contact">Discuss this service</Link>
            </Button>
            <Button asChild variant="outline" className="h-12 rounded-full border-primary px-6 text-primary hover:bg-primary hover:text-white">
              <Link to="/products">View products</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ── Interactive Image Gallery ── */}
      <ServiceImageGallery images={SERVICE_IMAGES[slug || ""] || []} title={title} />

      {/* ── Content + Sidebar ── */}
      <div 
        ref={pageReveal.ref}
        className={`mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20 reveal ${pageReveal.isVisible ? 'visible' : ''}`}
      >
        <div className="grid gap-12 lg:grid-cols-[1fr_300px] lg:items-start">
          {/* MDX body */}
          <article>
            <MDXProvider components={mdxComponents}>
              <Component />
            </MDXProvider>
          </article>

          {/* Sidebar: other services */}
          <aside className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Other Services
            </p>
            {otherServices.map((s) => (
              <Link
                key={s.slug}
                to={`/services/${s.slug}`}
                className="group flex items-start gap-3 rounded-[18px] border border-border bg-surface-card p-4 shadow-sm transition-all duration-200 hover:border-primary/30 hover:shadow-md"
              >
                <div className="flex-1">
                  <p className="text-xs font-semibold text-primary">{s.concept}</p>
                  <p className="mt-0.5 text-sm font-medium leading-5 text-foreground">
                    {s.title}
                  </p>
                </div>
                <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-primary" />
              </Link>
            ))}

            {/* CTA card */}
            <div className="rounded-[24px] bg-secondary p-6 text-center">
              <p className="font-heading text-lg font-semibold text-white">
                Ready to get started?
              </p>
              <p className="mt-2 text-sm text-white/75">
                Our team responds within 24 hours.
              </p>
              <Button asChild className="mt-5 h-10 w-full rounded-full bg-accent font-semibold text-secondary hover:bg-accent/80">
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
};
