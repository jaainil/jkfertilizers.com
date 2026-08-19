import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/PageHero";
import { SEOHead } from "@/components/SEOHead";
import { organizationSchema, historyPageSchema } from "@/data/seoSchemas";
import { useScrollReveal, staggerDelay } from "@/hooks/useScrollReveal";
import { Leaf } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const company = {
  name: "J K Fertilizers",
  tagline: "FCO-Approved Organic Fertilizers & Granules",
  subTagline: "Manufacturers of Organic Fertilizers",
  mission: "To advance agricultural productivity and soil health through FCO-approved organic fertilizers and mineral base granules.",
  phoneDisplay: "9825045894",
  phoneRaw: "+919825045894",
  address: "NH. 48, Opp. IOC Petrol Pump, B/H Adas Bus Stop, Vasad, Dist: Anand, Gujarat - 388305 INDIA",
};

const timeline = [
  {
    year: "2006",
    title: "Founding in Anand, Gujarat",
    description: "Founded in 2006 by Mr. Akash Dadhania, J K Fertilizers commenced commercial operations with its first dedicated organic manure manufacturing facility in Anand district.",
    image: "/images/drone-view-3.webp",
  },
  {
    year: "2010",
    title: "Granulation Capacity Expansion",
    description: "Established a 100 MT/day granule production unit and upgraded raw material handling systems to serve growing regional demand for solid fertilizers.",
    image: "/images/capacity-expansion.webp",
  },
  {
    year: "2012",
    title: "Commissioning 400 MT Granulation Plant",
    description: "Commissioned a 400 MT/day rotary drum granulation line and a 200 MT/day powder processing facility, expanding institutional supply across Western India.",
    image: "/images/granulation-plant.webp",
  },
  {
    year: "2018",
    title: "Specialized Coating Lines & Liquid Plant",
    description: "Added dedicated rotary drum coating lines (30, 60, and 100 MT capacity) for bio-inoculants and micronutrients, alongside a 15,000-liter liquid formulation unit.",
    image: "/images/diversifying-machinery.webp",
  },
  {
    year: "2020",
    title: "Scaling Throughput to 700 MT/Day",
    description: "Expanded total processing throughput across granulation, blending, and drying units to 700 MT per day, backed by automated bagging systems.",
    image: "/images/unprecedented-growth.webp",
  },
  {
    year: "2022",
    title: "Mineral Carrier Infrastructure & Godowns",
    description: "Launched dedicated mineral carrier granulation lines (gypsum, dolomite, silica) with expanded covered warehouse godowns to support large-scale contract manufacturing.",
    image: "/images/transforming-agriculture.webp",
  },
  {
    year: "2024",
    title: "Mycorrhiza Technical & Automated Bottling",
    description: "Commissioned an in-house technical mycorrhizal spore production facility and automated liquid bottling lines, expanding biological crop nutrition solutions.",
    image: "/images/pioneering-innovation.webp",
  },
];

const machineryGallery = [
  { src: "/images/machinery-6.webp", title: "Granule Production Machinery", desc: "Rotary drum granulation line for uniform 2–4 mm organic and mineral granules." },
  { src: "/images/machinery-8.webp", title: "Customized Coating Plant", desc: "Rotary coating drums for applying mycorrhizal spores, humic acid, and micronutrients." },
  { src: "/images/dsc00142.webp", title: "Raw Material Processing", desc: "Crushing, screening, and proportioning of mineral and organic substrates." },
  { src: "/images/dsc00210.webp", title: "Vasad Packaging Unit", desc: "Automated bagging, stitching, and palletizing lines for commercial dispatch." },
];

export const HistoryPage = () => {
  const introReveal = useScrollReveal();
  const timelineReveal = useScrollReveal();
  const galleryReveal = useScrollReveal();
  const ctaReveal = useScrollReveal();

  return (
    <>
      <SEOHead
        title="Company History & Milestones | J K Fertilizers Gujarat"
        description="Discover the history of J K Fertilizers since 2006. From our first organic manure unit to 700 MT/day processing capacity in Vasad, Gujarat."
        canonical="/history"
        ogImage="/images/drone-view-3.webp"
        keywords="J K Fertilizers history, organic fertilizer manufacturer history, Vasad granulation plant, Akash Dadhania, fertilizer timeline"
        schema={[organizationSchema, historyPageSchema]}
      />

      {/* ── Page Hero ── */}
      <PageHero
        eyebrow="Our Journey"
        title="Manufacturing Organic Fertilizers in Gujarat Since 2006"
        description="Two decades of continuous investment in granulation engineering, quality testing, and agricultural manufacturing infrastructure."
        imageSrc="/images/drone-view-3.webp"
        imageAlt="J K Fertilizers manufacturing complex"
        badges={["Established 2006", "700 MT Daily Capacity", "FCO-Approved Facility"]}
        primaryCta={
          <Button asChild className="h-12 rounded-full bg-primary px-6 text-white hover:bg-primary/90">
            <Link to="/contact">Work With Us</Link>
          </Button>
        }
        secondaryCta={
          <Button asChild variant="outline" className="h-12 rounded-full border-primary px-6 text-primary hover:bg-primary hover:text-white">
            <Link to="/about">Our Team & Values</Link>
          </Button>
        }
      />

      {/* ── Mission Statement Bar ── */}
      <section className="bg-secondary py-14 lg:py-16 text-white text-center">
        <div className="mx-auto max-w-4xl px-4" ref={introReveal.ref}>
          <span className="eyebrow-dark mb-4">
            <Leaf className="h-3.5 w-3.5 text-accent" />
            Mission Statement
          </span>
          <h2 className="font-heading type-card-title font-semibold italic leading-relaxed text-white/95">
            "{company.mission}"
          </h2>
        </div>
      </section>

      {/* ── Timeline Section ── */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28 relative overflow-hidden">
        <div className="text-center mb-16">
          <span className="eyebrow">
            Key Milestones
          </span>
          <h2 className="mt-4 font-heading type-section-h2 font-bold tracking-tight text-foreground">
            Our Growth Over The Years
          </h2>
          <p className="mx-auto mt-3 max-w-2xl type-body text-muted-foreground">
            A chronological timeline detailing our manufacturing expansion, innovation milestones, and corporate partnerships.
          </p>
        </div>

        <div className="space-y-16 md:space-y-24" ref={timelineReveal.ref}>
          {timeline.map((item, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div
                key={item.year}
                className={`relative grid grid-cols-1 md:grid-cols-[1fr_100px_1fr] items-center gap-8 md:gap-0 reveal ${
                  timelineReveal.isVisible ? "visible" : ""
                }`}
                {...staggerDelay(idx)}
              >
                {/* Timeline vertical line connector segment */}
                <div
                  className={`absolute left-1/2 w-0.5 -translate-x-1/2 bg-border/80 hidden md:block ${
                    idx === 0
                      ? "top-1/2 bottom-[-6rem]"
                      : idx === timeline.length - 1
                      ? "top-0 bottom-1/2"
                      : "top-0 bottom-[-6rem]"
                  }`}
                />
                {/* Left side: text for even, image for odd */}
                <div className={`order-1 ${isEven ? "md:order-1 md:text-right md:pr-12" : "md:order-3 md:pl-12"}`}>
                  {isEven ? (
                    <div className="space-y-4">
                      <span className="inline-block text-accent font-heading text-lg font-bold tracking-widest md:hidden">
                        {item.year}
                      </span>
                      <h3 className="font-heading type-card-title font-bold text-foreground">{item.title}</h3>
                      <p className="type-body-sm text-muted-foreground">{item.description}</p>
                    </div>
                  ) : (
                    <div className="group overflow-hidden rounded-2xl border border-border/60 bg-surface-card shadow-card aspect-[4/3] relative">
                      <img
                        src={item.image}
                        alt={item.title}
                        width={600}
                        height={450}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  )}
                </div>

                {/* Center: Year node */}
                <div className="order-2 flex justify-center z-10">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-primary bg-surface-card text-primary font-heading font-extrabold shadow-card hover:bg-primary hover:text-white transition-colors duration-300">
                    {item.year}
                  </div>
                </div>

                {/* Right side: image for even, text for odd */}
                <div className={`order-3 ${isEven ? "md:order-3 md:pl-12" : "md:order-1 md:text-right md:pr-12"}`}>
                  {!isEven ? (
                    <div className="space-y-4">
                      <span className="inline-block text-accent font-heading text-lg font-bold tracking-widest md:hidden">
                        {item.year}
                      </span>
                      <h3 className="font-heading type-card-title font-bold text-foreground">{item.title}</h3>
                      <p className="type-body-sm text-muted-foreground">{item.description}</p>
                    </div>
                  ) : (
                    <div className="group overflow-hidden rounded-2xl border border-border/60 bg-surface-card shadow-card aspect-[4/3] relative">
                      <img
                        src={item.image}
                        alt={item.title}
                        width={600}
                        height={450}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── State of the Art Infrastructure Gallery ── */}
      <section
        className="bg-muted py-20 lg:py-28"
        ref={galleryReveal.ref}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <span className="eyebrow">
              Vasad Infrastructure
            </span>
            <h2 className="mt-4 font-heading type-section-h2 font-bold tracking-tight text-foreground">
              Granulation &amp; Coating Facilities
            </h2>
            <p className="mx-auto mt-3 max-w-2xl type-body text-muted-foreground">
              Our advanced technology ensures precise coating, high daily outputs, and strict FCO-compliant quality controls.
            </p>
          </div>

          <Carousel
            opts={{ align: "start", loop: true }}
            plugins={[Autoplay({ delay: 3500, stopOnInteraction: false, stopOnMouseEnter: true })]}
            className="w-full"
          >
            <CarouselContent className="-ml-4 sm:-ml-6 items-stretch">
              {machineryGallery.map((img, index) => (
                <CarouselItem key={index} className="pl-4 sm:pl-6 basis-[90%] sm:basis-1/2 lg:basis-1/4">
                  <div className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border/60 bg-surface-card shadow-card hover:shadow-card-hover transition-shadow duration-300">
                    <div className="relative aspect-video shrink-0 overflow-hidden">
                      <img
                        src={img.src}
                        alt={img.title}
                        width={400}
                        height={225}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <div className="flex-1 p-5 space-y-2">
                      <h4 className="font-heading text-base font-bold text-foreground group-hover:text-primary transition-colors">
                        {img.title}
                      </h4>
                      <p className="type-body-sm text-muted-foreground">
                        {img.desc}
                      </p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </section>

      {/* ── Let's Cooperate CTA ── */}
      <section className="bg-secondary py-20 lg:py-28" ref={ctaReveal.ref}>
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <span className="eyebrow-dark">
            Let's Cooperate Together
          </span>
          <h2 className="mt-6 font-heading type-section-h2 font-semibold tracking-tight text-white">
            Partner with a Leader in Sustainable Fertilizer Production
          </h2>
          <p className="mx-auto mt-4 max-w-2xl type-body text-white/78">
            Whether you are a government agency, a PSU, a corporate entity, or a local distributor, we have the capacity and quality standard to scale your agricultural goals.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button asChild className="h-12 rounded-full bg-accent px-8 text-secondary font-semibold hover:bg-accent/80">
              <Link to="/contact">Contact Our Team</Link>
            </Button>
            <Button asChild variant="outline" className="h-12 rounded-full border-white/30 bg-transparent px-8 text-white hover:bg-white hover:text-secondary">
              <Link to="/products">Explore Our Products</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};
