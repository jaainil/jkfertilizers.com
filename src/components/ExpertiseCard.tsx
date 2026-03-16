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
    <Card className="group h-full rounded-[28px] border-border/60 bg-surface-card/95 shadow-[0_8px_32px_rgba(22,61,38,0.06)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_56px_rgba(22,61,38,0.12)] hover:border-primary/20 overflow-hidden">
      {/* Top accent bar */}
      <div
        className="h-1 w-full transition-all duration-500 group-hover:h-1.5"
        style={{ background: `linear-gradient(to right, ${color}, transparent)` }}
      />
      <CardContent className="p-8">
        {/* Icon container with layered background */}
        <div
          className="relative flex h-14 w-14 items-center justify-center rounded-2xl transition-all duration-300 group-hover:scale-110"
          style={{ background: gradient }}
        >
          <Icon className="h-7 w-7" style={{ color }} />
        </div>

        <h3 className="mt-6 font-heading text-xl font-bold text-foreground">{card.title}</h3>
        <p className="mt-4 text-sm leading-7 text-muted-foreground">{card.description}</p>

        {/* Subtle bottom accent */}
        <div
          className="mt-6 h-px w-0 transition-all duration-500 group-hover:w-full"
          style={{ background: `linear-gradient(to right, ${color}40, transparent)` }}
        />
      </CardContent>
    </Card>
  );
};
