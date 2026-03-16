import { Link } from "react-router-dom";
import { ArrowRight, Sprout } from "lucide-react";

export const ProductCard = ({ product }) => (
  <Link
    to={`/products/${product.slug}`}
    className="group flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-surface-card shadow-[0_8px_32px_rgba(22,61,38,0.06)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_70px_rgba(22,61,38,0.12)] hover:border-primary/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:rounded-[28px]"
  >
    {/* Image */}
    <div className="relative h-44 w-full shrink-0 overflow-hidden sm:h-52">
      <img
        src={product.imageUrl}
        alt={product.title}
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
      />
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(to top, rgba(22,61,38,0.35), transparent 60%)" }}
      />
      <div className="absolute left-3 top-3 sm:left-4 sm:top-4">
        <span className="inline-flex rounded-full border border-white/25 bg-black/35 px-2.5 py-1 text-xs font-bold uppercase tracking-[0.16em] text-white backdrop-blur-sm">
          {product.category ?? "Product line"}
        </span>
      </div>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
    </div>

    {/* Body */}
    {/* FIX 6.1: p-4 on mobile, p-5 on sm, p-7 on lg */}
    <div className="flex flex-1 flex-col p-4 sm:p-5 lg:p-7">
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-heading type-card-title font-bold leading-snug text-foreground">
          {product.title}
        </h3>
        {/* FIX 6.3: relative + overflow-hidden wrapper so no absolute escape */}
        <div
          className="relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-xl text-white transition-all duration-300 group-hover:scale-110 sm:h-10 sm:w-10 sm:rounded-2xl"
          style={{ background: "linear-gradient(135deg, #2D7A4A, #163D26)" }}
        >
          <Sprout className="h-4 w-4 sm:h-5 sm:w-5" />
        </div>
      </div>

      <p className="mt-2 flex-1 type-body-sm text-muted-foreground sm:mt-3">
        {product.summary}
      </p>

      <div className="mt-3 flex flex-wrap gap-1.5 sm:mt-5 sm:gap-2">
        {product.fit.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-accent/25 bg-accent/8 px-2.5 py-0.5 text-xs font-semibold text-accent-foreground/70 transition-colors duration-200 group-hover:border-accent/35 group-hover:bg-accent/12 sm:px-3 sm:py-1"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-primary sm:mt-5">
        Read more
        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1.5" />
      </div>
    </div>
  </Link>
);
