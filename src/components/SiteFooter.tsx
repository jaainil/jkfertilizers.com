import { Link } from "react-router-dom";
import { ArrowRight, Mail, MapPin, Phone, Leaf, Award } from "lucide-react";

import { Button } from "@/components/ui/button";
import { products } from "@/data/products";
import { company, navigation } from "@/data/siteData";

const services = [
  { label: "Granule Manufacturing", path: "/services/organic-coated-granule-manufacturing" },
  { label: "Contract Manufacturing", path: "/services/job-work-contract-manufacturing" },
  { label: "Advanced Coating", path: "/services/advanced-coating-services" },
  { label: "Lab & Testing", path: "/services/laboratory-testing-services" },
  { label: "Custom Packaging", path: "/services/custom-packaging-private-labeling" },
  { label: "Warehousing", path: "/services/warehouse-go-down-facilities" },
];

export const SiteFooter = () => {
  return (
    <footer
      className="relative overflow-hidden text-white"
      data-testid="site-footer"
      style={{ background: "linear-gradient(160deg, #0D2718 0%, #122B1D 40%, #163D26 100%)" }}
    >
      {/* Atmospheric background layers */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-48 -top-48 h-[700px] w-[700px] rounded-full opacity-30 blur-[140px]" style={{ background: "radial-gradient(circle, rgba(45,122,74,0.5), transparent)" }} />
        <div className="absolute -bottom-40 right-0 h-[600px] w-[600px] rounded-full opacity-20 blur-[120px]" style={{ background: "radial-gradient(circle, rgba(245,158,11,0.35), transparent)" }} />
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
            backgroundSize: "128px 128px",
          }}
        />
      </div>

      {/* ── CTA Band ── */}
      <div className="relative border-b border-white/8">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-4 py-10 sm:px-6 sm:py-12 lg:flex-row lg:items-center lg:px-8">
          <div>
            <div className="flex items-center gap-2 mb-2 sm:mb-3">
              <span className="h-px w-8 bg-accent" />
              {/* FIX 3.3: text-xs minimum */}
              <p className="text-xs font-bold uppercase tracking-[0.32em] text-accent">Partner with us</p>
            </div>
            {/* FIX 3.3: text-2xl base */}
            <h2 className="font-heading type-section-h2 font-bold text-white">
              Let's grow something great.
            </h2>
            <p className="mt-2 max-w-lg text-sm leading-7 text-white/55">
              Manufacture under your brand. Scale with our facility. Build trust with every granule.
            </p>
          </div>
          {/* FIX 3.2: w-full on mobile, w-auto on sm+ */}
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Button
              asChild
              className="h-12 w-full rounded-full px-7 font-bold text-secondary shadow-[0_6px_28px_rgba(245,158,11,0.3)] hover:shadow-[0_8px_36px_rgba(245,158,11,0.4)] transition-all duration-300 sm:w-auto"
              style={{ background: "linear-gradient(135deg, #F59E0B, #D97706)" }}
            >
              <Link to="/contact">
                Become a partner <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-12 w-full rounded-full border-white/15 px-7 text-white hover:border-white/25 hover:bg-white/8 transition-all duration-300 sm:w-auto"
            >
              <a href={`tel:${company.phoneRaw}`}>Call us now</a>
            </Button>
          </div>
        </div>
      </div>

      {/* ── Main grid ── */}
      {/* FIX 3.1: sm:grid-cols-2 so links pair up on tablets, gap-8 on mobile */}
      <div
        className="relative mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:grid-cols-2 sm:px-6 sm:py-14 lg:grid-cols-[1.6fr_1fr_1fr_1fr] lg:gap-8 lg:px-8 lg:py-16"
        data-testid="footer-main-grid"
      >
        {/* Brand column — full width on mobile, full width on sm (span 2), normal on lg */}
        <div className="space-y-6 sm:col-span-2 lg:col-span-1 lg:space-y-7" data-testid="footer-company-block">
          <Link to="/" className="group inline-flex items-center gap-3">
            <div className="relative shrink-0">
              <div className="absolute inset-0 rounded-xl bg-primary/20 blur-md group-hover:bg-primary/30 transition-all duration-300" />
              <img
                src="/logo.png"
                alt="Adit Biorganic"
                className="relative h-10 w-auto rounded-xl object-contain brightness-0 invert sm:h-11"
              />
            </div>
            <div>
              <p className="font-heading text-base font-bold text-white transition-colors group-hover:text-accent">
                {company.name}
              </p>
              {/* FIX 3.4: text-xs minimum (was text-[10px]), opacity /60 */}
              <p className="text-xs uppercase tracking-[0.24em] text-white/60">{company.tagline}</p>
            </div>
          </Link>

          <p className="text-sm leading-7 text-white/55" data-testid="footer-company-description">
            India's leading ISO 9001:2015 certified B2B fertilizer granule manufacturer. Based in Anand, Gujarat —
            trusted by brands across the country.
          </p>

          {/* ISO badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent/8 px-4 py-2">
            <Award className="h-3.5 w-3.5 text-accent" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-accent/85">ISO 9001:2015 Certified</span>
          </div>

          {/* Contact cards */}
          <div className="space-y-3">
            <a
              href={`tel:${company.phoneRaw}`}
              className="group/card flex items-center gap-3 rounded-2xl border border-white/6 bg-white/4 px-4 py-3 text-sm transition-all duration-200 hover:border-white/12 hover:bg-white/8 min-h-[44px]"
              data-testid="footer-phone-card"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary transition-colors group-hover/card:bg-primary/30">
                <Phone className="h-3.5 w-3.5" />
              </span>
              <div>
                {/* FIX 3.4/3.5: text-xs minimum */}
                <p className="text-xs uppercase tracking-[0.2em] text-white/40">Phone</p>
                <p className="font-semibold text-white">{company.phoneDisplay}</p>
              </div>
            </a>

            <a
              href={`mailto:${company.emails[0]}`}
              className="group/card flex items-center gap-3 rounded-2xl border border-white/6 bg-white/4 px-4 py-3 text-sm transition-all duration-200 hover:border-white/12 hover:bg-white/8 min-h-[44px]"
              data-testid="footer-email-card"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent transition-colors group-hover/card:bg-accent/25">
                <Mail className="h-3.5 w-3.5" />
              </span>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-white/40">Email</p>
                <p className="min-w-0 break-all font-semibold text-white">{company.emails[0]}</p>
              </div>
            </a>

            <div
              className="flex items-start gap-3 rounded-2xl border border-white/6 bg-white/4 px-4 py-3 text-sm"
              data-testid="footer-address-card"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/6 text-white/45">
                <MapPin className="h-3.5 w-3.5" />
              </span>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-white/40">Address</p>
                <p className="mt-0.5 min-w-0 break-words leading-6 text-white/65">{company.address}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation column */}
        <div className="space-y-4 sm:space-y-5" data-testid="footer-links-block">
          {/* FIX 3.5: text-xs, opacity /50 */}
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-white/50">Navigate</p>
          <nav className="flex flex-col gap-0.5">
            {navigation.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                /* FIX 3.6: py-3 = 44px tap target */
                className="group inline-flex items-center gap-2 py-3 text-sm text-white/60 transition-colors hover:text-white"
                data-testid={`footer-link-${item.label.toLowerCase()}`}
              >
                <span className="h-px w-0 bg-accent transition-all duration-300 group-hover:w-5" />
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 pt-2">
            <Leaf className="h-3.5 w-3.5 text-primary/60" />
            <p className="text-xs text-white/35 italic">Nurturing Farms, Preserving Nature</p>
          </div>
        </div>

        {/* Products column */}
        <div className="space-y-4 sm:space-y-5" data-testid="footer-products-block">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-white/50">Product Groups</p>
          <div className="flex flex-col gap-0.5">
            {products.slice(0, 6).map((product, index) => (
              <Link
                key={product.slug}
                to={`/products/${product.slug}`}
                /* FIX 3.6: py-3 tap target */
                className="group inline-flex items-center gap-2 py-3 text-sm text-white/60 transition-colors hover:text-white"
                data-testid={`footer-product-link-${index}`}
              >
                <span className="h-px w-0 bg-primary transition-all duration-300 group-hover:w-5" />
                {product.title}
              </Link>
            ))}
          </div>
          <Link
            to="/products"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-primary/70 transition hover:text-primary"
          >
            View all products <ArrowRight className="h-3 w-3" />
          </Link>
        </div>

        {/* Services column */}
        <div className="space-y-4 sm:space-y-5" data-testid="footer-services-block">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-white/50">Services</p>
          <div className="flex flex-col gap-0.5">
            {services.map((svc, i) => (
              <Link
                key={i}
                to={svc.path}
                /* FIX 3.6: py-3 tap target */
                className="group inline-flex items-center gap-2 py-3 text-sm text-white/60 transition-colors hover:text-white"
                data-testid={`footer-service-link-${i}`}
              >
                <span className="h-px w-0 bg-accent transition-all duration-300 group-hover:w-5" />
                {svc.label}
              </Link>
            ))}
          </div>
          <Link
            to="/services"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-accent/70 transition hover:text-accent"
          >
            View all services <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="relative border-t border-white/6">
        {/* FIX 3.7: sm:flex-row so it flattens earlier than lg */}
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-white/35">
            <p data-testid="footer-copyright-text">
              © {new Date().getFullYear()} Adit Biorganic Pvt. Ltd. All rights reserved.
            </p>
            <span className="hidden h-3 w-px bg-white/20 sm:block" />
            <p>Anand, Gujarat, India</p>
          </div>
          <a
            href="https://aexaware.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-white/25 transition-colors hover:text-white/55"
            data-testid="footer-credit"
          >
            Designed &amp; built by
            <span className="font-bold text-white/40 hover:text-white/65 transition-colors">Aexaware Private Limited</span>
          </a>
        </div>
      </div>
    </footer>
  );
};
