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
        <div className="absolute top-1/2 left-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-10 blur-[100px]" style={{ background: "radial-gradient(circle, rgba(143,175,126,0.4), transparent)" }} />
        {/* Grain overlay */}
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
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-4 py-12 sm:flex-row sm:items-center sm:px-6 lg:px-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="h-px w-8 bg-accent" />
              <p className="text-xs font-bold uppercase tracking-[0.32em] text-accent">Partner with us</p>
            </div>
            <h2 className="font-heading text-3xl font-bold text-white lg:text-4xl">
              Let's grow something great.
            </h2>
            <p className="mt-2 max-w-lg text-sm leading-7 text-white/55">
              Manufacture under your brand. Scale with our facility. Build trust with every granule.
            </p>
          </div>
          <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
            <Button
              asChild
              className="h-12 rounded-full px-7 font-bold text-secondary shadow-[0_6px_28px_rgba(245,158,11,0.3)] hover:shadow-[0_8px_36px_rgba(245,158,11,0.4)] transition-all duration-300"
              style={{ background: "linear-gradient(135deg, #F59E0B, #D97706)" }}
            >
              <Link to="/contact">
                Become a partner <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-12 rounded-full border-white/15 px-7 text-white hover:border-white/25 hover:bg-white/8 transition-all duration-300"
            >
              <a href={`tel:${company.phoneRaw}`}>Call us now</a>
            </Button>
          </div>
        </div>
      </div>

      {/* ── Main grid ── */}
      <div
        className="relative mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.6fr_1fr_1fr_1fr] lg:gap-8 lg:px-8"
        data-testid="footer-main-grid"
      >
        {/* Brand column */}
        <div className="space-y-7" data-testid="footer-company-block">
          <Link to="/" className="group inline-flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 rounded-xl bg-primary/20 blur-md group-hover:bg-primary/30 transition-all duration-300" />
              <img
                src="/logo.png"
                alt="Adit Biorganic"
                className="relative h-11 w-auto rounded-xl object-contain brightness-0 invert"
              />
            </div>
            <div>
              <p className="font-heading text-base font-bold text-white transition-colors group-hover:text-accent">
                {company.name}
              </p>
              <p className="text-[10px] uppercase tracking-[0.28em] text-white/45">{company.tagline}</p>
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
              className="group/card flex items-center gap-3 rounded-2xl border border-white/6 bg-white/4 px-4 py-3 text-sm transition-all duration-200 hover:border-white/12 hover:bg-white/8"
              data-testid="footer-phone-card"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary transition-colors group-hover/card:bg-primary/30">
                <Phone className="h-3.5 w-3.5" />
              </span>
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-white/35">Phone</p>
                <p className="font-semibold text-white">{company.phoneDisplay}</p>
              </div>
            </a>

            <a
              href={`mailto:${company.emails[0]}`}
              className="group/card flex items-center gap-3 rounded-2xl border border-white/6 bg-white/4 px-4 py-3 text-sm transition-all duration-200 hover:border-white/12 hover:bg-white/8"
              data-testid="footer-email-card"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent transition-colors group-hover/card:bg-accent/25">
                <Mail className="h-3.5 w-3.5" />
              </span>
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-white/35">Email</p>
                <p className="font-semibold text-white">{company.emails[0]}</p>
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
                <p className="text-[10px] uppercase tracking-[0.2em] text-white/35">Address</p>
                <p className="mt-0.5 leading-6 text-white/65">{company.address}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation column */}
        <div className="space-y-5" data-testid="footer-links-block">
          <p className="text-[11px] font-bold uppercase tracking-[0.32em] text-white/35">Navigate</p>
          <nav className="flex flex-col gap-0.5">
            {navigation.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="group inline-flex items-center gap-2 py-2 text-sm text-white/60 transition-colors hover:text-white"
                data-testid={`footer-link-${item.label.toLowerCase()}`}
              >
                <span className="h-px w-0 bg-accent transition-all duration-300 group-hover:w-5" />
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="mt-6 flex items-center gap-2">
            <Leaf className="h-3.5 w-3.5 text-primary/60" />
            <p className="text-xs text-white/35 italic">Nurturing Farms, Preserving Nature</p>
          </div>
        </div>

        {/* Products column */}
        <div className="space-y-5" data-testid="footer-products-block">
          <p className="text-[11px] font-bold uppercase tracking-[0.32em] text-white/35">Product Groups</p>
          <div className="flex flex-col gap-0.5">
            {products.slice(0, 6).map((product, index) => (
              <Link
                key={product.slug}
                to={`/products/${product.slug}`}
                className="group inline-flex items-center gap-2 py-2 text-sm text-white/60 transition-colors hover:text-white"
                data-testid={`footer-product-link-${index}`}
              >
                <span className="h-px w-0 bg-primary transition-all duration-300 group-hover:w-5" />
                {product.title}
              </Link>
            ))}
          </div>
          <Link
            to="/products"
            className="mt-2 inline-flex items-center gap-1.5 text-xs font-bold text-primary/70 transition hover:text-primary"
          >
            View all products <ArrowRight className="h-3 w-3" />
          </Link>
        </div>

        {/* Services column */}
        <div className="space-y-5" data-testid="footer-services-block">
          <p className="text-[11px] font-bold uppercase tracking-[0.32em] text-white/35">Services</p>
          <div className="flex flex-col gap-0.5">
            {services.map((svc, i) => (
              <Link
                key={i}
                to={svc.path}
                className="group inline-flex items-center gap-2 py-2 text-sm text-white/60 transition-colors hover:text-white"
                data-testid={`footer-service-link-${i}`}
              >
                <span className="h-px w-0 bg-accent transition-all duration-300 group-hover:w-5" />
                {svc.label}
              </Link>
            ))}
          </div>
          <Link
            to="/services"
            className="mt-2 inline-flex items-center gap-1.5 text-xs font-bold text-accent/70 transition hover:text-accent"
          >
            View all services <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="relative border-t border-white/6">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-6 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-white/35">
            <p data-testid="footer-copyright-text">
              © {new Date().getFullYear()} Adit Biorganic Pvt. Ltd. All rights reserved.
            </p>
            <span className="hidden h-3 w-px bg-white/15 lg:block" />
            <p>Anand, Gujarat, India</p>
          </div>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <span className="hidden h-3 w-px bg-white/12 lg:block" />
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
      </div>
    </footer>
  );
};
