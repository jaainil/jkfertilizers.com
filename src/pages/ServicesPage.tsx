import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/PageHero";
import { ServiceCard } from "@/components/ServiceCard";
import { InquiryForm } from "@/components/InquiryForm";
import { CheckCircle2, ArrowRight, Quote, Star } from "lucide-react";
import { SEOHead } from "@/components/SEOHead";
import { organizationSchema, servicesSchema } from "@/data/seoSchemas";
import { getAllServices } from "@/lib/content";

const company = {
  name: "J K Fertilizers",
  phoneDisplay: "9825045894",
  phoneRaw: "+919825045894",
  emails: ["info@jkfertilizers.com", "sales@jkfertilizers.com"],
  address: "NH. 48, Opp. IOC Petrol Pump, B/H Adas Bus Stop, Vasad, Dist: Anand, Gujarat",
};

const coreFeatures = [
  "No Chemicals Used",
  "No Preservatives Added",
  "Sustainable Practices",
  "Affordable Quality",
  "Environmental Responsibility",
];

const services = getAllServices();

const processSteps = [
  {
    step: "01",
    title: "Requirement Analysis",
    description: "We understand your specific needs, crop requirements, and operational goals to recommend the right solution.",
  },
  {
    step: "02",
    title: "Custom Manufacturing",
    description: "Our state-of-the-art facilities produce high-quality organic fertilizers and coated granules tailored to your specifications.",
  },
  {
    step: "03",
    title: "Quality Testing",
    description: "Every batch undergoes rigorous quality testing to ensure consistency, purity, and effectiveness before dispatch.",
  },
  {
    step: "04",
    title: "Timely Delivery",
    description: "Finished goods are carefully packed and dispatched with reliable logistics support for on-time delivery across India.",
  },
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
    quote: "J K Fertilizers consistently delivers excellent products and services. Their organic solutions have significantly enhanced our farming operations, helping us achieve healthier crops and better soil quality.",
  },
  {
    name: "Mr. S Suresh",
    title: "Director, Bay Leaf Agro Products",
    quote: "We've seen remarkable improvements in crop quality and sustainability thanks to J K Fertilizers. Their innovative, eco-friendly solutions align perfectly with our business goals. Their reliable support makes them an indispensable partner.",
  },
];

const images = {
  hero: "/images/services/hero.jpg",
  commitment: "/images/services/manufacturing.jpg",
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
      title="Services — J K Fertilizers | Organic Fertilizer Manufacturing, Coated Granules & More | Gujarat"
      description="J K Fertilizers offers comprehensive services: organic fertilizer manufacturing, granule technology, infrastructure leasing, custom packaging, job work, and warehouse facilities. Anand, Gujarat, India."
      canonical="/services"
      ogImage="/images/about-1.jpg"
      keywords="organic fertilizer manufacturing services, granule technology, infrastructure leasing fertilizer, custom packaging agriculture, job work fertilizer manufacturer, warehouse storage gujarat"
      schema={[organizationSchema, servicesSchema]}
    />
    {/* ── Hero ── */}
    <PageHero
      eyebrow="Services We Provide"
      title="Our Services"
      description="At J K Fertilizers, we are dedicated to ensuring the best quality products and services for our clients. Our offerings are designed to enhance agricultural productivity, maintain environmental sustainability, and cater to diverse industrial requirements."
      imageSrc={images.hero}
      imageAlt="J K Fertilizers services"
      badges={["Organic Manufacturing", "Granule Technology", "Since 2006"]}
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

    {/* ── Our Commitment To Quality ── */}
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div
        ref={coreReveal.ref}
        className={`grid gap-14 lg:grid-cols-[1fr_1fr] lg:items-center reveal ${coreReveal.isVisible ? 'visible' : ''}`}
      >
        <div className="relative overflow-hidden rounded-4xl border border-border shadow-[0_24px_70px_rgba(15,23,42,0.08)]">
          <img
            src={images.commitment}
            alt="J K Fertilizers — Our Commitment To Quality"
            className="h-full w-full object-cover"
            style={{ minHeight: "480px" }}
          />
          <div className="absolute inset-0 bg-linear-to-t from-secondary/60 via-transparent to-transparent" />
          <div className="absolute bottom-5 left-5 right-5">
            <div className="rounded-3xl border border-white/25 bg-white/10 p-5 backdrop-blur-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/75">Our Commitment To Quality</p>
              <p className="mt-1 font-heading text-lg font-semibold text-white">We Always Bring The Best Products For Our Customers</p>
            </div>
          </div>
        </div>

        <div className="space-y-7">
          <div className="inline-flex rounded-full border border-border bg-surface-overlay px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-primary">
            Our Commitment To Quality
          </div>
          <h2 className="font-heading text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            We Always Bring The Best Products For Our Customers
          </h2>
          <p className="text-base leading-8 text-muted-foreground sm:text-lg">
            At J K Fertilizers, we are dedicated to ensuring the best quality products and services for our clients. Our offerings are designed to enhance agricultural productivity, maintain environmental sustainability, and cater to diverse industrial requirements.
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
            <Link to="/contact">
              Contact Us
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>

    {/* ── All service cards ── */}
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
            Delivering sustainable, eco-friendly solutions to meet your agricultural and operational needs.
          </h2>
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
          A simple, transparent flow — from your first requirement to final delivery.
        </p>
      </div>
      <div className={`grid gap-6 md:grid-cols-2 lg:grid-cols-4 reveal-scale ${processReveal.isVisible ? 'visible' : ''}`}>
        {processSteps.map((step, i) => (
          <div
            key={step.title}
            {...staggerDelay(i, 100)}
            className="group relative overflow-hidden rounded-[28px] border border-border bg-surface-card p-7 shadow-[0_16px_50px_rgba(16,24,40,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(16,24,40,0.1)]"
          >
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

    {/* ── Testimonials ── */}
    <section className="bg-muted py-20 lg:py-28 section-wave">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <div className="inline-flex rounded-full border border-border bg-surface-overlay px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-primary">
            <Quote className="h-3 w-3 mr-2" />
            Testimonials
          </div>
          <h2 className="mt-5 font-heading text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            What Customers Says?
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <div key={t.name} className="flex flex-col rounded-[28px] border border-border bg-surface-card p-6 shadow-[0_12px_40px_rgba(22,61,38,0.06)] sm:p-8">
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

    {/* ── Infrastructure highlight band ── */}
    <section className="bg-secondary py-16 lg:py-20">
      <div
        ref={statsReveal.ref}
        className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 reveal-scale ${statsReveal.isVisible ? 'visible' : ''}`}
      >
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { value: "150+", label: "Trusted Clients" },
            { value: "15+", label: "Years of Experience" },
            { value: "10000+", label: "Tons of Products" },
            { value: "6+", label: "Service Offerings" },
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

    {/* ── Newsletter ── */}
    <section className="bg-secondary py-20 lg:py-28">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <div className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-white/80">
          Stay Updated
        </div>
        <h2 className="mt-6 font-heading text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          Sign Up To Our Newsletter
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-white/78 sm:text-lg">
          Subscribe to our Newsletter to be updated about our latest products and offers.
        </p>
        <form className="mx-auto mt-10 flex max-w-lg flex-col gap-4 sm:flex-row" onSubmit={(e) => e.preventDefault()}>
          <input
            type="email"
            placeholder="Enter your email"
            className="h-12 flex-1 rounded-full border border-white/20 bg-white/10 px-6 text-sm text-white placeholder:text-white/50 focus:border-white/40 focus:outline-none"
          />
          <Button type="submit" className="h-12 rounded-full bg-accent px-8 font-semibold text-secondary hover:bg-accent/80">
            Subscribe
          </Button>
        </form>
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
