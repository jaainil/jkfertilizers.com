/**
 * Products — MDX frontmatter is the single source of truth.
 *
 * Each product lives in its own folder:
 *   src/content/products/<slug>/index.mdx   ← all details (title, tags, specs, etc.)
 *   src/content/products/<slug>/*.{jpg,png} ← all images for that product
 *
 * To add a new product: create the folder with an index.mdx, drop images in — done.
 * Then run `bun run sitemap` to regenerate sitemap.xml.
 */

import type { ComponentType } from "react";

export interface HowToApplyStep {
  step: string;
  title: string;
  detail: string;
}

export interface ProductBenefit {
  title: string;
  detail: string;
}

export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  slug: string;
  title: string;
  imageUrl: string;
  summary: string;
  fit: string[];
  category: string;
  tagline: string;
  description: string;
  howToApply: HowToApplyStep[];
  benefits: ProductBenefit[];
  specs: ProductSpec[];
  gallery?: string[];
  Component?: ComponentType;
}

interface ProductModule {
  frontmatter: Record<string, unknown>;
  default: ComponentType;
}

const productModules = import.meta.glob("../content/products/*/index.mdx", { eager: true });

// Auto-discover images from each product folder — adding a file to the folder
// automatically includes it in the gallery.
const imageModules = import.meta.glob(
  "../content/products/*/*.{jpg,jpeg,png,webp,avif,gif,svg,JPG,JPEG,PNG,WEBP,AVIF,GIF,SVG}",
  { eager: true, query: "?url", import: "default" }
);

const galleryBySlug: Record<string, string[]> = {};
const urlByFile: Record<string, Record<string, string>> = {};
for (const [path, url] of Object.entries(imageModules)) {
  const rel = path.replace("../content/products/", "");
  const slug = rel.split("/")[0];
  (galleryBySlug[slug] ??= []).push(url as string);
  (urlByFile[slug] ??= {})[rel.split("/").pop()!] = url as string;
}
for (const imgs of Object.values(galleryBySlug)) imgs.sort();

export const products: Product[] = Object.entries(productModules).map(
  ([path, mod]: [string, ProductModule]) => {
    const slug = path.replace("../content/products/", "").replace("/index.mdx", "");
    const fm = { ...mod.frontmatter } as Record<string, unknown>;
    // imageUrl may be a local filename inside the product folder — resolve it.
    if (typeof fm.imageUrl === "string" && !fm.imageUrl.startsWith("/")) {
      fm.imageUrl = urlByFile[slug]?.[fm.imageUrl] ?? fm.imageUrl;
    }
    return { slug, ...fm, Component: mod.default } as Product;
  }
);

export const getProductBySlug = (slug: string): Product | undefined =>
  products.find((p) => p.slug === slug);

export const getRelatedProducts = (slug: string): Product[] =>
  products.filter((p) => p.slug !== slug);

// Returns all gallery images for a product slug, auto-discovered from its folder.
export const getProductGallery = (slug: string): string[] => galleryBySlug[slug] ?? [];

// Returns the best single cover image for cards and previews.
// Prefers the product's declared `imageUrl` (its cover file); falls back to
// the first gallery photo auto-discovered from the folder.
export const getProductCoverImage = (slug: string, imageUrl: string): string =>
  imageUrl || getProductGallery(slug)[0] || "";
