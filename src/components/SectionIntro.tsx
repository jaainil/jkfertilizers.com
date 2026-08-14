export const SectionIntro = ({ eyebrow, title, description, action = null }) => (
  <div className="mb-10 flex flex-col gap-5 lg:mb-14 lg:flex-row lg:items-end lg:justify-between">
    <div className="max-w-3xl space-y-4">
      <span className="eyebrow">
        {eyebrow}
      </span>
      <h2 className="font-heading type-section-h2 font-bold tracking-tight text-foreground text-balance">
        {title}
      </h2>
      <p className="max-w-2xl type-body text-muted-foreground">
        {description}
      </p>
    </div>
    {action ? <div>{action}</div> : null}
  </div>
);
