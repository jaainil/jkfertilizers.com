import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/PageHero";
import { ImagePanel } from "@/components/ImagePanel";
import { SEOHead } from "@/components/SEOHead";
import { organizationSchema, aboutPageSchema } from "@/data/seoSchemas";

const company = {
  name: "Adit Biorganic",
  tagline: "Organic Naturally",
  subTagline: "Nurturing Farms, Preserving Nature",
  missionTagline: "EVERY CROP COUNTS. EVERY FARMER MATTERS.",
  legalTagline: "India's Leading B2B Fertilizer Manufacturer - ISO 9001:2015 Certified",
  heroTitle: "The Future of Sustainable Agriculture",
  heroSubtitle:
    "As pioneers in organic fertilizers, we provide nutrient-rich, sustainable solutions to enhance your crop yield and protect the land for generations to come.",
  aboutIntro: "Leading manufacturer of premium organic fertilizer granules",
  aboutDetails: "At Adit Biorganic, we are dedicated to sustainability by providing the agriculture industry with efficient and effective organic granular fertilizer solutions. As a leading ISO 9001:2015 certified manufacturer, we specialize in high-quality, customized nutrient base and coating granules. We partner with companies across India to produce the innovative, eco-friendly products that enhance soil health and maximize crop yield.",
  mission: "Our mission is to empower farmers and fertilizer brands with high-quality organic solutions that enhance soil health, improve crop yield, and promote environmental sustainability. We strive to be at the forefront of agricultural innovation, making a positive impact on the planet.",
  chairmanMessage: "I am proud to lead a team that is committed to excellence in organic agriculture. Our mission is not just about business but about contributing positively to the environment. With our innovative products and dedicated team, we aim to create a sustainable future for agriculture.",
  philosophy: "Quality You Can Trust, Results You Can See - Every product is manufactured using state-of-the-art technology under ISO 9001:2015 certified processes.",
  phoneDisplay: "+91 98250 45894",
  phoneRaw: "+919825045894",
  emails: ["info@aditbiorganic.com", "sales@aditbiorganic.com"],
  address: "S. No. 1152, Kanatalavdi Road, Adas, Anand, Gujarat - 388305",
  founder: "Akash Dadhania",
  founderTitle: "Founder & Director",
};

const images = {
  hero: "/images/hero.jpg",
  factory: "/images/factory.jpg",
  granules: "/images/granules.jpg",
  soil: "/images/soil.jpg",
  lab: "/images/lab.jpg",
  partnership: "/images/partnership.jpg",
};

const stats = [
  { value: "190+", unit: "MT", label: "Daily Production Capacity" },
  { value: "50+", unit: "", label: "Trusted B2B Partners" },
  { value: "10+", unit: "Yrs", label: "Industry Experience" },
  { value: "24/7", unit: "", label: "Operations" },
];

const milestones = [
  {
    year: "Est.",
    title: "Company Founded",
    desc: "Adit Biorganic was established with a bold mission — to pioneer sustainable organic granular fertilizer manufacturing in Gujarat.",
  },
  {
    year: "ISO",
    title: "ISO 9001:2015 Certified",
    desc: "Achieved ISO 9001:2015 certification for our in-house laboratory, setting the gold standard for quality assurance in every batch.",
  },
  {
    year: "190+",
    title: "MT/Day Capacity",
    desc: "Scaled our manufacturing to 190+ MT per day with 24/7 operations — making us one of India's highest-capacity organic granule producers.",
  },
  {
    year: "50+",
    title: "B2B Partnerships",
    desc: "Earned the trust of 50+ leading agricultural brands across India through consistent quality, volume, and customized formulations.",
  },
];

const expertiseItems = [
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21a48.25 48.25 0 01-8.135-.687c-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
      </svg>
    ),
    title: "Custom Recipe Formulations",
    value: "98%",
    desc: "We manufacture unique mineral and organic 'Recipe Granules' tailored to your specific nutrient and coating requirements.",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    title: "Guaranteed Quality Assurance",
    value: "100%",
    desc: "Our in-house, ISO 9001:2015 certified laboratory ensures every batch meets the highest standards for purity and consistency.",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
    ),
    title: "Environmentally Friendly",
    value: "100%",
    desc: "Our products are designed to enhance long-term soil health, support microbial life, and promote sustainable agriculture.",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
      </svg>
    ),
    title: "Reliable B2B Partnership",
    value: "190+",
    desc: "With 190+ MT/day capacity and 24/7 operations, we deliver cost-effective, high-volume manufacturing solutions on time.",
  },
];

const pillars = [
  "Sustainable Inputs",
  "Strict Quality Assurance",
  "Custom Formulations",
  "High-Volume Capacity",
  "ISO 9001:2015 Certified",
  "Eco-Friendly Production",
  "24/7 Operations",
  "B2B Trusted Partner",
];

const infrastructureItems = [
  {
    img: images.factory,
    title: "State-of-the-Art Manufacturing Plant",
    desc: "Our facility features advanced granulation, coating, drying, and packaging lines running 24/7 to meet the highest volumes without compromising quality.",
  },
  {
    img: images.lab,
    title: "In-House ISO-Certified Laboratory",
    desc: "Every batch is tested in our on-site laboratory accredited under ISO 9001:2015, ensuring purity, consistency, and compliance before dispatch.",
  },
  {
    img: images.granules,
    title: "Precision Granulation Technology",
    desc: "Our granulation technology produces uniform, dust-free granules in custom sizes and formulations — the foundation for superior fertilizer products.",
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
      title="About Us — ISO Certified Organic Fertilizer Manufacturer, Anand Gujarat"
      description="Learn about Adit Biorganic — India's leading ISO 9001:2015 certified B2B organic fertilizer granule manufacturer. Founded by Akash Dadhania in Anand, Gujarat. 190+ MT/day, 50+ B2B partners, 10+ years experience."
      canonical="/about"
      ogImage="/images/factory.jpg"
      keywords="about adit biorganic, organic fertilizer manufacturer gujarat, ISO 9001 fertilizer manufacturer india, fertilizer company anand gujarat, Akash Dadhania, b2b fertilizer manufacturer gujarat"
      schema={[organizationSchema, aboutPageSchema]}
    />
    {/* ── Hero ── */}
    <PageHero
      eyebrow="About us"
      title="Pioneers in Sustainable Agriculture Manufacturing"
      description="We are dedicated to manufacturing superior organic fertilizers that empower our B2B partners and preserve the environment."
      imageSrc={images.factory}
      imageAlt="Adit Biorganic factory and operations"
      badges={["ISO 9001:2015 Certified", "190+ MT/Day Capacity", "Anand, Gujarat"]}
      primaryCta={
        <Button asChild className="h-12 rounded-full bg-primary px-6 text-white hover:bg-primary/90">
          <Link to="/contact">Talk to our team</Link>
        </Button>
      }
      secondaryCta={
        <Button asChild variant="outline" className="h-12 rounded-full border-primary px-6 text-primary hover:bg-primary hover:text-white">
          <Link to="/products">Review products</Link>
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
            Welcome to Adit Biorganic
          </div>
          <h2 className="font-heading text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Advanced Custom Fertilizer Manufacturing
          </h2>
          <p className="text-base leading-8 text-muted-foreground sm:text-lg">
            Adit Biorganic is an <strong className="text-foreground">ISO 9001:2015 certified</strong> company and a pioneer in sustainable agriculture. We specialize in manufacturing high-quality, customized nutrient base and coating granular fertilizers — and we are a trusted B2B partner for leading agricultural companies across India.
          </p>
          <p className="text-base leading-8 text-muted-foreground sm:text-lg">
            With over a decade of experience, our state-of-the-art facilities and 24/7 operations can produce over <strong className="text-foreground">190 MT per day</strong>. Our mission is to empower farmers and support our partners by providing innovative, eco-friendly solutions that enhance soil health and promote environmental sustainability.
          </p>
          <div className="flex flex-wrap gap-3 pt-1">
            {["ISO 9001:2015", "190+ MT/Day", "10+ Years", "Anand, Gujarat"].map((tag) => (
              <span key={tag} className="rounded-full border border-border bg-muted px-4 py-1.5 text-sm font-medium text-primary">
                {tag}
              </span>
            ))}
          </div>
        </div>
        <ImagePanel
          src={images.soil}
          alt="Hands holding healthy soil — the foundation of everything we make"
          testId="about-welcome-image-panel"
          className="aspect-[4/4.7] min-h-[360px]"
          overlay={
            <div className="rounded-[24px] border border-white/30 bg-surface-overlay/94 p-5 shadow-[0_16px_50px_rgba(15,23,42,0.12)]">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">Our philosophy</p>
              <p className="mt-3 font-accent text-xl leading-8 text-primary">
                "Quality You Can Trust, Results You Can See."
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
            Our Purpose
          </div>
          <h2 className="mt-5 font-heading text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Mission & Leadership
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
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">Our Mission</p>
              <h3 className="mt-4 font-heading text-xl font-semibold leading-8 text-foreground">
                Empowering farmers. Preserving the planet.
              </h3>
              <p className="mt-4 text-base leading-8 text-muted-foreground">
                {company.mission}
              </p>
            </div>
            <div className="mt-8 border-t border-border pt-6">
              <p className="text-sm font-medium text-primary">ISO 9001:2015 Certified · Anand, Gujarat</p>
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
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/70">A Message from Our Chairman</p>
              <p className="mt-5 font-accent text-xl leading-9 text-white">
                "{company.chairmanMessage}"
              </p>
              <div className="mt-8 flex items-center gap-4 border-t border-white/15 pt-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 text-lg font-bold text-white">
                  {company.founder.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-white">{company.founder}</p>
                  <p className="text-sm text-white/65">{company.founderTitle}, Adit Biorganic</p>
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
          We combine over a decade of experience with state-of-the-art technology to be the most trusted B2B partner in India.
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
                Key Milestones in Our Manufacturing Journey
              </h2>
              <p className="text-base leading-8 text-muted-foreground">
                For over a decade, Adit Biorganic has been a leader in agricultural innovation. We began with a mission to revolutionize sustainable farming. Today, we are one of India's most trusted B2B partners for high-quality, customized organic granular fertilizers.
              </p>
            </div>
            {/* Timeline */}
            <div className="relative space-y-0">
              {milestones.map((m, i) => (
                <div key={m.title} className="relative flex items-start gap-4 sm:gap-6 pb-12 last:pb-0 group">
                  {/* Vertical connecting line */}
                  {i !== milestones.length - 1 && (
                    <div className="absolute left-[11px] top-[26px] bottom-[-8px] w-0.5 bg-primary/20" />
                  )}
                  {/* Circle */}
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
            alt="Adit Biorganic manufacturing facility — a decade of growth"
            testId="about-history-image-panel"
            className="aspect-4/5 min-h-[400px] lg:sticky lg:top-24"
            overlay={
              <div className="rounded-[24px] border border-white/30 bg-secondary/90 p-5 shadow-[0_16px_50px_rgba(15,23,42,0.18)]">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/70">Where we operate</p>
                <p className="mt-2 font-heading text-base font-semibold text-white">Anand, Gujarat — India</p>
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
          Our Advanced Infrastructure
        </div>
        <h2 className="mt-6 font-heading text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          Built for Scale. Built for Quality.
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
          From state-of-the-art granulation lines to our in-house ISO-certified lab and spacious warehouses — every corner of our facility is engineered for excellence.
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
            People, Products & Partnerships
          </h2>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {[
            {
              img: images.partnership,
              title: "Our Expert Team",
              badge: "People",
              desc: "Our team comprises dedicated professionals with a shared passion for sustainable agriculture — from skilled technicians to agricultural experts — all working to deliver top-notch organic fertilizers.",
              cta: { label: "Join us", href: "/contact" },
            },
            {
              img: images.granules,
              title: "Our Products",
              badge: "Products",
              desc: "A wide range of organic and mineral-based granular fertilizers including Mineral Base, Bio-Fertilizer, Bio-Stimulant, Micro-Nutrient, and Pesticide Base Granules — all custom-formulated.",
              cta: { label: "View products", href: "/products" },
            },
            {
              img: images.lab,
              title: "B2B Partnerships",
              badge: "Partnerships",
              desc: "With a 190+ MT/day capacity, ISO-certified quality, and decades of manufacturing discipline, we are the trusted B2B backbone for leading fertilizer brands across India.",
              cta: { label: "Partner with us", href: "/contact" },
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
          alt="Premium organic granular fertilizer granules — our core product"
          testId="about-granules-image-panel"
          className="aspect-4/4.5 min-h-[360px]"
          overlay={
            <div className="rounded-[24px] border border-white/30 bg-primary/90 p-5 shadow-[0_16px_50px_rgba(15,23,42,0.18)]">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/70">Production capacity</p>
              <p className="mt-2 font-heading text-3xl font-bold text-white">190+ MT/Day</p>
              <p className="mt-1 text-sm text-white/70">24/7 operations · 10+ years</p>
            </div>
          }
        />
        <div className="space-y-7">
          <div className="inline-flex rounded-full border border-border bg-surface-overlay px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-primary">
            100+ Organic Products
          </div>
          <h2 className="font-heading text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Committed to Quality & Sustainability
          </h2>
          <p className="text-base leading-8 text-muted-foreground sm:text-lg">
            We believe that to grow healthy crops, high-quality, eco-friendly soil solutions are the key. Every product we manufacture is a step towards a more sustainable future for Indian agriculture.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { title: "Sustainable Inputs", desc: "Eco-friendly raw materials that protect soil health" },
              { title: "Strict Quality Assurance", desc: "ISO certified testing for every batch produced" },
              { title: "Custom Formulations", desc: "Tailored nutrient solutions for your specific needs" },
              { title: "High-Volume Capacity", desc: "190+ MT/day to meet even the largest orders" },
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
          Ready to Partner with India's Most Trusted Fertilizer Manufacturer?
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
