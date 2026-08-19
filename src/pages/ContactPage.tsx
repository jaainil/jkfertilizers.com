import { Button } from "@/components/ui/button";
import { InquiryForm } from "@/components/InquiryForm";
import { PhoneCall, Mail, MapPin, Clock3, ArrowRight } from "lucide-react";
import { SEOHead } from "@/components/SEOHead";
import { organizationSchema, contactPageSchema } from "@/data/seoSchemas";
import { useScrollReveal, staggerDelay } from "@/hooks/useScrollReveal";

const company = {
  name: "J K Fertilizers",
  phoneDisplay: "9825045894",
  phoneRaw: "+919825045894",
  phoneAlt: "9825045892",
  phoneAlt2: "9825045891",
  emails: ["info@jkfertilizers.com", "sales@jkfertilizers.com"],
  address: "NH. 48, Opp. IOC Petrol Pump, B/H Adas Bus Stop, Vasad, Dist: Anand, Gujarat - 388305 INDIA",
  founder: "Mr. Akash Dadhania",
  founderTitle: "Founder & Director",
};

const contactCards = [
  {
    icon: PhoneCall,
    label: "Call Us",
    value: "9825045894 / 9825045892",
    sub: "Mon – Sat: 9:00 AM – 6:00 PM",
    href: `tel:${company.phoneRaw}`,
    accent: true,
  },
  {
    icon: Mail,
    label: "General Inquiries",
    value: company.emails[0],
    sub: "We reply within 24 hours",
    href: `mailto:${company.emails[0]}`,
  },
  {
    icon: Mail,
    label: "Sales Inquiries",
    value: company.emails[1],
    sub: "For bulk orders & partnerships",
    href: `mailto:${company.emails[1]}`,
  },
  {
    icon: MapPin,
    label: "Visit Our Factory",
    value: company.address,
    sub: "Factory visits welcome by appointment",
    href: "https://maps.app.goo.gl/wxxAwGrF7c3Yn6VSA",
  },
];

const faqs = [
  {
    q: "What is your minimum order quantity?",
    a: "We cater to bulk orders for large-scale farming, government agencies, and corporate clients. Please get in touch with our sales team to discuss volume requirements and pricing.",
  },
  {
    q: "How do I know which fertilizer is right for my crops?",
    a: "Our team of agricultural experts can help you choose the right product based on your soil type, crop requirements, and farming goals. Contact us for a consultation.",
  },
  {
    q: "Can I purchase your products in bulk?",
    a: "Absolutely. We cater to bulk orders for large-scale farming operations, government agencies, and corporate clients. Contact our sales team for volume pricing.",
  },
  {
    q: "What are your working hours?",
    a: "Our office hours are Monday to Saturday, 9:00 AM to 6:00 PM. We are closed on public holidays. Our manufacturing facility operates round the clock to meet production demands.",
  },
];

const ContactHero = () => {
  const heroReveal = useScrollReveal();

  return (
    <section
      ref={heroReveal.ref}
      className={`relative overflow-hidden bg-secondary reveal ${heroReveal.isVisible ? 'visible' : ''}`}
    >
      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="max-w-3xl space-y-6">
          <span className="eyebrow-dark">
            Contact Us
          </span>
          <h1 className="font-heading type-page-h1 font-semibold tracking-tight text-white">
            Contact Us Today To Work Together
          </h1>
          <p className="max-w-2xl type-body text-white/78">
            We will reply within <strong className="text-white">24 hours</strong> via email. Reach out for product inquiries, bulk orders, or partnership discussions.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <Button asChild className="h-12 rounded-full bg-accent px-7 text-secondary font-semibold hover:bg-accent/80">
              <a href={`tel:${company.phoneRaw}`}>
                <PhoneCall className="h-4 w-4" />
                Call {company.phoneDisplay}
              </a>
            </Button>
            <Button asChild variant="outline" className="h-12 rounded-full border-white/30 bg-transparent px-7 text-white hover:bg-white hover:text-secondary">
              <a href={`mailto:${company.emails[1]}`}>
                <Mail className="h-4 w-4" />
                Email Sales Team
              </a>
            </Button>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap gap-4">
          {[
            { label: "Since 2006" },
            { label: "FCO Approved" },
            { label: "150+ Trusted Clients" },
            { label: "Vasad, Anand, Gujarat, INDIA" },
          ].map((tag, i) => (
            <span key={tag.label} {...staggerDelay(i)} className="rounded-full border border-white/15 bg-white/10 px-4 py-2 type-body-sm font-medium text-white/80">
              {tag.label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

const ContactDirectSection = () => {
  const formsReveal = useScrollReveal();

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div
        ref={formsReveal.ref}
        className={`grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:items-start reveal ${formsReveal.isVisible ? 'visible' : ''}`}
      >
        <div className="space-y-5">
          <div className="space-y-2">
            <span className="eyebrow">
              Direct Contact
            </span>
            <h2 className="font-heading type-section-h2 font-semibold tracking-tight text-foreground">
              Reach Us Your Way
            </h2>
            <p className="type-body text-muted-foreground">
              Connect with our sales and technical team by phone, email, or an in-person plant visit.
            </p>
          </div>

          <div className="grid gap-4">
            {contactCards.map((card, i) => {
              const Icon = card.icon;
              return (
                <a
                  key={card.label}
                  {...staggerDelay(i)}
                  href={card.href}
                  target={card.href.startsWith("http") ? "_blank" : undefined}
                  rel={card.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className={`group flex items-start gap-4 rounded-2xl border p-5 shadow-card transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-card-hover ${
                    card.accent
                      ? "border-primary/30 bg-primary text-white"
                      : "border-border bg-surface-card"
                  }`}
                >
                  <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${
                    card.accent ? "bg-white/15 text-white" : "bg-primary/10 text-primary"
                  }`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`type-label font-semibold uppercase tracking-[0.16em] ${card.accent ? "text-white/70" : "text-muted-foreground"}`}>
                      {card.label}
                    </p>
                    <p className={`mt-1 font-heading type-body font-semibold break-all ${card.accent ? "text-white" : "text-foreground"}`}>
                      {card.value}
                    </p>
                    <p className={`mt-0.5 type-label ${card.accent ? "text-white/65" : "text-muted-foreground"}`}>
                      {card.sub}
                    </p>
                  </div>
                  <ArrowRight className={`mt-1 h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1 ${card.accent ? "text-white/60" : "text-muted-foreground"}`} />
                </a>
              );
            })}
          </div>

          <div className="flex items-center gap-4 rounded-2xl border border-border bg-muted p-5">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-accent/20">
              <Clock3 className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="type-label font-semibold uppercase tracking-[0.16em] text-muted-foreground">Response time</p>
              <p className="mt-0.5 type-body-sm font-medium text-foreground">We reply within 24 hours for all inquiries.</p>
            </div>
          </div>
        </div>

        <InquiryForm
          title="Send Us a Message"
          description="Fill in your details below. Our team will follow up with the right commercial or technical conversation within 24 hours."
          submitLabel="Send Message"
        />
      </div>
    </section>
  );
};

const ContactLocationSection = () => {
  const mapReveal = useScrollReveal();

  return (
    <section className="bg-muted py-0 overflow-hidden">
      <div
        ref={mapReveal.ref}
        className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 reveal-scale ${mapReveal.isVisible ? 'visible' : ''}`}
      >
        <div className="grid lg:grid-cols-2">
          <div className="flex flex-col justify-center space-y-6 py-16 lg:pr-14">
            <span className="eyebrow w-fit">
              Our Location
            </span>
            <h2 className="font-heading type-section-h2 font-semibold tracking-tight text-foreground">
              Visit Our Factory
            </h2>
            <p className="type-body text-muted-foreground">
              Located in Vasad, Anand, Gujarat, our manufacturing facility is easily accessible from NH 48. Factory visits are welcome by appointment.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-4 rounded-2xl border border-border bg-surface-card p-4">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <div>
                  <p className="type-label font-semibold uppercase tracking-[0.16em] text-muted-foreground">Factory Address</p>
                  <p className="mt-1 type-body-sm font-medium text-foreground">{company.address}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 rounded-2xl border border-border bg-surface-card p-4">
                <Clock3 className="h-5 w-5 shrink-0 text-primary" />
                <div>
                  <p className="type-label font-semibold uppercase tracking-[0.16em] text-muted-foreground">Working Hours</p>
                  <p className="mt-1 type-body-sm font-medium text-foreground">Mon – Sat, 9:00 AM – 6:00 PM</p>
                </div>
              </div>
            </div>
            <Button asChild className="w-fit h-11 rounded-full bg-primary px-6 text-white hover:bg-primary/90">
              <a href="https://maps.app.goo.gl/wxxAwGrF7c3Yn6VSA" target="_blank" rel="noopener noreferrer">
                Open in Google Maps
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
          </div>

          <div className="embed-map-responsive relative w-full" style={{ paddingBottom: '66.66666666666666%' }}>
            <div className="embed-map-container overflow-hidden bg-none absolute top-0 left-0 w-full h-full">
              <iframe
                className="embed-map-frame absolute top-0 left-0 w-full h-full border-0"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3686.448936258878!2d73.0451195771029!3d22.487333479552614!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e4adc746987e9%3A0xed5c255f41da256b!2sJ%20K%20Fertilizers!5e0!3m2!1sen!2sin!4v1786533611967!5m2!1sen!2sin"
                title="J K Fertilizers Location"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ContactFaqSection = () => {
  const faqReveal = useScrollReveal();

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div
        ref={faqReveal.ref}
        className={`reveal ${faqReveal.isVisible ? 'visible' : ''}`}
      >
        <div className="mb-12 text-center">
          <span className="eyebrow">
            Common Questions
          </span>
          <h2 className="mt-5 font-heading type-section-h2 font-semibold tracking-tight text-foreground">
            Frequently Asked Questions
          </h2>
        </div>
        <div className={`mx-auto max-w-4xl grid gap-4 reveal-scale ${faqReveal.isVisible ? 'visible' : ''}`}>
          {faqs.map((faq, i) => (
            <div key={faq.q} {...staggerDelay(i)} className="rounded-2xl border border-border bg-surface-card p-7 shadow-card">
              <p className="font-heading type-card-title font-semibold text-foreground">{faq.q}</p>
              <p className="mt-3 type-body-sm text-muted-foreground">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ContactCtaBand = () => (
  <section className="bg-secondary py-16 lg:py-20">
    <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
      <h2 className="font-heading type-section-h2 font-semibold tracking-tight text-white">
        Ready to work with India's trusted fertilizer manufacturer?
      </h2>
      <p className="mx-auto mt-4 max-w-xl type-body text-white/78">
        Since 2006. 150+ trusted clients. 100% organic products.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Button asChild className="h-12 rounded-full bg-accent px-8 text-secondary font-semibold hover:bg-accent/80">
          <a href={`tel:${company.phoneRaw}`}>Call {company.phoneDisplay}</a>
        </Button>
        <Button asChild variant="outline" className="h-12 rounded-full border-white/30 bg-transparent px-8 text-white hover:bg-white hover:text-secondary">
          <a href={`mailto:${company.emails[1]}`}>Email Sales Team</a>
        </Button>
      </div>
    </div>
  </section>
);

export const ContactPage = () => {
  return (
    <>
      <SEOHead
        title="Contact J K Fertilizers | Anand Gujarat Fertilizer Plant"
        description="Contact J K Fertilizers for organic fertilizer orders, bulk inquiries, and partnerships. Call 9825045894 or email sales@jkfertilizers.com. Located in Vasad, Anand, Gujarat, INDIA."
        canonical="/contact"
        ogImage="/images/about-1.webp"
        keywords="contact J K Fertilizers, fertilizer order gujarat, organic fertilizer inquiry, fertilizer manufacturer contact anand gujarat, jkfertilizers.com"
        schema={[organizationSchema, contactPageSchema]}
      />
      <ContactHero />
      <ContactDirectSection />
      <ContactLocationSection />
      <ContactFaqSection />
      <ContactCtaBand />
    </>
  );
};
