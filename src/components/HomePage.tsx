import { Link } from "react-router-dom";
import { ArrowRight, PhoneCall, CheckCircle2, ChevronRight, MoveRight, Leaf, Award, Sprout, Quote, Star } from "lucide-react";
import { products, getProductCoverImage } from "@/data/products";
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
  heroTitle: "Better Agriculture for Better Future",
  heroSubtitle:
    "Our mineral-coated granules bring sustainability to your fields, replacing chemicals with eco-friendly minerals.",
  heroTagline: "Growing Greener with Every Granule",
  aboutDetails:
    "J K Fertilizers, headquartered in Gujarat, India, began its journey in 2006. With a steadfast commitment to sustainable agriculture, we serve farmers, landscapers, and agricultural industries across India and beyond. As a leader in organic fertilizer innovation, we specialize in producing eco-friendly, mineral-coated granules and soil conditioners that enhance soil health and improve crop yield.",
  phoneDisplay: "9825045894",
  phoneRaw: "+919825045894",
  emails: ["info@jkfertilizers.com", "sales@jkfertilizers.com"],
  address: "NH. 48, Opp. IOC Petrol Pump, B/H Adas Bus Stop, Vasad, Dist: Anand, Gujarat - 388305 INDIA",
  founder: "Mr. Akash Dadhania",
  founderTitle: "Founder & Director",
};

const heroStats = [
  { value: "100", unit: "+", label: "Agricultural Products" },
  { value: "150", unit: "+", label: "Trusted Clients" },
  { value: "15", unit: "+", label: "Years of Experience" },
  { value: "10000", unit: "+", label: "Tons of Products" },
];

const expertiseCards = [
  {
    icon: "leaf",
    title: "100% Organic Products",
    description:
      "We manufacture 100% organic products, promoting sustainable farming with eco-friendly, high-quality solutions.",
  },
  {
    icon: "shield",
    title: "Absolute Quality",
    description:
      "Strict quality control on every batch, delivering reliable performance for sustainable agriculture.",
  },
  {
    icon: "factory",
    title: "Environmentally Friendly",
    description:
      "Products that prioritize sustainability and minimize impact on soil and surrounding ecosystems.",
  },
  {
    icon: "flask",
    title: "Innovation in Fertilizers",
    description:
      "Ongoing R&D to develop better, newer, and more sustainable products for modern agriculture.",
  },
];

const services = [
  {
    title: "Granule Technology",
    concept: "Precision engineering",
    description:
      "Precisely engineered granules for optimal soil enrichment and nutrient availability. Advanced granulation technology for superior performance.",
    icon: "factory",
    imageSrc: "/images/service-bg-2.webp",
    slug: "granule-technology",
  },
  {
    title: "Infrastructure Leasing",
    concept: "Cost-effective scaling",
    description:
      "Cost-effective options to help businesses scale production with ISO-certified infrastructure for fertilizer manufacturing.",
    icon: "shield",
    imageSrc: "/images/service-bg-3.webp",
    slug: "infrastructure-leasing",
  },
  {
    title: "Custom Packaging Solutions",
    concept: "Tailored packaging",
    description:
      "Tailored packaging options to meet diverse client requirements and market standards. Modern, secure, and brand-ready packaging.",
    icon: "award",
    imageSrc: "/images/service-bg-1.webp",
    slug: "custom-packaging-solutions",
  },
  {
    title: "Job-Work Solutions",
    concept: "Reliable execution",
    description:
      "Reliable job-work services for smooth and efficient fertilizer manufacturing operations. High capacity processing backed by strict QA.",
    icon: "users",
    imageSrc: "/images/service-bg-2.webp",
    slug: "job-work-solutions",
  },
  {
    title: "Supply Chain & Logistics",
    concept: "Pan-India reach",
    description:
      "Strategic logistics ensuring fast, secure, and compliant delivery of bulk fertilizer products across India and global export destinations.",
    icon: "flask",
    imageSrc: "/images/service-bg-3.webp",
    slug: "supply-chain-logistics",
  },
  {
    title: "Custom Formulation & R&D",
    concept: "Tailored nutrient profiles",
    description:
      "Collaborative R&D to develop proprietary mineral-coated and organic fertilizer formulations engineered for specific soil and crop types.",
    icon: "leaf",
    imageSrc: "/images/service-bg-1.webp",
    slug: "custom-formulation-rd",
  },
];

const insightPosts = getAllBlogs().slice(0, 3);

const testimonials = [
  {
    quote: "J K Fertilizers' PROM and Organic Manure gave us remarkable soil enrichment within one crop cycle. Exceptional consistency in granule size.",
    name: "Dr. Arvind Patel",
    title: "Commercial Grower & Agro Consultant, Gujarat",
  },
  {
    quote: "Their job-work and custom formulation services have been outstanding. Prompt delivery, strict FCO compliance, and high coating efficiency.",
    name: "Rajeshwar Sharma",
    title: "Director, Agro-Chemical Brand Partner",
  },
  {
    quote: "Switching to J K Fertilizers' mycorrhiza biofertilizer improved our crop root biomass significantly while reducing synthetic dependency.",
    name: "Mukeshbhai Desai",
    title: "Progressive Farmer, Anand District",
  },
];

const productTickerProducts = products.map((p) => ({
  slug: p.slug,
  name: p.title,
  img: getProductCoverImage(p.slug, p.imageUrl),
}));

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
  hero: "/images/hero.webp",
  factory: "/images/j-k-infra.webp",
  facilityOverview: "/images/facility-overview.webp",
  biopestGranulesHero: "/images/dsc00371.webp",
  whyChoose: "/images/dsc00161.webp",
  faq: "/images/dsc00514.webp",
};

const HomeHero = () => {
  const heroReveal = useScrollReveal();

  return (
    <section className="relative overflow-hidden bg-background">
      <div
        ref={heroReveal.ref}
        className={`relative mx-auto grid grid-cols-1 max-w-7xl gap-8 px-4 py-10 sm:px-6 sm:py-14 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:px-8 lg:py-28 reveal ${heroReveal.isVisible ? 'visible' : ''}`}
      >
        <div className="space-y-6 sm:space-y-8">
          <span className="eyebrow">
            {company.tagline}
          </span>

          <div className="space-y-4">
            <h1 className="max-w-4xl font-heading type-hero-h1 font-bold tracking-tight text-foreground text-balance">
              {company.heroTitle}
            </h1>
            <p className="max-w-xl type-body text-muted-foreground">
              {company.heroSubtitle}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1.5 type-label font-semibold uppercase tracking-[0.16em] text-accent-foreground/80">
              <Award className="h-3 w-3 text-accent" />
              {company.heroTagline}
            </span>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button
              asChild
              className="h-12 rounded-full bg-primary px-6 text-sm font-semibold text-white hover:bg-primary/90 transition-colors duration-200 sm:px-8"
            >
              <Link to="/services">
                See Our Services
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-12 rounded-full border-primary/30 bg-primary/5 px-6 text-sm font-semibold text-primary hover:bg-primary hover:text-white hover:border-primary transition-colors duration-200 sm:px-8"
            >
              <a href={`tel:${company.phoneRaw}`}>
                <PhoneCall className="h-4 w-4" />
                Call Us
              </a>
            </Button>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-border/60 pt-5">
            <div className="flex items-center gap-2 type-body-sm text-muted-foreground">
              <Leaf className="h-4 w-4 shrink-0 text-primary" />
              <span>100% Organic Products</span>
            </div>
            <div className="flex items-center gap-2 type-body-sm text-muted-foreground">
              <Sprout className="h-4 w-4 shrink-0 text-primary" />
              <span>15+ Years Experience</span>
            </div>
            <div className="flex items-center gap-2 type-body-sm text-muted-foreground">
              <Award className="h-4 w-4 shrink-0 text-accent" />
              <span>150+ Trusted Clients</span>
            </div>
          </div>
        </div>

        <div className="ken-burns">
          <ImagePanel
            src={images.hero}
            alt="Sustainable agriculture field"
            eager
            fetchPriority="high"
            decoding="async"
            width={1200}
            height={800}
            className="aspect-[4/3] min-h-[14rem] sm:min-h-72 lg:aspect-[4/4.6] lg:min-h-[38rem]"
            overlay={
            <div className="grid gap-2 grid-cols-2 sm:gap-3">
              <div className="rounded-xl border border-border/60 bg-surface-overlay/95 backdrop-blur-xs p-2.5 shadow-card sm:rounded-2xl sm:p-4">
                <p className="type-label font-bold uppercase tracking-[0.16em] text-primary text-[10px] sm:text-xs">Our promise</p>
                <p className="mt-0.5 font-heading text-xs font-bold text-foreground sm:mt-2 sm:text-base leading-tight">100% Organic Solutions</p>
                <p className="mt-1 hidden type-body-sm text-muted-foreground sm:block">Eco-friendly fertilizers for sustainable farming.</p>
              </div>
              <div className="rounded-xl border border-white/15 bg-secondary/95 backdrop-blur-xs p-2.5 text-white shadow-card sm:rounded-2xl sm:p-4">
                <p className="type-label font-bold uppercase tracking-[0.16em] text-white/70 text-[10px] sm:text-xs">Why J K Fertilizers</p>
                <p className="mt-0.5 font-heading text-xs font-bold sm:mt-2 sm:text-base leading-tight">Quality & Sustainability</p>
                <div className="mt-1 flex items-center gap-1.5 sm:mt-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
                  <span className="type-label text-white/70 text-[10px] sm:text-xs">15+ years experience</span>
                </div>
              </div>
            </div>
          }
        />
        </div>
      </div>
    </section>
  );
};

const HomeStatsBar = () => {
  const statsReveal = useScrollReveal();

  return (
    <section className="relative z-10 mt-6 sm:-mt-10 px-4 pb-4 sm:px-6 lg:px-8">
      <div
        ref={statsReveal.ref}
        className={`mx-auto grid max-w-7xl gap-3 grid-cols-2 md:grid-cols-4 sm:gap-4 reveal-scale ${statsReveal.isVisible ? 'visible' : ''}`}
      >
        {heroStats.map((item, i) => (
          <div
            key={item.label}
            className="rounded-2xl border border-border bg-surface-card p-3.5 sm:p-6 shadow-card"
            {...staggerDelay(i)}
          >
            <p className="font-heading text-xl font-extrabold text-primary sm:text-3xl">
              {item.value}
              {item.unit && <span className="ml-1 text-base sm:text-lg font-semibold text-muted-foreground">{item.unit}</span>}
            </p>
            <p className="mt-1 type-label font-semibold text-muted-foreground uppercase tracking-[0.12em] sm:tracking-[0.14em] sm:mt-2 text-[11px] sm:text-xs leading-tight">{item.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

const HomePromoCards = () => {
  const promoReveal = useScrollReveal();

  const cards = [
    {
      icon: Sprout,
      title: "Innovative Solutions for Modern Agriculture",
      body: "Explore our innovative organic fertilizers designed for higher yields and healthier soils.",
      href: "/products",
      actionText: "Explore Products",
      ariaLabel: "Explore innovative organic fertilizer solutions",
    },
    {
      icon: Award,
      title: "Quality You Can Rely On",
      body: "Our FCO-approved facility ensures every product is premium-grade and effective for all crops.",
      href: "/commitment",
      actionText: "Our Commitment",
      ariaLabel: "Read about our quality standards and sustainability commitment",
    },
    {
      icon: Leaf,
      title: "A Range of Products for Every Need",
      body: "From soil conditioners to micronutrients, we offer solutions tailored for diverse agricultural needs.",
      href: "/products",
      actionText: "View Product Range",
      ariaLabel: "View all fertilizer products and soil solutions",
    },
  ];

  return (
    <section
      ref={promoReveal.ref}
      className={`relative py-10 px-4 sm:px-6 lg:px-8 reveal ${promoReveal.isVisible ? 'visible' : ''}`}
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 sm:gap-8">
          {cards.map((card) => (
            <div
              key={card.title}
              className="group rounded-3xl border border-border bg-surface-card p-6 shadow-card transition-[box-shadow,border-color] duration-300 hover:shadow-card-hover hover:border-primary/20 sm:p-8"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <card.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-6 font-heading type-card-title font-bold text-foreground">
                {card.title}
              </h3>
              <p className="mt-3 type-body-sm text-muted-foreground">
                {card.body}
              </p>
              <div className="mt-6">
                <Link
                  to={card.href}
                  aria-label={card.ariaLabel}
                  className="inline-flex items-center gap-2 type-label font-bold uppercase tracking-[0.16em] text-primary hover:text-primary/80 transition-colors"
                >
                  {card.actionText}
                  <MoveRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const HomeFacilityOverview = () => {
  const facilityReveal = useScrollReveal();

  return (
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
            <div className="rounded-2xl border border-white/15 bg-secondary p-4 shadow-card sm:p-5">
              <p className="type-label font-bold uppercase tracking-[0.16em] text-white/60">Empowering Farmers</p>
              <p className="mt-1 font-heading text-sm font-bold text-white sm:mt-2 sm:text-base">"Enriching Communities through Sustainable Agriculture"</p>
              <div className="mt-2 flex items-center gap-2">
                <Award className="h-3.5 w-3.5 text-accent" />
                <span className="type-body-sm font-semibold text-accent">India's Trusted Fertilizer Manufacturer</span>
              </div>
            </div>
          }
        />
        <div className="space-y-5 sm:space-y-6">
          <span className="eyebrow">
            Better Agriculture for Better Future
          </span>
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
              className="h-12 w-full rounded-full bg-primary px-6 text-sm text-white font-semibold hover:bg-primary/90 transition-colors duration-200 sm:w-auto"
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
  );
};

const HomeProductTicker = () => {
  const section1Reveal = useScrollReveal();

  return (
    <section
      ref={section1Reveal.ref}
      className={`py-10 sm:py-12 lg:py-16 overflow-x-hidden reveal ${section1Reveal.isVisible ? 'visible' : ''}`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-8 sm:mb-10">
        <div className="text-center">
          <span className="eyebrow-accent">
            Our Expertise
          </span>
          <h2 className="mt-4 font-heading type-section-h2 font-bold tracking-tight text-foreground sm:mt-5">
            Delivering Top-Quality Agricultural Solutions
          </h2>
          <p className="mx-auto mt-3 max-w-3xl type-body text-muted-foreground">
            With over 15 years of experience, J K Fertilizers specializes in premium organic fertilizers, mycorrhiza-coated granules, and soil conditioners that enhance crop yields while promoting sustainable farming practices across diverse agricultural sectors.
          </p>
        </div>
      </div>

      <div className="relative overflow-hidden border-y border-border/60 bg-muted py-4 sm:py-5">
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 z-10 sm:w-24 bg-gradient-to-r from-muted to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 z-10 sm:w-24 bg-gradient-to-l from-muted to-transparent" />

        <div className="flex w-full gap-0">
          <div className="flex shrink-0 animate-[marquee_35s_linear_infinite] items-center gap-0">
            {[...productTickerProducts, ...productTickerProducts].map((p, i) => (
              <Link key={`ticker-1-${p.slug}-${i}`} to={`/products/${p.slug}`} className="group flex shrink-0 items-center gap-3 px-4 sm:gap-4 sm:px-6 hover:opacity-90 transition-opacity">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-border bg-surface-card overflow-hidden sm:h-20 sm:w-20">
                  <img src={p.img} alt={p.name} width="80" height="80" className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" loading="lazy" decoding="async" />
                </div>
                <span className="whitespace-nowrap font-heading text-sm font-semibold text-foreground group-hover:text-primary transition-colors">{p.name}</span>
                <span className="h-1.5 w-1.5 rounded-full bg-accent ml-1 flex-shrink-0 sm:ml-2" />
              </Link>
            ))}
          </div>
          <div aria-hidden className="flex shrink-0 animate-[marquee_35s_linear_infinite] items-center gap-0">
            {[...productTickerProducts, ...productTickerProducts].map((p, i) => (
              <div key={`ticker-2-${p.slug}-${i}`} className="flex shrink-0 items-center gap-3 px-4 sm:gap-4 sm:px-6">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-border bg-surface-card overflow-hidden sm:h-20 sm:w-20">
                  <img src={p.img} alt={p.name} width="80" height="80" className="h-full w-full object-cover" loading="lazy" decoding="async" />
                </div>
                <span className="whitespace-nowrap font-heading text-sm font-semibold text-foreground">{p.name}</span>
                <span className="h-1.5 w-1.5 rounded-full bg-accent ml-1 flex-shrink-0 sm:ml-2" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-6 sm:mt-8 flex justify-center">
        <Button
          asChild
          variant="outline"
          className="h-12 rounded-full border-primary/30 bg-primary/5 px-8 text-sm font-semibold text-primary hover:bg-primary hover:text-white transition-colors duration-200"
        >
          <Link to="/products">View All Products</Link>
        </Button>
      </div>
    </section>
  );
};

const HomeQuoteBanner = () => {
  const quoteReveal = useScrollReveal();

  return (
    <section
      ref={quoteReveal.ref}
      className={`relative overflow-hidden py-16 sm:py-24 bg-secondary reveal ${quoteReveal.isVisible ? 'visible' : ''}`}
    >
      <div className="relative mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
        <Quote className="mx-auto h-10 w-10 text-accent/40 rotate-180 sm:h-12 sm:w-12" />
        <h2 className="mt-6 font-accent type-section-h2 italic text-white text-balance">
          "Agriculture is the most healthful, most useful and most noble employment of man."
        </h2>
        <div className="mt-8 flex items-center justify-center gap-3">
          <span className="h-px w-8 bg-accent/40" />
          <p className="type-label font-bold uppercase tracking-[0.16em] text-accent">
            George Washington
          </p>
          <span className="h-px w-8 bg-accent/40" />
        </div>
      </div>
    </section>
  );
};

const HomeFoundationSection = () => {
  const aboutReveal = useScrollReveal();

  return (
    <section className="py-14 sm:py-20 lg:py-28 bg-muted border-y border-border/60">
      <div
        ref={aboutReveal.ref}
        className={`mx-auto grid grid-cols-1 max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:px-8 lg:items-center lg:gap-10 reveal ${aboutReveal.isVisible ? 'visible' : ''}`}
      >
        <ImagePanel
          src={images.factory}
          alt="Manufacturing facility"
          className="aspect-[4/3] min-h-52 sm:min-h-64 lg:min-h-80"
          overlay={
            <div className="rounded-2xl border border-border/60 bg-surface-overlay p-4 shadow-card sm:p-5">
              <p className="type-label font-bold uppercase tracking-[0.16em] text-primary">Founder's message</p>
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
        <div className="space-y-5 sm:space-y-7">
          <span className="eyebrow">
            Our Foundation
          </span>
          <h2 className="font-heading type-section-h2 font-bold tracking-tight text-foreground text-balance">
            Over 15 Years of Expertise in Sustainable Agriculture
          </h2>
          <p className="type-body text-muted-foreground">
            {company.aboutDetails}
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-border/60 bg-surface-card p-4 sm:p-5">
              <p className="type-label font-bold uppercase tracking-[0.16em] text-primary">Our Mission</p>
              <p className="mt-3 font-accent type-body-sm italic text-foreground">
                "Empower growers with effective, environmentally sound solutions that support both productivity and sustainability."
              </p>
            </div>
            <div className="rounded-2xl bg-secondary p-4 text-white sm:p-5">
              <p className="type-label font-bold uppercase tracking-[0.16em] text-white/60">Since 2006</p>
              <p className="mt-3 font-accent type-body-sm text-white/90 italic">
                "J K Fertilizers, headquartered in Gujarat, India, began its journey in 2006 with a commitment to sustainable agriculture."
              </p>
              <p className="mt-3 type-label font-medium text-white/50">— {company.founder}</p>
            </div>
          </div>
          <Button
            asChild
            className="h-12 w-full rounded-full bg-primary px-6 text-sm text-white font-semibold hover:bg-primary/90 transition-colors duration-200 sm:w-auto"
          >
            <Link to="/about">More About Us</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

const HomeWhyChooseSection = () => {
  const cardsReveal = useScrollReveal();

  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-28" ref={cardsReveal.ref}>
      <div className={`grid grid-cols-1 gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center reveal ${cardsReveal.isVisible ? 'visible' : ''}`}>
        <ImagePanel
          src={images.whyChoose}
          alt="Why Choose J K Fertilizers"
          className="aspect-[4/3] min-h-52 sm:min-h-64 lg:min-h-[26rem]"
        />
        <div className="space-y-6">
          <span className="eyebrow">
            Why Choose Us
          </span>
          <h2 className="font-heading type-section-h2 font-bold tracking-tight text-foreground text-balance">
            Nurturing Crops with <span className="text-primary">Nature's Care</span>
          </h2>
          <p className="type-body text-muted-foreground">
            At J K Fertilizers, we believe in sustainable farming practices that promote healthy, chemical-free crops. Our mission is to transform agriculture by offering eco-friendly fertilizers and soil solutions that enhance crop yield without harmful chemicals or GMOs.
          </p>
          <div className="pt-2">
            <Button
              asChild
              className="h-12 rounded-full bg-primary px-6 text-sm text-white font-semibold hover:bg-primary/90 transition-colors duration-200"
            >
              <Link to="/about" aria-label="Learn more about J K Fertilizers, our mission, and our values">
                Learn More About Us
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Grid of benefits cards */}
      <div className={`grid gap-5 sm:grid-cols-2 lg:grid-cols-4 sm:gap-6 mt-16 reveal-scale ${cardsReveal.isVisible ? 'visible' : ''}`}>
        {expertiseCards.map((card, i) => (
          <div key={card.title} {...staggerDelay(i)}>
            <ExpertiseCard card={card} />
          </div>
        ))}
      </div>
    </section>
  );
};

const HomeCommitmentSection = () => {
  const section2Reveal = useScrollReveal();

  return (
    <section className="relative py-14 sm:py-20 lg:py-28 bg-secondary">
      <div
        ref={section2Reveal.ref}
        className={`relative mx-auto grid grid-cols-1 max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_1fr] lg:px-8 lg:items-center lg:gap-10 reveal ${section2Reveal.isVisible ? 'visible' : ''}`}
      >
        <div className="space-y-5 sm:space-y-6">
          <span className="eyebrow-dark">
            Our Commitment
          </span>
          <h2 className="font-heading type-section-h2 font-bold tracking-tight text-white text-balance">
            We Always Bring Customers <span className="text-accent">Green & Clean Products</span>
          </h2>
          <p className="type-body text-white/75 sm:max-w-xl">
            At J K Fertilizers we believe that we have a duty to adhere to good environmental practice, and operate in a sustainable manner. As lovers of plants and the environment it is only natural for us to want to reduce man's impact.
          </p>
          <div className="grid gap-3">
            {commitmentItems.map((item) => (
              <div key={item.title} className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-3 sm:rounded-2xl sm:p-4">
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
              className="h-12 w-full rounded-full bg-accent px-6 text-sm font-bold text-secondary hover:bg-accent/90 transition-colors duration-200 sm:w-auto"
            >
              <Link to="/commitment">See Our Commitment</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-12 w-full rounded-full border-white/25 bg-transparent px-6 text-sm text-white hover:bg-white hover:text-secondary transition-colors duration-200 sm:w-auto"
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
            <div className="rounded-2xl border border-white/15 bg-secondary/95 p-3 sm:p-4">
              <p className="type-label font-bold uppercase tracking-[0.16em] text-white/70">India's Trusted Fertilizer Manufacturer</p>
              <p className="mt-1 font-heading text-sm font-bold text-white sm:text-base">100% Organic · FCO Approved</p>
              <div className="mt-1.5 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                <span className="type-label text-white/60">15+ years of excellence</span>
              </div>
            </div>
          }
        />
      </div>
    </section>
  );
};

const HomeProductsCarousel = () => {
  const carouselReveal = useScrollReveal();

  return (
    <section
      ref={carouselReveal.ref}
      className={`py-14 sm:py-20 lg:py-28 bg-muted border-y border-border/60 reveal ${carouselReveal.isVisible ? 'visible' : ''}`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 sm:mb-10 sm:gap-5 lg:mb-12 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl space-y-3 sm:space-y-4">
            <span className="eyebrow">
              Product Updates
            </span>
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
            className="h-12 w-full rounded-full border-primary/30 bg-primary/5 px-6 text-sm font-semibold text-primary hover:bg-primary hover:text-white transition-colors duration-200 sm:w-auto lg:shrink-0"
          >
            <Link to="/products" aria-label="View all fertilizer and soil nutrition products">View All Products</Link>
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
                  aria-label={`Read more about ${product.title}`}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border/60 bg-surface-card shadow-card transition-[box-shadow,border-color] duration-300 hover:shadow-card-hover hover:border-primary/20 sm:rounded-3xl"
                >
                  <div className="relative h-44 w-full shrink-0 overflow-hidden sm:h-48 lg:h-56">
                    <img
                      src={getProductCoverImage(product.slug, product.imageUrl)}
                      alt={product.title}
                      width={400}
                      height={300}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-5 sm:p-6">
                    <h3 className="font-heading type-card-title font-bold text-foreground">{product.title}</h3>
                    <p className="mt-2 flex-1 type-body-sm text-muted-foreground">{product.summary}</p>
                    <div className="mt-3 flex flex-wrap gap-1.5 sm:mt-4 sm:gap-2">
                      {product.fit.slice(0, 2).map((tag) => (
                        <span key={tag} className="rounded-full border border-accent/30 bg-accent/10 px-2.5 py-0.5 type-label font-semibold text-accent-foreground/80 sm:px-3 sm:py-1">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="mt-4 flex items-center gap-2 type-label font-bold uppercase tracking-[0.16em] text-primary">
                      Read more <span className="sr-only">about {product.title}</span>
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
  );
};

const HomeTestimonialsSection = () => {
  const testimonialReveal = useScrollReveal();

  return (
    <section
      ref={testimonialReveal.ref}
      className={`py-14 sm:py-20 lg:py-28 reveal ${testimonialReveal.isVisible ? 'visible' : ''}`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <span className="eyebrow-accent">
            Client Stories
          </span>
          <h2 className="mt-5 font-heading type-section-h2 font-bold tracking-tight text-foreground">
            What Our Clients Say
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="flex flex-col rounded-3xl border border-border bg-surface-card p-6 shadow-card sm:p-8"
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
                <p className="type-body-sm text-muted-foreground">{t.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const HomeServicesSection = () => {
  const servicesReveal = useScrollReveal();

  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-28" ref={servicesReveal.ref}>
      <div className={`mb-8 flex flex-col gap-4 sm:mb-12 sm:gap-5 lg:mb-14 lg:flex-row lg:items-end lg:justify-between reveal ${servicesReveal.isVisible ? 'visible' : ''}`}>
        <div className="max-w-3xl space-y-3 sm:space-y-4">
          <span className="eyebrow-accent">
            Services We Provide
          </span>
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
          className="h-12 w-full rounded-full border-primary/30 bg-primary/5 px-6 text-sm font-semibold text-primary hover:bg-primary hover:text-white transition-colors duration-200 sm:w-auto lg:shrink-0"
        >
          <Link to="/services">View All Services</Link>
        </Button>
      </div>
      <div className={`grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 reveal-scale ${servicesReveal.isVisible ? 'visible' : ''}`}>
        {services.slice(0, 6).map((service, i) => (
          <div key={service.title} {...staggerDelay(i)} className="h-full">
            <ServiceCard service={service} />
          </div>
        ))}
      </div>
    </section>
  );
};

const HomeBlogSection = () => {
  const blogReveal = useScrollReveal();

  return (
    <section
      ref={blogReveal.ref}
      className={`py-14 sm:py-20 lg:py-28 bg-muted border-y border-border/60 reveal ${blogReveal.isVisible ? 'visible' : ''}`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 sm:mb-12 sm:gap-5 lg:mb-14 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl space-y-3 sm:space-y-4">
            <span className="eyebrow">
              From The Blog
            </span>
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
            className="h-12 w-full rounded-full border-primary/30 bg-primary/5 px-6 text-sm font-semibold text-primary hover:bg-primary hover:text-white transition-colors duration-200 sm:w-auto lg:shrink-0"
          >
            <Link to="/blog">View All Articles</Link>
          </Button>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {insightPosts.map((post, i) => (
            <div key={post.slug} {...staggerDelay(i)}>
              <InsightCard post={post} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const HomeFaqSection = () => {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-28">
      <div className="mb-12 text-center">
        <span className="eyebrow">
          FAQ
        </span>
        <h2 className="mt-5 font-heading type-section-h2 font-bold tracking-tight text-foreground">
          Frequently Asked Questions
        </h2>
        <p className="mx-auto mt-3 max-w-xl type-body text-muted-foreground">
          Answers to common questions about our products, ordering, and bulk supply.
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
        <div className="space-y-4">
          {faqs.map((faq) => (
            <div key={faq.q} className="rounded-2xl border border-border bg-surface-card p-6 shadow-card sm:p-7">
              <p className="font-heading type-card-title font-semibold text-foreground">{faq.q}</p>
              <p className="mt-3 type-body-sm text-muted-foreground">{faq.a}</p>
            </div>
          ))}
        </div>
        <ImagePanel
          src={images.faq}
          alt="J K Fertilizers farm support"
          className="aspect-[4/3] min-h-52 sm:min-h-64"
          overlay={
            <div className="rounded-2xl border border-white/15 bg-secondary/95 p-4">
              <p className="font-heading text-sm font-bold text-white">You didn't find your question?</p>
              <p className="mt-1 type-body-sm text-white/80">Connect with us today — we are happy to help.</p>
              <div className="mt-3">
                <Button asChild className="h-10 rounded-full bg-accent text-secondary hover:bg-accent/90 px-5 text-sm font-bold">
                  <Link to="/contact">Contact Us</Link>
                </Button>
              </div>
            </div>
          }
        />
      </div>
    </section>
  );
};

const HomeContactSection = () => {
  const contactReveal = useScrollReveal();

  return (
    <section
      ref={contactReveal.ref}
      className={`py-14 sm:py-20 lg:py-28 bg-secondary reveal ${contactReveal.isVisible ? 'visible' : ''}`}
    >
      <div className="mx-auto grid grid-cols-1 max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8 lg:items-start lg:gap-10">
        <div className="space-y-5 sm:space-y-6">
          <span className="eyebrow-dark">
            Work With Us
          </span>
          <h2 className="font-heading type-section-h2 font-bold tracking-tight text-white text-balance">
            Contact Us <span className="text-accent">Today</span>
          </h2>
          <p className="type-body text-white/75 sm:max-w-2xl">
            Tell us what you need — we reply within one working day.
          </p>
          <div className="grid gap-3 pt-2 type-body-sm text-white/70">
            <div className="flex items-start gap-2">
              <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <span className="min-w-0 break-words">{company.address}</span>
            </div>
            <div className="flex items-center gap-2">
              <ChevronRight className="h-4 w-4 shrink-0 text-accent" />
              <span>Call us: {company.phoneDisplay} / 92 / 91</span>
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
              className="h-12 w-full rounded-full bg-accent px-6 text-sm font-bold text-secondary hover:bg-accent/90 transition-colors duration-200 sm:w-auto"
            >
              <a href={`tel:${company.phoneRaw}`}>Call {company.phoneDisplay}</a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-12 w-full rounded-full border-white/25 bg-transparent px-6 text-sm text-white hover:bg-white hover:text-secondary transition-colors duration-200 sm:w-auto"
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
  );
};

const HomePage = () => {
  return (
    <>
      <SEOHead
        title="Organic Fertilizer Manufacturer Gujarat | J K Fertilizers"
        description="J K Fertilizers is a leading FCO approved organic fertilizer manufacturer in Anand, Gujarat. Specializing in Organic Manure, PDM, PROM, Mycorrhiza & coated granules."
        canonical="/"
        ogImage="/images/hero.webp"
        keywords="organic fertilizer manufacturer india, J K Fertilizers, organic manure manufacturer gujarat, prom fertilizer, pdm fertilizer, mycorrhiza granules, fertilizer manufacturer anand gujarat"
        schema={[organizationSchema, websiteSchema, homeFaqSchema]}
        article={null}
        product={null}
      />
      <HomeHero />
      <HomeStatsBar />
      <HomePromoCards />
      <HomeFacilityOverview />
      <HomeProductTicker />
      <HomeQuoteBanner />
      <HomeFoundationSection />
      <HomeWhyChooseSection />
      <HomeCommitmentSection />
      <HomeProductsCarousel />
      <HomeTestimonialsSection />
      <HomeServicesSection />
      <HomeBlogSection />
      <HomeFaqSection />
      <HomeContactSection />
    </>
  );
};

export { HomePage };
