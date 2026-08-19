/**
 * Content helpers — MDX frontmatter is the single source of truth.
 *
 * How it works:
 *   Vite's import.meta.glob() eagerly imports every .mdx file and reads
 *   the `frontmatter` named export that remark-mdx-frontmatter generates.
 *   The slug is derived from the file name automatically.
 *
 * To add a new blog post:  create src/content/blog/<slug>/index.mdx  — done.
 * To add a new service:    create src/content/services/<slug>/index.mdx — done.
 * To add a new product:    create src/content/products/<slug>/index.mdx — done.
 * Images go in the same folder and are auto-discovered.
 * Then run `bun run sitemap` to regenerate sitemap.xml.
 */

import type { ComponentType } from "react";

// ─── Blog ────────────────────────────────────────────────────────────────────
//
// Each post lives in its own folder:
//   src/content/blog/<slug>/index.mdx   ← all details
//   src/content/blog/<slug>/*.{jpg,png} ← images for that post (img = cover filename)

const blogModules = import.meta.glob("../content/blog/*/index.mdx", { eager: true });

const blogImageModules = import.meta.glob(
  "../content/blog/*/*.{jpg,jpeg,png,webp,avif,gif,svg,JPG,JPEG,PNG,WEBP,AVIF,GIF,SVG}",
  { eager: true, query: "?url", import: "default" }
);

const blogUrlByFile: Record<string, Record<string, string>> = {};
for (const [path, url] of Object.entries(blogImageModules)) {
  const rel = path.replace("../content/blog/", "");
  const slug = rel.split("/")[0];
  (blogUrlByFile[slug] ??= {})[rel.split("/").pop()!] = url as string;
}

interface BlogModule {
  frontmatter: Record<string, unknown>;
  default: ComponentType;
}

interface BlogPost {
  slug: string;
  title?: string;
  date?: string;
  excerpt?: string;
  author?: string;
  image?: string;
  topic?: string;
  tags?: string[];
  Component?: ComponentType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

/**
 * Returns all blog posts sorted newest-first, with `slug` derived from filename.
 * @returns Array of blog posts with slug and frontmatter data
 */
export function getAllBlogs(): BlogPost[] {
  return Object.entries(blogModules)
    .map(([path, mod]: [string, BlogModule]) => {
      const slug = path.replace("../content/blog/", "").replace("/index.mdx", "");
      const fm = { ...mod.frontmatter } as Record<string, unknown>;
      // img may be a local filename inside the post folder — resolve it.
      if (typeof fm.img === "string" && !fm.img.startsWith("/")) {
        fm.img = blogUrlByFile[slug]?.[fm.img] ?? fm.img;
      }
      return { slug, ...fm, Component: mod.default };
    })
    .sort((a: BlogPost, b: BlogPost) => {
      const dateA = a.date ? new Date(a.date).getTime() : 0;
      const dateB = b.date ? new Date(b.date).getTime() : 0;
      return dateB - dateA;
    });
}

/**
 * Returns a single blog post by slug, or undefined if not found.
 * @param slug - The blog post slug
 */
export function getBlogBySlug(slug: string): BlogPost | undefined {
  return getAllBlogs().find((b) => b.slug === slug);
}

/**
 * Resolves a local blog image filename to its Vite asset URL.
 * @param slug - Blog post slug
 * @param filename - Image filename or relative path (e.g. "./inline-1.jpg" or "cover.jpg")
 */
export function getBlogImage(slug: string, filename: string): string | undefined {
  const cleanName = filename.replace(/^(\.\/|\/)/, "").split("/").pop() || filename;
  return blogUrlByFile[slug]?.[cleanName];
}

// ─── Services ────────────────────────────────────────────────────────────────
//
// Each service lives in its own folder:
//   src/content/services/<slug>/index.mdx   ← all details
//   src/content/services/<slug>/*.{jpg,png} ← all images for that service

const serviceModules = import.meta.glob("../content/services/*/index.mdx", { eager: true });

const serviceImageModules = import.meta.glob(
  "../content/services/*/*.{jpg,jpeg,png,webp,avif,gif,svg,JPG,JPEG,PNG,WEBP,AVIF,GIF,SVG}",
  { eager: true, query: "?url", import: "default" }
);

const serviceGalleryBySlug: Record<string, string[]> = {};
const serviceUrlByFile: Record<string, Record<string, string>> = {};
for (const [path, url] of Object.entries(serviceImageModules)) {
  const rel = path.replace("../content/services/", "");
  const slug = rel.split("/")[0];
  (serviceGalleryBySlug[slug] ??= []).push(url as string);
  (serviceUrlByFile[slug] ??= {})[rel.split("/").pop()!] = url as string;
}
for (const imgs of Object.values(serviceGalleryBySlug)) imgs.sort();

interface ServiceModule {
  frontmatter: Record<string, unknown>;
  default: ComponentType;
}

interface Service {
  slug: string;
  title?: string;
  description?: string;
  image?: string;
  concept?: string;
  Component?: ComponentType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

/**
 * Returns all services in file order (alphabetical by folder name).
 * @returns Array of services with slug and frontmatter data
 */
export function getAllServices(): Service[] {
  return Object.entries(serviceModules).map(([path, mod]: [string, ServiceModule]) => {
    const slug = path.replace("../content/services/", "").replace("/index.mdx", "");
    const fm = { ...mod.frontmatter } as Record<string, unknown>;
    // image may be a local filename inside the service folder — resolve it.
    if (typeof fm.image === "string" && !fm.image.startsWith("/")) {
      fm.image = serviceUrlByFile[slug]?.[fm.image] ?? fm.image;
    }
    return { slug, ...fm, Component: mod.default };
  });
}

/**
 * Returns a single service by slug, or undefined if not found.
 * @param slug - The service slug
 */
export function getServiceBySlug(slug: string): Service | undefined {
  return getAllServices().find((s) => s.slug === slug);
}

/**
 * Returns all gallery images for a service slug, auto-discovered from its folder.
 * @param slug - The service slug
 */
export function getServiceGallery(slug: string): string[] {
  return serviceGalleryBySlug[slug] ?? [];
}