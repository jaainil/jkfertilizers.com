export const ImagePanel = ({ src, alt, testId = "", className = "", overlay = null }) => (
  <div
    className={`relative overflow-hidden rounded-[32px] border border-border/50 bg-muted shadow-[0_24px_70px_rgba(22,61,38,0.10)] ${className}`}
    data-testid={testId}
  >
    {/* Subtle warm highlight at top-left */}
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(245,158,11,0.12),transparent_45%)] pointer-events-none z-10" />
    <img src={src} alt={alt} className="h-full w-full object-cover object-center" />
    {overlay ? <div className="absolute bottom-5 left-5 right-5 z-20">{overlay}</div> : null}
  </div>
);
