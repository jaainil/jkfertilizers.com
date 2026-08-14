import { ImagePanel } from "@/components/ImagePanel";

const EMPTY_BADGES: string[] = [];

export const PageHero = ({
  eyebrow,
  title,
  description,
  imageSrc,
  imageAlt,
  badges = EMPTY_BADGES,
  primaryCta,
  secondaryCta,
  testId = "",
}) => (
  <section className="relative overflow-hidden border-b border-border bg-background">
    <div className="relative mx-auto grid grid-cols-1 max-w-7xl gap-6 px-4 py-10 sm:gap-8 sm:px-6 sm:py-14 lg:grid-cols-[1.02fr_0.98fr] lg:items-center lg:gap-12 lg:px-8 lg:py-24">
      <div className="space-y-5 sm:space-y-7" data-testid={testId}>
        <span className="eyebrow">
          {eyebrow}
        </span>
        <h1 className="max-w-3xl font-heading type-page-h1 font-bold tracking-tight text-foreground text-balance">
          {title}
        </h1>
        <p className="max-w-2xl type-body text-muted-foreground">
          {description}
        </p>
        {badges.length > 0 && (
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {badges.map((badge) => (
              <span key={badge} className="rounded-full border border-border bg-muted px-3 py-1.5 type-body-sm font-medium text-primary sm:px-4 sm:py-2">
                {badge}
              </span>
            ))}
          </div>
        )}
        <div className="flex flex-wrap gap-3 sm:gap-4">
          {primaryCta}
          {secondaryCta}
        </div>
      </div>

      <ImagePanel
        src={imageSrc}
        alt={imageAlt}
        eager
        testId={`${testId}-image-panel`}
        className="aspect-[4/3] min-h-[200px] sm:min-h-[280px] lg:min-h-[440px]"
        overlay={
          <div className="rounded-xl border border-border/60 bg-surface-overlay p-3 shadow-card sm:rounded-2xl sm:p-5">
            <p className="type-label font-bold uppercase tracking-[0.16em] text-primary">Built for serious B2B buyers</p>
            <p className="mt-2 type-body-sm text-foreground/80">Cleaner positioning, stronger credibility, and fast action paths for calls, inquiries, and distributor conversations.</p>
          </div>
        }
      />
    </div>
  </section>
);
