import { Link } from "react-router-dom";
import { ArrowRight, Sprout } from "lucide-react";
import { getProductCoverImage } from "@/data/products";

export const ProductCard = ({ product }) => (
  <Link
    to={`/products/${product.slug}`}
    aria-label={`View details and specifications for ${product.title}`}
    className="group flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-surface-card shadow-card transition-[box-shadow,border-color] duration-300 hover:shadow-card-hover hover:border-primary/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:rounded-3xl h-full"
  >
    {/* Image */}
    <div className="relative h-44 w-full shrink-0 overflow-hidden sm:h-52">
      <img
        src={getProductCoverImage(product.slug, product.imageUrl)}
        alt={product.title}
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
      />
      <div className="absolute left-3 top-3 sm:left-4 sm:top-4">
        <span className="inline-flex rounded-full bg-secondary/90 px-3 py-1 type-label font-bold uppercase tracking-[0.14em] text-white">
          {product.category ?? "Product line"}
        </span>
      </div>
    </div>

    {/* Body */}
    <div className="flex flex-1 flex-col p-5 sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-heading type-card-title font-bold leading-snug text-foreground">
          {product.title}
        </h3>
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary sm:h-10 sm:w-10">
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
            className="rounded-full border border-accent/30 bg-accent/10 px-2.5 py-0.5 type-label font-semibold text-accent-foreground/80 sm:px-3 sm:py-1"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-4 flex items-center gap-2 type-label font-bold uppercase tracking-[0.16em] text-primary sm:mt-5">
        Read more <span className="sr-only">about {product.title}</span>
        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
      </div>
    </div>
  </Link>
);
