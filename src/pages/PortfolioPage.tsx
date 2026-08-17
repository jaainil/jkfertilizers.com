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
    title: "Advancing Organic Agriculture",
    category: "Sustainability",
    image: "/images/dsc00161.webp",
    desc: "Transforming farming with innovative organic fertilizers that restore soil health, improve yields, and promote sustainability, empowering farmers nationwide.",
  },
  {
    title: "Custom Blends for Industry Giants",
    category: "Custom Solutions",
    image: "/images/dsc00296.webp",
    desc: "Creating tailored fertilizer solutions for corporates and PSUs, addressing specific agricultural needs with advanced R&D and quality assurance.",
  },
  {
    title: "Coated Granules Innovation",
    category: "Innovation",
    image: "/images/dsc00371.webp",
    desc: "Pioneering nutrient delivery with eco-friendly coated granules that enhance efficiency, reduce waste, and support sustainable farming practices.",
  },
  {
    title: "Global Outreach",
    category: "Export",
    image: "/images/dsc00411.webp",
    desc: "Expanding horizons with export-grade fertilizers designed for global markets, meeting diverse agricultural needs with superior quality and innovation.",
  },
  {
    title: "Sustainability Leadership",
    category: "Environment",
    image: "/images/dsc00549.webp",
    desc: "Leading the way in sustainable agriculture with eco-friendly products and practices that minimize environmental impact and maximize productivity.",
  },
  {
    title: "Partnering And Government Initiatives",
    category: "Partnerships",
    image: "/images/dsc00652.webp",
    desc: "Trusted partner for government agricultural programs, delivering high-quality fertilizers to support large-scale development initiatives across India.",
  },
  {
    title: "Empowering Farmers at the Grassroots",
    category: "Community",
    image: "/images/soil.webp",
    desc: "Reaching rural communities with accessible, high-quality fertilizers and empowering farmers through education, support, and sustainable solutions.",
  },
  {
    title: "High-Capacity Manufacturing",
    category: "Infrastructure",
    image: "/images/j-k-infra.webp",
    desc: "Operating a robust facility with a 700 MT/day capacity, delivering consistent, top-quality fertilizers for domestic and global markets.",
  },
  {
    title: "Collaborative R&D Excellence",
    category: "Research",
    image: "/images/partnership.webp",
    desc: "Driving agricultural innovation through ongoing research, delivering practical solutions to meet evolving farming challenges worldwide.",
  },
];

const stats = [
  { value: "700", label: "MT/Day Capacity" },
  { value: "150+", label: "Trusted Clients" },
  { value: "15+", label: "Years Experience" },
  { value: "100%", label: "Organic Products" },
];

import { useScrollReveal, staggerDelay } from "@/hooks/useScrollReveal";

export const PortfolioPage = () => {
  const galleryReveal = useScrollReveal();
  const statsReveal = useScrollReveal();

  return (
  <>
    <SEOHead
      title="Agricultural Products Portfolio | J K Fertilizers"
      description="Explore J K Fertilizers' product portfolio — Organic Manure, PDM, PROM, Mycorrhiza Granules, Coated Granules, Base Granules, and more. Trusted since 2006."
      canonical="/portfolio"
      ogImage="/images/about-4.webp"
      keywords="J K Fertilizers portfolio, organic fertilizer products, FCO approved fertilizers, mycorrhiza granules gujarat, prom fertilizer, pdm fertilizer"
      schema={[organizationSchema, portfolioPageSchema, portfolioItemListSchema]}
    />
    <PageHero
      eyebrow="Portfolio"
      title="Organic Fertilizers for Indian Agriculture"
      description="Transforming farming with innovative organic fertilizers that restore soil health, improve yields, and promote sustainability, empowering farmers nationwide."
      imageSrc="/images/about-3.webp"
      imageAlt="J K Fertilizers portfolio"
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
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <div key={s.label} className="group text-center" {...staggerDelay(i)}>
              <p className="font-heading text-5xl font-bold text-white">
                {s.value}
              </p>
              <p className="mt-2 type-body text-white/80">{s.label}</p>
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
          <span className="eyebrow">
            Our Achievements
          </span>
          <h2 className="mt-6 font-heading type-section-h2 font-semibold tracking-tight text-foreground">
            Delivering Excellence Across Every Domain
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
                  className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
              </div>
              <div className="p-5">
                <span className="rounded-full bg-accent/10 px-3 py-0.5 type-label font-semibold text-accent-foreground">
                  {item.category}
                </span>
                <h3 className="mt-3 font-heading type-card-title font-semibold text-foreground">{item.title}</h3>
                <p className="mt-2 type-body-sm text-muted-foreground line-clamp-3">{item.desc}</p>
                <p className="mt-3 type-label font-bold uppercase tracking-wider text-primary">Read More</p>
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
            <span className="eyebrow">
              Trusted By Clients
            </span>
            <h2 className="font-heading type-section-h2 font-semibold tracking-tight text-foreground">
              Trusted By Government & Corporate Clients
            </h2>
            <p className="type-body text-muted-foreground">
              We have been a trusted manufacturer for government, semi-government, PSU, and corporate clients since inception. Our commitment to quality and reliability has earned us their confidence.
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
            <Button asChild className="h-12 rounded-full bg-primary px-6 text-white hover:bg-primary/90">
              <Link to="/contact">
                Become a Partner
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          <ImagePanel
            src="/images/about-1.webp"
            alt="J K Fertilizers — trusted manufacturing facility"
            className="aspect-[4/4.5] min-h-[360px]"
            overlay={
              <div className="rounded-2xl border border-white/30 bg-secondary/90 p-5 shadow-card">
                <p className="type-label font-semibold uppercase tracking-[0.16em] text-white/70">Our facility</p>
                <p className="mt-2 font-heading type-body font-semibold text-white">Vasad, Anand — Gujarat, INDIA</p>
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
        <span className="eyebrow-dark">
          Let's Cooperate Together
        </span>
        <h2 className="mt-6 font-heading type-section-h2 font-semibold tracking-tight text-white">
          Explore Our Complete Product Range
        </h2>
        <p className="mx-auto mt-4 max-w-2xl type-body text-white/78">
          From organic manure to advanced coated granules — find the right solution for your agricultural needs.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
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
