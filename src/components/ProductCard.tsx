import { Link } from "react-router-dom";
import { ArrowRight, Sprout } from "lucide-react";

export const ProductCard = ({ product }) => (
  <Link
    to={`/products/${product.slug}`}
    className="group flex flex-col overflow-hidden rounded-[28px] border border-border/60 bg-surface-card shadow-[0_8px_32px_rgba(22,61,38,0.06)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_70px_rgba(22,61,38,0.12)] hover:border-primary/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
  >
    {/* Image */}
    <div className="relative h-52 w-full shrink-0 overflow-hidden">
      <img
        src={product.imageUrl}
        alt={product.title}
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(to top, rgba(22,61,38,0.35), transparent 60%)" }}
      />
      <div className="absolute left-4 top-4">
        <span className="inline-flex rounded-full border border-white/25 bg-black/35 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-white backdrop-blur-sm">
          {product.category ?? "Product line"}
        </span>
      </div>
      {/* Hover top shimmer */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
    </div>

    {/* Body */}
    <div className="flex flex-1 flex-col p-7">
      <div className="flex items-start justify-between gap-4">
        <h3 className="font-heading text-xl font-bold leading-snug text-foreground">
          {product.title}
        </h3>
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl text-white transition-all duration-300 group-hover:scale-110"
          style={{ background: "linear-gradient(135deg, #2D7A4A, #163D26)" }}
        >
          <Sprout className="h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ position: "absolute" }} />
          <Sprout className="h-5 w-5 group-hover:opacity-0 transition-opacity duration-300" />
        </div>
      </div>

      <p className="mt-3 flex-1 text-sm leading-7 text-muted-foreground">
        {product.summary}
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        {product.fit.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-accent/25 bg-accent/8 px-3 py-1 text-xs font-semibold text-accent-foreground/70 transition-colors duration-200 group-hover:border-accent/35 group-hover:bg-accent/12"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-5 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-primary">
        Read more
        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1.5" />
      </div>
    </div>
  </Link>
);
