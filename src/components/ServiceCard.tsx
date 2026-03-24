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

  // Image-backed card
  if (service.imageSrc) {
    return (
      <Link to={href} className="group block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-2xl sm:rounded-[30px]">
        <article className="relative flex h-full min-h-[300px] flex-col overflow-hidden rounded-2xl border border-border/50 shadow-[0_16px_48px_rgba(22,61,38,0.08)] transition-all duration-300 group-hover:shadow-[0_24px_72px_rgba(22,61,38,0.16)] group-hover:border-primary/20 sm:min-h-[340px] sm:rounded-[30px]">
          <img
            src={service.imageSrc}
            alt={service.title}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
          <div
            className="absolute inset-0 transition-opacity duration-300"
            style={{ background: "linear-gradient(to top, rgba(22,61,38,0.97) 0%, rgba(22,61,38,0.65) 50%, rgba(22,61,38,0.15) 100%)" }}
          />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

          {/* FIX 5.2: p-5 on mobile, p-7 on sm */}
          <div className="relative flex h-full flex-col justify-end p-5 sm:p-7">
            <div className="flex items-start justify-between gap-3 sm:gap-4">
              <div className="space-y-1.5 sm:space-y-2">
                <div className="inline-flex rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-xs font-bold uppercase tracking-[0.18em] text-white/80 backdrop-blur-sm sm:px-3">
                  {service.concept}
                </div>
                {/* FIX 5.4: text-xl on mobile, text-2xl on sm */}
                <h3 className="font-heading type-card-title font-bold text-white">{service.title}</h3>
              </div>
              <div
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-secondary transition-transform duration-300 group-hover:scale-110 sm:h-12 sm:w-12 sm:rounded-2xl"
                style={{ background: "linear-gradient(135deg, #F59E0B, #D97706)" }}
              >
                <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
              </div>
            </div>
            <p className="mt-3 type-body-sm text-white/75 sm:mt-4">{service.description}</p>
            <div className="mt-4 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-accent sm:mt-5">
              Learn more
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1.5" />
            </div>
          </div>
        </article>
      </Link>
    );
  }

  // Text-only card
  return (
    <Link to={href} className="group block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-2xl sm:rounded-[30px]">
      <article className="relative flex h-full flex-col rounded-2xl border border-white/40 bg-white/60 backdrop-blur-md p-5 shadow-[0_12px_40px_rgba(22,61,38,0.06)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_24px_60px_rgba(22,61,38,0.12)] hover:border-primary/30 sm:rounded-[30px] sm:p-7 hover:bg-white/80 overflow-hidden">
        
        {/* Glow effect on hover */}
        <div 
          className="absolute -right-20 -top-20 h-40 w-40 rounded-full opacity-0 blur-[50px] transition-opacity duration-700 group-hover:opacity-20 pointer-events-none"
          style={{ background: "linear-gradient(135deg, #2D7A4A, #163D26)" }}
        />

        <div className="relative flex items-start justify-between gap-3 sm:gap-4 z-10">
          <div className="space-y-2 sm:space-y-3">
            <div className="inline-flex rounded-full border border-border bg-muted px-2.5 py-1 text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground sm:px-3">
              {service.concept}
            </div>
            <h3 className="font-heading type-card-title font-bold text-foreground group-hover:text-primary transition-colors duration-300">{service.title}</h3>
          </div>
          <div
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-white transition-all duration-500 group-hover:scale-[1.12] group-hover:rotate-6 sm:h-14 sm:w-14 sm:rounded-2xl border border-white/20 shadow-inner group-hover:shadow-[0_8px_20px_rgba(45,122,74,0.3)]"
            style={{ background: "linear-gradient(135deg, #2D7A4A, #163D26)" }}
          >
            <Icon className="h-5 w-5 sm:h-6 sm:w-6 transition-transform duration-500" />
          </div>
        </div>
        <p className="relative z-10 mt-4 type-body-sm text-muted-foreground sm:mt-5">{service.description}</p>
        <div className="relative z-10 mt-auto pt-4 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-primary sm:pt-5 opacity-80 group-hover:opacity-100 transition-opacity">
          Learn more
          <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-2" />
        </div>
      </article>
    </Link>
  );
};
