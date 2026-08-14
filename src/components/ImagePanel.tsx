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
    className={`relative overflow-hidden rounded-2xl border border-border/50 bg-muted shadow-card sm:rounded-3xl ${className}`}
    data-testid={testId}
  >
    <img
      src={src}
      alt={alt}
      loading={eager ? "eager" : "lazy"}
      className="h-full w-full object-cover object-center"
    />
    {overlay ? (
      <div className="absolute bottom-3 left-3 right-3 z-20 sm:bottom-5 sm:left-5 sm:right-5">
        {overlay}
      </div>
    ) : null}
  </div>
);
