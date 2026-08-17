import { useState, useEffect } from "react";
import { company } from "@/data/siteData";

export const SiteLoader = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    // Elegant brief brand presentation on initial load
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 550);

    const removeTimer = setTimeout(() => {
      setShouldRender(false);
    }, 900);

    return () => {
      clearTimeout(timer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!shouldRender) return null;

  return (
    <div
      aria-hidden={!isLoading}
      className={`fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-background text-foreground transition-opacity duration-400 ease-out ${
        isLoading
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="flex flex-col items-center max-w-sm px-6 text-center">
        {/* Real Brand Logo */}
        <div className="mb-4">
          <img
            src="/logo.webp"
            alt={company.name}
            className="h-16 w-auto object-contain sm:h-20"
          />
        </div>

        {/* Brand Text */}
        <div className="space-y-1">
          <h2 className="font-heading text-lg font-bold tracking-tight text-foreground sm:text-xl">
            {company.name}
          </h2>
          <p className="type-label font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            {company.tagline}
          </p>
        </div>

        {/* Minimal Brand Progress Line */}
        <div className="mt-6 h-[2px] w-36 overflow-hidden rounded-full bg-border">
          <div className="site-loader-bar h-full rounded-full bg-primary" />
        </div>
      </div>
    </div>
  );
};
