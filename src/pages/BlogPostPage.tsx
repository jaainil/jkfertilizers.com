import { useParams, Link, Navigate } from "react-router-dom";
import { MDXProvider } from "@mdx-js/react";
import { ArrowLeft, Calendar, Tag, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SEOHead } from "@/components/SEOHead";
import { getBlogBySlug, getAllBlogs } from "@/lib/content";
import { organizationSchema, buildBlogPostingSchema } from "@/data/seoSchemas";

/** Prose component map — styles raw MDX output to match site design */
const mdxComponents = {
  h2: (props) => {
    const { children, ...rest } = props;
    return (
      <h2
        className="font-heading mt-10 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl first:mt-0"
        {...rest}
      >{children}</h2>
    );
  },
  h3: (props) => {
    const { children, ...rest } = props;
    return (
      <h3
        className="font-heading mt-8 text-xl font-semibold text-foreground"
        {...rest}
      >{children}</h3>
    );
  },
  p: (props) => (
    <p className="mt-5 text-base leading-8 text-muted-foreground" {...props} />
  ),
  ul: (props) => (
    <ul
      className="mt-5 space-y-2 pl-6 text-base leading-8 text-muted-foreground list-disc"
      {...props}
    />
  ),
  ol: (props) => (
    <ol
      className="mt-5 space-y-2 pl-6 text-base leading-8 text-muted-foreground list-decimal"
      {...props}
    />
  ),
  li: (props) => <li className="leading-7" {...props} />,
  strong: (props) => (
    <strong className="font-semibold text-foreground" {...props} />
  ),
  em: (props) => <em className="italic text-muted-foreground" {...props} />,
  blockquote: (props) => (
    <blockquote
      className="mt-6 border-l-4 border-primary pl-5 italic text-muted-foreground"
      {...props}
    />
  ),
  hr: () => <hr className="my-10 border-border" />,
  a: (props) => (
    <a
      className="font-medium text-primary underline underline-offset-4 hover:text-primary/80"
      {...props}
    />
  ),
  code: (props) => (
    <code
      className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm text-foreground"
      {...props}
    />
  ),
};

export const BlogPostPage = () => {
  const { slug } = useParams();
  const post = getBlogBySlug(slug);

  if (!post) return <Navigate to="/blog" replace />;

  const { Component, title, excerpt, topic, dateDisplay, author, img, date, tags } = post;

  // Related posts — exclude current
  const related = getAllBlogs()
    .filter((b) => b.slug !== slug)
    .slice(0, 3);

  const blogPostingSchema = buildBlogPostingSchema({
    slug,
    title,
    excerpt,
    date: date || dateDisplay,
    author: author || "Akash Dadhania",
    image: img,
    tags: tags || [topic, "organic fertilizer", "agriculture India", "Gujarat farming"],
  });

  return (
    <>
      <SEOHead
        title={`${title} | J K Fertilizers Blog`}
        description={excerpt}
        canonical={`/blog/${slug}`}
        ogImage={img}
        ogType="article"
        keywords={`${topic}, organic fertilizer blog, agriculture India, fertilizer manufacturing insights`}
        article={{
          publishedTime: date || dateDisplay,
          modifiedTime: date || dateDisplay,
          author: author || "Akash Dadhania",
          section: topic || "Agriculture",
          tags: tags || [topic, "organic fertilizer", "agriculture"],
        }}
        schema={[organizationSchema, blogPostingSchema]}
      />

      {/* ── Hero ── */}
      <section className="relative overflow-hidden border-b border-border bg-background">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(27,77,62,0.08),transparent_35%)]" />
        <div className="relative mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          {/* Back link */}
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>

          {/* Meta row */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-semibold text-primary">
              <Tag className="h-3 w-3" />
              {topic}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Calendar className="h-3.5 w-3.5" />
              {dateDisplay}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <User className="h-3.5 w-3.5" />
              {author}
            </span>
          </div>

          <h1 className="mt-5 font-heading text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="mt-5 text-lg leading-8 text-muted-foreground">{excerpt}</p>
        </div>
      </section>

      {/* ── Cover image ── */}
      {img && (
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="relative mt-0 overflow-hidden rounded-b-[32px] shadow-[0_24px_70px_rgba(15,23,42,0.12)]">
            <img
              src={img}
              alt={title}
              className="h-72 w-full object-cover sm:h-96"
            />
          </div>
        </div>
      )}

      {/* ── MDX body ── */}
      <article className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <MDXProvider components={mdxComponents}>
          <Component />
        </MDXProvider>
      </article>

      {/* ── CTA band ── */}
      <section className="bg-secondary py-14 lg:py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-heading text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Ready to discuss a manufacturing requirement?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-8 text-white/75">
            Our team responds within 24 hours. Share your brief and we'll follow up with the right technical or commercial conversation.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button asChild className="h-12 rounded-full bg-accent px-8 font-semibold text-secondary hover:bg-accent/80">
              <Link to="/contact">Contact Us</Link>
            </Button>
            <Button asChild variant="outline" className="h-12 rounded-full border-white/30 bg-transparent px-8 text-white hover:bg-white hover:text-secondary">
              <Link to="/products">View Products</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ── Related posts ── */}
      {related.length > 0 && (
        <section className="bg-muted py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-heading text-2xl font-semibold text-foreground">
              More Articles
            </h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <Link
                  key={p.slug}
                  to={`/blog/${p.slug}`}
                  className="group flex flex-col overflow-hidden rounded-[24px] border border-border bg-surface-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={p.img}
                      alt={p.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <span className="text-xs font-semibold text-primary">{p.topic}</span>
                    <h3 className="mt-2 font-heading text-base font-semibold leading-6 text-foreground">
                      {p.title}
                    </h3>
                    <p className="mt-1 flex-1 text-xs leading-5 text-muted-foreground line-clamp-2">
                      {p.excerpt}
                    </p>
                    <p className="mt-3 text-xs text-muted-foreground">{p.dateDisplay}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
};
