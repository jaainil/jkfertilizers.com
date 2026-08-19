import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/PageHero";
import { SEOHead } from "@/components/SEOHead";
import { organizationSchema, commitmentPageSchema } from "@/data/seoSchemas";
import { Leaf, Award, Shield } from "lucide-react";

const company = {
  name: "J K Fertilizers",
  phoneDisplay: "9825045894",
  phoneRaw: "+919825045894",
  emails: ["info@jkfertilizers.com", "sales@jkfertilizers.com"],
  address: "NH. 48, Opp. IOC Petrol Pump, B/H Adas Bus Stop, Vasad, Dist: Anand, Gujarat - 388305 INDIA",
};

const commitments = [
  {
    icon: Leaf,
    title: "Chemical-Free Formulations",
    desc: "100% organic and mineral-based inputs without synthetic fillers, reducing soil salt accumulation.",
  },
  {
    icon: Award,
    title: "FCO-Approved Manufacturing",
    desc: "Every product batch adheres to Fertilizer Control Order specifications with verified lab test records.",
  },
  {
    icon: Shield,
    title: "Contract Manufacturing Support",
    desc: "Dedicated technical assistance, formulation adjustments, and private-label packaging for agribusiness partners.",
  },
  {
    icon: Leaf,
    title: "Precision Drum Granulation",
    desc: "Rotary drum processing and low-temperature drying ensure consistent 2–4 mm sizing and biological viability.",
  },
  {
    icon: Award,
    title: "Transparent Quality Records",
    desc: "Every dispatch includes lot-specific Certificates of Analysis covering moisture, density, and nutrient assays.",
  },
  {
    icon: Shield,
    title: "Reliable B2B Supply",
    desc: "Up to 700 MT/day processing capacity in Vasad, Gujarat, supporting uninterrupted delivery during peak agricultural seasons.",
  },
];

const infoCards = [
  {
    title: "100% Organic Products",
    desc: "FCO-certified organic manures and biofertilizers that build soil organic carbon reserves.",
  },
  {
    title: "Laboratory Quality Checks",
    desc: "Testing of raw inputs, in-process moisture, and finished particle crush strength on every production run.",
  },
  {
    title: "Environmental Stewardship",
    desc: "Formulations engineered to restore soil biology, reduce chemical runoff, and support balanced agriculture.",
  },
];

import { useScrollReveal, staggerDelay } from "@/hooks/useScrollReveal";

export const CommitmentPage = () => {
  const sectionReveal = useScrollReveal();
  const cardsReveal = useScrollReveal();

  return (
  <>
    <SEOHead
      title="Sustainability & Quality Commitment | J K Fertilizers"
      description="J K Fertilizers' commitment to sustainable soil fertility, FCO-approved organic manufacturing, and reliable B2B supply. Anand, Gujarat."
      canonical="/commitment"
      ogImage="/images/commitment-1.webp"
      keywords="J K Fertilizers commitment, sustainable agriculture, organic farming commitment, eco-friendly fertilizers, quality assurance"
      schema={[organizationSchema, commitmentPageSchema]}
    />
    <PageHero
      eyebrow="Our Principles"
      title="Quality Assurance & Sustainable Manufacturing"
      description="At J K Fertilizers, our manufacturing standards prioritize soil carbon restoration, FCO regulatory compliance, and dependable supply for agribusiness partners across India."
      imageSrc="/images/commitment-1.webp"
      imageAlt="J K Fertilizers manufacturing plant"
      badges={["Sustainable", "Organic", "Since 2006"]}
      primaryCta={
        <Button asChild className="h-12 rounded-full bg-primary px-6 text-white hover:bg-primary/90">
          <Link to="/contact">Get In Touch</Link>
        </Button>
      }
      secondaryCta={
        <Button asChild variant="outline" className="h-12 rounded-full border-primary px-6 text-primary hover:bg-primary hover:text-white">
          <Link to="/products">View Products</Link>
        </Button>
      }
    />

    {/* ── Commitment Items ── */}
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div
        ref={sectionReveal.ref}
        className={`reveal ${sectionReveal.isVisible ? 'visible' : ''}`}
      >
        <div className="mb-14 text-center">
          <span className="eyebrow">
            Other Commitments
          </span>
          <h2 className="mt-6 font-heading type-section-h2 font-semibold tracking-tight text-foreground">
            J K Fertilizers' Commitment to Sustainability
          </h2>
          <p className="mx-auto mt-4 max-w-3xl type-body text-muted-foreground">
            We are dedicated to providing the best range of sustainable, organic fertilizer solutions to enhance crop health and soil quality.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {commitments.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                {...staggerDelay(i)}
                className="group flex flex-col rounded-3xl border border-border bg-surface-card p-6 shadow-card transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-card-hover sm:p-7"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-white">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-heading type-card-title font-semibold text-foreground">{item.title}</h3>
                <p className="mt-3 type-body-sm text-muted-foreground">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>

    {/* ── Info Cards ── */}
    <section className="bg-muted py-20 lg:py-28">
      <div
        ref={cardsReveal.ref}
        className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 reveal ${cardsReveal.isVisible ? 'visible' : ''}`}
      >
        <div className="mb-12 text-center">
          <span className="eyebrow">
            Our Quality Standards
          </span>
          <h2 className="mt-6 font-heading type-section-h2 font-semibold tracking-tight text-foreground">
            Committed to Delivering the Highest Quality
          </h2>
          <p className="mx-auto mt-4 max-w-2xl type-body text-muted-foreground">
            Sustainable solutions that empower farmers, protect the environment, and ensure long-term success.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {infoCards.map((card, i) => (
            <div
              key={card.title}
              {...staggerDelay(i)}
              className="group overflow-hidden rounded-3xl border border-border bg-surface-card shadow-card transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-card-hover"
            >
              <div className="p-6 sm:p-7">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-5">
                  <Leaf className="h-6 w-6" />
                </div>
                <h3 className="font-heading type-card-title font-semibold text-foreground">{card.title}</h3>
                <p className="mt-3 type-body-sm text-muted-foreground">{card.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* ── Image Gallery ── */}
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="mb-12 text-center">
        <h2 className="font-heading type-section-h2 font-semibold tracking-tight text-foreground">
          Our Facilities
        </h2>
      </div>
      <div className="grid gap-6 sm:grid-cols-3">
        <div className="overflow-hidden rounded-2xl">
          <img
            src="/images/commitment-1.webp"
            alt="J K Fertilizers granule coating machinery at Vasad plant"
            width={400}
            height={300}
            className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className="overflow-hidden rounded-2xl">
          <img
            src="/images/commitment-2.webp"
            alt="Organic fertilizer heap formation at J K Fertilizers, Vasad, Gujarat"
            width={400}
            height={300}
            className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className="overflow-hidden rounded-2xl">
          <img
            src="/images/commitment-3.webp"
            alt="Fertilizer production line and processing equipment at J K Fertilizers"
            width={400}
            height={300}
            className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
    </section>

    {/* ── CTA ── */}
    <section className="bg-secondary py-20 lg:py-28">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="font-heading type-section-h2 font-semibold tracking-tight text-white">
          Let's Cooperate Together
        </h2>
        <p className="mx-auto mt-4 max-w-2xl type-body text-white/78">
          We will reply you within 24 hours via email. Contact us today!
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Button asChild className="h-12 rounded-full bg-accent px-8 text-secondary font-semibold hover:bg-accent/80">
            <Link to="/contact">Contact Us Today!</Link>
          </Button>
          <Button asChild variant="outline" className="h-12 rounded-full border-white/30 bg-transparent px-8 text-white hover:bg-white hover:text-secondary">
            <a href={`tel:${company.phoneRaw}`}>Call {company.phoneDisplay}</a>
          </Button>
        </div>
      </div>
    </section>
  </>
  );
};
