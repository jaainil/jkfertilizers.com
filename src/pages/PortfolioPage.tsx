import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/PageHero";
import { ImagePanel } from "@/components/ImagePanel";
import { SEOHead } from "@/components/SEOHead";
import { organizationSchema, portfolioPageSchema, portfolioItemListSchema } from "@/data/seoSchemas";
import { CheckCircle2, ArrowRight } from "lucide-react";

const company = {
  name: "J K Fertilizers",
  phoneDisplay: "9825045894",
  phoneRaw: "+919825045894",
  emails: ["info@jkfertilizers.com", "sales@jkfertilizers.com"],
  address: "NH. 48, Opp. IOC Petrol Pump, B/H Adas Bus Stop, Vasad, Dist: Anand, Gujarat - 388305 INDIA",
};

const portfolioItems = [
  {
    title: "Organic Manure & PROM",
    category: "Products",
    image: "/images/dsc00161.webp",
    desc: "FCO-approved organic manure and phosphate-rich organic manure, packed from 1 kg retail bags to 1,000 kg jumbo bags.",
  },
  {
    title: "Custom Coated Granules",
    category: "Custom Coating",
    image: "/images/dsc00296.webp",
    desc: "Mineral carrier cores coated with bio-inoculants, humic acids, or micronutrients to customer specification.",
  },
  {
    title: "Mycorrhiza Biofertilizer Granules",
    category: "Products",
    image: "/images/dsc00371.webp",
    desc: "Mycorrhiza bio-inoculant coated onto carrier granules, produced at the Vasad plant under FCO.",
  },
  {
    title: "Private-Label Packaging",
    category: "Packaging",
    image: "/images/dsc00411.webp",
    desc: "Your brand printed on HDPE, PP woven, or laminated bags, with moisture liners where the cargo demands it.",
  },
  {
    title: "Toll Manufacturing",
    category: "Job Work",
    image: "/images/dsc00549.webp",
    desc: "Bring a formulation and a brand. We granulate, coat, bag, and dispatch under your label.",
  },
  {
    title: "Infrastructure Leasing",
    category: "Leasing",
    image: "/images/dsc00652.webp",
    desc: "Granulation lines, warehouse bays, and bagging capacity available on lease inside the Vasad complex.",
  },
  {
    title: "100,000 Sq Ft Covered Storage",
    category: "Infrastructure",
    image: "/images/soil.webp",
    desc: "Covered warehousing keeps finished stock dry year-round, with inventory management and pan-India dispatch.",
  },
  {
    title: "700 MT/Day Processing",
    category: "Bulk Supply",
    image: "/images/j-k-infra.webp",
    desc: "Rotary drum granulation lines with automated bagging, dispatching bulk orders across Indian states by road.",
  },
  {
    title: "In-House Batch QC",
    category: "Quality",
    image: "/images/partnership.webp",
    desc: "Moisture, crushing strength, and nutrient assay run on every batch before it leaves the plant.",
  },
];

const stats = [
  { value: "700", label: "MT/Day Capacity" },
  { value: "100,000+", label: "Sq Ft Covered Storage" },
  { value: "2006", label: "Manufacturing Since" },
  { value: "FCO", label: "Approved Product Range" },
];

import { useScrollReveal, staggerDelay } from "@/hooks/useScrollReveal";

export const PortfolioPage = () => {
  const galleryReveal = useScrollReveal();
  const statsReveal = useScrollReveal();

  return (
  <>
    <SEOHead
      title="Agricultural Product Portfolio | J K Fertilizers"
      description="View the J K Fertilizers product portfolio: FCO-approved Organic Manure, PDM, PROM, Mycorrhiza Granules, and custom mineral base granules."
      canonical="/portfolio"
      ogImage="/images/about-4.webp"
      keywords="J K Fertilizers portfolio, organic fertilizer products, FCO approved fertilizers, mycorrhiza granules gujarat, prom fertilizer, pdm fertilizer"
      schema={[organizationSchema, portfolioPageSchema, portfolioItemListSchema]}
    />
    <PageHero
      title="Organic Fertilizer & Granule Portfolio"
      description="FCO-certified organic manures, bio-phosphates, potash sources, and custom mineral carrier granules manufactured in Vasad, Anand, Gujarat."
      imageSrc="/images/about-3.webp"
      imageAlt="J K Fertilizers product portfolio"
      badges={["FCO Approved", "100% Organic", "Since 2006"]}
      primaryCta={
        <Button asChild className="h-12 rounded-full bg-primary px-6 text-white hover:bg-primary/90">
          <Link to="/products">View All Products</Link>
        </Button>
      }
      secondaryCta={
        <Button asChild variant="outline" className="h-12 rounded-full border-primary px-6 text-primary hover:bg-primary hover:text-white">
          <Link to="/contact">Get In Touch</Link>
        </Button>
      }
    />

    {/* ── Stats ── */}
    <section className="bg-secondary py-14 lg:py-16">
      <div
        ref={statsReveal.ref}
        className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 reveal-scale ${statsReveal.isVisible ? 'visible' : ''}`}
      >
        <div className="grid gap-6 grid-cols-2 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <div key={s.label} className="group text-center" {...staggerDelay(i)}>
              <p className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
                {s.value}
              </p>
              <p className="mt-2 type-body text-white/80 text-xs sm:text-sm lg:text-base">{s.label}</p>
              <div className="mx-auto mt-3 h-0.5 w-10 rounded-full bg-accent/60 transition-[width] duration-300 group-hover:w-16" />
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* ── Product Portfolio Grid ── */}
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div
        ref={galleryReveal.ref}
        className={`reveal ${galleryReveal.isVisible ? 'visible' : ''}`}
      >
        <div className="mb-12 text-center">
          <h2 className="font-heading type-section-h2 font-semibold tracking-tight text-foreground">
            What the plant makes possible
          </h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {portfolioItems.map((item, i) => (
            <div
              key={item.title}
              {...staggerDelay(i)}
              className="group overflow-hidden rounded-2xl border border-border bg-surface-card shadow-card transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-card-hover"
            >
              <div className="relative h-44 overflow-hidden bg-muted p-4 sm:h-48">
                <img
                  src={item.image}
                  alt={item.title}
                  width={400}
                  height={300}
                  className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="p-5">
                <span className="rounded-full bg-accent/10 px-3 py-0.5 type-label font-semibold text-accent-foreground">
                  {item.category}
                </span>
                <h3 className="mt-3 font-heading type-card-title font-semibold text-foreground">{item.title}</h3>
                <p className="mt-2 type-body-sm text-muted-foreground">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* ── Trusted Clients Section ── */}
    <section className="bg-muted py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div className="space-y-7">
            <h2 className="font-heading type-section-h2 font-semibold tracking-tight text-foreground">
              Built for bulk buyers
            </h2>
            <p className="type-body text-muted-foreground">
              We supply government programs, PSUs, corporate accounts, and distributors. Bulk contracts run on written specifications, batch test results, and scheduled dispatch.
            </p>
            <div className="grid gap-3">
              {[
                "Trusted By Government Organizations",
                "Semi-Government & PSU Partnerships",
                "Corporate Client Relationships",
                "Pan-India Delivery Network",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-xl border border-border bg-surface-card p-3 sm:rounded-2xl sm:p-4">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                  <p className="type-body-sm font-medium text-foreground">{item}</p>
                </div>
              ))}
            </div>
            <Button asChild className="h-12 w-full sm:w-auto rounded-full bg-primary px-6 text-white hover:bg-primary/90">
              <Link to="/contact">
                Become a Partner
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          <ImagePanel
            src="/images/about-1.webp"
            alt="J K Fertilizers manufacturing facility"
            className="aspect-[4/4.5] min-h-[360px]"
            overlay={
              <div className="rounded-2xl border border-white/30 bg-secondary/90 p-5 shadow-card">
                <p className="type-label font-semibold uppercase tracking-[0.16em] text-white/70">Our facility</p>
                <p className="mt-2 font-heading type-body font-semibold text-white">Vasad, Anand, Gujarat, INDIA</p>
                <p className="mt-1 type-body-sm text-white/65">NH. 48, Opp. IOC Petrol Pump</p>
              </div>
            }
          />
        </div>
      </div>
    </section>

    {/* ── CTA ── */}
    <section className="bg-secondary py-20 lg:py-28">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="mt-6 font-heading type-section-h2 font-semibold tracking-tight text-white">
          Explore Our Complete Product Range
        </h2>
        <p className="mx-auto mt-4 max-w-2xl type-body text-white/78">
          Browse organic manures, biofertilizers, and engineered mineral carrier granules for your agricultural requirements.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 w-full sm:w-auto [&>*]:w-full sm:[&>*]:w-auto">
          <Button asChild className="h-12 rounded-full bg-accent px-8 text-secondary font-semibold hover:bg-accent/80">
            <Link to="/products">View All Products</Link>
          </Button>
          <Button asChild variant="outline" className="h-12 rounded-full border-white/30 bg-transparent px-8 text-white hover:bg-white hover:text-secondary">
            <a href={`tel:${company.phoneRaw}`}>Call {company.phoneDisplay}</a>
          </Button>
        </div>
      </div>
    </section>
  </>
  );
};
