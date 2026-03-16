export const ImagePanel = ({
  src,
  alt,
  testId = "",
  className = "",
  overlay = null,
  eager = false,
}: {
  src: string;
  alt: string;
  testId?: string;
  className?: string;
  overlay?: React.ReactNode;
  eager?: boolean;
}) => (
  <div
    className={`relative overflow-hidden rounded-2xl border border-border/50 bg-muted shadow-[0_24px_70px_rgba(22,61,38,0.10)] sm:rounded-[32px] ${className}`}
    data-testid={testId}
  >
    {/* FIX 8.1: rounded-2xl on mobile, rounded-[32px] on sm+ */}
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(245,158,11,0.12),transparent_45%)] pointer-events-none z-10" />
    {/* FIX 8.3: loading="lazy" by default, pass eager=true for LCP hero image */}
    <img
      src={src}
      alt={alt}
      loading={eager ? "eager" : "lazy"}
      className="h-full w-full object-cover object-center"
    />
    {/* FIX 8.2: tighter inset on mobile (bottom-3 left-3 right-3), normal on sm */}
    {overlay ? (
      <div className="absolute bottom-3 left-3 right-3 z-20 sm:bottom-5 sm:left-5 sm:right-5">
        {overlay}
      </div>
    ) : null}
  </div>
);
