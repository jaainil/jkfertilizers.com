import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Tag } from "lucide-react";
import { SEOHead } from "@/components/SEOHead";
import { organizationSchema, blogPageSchema } from "@/data/seoSchemas";
import { getAllBlogs } from "@/lib/content";

const allPosts = getAllBlogs();

const categories = ["All", ...Array.from(new Set(allPosts.map((p) => p.topic).filter(Boolean)))];

const audienceCards = [
  {
    title: "For Distributors",
    description:
      "Show buyers that your manufacturing partner can protect consistency, scale, and response speed across market demand cycles.",
    img: "/images/partnership.jpg",
  },
  {
    title: "For Fertilizer Brands",
    description:
      "Position custom recipe granules as a strategic manufacturing advantage, not just an operational detail.",
    img: "/images/granules.jpg",
  },
  {
    title: "For Procurement Teams",
    description:
      "Highlight quality checks, process clarity, and dispatch discipline to reduce vendor uncertainty during evaluation.",
    img: "/images/lab.jpg",
  },
];

export const BlogPage = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const posts = activeCategory === "All"
    ? allPosts
    : allPosts.filter((p) => p.topic === activeCategory);

  return (
  <>
    <SEOHead
      title="Agriculture & Fertilizer Industry Blog — Insights for B2B Brands | J K Fertilizers"
      description="Expert insights on organic fertilizer manufacturing, custom granule formulation, B2B procurement tips, sustainable agriculture, and quality assurance. From J K Fertilizers — FCO approved manufacturer, Anand, Gujarat."
      canonical="/blog"
      ogImage="/images/granules.jpg"
      keywords="fertilizer industry blog, organic agriculture insights, b2b fertilizer procurement, granule fertilizer trends, sustainable agriculture india, fertilizer manufacturing blog gujarat, custom formulation insights"
      schema={[organizationSchema, blogPageSchema]}
    />
    {/* ── Hero ── */}
    <section className="relative overflow-hidden border-b border-border bg-background">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(27,77,62,0.08),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(217,119,6,0.07),transparent_30%)]" />
      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-7">
            <div className="inline-flex rounded-full border border-border bg-surface-overlay px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-primary">
              From the Blog
            </div>
            <h1 className="font-heading text-5xl font-semibold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
              Latest News &amp; Articles
            </h1>
            <p className="max-w-xl text-base leading-8 text-muted-foreground sm:text-lg">
              Explore our latest insights on sustainable agriculture, organic fertilizer technology, and manufacturing innovations for our B2B partners.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild className="h-12 rounded-full bg-primary px-6 text-white hover:bg-primary/90">
                <Link to="/contact">Request a conversation</Link>
              </Button>
              <Button asChild variant="outline" className="h-12 rounded-full border-primary px-6 text-primary hover:bg-primary hover:text-white">
                <Link to="/services">Explore services</Link>
              </Button>
            </div>
          </div>
          {/* Featured post preview */}
          <Link
            to={`/blog/${allPosts[0].slug}`}
            className="group relative overflow-hidden rounded-4xl border border-border shadow-[0_24px_70px_rgba(15,23,42,0.08)]"
            style={{ minHeight: "360px" }}
          >
            <img
              src={allPosts[0].img}
              alt={allPosts[0].title}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-linear-to-t from-secondary/90 via-secondary/40 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <span className="inline-flex rounded-full bg-accent/90 px-3 py-1 text-xs font-semibold text-secondary">
                {allPosts[0].topic}
              </span>
              <h3 className="mt-3 font-heading text-2xl font-semibold text-white">{allPosts[0].title}</h3>
              <p className="mt-2 text-sm text-white/70">{allPosts[0].dateDisplay} · {allPosts[0].author}</p>
            </div>
          </Link>
        </div>
      </div>
    </section>

    {/* ── Category filter tabs ── */}
    <section className="border-b border-border bg-surface-card">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex gap-2 overflow-x-auto py-4 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`shrink-0 cursor-pointer rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                activeCategory === cat
                  ? "bg-primary text-white"
                  : "border border-border text-muted-foreground hover:border-primary/40 hover:text-primary"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
    </section>

    {/* ── All Posts Grid ── */}
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="mb-10 flex items-center justify-between">
        <h2 className="font-heading text-2xl font-semibold text-foreground">
          {activeCategory === "All" ? "All Articles" : activeCategory}
        </h2>
        <p className="text-sm text-muted-foreground">{posts.length} articles</p>
      </div>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Link
            key={post.slug}
            to={`/blog/${post.slug}`}
            className="group flex flex-col overflow-hidden rounded-[28px] border border-border bg-surface-card shadow-[0_16px_50px_rgba(16,24,40,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(16,24,40,0.1)]"
          >
            {/* Image */}
            <div className="relative h-48 overflow-hidden">
              <img
                src={post.img}
                alt={post.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-linear-to-t from-foreground/20 to-transparent" />
              {/* Date badge */}
              <div className="absolute left-4 top-4 rounded-[14px] bg-secondary/90 px-3 py-2 text-center backdrop-blur-sm">
                <p className="font-heading text-xl font-bold leading-none text-white">
                  {post.dateDisplay.split(" ")[0]}
                </p>
                <p className="mt-0.5 text-xs font-semibold uppercase text-white/70">
                  {post.dateDisplay.split(" ")[1]} {post.dateDisplay.split(" ")[2]}
                </p>
              </div>
            </div>
            {/* Content */}
            <div className="flex flex-1 flex-col p-6">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-semibold text-primary">
                  <Tag className="h-3 w-3" />
                  {post.topic}
                </span>
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  {post.dateDisplay}
                </span>
              </div>
              <h3 className="mt-4 font-heading text-lg font-semibold leading-7 text-foreground">
                {post.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-6 text-muted-foreground">{post.excerpt}</p>
              <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
                <p className="text-xs text-muted-foreground">By {post.author}</p>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-primary transition-all duration-200 group-hover:gap-2">
                  Continue Reading
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>

    {/* ── Audience cards ── */}
    <section className="bg-muted py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <div className="inline-flex rounded-full border border-border bg-surface-overlay px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-primary">
            Who We Write For
          </div>
          <h2 className="mt-5 font-heading text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Insights for Every B2B Stakeholder
          </h2>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {audienceCards.map((card) => (
            <div
              key={card.title}
              className="group overflow-hidden rounded-[28px] border border-border bg-surface-card shadow-[0_16px_50px_rgba(16,24,40,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(16,24,40,0.1)]"
            >
              <div className="relative h-44 overflow-hidden">
                <img
                  src={card.img}
                  alt={card.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-linear-to-t from-foreground/50 to-transparent" />
                <h3 className="absolute bottom-4 left-5 font-heading text-xl font-semibold text-white">{card.title}</h3>
              </div>
              <div className="p-6">
                <p className="text-sm leading-7 text-muted-foreground">{card.description}</p>
                <Link to="/contact" className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-all duration-200 hover:gap-2.5">
                  Get in touch <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* ── Newsletter / CTA band ── */}
    <section className="bg-secondary py-16 lg:py-20">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <div className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-white/80">
          Stay Updated
        </div>
        <h2 className="mt-5 font-heading text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Want the latest agricultural insights?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base leading-8 text-white/75">
          Contact us directly and our team will keep you updated on our latest product innovations and manufacturing capabilities.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button asChild className="h-12 rounded-full bg-accent px-8 text-secondary font-semibold hover:bg-accent/80">
            <Link to="/contact">Contact Us Today</Link>
          </Button>
          <Button asChild variant="outline" className="h-12 rounded-full border-white/30 bg-transparent px-8 text-white hover:bg-white hover:text-secondary">
            <Link to="/products">View Our Products</Link>
          </Button>
        </div>
      </div>
    </section>
  </>
  );
};
