import { Link, NavLink } from "react-router-dom";
import { Mail, MapPin, Menu, Phone, X, Leaf } from "lucide-react";

import { Button } from "@/components/ui/button";
import { company, navigation } from "@/data/siteData";

// Desktop nav pill — NOT reused on mobile
const desktopLinkClassName = ({ isActive }: { isActive: boolean }) =>
  `relative rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 active:scale-95 ${
    isActive
      ? "bg-primary/10 text-primary font-semibold shadow-inner"
      : "text-foreground/75 hover:text-primary hover:bg-primary/5 hover:-translate-y-0.5"
  }`;

// FIX 2.1 + 2.6: separate mobile style — full-width flex rows, py-3 = 44px+ tap target
const mobileLinkClassName = ({ isActive }: { isActive: boolean }) =>
  `flex w-full items-center rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
    isActive
      ? "bg-primary/10 text-primary font-semibold"
      : "text-foreground/75 hover:text-primary hover:bg-primary/5"
  }`;

export const SiteNavbar = ({
  onMobileToggle,
  mobileOpen,
}: {
  onMobileToggle: () => void;
  mobileOpen: boolean;
}) => {
  return (
    <>
      {/* ── Top utility bar (desktop only) ── */}
      <div className="hidden border-b border-white/10 bg-secondary text-white lg:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-2.5 text-xs">
          <div className="flex flex-wrap items-center gap-6" data-testid="topbar-contact-list">
            <a
              href={`tel:${company.phoneRaw}`}
              className="inline-flex items-center gap-2 text-white/75 transition-colors hover:text-white"
              data-testid="topbar-phone-link"
            >
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent/20 text-accent">
                <Phone className="h-3 w-3" />
              </span>
              {company.phoneDisplay}
            </a>
            <span className="h-3 w-px bg-white/15" />
            <a
              href={`mailto:${company.emails[0]}`}
              className="inline-flex items-center gap-2 text-white/75 transition-colors hover:text-white"
              data-testid="topbar-email-link"
            >
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/20 text-primary">
                <Mail className="h-3 w-3" />
              </span>
              {company.emails[0]}
            </a>
            <span className="h-3 w-px bg-white/15" />
            <div className="inline-flex items-center gap-2 text-white/60" data-testid="topbar-address-text">
              <MapPin className="h-3 w-3 text-accent/60" />
              <span>{company.address}</span>
            </div>
          </div>
          <div
            className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-4 py-1 font-semibold uppercase tracking-[0.22em] text-accent/90"
            data-testid="topbar-tagline"
          >
            <Leaf className="h-3 w-3" />
            ISO 9001:2015 Certified
          </div>
        </div>
      </div>

      {/* ── Sticky header ── */}
      <header className="sticky top-0 z-50 border-b border-border/60 bg-surface-overlay/90 backdrop-blur-2xl shadow-[0_1px_0_0_rgba(45,122,74,0.06),0_4px_24px_rgba(22,61,38,0.04)]">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:gap-4 sm:px-6 sm:py-3.5 lg:px-8">

          {/* Logo */}
          <Link to="/" className="group flex items-center gap-2.5 sm:gap-3" data-testid="site-logo-link">
            <div className="relative shrink-0">
              <div className="absolute inset-0 rounded-xl bg-primary/8 blur-md group-hover:bg-primary/12 transition-all duration-300" />
              <img src="/logo.png" alt="Adit Biorganic" className="relative h-10 w-auto rounded-xl object-contain sm:h-11" />
            </div>
            <div>
              <p className="font-heading text-sm font-bold leading-tight text-foreground sm:text-base">{company.name}</p>
              {/* FIX 2.4: text-xs minimum (was text-[10px]) */}
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">Organic · Certified · Trusted</p>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-0.5 lg:flex" data-testid="desktop-navigation">
            {navigation.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={desktopLinkClassName}
                data-testid={`nav-link-${item.label.toLowerCase()}`}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden items-center gap-2.5 lg:flex">
            <Button
              asChild
              variant="outline"
              className="h-10 rounded-full border-border bg-transparent px-5 text-sm font-medium text-foreground/80 hover:border-primary hover:text-primary hover:bg-primary/5 transition-all duration-200"
              data-testid="header-call-button"
            >
              <a href={`tel:${company.phoneRaw}`}>
                <Phone className="mr-1.5 h-3.5 w-3.5" />
                Call now
              </a>
            </Button>
            <Button
              asChild
              className="h-10 rounded-full bg-primary px-5 text-sm font-semibold text-white shadow-[0_4px_20px_rgba(45,122,74,0.35)] hover:bg-primary/90 hover:shadow-[0_6px_28px_rgba(45,122,74,0.45)] transition-all duration-200"
              data-testid="header-contact-button"
            >
              <Link to="/contact">Become a partner</Link>
            </Button>
          </div>

          {/* FIX 2.3: h-11 w-11 = 44px touch target, h-5 w-5 icon */}
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border/70 bg-surface-card text-foreground/70 hover:border-primary/40 hover:text-primary transition-all duration-200 lg:hidden"
            onClick={onMobileToggle}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            data-testid="mobile-menu-toggle-button"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* FIX 2.2: backdrop overlay closes menu on tap-outside */}
        {mobileOpen && (
          <div
            className="fixed inset-0 z-[-1] lg:hidden"
            onClick={onMobileToggle}
            aria-hidden="true"
          />
        )}

        {/* Mobile nav panel */}
        {mobileOpen && (
          <div
            className="border-t border-border/50 bg-surface-card/98 backdrop-blur-xl px-4 py-4 lg:hidden"
            data-testid="mobile-navigation-panel"
          >
            {/* FIX 2.6: full-width links, py-3 tap targets via mobileLinkClassName */}
            <div className="flex flex-col gap-1">
              {navigation.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={mobileLinkClassName}
                  onClick={onMobileToggle}
                  data-testid={`mobile-nav-link-${item.label.toLowerCase()}`}
                >
                  {item.label}
                </NavLink>
              ))}
            </div>

            <div className="mt-4 h-px bg-border/60" />

            {/* Mobile CTAs */}
            <div className="mt-4 flex flex-col gap-3">
              <a
                href={`tel:${company.phoneRaw}`}
                className="flex items-center justify-center gap-2 rounded-full bg-primary px-4 py-3 text-sm font-semibold text-white shadow-[0_4px_16px_rgba(45,122,74,0.3)]"
                data-testid="mobile-call-link"
              >
                <Phone className="h-4 w-4" />
                Call {company.phoneDisplay}
              </a>
              <Link
                to="/contact"
                onClick={onMobileToggle}
                className="flex items-center justify-center gap-2 rounded-full border border-primary/30 bg-primary/6 px-4 py-3 text-sm font-semibold text-primary"
              >
                Become a partner
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
