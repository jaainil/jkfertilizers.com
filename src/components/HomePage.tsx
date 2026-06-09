import { Link } from "react-router-dom";
import { ArrowRight, PhoneCall, CheckCircle2, ChevronRight, MoveRight, Leaf, Award, Sprout, Quote, Star } from "lucide-react";
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
  name: "J K Fertilizers",
  tagline: "Organic, Naturally",
  subTagline: "Manufacturers of Organic Fertilizers",
  missionTagline: "Empowering Farmers, Enriching Communities",
  legalTagline: "Leading Manufacturers of Organic Fertilizers, Base Granules and Coated Base Granules",
  heroTitle: "Better Agriculture for Better Future",
  heroSubtitle:
    "Our mineral-coated granules bring sustainability to your fields, replacing chemicals with eco-friendly minerals.",
  heroTagline: "Growing Greener with Every Granule",
  aboutDetails:
    "J K Fertilizers, headquartered in Gujarat, India, began its journey in 2006. With a steadfast commitment to sustainable agriculture, we serve farmers, landscapers, and agricultural industries across India and beyond. As a leader in organic fertilizer innovation, we specialize in producing eco-friendly, mineral-coated granules and soil conditioners that enhance soil health and improve crop yield.",
  mission:
    "Our mission is to empower farmers and fertilizer brands with high-quality organic solutions that enhance soil health, improve crop yield, and promote environmental sustainability.",
  chairmanMessage:
    "I am proud to lead a team that is committed to excellence in organic agriculture. Our mission is not just about business but about contributing positively to the environment.",
  philosophy:
    "Quality You Can Trust, Results You Can See - Every product is manufactured using state-of-the-art technology under certified processes.",
  phoneDisplay: "9825045894",
  phoneRaw: "+919825045894",
  phoneAlt: "+919825045892",
  emails: ["info@jkfertilizers.com", "sales@jkfertilizers.com"],
  address: "NH. 48, Opp. IOC Petrol Pump, B/H Adas Bus Stop, Vasad, Dist: Anand, Gujarat",
  founder: "Mr. Akash Dadhania",
  founderTitle: "Founder & Director",
};

const heroStats = [
  { value: "150", unit: "+", label: "Trusted Clients" },
  { value: "15", unit: "+", label: "Years of Experience" },
  { value: "10000", unit: "+", label: "Tons of Products" },
  { value: "75", unit: "+", label: "Happy Clients" },
];

const expertiseCards = [
  {
    icon: "leaf",
    title: "100% Organic Products",
    description:
      "J K Fertilizers manufactures 100% organic products, promoting sustainable farming with eco-friendly, high-quality solutions.",
  },
  {
    icon: "shield",
    title: "Absolute Quality",
    description:
      "J K Fertilizers ensures absolute quality in every product, delivering superior performance for sustainable agriculture.",
  },
  {
    icon: "factory",
    title: "Environmentally Friendly",
    description:
      "J K Fertilizers produces environment-friendly products, prioritizing sustainability and minimizing impact on ecosystems.",
  },
  {
    icon: "flask",
    title: "Innovation in Fertilizers",
    description:
      "Continuously innovating to develop better, newer, and more sustainable products that enhance agricultural practices.",
  },
];

const services = [
  {
    title: "Organic Fertilizer Manufacturing",
    concept: "Eco-friendly fertilizers",
    description:
      "Eco-friendly fertilizers crafted for maximum efficiency and crop benefits. Manufacturing organic fertilizers with sustainable practices.",
    icon: "leaf",
    imageSrc: "/images/service-bg-1.jpg",
  },
  {
    title: "Granule Technology",
    concept: "Precision engineering",
    description:
      "Precisely engineered granules for optimal soil enrichment and nutrient availability. Advanced granulation technology for superior performance.",
    icon: "factory",
    imageSrc: "/images/service-bg-2.jpg",
  },
  {
    title: "Infrastructure Leasing",
    concept: "Cost-effective scaling",
    description:
      "Cost-effective options to help businesses scale operations seamlessly with state-of-the-art infrastructure for fertilizer production.",
    icon: "shield",
    imageSrc: "/images/service-bg-3.jpg",
  },
  {
    title: "Custom Packaging Solutions",
    concept: "Tailored packaging",
    description:
      "Tailored packaging services to protect and promote your products with brand-forward presentation and market-ready finishing.",
    icon: "package",
    imageSrc: "/images/service-bg-4.jpg",
  },
  {
    title: "Job Work Services",
    concept: "Custom manufacturing",
    description:
      "Specialized job work services providing customized manufacturing solutions for organic fertilizers and coated granules.",
    icon: "warehouse",
    imageSrc: "/images/service-bg-5.jpg",
  },
  {
    title: "Warehouse & Storage",
    concept: "Secure storage",
    description:
      "Well-maintained warehouse, storage, and godown facilities to support seamless supply chain management for agricultural inputs.",
    icon: "warehouse",
    imageSrc: "/images/service-bg-6.jpg",
  },
];

const insightPosts = getAllBlogs().slice(0, 3);

const productTickerProducts = [
  { name: "Organic Manure", img: "/images/products/organic-manure.png" },
  { name: "PDM", img: "/images/products/pdm.png" },
  { name: "PROM", img: "/images/products/prom.png" },
  { name: "Mycorrhiza Granules", img: "/images/products/mycorrhiza-granules.png" },
  { name: "Base Granules", img: "/images/products/base-granules.png" },
  { name: "Coated Granules", img: "/images/products/customized-coated-granules.png" },
  { name: "Pancharatna Granules", img: "/images/products/pancharatna-base-granules.png" },
  { name: "Diatomite Silicon", img: "/images/products/diatomite-silicon.png" },
];

const testimonials = [
  {
    name: "Sanjay Shah",
    title: "Director, Green Leaf Agri Inputs",
    quote: "Working with J K Fertilizers has been a game-changer for our business. Their high-quality, organic products have boosted our crop yields and improved soil health. We value their commitment to sustainability and look forward to continued collaboration.",
  },
  {
    name: "Ms. Kavita Naik",
    title: "General Agriculture Crop Consultant",
    quote: "J K Fertilizers consistently delivers excellent products and services. Their organic solutions have significantly enhanced our farming operations, helping us achieve healthier crops and better soil quality. Their team is professional, knowledgeable, and a pleasure to work with.",
  },
  {
    name: "Mr. S Suresh",
    title: "Director, Bay Leaf Agro Products",
    quote: "We've seen remarkable improvements in crop quality and sustainability thanks to J K Fertilizers. Their innovative, eco-friendly solutions align perfectly with our business goals. Their reliable support and quality products make them an indispensable partner for our operations.",
  },
];

const commitmentItems = [
  {
    title: "No Chemicals Used",
    desc: "We believe in chemical-free farming. Our products are 100% organic, ensuring safe and healthy crop production.",
  },
  {
    title: "Sustainable Agriculture Practices",
    desc: "We promote sustainable farming methods that protect the environment and ensure long-term soil health.",
  },
  {
    title: "Customer-Centric Solutions",
    desc: "We tailor our solutions to meet the unique needs of every farmer, ensuring maximum benefit and satisfaction.",
  },
  {
    title: "Innovation in Fertilizers",
    desc: "Through continuous R&D, we develop innovative products that address evolving agricultural challenges.",
  },
];

const faqs = [
  {
    q: "What makes J K Fertilizers different from other fertilizer companies?",
    a: "We specialize in sustainable, chemical-free products that improve soil health and crop yield. Our focus on precision manufacturing, high-quality raw materials, and eco-friendly practices sets us apart as a trusted partner for farmers and the industry.",
  },
  {
    q: "How do I know which fertilizer is right for my crops?",
    a: "Our team of agricultural experts can help you choose the right product based on your soil type, crop requirements, and farming goals. Contact us for a consultation.",
  },
  {
    q: "Are your fertilizers safe for the environment?",
    a: "Yes, all our products are 100% organic and eco-friendly. We use natural ingredients and sustainable manufacturing processes to minimize environmental impact.",
  },
  {
    q: "Can I purchase your products in bulk for large-scale farming?",
    a: "Absolutely. We cater to bulk orders for large-scale farming operations, government agencies, and corporate clients. Contact our sales team for volume pricing.",
  },
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
  const testimonialReveal = useScrollReveal();
  const commitmentReveal = useScrollReveal();
  const contactReveal = useScrollReveal();

  return (
  <>
    <SEOHead
      title="J K Fertilizers — Manufacturers of Organic Fertilizers | Anand, Gujarat"
      description="J K Fertilizers — ISO certified organic fertilizer manufacturer in Anand, Gujarat. Specializing in Organic Manure, PDM, PROM, Mycorrhiza granules, coated granules and soil conditioners."
      canonical="/"
      ogImage="/images/hero.jpg"
      keywords="organic fertilizer manufacturer india, J K Fertilizers, organic manure manufacturer gujarat, prom fertilizer, pdm fertilizer, mycorrhiza granules, fertilizer manufacturer anand gujarat"
      schema={[organizationSchema, websiteSchema, homeFaqSchema]}
      article={null}
      product={null}
    />

    {/* ── Hero ── */}
    <section className="relative overflow-hidden bg-background">
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
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/8 px-4 py-2 text-xs font-bold uppercase tracking-[0.28em] text-primary">
            <span className="flex h-1.5 w-1.5 rounded-full bg-accent" style={{ animation: "pulse-dot 2s ease-in-out infinite" }} />
            {company.tagline}
          </div>

          <div className="space-y-4">
            <h1 className="max-w-4xl font-heading type-hero-h1 font-bold tracking-tight text-foreground text-balance">
              {company.heroTitle}
            </h1>
            <p className="max-w-xl type-body text-muted-foreground">
              {company.heroSubtitle}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-accent-foreground/80">
              <Award className="h-3 w-3 text-accent" />
              {company.heroTagline}
            </span>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button
              asChild
              className="h-12 rounded-full bg-primary px-5 text-sm font-semibold text-white shadow-[0_6px_28px_rgba(45,122,74,0.35)] hover:bg-primary/90 hover:shadow-[0_8px_36px_rgba(45,122,74,0.45)] transition-all duration-300 sm:px-7 sm:text-base"
            >
              <Link to="/services">
                See Our Services
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

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-border/60 pt-5">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Leaf className="h-3.5 w-3.5 shrink-0 text-primary" />
              <span>100% Organic Products</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Sprout className="h-3.5 w-3.5 shrink-0 text-primary" />
              <span>15+ Years Experience</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Award className="h-3.5 w-3.5 shrink-0 text-accent" />
              <span>150+ Trusted Clients</span>
            </div>
          </div>
        </div>

        <div className="ken-burns">
          <ImagePanel
            src={images.hero}
            alt="Sustainable agriculture field"
            eager
            className="aspect-[4/3] min-h-52 sm:min-h-72 lg:aspect-[4/4.6] lg:min-h-[38rem]"
            overlay={
            <div className="grid gap-2 grid-cols-2">
              <div className="rounded-xl border border-white/30 bg-surface-overlay/92 p-3 shadow-[0_16px_50px_rgba(22,61,38,0.15)] backdrop-blur-sm sm:rounded-2xl sm:p-4">
                <p className="type-label font-bold uppercase tracking-[0.22em] text-muted-foreground">Our promise</p>
                <p className="mt-1 font-heading text-sm font-bold text-foreground sm:mt-2 sm:text-base">100% Organic Solutions</p>
                <p className="mt-1 hidden type-label text-muted-foreground sm:block">Eco-friendly fertilizers for sustainable farming.</p>
              </div>
              <div className="rounded-xl border border-white/20 p-3 text-white shadow-[0_16px_50px_rgba(22,61,38,0.2)] sm:rounded-2xl sm:p-4" style={{ background: "linear-gradient(135deg, #2D7A4A, #163D26)" }}>
                <p className="type-label font-bold uppercase tracking-[0.22em] text-white/70">Why J K Fertilizers</p>
                <p className="mt-1 font-heading text-sm font-bold sm:mt-2 sm:text-base">Quality & Sustainability</p>
                <div className="mt-1 flex items-center gap-1.5 sm:mt-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" style={{ animation: "pulse-dot 2s ease-in-out infinite" }} />
                  <span className="type-label text-white/70">15+ years experience</span>
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
          alt="J K Fertilizers facility overview"
          className="aspect-[4/3] min-h-52 sm:min-h-64 lg:min-h-72"
          overlay={
            <div className="rounded-2xl border border-white/25 p-4 shadow-[0_16px_50px_rgba(22,61,38,0.22)] backdrop-blur-md sm:rounded-3xl sm:p-5" style={{ background: "linear-gradient(135deg, rgba(22,61,38,0.92), rgba(45,122,74,0.88))" }}>
              <p className="type-label font-bold uppercase tracking-[0.22em] text-white/60">Empowering Farmers</p>
              <p className="mt-1 font-heading text-sm font-bold text-white sm:mt-2 sm:text-base">"Enriching Communities through Sustainable Agriculture"</p>
              <div className="mt-2 flex items-center gap-2">
                <Award className="h-3.5 w-3.5 text-accent" />
                <span className="text-xs font-semibold text-accent">India's Trusted Fertilizer Manufacturer</span>
              </div>
            </div>
          }
        />
        <div className="space-y-5 sm:space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/8 px-4 py-2 text-xs font-bold uppercase tracking-[0.28em] text-primary">
            <Leaf className="h-3 w-3" />
            Better Agriculture for Better Future
          </div>
          <h2 className="font-heading type-section-h2 font-bold tracking-tight text-foreground text-balance">
            Growing Greener <span className="text-primary">with Every Granule</span>
          </h2>
          <p className="type-body text-muted-foreground">
            Our mineral-coated granules bring sustainability to your fields, replacing chemicals with eco-friendly minerals.
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
                More About Us
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
            Delivering Top-Quality Agricultural Solutions
          </h2>
          <p className="mx-auto mt-3 max-w-3xl type-body text-muted-foreground">
            With over 15 years of experience, J K Fertilizers specializes in premium organic fertilizers, mycorrhiza-coated granules, and soil conditioners that enhance crop yields while promoting sustainable farming practices across diverse agricultural sectors.
          </p>
        </div>
      </div>

      <div className="relative overflow-hidden border-y border-border/60 py-4 sm:py-5" style={{ background: "linear-gradient(180deg, #F2EFE6 0%, #EDE8DC 100%)" }}>
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 z-10 sm:w-24" style={{ background: "linear-gradient(to right, #F2EFE6, transparent)" }} />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 z-10 sm:w-24" style={{ background: "linear-gradient(to left, #EDE8DC, transparent)" }} />

        <div className="flex w-full gap-0">
          <div className="flex shrink-0 animate-[marquee_35s_linear_infinite] items-center gap-0">
            {[...productTickerProducts, ...productTickerProducts].map((p, i) => (
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
            {[...productTickerProducts, ...productTickerProducts].map((p, i) => (
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
          <Link to="/products">View Portfolio</Link>
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
                <p className="type-label font-bold uppercase tracking-[0.22em] text-muted-foreground">Founder's message</p>
                <p className="mt-2 font-accent type-body-sm italic text-primary leading-6">
                  "Founded in 2006 with a commitment to sustainable agriculture."
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
            We have Over 15 Years of Expertise in Sustainable Agriculture
          </h2>
          <p className="type-body text-muted-foreground">
            {company.aboutDetails}
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-border/60 bg-surface-card p-4 shadow-sm sm:rounded-3xl sm:p-5">
              <p className="type-label font-bold uppercase tracking-[0.2em] text-muted-foreground">Our Mission</p>
              <p className="mt-3 font-accent type-body-sm italic text-foreground">
                "Empower growers with effective, environmentally sound solutions that support both productivity and sustainability."
              </p>
            </div>
            <div className="rounded-2xl p-4 text-white sm:rounded-3xl sm:p-5" style={{ background: "linear-gradient(135deg, #163D26 0%, #2D7A4A 100%)" }}>
              <p className="type-label font-bold uppercase tracking-[0.2em] text-white/60">Since 2006</p>
              <p className="mt-3 font-accent type-body-sm text-white/90 italic">
                "J K Fertilizers, headquartered in Gujarat, India, began its journey in 2006 with a commitment to sustainable agriculture."
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
          Why Choose J K Fertilizers?
        </div>
        <h2 className="mt-5 font-heading type-section-h2 font-bold tracking-tight text-foreground sm:mt-6 text-balance">
          Nurturing Crops with <span className="text-primary">Nature's Care</span>
        </h2>
        <p className="mx-auto mt-4 max-w-2xl type-body text-muted-foreground">
          At J K Fertilizers, we believe in sustainable farming practices that promote healthy, chemical-free crops.
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
            Our Commitment
          </div>
          <h2 className="font-heading type-section-h2 font-bold tracking-tight text-white text-balance">
            We Always Bring Customers <span className="text-accent">Green & Clean Products</span>
          </h2>
          <p className="type-body text-white/75 sm:max-w-xl">
            At J K Fertilizers we believe that we have a duty to adhere to good environmental practice, and operate in a sustainable manner. As lovers of plants and the environment it is only natural for us to want to reduce man's impact.
          </p>
          <div className="grid gap-3">
            {commitmentItems.map((item) => (
              <div key={item.title} className="flex items-start gap-3 rounded-xl border border-white/8 bg-white/6 p-3 backdrop-blur-sm transition-all duration-200 hover:border-white/15 hover:bg-white/8 sm:rounded-2xl sm:p-4">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                <div>
                  <p className="type-body-sm font-semibold text-white/90">{item.title}</p>
                  <p className="type-body-sm text-white/65">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-3 pt-2">
            <Button
              asChild
              className="h-12 w-full rounded-full bg-accent px-6 font-bold text-secondary hover:bg-accent/90 shadow-[0_6px_28px_rgba(245,158,11,0.35)] hover:shadow-[0_8px_36px_rgba(245,158,11,0.45)] transition-all duration-300 sm:w-auto"
            >
              <Link to="/about">See More Our Commitment</Link>
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
          alt="J K Fertilizers products"
          className="aspect-[4/3] min-h-52 sm:min-h-64 lg:min-h-[26rem]"
          overlay={
            <div className="rounded-2xl border border-white/20 bg-white/8 p-3 backdrop-blur-md sm:rounded-3xl sm:p-4">
              <p className="type-label font-bold uppercase tracking-[0.22em] text-white/70">India's Trusted Fertilizer Manufacturer</p>
              <p className="mt-1 font-heading text-sm font-bold text-white sm:text-base">100% Organic · FCO Approved</p>
              <div className="mt-1.5 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" style={{ animation: "pulse-dot 2s ease-in-out infinite" }} />
                <span className="type-label text-white/60">15+ years of excellence</span>
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
              Product Updates
            </div>
            <h2 className="font-heading type-section-h2 font-bold tracking-tight text-foreground text-balance">
              New Launches
            </h2>
            <p className="type-body text-muted-foreground sm:max-w-2xl">
              At J K Fertilizers, we are constantly seeking the best solutions to meet the evolving needs of the industry and farmers. Through continuous innovation, we strive to develop better, newer, and more sustainable products.
            </p>
          </div>
          <Button
            asChild
            variant="outline"
            className="h-12 w-full rounded-full border-primary/30 bg-primary/6 px-6 font-semibold text-primary hover:bg-primary hover:text-white transition-all duration-300 sm:w-auto lg:shrink-0"
          >
            <Link to="/products">View Portfolio</Link>
          </Button>
        </div>
        <Carousel
          opts={{ align: "start", loop: true }}
          plugins={[Autoplay({ delay: 3500, stopOnInteraction: false, stopOnMouseEnter: true })]}
          className="w-full"
        >
          <CarouselContent className="-ml-4 sm:-ml-6 items-stretch">
            {products.slice(0, 8).map((product) => (
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
                      {product.fit.slice(0, 2).map((tag) => (
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

    {/* ── Testimonials ── */}
    <section
      ref={testimonialReveal.ref}
      className={`py-14 sm:py-20 lg:py-28 reveal ${testimonialReveal.isVisible ? 'visible' : ''}`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.26em] text-accent-foreground/70">
            <Quote className="h-3 w-3 text-accent" />
            Testimonials With Us
          </div>
          <h2 className="mt-5 font-heading type-section-h2 font-bold tracking-tight text-foreground">
            What Clients Says?
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              className="flex flex-col rounded-[28px] border border-border bg-surface-card p-6 shadow-[0_12px_40px_rgba(22,61,38,0.06)] sm:p-8"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, s) => (
                  <Star key={s} className="h-4 w-4 fill-accent text-accent" />
                ))}
              </div>
              <p className="flex-1 type-body-sm italic text-muted-foreground leading-7">
                "{t.quote}"
              </p>
              <div className="mt-6 border-t border-border pt-4">
                <p className="font-heading text-sm font-bold text-foreground">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* ── Services ── */}
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-28" ref={servicesReveal.ref}>
      <div className={`mb-8 flex flex-col gap-4 sm:mb-12 sm:gap-5 lg:mb-14 lg:flex-row lg:items-end lg:justify-between reveal ${servicesReveal.isVisible ? 'visible' : ''}`}>
        <div className="max-w-3xl space-y-3 sm:space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.26em] text-accent-foreground/70">
            <Leaf className="h-3 w-3 text-accent" />
            Services We Provide
          </div>
          <h2 className="font-heading type-section-h2 font-bold tracking-tight text-foreground text-balance">
            Our Services
          </h2>
          <p className="type-body text-muted-foreground sm:max-w-2xl">
            We provide comprehensive solutions for the fertilizer industry, from organic fertilizer manufacturing and granule technology to infrastructure leasing and custom packaging.
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
              Stay updated with the latest news, insights, and articles on sustainable farming and agriculture.
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

    {/* ── FAQ ── */}
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-28">
      <div className="mb-12 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/8 px-4 py-2 text-xs font-bold uppercase tracking-[0.28em] text-primary">
          FAQ
        </div>
        <h2 className="mt-5 font-heading type-section-h2 font-bold tracking-tight text-foreground">
          Frequently Asked Questions
        </h2>
        <p className="mx-auto mt-3 max-w-xl type-body text-muted-foreground">
          We are here to help you. Generally asked questions.
        </p>
      </div>
      <div className="mx-auto max-w-4xl grid gap-4">
        {faqs.map((faq) => (
          <div key={faq.q} className="rounded-[24px] border border-border bg-surface-card p-6 shadow-[0_8px_30px_rgba(16,24,40,0.04)] sm:p-7">
            <p className="font-heading text-lg font-semibold text-foreground">{faq.q}</p>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">{faq.a}</p>
          </div>
        ))}
      </div>
      <div className="mt-8 text-center">
        <p className="type-body-sm text-muted-foreground">
          You didn't find your question? <Link to="/contact" className="text-primary font-semibold hover:underline">Connect with us today!</Link>
        </p>
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
            Let's Cooperate Together
          </div>
          <h2 className="font-heading type-section-h2 font-bold tracking-tight text-white text-balance">
            Contact Us <span className="text-accent">Today!</span>
          </h2>
          <p className="type-body text-white/75 sm:max-w-2xl">
            We will reply you within 24 hours via email, thank you for contacting.
          </p>
          <div className="grid gap-3 pt-2 type-body-sm text-white/65">
            <div className="flex items-start gap-2">
              <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <span className="min-w-0 break-words">{company.address}</span>
            </div>
            <div className="flex items-center gap-2">
              <ChevronRight className="h-4 w-4 shrink-0 text-accent" />
              <span>Call us: {company.phoneDisplay} / {company.phoneAlt?.slice(-2)}</span>
            </div>
            {company.emails.map((email) => (
              <div key={email} className="flex items-center gap-2">
                <ChevronRight className="h-4 w-4 shrink-0 text-accent" />
                <a href={`mailto:${email}`} className="min-w-0 break-all hover:text-white transition-colors">{email}</a>
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
        </div>
        <InquiryForm
          title="Send Us a Message"
          description="Share your requirement and the J K Fertilizers team will follow up with the right commercial or technical conversation."
          submitLabel="Send Message"
        />
      </div>
    </section>
  </>
  );
};

export { HomePage };
