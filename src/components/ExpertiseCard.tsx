import { Card, CardContent } from "@/components/ui/card";
import { BadgeCheck, ShieldCheck, Factory, FlaskConical } from "lucide-react";

const iconMap = {
  leaf: BadgeCheck,
  shield: ShieldCheck,
  factory: Factory,
  flask: FlaskConical,
};

const iconGradients = {
  leaf: "linear-gradient(135deg, rgba(45,122,74,0.15), rgba(45,122,74,0.05))",
  shield: "linear-gradient(135deg, rgba(245,158,11,0.15), rgba(245,158,11,0.05))",
  factory: "linear-gradient(135deg, rgba(107,124,62,0.15), rgba(107,124,62,0.05))",
  flask: "linear-gradient(135deg, rgba(45,122,74,0.12), rgba(143,175,126,0.08))",
};

const iconColors = {
  leaf: "#2D7A4A",
  shield: "#D97706",
  factory: "#6B7C3E",
  flask: "#2D7A4A",
};

export const ExpertiseCard = ({ card }) => {
  const Icon = iconMap[card.icon] || BadgeCheck;
  const gradient = iconGradients[card.icon] || iconGradients.leaf;
  const color = iconColors[card.icon] || iconColors.leaf;

  return (
    <Card className="relative group h-full rounded-2xl border border-white/40 bg-white/60 backdrop-blur-md shadow-[0_8px_32px_rgba(22,61,38,0.06)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_24px_64px_rgba(22,61,38,0.12)] hover:border-primary/30 overflow-hidden sm:rounded-[28px] hover:bg-white/80">
      {/* Top accent bar */}
      <div
        className="h-1 w-full transition-all duration-700 opacity-70 group-hover:opacity-100 group-hover:h-1.5"
        style={{ background: `linear-gradient(to right, ${color}, transparent)` }}
      />
      
      {/* Background glow effect on hover */}
      <div 
        className="absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-0 blur-[40px] transition-opacity duration-500 group-hover:opacity-20"
        style={{ backgroundColor: color }}
      />

      {/* FIX 4.1: p-5 on mobile, p-6 on sm, p-8 on lg */}
      <CardContent className="relative z-10 p-5 sm:p-6 lg:p-8">
        <div
          className="relative flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-500 group-hover:scale-[1.15] group-hover:rotate-3 sm:h-14 sm:w-14 sm:rounded-2xl border border-white/50 shadow-inner"
          style={{ background: gradient }}
        >
          <Icon className="h-6 w-6 sm:h-7 sm:w-7 transition-colors duration-500" style={{ color }} />
        </div>

        <h3 className="mt-5 font-heading type-card-title font-bold text-foreground sm:mt-6">{card.title}</h3>
        <p className="mt-3 type-body-sm text-muted-foreground sm:mt-4">{card.description}</p>

        <div
          className="mt-5 h-px w-0 transition-all duration-500 group-hover:w-full sm:mt-6"
          style={{ background: `linear-gradient(to right, ${color}40, transparent)` }}
        />
      </CardContent>
    </Card>
  );
};
