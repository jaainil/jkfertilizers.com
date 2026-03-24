import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/PageHero";
import { ServiceCard } from "@/components/ServiceCard";
import { InquiryForm } from "@/components/InquiryForm";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { SEOHead } from "@/components/SEOHead";
import { organizationSchema, servicesSchema } from "@/data/seoSchemas";
import { getAllServices } from "@/lib/content";

const company = {
  name: "Adit Biorganic",
  phoneDisplay: "+91 98250 45894",
  phoneRaw: "+919825045894",
  emails: ["info@aditbiorganic.com", "sales@aditbiorganic.com"],
  address: "S. No. 1152, Kanatalavdi Road, Adas, Anand, Gujarat - 388305",
};

const coreFeatures = [
  "Custom \"Recipe\" Formulations",
  "Mineral & Organic Base Materials",
  "Superior Alternative to Bentonite",
  "High-Volume 190+ MT/Day Capacity",
  "Promotes Long-Term Soil Health",
];

const services = getAllServices();

const processSteps = [
  {
    step: "01",
    title: "Requirement Alignment",
    description: "We understand your formulation goal, target application, packaging needs, and dispatch expectations.",
  },
  {
    step: "02",
    title: "Granule Design & Validation",
    description: "Base selection, recipe development, and production checks are aligned before scale manufacturing begins.",
  },
  {
    step: "03",
    title: "Controlled Production",
    description: "Granulation, coating, drying, and handling follow a disciplined workflow built for repeatability and consistency.",
  },
  {
    step: "04",
    title: "Packing & Dispatch",
    description: "Finished goods are prepared for warehouse movement, partner pickup, or onward distribution support.",
  },
];

const images = {
  hero: "/images/hero.jpg",
  factory: "/images/factory.jpg",
  granules: "/images/granules.jpg",
  lab: "/images/lab.jpg",
  customizedGranules: "/images/customized-granules.jpg",
};

import { useScrollReveal, staggerDelay } from "@/hooks/useScrollReveal";

export const ServicesPage = () => {
  const coreReveal = useScrollReveal();
  const listReveal = useScrollReveal();
  const processReveal = useScrollReveal();
  const statsReveal = useScrollReveal();
  const contactReveal = useScrollReveal();

  return (
  <>
    <SEOHead
      title="B2B Fertilizer Manufacturing Services — Custom Formulation, Contract Mfg, Gujarat"
      description="Adit Biorganic offers 7 B2B fertilizer manufacturing services: organic granule production (190+ MT/day), custom formulation, job work/contract manufacturing, coating services, ISO lab testing, private label packaging & warehouse facilities. Anand, Gujarat, India."
      canonical="/services"
      ogImage="/images/service-bg-1.jpg"
      keywords="fertilizer contract manufacturing india, custom fertilizer formulation gujarat, b2b fertilizer manufacturing services, job work fertilizer manufacturer, private label fertilizer india, fertilizer coating services, granule manufacturing services gujarat"
      schema={[organizationSchema, servicesSchema]}
    />
    {/* ── Hero ── */}
    <PageHero
      eyebrow="Our Services"
      title="What Services Do We Provide?"
      description="Comprehensive, end-to-end B2B manufacturing solutions — from custom recipe formulation and granule production to precision coating, quality testing, packaging, and warehousing."
      imageSrc={images.lab}
      imageAlt="Adit Biorganic laboratory and testing operations"
      badges={["Contract Manufacturing", "ISO 9001:2015 Certified", "190+ MT/Day"]}
      primaryCta={
        <Button asChild className="h-12 rounded-full bg-primary px-6 text-white hover:bg-primary/90">
          <Link to="/contact">Discuss a requirement</Link>
        </Button>
      }
      secondaryCta={
        <Button asChild variant="outline" className="h-12 rounded-full border-primary px-6 text-primary hover:bg-primary hover:text-white">
          <Link to="/products">See product lines</Link>
        </Button>
      }
    />

    {/* ── Core Manufacturing Feature — big split section ── */}
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div 
        ref={coreReveal.ref}
        className={`grid gap-14 lg:grid-cols-[1fr_1fr] lg:items-center reveal ${coreReveal.isVisible ? 'visible' : ''}`}
      >
        {/* Left: real image */}
        <div className="relative overflow-hidden rounded-4xl border border-border shadow-[0_24px_70px_rgba(15,23,42,0.08)]">
          <img
            src={images.customizedGranules}
            alt="Advanced Custom Granule Manufacturing — Adit Biorganic"
            className="h-full w-full object-cover"
            style={{ minHeight: "480px" }}
          />
          <div className="absolute inset-0 bg-linear-to-t from-secondary/60 via-transparent to-transparent" />
          <div className="absolute bottom-5 left-5 right-5">
            <div className="rounded-3xl border border-white/25 bg-white/10 p-5 backdrop-blur-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/75">Our core expertise</p>
              <p className="mt-1 font-heading text-lg font-semibold text-white">Custom "Recipe" Granule Manufacturing</p>
            </div>
          </div>
        </div>

        {/* Right: content */}
        <div className="space-y-7">
          <div className="inline-flex rounded-full border border-border bg-surface-overlay px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-primary">
            Our Core Manufacturing Service
          </div>
          <h2 className="font-heading text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Advanced Custom Granule Manufacturing
          </h2>
          <p className="text-base leading-8 text-muted-foreground sm:text-lg">
            We are specialists in manufacturing high-quality organic and mineral base granules. We move beyond standard bentonite to create custom <strong className="text-foreground">"Recipe Granules"</strong> from materials like Gypsum, Dolomite, and more — perfectly tailored to your specific nutrient and coating needs.
          </p>
          <div className="space-y-3">
            {coreFeatures.map((f) => (
              <div key={f} className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 shrink-0 text-accent" />
                <span className="text-sm font-medium text-foreground">{f}</span>
              </div>
            ))}
          </div>
          <Button asChild className="h-12 rounded-full bg-primary px-6 text-white hover:bg-primary/90">
            <Link to="/products">
              View Products
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>

    {/* ── "One Stop Solutions" label + all 7 service cards ── */}
    <section className="bg-muted py-20 lg:py-28 section-wave">
      <div 
        ref={listReveal.ref}
        className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 reveal ${listReveal.isVisible ? 'visible' : ''}`}
      >
        <div className="mb-14 text-center">
          <div className="inline-flex rounded-full border border-border bg-surface-overlay px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-primary">
            What Is Our Expertise?
          </div>
          <h2 className="mt-5 font-heading text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            "One Stop Solutions"
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
            From granulation to dispatch, every step of your fertilizer manufacturing journey is handled under one roof.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <div key={service.title} {...staggerDelay(i, 100)}>
              <ServiceCard service={service} />
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* ── Process Steps ── */}
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div ref={processReveal.ref} className={`mb-14 text-center reveal ${processReveal.isVisible ? 'visible' : ''}`}>
        <div className="inline-flex rounded-full border border-border bg-surface-overlay px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-primary">
          How We Work
        </div>
        <h2 className="mt-5 font-heading text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          Our Operating Process
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
          A simple, transparent flow — from your first requirement to final dispatch.
        </p>
      </div>
      <div className={`grid gap-6 md:grid-cols-2 lg:grid-cols-4 reveal-scale ${processReveal.isVisible ? 'visible' : ''}`}>
        {processSteps.map((step, i) => (
          <div
            key={step.title}
            {...staggerDelay(i, 100)}
            className="group relative overflow-hidden rounded-[28px] border border-border bg-surface-card p-7 shadow-[0_16px_50px_rgba(16,24,40,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(16,24,40,0.1)]"
          >
            {/* Large faded step number in background */}
            <p className="absolute -right-2 -top-4 font-heading text-8xl font-bold text-primary/5 select-none">
              {step.step}
            </p>
            <div className="relative">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-white font-heading text-base font-bold">
                {step.step}
              </div>
              <h3 className="mt-5 font-heading text-xl font-semibold text-foreground">{step.title}</h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>

    {/* ── Infrastructure highlight band ── */}
    <section className="bg-secondary py-16 lg:py-20">
      <div 
        ref={statsReveal.ref}
        className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 reveal-scale ${statsReveal.isVisible ? 'visible' : ''}`}
      >
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { value: "190+ MT", label: "Daily Production Capacity" },
            { value: "24/7", label: "Round-the-Clock Operations" },
            { value: "ISO", label: "9001:2015 Certified Lab" },
            { value: "7+", label: "End-to-End Services" },
          ].map((stat, i) => (
            <div key={stat.label} className="group text-center" {...staggerDelay(i, 100)}>
              <p className="font-heading text-5xl font-bold text-white">{stat.value}</p>
              <p className="mt-2 text-base text-white/80">{stat.label}</p>
              <div className="mx-auto mt-3 h-0.5 w-10 rounded-full bg-accent/60 transition-all duration-300 group-hover:w-16" />
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* ── Contact CTA + Form ── */}
    <section className="bg-muted py-20 lg:py-28 section-wave">
      <div 
        ref={contactReveal.ref}
        className={`mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_1fr] lg:px-8 lg:items-start reveal ${contactReveal.isVisible ? 'visible' : ''}`}
      >
        <div className="space-y-7">
          <div className="inline-flex rounded-full border border-border bg-surface-overlay px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-primary">
            Let's Cooperate Together
          </div>
          <h2 className="font-heading text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Contact Us Today!
          </h2>
          <p className="text-base leading-8 text-muted-foreground sm:text-lg">
            We will reply within 24 hours via email. Share your requirement and our team will follow up with the right commercial or technical conversation.
          </p>
          {/* Contact info cards */}
          <div className="grid gap-4">
            <a
              href={`tel:${company.phoneRaw}`}
              className="flex items-center gap-4 rounded-[20px] border border-border bg-surface-card p-5 shadow-sm transition hover:border-primary/30 hover:shadow-md"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Phone</p>
                <p className="mt-0.5 font-heading text-lg font-semibold text-foreground">{company.phoneDisplay}</p>
              </div>
            </a>
            {company.emails.map((email) => (
              <a
                key={email}
                href={`mailto:${email}`}
                className="flex items-center gap-4 rounded-[20px] border border-border bg-surface-card p-5 shadow-sm transition hover:border-primary/30 hover:shadow-md"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                  <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Email</p>
                  <p className="mt-0.5 font-heading text-base font-semibold text-foreground">{email}</p>
                </div>
              </a>
            ))}
            <div className="flex items-start gap-4 rounded-[20px] border border-border bg-surface-card p-5 shadow-sm">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Address</p>
                <p className="mt-0.5 text-sm leading-6 text-foreground">{company.address}</p>
              </div>
            </div>
          </div>
        </div>
        <InquiryForm
          title="Send us a message"
          description="Fill in your details and we'll get back to you within 24 hours."
          submitLabel="Send Message"
        />
      </div>
    </section>
  </>
  );
};
