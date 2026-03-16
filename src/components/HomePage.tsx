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
  { value: "190+", unit: "MT", label: "Daily Production Capacity", icon: "🌾" },
  { value: "50+", unit: "", label: "Trusted B2B Partners", icon: "🤝" },
  { value: "10+", unit: "Yrs", label: "Industry Experience", icon: "📅" },
  { value: "ISO", unit: "", label: "9001:2015 Certified", icon: "🏅" },
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

const HomePage = () => (
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
        {/* Organic grain texture */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
            backgroundSize: "200px 200px",
          }}
        />
      </div>

      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:px-8 lg:py-28">
        <div className="space-y-8">
          {/* Eyebrow pill */}
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/8 px-4 py-2 text-xs font-bold uppercase tracking-[0.28em] text-primary">
            <span className="flex h-1.5 w-1.5 rounded-full bg-accent" style={{ animation: "pulse-dot 2s ease-in-out infinite" }} />
            {company.tagline}
          </div>

          <div className="space-y-5">
            <h1 className="max-w-4xl font-heading text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl xl:text-7xl">
              <span className="text-balance leading-[1.05]">{company.subTagline}</span>
            </h1>
            <p className="max-w-xl text-base leading-8 text-muted-foreground sm:text-lg">
              {company.heroSubtitle}
            </p>
          </div>

          {/* Tag badge */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent-foreground/80">
              <Award className="h-3.5 w-3.5 text-accent" />
              {company.missionTagline}
            </span>
          </div>

          <div className="flex flex-wrap gap-4">
            <Button
              asChild
              className="h-13 rounded-full bg-primary px-7 text-base font-semibold text-white shadow-[0_6px_28px_rgba(45,122,74,0.35)] hover:bg-primary/90 hover:shadow-[0_8px_36px_rgba(45,122,74,0.45)] transition-all duration-300"
            >
              <Link to="/services">
                Explore Our Services
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-13 rounded-full border-primary/30 bg-primary/5 px-7 text-base font-semibold text-primary hover:bg-primary hover:text-white hover:border-primary transition-all duration-300"
            >
              <a href={`tel:${company.phoneRaw}`}>
                <PhoneCall className="h-4 w-4" />
                Call {company.phoneDisplay}
              </a>
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap items-center gap-4 border-t border-border/60 pt-6">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Leaf className="h-3.5 w-3.5 text-primary" />
              <span>190+ MT/day capacity</span>
            </div>
            <span className="h-3 w-px bg-border" />
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Sprout className="h-3.5 w-3.5 text-primary" />
              <span>ISO 9001:2015 Certified</span>
            </div>
            <span className="h-3 w-px bg-border" />
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Award className="h-3.5 w-3.5 text-accent" />
              <span>50+ B2B Partners</span>
            </div>
          </div>
        </div>

        {/* Hero image panel */}
        <ImagePanel
          src={images.hero}
          alt="Aerial sustainable agriculture field"
          className="aspect-[4/3] min-h-64 lg:aspect-[4/4.6] lg:min-h-155"
          overlay={
            <div className="grid gap-3 grid-cols-1 xs:grid-cols-2 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/30 bg-surface-overlay/92 p-4 shadow-[0_16px_50px_rgba(22,61,38,0.15)] backdrop-blur-sm">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-muted-foreground">Our promise</p>
                <p className="mt-2 font-heading text-lg font-bold text-foreground">Consistency at scale</p>
                <p className="mt-1 text-xs leading-5 text-muted-foreground">Granules engineered for repeatability, handling, and dependable supply.</p>
              </div>
              <div className="rounded-2xl border border-white/20 bg-primary p-4 text-white shadow-[0_16px_50px_rgba(22,61,38,0.2)]" style={{ background: "linear-gradient(135deg, #2D7A4A, #163D26)" }}>
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/70">Why Adit Biorganic</p>
                <p className="mt-2 font-heading text-lg font-bold">Industrial discipline, organic intent</p>
                <div className="mt-2 flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" style={{ animation: "pulse-dot 2s ease-in-out infinite" }} />
                  <span className="text-xs text-white/70">10+ years experience</span>
                </div>
              </div>
            </div>
          }
        />
      </div>
    </section>

    {/* ── Stats Bar ── */}
    <section className="relative z-10 -mt-10 px-4 pb-4 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-4 grid-cols-2 xl:grid-cols-4">
        {heroStats.map((item, i) => (
          <div
            key={item.label}
            className="group relative rounded-[28px] border border-border bg-surface-card p-6 shadow-[0_12px_40px_rgba(22,61,38,0.07)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_56px_rgba(22,61,38,0.14)] hover:border-primary/20"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            {/* Subtle gradient accent corner */}
            <div className="pointer-events-none absolute right-3 top-3 h-16 w-16 rounded-full bg-primary/5 blur-lg group-hover:bg-primary/10 transition-colors duration-300" />
            <p className="font-heading text-3xl font-extrabold text-primary">
              {item.value}
              {item.unit && <span className="ml-1 text-xl font-medium text-muted-foreground">{item.unit}</span>}
            </p>
            <p className="mt-2 text-xs font-medium leading-5 text-muted-foreground uppercase tracking-wide">{item.label}</p>
          </div>
        ))}
      </div>
    </section>

    {/* ── Second Hero Panel — "The Future of Sustainable Agriculture" ── */}
    <section className="mx-auto max-w-7xl px-4 pt-24 pb-12 sm:px-6 lg:px-8 lg:pt-32 lg:pb-16">
      <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <ImagePanel
          src={images.facilityOverview}
          alt="Adit Biorganic facility overview"
          className="aspect-[4/3] min-h-64 lg:aspect-[4/3.5] lg:min-h-75"
          overlay={
            <div className="rounded-3xl border border-white/25 p-5 shadow-[0_16px_50px_rgba(22,61,38,0.22)] backdrop-blur-md" style={{ background: "linear-gradient(135deg, rgba(22,61,38,0.92), rgba(45,122,74,0.88))" }}>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/60">ISO 9001:2015 Certified</p>
              <p className="mt-2 font-heading text-lg font-bold text-white">"Quality You Can Trust. Results You Can See."</p>
              <div className="mt-3 flex items-center gap-2">
                <Award className="h-4 w-4 text-accent" />
                <span className="text-xs font-semibold text-accent">India's Leading B2B Manufacturer</span>
              </div>
            </div>
          }
        />
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/8 px-4 py-2 text-xs font-bold uppercase tracking-[0.28em] text-primary">
            <Leaf className="h-3 w-3" />
            {company.heroTitle}
          </div>
          <h2 className="font-heading text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Quality You Can Trust.<br />
            <span className="text-primary">Results You Can See.</span>
          </h2>
          <p className="text-base leading-8 text-muted-foreground sm:text-lg">
            Leveraging state-of-the-art technology and ISO 9001:2015 certified processes, we deliver high-performance, eco-friendly fertilizers you can depend on.
          </p>
          <p className="text-base leading-8 text-muted-foreground sm:text-lg">
            We are a leading manufacturer providing high-quality, customized organic fertilizer solutions that enhance soil health and ensure farm sustainability.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <Button
              asChild
              className="h-12 rounded-full bg-primary px-6 text-white font-semibold shadow-[0_6px_24px_rgba(45,122,74,0.3)] hover:bg-primary/90 hover:shadow-[0_8px_32px_rgba(45,122,74,0.4)] transition-all duration-300"
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
    <section className="py-12 lg:py-16 overflow-x-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-10">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.28em] text-accent-foreground/70">
            <Sprout className="h-3.5 w-3.5 text-accent" />
            What Is Our Expertise?
          </div>
          <h2 className="mt-5 font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Manufacturing Advanced Granular Fertilizers
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-base leading-8 text-muted-foreground">
            Adit Biorganic specializes in manufacturing nutrient base and coating granular fertilizers. We provide customized 'Recipe Granules' using mineral and organic bases as a superior alternative to standard bentonite.
          </p>
        </div>
      </div>

      {/* Scrolling product image strip */}
      <div className="relative overflow-hidden border-y border-border/60 py-5" style={{ background: "linear-gradient(180deg, #F2EFE6 0%, #EDE8DC 100%)" }}>
        {/* Fade edges */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 z-10" style={{ background: "linear-gradient(to right, #F2EFE6, transparent)" }} />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 z-10" style={{ background: "linear-gradient(to left, #EDE8DC, transparent)" }} />

        <div className="flex w-full gap-0">
          <div className="flex shrink-0 animate-[marquee_35s_linear_infinite] items-center gap-0">
            {[...productTicker, ...productTicker].map((p, i) => (
              <div key={`ticker-1-${i}`} className="flex shrink-0 items-center gap-4 px-6">
                <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-white/80 bg-white p-2 shadow-[0_4px_16px_rgba(22,61,38,0.1)]">
                  <img src={p.img} alt={p.name} className="h-full w-full object-contain" loading="lazy" />
                </div>
                <span className="whitespace-nowrap font-heading text-sm font-semibold text-foreground">{p.name}</span>
                <span className="h-2 w-2 rounded-full bg-accent ml-2 flex-shrink-0" />
              </div>
            ))}
          </div>
          <div aria-hidden className="flex shrink-0 animate-[marquee_35s_linear_infinite] items-center gap-0">
            {[...productTicker, ...productTicker].map((p, i) => (
              <div key={`ticker-2-${i}`} className="flex shrink-0 items-center gap-4 px-6">
                <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-white/80 bg-white p-2 shadow-[0_4px_16px_rgba(22,61,38,0.1)]">
                  <img src={p.img} alt={p.name} className="h-full w-full object-contain" loading="lazy" />
                </div>
                <span className="whitespace-nowrap font-heading text-sm font-semibold text-foreground">{p.name}</span>
                <span className="h-2 w-2 rounded-full bg-accent ml-2 flex-shrink-0" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-8 flex justify-center">
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
    <section className="py-20 lg:py-28" style={{ background: "linear-gradient(160deg, #EEF2EA 0%, #E8EDE1 100%)" }}>
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:px-8 lg:items-center">
        <ImagePanel
          src={images.factory}
          alt="Manufacturing facility"
          className="aspect-[4/3] min-h-64 lg:aspect-[4/4.6] lg:min-h-90"
          overlay={
            <div className="rounded-3xl border border-white/30 bg-surface-overlay/95 p-5 shadow-[0_16px_50px_rgba(22,61,38,0.12)] backdrop-blur-sm">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-muted-foreground">Chairman's message</p>
              <p className="mt-3 font-accent text-xl italic text-primary leading-7">
                "Our mission is not just about business but about contributing positively to the environment."
              </p>
              <div className="mt-4 flex items-center gap-3 border-t border-border/60 pt-3">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Sprout className="h-4 w-4 text-primary" />
                </div>
                <p className="text-sm font-semibold text-foreground">{company.founder}<span className="ml-1.5 font-normal text-muted-foreground">· {company.founderTitle}</span></p>
              </div>
            </div>
          }
        />
        <div className="space-y-7">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/8 px-4 py-2 text-xs font-bold uppercase tracking-[0.28em] text-primary">
            <Leaf className="h-3 w-3" />
            {company.subTagline}
          </div>
          <h2 className="font-heading text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            The Foundation of Your Harvest is Built on{" "}
            <span className="text-primary">Quality</span>
          </h2>
          <p className="text-base leading-8 text-muted-foreground sm:text-lg">
            {company.aboutDetails}
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-border/60 bg-surface-card p-5 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">Our Mission</p>
              <p className="mt-3 font-accent text-base leading-7 text-foreground italic">
                "{company.mission.slice(0, 120)}…"
              </p>
            </div>
            <div className="rounded-3xl p-5 text-white" style={{ background: "linear-gradient(135deg, #163D26 0%, #2D7A4A 100%)" }}>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/60">Chairman's Note</p>
              <p className="mt-3 font-accent text-base leading-7 text-white/90 italic">
                "{company.chairmanMessage.slice(0, 120)}…"
              </p>
              <p className="mt-3 text-xs font-medium text-white/50">— {company.founder}</p>
            </div>
          </div>
          <Button
            asChild
            className="h-12 rounded-full bg-primary px-6 text-white font-semibold shadow-[0_6px_24px_rgba(45,122,74,0.3)] hover:bg-primary/90 transition-all duration-300"
          >
            <Link to="/about">More About Us</Link>
          </Button>
        </div>
      </div>
    </section>

    {/* ── Core Expertise Cards ── */}
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="mb-14 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/8 px-4 py-2 text-xs font-bold uppercase tracking-[0.28em] text-primary">
          <Award className="h-3.5 w-3.5" />
          Core strengths
        </div>
        <h2 className="mt-6 font-heading text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          The Foundation for<br />
          <span className="text-primary">Sustainable Farming</span>
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
          We believe superior crops start with superior soil. Our high-quality granular fertilizers are the key.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {expertiseCards.map((card) => (
          <ExpertiseCard key={card.title} card={card} />
        ))}
      </div>
    </section>

    {/* ── Why Choose Us ── */}
    <section className="py-20 lg:py-28" style={{ background: "linear-gradient(135deg, #163D26 0%, #1E5233 60%, #2D7A4A 100%)" }}>
      <div className="pointer-events-none absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        backgroundRepeat: "repeat",
        backgroundSize: "128px",
      }} />
      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_1fr] lg:px-8 lg:items-center">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.28em] text-white/80">
            <Leaf className="h-3 w-3 text-accent" />
            Why Choose Us
          </div>
          <h2 className="font-heading text-4xl font-bold tracking-tight text-white sm:text-5xl">
            At Adit Biorganic, We Are Your Partner In{" "}
            <span className="text-accent">Sustainable Agriculture.</span>
          </h2>
          <p className="max-w-xl text-base leading-8 text-white/75 sm:text-lg">
            With over a decade of manufacturing experience, we operate 24/7 to produce advanced organic granular fertilizers. Our state-of-the-art facilities and robust R&D allow us to create customized, eco-friendly solutions.
          </p>
          <div className="grid gap-3">
            {partnerBenefits.map((benefit) => (
              <div key={benefit} className="flex items-start gap-3 rounded-2xl border border-white/8 bg-white/6 p-4 backdrop-blur-sm transition-all duration-200 hover:border-white/15 hover:bg-white/8">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                <p className="text-sm leading-7 text-white/85">{benefit}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-4 pt-2">
            <Button
              asChild
              className="h-12 rounded-full bg-accent px-6 font-bold text-secondary hover:bg-accent/90 shadow-[0_6px_28px_rgba(245,158,11,0.35)] hover:shadow-[0_8px_36px_rgba(245,158,11,0.45)] transition-all duration-300"
            >
              <Link to="/about">Read More</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-12 rounded-full border-white/25 bg-transparent px-6 text-white hover:bg-white hover:text-secondary transition-all duration-300"
            >
              <a href={`tel:${company.phoneRaw}`} className="whitespace-nowrap">Call Us</a>
            </Button>
          </div>
        </div>
        <ImagePanel
          src={images.biopestGranulesHero}
          alt="Bio-Pesticide Granules — Adit Biorganic product"
          className="aspect-[4/3] min-h-64 lg:aspect-[4/4.6] lg:min-h-100"
          overlay={
            <div className="rounded-3xl border border-white/20 bg-white/8 p-4 backdrop-blur-md">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/70">India's Leading B2B Fertilizer Manufacturer</p>
              <p className="mt-1 font-heading text-lg font-bold text-white">ISO 9001:2015 Certified</p>
              <div className="mt-2 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-accent" style={{ animation: "pulse-dot 2s ease-in-out infinite" }} />
                <span className="text-xs text-white/60">Active operations · 24/7</span>
              </div>
            </div>
          }
        />
      </div>
    </section>

    {/* ── Products Carousel ── */}
    <section className="py-20 lg:py-28" style={{ background: "linear-gradient(160deg, #EEF2EA 0%, #E8EDE1 100%)" }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-5 lg:mb-12 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/8 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.26em] text-primary">
              <Sprout className="h-3 w-3" />
              Our Products
            </div>
            <h2 className="font-heading text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Premium Granular Products
            </h2>
            <p className="max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
              High-quality base granules engineered for consistent performance and sustainable agriculture.
            </p>
          </div>
          <Button
            asChild
            variant="outline"
            className="h-12 rounded-full border-primary/30 bg-primary/6 px-6 font-semibold text-primary hover:bg-primary hover:text-white transition-all duration-300 shrink-0"
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
              <CarouselItem key={product.slug} className="pl-4 sm:pl-6 basis-[85%] sm:basis-1/2 lg:basis-1/3">
                <Link
                  to={`/products/${product.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-[28px] border border-border/60 bg-surface-card shadow-[0_12px_40px_rgba(22,61,38,0.06)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_64px_rgba(22,61,38,0.12)] hover:border-primary/20"
                >
                  <div className="relative h-48 sm:h-56 w-full shrink-0 overflow-hidden">
                    <img
                      src={product.imageUrl}
                      alt={product.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(22,61,38,0.4), transparent)" }} />
                  </div>
                  <div className="flex flex-1 flex-col p-5 sm:p-6">
                    <h3 className="font-heading text-base sm:text-lg font-bold text-foreground">{product.title}</h3>
                    <p className="mt-2 flex-1 text-sm leading-6 text-muted-foreground">{product.summary}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {product.fit.map((tag) => (
                        <span key={tag} className="rounded-full border border-accent/25 bg-accent/8 px-3 py-1 text-xs font-semibold text-accent-foreground/70">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="mt-5 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-primary">
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
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="mb-12 flex flex-col gap-5 lg:mb-14 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.26em] text-accent-foreground/70">
            <Leaf className="h-3 w-3 text-accent" />
            Our Services
          </div>
          <h2 className="font-heading text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            What We Offer
          </h2>
          <p className="max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
            We provide comprehensive, end-to-end B2B solutions for the fertilizer industry, from custom formulation and manufacturing to precision coating and quality assurance.
          </p>
        </div>
        <Button
          asChild
          variant="outline"
          className="h-12 rounded-full border-primary/30 bg-primary/6 px-6 font-semibold text-primary hover:bg-primary hover:text-white transition-all duration-300 shrink-0"
        >
          <Link to="/services">View All Services</Link>
        </Button>
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        {services.slice(0, 6).map((service) => (
          <ServiceCard key={service.title} service={service} />
        ))}
      </div>
    </section>

    {/* ── Blog / Insights ── */}
    <section className="py-20 lg:py-28" style={{ background: "linear-gradient(160deg, #EEF2EA 0%, #E8EDE1 100%)" }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col gap-5 lg:mb-14 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-card px-3 py-1.5 text-xs font-bold uppercase tracking-[0.26em] text-muted-foreground">
              From The Blog
            </div>
            <h2 className="font-heading text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Latest News &amp; Articles
            </h2>
            <p className="max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
              Explore our latest insights on sustainable agriculture, organic fertilizer technology, and manufacturing innovations for our B2B partners.
            </p>
          </div>
          <Button
            asChild
            variant="outline"
            className="h-12 rounded-full border-primary/30 bg-primary/6 px-6 font-semibold text-primary hover:bg-primary hover:text-white transition-all duration-300 shrink-0"
          >
            <Link to="/blog">View All Articles</Link>
          </Button>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {insightPosts.map((post) => (
            <InsightCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </section>

    {/* ── Contact / Inquiry ── */}
    <section className="py-20 lg:py-28" style={{ background: "linear-gradient(135deg, #163D26 0%, #1E5233 60%, #2D7A4A 100%)" }}>
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8 lg:items-start">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.28em] text-white/75">
            <Award className="h-3 w-3 text-accent" />
            Get In Touch
          </div>
          <h2 className="font-heading text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Quality You Can Trust,<br />
            <span className="text-accent">Results You Can See</span>
          </h2>
          <p className="max-w-2xl text-base leading-8 text-white/75 sm:text-lg">
            Every product is manufactured using state-of-the-art technology under ISO 9001:2015 certified processes.
          </p>
          <div className="grid gap-3">
            {partnerBenefits.map((benefit) => (
              <div key={benefit} className="flex items-start gap-3 rounded-2xl border border-white/8 bg-white/6 p-4 backdrop-blur-sm">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                <p className="text-sm leading-7 text-white/80">{benefit}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-4">
            <Button
              asChild
              className="h-12 rounded-full bg-accent px-6 font-bold text-secondary shadow-[0_6px_28px_rgba(245,158,11,0.35)] hover:bg-accent/90 hover:shadow-[0_8px_36px_rgba(245,158,11,0.45)] transition-all duration-300"
            >
              <a href={`tel:${company.phoneRaw}`}>Call {company.phoneDisplay}</a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-12 rounded-full border-white/25 bg-transparent px-6 text-white hover:bg-white hover:text-secondary transition-all duration-300"
            >
              <Link to="/contact">Open contact page</Link>
            </Button>
          </div>
          {/* Contact details */}
          <div className="grid gap-3 pt-2 text-sm text-white/65">
            <div className="flex items-center gap-2">
              <ChevronRight className="h-4 w-4 text-accent" />
              <span>{company.address}</span>
            </div>
            {company.emails.map((email) => (
              <div key={email} className="flex items-center gap-2">
                <ChevronRight className="h-4 w-4 text-accent" />
                <a href={`mailto:${email}`} className="hover:text-white transition-colors">{email}</a>
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

export { HomePage };
