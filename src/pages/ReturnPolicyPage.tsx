import { Link } from "react-router-dom";
import {
  RotateCcw,
  RefreshCw,
  PackageCheck,
  AlertTriangle,
  CreditCard,
  Mail,
  ChevronRight,
  HelpCircle,
  Clock3,
  Sparkles,
  Info,
  Truck,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SEOHead } from "@/components/SEOHead";
import { organizationSchema, returnPolicyPageSchema } from "@/data/seoSchemas";
import { useScrollReveal, staggerDelay } from "@/hooks/useScrollReveal";

const returnConditions = [
  {
    title: "Unopened & Unused",
    desc: "Products must be unopened, unused, and intact with the manufacturer's seal unbroken.",
  },
  {
    title: "Original Packaging",
    desc: "All bags, containers, and original labeling must be undamaged and in original condition.",
  },
  {
    title: "Within 30 Days",
    desc: "Return request must be initiated within 30 calendar days from the date of purchase.",
  },
];

const refundRules = [
  {
    step: "01",
    title: "Inspection & Verification",
    desc: "Refunds will be processed once the returned product is received, inspected, and approved by our quality assurance team.",
  },
  {
    step: "02",
    title: "Original Payment Reversal",
    desc: "Refunds will be issued directly to the original payment method used during checkout.",
  },
  {
    step: "03",
    title: "Shipping Fee Deductions",
    desc: "Refunds exclude original shipping charges, unless the return is caused by a defective or incorrect item delivered by us.",
  },
];

export const ReturnPolicyPage = () => {
  const heroReveal = useScrollReveal();
  const returnReveal = useScrollReveal();
  const refundReveal = useScrollReveal();
  const defectiveReveal = useScrollReveal();
  const exchangeReveal = useScrollReveal();

  return (
    <>
      <SEOHead
        title="Refund and Returns Policy | J K Fertilizers"
        description="Read the official Refund and Returns Policy of J K Fertilizers. 30-day returns for unopened products, defective product replacements, and refund process."
        canonical="/return-policy"
        ogImage="/images/about-1.webp"
        keywords="return policy, refund policy, J K Fertilizers returns, replacement policy, customer satisfaction, agricultural inputs return"
        schema={[organizationSchema, returnPolicyPageSchema]}
      />

      {/* ── Hero Banner ── */}
      <section
        ref={heroReveal.ref}
        className={`relative overflow-hidden bg-secondary text-white reveal ${
          heroReveal.isVisible ? "visible" : ""
        }`}
      >
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
              Refund and Returns Policy
            </span>
          </nav>

          <div className="max-w-3xl space-y-5">
            <span className="eyebrow-dark inline-flex items-center gap-2">
              <RotateCcw className="h-4 w-4 text-accent" />
              Customer Satisfaction
            </span>
            <h1 className="font-heading type-page-h1 font-bold tracking-tight text-white">
              Refund and Returns Policy
            </h1>
            <p className="type-body text-white/85 text-lg leading-relaxed">
              At <strong className="text-white">J K Fertilizers</strong>, we are committed to providing high-quality, sustainable agricultural products that meet the needs of our customers.
            </p>
            <p className="type-body text-white/75 leading-relaxed">
              If you are not satisfied with your purchase, we are here to help. This policy outlines our return criteria, refund procedures, and support options.
            </p>
          </div>

          {/* Quick tags */}
          <div className="mt-8 flex flex-wrap items-center gap-3 pt-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-medium text-white/90 backdrop-blur-sm">
              <Clock3 className="h-3.5 w-3.5 text-accent" />
              30-Day Return Window
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-medium text-white/90 backdrop-blur-sm">
              <Sparkles className="h-3.5 w-3.5 text-accent" />
              100% Defect Replacement Guarantee
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-medium text-white/90 backdrop-blur-sm">
              <Truck className="h-3.5 w-3.5 text-accent" />
              Direct Support & Inspection
            </span>
          </div>
        </div>
      </section>

      {/* ── Content Body ── */}
      <div className="bg-background py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1fr_340px] lg:gap-12 items-start">

            {/* Main Articles */}
            <main className="space-y-12">

              {/* Section 1: Returns */}
              <section
                ref={returnReveal.ref}
                id="returns"
                className={`scroll-mt-24 rounded-3xl border border-border bg-surface-card p-6 sm:p-9 shadow-card reveal ${
                  returnReveal.isVisible ? "visible" : ""
                }`}
              >
                <div className="flex items-center gap-3 pb-3 border-b border-border/70">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <PackageCheck className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="type-label font-bold uppercase tracking-[0.16em] text-primary">Policy Article 01</span>
                    <h2 className="font-heading type-section-h2 text-2xl sm:text-3xl font-bold text-foreground">
                      Returns
                    </h2>
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  <div className="rounded-2xl border border-border/80 bg-muted/30 p-5">
                    <p className="type-body text-foreground/90 font-medium">
                      We accept returns on products that are <strong className="text-foreground">unopened, unused, and in their original packaging</strong> within <strong className="text-primary">30 days of purchase</strong>.
                    </p>
                  </div>

                  <div className="grid gap-3.5 sm:grid-cols-3 pt-2">
                    {returnConditions.map((item, idx) => (
                      <div
                        key={idx}
                        {...staggerDelay(idx)}
                        className="rounded-2xl border border-border bg-surface-card p-4 shadow-sm"
                      >
                        <p className="font-heading font-semibold text-foreground text-sm">{item.title}</p>
                        <p className="mt-1 type-body-sm text-muted-foreground text-xs">{item.desc}</p>
                      </div>
                    ))}
                  </div>

                  <div className="rounded-2xl border border-primary/20 bg-primary/5 p-5 mt-4">
                    <p className="font-semibold text-foreground text-sm">How to initiate a return:</p>
                    <p className="mt-1 type-body-sm text-muted-foreground">
                      To initiate a return, please contact our customer service team at{" "}
                      <a href="mailto:sales@jkfertilizers.com" className="font-bold text-primary hover:underline">
                        sales@jkfertilizers.com
                      </a>{" "}
                      with your order details and invoice number.
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 2: Refunds */}
              <section
                ref={refundReveal.ref}
                id="refunds"
                className={`scroll-mt-24 rounded-3xl border border-border bg-surface-card p-6 sm:p-9 shadow-card reveal ${
                  refundReveal.isVisible ? "visible" : ""
                }`}
              >
                <div className="flex items-center gap-3 pb-3 border-b border-border/70">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <CreditCard className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="type-label font-bold uppercase tracking-[0.16em] text-primary">Policy Article 02</span>
                    <h2 className="font-heading type-section-h2 text-2xl sm:text-3xl font-bold text-foreground">
                      Refunds
                    </h2>
                  </div>
                </div>

                <div className="mt-6 grid gap-4">
                  {refundRules.map((rule) => (
                    <div
                      key={rule.step}
                      className="flex items-start gap-4 rounded-2xl border border-border/80 bg-muted/20 p-5"
                    >
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-white text-xs font-bold">
                        {rule.step}
                      </div>
                      <div>
                        <h3 className="font-heading font-semibold text-foreground text-base">{rule.title}</h3>
                        <p className="mt-1 type-body-sm text-muted-foreground leading-relaxed">{rule.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Section 3: Defective or Incorrect Products */}
              <section
                ref={defectiveReveal.ref}
                id="defective"
                className={`scroll-mt-24 rounded-3xl border border-border bg-surface-card p-6 sm:p-9 shadow-card reveal ${
                  defectiveReveal.isVisible ? "visible" : ""
                }`}
              >
                <div className="flex items-center gap-3 pb-3 border-b border-border/70">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <AlertTriangle className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="type-label font-bold uppercase tracking-[0.16em] text-primary">Policy Article 03</span>
                    <h2 className="font-heading type-section-h2 text-2xl sm:text-3xl font-bold text-foreground">
                      Defective or Incorrect Products
                    </h2>
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  <p className="type-body text-foreground/90 leading-relaxed">
                    If you receive a defective or incorrect product, please notify us within <strong className="text-primary font-bold">7 days of receiving the item</strong>.
                  </p>
                  <div className="rounded-2xl border border-secondary/20 bg-secondary/5 p-5">
                    <p className="font-semibold text-foreground">
                      Our Quality Commitment:
                    </p>
                    <p className="mt-1 type-body-sm text-foreground/80">
                      We will arrange for a <strong className="text-secondary font-bold">replacement or full refund at no additional cost to you</strong>, including all shipping and handling charges.
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 4: Exchanges */}
              <section
                ref={exchangeReveal.ref}
                id="exchanges"
                className={`scroll-mt-24 rounded-3xl border border-border bg-surface-card p-6 sm:p-9 shadow-card reveal ${
                  exchangeReveal.isVisible ? "visible" : ""
                }`}
              >
                <div className="flex items-center gap-3 pb-3 border-b border-border/70">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <RefreshCw className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="type-label font-bold uppercase tracking-[0.16em] text-primary">Policy Article 04</span>
                    <h2 className="font-heading type-section-h2 text-2xl sm:text-3xl font-bold text-foreground">
                      Exchanges
                    </h2>
                  </div>
                </div>

                <div className="mt-6 space-y-3 text-foreground/90">
                  <p className="type-body leading-relaxed">
                    We do not offer direct exchanges. If you wish to exchange an item, please return the original product following our return process and place a new order for the desired product.
                  </p>
                </div>
              </section>

              {/* Section 5: Inquiries & Assistance */}
              <section
                id="assistance"
                className="scroll-mt-24 rounded-3xl border border-primary/30 bg-primary/5 p-6 sm:p-9 shadow-card"
              >
                <div className="flex items-center gap-3 pb-3 border-b border-primary/20">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary text-white">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="type-label font-bold uppercase tracking-[0.16em] text-primary">Customer Support</span>
                    <h2 className="font-heading type-section-h2 text-2xl sm:text-3xl font-bold text-foreground">
                      Assistance & Inquiries
                    </h2>
                  </div>
                </div>

                <p className="mt-5 type-body text-foreground/90 leading-relaxed">
                  For any inquiries or assistance regarding returns or refunds, please reach out to our customer service team at:
                </p>

                <div className="mt-6 rounded-2xl border border-border bg-surface-card p-5 space-y-3">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="type-label font-semibold text-xs text-muted-foreground uppercase tracking-wider">Email Us:</span>
                    <a
                      href="mailto:sales@jkfertilizers.com"
                      className="font-heading text-lg font-bold text-primary hover:underline"
                    >
                      sales@jkfertilizers.com
                    </a>
                    <span className="text-muted-foreground/40">|</span>
                    <a
                      href="mailto:info@jkfertilizers.com"
                      className="font-heading font-semibold text-foreground hover:text-primary hover:underline"
                    >
                      info@jkfertilizers.com
                    </a>
                  </div>
                  <p className="type-body-sm text-muted-foreground">
                    We are here to ensure your satisfaction and provide you with the best service possible.
                  </p>
                </div>

                {/* Policy Notice Box */}
                <div className="mt-6 flex items-start gap-3 rounded-2xl border border-border bg-muted/60 p-4 text-xs text-foreground/80">
                  <Info className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <p>
                    <strong>Note:</strong> This policy applies only to purchases made directly through <strong>J K Fertilizers</strong>. For purchases made through third-party dealers or distributors, please consult their respective return and refund guidelines.
                  </p>
                </div>
              </section>

            </main>

            {/* Sidebar */}
            <aside className="space-y-6 lg:sticky lg:top-24">
              {/* Quick Navigation Card */}
              <div className="rounded-3xl border border-border bg-surface-card p-6 shadow-card">
                <p className="type-label font-bold uppercase tracking-[0.16em] text-muted-foreground mb-4">
                  Quick Navigation
                </p>
                <nav className="flex flex-col space-y-2 text-sm">
                  {[
                    { href: "#returns", label: "Returns (30 Days)" },
                    { href: "#refunds", label: "Refunds Process" },
                    { href: "#defective", label: "Defective or Incorrect Items" },
                    { href: "#exchanges", label: "Exchanges Policy" },
                    { href: "#assistance", label: "Inquiries & Assistance" },
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

              {/* Action card */}
              <div className="rounded-3xl border border-primary/20 bg-primary/10 p-6 text-foreground">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary text-white mb-4">
                  <HelpCircle className="h-5 w-5" />
                </div>
                <h3 className="font-heading text-base font-bold text-foreground">Need Return Assistance?</h3>
                <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                  Have an order number or questions about a product batch? Our support desk replies within 24 hours.
                </p>
                <div className="mt-4 pt-4 border-t border-primary/20 flex flex-col gap-2">
                  <Button asChild className="w-full h-10 rounded-full bg-primary text-white hover:bg-primary/90 text-xs">
                    <Link to="/contact">Contact Support</Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full h-10 rounded-full border-border bg-surface-card text-xs hover:bg-muted">
                    <a href="mailto:sales@jkfertilizers.com">Email Sales Team</a>
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
