import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/PageHero";
import { ImagePanel } from "@/components/ImagePanel";
import { SEOHead } from "@/components/SEOHead";
import { organizationSchema, aboutPageSchema } from "@/data/seoSchemas";

const company = {
  name: "J K Fertilizers",
  tagline: "Organic, Naturally",
  subTagline: "Manufacturers of Organic Fertilizers",
  missionTagline: "Empowering Farmers, Enriching Communities",
  legalTagline: "Leading Manufacturers of Organic Fertilizers, Base Granules and Coated Base Granules",
  heroTitle: "Better Agriculture for Better Future",
  heroSubtitle:
    "Pioneering sustainable agriculture since 2006 with eco-friendly, mineral-coated granules and soil conditioners.",
  aboutDetails: "J K Fertilizers, headquartered in Gujarat, India, began its journey in 2006. With a steadfast commitment to sustainable agriculture, we serve farmers, landscapers, and agricultural industries across India and beyond. As a leader in organic fertilizer innovation, we specialize in producing eco-friendly, mineral-coated granules and soil conditioners that enhance soil health and improve crop yield.",
  mission: "To sustainably advance agricultural productivity and soil health through innovative, eco-friendly fertilizer solutions.",
  chairmanMessage: "Founded in 2006, J K Fertilizers has consistently grown through strategic investments in infrastructure and expansion of production capacity, with a focus on organic fertilizers and a commitment to sustainable agricultural practices.",
  philosophy: "Quality You Can Trust, Results You Can See - Every product is manufactured using state-of-the-art technology.",
  phoneDisplay: "9825045894",
  phoneRaw: "+919825045894",
  emails: ["info@jkfertilizers.com", "sales@jkfertilizers.com"],
  address: "NH. 48, Opp. IOC Petrol Pump, B/H Adas Bus Stop, Vasad, Dist: Anand, Gujarat - 388305 INDIA",
  founder: "Mr. Akash Dadhania",
  founderTitle: "Founder & Director",
};

const images = {
  hero: "/images/dsc00161.jpg",
  factory: "/images/j-k-infra.jpg",
  granules: "/images/dsc00296.jpg",
  soil: "/images/dsc00371.jpg",
  lab: "/images/dsc00514.jpg",
  gallery: [
    "/images/dsc00549.jpg",
    "/images/dsc00652.jpg",
    "/images/dsc00296.jpg",
    "/images/dsc00411.jpg",
  ]
};

const stats = [
  { value: "100", unit: "+", label: "Agricultural Products" },
  { value: "150", unit: "+", label: "Trust By Clients" },
  { value: "15", unit: "+", label: "Years of Experience" },
  { value: "10000", unit: "+", label: "Tons of Products" },
];

const pillars = [
  "Organic Excellence",
  "Sustainable Agriculture",
  "FCO Approved Products",
  "Trusted Quality",
  "Eco-Friendly Solutions",
  "Customer Centric",
  "15+ Years Experience",
  "Innovation in Fertilizers",
];

import { useScrollReveal, staggerDelay } from "@/hooks/useScrollReveal";
import { CheckCircle2, ArrowRight, Leaf, Award, Shield, Eye, Compass, Play } from "lucide-react";
import { toast } from "sonner";

export const AboutPage = () => {
  const statsReveal = useScrollReveal();
  const welcomeReveal = useScrollReveal();
  const missionReveal = useScrollReveal();
  const ethicsReveal = useScrollReveal();
  const foundingReveal = useScrollReveal();
  const actionReveal = useScrollReveal();

  const handleTourClick = (e: React.MouseEvent) => {
    e.preventDefault();
    toast.info("Factory Tour Request", {
      description: "To schedule a factory tour at our Vasad facility, please reach out to us at info@jkfertilizers.com or call 9825045894.",
      duration: 5000,
    });
  };

  return (
  <>
    <SEOHead
      title="About Us — J K Fertilizers | Organic Fertilizer Manufacturer Since 2006 | Anand, Gujarat"
      description="Learn about J K Fertilizers — India's trusted organic fertilizer manufacturer since 2006. Founded by Mr. Akash Dadhania in Anand, Gujarat. Specializing in Organic Manure, PDM, PROM, and coated granules."
      canonical="/about"
      ogImage="/images/dsc00161.jpg"
      keywords="about J K Fertilizers, organic fertilizer manufacturer gujarat, fertilizer company anand gujarat, Akash Dadhania, J K Fertilizers history, fertilizer manufacturer since 2006"
      schema={[organizationSchema, aboutPageSchema]}
    />
    {/* ── Hero ── */}
    <PageHero
      eyebrow="About Us"
      title="At J K Fertilizers, we’re dedicated to leading sustainable agriculture with solutions that combat soil degradation"
      description="providing high-quality organic products that enhance crop health, safety, and sustainability for a thriving, eco-friendly future."
      imageSrc={images.hero}
      imageAlt="J K Fertilizers facility"
      badges={["Since 2006", "FCO Approved", "Anand, Gujarat"]}
      primaryCta={
        <Button asChild className="h-12 rounded-full bg-primary px-6 text-white hover:bg-primary/90">
          <Link to="/contact">Talk to our team</Link>
        </Button>
      }
      secondaryCta={
        <Button asChild variant="outline" className="h-12 rounded-full border-primary px-6 text-primary hover:bg-primary hover:text-white">
          <Link to="/products">View our products</Link>
        </Button>
      }
    />

    {/* ── Stats Banner ── */}
    <section className="bg-secondary py-14 lg:py-16">
      <div
        ref={statsReveal.ref}
        className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 reveal-scale ${statsReveal.isVisible ? 'visible' : ''}`}
      >
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <div key={s.label} className="group text-center" {...staggerDelay(i, 100)}>
              <p className="font-heading text-5xl font-bold text-white">
                {s.value}
                {s.unit && <span className="text-accent ml-1 text-3xl">{s.unit}</span>}
              </p>
              <p className="mt-2 text-base text-white/80">{s.label}</p>
              <div className="mx-auto mt-3 h-0.5 w-10 rounded-full bg-accent/60 transition-all duration-300 group-hover:w-16" />
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* ── Welcome / Who We Are with 2x2 Gallery ── */}
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div
        ref={welcomeReveal.ref}
        className={`grid gap-14 lg:grid-cols-[1fr_1fr] lg:items-center reveal ${welcomeReveal.isVisible ? 'visible' : ''}`}
      >
        <div className="space-y-7">
          <div className="inline-flex rounded-full border border-border bg-surface-overlay px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-primary">
            Welcome to J K Fertilizers
          </div>
          <h2 className="font-heading text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Growing a Greener Future Together
          </h2>
          <p className="text-base leading-8 text-muted-foreground sm:text-lg">
            Welcome to J K Fertilizers, a pioneering force in sustainable agriculture since <strong className="text-foreground">2006</strong>. We’re dedicated to enhancing crop health through premium organic fertilizers that are as beneficial to plants as they are to the planet.
          </p>
          <p className="text-base leading-8 text-muted-foreground sm:text-lg">
            With a legacy of innovation, J K Fertilizers brings expertly crafted organic solutions to farmers, helping nurture healthier crops and soils with a focus on quality and eco-responsibility.
          </p>
        </div>

        {/* 2x2 Image Gallery */}
        <div className="grid grid-cols-2 gap-4">
          {[
            { src: images.gallery[0], alt: "DSC00549" },
            { src: images.gallery[1], alt: "DSC00652" },
            { src: images.gallery[2], alt: "DSC00296" },
            { src: images.gallery[3], alt: "DSC00411" },
          ].map((img, idx) => (
            <div key={idx} className="group relative overflow-hidden rounded-2xl border border-border/60 bg-surface-card shadow-sm aspect-square">
              <img
                src={img.src}
                alt={img.alt}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <span className="text-white text-xs font-medium tracking-wider uppercase">{img.alt}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* ── Mission & Vision ── */}
    <section className="bg-muted py-20 lg:py-28 section-wave">
      <div
        ref={missionReveal.ref}
        className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 reveal ${missionReveal.isVisible ? 'visible' : ''}`}
      >
        <div className="grid gap-8 md:grid-cols-2">
          {/* Mission Card */}
          <article className="flex flex-col rounded-[32px] border border-border bg-surface-card p-8 shadow-[0_16px_50px_rgba(16,24,40,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(16,24,40,0.1)]">
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Compass className="h-7 w-7" />
            </div>
            <h3 className="font-heading text-2xl font-semibold text-foreground">Our Mission</h3>
            <p className="mt-4 text-base leading-8 text-muted-foreground flex-1">
              To sustainably advance agricultural productivity and soil health through innovative, eco-friendly fertilizer solutions.
            </p>
            <div className="mt-8 border-t border-border pt-6 text-xs font-semibold uppercase tracking-wider text-primary">
              Sustainable Agriculture
            </div>
          </article>

          {/* Vision Card */}
          <article className="flex flex-col rounded-[32px] border border-border bg-surface-card p-8 shadow-[0_16px_50px_rgba(16,24,40,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(16,24,40,0.1)]">
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/20 text-accent-foreground">
              <Eye className="h-7 w-7" />
            </div>
            <h3 className="font-heading text-2xl font-semibold text-foreground">Our Vision</h3>
            <p className="mt-4 text-base leading-8 text-muted-foreground flex-1">
              To lead a global movement toward sustainable farming by empowering farmers with quality organic fertilizers that nourish both the land and the future.
            </p>
            <div className="mt-8 border-t border-border pt-6 text-xs font-semibold uppercase tracking-wider text-accent">
              Greener Tomorrow
            </div>
          </article>
        </div>
      </div>
    </section>

    {/* ── Ethics in Action ── */}
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28" ref={ethicsReveal.ref}>
      <div className={`grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-center reveal ${ethicsReveal.isVisible ? 'visible' : ''}`}>
        <div className="space-y-7">
          <div className="inline-flex rounded-full border border-border bg-surface-overlay px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-primary">
            Ethics in Action
          </div>
          <h2 className="font-heading text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Guided by integrity, committed to quality in every step
          </h2>
          <p className="text-base leading-8 text-muted-foreground sm:text-lg">
            At J K Fertilizers, every product reflects our unwavering integrity and dedication to quality, ensuring sustainable, trustworthy solutions from our facilities to your fields.
          </p>

          {/* Progress Bars */}
          <div className="space-y-5 pt-3">
            <div>
              <div className="flex justify-between text-sm font-semibold mb-1 text-foreground">
                <span>Organic Solutions</span>
                <span>100%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-border overflow-hidden">
                <div className="h-full bg-primary rounded-full" style={{ width: "100%" }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm font-semibold mb-1 text-foreground">
                <span>Quality Agriculture</span>
                <span>100%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-border overflow-hidden">
                <div className="h-full bg-accent rounded-full" style={{ width: "100%" }} />
              </div>
            </div>
          </div>
        </div>

        {/* 2x2 Values List */}
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            {
              title: "Sustainability",
              desc: "Creating products that protect and enrich the environment.",
            },
            {
              title: "Absolute Quality",
              desc: "Ensuring unmatched product integrity through rigorous standards.",
            },
            {
              title: "Innovation",
              desc: "Continuously improving to serve farmers better.",
            },
            {
              title: "Customer-Centricity",
              desc: "Prioritizing client needs with tailored solutions.",
            },
          ].map((item) => (
            <div key={item.title} className="rounded-2xl border border-border bg-surface-card p-5 shadow-sm transition-all duration-300 hover:shadow-md">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary mb-3">
                <Leaf className="h-4 w-4" />
              </div>
              <h4 className="font-heading text-base font-semibold text-foreground">{item.title}</h4>
              <p className="mt-2 text-xs leading-5 text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* ── Sustainability Pillars Ticker ── */}
    <section className="overflow-hidden border-y border-border bg-secondary py-6">
      <div className="flex gap-0 animate-none">
        <div className="flex shrink-0 animate-marquee items-center gap-0">
          {[...pillars, ...pillars].map((p, idx) => (
            <span key={`marquee-p1-${idx}`} className="flex items-center gap-4 px-6 text-sm font-semibold uppercase tracking-[0.18em] text-white/80">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              {p}
            </span>
          ))}
        </div>
        <div aria-hidden className="flex shrink-0 animate-marquee items-center gap-0">
          {[...pillars, ...pillars].map((p, idx) => (
            <span key={`marquee-p2-${idx}`} className="flex items-center gap-4 px-6 text-sm font-semibold uppercase tracking-[0.18em] text-white/80">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              {p}
            </span>
          ))}
        </div>
      </div>
    </section>

    {/* ── Founding Roots ── */}
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28" ref={foundingReveal.ref}>
      <div className={`grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center reveal ${foundingReveal.isVisible ? 'visible' : ''}`}>
        <ImagePanel
          src={images.factory}
          alt="J K Fertilizers manufacturing plant"
          className="aspect-4/5 min-h-[400px]"
          overlay={
            <div className="rounded-[24px] border border-white/30 bg-secondary/90 p-5 shadow-[0_16px_50px_rgba(15,23,42,0.18)]">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/70">Our Headquarters</p>
              <p className="mt-2 font-heading text-base font-semibold text-white">Vasad, Anand — Gujarat, INDIA</p>
              <p className="mt-1 text-sm text-white/65">{company.address}</p>
            </div>
          }
        />
        <div className="space-y-6">
          <div className="inline-flex rounded-full border border-border bg-surface-overlay px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-primary">
            Founding Roots
          </div>
          <h2 className="font-heading text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Innovation in Agriculture Since 2006
          </h2>
          <p className="text-base leading-8 text-muted-foreground">
            Since our founding by Mr. Akash Dadhania, J K Fertilizers has remained steadfast in our commitment to advancing organic farming. From a humble beginning to becoming an ISO-certified leader, our journey reflects our unwavering dedication to sustainable growth and quality.
          </p>

          <div className="grid gap-3 pt-2">
            {[
              "Sustainable Agriculture Practices",
              "ISO-Certified Product Excellence",
              "Customer-Centric Solutions",
              "Innovation in Fertilizers",
              "Trusted Long-Term Partnerships",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 shrink-0 text-primary" />
                <span className="text-sm font-medium text-foreground">{item}</span>
              </div>
            ))}
          </div>

          <div className="pt-4">
            <Button asChild className="h-12 rounded-full bg-primary px-7 text-white hover:bg-primary/90">
              <Link to="/commitment">Learn More about Our Commitment</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>

    {/* ── Action cards (Harvesting Hope! & Built on Integrity) ── */}
    <section className="bg-muted py-20 lg:py-28 section-wave" ref={actionReveal.ref}>
      <div className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 reveal ${actionReveal.isVisible ? 'visible' : ''}`}>
        <div className="grid gap-8 md:grid-cols-2">
          {/* Harvesting Hope Card */}
          <div className="rounded-[32px] border border-border bg-surface-card p-8 shadow-sm flex flex-col justify-between min-h-[300px]">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-accent">Sustainable Growth</span>
              <h3 className="mt-3 font-heading text-2xl font-bold text-foreground">Harvesting Hope!</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                Experience how J K Fertilizers fuels dreams of bountiful harvests, supporting farmers to achieve success sustainably.
              </p>
            </div>
            <div className="mt-8">
              <Button asChild variant="outline" className="h-11 rounded-full border-primary px-6 text-primary hover:bg-primary hover:text-white">
                <Link to="/portfolio">View Our Portfolio <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </div>
          </div>

          {/* Built on Integrity Card */}
          <div className="rounded-[32px] border border-border bg-surface-card p-8 shadow-sm flex flex-col justify-between min-h-[300px]">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">Quality Facilities</span>
              <h3 className="mt-3 font-heading text-2xl font-bold text-foreground">Built on Integrity</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                Our facility embodies our commitment to quality and environmental responsibility, producing fertilizers that are as sustainable as they are effective.
              </p>
            </div>
            <div className="mt-8">
              <Button onClick={handleTourClick} variant="outline" className="h-11 rounded-full border-primary px-6 text-primary hover:bg-primary hover:text-white">
                <span className="flex items-center gap-2">
                  <Play className="h-3.5 w-3.5 fill-current" />
                  Factory Tour
                </span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* ── Footer-like CTA ── */}
    <section className="bg-secondary py-20 lg:py-28">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <div className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-white/80">
          Let's Cooperate Together
        </div>
        <h2 className="mt-6 font-heading text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          Ready to Partner with India's Trusted Fertilizer Manufacturer?
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-white/78 sm:text-lg">
          Contact us today. We will reply within 24 hours via email. Let's build a sustainable agricultural future together.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Button asChild className="h-12 rounded-full bg-accent px-8 text-secondary font-semibold hover:bg-accent/80">
            <Link to="/contact">Get In Touch</Link>
          </Button>
          <Button asChild variant="outline" className="h-12 rounded-full border-white/30 bg-transparent px-8 text-white hover:bg-white hover:text-secondary">
            <a href={`tel:${company.phoneRaw}`}>Call {company.phoneDisplay}</a>
          </Button>
        </div>
        <div className="mt-10 flex flex-wrap justify-center gap-6 text-sm text-white/60">
          <span>{company.address}</span>
          <span>·</span>
          <a href={`mailto:${company.emails[0]}`} className="hover:text-white/90 transition-colors">{company.emails[0]}</a>
          <span>·</span>
          <a href={`mailto:${company.emails[1]}`} className="hover:text-white/90 transition-colors">{company.emails[1]}</a>
        </div>
      </div>
    </section>
  </>
  );
};
