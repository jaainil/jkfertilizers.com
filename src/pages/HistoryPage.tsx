import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/PageHero";
import { ImagePanel } from "@/components/ImagePanel";
import { SEOHead } from "@/components/SEOHead";
import { organizationSchema, historyPageSchema } from "@/data/seoSchemas";
import { useScrollReveal, staggerDelay } from "@/hooks/useScrollReveal";
import { CheckCircle2, ArrowRight, Sprout, Award, Leaf, Calendar, Cpu, Layers } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const company = {
  name: "J K Fertilizers",
  tagline: "Organic, Naturally",
  subTagline: "Manufacturers of Organic Fertilizers",
  mission: "To sustainably advance agricultural productivity and soil health through innovative, eco-friendly fertilizer solutions.",
  phoneDisplay: "9825045894",
  phoneRaw: "+919825045894",
  address: "NH. 48, Opp. IOC Petrol Pump, B/H Adas Bus Stop, Vasad, Dist: Anand, Gujarat - 388305 INDIA",
};

const timeline = [
  {
    year: "2006",
    title: "The Beginning of a Vision",
    description: "Founded in 2006 by Mr. Akash Dadhania, J K Fertilizers has consistently grown through strategic investments in infrastructure and expansion of production capacity, with a focus on organic fertilizers and a commitment to sustainable agricultural practices. J K Fertilizers commenced operations with its first organic manure plant. This humble beginning laid the foundation for a pioneering legacy in sustainable agriculture.",
    image: "/images/drone-view-3.jpg",
  },
  {
    year: "2010",
    title: "Expanding Production Capacity",
    description: "Between 2010 and 2012, the company added a 400 MT granulation plant and a 200 MT powder plant, significantly increasing its production capabilities. This expansion helped meet rising demand and solidified J K Fertilizers’ presence in the industry. In 2010, we took a significant step forward by establishing a 100 MT granule production unit. This milestone marked the beginning of our transformation into a large-scale fertilizer manufacturer.",
    image: "/images/capacity-expansion.jpg",
  },
  {
    year: "2012",
    title: "Adding a Granulation Plant",
    description: "Continuing our growth, we introduced a state-of-the-art 400 MT granulation plant in 2012. This advancement further strengthened our production capabilities, enabling us to cater to an expanding customer base effectively.",
    image: "/images/granulation-plant.jpg",
  },
  {
    year: "2018",
    title: "Diversifying and Innovating",
    description: "In 2018, we set a new standard for excellence by adding multiple granule coating plants with capacities of 30, 60, and 100 MT, along with a 15,000-liter liquid plant. This marked our commitment to diversifying product offerings and enhancing production efficiency, catering to the evolving demands of modern agriculture.",
    image: "/images/diversifying-machinery.jpg",
  },
  {
    year: "2020",
    title: "Unprecedented Growth",
    description: "By 2020, J K Fertilizers achieved a groundbreaking milestone by increasing its granule production capacity to an impressive 700 MT per day. This expansion solidified our position as a leader in the organic fertilizer industry, empowering us to serve larger markets with unparalleled efficiency.",
    image: "/images/unprecedented-growth.jpg",
  },
  {
    year: "2022",
    title: "Transforming Agriculture at Scale",
    description: "In 2022, we launched a specialized coating and coated nutritious granules plant, further diversifying our portfolio. Our efforts culminated in a combined production capacity of 700 MT per day, supported by enhanced leasing infrastructure and expansive storage facilities. This allowed us to forge partnerships with government organizations, PSUs, corporates, and MSMEs, marking a significant leap in our growth trajectory.",
    image: "/images/transforming-agriculture.jpg",
  },
  {
    year: "2024",
    title: "Pioneering Innovation",
    description: "This year, we took another transformative step by establishing a cutting-edge facility for producing Mycorrhiza technical, a revolutionary addition to our product range aimed at enhancing soil health and crop productivity. Additionally, the inauguration of our ambitious liquid filling plant reflects our dedication to offering holistic solutions for sustainable agriculture.",
    image: "/images/pioneering-innovation.jpg",
  },
];

const machineryGallery = [
  { src: "/images/machinery-6.jpg", title: "Granule Production Machinery", desc: "Advanced granulation line for uniform and nutrient-rich organic granules." },
  { src: "/images/machinery-8.jpg", title: "Customized Coating Plant", desc: "Specialized coating drums for precise technical mycorrhiza/coating application." },
  { src: "/images/dsc00142.jpg", title: "Raw Material Processing", desc: "State-of-the-art sorting and processing of premium organic materials." },
  { src: "/images/dsc00210.jpg", title: "Vasad Packaging Unit", desc: "High-capacity automated bagging and finishing for commercial delivery." },
];

export const HistoryPage = () => {
  const introReveal = useScrollReveal();
  const timelineReveal = useScrollReveal();
  const galleryReveal = useScrollReveal();
  const ctaReveal = useScrollReveal();

  return (
    <>
      <SEOHead
        title="Our History & Milestones — J K Fertilizers | Anand, Gujarat"
        description="Discover the journey of J K Fertilizers since 2006. Learn how we expanded from our first organic manure unit to 700 MT/day capacity in Vasad, Gujarat."
        canonical="/history"
        ogImage="/images/drone-view-3.jpg"
        keywords="J K Fertilizers history, organic fertilizer manufacturer history, Vasad granulation plant, Akash Dadhania, fertilizer timeline"
        schema={[organizationSchema, historyPageSchema]}
      />

      {/* ── Page Hero ── */}
      <PageHero
        eyebrow="Our Journey"
        title="Nurturing Growth, Pioneering Sustainable Agriculture Since 2006"
        description="A legacy of innovation, infrastructure expansion, and premium organic solutions for a greener future."
        imageSrc="/images/drone-view-3.jpg"
        imageAlt="J K Fertilizers drone view"
        badges={["Established 2006", "700 MT Daily Capacity", "ISO Certified Facility"]}
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
      <section className="bg-secondary py-14 lg:py-16 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }} />
        <div className="relative mx-auto max-w-4xl px-4" ref={introReveal.ref}>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.24em] text-accent-foreground/80 mb-4">
            <Leaf className="h-3.5 w-3.5 text-accent" />
            Mission Statement
          </div>
          <h2 className="font-heading text-xl sm:text-2xl font-semibold italic leading-relaxed text-white/95">
            "{company.mission}"
          </h2>
        </div>
      </section>

      {/* ── Timeline Section ── */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28 relative overflow-hidden">
        <div className="text-center mb-16">
          <div className="inline-flex rounded-full border border-border bg-surface-overlay px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-primary">
            Key Milestones
          </div>
          <h2 className="mt-4 font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Our Growth Over The Years
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-base text-muted-foreground">
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
                {...staggerDelay(idx, 100)}
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
                      <h3 className="font-heading text-2xl font-bold text-foreground">{item.title}</h3>
                      <p className="text-sm leading-7 text-muted-foreground">{item.description}</p>
                    </div>
                  ) : (
                    <div className="group overflow-hidden rounded-[24px] border border-border/60 bg-surface-card shadow-md aspect-[4/3] relative">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                  )}
                </div>

                {/* Center: Year node */}
                <div className="order-2 flex justify-center z-10">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-primary bg-surface-card text-primary font-heading font-extrabold shadow-md hover:bg-primary hover:text-white transition-colors duration-300">
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
                      <h3 className="font-heading text-2xl font-bold text-foreground">{item.title}</h3>
                      <p className="text-sm leading-7 text-muted-foreground">{item.description}</p>
                    </div>
                  ) : (
                    <div className="group overflow-hidden rounded-[24px] border border-border/60 bg-surface-card shadow-md aspect-[4/3] relative">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
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
        className="bg-muted py-20 lg:py-28 section-wave"
        ref={galleryReveal.ref}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <div className="inline-flex rounded-full border border-border bg-surface-overlay px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-primary">
              Vasad Infrastructure
            </div>
            <h2 className="mt-4 font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              State-of-the-Art Granulation &amp; Coating Facilities
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-base text-muted-foreground">
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
                  <div className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border/60 bg-surface-card shadow-sm hover:shadow-md transition-all duration-300">
                    <div className="relative aspect-video shrink-0 overflow-hidden">
                      <img
                        src={img.src}
                        alt={img.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                    <div className="flex-1 p-5 space-y-2">
                      <h4 className="font-heading text-base font-bold text-foreground group-hover:text-primary transition-colors">
                        {img.title}
                      </h4>
                      <p className="text-xs leading-5 text-muted-foreground">
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
          <div className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-white/80">
            Let's Cooperate Together
          </div>
          <h2 className="mt-6 font-heading text-3xl font-semibold tracking-tight text-white sm:text-5xl">
            Partner with a Leader in Sustainable Fertilizer Production
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-white/78 sm:text-lg">
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
