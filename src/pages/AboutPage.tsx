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
  address: "NH. 48, Opp. IOC Petrol Pump, B/H Adas Bus Stop, Vasad, Dist: Anand, Gujarat",
  founder: "Mr. Akash Dadhania",
  founderTitle: "Founder & Director",
};

const images = {
  hero: "/images/about-1.jpg",
  factory: "/images/about-2.jpg",
  granules: "/images/about-3.jpg",
  soil: "/images/about-4.jpg",
  lab: "/images/about-5.jpg",
  partnership: "/images/about-5.jpg",
};

const stats = [
  { value: "150", unit: "+", label: "Trusted Clients" },
  { value: "15", unit: "+", label: "Years of Experience" },
  { value: "10000", unit: "+", label: "Tons of Products" },
  { value: "75", unit: "+", label: "Happy Clients" },
];

const milestones = [
  {
    year: "2006",
    title: "The Beginning of a Vision",
    desc: "Founded in 2006 by Mr. Akash Dadhania, J K Fertilizers commenced operations with its first organic manure plant. This humble beginning laid the foundation for a pioneering legacy in sustainable agriculture.",
  },
  {
    year: "2010",
    title: "Expanding Production Capacity",
    desc: "Between 2010 and 2012, the company added a 400 MT granulation plant and a 200 MT powder plant, significantly increasing its production capabilities. In 2010, we established a 100 MT granule production unit, marking our transformation into a large-scale manufacturer.",
  },
  {
    year: "2012",
    title: "Adding a Granulation Plant",
    desc: "Continuing our growth, we introduced a state-of-the-art 400 MT granulation plant in 2012. This advancement further strengthened our production capabilities, enabling us to cater to an expanding customer base effectively.",
  },
  {
    year: "2018",
    title: "Diversifying and Innovating",
    desc: "In 2018, we set a new standard for excellence by adding multiple granule coating plants with capacities of 30, 60, and 100 MT, along with a 15,000-liter liquid plant. This marked our commitment to diversifying product offerings and enhancing production efficiency.",
  },
];

const expertiseItems = [
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21a48.25 48.25 0 01-8.135-.687c-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
      </svg>
    ),
    title: "Organic Fertilizer Manufacturing",
    value: "2006",
    desc: "Pioneers in organic fertilizer manufacturing since 2006, specializing in eco-friendly mineral-coated granules and soil conditioners.",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    title: "Trusted Quality & Reliability",
    value: "150+",
    desc: "Trusted by government, semi-government, PSU, and corporate clients since inception for consistent quality and reliable supply.",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
    ),
    title: "Sustainable Agriculture",
    value: "100%",
    desc: "Committed to eco-friendly, sustainable farming solutions that protect the environment and promote long-term soil health.",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
      </svg>
    ),
    title: "Extensive Industry Experience",
    value: "15+",
    desc: "Over 15 years of manufacturing expertise with state-of-the-art granulation and coating facilities serving diverse agricultural sectors.",
  },
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

const infrastructureItems = [
  {
    img: images.factory,
    title: "Manufacturing Plant",
    desc: "Our facility features advanced granulation, coating, drying, and packaging lines. We have multiple plants including a 400 MT granulation plant and coating plants with capacities of 30, 60, and 100 MT.",
  },
  {
    img: images.lab,
    title: "Quality Assurance",
    desc: "Every batch is tested for quality and consistency before dispatch. Our commitment to quality has made us a trusted partner for government, semi-government, PSU, and corporate clients.",
  },
  {
    img: images.granules,
    title: "Precision Manufacturing",
    desc: "Our granulation technology produces uniform, high-quality granules in custom formulations. Specializing in organic manure, PDM, PROM, mycorrhiza-coated granules, and more.",
  },
];

import { useScrollReveal, staggerDelay } from "@/hooks/useScrollReveal";

export const AboutPage = () => {
  const statsReveal = useScrollReveal();
  const welcomeReveal = useScrollReveal();
  const missionReveal = useScrollReveal();
  const expertiseReveal = useScrollReveal();
  const historyReveal = useScrollReveal();
  const infraReveal = useScrollReveal();
  const teamReveal = useScrollReveal();
  const qualityReveal = useScrollReveal();

  return (
  <>
    <SEOHead
      title="About Us — J K Fertilizers | Organic Fertilizer Manufacturer Since 2006 | Anand, Gujarat"
      description="Learn about J K Fertilizers — India's trusted organic fertilizer manufacturer since 2006. Founded by Mr. Akash Dadhania in Anand, Gujarat. Specializing in Organic Manure, PDM, PROM, and coated granules."
      canonical="/about"
      ogImage="/images/about-1.jpg"
      keywords="about J K Fertilizers, organic fertilizer manufacturer gujarat, fertilizer company anand gujarat, Akash Dadhania, J K Fertilizers history, fertilizer manufacturer since 2006"
      schema={[organizationSchema, aboutPageSchema]}
    />
    {/* ── Hero ── */}
    <PageHero
      eyebrow="About Us"
      title="Delivering Premium Organic Solutions for Thriving Agriculture"
      description="J K Fertilizers, headquartered in Gujarat, India, began its journey in 2006. With a steadfast commitment to sustainable agriculture, we serve farmers, landscapers, and agricultural industries across India and beyond."
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

    {/* ── Welcome / Who We Are ── */}
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div
        ref={welcomeReveal.ref}
        className={`grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-center reveal ${welcomeReveal.isVisible ? 'visible' : ''}`}
      >
        <div className="space-y-7">
          <div className="inline-flex rounded-full border border-border bg-surface-overlay px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-primary">
            Welcome to J K Fertilizers
          </div>
          <h2 className="font-heading text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            We have Over 15 Years of Expertise in Sustainable Agriculture
          </h2>
          <p className="text-base leading-8 text-muted-foreground sm:text-lg">
            J K Fertilizers, headquartered in Gujarat, India, began its journey in <strong className="text-foreground">2006</strong>. With a steadfast commitment to sustainable agriculture, we serve farmers, landscapers, and agricultural industries across India and beyond. As a leader in organic fertilizer innovation, we specialize in producing eco-friendly, mineral-coated granules and soil conditioners that enhance soil health and improve crop yield.
          </p>
          <p className="text-base leading-8 text-muted-foreground sm:text-lg">
            Through ongoing research and development, we aim to empower growers with effective, environmentally sound solutions that support both productivity and sustainability.
          </p>
          <div className="flex flex-wrap gap-3 pt-1">
            {["Since 2006", "150+ Trusted Clients", "15+ Years", "Anand, Gujarat"].map((tag) => (
              <span key={tag} className="rounded-full border border-border bg-muted px-4 py-1.5 text-sm font-medium text-primary">
                {tag}
              </span>
            ))}
          </div>
        </div>
        <ImagePanel
          src={images.soil}
          alt="J K Fertilizers — sustainable agriculture"
          testId="about-welcome-image-panel"
          className="aspect-[4/4.7] min-h-[360px]"
          overlay={
            <div className="rounded-[24px] border border-white/30 bg-surface-overlay/94 p-5 shadow-[0_16px_50px_rgba(15,23,42,0.12)]">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">Our philosophy</p>
              <p className="mt-3 font-accent text-xl leading-8 text-primary">
                "Delivering Premium Organic Solutions for Thriving Agriculture"
              </p>
            </div>
          }
        />
      </div>
    </section>

    {/* ── Mission + Chairman ── */}
    <section className="bg-muted py-20 lg:py-28 section-wave">
      <div
        ref={missionReveal.ref}
        className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 reveal ${missionReveal.isVisible ? 'visible' : ''}`}
      >
        <div className="mb-12 text-center">
          <div className="inline-flex rounded-full border border-border bg-surface-overlay px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-primary">
            Important Historical Milestones
          </div>
          <h2 className="mt-5 font-heading text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Our History
          </h2>
        </div>
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Mission card */}
          <article className="flex flex-col justify-between rounded-[32px] border border-border bg-surface-card p-8 shadow-[0_16px_50px_rgba(16,24,40,0.05)]">
            <div>
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
                <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                </svg>
              </div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">Mission Statement</p>
              <h3 className="mt-4 font-heading text-xl font-semibold leading-8 text-foreground">
                To sustainably advance agricultural productivity and soil health.
              </h3>
              <p className="mt-4 text-base leading-8 text-muted-foreground">
                {company.mission}
              </p>
            </div>
            <div className="mt-8 border-t border-border pt-6">
              <p className="text-sm font-medium text-primary">Since 2006 · Anand, Gujarat</p>
            </div>
          </article>

          {/* Chairman card with image */}
          <article className="relative overflow-hidden rounded-[32px] bg-secondary p-8 text-white shadow-[0_16px_50px_rgba(16,24,40,0.12)]">
            <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-white/5 blur-3xl" />
            <div className="absolute bottom-0 left-0 h-32 w-32 rounded-full bg-accent/10 blur-2xl" />
            <div className="relative">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
              </div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/70">The Beginning of a Vision</p>
              <p className="mt-5 font-accent text-xl leading-9 text-white">
                "Founded in 2006 by Mr. Akash Dadhania, J K Fertilizers has consistently grown through strategic investments in infrastructure and expansion of production capacity, with a focus on organic fertilizers and a commitment to sustainable agricultural practices."
              </p>
              <div className="mt-8 flex items-center gap-4 border-t border-white/15 pt-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 text-lg font-bold text-white">
                  {company.founder.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-white">{company.founder}</p>
                  <p className="text-sm text-white/65">{company.founderTitle}, J K Fertilizers</p>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>

    {/* ── Manufacturing Expertise ── */}
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div
        ref={expertiseReveal.ref}
        className={`mb-14 text-center reveal ${expertiseReveal.isVisible ? 'visible' : ''}`}
      >
        <div className="inline-flex rounded-full border border-border bg-surface-overlay px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-primary">
          Our Manufacturing Expertise
        </div>
        <h2 className="mt-6 font-heading text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          Committed to Manufacturing the Best
        </h2>
        <p className="mx-auto mt-4 max-w-3xl text-base leading-8 text-muted-foreground sm:text-lg">
          With over 15 years of experience, we combine traditional expertise with modern technology to deliver premium organic fertilizer solutions.
        </p>
      </div>
      <div className={`grid gap-6 md:grid-cols-2 lg:grid-cols-4 reveal-scale ${expertiseReveal.isVisible ? 'visible' : ''}`}>
        {expertiseItems.map((item, i) => (
          <div
            key={item.title}
            {...staggerDelay(i, 100)}
            className="group flex flex-col rounded-[28px] border border-border bg-surface-card p-6 shadow-[0_16px_50px_rgba(16,24,40,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(16,24,40,0.1)]"
          >
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-white">
              {item.icon}
            </div>
            <p className="font-heading text-4xl font-bold text-primary">{item.value}</p>
            <p className="mt-3 font-heading text-lg font-semibold text-foreground">{item.title}</p>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>

    {/* ── Sustainability Pillars Ticker ── */}
    <section className="overflow-hidden border-y border-border bg-secondary py-6">
      <div className="flex gap-0 animate-none">
        <div className="flex shrink-0 animate-marquee items-center gap-0">
          {[...pillars, ...pillars].map((p) => (
            <span key={`marquee-p1-${p.replace(/\s/g, '-')}-${Math.random().toString(36).slice(2)}`} className="flex items-center gap-4 px-6 text-sm font-semibold uppercase tracking-[0.18em] text-white/80">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              {p}
            </span>
          ))}
        </div>
        <div aria-hidden className="flex shrink-0 animate-marquee items-center gap-0">
          {[...pillars, ...pillars].map((p) => (
            <span key={`marquee-p2-${p.replace(/\s/g, '-')}-${Math.random().toString(36).slice(2)}`} className="flex items-center gap-4 px-6 text-sm font-semibold uppercase tracking-[0.18em] text-white/80">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              {p}
            </span>
          ))}
        </div>
      </div>
    </section>

    {/* ── History / Timeline ── */}
    <section className="bg-muted py-20 lg:py-28 section-wave">
      <div
        ref={historyReveal.ref}
        className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 reveal ${historyReveal.isVisible ? 'visible' : ''}`}
      >
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          {/* Left: text + milestones */}
          <div className="space-y-8">
            <div className="space-y-5">
              <div className="inline-flex rounded-full border border-border bg-surface-overlay px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-primary">
                Our History
              </div>
              <h2 className="font-heading text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
                Important Historical Milestones
              </h2>
              <p className="text-base leading-8 text-muted-foreground">
                Since 2006, J K Fertilizers has been a leader in agricultural innovation. We began with a mission to revolutionize sustainable farming. Today, we are one of India's most trusted manufacturers of high-quality organic fertilizers and coated granules.
              </p>
            </div>
            {/* Timeline */}
            <div className="relative space-y-0">
              {milestones.map((m, i) => (
                <div key={m.title} className="relative flex items-start gap-4 sm:gap-6 pb-12 last:pb-0 group">
                  {i !== milestones.length - 1 && (
                    <div className="absolute left-[11px] top-[26px] bottom-[-8px] w-0.5 bg-primary/20" />
                  )}
                  <div className="relative mt-[2px] shrink-0 flex h-6 w-6 items-center justify-center rounded-full border-2 border-primary bg-muted shadow-sm z-10 transition-transform duration-300 group-hover:scale-110">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 md:gap-4 mb-2">
                      <div className="inline-flex h-[26px] items-center justify-center shrink-0 rounded-full bg-primary/10 px-3 text-xs font-bold text-primary">
                        {m.year}
                      </div>
                      <h4 className="font-heading text-lg font-semibold text-foreground">{m.title}</h4>
                    </div>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">{m.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Right: factory image */}
          <ImagePanel
            src={images.factory}
            alt="J K Fertilizers manufacturing facility — over 15 years of growth"
            testId="about-history-image-panel"
            className="aspect-4/5 min-h-[400px] lg:sticky lg:top-24"
            overlay={
              <div className="rounded-[24px] border border-white/30 bg-secondary/90 p-5 shadow-[0_16px_50px_rgba(15,23,42,0.18)]">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/70">Where we operate</p>
                <p className="mt-2 font-heading text-base font-semibold text-white">Vasad, Anand — Gujarat, India</p>
                <p className="mt-1 text-sm text-white/65">{company.address}</p>
              </div>
            }
          />
        </div>
      </div>
    </section>

    {/* ── Infrastructure ── */}
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div
        ref={infraReveal.ref}
        className={`mb-14 text-center reveal ${infraReveal.isVisible ? 'visible' : ''}`}
      >
        <div className="inline-flex rounded-full border border-border bg-surface-overlay px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-primary">
          Our Infrastructure
        </div>
        <h2 className="mt-6 font-heading text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          Built for Quality. Built for Scale.
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
          From our initial organic manure plant to advanced granulation and coating facilities — every expansion has been driven by our commitment to excellence.
        </p>
      </div>
      <div className={`grid gap-8 md:grid-cols-3 reveal-scale ${infraReveal.isVisible ? 'visible' : ''}`}>
        {infrastructureItems.map((item, i) => (
          <div key={item.title} {...staggerDelay(i, 100)} className="group overflow-hidden rounded-[28px] border border-border bg-surface-card shadow-[0_16px_50px_rgba(16,24,40,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(16,24,40,0.1)]">
            <div className="relative h-52 overflow-hidden">
              <img
                src={item.img}
                alt={item.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-linear-to-t from-foreground/30 via-transparent to-transparent" />
            </div>
            <div className="p-6">
              <h3 className="font-heading text-lg font-semibold text-foreground">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>

    {/* ── Team + Products + Partnership ── */}
    <section className="bg-muted py-20 lg:py-28 section-wave">
      <div
        ref={teamReveal.ref}
        className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 reveal ${teamReveal.isVisible ? 'visible' : ''}`}
      >
        <div className="mb-12 text-center">
          <div className="inline-flex rounded-full border border-border bg-surface-overlay px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-primary">
            What Makes Us Different
          </div>
          <h2 className="mt-6 font-heading text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Trusted By Clients, Driven by Quality
          </h2>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {[
            {
              img: images.partnership,
              title: "Trusted By Government & Corporate",
              badge: "Trusted",
              desc: "We have been a trusted manufacturer for government, semi-government, PSU, and corporate clients since inception. Our commitment to quality and reliability has earned us their confidence.",
              cta: { label: "Our clients", href: "/portfolio" },
            },
            {
              img: images.granules,
              title: "Our Products",
              badge: "Products",
              desc: "A wide range of organic fertilizers including Organic Manure, PDM, PROM, Mycorrhiza Granules, Coated Granules, Base Granules, and specialty products — all FCO approved.",
              cta: { label: "View products", href: "/products" },
            },
            {
              img: images.lab,
              title: "Sustainable Agricultural Solutions",
              badge: "Sustainability",
              desc: "With over 15 years of experience and state-of-the-art facilities, we deliver sustainable, eco-friendly solutions that enhance soil health and promote environmental well-being.",
              cta: { label: "Learn more", href: "/services" },
            },
          ].map((item) => (
            <div
              key={item.badge}
              className="group flex flex-col overflow-hidden rounded-[28px] border border-border bg-surface-card shadow-[0_16px_50px_rgba(16,24,40,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(16,24,40,0.1)]"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={item.img}
                  alt={item.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-linear-to-t from-foreground/40 via-transparent to-transparent" />
                <span className="absolute left-4 top-4 rounded-full bg-secondary/90 px-3 py-1 text-xs font-semibold text-white">
                  {item.badge}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-heading text-xl font-semibold text-foreground">{item.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-6 text-muted-foreground">{item.desc}</p>
                <Button asChild variant="outline" className="mt-6 h-10 w-fit rounded-full border-primary px-5 text-primary hover:bg-primary hover:text-white">
                  <Link to={item.cta.href}>{item.cta.label}</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* ── Quality Commitment Banner ── */}
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div
        ref={qualityReveal.ref}
        className={`grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center reveal ${qualityReveal.isVisible ? 'visible' : ''}`}
      >
        <ImagePanel
          src={images.granules}
          alt="Premium organic fertilizer products"
          testId="about-granules-image-panel"
          className="aspect-4/4.5 min-h-[360px]"
          overlay={
            <div className="rounded-[24px] border border-white/30 bg-primary/90 p-5 shadow-[0_16px_50px_rgba(15,23,42,0.18)]">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/70">Experience</p>
              <p className="mt-2 font-heading text-3xl font-bold text-white">15+ Years</p>
              <p className="mt-1 text-sm text-white/70">Trusted by 150+ clients · Since 2006</p>
            </div>
          }
        />
        <div className="space-y-7">
          <div className="inline-flex rounded-full border border-border bg-surface-overlay px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-primary">
            100% Organic Products
          </div>
          <h2 className="font-heading text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Committed to Quality & Sustainability
          </h2>
          <p className="text-base leading-8 text-muted-foreground sm:text-lg">
            We believe that to grow healthy crops, high-quality, eco-friendly soil solutions are the key. Every product we manufacture is a step towards a more sustainable future for Indian agriculture.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { title: "No Chemicals Used", desc: "100% organic products free from harmful chemicals" },
              { title: "Sustainable Practices", desc: "Eco-friendly manufacturing that protects the environment" },
              { title: "Customer Centric", desc: "Tailored solutions for every farmer's unique needs" },
              { title: "Innovation Driven", desc: "Continuous R&D for better, sustainable products" },
            ].map((item) => (
              <div key={item.title} className="flex gap-3 rounded-[20px] border border-border bg-surface-card p-4">
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-accent/20">
                  <svg className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                <div>
                  <p className="font-heading text-sm font-semibold text-foreground">{item.title}</p>
                  <p className="mt-0.5 text-xs leading-5 text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* ── CTA ── */}
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
        </div>
      </div>
    </section>
  </>
  );
};
