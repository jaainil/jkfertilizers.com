import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/PageHero";
import { ImagePanel } from "@/components/ImagePanel";
import { SEOHead } from "@/components/SEOHead";
import { organizationSchema } from "@/data/seoSchemas";
import { CheckCircle2, ArrowRight, Leaf, Award, Shield } from "lucide-react";

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
    title: "Sustainable Agriculture Practices",
    desc: "We are committed to providing eco-friendly, chemical-free products that support sustainable farming practices and protect the environment.",
  },
  {
    icon: Award,
    title: "ISO-Certified Product Excellence",
    desc: "Our products undergo rigorous testing and adhere to the highest industry standards, ensuring consistent quality and effectiveness.",
  },
  {
    icon: Shield,
    title: "Customer-Centric Solutions",
    desc: "Our team is dedicated to offering personalized support, expert advice, and tailored solutions to meet the unique needs of every client.",
  },
  {
    icon: Leaf,
    title: "Innovation in Fertilizers",
    desc: "We utilize advanced manufacturing processes and cutting-edge technology to deliver superior organic fertilizers and solutions.",
  },
  {
    icon: Award,
    title: "Transparency and Integrity",
    desc: "We believe in building trust through clear communication, ethical practices, and transparency in all our business dealings.",
  },
  {
    icon: Shield,
    title: "Long-Term Partnerships",
    desc: "We strive to establish lasting relationships with our clients, providing ongoing support and innovative solutions for continuous growth.",
  },
];

const infoCards = [
  {
    title: "100% Organic Products",
    desc: "Delivering pure, 100% organic fertilizers that enrich soil health and support natural, sustainable farming.",
  },
  {
    title: "Absolute Quality",
    desc: "Ensuring uncompromised quality through rigorous standards, our products empower farmers with reliable, effective solutions.",
  },
  {
    title: "Environmentally Friendly",
    desc: "Crafting eco-conscious fertilizers that protect the environment, promote biodiversity, and reduce harmful impacts.",
  },
];

import { useScrollReveal, staggerDelay } from "@/hooks/useScrollReveal";

export const CommitmentPage = () => {
  const sectionReveal = useScrollReveal();
  const cardsReveal = useScrollReveal();

  return (
  <>
    <SEOHead
      title="Our Commitment — J K Fertilizers | Sustainable Agriculture & Quality Excellence"
      description="J K Fertilizers' commitment to sustainability, quality, and innovation. We deliver 100% organic, eco-friendly fertilizers for a greener future."
      canonical="/commitment"
      ogImage="/images/commitment-1.jpg"
      keywords="J K Fertilizers commitment, sustainable agriculture, organic farming commitment, eco-friendly fertilizers, quality assurance"
      schema={[organizationSchema]}
    />
    <PageHero
      eyebrow="Why Can You Trust Us?"
      title="Our Commitment"
      description="At J K Fertilizers, sustainability is the cornerstone of our operations. We are dedicated to revolutionizing agriculture by providing organic and eco-friendly fertilizers that not only enhance soil health but also contribute to the long-term well-being of the environment."
      imageSrc="/images/commitment-1.jpg"
      imageAlt="J K Fertilizers commitment to sustainability"
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
          <div className="inline-flex rounded-full border border-border bg-surface-overlay px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-primary">
            Other Commitments
          </div>
          <h2 className="mt-6 font-heading text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            J K Fertilizers' Commitment to Sustainability
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-base leading-8 text-muted-foreground sm:text-lg">
            We are dedicated to providing the best range of sustainable, organic fertilizer solutions to enhance crop health and soil quality.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {commitments.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                {...staggerDelay(i, 100)}
                className="group flex flex-col rounded-[28px] border border-border bg-surface-card p-6 shadow-[0_16px_50px_rgba(16,24,40,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(16,24,40,0.1)] sm:p-7"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-white">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-heading text-lg font-semibold text-foreground">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>

    {/* ── Info Cards ── */}
    <section className="bg-muted py-20 lg:py-28 section-wave">
      <div
        ref={cardsReveal.ref}
        className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 reveal ${cardsReveal.isVisible ? 'visible' : ''}`}
      >
        <div className="mb-12 text-center">
          <div className="inline-flex rounded-full border border-border bg-surface-overlay px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-primary">
            Our Quality Standards
          </div>
          <h2 className="mt-6 font-heading text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Committed to Delivering the Highest Quality
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
            Sustainable solutions that empower farmers, protect the environment, and ensure long-term success.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {infoCards.map((card, i) => (
            <div
              key={card.title}
              {...staggerDelay(i, 100)}
              className="group overflow-hidden rounded-[28px] border border-border bg-surface-card shadow-[0_16px_50px_rgba(16,24,40,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(16,24,40,0.1)]"
            >
              <div className="p-6 sm:p-7">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-5">
                  <Leaf className="h-6 w-6" />
                </div>
                <h3 className="font-heading text-lg font-semibold text-foreground">{card.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{card.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* ── Image Gallery ── */}
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="mb-12 text-center">
        <h2 className="font-heading text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          Our Facilities
        </h2>
      </div>
      <div className="grid gap-6 sm:grid-cols-3">
        <div className="overflow-hidden rounded-[24px]">
          <img
            src="/images/commitment-1.jpg"
            alt="Machinery"
            className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
            loading="lazy"
          />
        </div>
        <div className="overflow-hidden rounded-[24px]">
          <img
            src="/images/commitment-2.jpg"
            alt="Heap Formation"
            className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
            loading="lazy"
          />
        </div>
        <div className="overflow-hidden rounded-[24px]">
          <img
            src="/images/commitment-3.jpg"
            alt="Machinery"
            className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
            loading="lazy"
          />
        </div>
      </div>
    </section>

    {/* ── CTA ── */}
    <section className="bg-secondary py-20 lg:py-28">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="font-heading text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          Let's Cooperate Together
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-white/78 sm:text-lg">
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
