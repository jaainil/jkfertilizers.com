import { Link } from "react-router-dom";
import { ArrowRight, PhoneCall, CheckCircle2, ChevronRight, MoveRight, Leaf, Award, Sprout } from "lucide-react";
import { products } from "@/data/products";
import { Button } from "@/components/ui/button";
import { ImagePanel } from "@/components/ImagePanel";
import { ExpertiseCard } from "@/components/ExpertiseCard";
import { ServiceCard } from "@/components/ServiceCard";
import { InsightCard } from "@/components/InsightCard";
import { InquiryForm } from "@/components/InquiryForm";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { SEOHead } from "@/components/SEOHead";
import { organizationSchema, websiteSchema, homeFaqSchema } from "@/data/seoSchemas";
import { getAllBlogs } from "@/lib/content";
import { useScrollReveal, staggerDelay } from "@/hooks/useScrollReveal";

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
  aboutDetails:
    "At Adit Biorganic, we are dedicated to sustainability by providing the agriculture industry with efficient and effective organic granular fertilizer solutions. As a leading ISO 9001:2015 certified manufacturer, we specialize in high-quality, customized nutrient base and coating granules. We partner with companies across India to produce the innovative, eco-friendly products that enhance soil health and maximize crop yield.",
  mission:
    "Our mission is to empower farmers and fertilizer brands with high-quality organic solutions that enhance soil health, improve crop yield, and promote environmental sustainability. We strive to be at the forefront of agricultural innovation, making a positive impact on the planet.",
  chairmanMessage:
    "I am proud to lead a team that is committed to excellence in organic agriculture. Our mission is not just about business but about contributing positively to the environment. With our innovative products and dedicated team, we aim to create a sustainable future for agriculture.",
  philosophy:
    "Quality You Can Trust, Results You Can See - Every product is manufactured using state-of-the-art technology under ISO 9001:2015 certified processes.",
  phoneDisplay: "+91 98250 45894",
  phoneRaw: "+919825045894",
  emails: ["info@aditbiorganic.com", "sales@aditbiorganic.com"],
  address: "S. No. 1152, Kanatalavdi Road, Adas, Anand, Gujarat - 388305",
  founder: "Akash Dadhania",
  founderTitle: "Founder & Director",
};

const heroStats = [
  { value: "190+", unit: "MT", label: "Daily Production Capacity" },
  { value: "50+", unit: "", label: "Trusted B2B Partners" },
  { value: "10+", unit: "Yrs", label: "Industry Experience" },
  { value: "ISO", unit: "", label: "9001:2015 Certified" },
];

const expertiseCards = [
  {
    icon: "leaf",
    title: "Customized Organic Solutions",
    description:
      'We specialize in "Recipe Granules," creating unique organic and mineral-based formulas tailored to your specific nutrient and coating requirements.',
  },
  {
    icon: "shield",
    title: "Absolute Quality",
    description:
      "Our state-of-the-art testing laboratory and ISO 9001:2015 certification ensure every batch meets the highest standards for consistency and purity.",
  },
  {
    icon: "factory",
    title: "Environmentally Friendly",
    description:
      "Our products are designed to enhance long-term soil health, support beneficial microbial life, and promote sustainable agriculture.",
  },
  {
    icon: "flask",
    title: "Reliable B2B Partnership",
    description:
      "With a massive 190+ MT/day capacity and over a decade of experience, we deliver high-volume, cost-effective manufacturing solutions on time, every time.",
  },
];

const services = [
  {
    title: "Granule Manufacturing",
    concept: "190+ MT/day capacity",
    description:
      "Production of high-quality organic and mineral 'Recipe Granules' — a superior, customizable alternative to standard bentonite. Tailored to client-specific formulation requirements with 24/7 operations.",
    icon: "factory",
    imageSrc: "/images/service-bg-1.jpg",
  },
  {
    title: "Custom Formulation",
    concept: "Client-specific recipe development",
    description:
      "Unique nutrient profiles using materials like Gypsum, Dolomite, organic compost, and mineral blends. Supports diverse crop types and agricultural requirements.",
    icon: "flask",
    imageSrc: "/images/service-bg-2.jpg",
  },
  {
    title: "Contract Manufacturing",
    concept: "Your brand, our facility",
    description:
      "Full-scale white-label/contract manufacturing for B2B fertilizer brands. Cost-effective, high-volume production with consistent batch-to-batch quality assurance.",
    icon: "leaf",
    imageSrc: "/images/service-bg-3.jpg",
  },
  {
    title: "Precision Coating Services",
    concept: "Active ingredient application",
    description:
      "Application of active ingredients, liquids, or powders onto base granules. Ensures uniform coating and reliable field performance.",
    icon: "shield",
    imageSrc: "/images/service-bg-4.jpg",
  },
  {
    title: "Laboratory & Testing",
    concept: "ISO 9001:2015 certified",
    description:
      "In-house testing for purity, consistency, and performance on every batch. Strict quality assurance at every stage guarantees every product meets exact client specifications before dispatch.",
    icon: "package",
    imageSrc: "/images/service-bg-5.jpg",
  },
  {
    title: "Packaging & Dispatch",
    concept: "Market-ready finishing",
    description:
      "We support filling, packing, and brand-forward presentation so your finished output is easier to launch and distribute. Comprehensive logistics support for Pan-India delivery.",
    icon: "warehouse",
    imageSrc: "/images/service-bg-6.jpg",
  },
];

const insightPosts = getAllBlogs().slice(0, 3);

const partnerBenefits = [
  "Over a decade of manufacturing experience",
  "24/7 operations for advanced organic granular fertilizers",
  "State-of-the-art facilities and robust R&D",
  "Customized, eco-friendly solutions that improve soil health",
  "Boost farm productivity nationwide",
];

const images = {
  hero: "/images/hero.jpg",
  factory: "/images/factory.jpg",
  granules: "/images/granules.jpg",
  soil: "/images/soil.jpg",
  lab: "/images/lab.jpg",
  partnership: "/images/partnership.jpg",
  facilityOverview: "/images/facility-overview.jpg",
  biopestGranulesHero: "/images/bio-pesticide-granules-hero.jpg",
  productsOverview: "/images/products-overview.png",
};

const productTicker = [
  { name: "Pesticide Base Granules", img: "/images/products/pesticide-base-granules.png" },
  { name: "Base Granules", img: "/images/products/base-granules.png" },
  { name: "Organic Base Granules", img: "/images/products/organic-base-granules.png" },
  { name: "Mineral Base Granules", img: "/images/products/mineral-base-granules.png" },
  { name: "Bio-Fertilizer Base Granules", img: "/images/products/bio-fertilizer-base-granules.png" },
  { name: "Bio-Stimulant Base Granules", img: "/images/products/bio-stimulant-base-granules.png" },
  { name: "Mix Micro Base Granules", img: "/images/products/mix-micro-base-granules.png" },
  { name: "Bio-Pesticide Base Granules", img: "/images/products/bio-pesticide-base-granules.png" },
];

const HomePage = () => {
  const heroReveal = useScrollReveal();
  const statsReveal = useScrollReveal();
  const facilityReveal = useScrollReveal();
  const section1Reveal = useScrollReveal();
  const aboutReveal = useScrollReveal();
  const cardsReveal = useScrollReveal();
  const section2Reveal = useScrollReveal();
  const carouselReveal = useScrollReveal();
  const servicesReveal = useScrollReveal();
  const blogReveal = useScrollReveal();
  const contactReveal = useScrollReveal();

  return (
  <>
    <SEOHead
      title="India's #1 B2B Organic Fertilizer Granule Manufacturer | Anand, Gujarat"
      description="Adit Biorganic — ISO 9001:2015 certified organic fertilizer granule manufacturer in Anand, Gujarat. 190+ MT/day capacity. Mineral, Bio-Fertilizer, Bio-Stimulant, Organic Base Granules. Custom formulation, contract manufacturing & worldwide export."
      canonical="/"
      ogImage="/images/hero.jpg"
      keywords="organic fertilizer manufacturer india, granule fertilizer manufacturer gujarat, b2b fertilizer manufacturer, bio fertilizer manufacturer, organic base granules manufacturer, mineral base granules, fertilizer exporter india, anand gujarat fertilizer, ISO certified fertilizer manufacturer, custom fertilizer formulation"
      schema={[organizationSchema, websiteSchema, homeFaqSchema]}
      article={null}
      product={null}
    />

    {/* ── Hero ── */}
    <section className="relative overflow-hidden bg-background">
      {/* Layered atmospheric background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 -top-32 h-[700px] w-[700px] rounded-full bg-primary/6 blur-[120px]" />
        <div className="absolute right-0 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-accent/5 blur-[100px]" />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
            backgroundSize: "200px 200px",
          }}
        />
      </div>

      <div 
        ref={heroReveal.ref}
        className={`relative mx-auto grid grid-cols-1 max-w-7xl gap-8 px-4 py-10 sm:px-6 sm:py-14 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:px-8 lg:py-28 reveal ${heroReveal.isVisible ? 'visible' : ''}`}
      >
        <div className="space-y-6 sm:space-y-8">
          {/* Eyebrow pill */}
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/8 px-4 py-2 text-xs font-bold uppercase tracking-[0.28em] text-primary">
            <span className="flex h-1.5 w-1.5 rounded-full bg-accent" style={{ animation: "pulse-dot 2s ease-in-out infinite" }} />
            {company.tagline}
          </div>

          <div className="space-y-4">
            {/* FIX 1.3: text-3xl base → text-5xl sm → text-6xl lg → text-7xl xl */}
            <h1 className="max-w-4xl font-heading type-hero-h1 font-bold tracking-tight text-foreground text-balance">
              {company.subTagline}
            </h1>
            <p className="max-w-xl type-body text-muted-foreground">
              {company.heroSubtitle}
            </p>
          </div>

          {/* Tag badge */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-accent-foreground/80">
              <Award className="h-3 w-3 text-accent" />
              {company.missionTagline}
            </span>
          </div>

          {/* FIX 1.4: h-12 (standard), px-5 sm:px-7, text-sm sm:text-base */}
          <div className="flex flex-wrap gap-3">
            <Button
              asChild
              className="h-12 rounded-full bg-primary px-5 text-sm font-semibold text-white shadow-[0_6px_28px_rgba(45,122,74,0.35)] hover:bg-primary/90 hover:shadow-[0_8px_36px_rgba(45,122,74,0.45)] transition-all duration-300 sm:px-7 sm:text-base"
            >
              <Link to="/services">
                Explore Our Services
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-12 rounded-full border-primary/30 bg-primary/5 px-5 text-sm font-semibold text-primary hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 sm:px-7 sm:text-base"
            >
              <a href={`tel:${company.phoneRaw}`}>
                <PhoneCall className="h-4 w-4" />
                Call Us
              </a>
            </Button>
          </div>

          {/* FIX 1.5: hide pipe separators — use gap only, no orphan risk */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-border/60 pt-5">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Leaf className="h-3.5 w-3.5 shrink-0 text-primary" />
              <span>190+ MT/day capacity</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Sprout className="h-3.5 w-3.5 shrink-0 text-primary" />
              <span>ISO 9001:2015 Certified</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Award className="h-3.5 w-3.5 shrink-0 text-accent" />
              <span>50+ B2B Partners</span>
            </div>
          </div>
        </div>

        {/* Hero image — shorter on mobile, tall on desktop; eager-loads as LCP */}
        <div className="ken-burns">
          <ImagePanel
            src={images.hero}
            alt="Aerial sustainable agriculture field"
            eager
            className="aspect-[4/3] min-h-52 sm:min-h-72 lg:aspect-[4/4.6] lg:min-h-[38rem]"
            overlay={
            <div className="grid gap-2 grid-cols-2">
              <div className="rounded-xl border border-white/30 bg-surface-overlay/92 p-3 shadow-[0_16px_50px_rgba(22,61,38,0.15)] backdrop-blur-sm sm:rounded-2xl sm:p-4">
                <p className="type-label font-bold uppercase tracking-[0.22em] text-muted-foreground">Our promise</p>
                <p className="mt-1 font-heading text-sm font-bold text-foreground sm:mt-2 sm:text-base">Consistency at scale</p>
                <p className="mt-1 hidden type-label text-muted-foreground sm:block">Granules engineered for repeatability and dependable supply.</p>
              </div>
              <div className="rounded-xl border border-white/20 p-3 text-white shadow-[0_16px_50px_rgba(22,61,38,0.2)] sm:rounded-2xl sm:p-4" style={{ background: "linear-gradient(135deg, #2D7A4A, #163D26)" }}>
                <p className="type-label font-bold uppercase tracking-[0.22em] text-white/70">Why Adit Biorganic</p>
                <p className="mt-1 font-heading text-sm font-bold sm:mt-2 sm:text-base">Industrial discipline, organic intent</p>
                <div className="mt-1 flex items-center gap-1.5 sm:mt-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" style={{ animation: "pulse-dot 2s ease-in-out infinite" }} />
                  <span className="type-label text-white/70">10+ years experience</span>
                </div>
              </div>
            </div>
          }
        />
        </div>
      </div>
    </section>

    {/* ── Stats Bar ── */}
    <section className="relative z-10 -mt-10 px-4 pb-4 sm:px-6 lg:px-8">
      <div 
        ref={statsReveal.ref}
        className={`mx-auto grid max-w-7xl gap-3 grid-cols-2 md:grid-cols-4 sm:gap-4 reveal-scale ${statsReveal.isVisible ? 'visible' : ''}`}
      >
        {heroStats.map((item, i) => (
          <div
            key={item.label}
            className="group relative rounded-2xl border border-border bg-surface-card p-4 shadow-[0_12px_40px_rgba(22,61,38,0.07)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_56px_rgba(22,61,38,0.14)] hover:border-primary/20 sm:rounded-[28px] sm:p-6"
            {...staggerDelay(i, 100)}
          >
            <div className="pointer-events-none absolute right-3 top-3 h-16 w-16 rounded-full bg-primary/5 blur-lg group-hover:bg-primary/10 transition-colors duration-300" />
            {/* FIX 1.7 + 1.8: text-2xl on mobile, text-3xl on sm+ */}
            <p className="font-heading text-2xl font-extrabold text-primary sm:text-3xl">
              {item.value}
              {item.unit && <span className="ml-1 text-base font-medium text-muted-foreground sm:text-xl">{item.unit}</span>}
            </p>
            <p className="mt-1.5 text-xs font-medium leading-5 text-muted-foreground uppercase tracking-wide sm:mt-2">{item.label}</p>
          </div>
        ))}
      </div>
    </section>

    {/* ── Second Hero Panel ── */}
    <section className="mx-auto max-w-7xl px-4 pt-14 pb-10 sm:px-6 sm:pt-20 sm:pb-12 lg:px-8 lg:pt-32 lg:pb-16">
      <div 
        ref={facilityReveal.ref}
        className={`grid grid-cols-1 gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-10 reveal ${facilityReveal.isVisible ? 'visible' : ''}`}
      >
        <ImagePanel
          src={images.facilityOverview}
          alt="Adit Biorganic facility overview"
          className="aspect-[4/3] min-h-52 sm:min-h-64 lg:min-h-72"
          overlay={
            <div className="rounded-2xl border border-white/25 p-4 shadow-[0_16px_50px_rgba(22,61,38,0.22)] backdrop-blur-md sm:rounded-3xl sm:p-5" style={{ background: "linear-gradient(135deg, rgba(22,61,38,0.92), rgba(45,122,74,0.88))" }}>
              <p className="type-label font-bold uppercase tracking-[0.22em] text-white/60">ISO 9001:2015 Certified</p>
              <p className="mt-1 font-heading text-sm font-bold text-white sm:mt-2 sm:text-base">"Quality You Can Trust. Results You Can See."</p>
              <div className="mt-2 flex items-center gap-2">
                <Award className="h-3.5 w-3.5 text-accent" />
                <span className="text-xs font-semibold text-accent">India's Leading B2B Manufacturer</span>
              </div>
            </div>
          }
        />
        <div className="space-y-5 sm:space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/8 px-4 py-2 text-xs font-bold uppercase tracking-[0.28em] text-primary">
            <Leaf className="h-3 w-3" />
            {company.heroTitle}
          </div>
          <h2 className="font-heading type-section-h2 font-bold tracking-tight text-foreground text-balance">
            Quality You Can Trust. <span className="text-primary">Results You Can See.</span>
          </h2>
          <p className="type-body text-muted-foreground">
            Leveraging state-of-the-art technology and ISO 9001:2015 certified processes, we deliver high-performance, eco-friendly fertilizers you can depend on.
          </p>
          <p className="type-body text-muted-foreground">
            We are a leading manufacturer providing high-quality, customized organic fertilizer solutions that enhance soil health and ensure farm sustainability.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <Button
              asChild
              className="h-12 w-full rounded-full bg-primary px-6 text-white font-semibold shadow-[0_6px_24px_rgba(45,122,74,0.3)] hover:bg-primary/90 hover:shadow-[0_8px_32px_rgba(45,122,74,0.4)] transition-all duration-300 sm:w-auto"
            >
              <Link to="/about">
                Learn More About Us
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>

    {/* ── Products Ticker / Marquee ── */}
    <section 
      ref={section1Reveal.ref}
      className={`py-10 sm:py-12 lg:py-16 overflow-x-hidden reveal ${section1Reveal.isVisible ? 'visible' : ''}`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-8 sm:mb-10">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.28em] text-accent-foreground/70">
            <Sprout className="h-3.5 w-3.5 text-accent" />
            What Is Our Expertise?
          </div>
          <h2 className="mt-4 font-heading type-section-h2 font-bold tracking-tight text-foreground sm:mt-5">
            Manufacturing Advanced Granular Fertilizers
          </h2>
          <p className="mx-auto mt-3 max-w-3xl type-body text-muted-foreground">
            Adit Biorganic specializes in manufacturing nutrient base and coating granular fertilizers. We provide customized 'Recipe Granules' using mineral and organic bases as a superior alternative to standard bentonite.
          </p>
        </div>
      </div>

      {/* Scrolling product image strip */}
      <div className="relative overflow-hidden border-y border-border/60 py-4 sm:py-5" style={{ background: "linear-gradient(180deg, #F2EFE6 0%, #EDE8DC 100%)" }}>
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 z-10 sm:w-24" style={{ background: "linear-gradient(to right, #F2EFE6, transparent)" }} />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 z-10 sm:w-24" style={{ background: "linear-gradient(to left, #EDE8DC, transparent)" }} />

        <div className="flex w-full gap-0">
          <div className="flex shrink-0 animate-[marquee_35s_linear_infinite] items-center gap-0">
            {[...productTicker, ...productTicker].map((p, i) => (
              <div key={`ticker-1-${i}`} className="flex shrink-0 items-center gap-3 px-4 sm:gap-4 sm:px-6">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-white/80 bg-white p-2 shadow-[0_4px_16px_rgba(22,61,38,0.1)] sm:h-20 sm:w-20 sm:rounded-2xl">
                  <img src={p.img} alt={p.name} className="h-full w-full object-contain" loading="lazy" />
                </div>
                <span className="whitespace-nowrap font-heading text-xs font-semibold text-foreground sm:text-sm">{p.name}</span>
                <span className="h-1.5 w-1.5 rounded-full bg-accent ml-1 flex-shrink-0 sm:h-2 sm:w-2 sm:ml-2" />
              </div>
            ))}
          </div>
          <div aria-hidden className="flex shrink-0 animate-[marquee_35s_linear_infinite] items-center gap-0">
            {[...productTicker, ...productTicker].map((p, i) => (
              <div key={`ticker-2-${i}`} className="flex shrink-0 items-center gap-3 px-4 sm:gap-4 sm:px-6">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-white/80 bg-white p-2 shadow-[0_4px_16px_rgba(22,61,38,0.1)] sm:h-20 sm:w-20 sm:rounded-2xl">
                  <img src={p.img} alt={p.name} className="h-full w-full object-contain" loading="lazy" />
                </div>
                <span className="whitespace-nowrap font-heading text-xs font-semibold text-foreground sm:text-sm">{p.name}</span>
                <span className="h-1.5 w-1.5 rounded-full bg-accent ml-1 flex-shrink-0 sm:h-2 sm:w-2 sm:ml-2" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-6 sm:mt-8 flex justify-center">
        <Button
          asChild
          variant="outline"
          className="h-12 rounded-full border-primary/30 bg-primary/6 px-8 font-semibold text-primary hover:bg-primary hover:text-white transition-all duration-300"
        >
          <Link to="/products">View All Products</Link>
        </Button>
      </div>
    </section>

    {/* ── About / Foundation section ── */}
    <section className="py-14 sm:py-20 lg:py-28 section-wave" style={{ background: "linear-gradient(160deg, #EEF2EA 0%, #E8EDE1 100%)" }}>
      <div 
        ref={aboutReveal.ref}
        className={`mx-auto grid grid-cols-1 max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:px-8 lg:items-center lg:gap-10 reveal ${aboutReveal.isVisible ? 'visible' : ''}`}
      >
        <div className="ken-burns">
          <ImagePanel
            src={images.factory}
            alt="Manufacturing facility"
            className="aspect-[4/3] min-h-52 sm:min-h-64 lg:min-h-80"
            overlay={
              <div className="rounded-2xl border border-white/30 bg-surface-overlay/95 p-4 shadow-[0_16px_50px_rgba(22,61,38,0.12)] backdrop-blur-sm sm:rounded-3xl sm:p-5">
                <p className="type-label font-bold uppercase tracking-[0.22em] text-muted-foreground">Chairman's message</p>
                <p className="mt-2 font-accent type-body-sm italic text-primary leading-6">
                  "Our mission is not just about business but about contributing positively to the environment."
                </p>
                <div className="mt-3 flex items-center gap-3 border-t border-border/60 pt-3">
                  <div className="h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center sm:h-8 sm:w-8">
                    <Sprout className="h-3.5 w-3.5 text-primary sm:h-4 sm:w-4" />
                  </div>
                  <p className="type-body-sm font-semibold text-foreground">{company.founder}<span className="ml-1.5 font-normal text-muted-foreground">· {company.founderTitle}</span></p>
                </div>
              </div>
            }
          />
        </div>
        <div className="space-y-5 sm:space-y-7">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/8 px-4 py-2 text-xs font-bold uppercase tracking-[0.28em] text-primary">
            <Leaf className="h-3 w-3" />
            Our Foundation
          </div>
          <h2 className="font-heading type-section-h2 font-bold tracking-tight text-foreground text-balance sm:-mr-4">
            India's Leading Organic Granule Manufacturer
          </h2>
          <p className="type-body text-muted-foreground">
            {company.aboutDetails}
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-border/60 bg-surface-card p-4 shadow-sm sm:rounded-3xl sm:p-5">
              <p className="type-label font-bold uppercase tracking-[0.2em] text-muted-foreground">Our Mission</p>
              <p className="mt-3 font-accent type-body-sm italic text-foreground">
                "{company.mission.slice(0, 120)}…"
              </p>
            </div>
            <div className="rounded-2xl p-4 text-white sm:rounded-3xl sm:p-5" style={{ background: "linear-gradient(135deg, #163D26 0%, #2D7A4A 100%)" }}>
              <p className="type-label font-bold uppercase tracking-[0.2em] text-white/60">Chairman's Note</p>
              <p className="mt-3 font-accent type-body-sm text-white/90 italic">
                "{company.chairmanMessage.slice(0, 120)}…"
              </p>
              <p className="mt-3 type-label font-medium text-white/50">— {company.founder}</p>
            </div>
          </div>
          <Button
            asChild
            className="h-12 w-full rounded-full bg-primary px-6 text-white font-semibold shadow-[0_6px_24px_rgba(45,122,74,0.3)] hover:bg-primary/90 transition-all duration-300 sm:w-auto"
          >
            <Link to="/about">More About Us</Link>
          </Button>
        </div>
      </div>
    </section>

    {/* ── Core Expertise Cards ── */}
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-28" ref={cardsReveal.ref}>
      <div className={`mb-10 text-center sm:mb-14 reveal ${cardsReveal.isVisible ? 'visible' : ''}`}>
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/8 px-4 py-2 text-xs font-bold uppercase tracking-[0.28em] text-primary">
          <Award className="h-3.5 w-3.5" />
          Core strengths
        </div>
        <h2 className="mt-5 font-heading type-section-h2 font-bold tracking-tight text-foreground sm:mt-6 text-balance">
          The Foundation for <span className="text-primary">Sustainable Farming</span>
        </h2>
        <p className="mx-auto mt-4 max-w-2xl type-body text-muted-foreground">
          We believe superior crops start with superior soil. Our high-quality granular fertilizers are the key.
        </p>
      </div>
      <div className={`grid gap-5 sm:grid-cols-2 lg:grid-cols-4 sm:gap-6 reveal-scale ${cardsReveal.isVisible ? 'visible' : ''}`}>
        {expertiseCards.map((card, i) => (
          <div key={card.title} {...staggerDelay(i, 100)}>
            <ExpertiseCard card={card} />
          </div>
        ))}
      </div>
    </section>

    {/* ── Why Choose Us ── */}
    <section className="relative py-14 sm:py-20 lg:py-28 section-wave" style={{ background: "linear-gradient(135deg, #163D26 0%, #1E5233 60%, #2D7A4A 100%)" }}>
      <div className="pointer-events-none absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        backgroundRepeat: "repeat",
        backgroundSize: "128px",
      }} />
      <div 
        ref={section2Reveal.ref}
        className={`relative mx-auto grid grid-cols-1 max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_1fr] lg:px-8 lg:items-center lg:gap-10 reveal ${section2Reveal.isVisible ? 'visible' : ''}`}
      >
        <div className="space-y-5 sm:space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.28em] text-white/80">
            <Leaf className="h-3 w-3 text-accent" />
            Why Choose Us
          </div>
          <h2 className="font-heading type-section-h2 font-bold tracking-tight text-white text-balance">
            At Adit Biorganic, We Are Your Partner In <span className="text-accent">Sustainable Agriculture.</span>
          </h2>
          <p className="type-body text-white/75 sm:max-w-xl">
            With over a decade of manufacturing experience, we operate 24/7 to produce advanced organic granular fertilizers. Our state-of-the-art facilities and robust R&D allow us to create customized, eco-friendly solutions.
          </p>
          <div className="grid gap-3">
            {partnerBenefits.map((benefit) => (
              <div key={benefit} className="flex items-start gap-3 rounded-xl border border-white/8 bg-white/6 p-3 backdrop-blur-sm transition-all duration-200 hover:border-white/15 hover:bg-white/8 sm:rounded-2xl sm:p-4">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                <p className="type-body-sm text-white/85">{benefit}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-3 pt-2">
            <Button
              asChild
              className="h-12 w-full rounded-full bg-accent px-6 font-bold text-secondary hover:bg-accent/90 shadow-[0_6px_28px_rgba(245,158,11,0.35)] hover:shadow-[0_8px_36px_rgba(245,158,11,0.45)] transition-all duration-300 sm:w-auto"
            >
              <Link to="/about">Read More</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-12 w-full rounded-full border-white/25 bg-transparent px-6 text-white hover:bg-white hover:text-secondary transition-all duration-300 sm:w-auto"
            >
              <a href={`tel:${company.phoneRaw}`}>Call Us</a>
            </Button>
          </div>
        </div>
        <ImagePanel
          src={images.biopestGranulesHero}
          alt="Bio-Pesticide Granules — Adit Biorganic product"
          className="aspect-[4/3] min-h-52 sm:min-h-64 lg:min-h-[26rem]"
          overlay={
            <div className="rounded-2xl border border-white/20 bg-white/8 p-3 backdrop-blur-md sm:rounded-3xl sm:p-4">
              <p className="type-label font-bold uppercase tracking-[0.22em] text-white/70">India's Leading B2B Fertilizer Manufacturer</p>
              <p className="mt-1 font-heading text-sm font-bold text-white sm:text-base">ISO 9001:2015 Certified</p>
              <div className="mt-1.5 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" style={{ animation: "pulse-dot 2s ease-in-out infinite" }} />
                <span className="type-label text-white/60">Active operations · 24/7</span>
              </div>
            </div>
          }
        />
      </div>
    </section>

    {/* ── Products Carousel ── */}
    <section 
      ref={carouselReveal.ref}
      className={`py-14 sm:py-20 lg:py-28 reveal ${carouselReveal.isVisible ? 'visible' : ''}`} 
      style={{ background: "linear-gradient(160deg, #EEF2EA 0%, #E8EDE1 100%)" }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 sm:mb-10 sm:gap-5 lg:mb-12 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl space-y-3 sm:space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/8 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.26em] text-primary">
              <Sprout className="h-3 w-3" />
              Our Products
            </div>
            <h2 className="font-heading type-section-h2 font-bold tracking-tight text-foreground text-balance">
              Premium Granular Products
            </h2>
            <p className="type-body text-muted-foreground sm:max-w-2xl">
              High-quality base granules engineered for consistent performance and sustainable agriculture.
            </p>
          </div>
          <Button
            asChild
            variant="outline"
            className="h-12 w-full rounded-full border-primary/30 bg-primary/6 px-6 font-semibold text-primary hover:bg-primary hover:text-white transition-all duration-300 sm:w-auto lg:shrink-0"
          >
            <Link to="/products">View All Products</Link>
          </Button>
        </div>
        <Carousel
          opts={{ align: "start", loop: true }}
          plugins={[Autoplay({ delay: 3500, stopOnInteraction: false, stopOnMouseEnter: true })]}
          className="w-full"
        >
          <CarouselContent className="-ml-4 sm:-ml-6 items-stretch">
            {products.map((product) => (
              <CarouselItem key={product.slug} className="pl-4 sm:pl-6 basis-[88%] sm:basis-1/2 lg:basis-1/3">
                <Link
                  to={`/products/${product.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border/60 bg-surface-card shadow-[0_12px_40px_rgba(22,61,38,0.06)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_64px_rgba(22,61,38,0.12)] hover:border-primary/20 sm:rounded-[28px]"
                >
                  <div className="relative h-44 w-full shrink-0 overflow-hidden sm:h-48 lg:h-56">
                    <img
                      src={product.imageUrl}
                      alt={product.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(22,61,38,0.4), transparent)" }} />
                  </div>
                  <div className="flex flex-1 flex-col p-4 sm:p-5 lg:p-6">
                    <h3 className="font-heading type-card-title font-bold text-foreground">{product.title}</h3>
                    <p className="mt-2 flex-1 type-body-sm text-muted-foreground">{product.summary}</p>
                    <div className="mt-3 flex flex-wrap gap-1.5 sm:mt-4 sm:gap-2">
                      {product.fit.map((tag) => (
                        <span key={tag} className="rounded-full border border-accent/25 bg-accent/8 px-2.5 py-0.5 text-xs font-semibold text-accent-foreground/70 sm:px-3 sm:py-1">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="mt-4 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-primary">
                      Read more
                      <MoveRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>

    {/* ── Services with Real Images ── */}
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-28" ref={servicesReveal.ref}>
      <div className={`mb-8 flex flex-col gap-4 sm:mb-12 sm:gap-5 lg:mb-14 lg:flex-row lg:items-end lg:justify-between reveal ${servicesReveal.isVisible ? 'visible' : ''}`}>
        <div className="max-w-3xl space-y-3 sm:space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.26em] text-accent-foreground/70">
            <Leaf className="h-3 w-3 text-accent" />
            Our Services
          </div>
          <h2 className="font-heading type-section-h2 font-bold tracking-tight text-foreground text-balance">
            What We Offer
          </h2>
          <p className="type-body text-muted-foreground sm:max-w-2xl">
            We provide comprehensive, end-to-end B2B solutions for the fertilizer industry, from custom formulation and manufacturing to precision coating and quality assurance.
          </p>
        </div>
        <Button
          asChild
          variant="outline"
          className="h-12 w-full rounded-full border-primary/30 bg-primary/6 px-6 font-semibold text-primary hover:bg-primary hover:text-white transition-all duration-300 sm:w-auto lg:shrink-0"
        >
          <Link to="/services">View All Services</Link>
        </Button>
      </div>
      <div className={`grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 reveal-scale ${servicesReveal.isVisible ? 'visible' : ''}`}>
        {services.slice(0, 6).map((service, i) => (
          <div key={service.title} {...staggerDelay(i, 100)} className="h-full">
            <ServiceCard service={service} />
          </div>
        ))}
      </div>
    </section>

    {/* ── Blog / Insights ── */}
    <section 
      ref={blogReveal.ref}
      className={`py-14 sm:py-20 lg:py-28 section-wave reveal ${blogReveal.isVisible ? 'visible' : ''}`} 
      style={{ background: "linear-gradient(160deg, #EEF2EA 0%, #E8EDE1 100%)" }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 sm:mb-12 sm:gap-5 lg:mb-14 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl space-y-3 sm:space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-card px-3 py-1.5 text-xs font-bold uppercase tracking-[0.26em] text-muted-foreground">
              From The Blog
            </div>
            <h2 className="font-heading type-section-h2 font-bold tracking-tight text-foreground text-balance">
              Latest News &amp; Articles
            </h2>
            <p className="type-body text-muted-foreground sm:max-w-2xl">
              Explore our latest insights on sustainable agriculture, organic fertilizer technology, and manufacturing innovations for our B2B partners.
            </p>
          </div>
          <Button
            asChild
            variant="outline"
            className="h-12 w-full rounded-full border-primary/30 bg-primary/6 px-6 font-semibold text-primary hover:bg-primary hover:text-white transition-all duration-300 sm:w-auto lg:shrink-0"
          >
            <Link to="/blog">View All Articles</Link>
          </Button>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {insightPosts.map((post, i) => (
            <div key={post.slug} {...staggerDelay(i, 150)}>
              <InsightCard post={post} />
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* ── Contact / Inquiry ── */}
    <section 
      ref={contactReveal.ref}
      className={`py-14 sm:py-20 lg:py-28 reveal ${contactReveal.isVisible ? 'visible' : ''}`} 
      style={{ background: "linear-gradient(135deg, #163D26 0%, #1E5233 60%, #2D7A4A 100%)" }}
    >
      <div className="mx-auto grid grid-cols-1 max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8 lg:items-start lg:gap-10">
        <div className="space-y-5 sm:space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.28em] text-white/75">
            <Award className="h-3 w-3 text-accent" />
            Get In Touch
          </div>
          {/* FIX 1.19: text-3xl base, text-balance, no hard <br /> */}
          <h2 className="font-heading type-section-h2 font-bold tracking-tight text-white text-balance">
            Quality You Can Trust, <span className="text-accent">Results You Can See</span>
          </h2>
          <p className="type-body text-white/75 sm:max-w-2xl">
            Every product is manufactured using state-of-the-art technology under ISO 9001:2015 certified processes.
          </p>
          <div className="grid gap-3">
            {partnerBenefits.map((benefit) => (
              <div key={benefit} className="flex items-start gap-3 rounded-xl border border-white/8 bg-white/6 p-3 backdrop-blur-sm sm:rounded-2xl sm:p-4">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                <p className="type-body-sm text-white/80">{benefit}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-3">
            <Button
              asChild
              className="h-12 w-full rounded-full bg-accent px-6 font-bold text-secondary shadow-[0_6px_28px_rgba(245,158,11,0.35)] hover:bg-accent/90 hover:shadow-[0_8px_36px_rgba(245,158,11,0.45)] transition-all duration-300 sm:w-auto"
            >
              <a href={`tel:${company.phoneRaw}`}>Call {company.phoneDisplay}</a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-12 w-full rounded-full border-white/25 bg-transparent px-6 text-white hover:bg-white hover:text-secondary transition-all duration-300 sm:w-auto"
            >
              <Link to="/contact">Open contact page</Link>
            </Button>
          </div>
          {/* FIX 1.21: min-w-0 + break-words on address span */}
          <div className="grid gap-3 pt-2 type-body-sm text-white/65">
            <div className="flex items-start gap-2">
              <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <span className="min-w-0 break-words">{company.address}</span>
            </div>
            {company.emails.map((email) => (
              <div key={email} className="flex items-center gap-2">
                <ChevronRight className="h-4 w-4 shrink-0 text-accent" />
                <a href={`mailto:${email}`} className="min-w-0 break-all hover:text-white transition-colors">{email}</a>
              </div>
            ))}
          </div>
        </div>
        <InquiryForm
          title="Request a production or distributor discussion"
          description="Share your requirement and the Adit Biorganic team will follow up with the right commercial or technical conversation."
          submitLabel="Send B2B inquiry"
        />
      </div>
    </section>
  </>
  );
};

export { HomePage };
