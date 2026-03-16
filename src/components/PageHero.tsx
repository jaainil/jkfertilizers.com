import { ImagePanel } from "@/components/ImagePanel";

const EMPTY_BADGES = [];

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
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(45,122,74,0.08),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(245,158,11,0.06),transparent_30%)]" />
    {/* FIX 10.2: gap-6 mobile, gap-8 sm, gap-12 lg | FIX 10.3: py-10 mobile, py-14 sm, py-24 lg */}
    <div className="relative mx-auto grid grid-cols-1 max-w-7xl gap-6 px-4 py-10 sm:gap-8 sm:px-6 sm:py-14 lg:grid-cols-[1.02fr_0.98fr] lg:items-center lg:gap-12 lg:px-8 lg:py-24">
      <div className="space-y-5 sm:space-y-7" data-testid={testId}>
        <div className="inline-flex rounded-full border border-border bg-surface-overlay/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-primary">
          {eyebrow}
        </div>
        {/* FIX 10.1: text-3xl base → text-4xl sm → text-5xl lg → text-6xl xl */}
        <h1 className="max-w-3xl font-heading type-page-h1 font-bold tracking-tight text-foreground text-balance">
          {title}
        </h1>
        <p className="max-w-2xl type-body text-muted-foreground">
          {description}
        </p>
        {badges.length > 0 && (
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {badges.map((badge) => (
              <span key={badge} className="rounded-full border border-border bg-muted px-3 py-1.5 text-xs font-medium text-primary sm:px-4 sm:py-2 sm:text-sm">
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

      {/* FIX 10.4: min-h scales from 200px mobile → 280px sm → 480px lg */}
      <ImagePanel
        src={imageSrc}
        alt={imageAlt}
        testId={`${testId}-image-panel`}
        className="aspect-[4/3] min-h-[200px] sm:min-h-[280px] lg:min-h-[480px]"
        overlay={
          <div className="rounded-xl border border-white/30 bg-surface-overlay/92 p-3 shadow-[0_16px_50px_rgba(22,61,38,0.12)] sm:rounded-[26px] sm:p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">Built for serious B2B buyers</p>
            <p className="mt-2 text-xs leading-6 text-secondary sm:text-sm sm:leading-7">Cleaner positioning, stronger credibility, and fast action paths for calls, inquiries, and distributor conversations.</p>
          </div>
        }
      />
    </div>
  </section>
);
