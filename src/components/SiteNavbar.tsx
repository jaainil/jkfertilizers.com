import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { Mail, MapPin, Menu, Phone, X, Leaf, ChevronDown, ChevronRight, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { company, navigation } from "@/data/siteData";
import { products, getProductCoverImage } from "@/data/products";

// Desktop nav pill — NOT reused on mobile
const desktopLinkClassName = ({ isActive }: { isActive: boolean }) =>
  `relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 ${
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
      { label: "Diatomite Silicon", path: "/products/diatomite-silicon" },
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

// Categories to merge into a single "Organic & Bio" column.
const ORGANIC_BIO_CATS = ["Organic Fertilizers", "Biofertilizers"];

export interface MegaMenuGroup {
  title: string;
  items: { label: string; path: string; slug: string }[];
}

/** Derives megamenu columns dynamically from the products array.
 *  - "Organic Fertilizers" + "Biofertilizers" are merged into one "Organic & Bio" column.
 */
function buildMegaMenuGroups(): MegaMenuGroup[] {
  const byCategory: Record<string, { label: string; path: string; slug: string }[]> = {};
  for (const p of products) {
    const cat = ORGANIC_BIO_CATS.includes(p.category) ? "Organic & Bio" : (p.category || "Other");
    if (!byCategory[cat]) byCategory[cat] = [];
    byCategory[cat].push({ label: p.title, path: `/products/${p.slug}`, slug: p.slug });
  }
  const ORDER = ["Organic & Bio", "Coated Granules", "Base Granules"];
  const orderedKeys = [
    ...ORDER.filter((c) => byCategory[c]),
    ...Object.keys(byCategory).filter((c) => !ORDER.includes(c)).sort(),
  ];
  return orderedKeys.map((title) => ({ title, items: byCategory[title] }));
}

const TopUtilityBar = () => (
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
        className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-4 py-1 font-semibold uppercase tracking-[0.16em] text-accent/90"
        data-testid="topbar-tagline"
      >
        <Leaf className="h-3 w-3" />
        Manufacturers of Organic Fertilizers
      </div>
    </div>
  </div>
);

interface MegaProductDropdownProps {
  hoveredProductSlug: string | null;
  setHoveredProductSlug: (slug: string | null) => void;
  menuForceClosed: boolean;
  handleLinkClick: () => void;
}

const MegaProductDropdown = ({
  hoveredProductSlug,
  setHoveredProductSlug,
  menuForceClosed,
  handleLinkClick,
}: MegaProductDropdownProps) => {
  const activeSlug = hoveredProductSlug || "organic-manure";
  const activeProduct = products.find((p) => p.slug === activeSlug) || products[0];
  const megaGroups = buildMegaMenuGroups();

  return (
    <div className="group relative">
      <NavLink
        to="/products"
        className={({ isActive }) =>
          `relative inline-flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 ${
            isActive
              ? "bg-primary/10 text-primary font-semibold"
              : "text-foreground/75 hover:text-primary hover:bg-primary/5 group-hover:text-primary group-hover:bg-primary/5"
          }`
        }
      >
        Products
        <ChevronDown className="h-3.5 w-3.5 opacity-60 transition-transform duration-300 group-hover:rotate-180" />
      </NavLink>

      {/* Mega Dropdown Panel */}
      <div 
        className={`absolute left-1/2 top-full z-50 pt-2 w-[920px] -translate-x-[48%] scale-95 opacity-0 pointer-events-none transition-[transform,opacity] duration-300 group-hover:scale-100 group-hover:opacity-100 group-hover:pointer-events-auto ${
          menuForceClosed ? "hidden pointer-events-none opacity-0" : ""
        }`}
        onMouseLeave={() => setHoveredProductSlug(null)}
        onClick={handleLinkClick}
      >
        <div className="overflow-hidden rounded-2xl border border-border bg-surface-card p-6 shadow-2xl ring-1 ring-black/5 grid grid-cols-[270px_1fr] gap-6 animate-in fade-in slide-in-from-top-2">
          {/* Left Panel: Featured Card */}
          <div className="flex flex-col justify-between h-full rounded-xl bg-primary/5 border border-primary/10 p-5 min-h-[380px]">
            <div>
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-muted shadow-sm">
                <img
                  src={getProductCoverImage(activeProduct.slug, activeProduct.imageUrl)}
                  alt={activeProduct.title}
                  className="h-full w-full object-cover transition-transform duration-300"
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

          {/* Right Panel: Catalog — columns built dynamically from products data */}
          <div className="flex flex-col">
            {/* Top Bar Header */}
            <div className="flex items-center justify-between border-b border-border pb-3 mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Product Catalog</span>
              <NavLink
                to="/products"
                className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-1.5 text-xs font-bold text-white shadow-md shadow-primary/10 hover:bg-primary/90 transition-colors duration-200"
              >
                View All Products <ArrowRight className="h-3.5 w-3.5" />
              </NavLink>
            </div>
            {/* Product Columns */}
            <div className="grid grid-cols-3 gap-x-6">
              {megaGroups.map((group) => (
                <div key={group.title}>
                  <h5 className="mb-2 border-b border-border pb-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground/70">
                    {group.title}
                  </h5>
                  <div className="flex flex-col">
                    {group.items.map((p) => (
                      <NavLink
                        key={p.path}
                        to={p.path}
                        onMouseEnter={() => setHoveredProductSlug(p.slug)}
                        className={({ isActive }) =>
                          `rounded-md px-2.5 py-1.5 text-[12px] font-medium leading-snug transition-colors duration-150 ${
                            isActive
                              ? "bg-primary/10 text-primary"
                              : "text-foreground/70 hover:bg-primary/5 hover:text-primary"
                          }`
                        }
                      >
                        {p.label}
                      </NavLink>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface DropdownSubmenuProps {
  item: NavItem;
  menuForceClosed: boolean;
  handleLinkClick: () => void;
}

const DropdownSubmenu = ({ item, menuForceClosed, handleLinkClick }: DropdownSubmenuProps) => (
  <div key={item.label} className="group relative">
    <NavLink
      to={item.label === "About Us" ? "/about" : "/services"}
      className={({ isActive }) =>
        `relative inline-flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 ${
          isActive
            ? "bg-primary/10 text-primary font-semibold"
            : "text-foreground/75 hover:text-primary hover:bg-primary/5 group-hover:text-primary group-hover:bg-primary/5"
        }`
      }
    >
      {item.label}
      <ChevronDown className="h-3.5 w-3.5 opacity-60 transition-transform duration-300 group-hover:rotate-180" />
    </NavLink>

    {/* Dropdown Menu Panel */}
    <div 
      className={`absolute left-1/2 top-full z-50 pt-2 w-80 -translate-x-1/2 scale-95 opacity-0 pointer-events-none transition-[transform,opacity] duration-300 group-hover:scale-100 group-hover:opacity-100 group-hover:pointer-events-auto ${
        menuForceClosed ? "hidden pointer-events-none opacity-0" : ""
      }`}
      onClick={handleLinkClick}
    >
      <div className="overflow-hidden rounded-2xl border border-border bg-surface-card p-2 shadow-xl ring-1 ring-black/5">
        {item.children?.map((subItem) => (
          <NavLink
            key={subItem.path}
            to={subItem.path}
            className={({ isActive }) =>
              `flex flex-col rounded-xl px-4 py-2.5 text-left transition-colors duration-200 ${
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-foreground/75 hover:bg-primary/5 hover:text-primary"
              }`
            }
            data-testid={`nav-sublink-${subItem.label.toLowerCase()}`}
          >
            <span className="text-sm font-semibold">
              {subItem.label}
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

interface MobileNavDrawerProps {
  mobileOpen: boolean;
  onMobileToggle: () => void;
  openMobileSection: string | null;
  toggleMobileSection: (label: string) => void;
}

const MobileNavDrawer = ({
  mobileOpen,
  onMobileToggle,
  openMobileSection,
  toggleMobileSection,
}: MobileNavDrawerProps) => (
  <>
    {/* Backdrop */}
    <div
      className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
        mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
      onClick={onMobileToggle}
      aria-hidden="true"
    />

    {/* Drawer panel */}
    <div
      className={`fixed inset-y-0 right-0 z-50 flex w-[88vw] max-w-sm flex-col bg-background shadow-2xl transition-transform duration-300 ease-in-out lg:hidden ${
        mobileOpen ? "translate-x-0" : "translate-x-full"
      }`}
      data-testid="mobile-navigation-panel"
      aria-modal="true"
      role="dialog"
      aria-label="Navigation menu"
    >
      {/* Drawer header */}
      <div className="flex items-center justify-between border-b border-border/60 bg-surface-card px-5 py-4 shrink-0">
        <Link to="/" onClick={onMobileToggle} className="flex items-center gap-2.5">
          <img src="/logo.png" alt="J K Fertilizers" className="h-9 w-auto rounded-lg object-contain" />
          <div>
            <p className="font-heading text-sm font-bold text-foreground">{company.name}</p>
            <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">Organic · Naturally</p>
          </div>
        </Link>
        <button
          type="button"
          onClick={onMobileToggle}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-border/60 text-foreground/70 hover:border-primary/40 hover:text-primary transition-colors duration-200"
          aria-label="Close menu"
        >
          <X className="h-4.5 w-4.5" />
        </button>
      </div>

      {/* Drawer body — scrollable */}
      <div className="flex-1 overflow-y-auto overscroll-contain px-4 py-4">
        <nav className="flex flex-col gap-0.5">
          {navMenu.map((item) => {
            if (item.children) {
              const isOpen = openMobileSection === item.label;
              return (
                <div key={item.label} className="flex flex-col">
                  {/* Section header — tappable to expand */}
                  <button
                    type="button"
                    onClick={() => toggleMobileSection(item.label)}
                    className={`flex w-full items-center justify-between rounded-xl px-4 py-3.5 text-left text-sm font-semibold transition-colors duration-200 ${
                      isOpen
                        ? "bg-primary/8 text-primary"
                        : "text-foreground/80 hover:bg-primary/5 hover:text-primary"
                    }`}
                  >
                    <span>{item.label}</span>
                    <ChevronDown
                      className={`h-4 w-4 opacity-60 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* Accordion body */}
                  <div
                    className={`overflow-hidden transition-[max-height,opacity] duration-300 ${
                      isOpen ? "max-h-[1200px] opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    {item.tKey === "nav.product" ? (
                      // Products — grouped dynamically from MDX data
                      <div className="mt-1 mb-2 ml-3 border-l-2 border-primary/20 pl-3 flex flex-col gap-2.5">
                        {buildMegaMenuGroups().map((group) => (
                          <div key={group.title}>
                            <p className="px-1 pb-1 text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground/60">
                              {group.title}
                            </p>
                            <div className="flex flex-col gap-0.5">
                              {group.items.map((subItem) => (
                                <NavLink
                                  key={subItem.path}
                                  to={subItem.path}
                                  onClick={onMobileToggle}
                                  className={({ isActive }) =>
                                    `flex w-full items-center rounded-lg px-3 py-2 text-[13px] font-medium transition-colors duration-150 ${
                                      isActive
                                        ? "bg-primary/10 text-primary"
                                        : "text-foreground/70 hover:bg-primary/5 hover:text-primary"
                                    }`
                                  }
                                  data-testid={`mobile-nav-sublink-${subItem.label.toLowerCase()}`}
                                >
                                  {subItem.label}
                                </NavLink>
                              ))}
                            </div>
                          </div>
                        ))}
                        <NavLink
                          to="/products"
                          onClick={onMobileToggle}
                          className="mt-1 flex items-center gap-1.5 rounded-lg px-3 py-2.5 text-sm font-bold text-primary hover:bg-primary/5 transition-colors duration-200"
                        >
                          View All Products <ArrowRight className="h-3.5 w-3.5" />
                        </NavLink>
                      </div>
                    ) : (
                      // Other items with children
                      <div className="mt-1 mb-2 ml-3 border-l-2 border-primary/20 pl-3 flex flex-col gap-0.5">
                        {item.children?.map((subItem) => (
                          <NavLink
                            key={subItem.path}
                            to={subItem.path}
                            onClick={onMobileToggle}
                            className={({ isActive }) =>
                              `flex flex-col rounded-lg px-3 py-2.5 text-sm font-medium transition-colors duration-200 ${
                                isActive
                                  ? "bg-primary/10 text-primary"
                                  : "text-foreground/70 hover:bg-primary/5 hover:text-primary"
                              }`
                            }
                            data-testid={`mobile-nav-sublink-${subItem.label.toLowerCase()}`}
                          >
                            <span className="font-semibold">{subItem.label}</span>
                            {subItem.description && (
                              <span className="mt-0.5 text-xs text-muted-foreground">{subItem.description}</span>
                            )}
                          </NavLink>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            }

            return (
              <NavLink
                key={item.path}
                to={item.path!}
                onClick={onMobileToggle}
                className={({ isActive }) =>
                  `flex w-full items-center rounded-xl px-4 py-3.5 text-sm font-semibold transition-colors duration-200 ${
                    isActive
                      ? "bg-primary/8 text-primary"
                      : "text-foreground/80 hover:bg-primary/5 hover:text-primary"
                  }`
                }
                data-testid={`mobile-nav-link-${item.label.toLowerCase()}`}
              >
                {item.label}
              </NavLink>
            );
          })}
        </nav>

        {/* Divider */}
        <div className="my-5 h-px bg-border/60" />

        {/* Quick contact strip */}
        <div className="mb-3 rounded-xl bg-primary/5 border border-primary/10 px-4 py-3 flex flex-col gap-1.5">
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground">Quick Contact</p>
          <a href={`tel:${company.phoneRaw}`} className="flex items-center gap-2 text-sm font-semibold text-foreground/80 hover:text-primary transition-colors">
            <Phone className="h-3.5 w-3.5 text-primary" />{company.phoneDisplay}
          </a>
          <a href={`mailto:${company.emails[0]}`} className="flex items-center gap-2 text-sm text-foreground/70 hover:text-primary transition-colors truncate">
            <Mail className="h-3.5 w-3.5 text-primary shrink-0" />{company.emails[0]}
          </a>
        </div>
      </div>

      {/* Drawer footer CTAs — always pinned at bottom */}
      <div className="shrink-0 border-t border-border/60 bg-surface-card px-4 py-4 flex flex-col gap-2.5">
        <a
          href={`tel:${company.phoneRaw}`}
          className="flex items-center justify-center gap-2 rounded-full bg-primary px-4 py-3.5 text-sm font-semibold text-white shadow-[0_4px_16px_rgba(45,122,74,0.3)] hover:bg-primary/90 active:scale-[0.98] transition-[background-color,transform,box-shadow] duration-200"
          data-testid="mobile-call-link"
        >
          <Phone className="h-4 w-4" />
          Call {company.phoneDisplay}
        </a>
        <Link
          to="/contact"
          onClick={onMobileToggle}
          className="flex items-center justify-center gap-2 rounded-full border border-primary/30 bg-primary/6 px-4 py-3.5 text-sm font-semibold text-primary hover:bg-primary/10 active:scale-[0.98] transition-[background-color,transform] duration-200"
        >
          Get In Touch!
        </Link>
      </div>
    </div>
  </>
);

export const SiteNavbar = ({
  onMobileToggle,
  mobileOpen,
}: {
  onMobileToggle: () => void;
  mobileOpen: boolean;
}) => {
  const [hoveredProductSlug, setHoveredProductSlug] = useState<string | null>(null);
  const [menuForceClosed, setMenuForceClosed] = useState(false);
  const [openMobileSection, setOpenMobileSection] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  // Track scroll for enhanced sticky shadow
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setOpenMobileSection(null);
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const handleLinkClick = () => {
    setMenuForceClosed(true);
    setTimeout(() => setMenuForceClosed(false), 300);
  };

  const toggleMobileSection = (label: string) => {
    setOpenMobileSection((prev) => (prev === label ? null : label));
  };

  return (
    <>
      <TopUtilityBar />

      {/* ── Sticky header ── */}
      <header
        className={`sticky top-0 z-50 border-b border-border/60 bg-surface-overlay/95 backdrop-blur-2xl transition-shadow duration-300 ${
          isScrolled
            ? "shadow-[0_4px_32px_rgba(22,61,38,0.12)]"
            : "shadow-[0_1px_0_0_rgba(45,122,74,0.06),0_4px_24px_rgba(22,61,38,0.04)]"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:gap-4 sm:px-6 sm:py-3.5 lg:px-8">

          {/* Logo */}
          <Link to="/" className="group flex items-center gap-2.5 sm:gap-3 shrink-0" data-testid="site-logo-link">
            <img src="/logo.png" alt="J K Fertilizers" className="h-10 w-auto rounded-lg object-contain sm:h-11" />
            <div>
              <p className="font-heading text-sm font-bold leading-tight text-foreground sm:text-base">{company.name}</p>
              <p className="type-label font-medium uppercase tracking-[0.18em] text-muted-foreground">Organic · Naturally</p>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1.5 lg:flex" data-testid="desktop-navigation">
            {navMenu.map((item) => {
              if (item.children) {
                if (item.tKey === "nav.product") {
                  return (
                    <MegaProductDropdown
                      key={item.label}
                      hoveredProductSlug={hoveredProductSlug}
                      setHoveredProductSlug={setHoveredProductSlug}
                      menuForceClosed={menuForceClosed}
                      handleLinkClick={handleLinkClick}
                    />
                  );
                }

                return (
                  <DropdownSubmenu
                    key={item.label}
                    item={item}
                    menuForceClosed={menuForceClosed}
                    handleLinkClick={handleLinkClick}
                  />
                );
              }

              return (
                <NavLink
                  key={item.path}
                  to={item.path!}
                  className={desktopLinkClassName}
                  data-testid={`nav-link-${item.label.toLowerCase()}`}
                >
                  {item.label}
                </NavLink>
              );
            })}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden items-center gap-2.5 lg:flex">
            <Button
              asChild
              variant="outline"
              className="h-10 rounded-full border-border bg-transparent px-5 text-sm font-medium text-foreground/80 hover:border-primary hover:text-primary hover:bg-primary/5 transition-colors duration-200"
              data-testid="header-call-button"
            >
              <a href={`tel:${company.phoneRaw}`}>
                <Phone className="mr-1.5 h-3.5 w-3.5" />
                Call Us
              </a>
            </Button>
            <Button
              asChild
              className="h-10 rounded-full bg-primary px-5 text-sm font-semibold text-white hover:bg-primary/90 transition-colors duration-200"
              data-testid="header-contact-button"
            >
              <Link to="/contact">Get In Touch</Link>
            </Button>
          </div>

          {/* Mobile hamburger button — 44px touch target */}
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border/70 bg-surface-card text-foreground/70 hover:border-primary/40 hover:text-primary transition-colors duration-200 lg:hidden shrink-0"
            onClick={onMobileToggle}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            data-testid="mobile-menu-toggle-button"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </header>

      <MobileNavDrawer
        mobileOpen={mobileOpen}
        onMobileToggle={onMobileToggle}
        openMobileSection={openMobileSection}
        toggleMobileSection={toggleMobileSection}
      />
    </>
  );
};

