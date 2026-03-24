import { useParams, Link, Navigate } from "react-router-dom";
import { MDXProvider } from "@mdx-js/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SEOHead } from "@/components/SEOHead";
import { getServiceBySlug, getAllServices } from "@/lib/content";
import { organizationSchema, buildServiceSchema } from "@/data/seoSchemas";

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

export const ServiceDetailPage = () => {
  const { slug } = useParams();
  const service = getServiceBySlug(slug);
  const pageReveal = useScrollReveal();

  if (!service) return <Navigate to="/services" replace />;

  const { Component, title, concept, description, imageSrc, seoTitle, seoDescription } = service;

  // Other services for the sidebar nav
  const otherServices = getAllServices().filter((s) => s.slug !== slug);

  const serviceDetailSchema = buildServiceSchema({
    slug,
    name: seoTitle || title,
    description: seoDescription || description,
    image: imageSrc,
  });

  return (
    <>
      <SEOHead
        title={seoTitle || `${title} | Adit Biorganic Services`}
        description={seoDescription || description}
        canonical={`/services/${slug}`}
        ogImage={imageSrc}
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

      {/* ── Cover image ── */}
      {imageSrc && (
        <div className="relative h-72 overflow-hidden sm:h-96">
          <img
            src={imageSrc}
            alt={title}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-secondary/50 to-transparent" />
        </div>
      )}

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
