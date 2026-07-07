import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Mail, MapPin, Menu, Phone, X, Leaf, ChevronDown, ChevronRight, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { company, navigation } from "@/data/siteData";
import { products } from "@/data/products";

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

interface NavSubItem {
  label: string;
  path: string;
  tKey?: string;
  description?: string;
}

interface NavItem {
  label: string;
  path?: string;
  tKey?: string;
  children?: NavSubItem[];
}

const navMenu: NavItem[] = [
  { label: "Home", path: "/", tKey: "nav.home" },
  {
    label: "About Us",
    tKey: "nav.about",
    children: [
      { label: "About Us", path: "/about", tKey: "nav.about", description: "Our legacy, vision, and team commitment" },
      { label: "Our History", path: "/history", tKey: "nav.history", description: "Milestones and growth since 2006" },
    ],
  },
  {
    label: "Products",
    tKey: "nav.product",
    children: [
      { label: "Organic Manure", path: "/products/organic-manure" },
      { label: "PROM", path: "/products/prom" },
      { label: "PDM", path: "/products/pdm" },
      { label: "Mycorrhiza Biofertilizer", path: "/products/mycorrhiza-granules-biofertilizers" },
      { label: "Customized Coated Granules", path: "/products/customized-coated-granules" },
      { label: "Coated Base Granules Bio NPK", path: "/products/coated-base-granules-bio-npk" },
      { label: "Coated Base Granules Mycorrhiza", path: "/products/coated-base-granules-mycorrhiza" },
      { label: "Customized Base Granules", path: "/products/customized-base-granules" },
      { label: "Pancharatna Base Granules", path: "/products/pancharatna-base-granules" },
      { label: "Organic Carbon Base Granules", path: "/products/organic-carbon-base-granules" },
      { label: "Humic Based Granules", path: "/products/humic-based-granules" },
      { label: "Enriched Base Granules", path: "/products/enriched-base-granules" },
      { label: "Other Nutrients Base Granules", path: "/products/other-nutrients-base-granules" },
      { label: "Base Granules", path: "/products/base-granules" },
      { label: "Plant Available Silica", path: "/products/plant-available-silica" },
    ],
  },
  {
    label: "Our Services",
    tKey: "nav.services",
    children: [
      { label: "Our Services", path: "/services", tKey: "nav.services", description: "Manufacturing, leasing, and job-work solutions" },
      { label: "Portfolio", path: "/portfolio", tKey: "nav.portfolio", description: "Infrastructure, packaging, and plant views" },
    ],
  },
  { label: "Blog", path: "/blog", tKey: "nav.blog" },
  { label: "Contact Us", path: "/contact", tKey: "nav.contact" },
];

export const SiteNavbar = ({
  onMobileToggle,
  mobileOpen,
}: {
  onMobileToggle: () => void;
  mobileOpen: boolean;
}) => {
  const { t } = useTranslation();
  const [hoveredProductSlug, setHoveredProductSlug] = useState<string | null>(null);
  const [menuForceClosed, setMenuForceClosed] = useState(false);

  const handleLinkClick = () => {
    setMenuForceClosed(true);
    setTimeout(() => setMenuForceClosed(false), 300);
  };
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
            <div className="inline-flex items-center gap-2 text-white/75" data-testid="topbar-email-links">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/20 text-primary">
                <Mail className="h-3 w-3" />
              </span>
              <a href={`mailto:${company.emails[0]}`} className="transition-colors hover:text-white">{company.emails[0]}</a>
              <span className="text-white/20">|</span>
              <a href={`mailto:${company.emails[1]}`} className="transition-colors hover:text-white">{company.emails[1]}</a>
            </div>
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
            {t("navbar.tagline")}
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
              <img src="/logo.png" alt="J K Fertilizers" className="relative h-10 w-auto rounded-xl object-contain sm:h-11" />
            </div>
            <div>
              <p className="font-heading text-sm font-bold leading-tight text-foreground sm:text-base">{company.name}</p>
              {/* FIX 2.4: text-xs minimum (was text-[10px]) */}
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">{t("navbar.subTagline")}</p>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1.5 lg:flex" data-testid="desktop-navigation">
            {navMenu.map((item) => {
              if (item.children) {
                if (item.tKey === "nav.product") {
                  const catOrganicBio = [
                    { label: "Organic Manure", path: "/products/organic-manure", slug: "organic-manure", desc: "FCO approved soil vitalizer" },
                    { label: "PROM", path: "/products/prom", slug: "prom", desc: "Phosphate Rich Organic Manure" },
                    { label: "PDM", path: "/products/pdm", slug: "pdm", desc: "Potash Derived from Molasses" },
                    { label: "Mycorrhiza Biofertilizer", path: "/products/mycorrhiza-granules-biofertilizers", slug: "mycorrhiza-granules-biofertilizers", desc: "Root expansion stimulant" },
                  ];

                  const catCoated = [
                    { label: "Customized Coated Granules", path: "/products/customized-coated-granules", slug: "customized-coated-granules", desc: "High coating capacity bases" },
                    { label: "Coated Bio NPK", path: "/products/coated-base-granules-bio-npk", slug: "coated-base-granules-bio-npk", desc: "Triple action biological coating" },
                    { label: "Coated Mycorrhiza", path: "/products/coated-base-granules-mycorrhiza", slug: "coated-base-granules-mycorrhiza", desc: "Mineral-mycorrhiza blend" },
                    { label: "Plant Available Silica", path: "/products/plant-available-silica", slug: "plant-available-silica", desc: "Soil silicon replenishment" },
                  ];

                  const catBase = [
                    { label: "Customized Base Granules", path: "/products/customized-base-granules", slug: "customized-base-granules", desc: "Dolomite & compost recipes" },
                    { label: "Organic Carbon Base", path: "/products/organic-carbon-base-granules", slug: "organic-carbon-base-granules", desc: "Humus & carbon enrichment" },
                    { label: "Pancharatna Base", path: "/products/pancharatna-base-granules", slug: "pancharatna-base-granules", desc: "5-in-1 nutrient foundation" },
                    { label: "Humic Based Granules", path: "/products/humic-based-granules", slug: "humic-based-granules", desc: "Root growth enhancer" },
                    { label: "Enriched Base Granules", path: "/products/enriched-base-granules", slug: "enriched-base-granules", desc: "Fortified mineral carrier" },
                  ];

                  const activeSlug = hoveredProductSlug || "organic-manure";
                  const activeProduct = products.find((p) => p.slug === activeSlug) || products[0];

                  return (
                    <div key={item.label} className="group relative">
                      <NavLink
                        to="/products"
                        className={({ isActive }) =>
                          `relative inline-flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 active:scale-95 ${
                            isActive
                              ? "bg-primary/10 text-primary font-semibold"
                              : "text-foreground/75 hover:text-primary hover:bg-primary/5 group-hover:text-primary group-hover:bg-primary/5"
                          }`
                        }
                      >
                        {item.tKey ? t(item.tKey) : item.label}
                        <ChevronDown className="h-3.5 w-3.5 opacity-60 transition-transform duration-300 group-hover:rotate-180" />
                      </NavLink>

                      {/* Mega Dropdown Panel */}
                      <div 
                        className={`absolute left-1/2 top-full z-50 pt-2 w-[920px] -translate-x-[48%] scale-95 opacity-0 pointer-events-none transition-all duration-300 group-hover:scale-100 group-hover:opacity-100 group-hover:pointer-events-auto ${
                          menuForceClosed ? "hidden pointer-events-none opacity-0" : ""
                        }`}
                        onMouseLeave={() => setHoveredProductSlug(null)}
                        onClick={handleLinkClick}
                      >
                        <div className="overflow-hidden rounded-2xl border border-border bg-surface-card p-6 shadow-2xl ring-1 ring-black/5 grid grid-cols-[270px_1fr] gap-6 animate-in fade-in slide-in-from-top-2 duration-300">
                          {/* Left Panel: Featured Card */}
                          <div className="flex flex-col justify-between h-full rounded-xl bg-primary/5 border border-primary/10 p-5 min-h-[380px]">
                            <div>
                              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-muted shadow-sm">
                                <img
                                  src={activeProduct.imageUrl}
                                  alt={activeProduct.title}
                                  className="h-full w-full object-cover transition-all duration-300"
                                />
                              </div>
                              <span className="mt-3 inline-flex rounded-full bg-accent/25 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-secondary">
                                {activeProduct.category}
                              </span>
                              <h4 className="mt-2 text-sm font-bold text-foreground transition-colors duration-200">{activeProduct.title}</h4>
                              <p className="mt-1 text-[11px] text-muted-foreground leading-relaxed mb-3 transition-opacity duration-200 line-clamp-4">
                                {activeProduct.summary || activeProduct.tagline}
                              </p>
                            </div>
                            <NavLink
                              to={`/products/${activeProduct.slug}`}
                              className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:text-primary/80 transition-colors"
                            >
                              Learn More <ChevronRight className="h-3 w-3" />
                            </NavLink>
                          </div>

                          {/* Right Panel: Catalog flex layout */}
                          <div className="flex flex-col">
                            {/* Top Bar Header */}
                            <div className="flex items-center justify-between border-b border-border pb-3 mb-4">
                              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Product Catalog</span>
                              <NavLink
                                to="/products"
                                className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-1.5 text-xs font-bold text-white shadow-md shadow-primary/10 hover:bg-primary/90 transition-all duration-200"
                              >
                                View All Products <ArrowRight className="h-3.5 w-3.5" />
                              </NavLink>
                            </div>

                            {/* Columns Grid */}
                            <div className="grid grid-cols-3 gap-5">
                              <div>
                                <h5 className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground/80 mb-3 border-b border-border pb-1">Organic & Bio</h5>
                                <div className="flex flex-col gap-1">
                                  {catOrganicBio.map(p => (
                                    <NavLink 
                                      key={p.path} 
                                      to={p.path} 
                                      onMouseEnter={() => setHoveredProductSlug(p.slug)}
                                      className="group/item flex flex-col rounded-lg p-2 hover:bg-primary/5 transition-all duration-200"
                                    >
                                      <span className="text-xs font-semibold text-foreground group-hover/item:text-primary transition-colors">{p.label}</span>
                                      <span className="text-[10px] text-muted-foreground mt-0.5 leading-normal">{p.desc}</span>
                                    </NavLink>
                                  ))}
                                </div>
                              </div>
                              <div>
                                <h5 className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground/80 mb-3 border-b border-border pb-1">Coated & Specialty</h5>
                                <div className="flex flex-col gap-1">
                                  {catCoated.map(p => (
                                    <NavLink 
                                      key={p.path} 
                                      to={p.path} 
                                      onMouseEnter={() => setHoveredProductSlug(p.slug)}
                                      className="group/item flex flex-col rounded-lg p-2 hover:bg-primary/5 transition-all duration-200"
                                    >
                                      <span className="text-xs font-semibold text-foreground group-hover/item:text-primary transition-colors">{p.label}</span>
                                      <span className="text-[10px] text-muted-foreground mt-0.5 leading-normal">{p.desc}</span>
                                    </NavLink>
                                  ))}
                                </div>
                              </div>
                              <div>
                                <h5 className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground/80 mb-3 border-b border-border pb-1">Base Granules</h5>
                                <div className="flex flex-col gap-1">
                                  {catBase.map(p => (
                                    <NavLink 
                                      key={p.path} 
                                      to={p.path} 
                                      onMouseEnter={() => setHoveredProductSlug(p.slug)}
                                      className="group/item flex flex-col rounded-lg p-2 hover:bg-primary/5 transition-all duration-200"
                                    >
                                      <span className="text-xs font-semibold text-foreground group-hover/item:text-primary transition-colors">{p.label}</span>
                                      <span className="text-[10px] text-muted-foreground mt-0.5 leading-normal">{p.desc}</span>
                                    </NavLink>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }

                return (
                  <div key={item.label} className="group relative">
                    <NavLink
                      to={item.tKey === "nav.about" ? "/about" : "/services"}
                      className={({ isActive }) =>
                        `relative inline-flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 active:scale-95 ${
                          isActive
                            ? "bg-primary/10 text-primary font-semibold"
                            : "text-foreground/75 hover:text-primary hover:bg-primary/5 group-hover:text-primary group-hover:bg-primary/5"
                        }`
                      }
                    >
                      {item.tKey ? t(item.tKey) : item.label}
                      <ChevronDown className="h-3.5 w-3.5 opacity-60 transition-transform duration-300 group-hover:rotate-180" />
                    </NavLink>

                    {/* Dropdown Menu Panel */}
                    <div 
                      className={`absolute left-1/2 top-full z-50 pt-2 w-80 -translate-x-1/2 scale-95 opacity-0 pointer-events-none transition-all duration-300 group-hover:scale-100 group-hover:opacity-100 group-hover:pointer-events-auto ${
                        menuForceClosed ? "hidden pointer-events-none opacity-0" : ""
                      }`}
                      onClick={handleLinkClick}
                    >
                      <div className="overflow-hidden rounded-2xl border border-border bg-surface-card p-2 shadow-xl ring-1 ring-black/5">
                        {item.children.map((subItem) => (
                          <NavLink
                            key={subItem.path}
                            to={subItem.path}
                            className={({ isActive }) =>
                              `flex flex-col rounded-xl px-4 py-2.5 text-left transition-all duration-200 ${
                                isActive
                                  ? "bg-primary/10 text-primary"
                                  : "text-foreground/75 hover:bg-primary/5 hover:text-primary"
                              }`
                            }
                            data-testid={`nav-sublink-${subItem.label.toLowerCase()}`}
                          >
                            <span className="text-sm font-semibold">
                              {subItem.tKey ? t(subItem.tKey) : subItem.label}
                            </span>
                            {subItem.description && (
                              <span className="mt-0.5 text-xs text-muted-foreground leading-normal">
                                {subItem.description}
                              </span>
                            )}
                          </NavLink>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <NavLink
                  key={item.path}
                  to={item.path!}
                  className={desktopLinkClassName}
                  data-testid={`nav-link-${item.label.toLowerCase()}`}
                >
                  {item.tKey ? t(item.tKey) : item.label}
                </NavLink>
              );
            })}
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
                {t("navbar.callUs")}
              </a>
            </Button>
            <Button
              asChild
              className="h-10 rounded-full bg-primary px-5 text-sm font-semibold text-white shadow-[0_4px_20px_rgba(45,122,74,0.35)] hover:bg-primary/90 hover:shadow-[0_6px_28px_rgba(45,122,74,0.45)] transition-all duration-200"
              data-testid="header-contact-button"
            >
              <Link to="/contact">{t("navbar.getInTouch")}</Link>
            </Button>
          </div>

          {/* FIX 2.3: h-11 w-11 = 44px touch target, h-5 w-5 icon */}
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border/70 bg-surface-card text-foreground/70 hover:border-primary/40 hover:text-primary transition-all duration-200 lg:hidden"
            onClick={onMobileToggle}
            aria-label={mobileOpen ? t("navbar.closeMenu") : t("navbar.openMenu")}
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
              {navMenu.map((item) => {
                if (item.children) {
                  if (item.tKey === "nav.product") {
                    const mobileProductGroups = [
                      {
                        title: "Organic & Bio",
                        items: [
                          { label: "Organic Manure", path: "/products/organic-manure" },
                          { label: "PROM", path: "/products/prom" },
                          { label: "PDM", path: "/products/pdm" },
                          { label: "Mycorrhiza Biofertilizer", path: "/products/mycorrhiza-granules-biofertilizers" },
                        ]
                      },
                      {
                        title: "Coated & Specialty",
                        items: [
                          { label: "Customized Coated Granules", path: "/products/customized-coated-granules" },
                          { label: "Coated Bio NPK", path: "/products/coated-base-granules-bio-npk" },
                          { label: "Coated Mycorrhiza", path: "/products/coated-base-granules-mycorrhiza" },
                          { label: "Plant Available Silica", path: "/products/plant-available-silica" },
                        ]
                      },
                      {
                        title: "Base Granules",
                        items: [
                          { label: "Customized Base Granules", path: "/products/customized-base-granules" },
                          { label: "Organic Carbon Base", path: "/products/organic-carbon-base-granules" },
                          { label: "Pancharatna Base", path: "/products/pancharatna-base-granules" },
                          { label: "Humic Based Granules", path: "/products/humic-based-granules" },
                          { label: "Enriched Base Granules", path: "/products/enriched-base-granules" },
                        ]
                      }
                    ];

                    return (
                      <div key={item.label} className="flex flex-col gap-1 py-1">
                        <div className="px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground/80">
                          {item.tKey ? t(item.tKey) : item.label}
                        </div>
                        <div className="pl-3 flex flex-col gap-3 border-l border-primary/20 ml-5">
                          {mobileProductGroups.map((group) => (
                            <div key={group.title} className="flex flex-col gap-1">
                              <span className="px-4 py-0.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground/60">{group.title}</span>
                              <div className="pl-2 flex flex-col gap-0.5">
                                {group.items.map((subItem) => (
                                  <NavLink
                                    key={subItem.path}
                                    to={subItem.path}
                                    className={mobileLinkClassName}
                                    onClick={onMobileToggle}
                                    data-testid={`mobile-nav-sublink-${subItem.label.toLowerCase()}`}
                                  >
                                    {subItem.label}
                                  </NavLink>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  }

                  return (
                    <div key={item.label} className="flex flex-col gap-1 py-1">
                      <div className="px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground/80">
                        {item.tKey ? t(item.tKey) : item.label}
                      </div>
                      <div className="pl-3 flex flex-col gap-0.5 border-l border-primary/20 ml-5">
                        {item.children.map((subItem) => (
                          <NavLink
                            key={subItem.path}
                            to={subItem.path}
                            className={mobileLinkClassName}
                            onClick={onMobileToggle}
                            data-testid={`mobile-nav-sublink-${subItem.label.toLowerCase()}`}
                          >
                            {subItem.tKey ? t(subItem.tKey) : subItem.label}
                          </NavLink>
                        ))}
                      </div>
                    </div>
                  );
                }

                return (
                  <NavLink
                    key={item.path}
                    to={item.path!}
                    className={mobileLinkClassName}
                    onClick={onMobileToggle}
                    data-testid={`mobile-nav-link-${item.label.toLowerCase()}`}
                  >
                    {item.tKey ? t(item.tKey) : item.label}
                  </NavLink>
                );
              })}
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
                {t("navbar.call")} {company.phoneDisplay}
              </a>
              <Link
                to="/contact"
                onClick={onMobileToggle}
                className="flex items-center justify-center gap-2 rounded-full border border-primary/30 bg-primary/6 px-4 py-3 text-sm font-semibold text-primary"
              >
                {t("navbar.getInTouch")}
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
