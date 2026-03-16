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
    className="group block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-[28px]"
  >
    <Card className="h-full rounded-[28px] border-border/60 bg-surface-card shadow-[0_8px_32px_rgba(22,61,38,0.06)] transition-all duration-300 group-hover:-translate-y-1.5 group-hover:shadow-[0_24px_60px_rgba(22,61,38,0.11)] group-hover:border-primary/20 overflow-hidden">
      {post.img && (
        <div className="relative h-48 w-full overflow-hidden">
          <img
            src={post.img}
            alt={post.title ?? "Blog post"}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to top, rgba(22,61,38,0.25), transparent 70%)" }}
          />
          {/* Hover shimmer */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        </div>
      )}
      <CardContent className="flex h-full flex-col p-7">
        <div className="flex items-center justify-between gap-3">
          <div className="inline-flex w-fit rounded-full border border-accent/25 bg-accent/8 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-accent-foreground/70 transition-colors duration-200 group-hover:border-accent/35 group-hover:bg-accent/12">
            {post.topic}
          </div>
          <span className="text-xs text-muted-foreground">{post.dateDisplay ?? post.date}</span>
        </div>
        <h3 className="mt-5 font-heading text-xl font-bold text-foreground leading-snug">{post.title}</h3>
        <p className="mt-4 flex-1 text-sm leading-7 text-muted-foreground">{post.excerpt}</p>
        <div className="mt-6 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-primary">
          Read more
          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1.5" />
        </div>
      </CardContent>
    </Card>
  </Link>
);
