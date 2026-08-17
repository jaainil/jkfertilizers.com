import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

interface InsightPost {
  slug?: string;
  title?: string;
  excerpt?: string;
  topic?: string;
  date?: string;
  dateDisplay?: string;
  img?: string;
}

export const InsightCard = ({ post }: { post: InsightPost }) => (
  <Link
    to={post.slug ? `/blog/${post.slug}` : "/blog"}
    aria-label={`Read article: ${post.title || "Blog post"}`}
    className="group block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-2xl sm:rounded-3xl"
  >
    <Card className="h-full rounded-2xl border-border/60 bg-surface-card shadow-card transition-[box-shadow,border-color] duration-300 group-hover:shadow-card-hover group-hover:border-primary/20 overflow-hidden sm:rounded-3xl">
      {post.img && (
        <div className="relative h-44 w-full overflow-hidden sm:h-48">
          <img
            src={post.img}
            alt={post.title ?? "Blog post"}
            width={600}
            height={340}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      )}
      <CardContent className="flex h-full flex-col p-5 sm:p-6">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0 inline-flex w-fit max-w-[70%] rounded-full border border-accent/30 bg-accent/10 px-3 py-1 type-label font-bold uppercase tracking-[0.16em] text-accent-foreground/80 truncate">
            {post.topic}
          </div>
          <span className="shrink-0 type-label text-muted-foreground">{post.dateDisplay ?? post.date}</span>
        </div>
        <h3 className="mt-4 font-heading type-card-title font-bold text-foreground leading-snug">{post.title}</h3>
        <p className="mt-3 flex-1 type-body-sm text-muted-foreground">{post.excerpt}</p>
        <div className="mt-5 flex items-center gap-2 type-label font-bold uppercase tracking-[0.16em] text-primary">
          Read more <span className="sr-only">about {post.title}</span>
          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
        </div>
      </CardContent>
    </Card>
  </Link>
);
