import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/PageHero";
import { ImagePanel } from "@/components/ImagePanel";
import { SEOHead } from "@/components/SEOHead";
import { organizationSchema, aboutPageSchema } from "@/data/seoSchemas";
import { useScrollReveal, staggerDelay } from "@/hooks/useScrollReveal";
import { CheckCircle2, ArrowRight, Leaf, Eye, Compass, Play } from "lucide-react";

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
  mission: "To sustainably advance agricultural productivity and soil health through effective, eco-friendly fertilizer manufacturing.",
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
  hero: "/images/dsc00161.webp",
  factory: "/images/j-k-infra.webp",
  granules: "/images/dsc00296.webp",
  soil: "/images/dsc00371.webp",
  lab: "/images/dsc00514.webp",
  gallery: [
    "/images/dsc00549.webp",
    "/images/dsc00652.webp",
    "/images/dsc00296.webp",
    "/images/dsc00411.webp",
  ]
};

const stats = [
  { value: "700", unit: "MT", label: "Daily processing capacity" },
  { value: "100,000", unit: "sq ft", label: "Covered warehousing" },
  { value: "2006", unit: "", label: "Manufacturing in Vasad since" },
  { value: "16", unit: "", label: "FCO-approved granule products" },
];

const pillars = [
  "FCO Approved Products",
  "In-House Batch Testing",
  "700 MT/Day Capacity",
  "Private-Label Packaging",
  "Toll Manufacturing",
  "Since 2006",
  "Covered Warehousing",
  "Pan-India Dispatch",
];

const valuesList = [
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
    desc: "Specs written around the client's crop, soil, and packaging format.",
  },
];

const foundingChecklist = [
  "Sustainable Agriculture Practices",
  "FCO-Certified Product Range",
  "In-house batch QC on every lot",
  "Innovation in Fertilizers",
  "Trusted Long-Term Partnerships",
];

const AboutStats = () => {
  const statsReveal = useScrollReveal();
  return (
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
                {s.unit && <span className="text-accent ml-1 text-xl sm:text-2xl lg:text-3xl">{s.unit}</span>}
              </p>
              <p className="mt-2 type-body text-white/80 text-xs sm:text-sm lg:text-base">{s.label}</p>
              <div className="mx-auto mt-3 h-0.5 w-10 rounded-full bg-accent/60 transition-[width] duration-300 group-hover:w-16" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const AboutWelcome = () => {
  const welcomeReveal = useScrollReveal();
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div
        ref={welcomeReveal.ref}
        className={`grid gap-14 lg:grid-cols-[1fr_1fr] lg:items-center reveal ${welcomeReveal.isVisible ? 'visible' : ''}`}
      >
        <div className="space-y-7">
          <h2 className="font-heading type-section-h2 font-semibold tracking-tight text-foreground">
            A manufacturer, not a trader
          </h2>
          <p className="type-body text-muted-foreground">
            J K Fertilizers has manufactured organic fertilizer in Anand district since <strong className="text-foreground">2006</strong>. The plant at Vasad runs rotary drum granulation lines with automated bagging, and every product is certified under FCO.
          </p>
          <p className="type-body text-muted-foreground">
            We make our own granules, coat them to customer specification, and test each batch before dispatch. Brands also use the plant for private-label and toll manufacturing.
          </p>
        </div>

        {/* 2x2 Image Gallery */}
        <div className="grid grid-cols-2 gap-4">
          {[
            { src: images.gallery[0], alt: "Automated bagging line at the Vasad plant" },
            { src: images.gallery[1], alt: "Rotary drum granulation equipment" },
            { src: images.gallery[2], alt: "Finished organic fertilizer granules" },
            { src: images.gallery[3], alt: "Covered warehouse bays at the Vasad complex" },
          ].map((img, idx) => (
            <div key={idx} className="group relative overflow-hidden rounded-2xl border border-border/60 bg-surface-card shadow-card aspect-square">
              <img
                src={img.src}
                alt={img.alt}
                width={400}
                height={400}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <span className="text-white type-label font-medium tracking-wider uppercase">{img.alt}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const AboutMissionVision = () => {
  const missionReveal = useScrollReveal();
  return (
    <section className="bg-muted py-20 lg:py-28">
      <div
        ref={missionReveal.ref}
        className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 reveal ${missionReveal.isVisible ? 'visible' : ''}`}
      >
        <div className="grid gap-8 md:grid-cols-2">
          {/* Mission Card */}
          <article className="flex flex-col rounded-3xl border border-border bg-surface-card p-8 shadow-card transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-card-hover">
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Compass className="h-7 w-7" />
            </div>
            <h3 className="font-heading type-card-title font-semibold text-foreground">Our Mission</h3>
            <p className="mt-4 type-body text-muted-foreground flex-1">
              To sustainably advance agricultural productivity and soil health through effective, eco-friendly fertilizer manufacturing.
            </p>
            <div className="mt-8 border-t border-border pt-6 type-label font-semibold uppercase tracking-[0.16em] text-primary">
              Sustainable Agriculture
            </div>
          </article>

          {/* Vision Card */}
          <article className="flex flex-col rounded-3xl border border-border bg-surface-card p-8 shadow-card transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-card-hover">
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/20 text-accent-foreground">
              <Eye className="h-7 w-7" />
            </div>
            <h3 className="font-heading type-card-title font-semibold text-foreground">Our Vision</h3>
            <p className="mt-4 type-body text-muted-foreground flex-1">
              To lead a global movement toward sustainable farming by empowering farmers with quality organic fertilizers that nourish both the land and the future.
            </p>
            <div className="mt-8 border-t border-border pt-6 type-label font-semibold uppercase tracking-[0.16em] text-accent">
              Greener Tomorrow
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};

const AboutEthics = () => {
  const ethicsReveal = useScrollReveal();
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28" ref={ethicsReveal.ref}>
      <div className={`grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-center reveal ${ethicsReveal.isVisible ? 'visible' : ''}`}>
        <div className="space-y-7">
          <h2 className="font-heading type-section-h2 font-semibold tracking-tight text-foreground">
            Quality control, batch by batch
          </h2>
          <p className="type-body text-muted-foreground">
            Every product is tested in our own lab before dispatch. Moisture, crushing strength, and nutrient content are checked on every lot, and the results travel with the shipment.
          </p>
        </div>

        {/* 2x2 Values List */}
        <div className="grid gap-4 sm:grid-cols-2">
          {valuesList.map((item) => (
            <div key={item.title} className="rounded-2xl border border-border bg-surface-card p-5 shadow-card transition-shadow duration-300 hover:shadow-card-hover">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary mb-3">
                <Leaf className="h-4 w-4" />
              </div>
              <h4 className="font-heading text-base font-semibold text-foreground">{item.title}</h4>
              <p className="mt-2 type-body-sm text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const AboutPillarsTicker = () => (
  <section className="overflow-hidden border-y border-border bg-secondary py-6">
    <div className="flex gap-0 animate-none">
      <div className="flex shrink-0 animate-marquee items-center gap-0">
        {[...pillars, ...pillars].map((p, idx) => (
          <span key={`marquee-p1-${idx}`} className="flex items-center gap-4 px-6 type-label font-semibold uppercase tracking-[0.18em] text-white/80">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            {p}
          </span>
        ))}
      </div>
      <div aria-hidden className="flex shrink-0 animate-marquee items-center gap-0">
        {[...pillars, ...pillars].map((p, idx) => (
          <span key={`marquee-p2-${idx}`} className="flex items-center gap-4 px-6 type-label font-semibold uppercase tracking-[0.18em] text-white/80">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            {p}
          </span>
        ))}
      </div>
    </div>
  </section>
);

const AboutFoundingRoots = () => {
  const foundingReveal = useScrollReveal();
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28" ref={foundingReveal.ref}>
      <div className={`grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center reveal ${foundingReveal.isVisible ? 'visible' : ''}`}>
        <ImagePanel
          src={images.factory}
          alt="J K Fertilizers manufacturing plant"
          className="aspect-4/5 min-h-[400px]"
          overlay={
            <div className="rounded-2xl border border-white/30 bg-secondary/95 p-5 shadow-card">
              <p className="type-label font-semibold uppercase tracking-[0.16em] text-white/70">Our Headquarters</p>
              <p className="mt-2 font-heading text-base font-semibold text-white">Vasad, Anand, Gujarat, INDIA</p>
              <p className="mt-1 type-body-sm text-white/65">{company.address}</p>
            </div>
          }
        />
        <div className="space-y-6">
          <h2 className="font-heading type-section-h2 font-semibold tracking-tight text-foreground">
            Manufacturing Fertilizers in Gujarat Since 2006
          </h2>
          <p className="type-body text-muted-foreground">
            Founded in 2006 by Mr. Akash Dadhania, J K Fertilizers operates a 700 MT/day processing plant in Vasad, Anand. We manufacture FCO-certified organic fertilizers, secondary mineral carriers, and customized bio-coatings for farmers and fertilizer brands across India.
          </p>

          <div className="grid gap-3 pt-2">
            {foundingChecklist.map((item) => (
              <div key={item} className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 shrink-0 text-primary" />
                <span className="type-body-sm font-medium text-foreground">{item}</span>
              </div>
            ))}
          </div>

          <div className="pt-4">
            <Button asChild className="h-12 w-full sm:w-auto rounded-full bg-primary px-7 text-white hover:bg-primary/90">
              <Link to="/commitment">Learn More about Our Commitment</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

const AboutActionCards = () => {
  const actionReveal = useScrollReveal();

  return (
    <section className="bg-muted py-20 lg:py-28" ref={actionReveal.ref}>
      <div className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 reveal ${actionReveal.isVisible ? 'visible' : ''}`}>
        <div className="grid gap-8 md:grid-cols-2">
          {/* Portfolio Card */}
          <div className="rounded-3xl border border-border bg-surface-card p-8 shadow-card flex flex-col justify-between min-h-[300px]">
            <div>
              <span className="type-label font-semibold uppercase tracking-[0.16em] text-accent">The full range</span>
              <h3 className="mt-3 font-heading type-card-title font-bold text-foreground">What the plant makes</h3>
              <p className="mt-3 type-body-sm text-muted-foreground">
                Organic manure, PROM, PDM, mycorrhiza granules, and a full spread of mineral base and coated granules.
              </p>
            </div>
            <div className="mt-8">
              <Button asChild variant="outline" className="h-11 w-full sm:w-auto rounded-full border-primary px-6 text-primary hover:bg-primary hover:text-white">
                <Link to="/portfolio">View Our Portfolio <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </div>
          </div>

          {/* Site Visit Card */}
          <div className="rounded-3xl border border-border bg-surface-card p-8 shadow-card flex flex-col justify-between min-h-[300px]">
            <div>
              <span className="type-label font-semibold uppercase tracking-[0.16em] text-primary">See it yourself</span>
              <h3 className="mt-3 font-heading type-card-title font-bold text-foreground">Walk the plant</h3>
              <p className="mt-3 type-body-sm text-muted-foreground">
                See the granulation lines, bagging, and warehouse for yourself. Site visits at our Vasad facility can be scheduled on working days.
              </p>
            </div>
            <div className="mt-8">
              <Button asChild variant="outline" className="h-11 w-full sm:w-auto rounded-full border-primary px-6 text-primary hover:bg-primary hover:text-white">
                <Link to="/contact">
                  <span className="flex items-center gap-2">
                    <Play className="h-3.5 w-3.5 fill-current" />
                    Book a site visit
                  </span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const AboutCta = () => (
  <section className="bg-secondary py-20 lg:py-28">
    <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
      <h2 className="font-heading type-section-h2 font-semibold tracking-tight text-white">
        Request a quote or book a site visit
      </h2>
      <p className="mx-auto mt-4 max-w-2xl type-body text-white/78">
        Send your product and tonnage requirement. Our technical sales team replies within 24 hours.
      </p>
      <div className="mt-10 flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 w-full sm:w-auto [&>*]:w-full sm:[&>*]:w-auto">
        <Button asChild className="h-12 rounded-full bg-accent px-8 text-secondary font-semibold hover:bg-accent/80">
          <Link to="/contact">Get In Touch</Link>
        </Button>
        <Button asChild variant="outline" className="h-12 rounded-full border-white/30 bg-transparent px-8 text-white hover:bg-white hover:text-secondary">
          <a href={`tel:${company.phoneRaw}`}>Call {company.phoneDisplay}</a>
        </Button>
      </div>
      <div className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-2 type-body-sm text-white/60">
        <span>{company.address}</span>
        <span className="hidden sm:inline">·</span>
        <a href={`mailto:${company.emails[0]}`} className="hover:text-white/90 transition-colors">{company.emails[0]}</a>
        <span className="hidden sm:inline">·</span>
        <a href={`mailto:${company.emails[1]}`} className="hover:text-white/90 transition-colors">{company.emails[1]}</a>
      </div>
    </div>
  </section>
);

export const AboutPage = () => {
  return (
    <>
      <SEOHead
        title="About J K Fertilizers | Fertilizer Manufacturer Gujarat"
        description="Learn about J K Fertilizers, founded in 2006 by Akash Dadhania in Anand, Gujarat. FCO-approved Organic Manure, PROM, PDM, and custom granule manufacturing."
        canonical="/about"
        ogImage="/images/dsc00161.webp"
        keywords="about J K Fertilizers, organic fertilizer manufacturer gujarat, fertilizer company anand gujarat, Akash Dadhania, J K Fertilizers history, fertilizer manufacturer since 2006"
        schema={[organizationSchema, aboutPageSchema]}
      />
      {/* ── Hero ── */}
      <PageHero
        title="Organic Fertilizer & Mineral Granule Manufacturing in Gujarat"
        description="Supplying FCO-approved organic manures, biofertilizers, and custom carrier granules from our 700 MT/day processing facility in Vasad, Anand."
        imageSrc={images.hero}
        imageAlt="J K Fertilizers facility in Vasad, Anand"
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
      <AboutStats />
      <AboutWelcome />
      <AboutMissionVision />
      <AboutEthics />
      <AboutPillarsTicker />
      <AboutFoundingRoots />
      <AboutActionCards />
      <AboutCta />
    </>
  );
};

