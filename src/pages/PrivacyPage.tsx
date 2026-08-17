import { Link } from "react-router-dom";
import {
  ShieldCheck,
  Lock,
  Eye,
  FileText,
  Phone,
  Mail,
  MapPin,
  CheckCircle2,
  ChevronRight,
  HelpCircle,
  Clock3,
  RefreshCw,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SEOHead } from "@/components/SEOHead";
import { organizationSchema, privacyPageSchema } from "@/data/seoSchemas";
import { useScrollReveal, staggerDelay } from "@/hooks/useScrollReveal";

const companyContact = {
  name: "J K Fertilizers",
  address: "NH. 48, Opp. IOC Petrol Pump, B/H Adas Bus Stop, Vasad, Dist: Anand, Gujarat",
  contactNumber: "98250 45894",
  contactNumberRaw: "+919825045894",
  emergencyContact: "97129 33610",
  emergencyContactRaw: "+919712933610",
  email: "info@jkfertilizers.com",
  emailSales: "sales@jkfertilizers.com",
};

const collectionPoints = [
  {
    title: "Visit or interact with our website",
    description: "Browsing product catalogs, reading technical specs, and exploring agricultural solutions.",
  },
  {
    title: "Submit inquiries or feedback",
    description: "Filling quotation forms, requesting custom formulation details, or providing reviews.",
  },
  {
    title: "Engage in any communication with our team",
    description: "Reaching out via phone, email, WhatsApp, or in-person visits to our manufacturing plant.",
  },
];

const usagePoints = [
  {
    title: "To respond to queries & provide assistance",
    description: "Promptly addressing custom formulation inquiries, technical consultations, and quotation requests.",
  },
  {
    title: "To improve products & customer experience",
    description: "Refining fertilizer quality, packaging ergonomics, and client communication workflows.",
  },
  {
    title: "To maintain records & legal compliance",
    description: "Complying with regulatory, tax, and Fertilizer Control Order (FCO) documentation standards.",
  },
  {
    title: "To send important updates & communications",
    description: "Dispatching order confirmations, delivery schedules, and essential service notices.",
  },
];

const securityMeasures = [
  {
    icon: Lock,
    title: "Secure Servers & Firewalls",
    description: "Enterprise-grade infrastructure protection and encryption protecting stored data from unauthorized external access.",
  },
  {
    icon: ShieldCheck,
    title: "Restricted Access Control",
    description: "Strict role-based permissions ensuring only authorized personnel handle sensitive client information.",
  },
  {
    icon: Eye,
    title: "Regular Breach Monitoring",
    description: "Continuous proactive monitoring and routine audits to safeguard system integrity and data safety.",
  },
];

const userRights = [
  {
    title: "Access & Update Information",
    description: "Access or request modifications to the personal and business information we maintain about you.",
  },
  {
    title: "Opt-Out of Promotional Communications",
    description: "Easily unsubscribe or opt-out of marketing communications at any time with immediate effect.",
  },
  {
    title: "Report Concerns & Inquiries",
    description: "Promptly report any questions or concerns regarding the handling or privacy of your personal data.",
  },
];

export const PrivacyPage = () => {
  const heroReveal = useScrollReveal();
  const contentReveal = useScrollReveal();
  const securityReveal = useScrollReveal();
  const contactReveal = useScrollReveal();

  return (
    <>
      <SEOHead
        title="Confidentiality & Privacy Policy | J K Fertilizers"
        description="Confidentiality and Privacy Policy of J K Fertilizers. Learn how we collect, use, safeguard, and respect your personal information."
        canonical="/privacy"
        ogImage="/images/about-1.webp"
        keywords="confidentiality policy, privacy policy, J K Fertilizers privacy, data protection, customer data privacy Anand Gujarat"
        schema={[organizationSchema, privacyPageSchema]}
      />

      {/* ── Breadcrumb & Hero Banner ── */}
      <section
        ref={heroReveal.ref}
        className={`relative overflow-hidden bg-secondary text-white reveal ${
          heroReveal.isVisible ? "visible" : ""
        }`}
      >
        {/* Background decorative subtle gradients */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(40,167,69,0.15),transparent_60%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(255,255,255,0.04),transparent_60%)] pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-sm text-white/70">
            <Link to="/" className="hover:text-accent transition-colors font-medium">
              Home
            </Link>
            <ChevronRight className="h-4 w-4 text-white/40" />
            <span className="text-white font-semibold" aria-current="page">
              Confidentiality & Privacy
            </span>
          </nav>

          <div className="max-w-3xl space-y-5">
            <span className="eyebrow-dark inline-flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-accent" />
              Confidentiality & Privacy
            </span>
            <h1 className="font-heading type-page-h1 font-bold tracking-tight text-white">
              Confidentiality & Privacy Policy
            </h1>
            <p className="type-body text-white/85 text-lg leading-relaxed">
              At <strong className="text-white">J K Fertilizers</strong>, your privacy is of utmost importance to us.
            </p>
            <p className="type-body text-white/75 leading-relaxed">
              We are committed to safeguarding the confidentiality of the information shared with us. This policy outlines how J K Fertilizers collects, uses, and protects your personal information when you interact with our website, products, and services.
            </p>
          </div>

          {/* Quick info pills */}
          <div className="mt-8 flex flex-wrap items-center gap-3 pt-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-medium text-white/90 backdrop-blur-sm">
              <Sparkles className="h-3.5 w-3.5 text-accent" />
              Zero Data Selling Guarantee
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-medium text-white/90 backdrop-blur-sm">
              <Lock className="h-3.5 w-3.5 text-accent" />
              Encrypted & Protected Storage
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-medium text-white/90 backdrop-blur-sm">
              <Clock3 className="h-3.5 w-3.5 text-accent" />
              Regular Policy Reviews
            </span>
          </div>
        </div>
      </section>

      {/* ── Main Content Container ── */}
      <div className="bg-background py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1fr_340px] lg:gap-12 items-start">
            
            {/* Left Main Column: Structured Policy Articles */}
            <main className="space-y-12">
              
              {/* Section 1: Information Collection */}
              <section
                id="collection"
                className="scroll-mt-24 rounded-3xl border border-border bg-surface-card p-6 sm:p-9 shadow-card"
              >
                <div className="flex items-center gap-3 pb-3 border-b border-border/70">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="type-label font-bold uppercase tracking-[0.16em] text-primary">Section 01</span>
                    <h2 className="font-heading type-section-h2 text-2xl sm:text-3xl font-bold text-foreground">
                      Information Collection
                    </h2>
                  </div>
                </div>

                <p className="mt-5 type-body text-foreground/90 leading-relaxed">
                  We may collect personal details such as your <strong className="text-foreground">name, contact number, email address, and location</strong> when you:
                </p>

                <div className="mt-6 grid gap-3.5">
                  {collectionPoints.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3.5 rounded-2xl border border-border/80 bg-muted/40 p-4 transition-colors hover:bg-muted/70"
                    >
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                      <div>
                        <p className="font-semibold text-foreground">{item.title}</p>
                        <p className="mt-0.5 type-body-sm text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 rounded-2xl border border-primary/20 bg-primary/5 p-4 text-sm text-foreground/85">
                  <p>
                    <strong className="text-primary font-semibold">Purpose of Collection:</strong> This information is collected to provide efficient services, improve customer interactions, and meet your specific requirements.
                  </p>
                </div>
              </section>

              {/* Section 2: Use of Personal Information */}
              <section
                id="use"
                className="scroll-mt-24 rounded-3xl border border-border bg-surface-card p-6 sm:p-9 shadow-card"
              >
                <div className="flex items-center gap-3 pb-3 border-b border-border/70">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Eye className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="type-label font-bold uppercase tracking-[0.16em] text-primary">Section 02</span>
                    <h2 className="font-heading type-section-h2 text-2xl sm:text-3xl font-bold text-foreground">
                      Use of Personal Information
                    </h2>
                  </div>
                </div>

                <p className="mt-5 type-body text-foreground/90 leading-relaxed">
                  The collected information is used solely for the following purposes:
                </p>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {usagePoints.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex flex-col justify-between rounded-2xl border border-border bg-muted/30 p-5 transition-shadow hover:shadow-card"
                    >
                      <div>
                        <div className="mb-2.5 flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                          {idx + 1}
                        </div>
                        <p className="font-semibold text-foreground">{item.title}</p>
                        <p className="mt-1.5 type-body-sm text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex items-start gap-3 rounded-2xl border border-secondary/20 bg-secondary/5 p-4 text-sm text-foreground">
                  <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-secondary" />
                  <p className="font-medium text-foreground">
                    <strong className="text-secondary font-bold">Confidentiality Guarantee:</strong> Your information will not be sold, rented, or disclosed to third parties without your consent unless required by law.
                  </p>
                </div>
              </section>

              {/* Section 3: Data Protection & Security */}
              <section
                ref={securityReveal.ref}
                id="security"
                className={`scroll-mt-24 rounded-3xl border border-border bg-surface-card p-6 sm:p-9 shadow-card reveal ${
                  securityReveal.isVisible ? "visible" : ""
                }`}
              >
                <div className="flex items-center gap-3 pb-3 border-b border-border/70">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Lock className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="type-label font-bold uppercase tracking-[0.16em] text-primary">Section 03</span>
                    <h2 className="font-heading type-section-h2 text-2xl sm:text-3xl font-bold text-foreground">
                      Data Protection & Security
                    </h2>
                  </div>
                </div>

                <p className="mt-5 type-body text-foreground/90 leading-relaxed">
                  J K Fertilizers employs advanced security measures to ensure the protection of your data. These include:
                </p>

                <div className="mt-6 grid gap-4 sm:grid-cols-3">
                  {securityMeasures.map((item, idx) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={idx}
                        {...staggerDelay(idx)}
                        className="flex flex-col items-start rounded-2xl border border-border bg-surface-card p-5 shadow-card"
                      >
                        <div className="mb-3.5 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                          <Icon className="h-5 w-5" />
                        </div>
                        <h3 className="font-heading text-base font-semibold text-foreground">{item.title}</h3>
                        <p className="mt-2 type-body-sm text-muted-foreground">{item.description}</p>
                      </div>
                    );
                  })}
                </div>

                <p className="mt-6 type-body-sm font-medium text-muted-foreground border-t border-border/70 pt-4">
                  We prioritize maintaining the confidentiality and integrity of your information at all times.
                </p>
              </section>

              {/* Section 4: Your Rights */}
              <section
                ref={contentReveal.ref}
                id="rights"
                className={`scroll-mt-24 rounded-3xl border border-border bg-surface-card p-6 sm:p-9 shadow-card reveal ${
                  contentReveal.isVisible ? "visible" : ""
                }`}
              >
                <div className="flex items-center gap-3 pb-3 border-b border-border/70">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="type-label font-bold uppercase tracking-[0.16em] text-primary">Section 04</span>
                    <h2 className="font-heading type-section-h2 text-2xl sm:text-3xl font-bold text-foreground">
                      Your Rights
                    </h2>
                  </div>
                </div>

                <p className="mt-5 type-body text-foreground/90 leading-relaxed">
                  You have the right to:
                </p>

                <div className="mt-6 grid gap-3.5">
                  {userRights.map((right, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3.5 rounded-2xl border border-border bg-muted/30 p-4"
                    >
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-white text-xs font-bold mt-0.5">
                        ✓
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{right.title}</p>
                        <p className="mt-0.5 type-body-sm text-muted-foreground">{right.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <p className="mt-6 type-body-sm text-foreground/80 bg-muted/60 rounded-2xl p-4">
                  To exercise your rights or address any privacy-related concerns, please contact us using the details provided below.
                </p>
              </section>

              {/* Section 5: Contact Information */}
              <section
                ref={contactReveal.ref}
                id="contact"
                className={`scroll-mt-24 rounded-3xl border border-primary/30 bg-primary/5 p-6 sm:p-9 shadow-card reveal ${
                  contactReveal.isVisible ? "visible" : ""
                }`}
              >
                <div className="flex items-center gap-3 pb-3 border-b border-primary/20">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary text-white">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="type-label font-bold uppercase tracking-[0.16em] text-primary">Get In Touch</span>
                    <h2 className="font-heading type-section-h2 text-2xl sm:text-3xl font-bold text-foreground">
                      Contact Information
                    </h2>
                  </div>
                </div>

                <p className="mt-5 type-body text-foreground/90">
                  For any questions regarding our <strong className="text-foreground">Confidentiality & Privacy Policy</strong>, please reach out to:
                </p>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {/* Company Address Card */}
                  <div className="rounded-2xl border border-border bg-surface-card p-5">
                    <div className="flex items-center gap-2.5 text-primary mb-2">
                      <MapPin className="h-5 w-5" />
                      <p className="font-bold text-foreground">{companyContact.name}</p>
                    </div>
                    <p className="type-body-sm text-muted-foreground leading-relaxed">
                      {companyContact.address}
                    </p>
                  </div>

                  {/* Contact Numbers Card */}
                  <div className="rounded-2xl border border-border bg-surface-card p-5 space-y-3">
                    <div>
                      <p className="type-label font-semibold text-muted-foreground uppercase tracking-wider text-xs">Contact Number</p>
                      <a
                        href={`tel:${companyContact.contactNumberRaw}`}
                        className="font-heading text-lg font-bold text-primary hover:underline"
                      >
                        {companyContact.contactNumber}
                      </a>
                    </div>
                    <div className="border-t border-border/60 pt-2">
                      <p className="type-label font-semibold text-muted-foreground uppercase tracking-wider text-xs">Emergency Contact</p>
                      <a
                        href={`tel:${companyContact.emergencyContactRaw}`}
                        className="font-heading text-base font-semibold text-foreground hover:text-primary transition-colors"
                      >
                        {companyContact.emergencyContact}
                      </a>
                    </div>
                  </div>

                  {/* Email Card */}
                  <div className="rounded-2xl border border-border bg-surface-card p-5 sm:col-span-2">
                    <div className="flex items-center gap-2 text-primary mb-1">
                      <Mail className="h-4 w-4" />
                      <p className="type-label font-semibold uppercase tracking-wider text-xs text-muted-foreground">Email Support</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                      <a
                        href={`mailto:${companyContact.email}`}
                        className="font-heading font-semibold text-foreground hover:text-primary hover:underline"
                      >
                        {companyContact.email}
                      </a>
                      <span className="text-muted-foreground/40">|</span>
                      <a
                        href={`mailto:${companyContact.emailSales}`}
                        className="font-heading font-semibold text-foreground hover:text-primary hover:underline"
                      >
                        {companyContact.emailSales}
                      </a>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 6: Policy Updates */}
              <section
                id="updates"
                className="scroll-mt-24 rounded-3xl border border-border bg-surface-card p-6 sm:p-8 shadow-card"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-accent/20 text-secondary">
                    <RefreshCw className="h-5 w-5 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <h2 className="font-heading text-xl font-bold text-foreground">
                      Policy Updates
                    </h2>
                    <p className="type-body-sm text-muted-foreground leading-relaxed">
                      J K Fertilizers reserves the right to update this policy periodically. Any changes will be communicated on our website. We encourage you to review this page regularly to stay informed about how we protect your information.
                    </p>
                  </div>
                </div>
              </section>

              {/* Closing Appreciation Note */}
              <div className="rounded-3xl border border-border/80 bg-muted/40 p-6 sm:p-8 text-center">
                <p className="font-heading text-lg font-bold text-foreground">
                  Thank you for trusting J K Fertilizers.
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Partnering with farmers, distributors, and agricultural leaders with integrity since 2006.
                </p>
              </div>

            </main>

            {/* Right Sticky Sidebar: Quick Nav & Support Callout */}
            <aside className="space-y-6 lg:sticky lg:top-24">
              
              {/* Quick Navigation Card */}
              <div className="rounded-3xl border border-border bg-surface-card p-6 shadow-card">
                <p className="type-label font-bold uppercase tracking-[0.16em] text-muted-foreground mb-4">
                  Table of Contents
                </p>
                <nav className="flex flex-col space-y-2 text-sm">
                  {[
                    { href: "#collection", label: "Information Collection" },
                    { href: "#use", label: "Use of Personal Information" },
                    { href: "#security", label: "Data Protection & Security" },
                    { href: "#rights", label: "Your Rights" },
                    { href: "#contact", label: "Contact Information" },
                    { href: "#updates", label: "Policy Updates" },
                  ].map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      className="group flex items-center justify-between rounded-xl px-3 py-2 text-foreground/80 transition-colors hover:bg-muted hover:text-primary"
                    >
                      <span>{item.label}</span>
                      <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/50 transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
                    </a>
                  ))}
                </nav>
              </div>

              {/* Assistance Callout Card */}
              <div className="rounded-3xl border border-primary/20 bg-primary/10 p-6 text-foreground">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary text-white mb-4">
                  <HelpCircle className="h-5 w-5" />
                </div>
                <h3 className="font-heading text-base font-bold text-foreground">Have Questions?</h3>
                <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                  Our privacy and client assistance team is available Monday to Saturday to answer inquiries regarding your information.
                </p>
                <div className="mt-4 pt-4 border-t border-primary/20 flex flex-col gap-2">
                  <Button asChild className="w-full h-10 rounded-full bg-primary text-white hover:bg-primary/90 text-xs">
                    <Link to="/contact">Contact Support</Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full h-10 rounded-full border-border bg-surface-card text-xs hover:bg-muted">
                    <a href={`tel:${companyContact.contactNumberRaw}`}>Call {companyContact.contactNumber}</a>
                  </Button>
                </div>
              </div>

            </aside>

          </div>
        </div>
      </div>
    </>
  );
};
