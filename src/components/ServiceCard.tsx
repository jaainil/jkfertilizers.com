import { Link } from "react-router-dom";
import { ArrowRight, FileText, Leaf, ShieldCheck, Factory, FlaskConical, PackageCheck, Warehouse, Truck } from "lucide-react";

const iconMap = {
  leaf: Leaf,
  shield: ShieldCheck,
  factory: Factory,
  flask: FlaskConical,
  package: PackageCheck,
  warehouse: Warehouse,
  truck: Truck,
};

export const ServiceCard = ({ service }) => {
  const Icon = iconMap[service.icon] || FileText;
  const href = service.slug ? `/services/${service.slug}` : "/services";

  const cardImage = service.imageSrc || service.image;

  // Image-backed card
  if (cardImage) {
    return (
      <Link
        to={href}
        aria-label={`Learn more about ${service.title}`}
        className="group block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-2xl sm:rounded-3xl"
      >
        <article className="relative flex h-full min-h-[300px] flex-col overflow-hidden rounded-2xl border border-border/50 shadow-card transition-[box-shadow,border-color] duration-300 group-hover:shadow-card-hover group-hover:border-primary/25 sm:min-h-[340px] sm:rounded-3xl">
          <img
            src={cardImage}
            alt={service.title}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to top, rgba(22,61,38,0.94) 0%, rgba(22,61,38,0.55) 55%, rgba(22,61,38,0.1) 100%)" }}
          />

          <div className="relative flex h-full flex-col justify-end p-5 sm:p-7">
            <div className="flex items-start justify-between gap-3 sm:gap-4">
              <div className="space-y-1.5 sm:space-y-2">
                <div className="inline-flex rounded-full border border-white/20 bg-white/10 px-2.5 py-1 type-label font-bold uppercase tracking-[0.16em] text-white/85 sm:px-3">
                  {service.concept}
                </div>
                <h3 className="font-heading type-card-title font-bold text-white">{service.title}</h3>
              </div>
              <div
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent text-secondary sm:h-12 sm:w-12 sm:rounded-2xl"
              >
                <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
              </div>
            </div>
            <p className="mt-3 type-body-sm text-white/75 sm:mt-4">{service.description}</p>
            <div className="mt-4 flex items-center gap-2 type-label font-bold uppercase tracking-[0.16em] text-accent sm:mt-5">
              Learn more <span className="sr-only">about {service.title}</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </div>
          </div>
        </article>
      </Link>
    );
  }

  // Text-only card
  return (
    <Link
      to={href}
      aria-label={`Learn more about ${service.title}`}
      className="group block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-2xl sm:rounded-3xl"
    >
      <article className="relative flex h-full flex-col rounded-2xl border border-border/60 bg-surface-card p-5 shadow-card transition-[box-shadow,border-color] duration-300 group-hover:shadow-card-hover group-hover:border-primary/25 sm:rounded-3xl sm:p-7 overflow-hidden">
        <div className="flex items-start justify-between gap-3 sm:gap-4">
          <div className="space-y-2 sm:space-y-3">
            <div className="inline-flex rounded-full border border-border bg-muted px-2.5 py-1 type-label font-bold uppercase tracking-[0.16em] text-muted-foreground sm:px-3">
              {service.concept}
            </div>
            <h3 className="font-heading type-card-title font-bold text-foreground group-hover:text-primary transition-colors duration-300">{service.title}</h3>
          </div>
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary sm:h-14 sm:w-14 sm:rounded-2xl">
            <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
          </div>
        </div>
        <p className="mt-4 type-body-sm text-muted-foreground sm:mt-5">{service.description}</p>
        <div className="mt-auto pt-4 flex items-center gap-2 type-label font-bold uppercase tracking-[0.16em] text-primary sm:pt-5">
          Learn more <span className="sr-only">about {service.title}</span>
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </div>
      </article>
    </Link>
  );
};
