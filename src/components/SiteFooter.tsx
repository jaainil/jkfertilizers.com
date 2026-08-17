import { Link } from "react-router-dom";
import { ArrowRight, Mail, MapPin, Phone, Leaf, Award } from "lucide-react";

import { Button } from "@/components/ui/button";
import { products } from "@/data/products";
import { company, navigation } from "@/data/siteData";

export const SiteFooter = () => {
  const services = [
    { label: "Coating", path: "/services/granule-technology" },
    { label: "Infrastructure Leasing", path: "/services/infrastructure-leasing" },
    { label: "Packaging", path: "/services/custom-packaging-solutions" },
    { label: "Job Work", path: "/services/job-work-services" },
    { label: "Warehouse & Storage", path: "/services/warehouse-storage" },
  ];

  return (
    <footer
      className="relative overflow-hidden text-white bg-[#122B1D]"
      data-testid="site-footer"
    >
      {/* ── CTA Band ── */}
      <div className="relative border-b border-white/8">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-4 py-10 sm:px-6 sm:py-12 lg:flex-row lg:items-center lg:px-8">
          <div>
            <div className="flex items-center gap-2 mb-2 sm:mb-3">
              <span className="h-px w-8 bg-accent" />
              <p className="type-label font-bold uppercase tracking-[0.16em] text-accent">Partner with us</p>
            </div>
            <h2 className="font-heading type-section-h2 font-bold text-white">
              Let's grow something great.
            </h2>
            <p className="mt-2 max-w-lg type-body-sm text-white/60">
              Partner with us for quality organic fertilizers and sustainable agricultural solutions.
            </p>
          </div>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Button
              asChild
              className="h-12 w-full rounded-full bg-accent px-7 text-sm font-bold text-secondary hover:bg-accent/90 transition-colors duration-200 sm:w-auto"
            >
              <Link to="/contact">
                Get In Touch <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-12 w-full rounded-full border-white/15 bg-transparent px-7 text-sm text-white hover:border-white/30 hover:bg-white/5 transition-colors duration-200 sm:w-auto"
            >
              <a href={`tel:${company.phoneRaw}`}>Call us now</a>
            </Button>
          </div>
        </div>
      </div>

      {/* ── Main grid ── */}
      <div
        className="relative mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:grid-cols-2 sm:px-6 sm:py-14 lg:grid-cols-[1.6fr_1fr_1fr_1fr] lg:gap-8 lg:px-8 lg:py-16"
        data-testid="footer-main-grid"
      >
        {/* Brand column */}
        <div className="space-y-6 sm:col-span-2 lg:col-span-1 lg:space-y-7" data-testid="footer-company-block">
          <Link to="/" className="group inline-flex items-center gap-3">
            <img
              src="/logo.webp"
              alt="J K Fertilizers"
              width={44}
              height={44}
              loading="lazy"
              decoding="async"
              className="h-10 w-auto rounded-lg object-contain brightness-0 invert sm:h-11"
            />
            <div>
              <p className="font-heading text-base font-bold text-white transition-colors group-hover:text-accent">
                {company.name}
              </p>
              <p className="type-label uppercase tracking-[0.18em] text-white/60">{company.tagline}</p>
            </div>
          </Link>

          <p className="type-body-sm text-white/60" data-testid="footer-company-description">
            Leading manufacturers of Organic Fertilizers, Base Granules and Coated Base Granules. Based in Gujarat — trusted by farmers and businesses across India since 2006.
          </p>

          {/* FCO badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent/10 px-4 py-2">
            <Award className="h-3.5 w-3.5 text-accent" />
            <span className="type-label font-bold uppercase tracking-[0.16em] text-accent/90">FCO Approved Products</span>
          </div>

          {/* Contact cards */}
          <div className="space-y-3">
            <div className="group/card flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm transition-colors duration-200 min-h-[44px]">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/20 text-accent">
                <Phone className="h-3.5 w-3.5" />
              </span>
              <div>
                <p className="type-label uppercase tracking-[0.16em] text-white/80 font-medium">Phone</p>
                <p className="font-semibold text-white">{company.phoneDisplay} / 92 / 91</p>
              </div>
            </div>

            <div
              className="group/card flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm transition-colors duration-200 min-h-[44px]"
              data-testid="footer-email-card"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/20 text-accent">
                <Mail className="h-3.5 w-3.5" />
              </span>
              <div>
                <p className="type-label uppercase tracking-[0.16em] text-white/80 font-medium">Email</p>
                <p className="min-w-0 break-all font-semibold text-white">
                  <a href={`mailto:${company.emails[0]}`} className="hover:text-accent hover:underline transition-colors">{company.emails[0]}</a>
                  <span className="text-white/40 mx-2">|</span>
                  <a href={`mailto:${company.emails[1]}`} className="hover:text-accent hover:underline transition-colors">{company.emails[1]}</a>
                </p>
              </div>
            </div>

            <div
              className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm"
              data-testid="footer-address-card"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10 text-white/80">
                <MapPin className="h-3.5 w-3.5" />
              </span>
              <div>
                <p className="type-label uppercase tracking-[0.16em] text-white/80 font-medium">Address</p>
                <p className="mt-0.5 min-w-0 break-words leading-6 text-white/90">{company.address}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10 text-white/80">
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
              </span>
              <div>
                <p className="type-label uppercase tracking-[0.16em] text-white/80 font-medium">Working Hours</p>
                <p className="font-semibold text-white">Mon - Sat: 9AM - 6PM</p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation column */}
        <div className="space-y-4 sm:space-y-5" data-testid="footer-links-block">
          <p className="type-label font-bold uppercase tracking-[0.18em] text-white/80">Navigate</p>
          <nav className="flex flex-col gap-0.5">
            {[...navigation, { label: "Commitment", path: "/commitment" }].map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="group inline-flex items-center gap-2 py-3 text-sm text-white/80 transition-colors hover:text-white"
                data-testid={`footer-link-${item.label.toLowerCase()}`}
              >
                <span className="h-px w-0 bg-accent transition-[width] duration-300 group-hover:w-5" />
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 pt-2">
            <Leaf className="h-3.5 w-3.5 text-accent" />
            <p className="type-label text-white/80 italic">Organic, Naturally</p>
          </div>
        </div>

        {/* Products column */}
        <div className="space-y-4 sm:space-y-5" data-testid="footer-products-block">
          <p className="type-label font-bold uppercase tracking-[0.18em] text-white/80">Product Groups</p>
          <div className="flex flex-col gap-0.5">
            {products.slice(0, 6).map((product, index) => (
              <Link
                key={product.slug}
                to={`/products/${product.slug}`}
                className="group inline-flex items-center gap-2 py-3 text-sm text-white/80 transition-colors hover:text-white"
                data-testid={`footer-product-link-${index}`}
              >
                <span className="h-px w-0 bg-accent transition-[width] duration-300 group-hover:w-5" />
                {product.title}
              </Link>
            ))}
          </div>
          <Link
            to="/products"
            className="inline-flex items-center gap-1.5 type-label font-bold text-accent transition hover:underline"
            aria-label="View all organic fertilizer products"
          >
            View all products <ArrowRight className="h-3 w-3" />
          </Link>
        </div>

        {/* Services column */}
        <div className="space-y-4 sm:space-y-5" data-testid="footer-services-block">
          <p className="type-label font-bold uppercase tracking-[0.18em] text-white/80">Services</p>
          <div className="flex flex-col gap-0.5">
            {services.map((svc, i) => (
              <Link
                key={i}
                to={svc.path}
                className="group inline-flex items-center gap-2 py-3 text-sm text-white/80 transition-colors hover:text-white"
                data-testid={`footer-service-link-${i}`}
              >
                <span className="h-px w-0 bg-accent transition-[width] duration-300 group-hover:w-5" />
                {svc.label}
              </Link>
            ))}
          </div>
          <Link
            to="/services"
            className="inline-flex items-center gap-1.5 type-label font-bold text-accent transition hover:underline"
            aria-label="View all fertilizer manufacturing services"
          >
            View all services <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="relative border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-white/75">
            <p data-testid="footer-copyright-text">
              © {new Date().getFullYear()} J K Fertilizers. All Rights Reserved.
            </p>
            <span className="hidden h-3 w-px bg-white/30 sm:block" />
            <p>Anand, Gujarat, India</p>
          </div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-white/75">
            <Link to="/privacy" className="transition-colors hover:text-white">Confidentiality & Privacy</Link>
            <Link to="/return-policy" className="transition-colors hover:text-white">Return and Refund Policy</Link>
          </div>
          <a
            href="https://aexaware.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-white/75 transition-colors hover:text-white"
            data-testid="footer-credit"
          >
            Designed & built by
            <span className="font-bold text-white hover:text-accent transition-colors">Aexaware Private Limited</span>
          </a>
        </div>
      </div>
    </footer>
  );
};
