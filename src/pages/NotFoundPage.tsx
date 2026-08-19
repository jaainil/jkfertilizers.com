import { Link } from "react-router-dom";
import { Home, Package, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SEOHead } from "@/components/SEOHead";

export const NotFoundPage = () => {
  return (
    <>
      <SEOHead
        title="404 - Page Not Found | J K Fertilizers"
        description="The page you are looking for does not exist or has been moved. Explore J K Fertilizers organic fertilizers, base granules, and services."
        canonical="/404"
        noindex={true}
      />
      <div className="relative min-h-[70vh] flex items-center justify-center bg-background px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
            Error 404
          </span>
          <h1 className="mt-6 font-heading text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Page Not Found
          </h1>
          <p className="mt-4 text-base text-muted-foreground sm:text-lg">
            Sorry, we couldn't find the page you're looking for. The link may be broken or the page may have been moved to another location.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button asChild className="h-12 rounded-full bg-primary px-6 text-white hover:bg-primary/90">
              <Link to="/" className="inline-flex items-center gap-2">
                <Home className="h-4 w-4" />
                Back to Home
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-12 rounded-full border-border px-6 hover:bg-muted">
              <Link to="/products" className="inline-flex items-center gap-2">
                <Package className="h-4 w-4" />
                Browse Products
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-12 rounded-full border-border px-6 hover:bg-muted">
              <Link to="/contact" className="inline-flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Contact Us
              </Link>
            </Button>
          </div>

          <div className="mt-12 rounded-2xl border border-border bg-card p-6 text-left">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Popular Pages
            </h2>
            <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
              <Link to="/products/organic-manure" className="rounded-lg p-2 text-sm text-muted-foreground hover:bg-muted hover:text-primary transition-colors">
                → Organic Manure
              </Link>
              <Link to="/products/prom" className="rounded-lg p-2 text-sm text-muted-foreground hover:bg-muted hover:text-primary transition-colors">
                → PROM (Phosphate Rich)
              </Link>
              <Link to="/products/pdm" className="rounded-lg p-2 text-sm text-muted-foreground hover:bg-muted hover:text-primary transition-colors">
                → PDM (Potash Derived)
              </Link>
              <Link to="/products/mycorrhiza-granules-biofertilizers" className="rounded-lg p-2 text-sm text-muted-foreground hover:bg-muted hover:text-primary transition-colors">
                → Mycorrhiza Granules
              </Link>
              <Link to="/services" className="rounded-lg p-2 text-sm text-muted-foreground hover:bg-muted hover:text-primary transition-colors">
                → Manufacturing Services
              </Link>
              <Link to="/about" className="rounded-lg p-2 text-sm text-muted-foreground hover:bg-muted hover:text-primary transition-colors">
                → About J K Fertilizers
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
