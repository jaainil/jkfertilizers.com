import { Card, CardContent } from "@/components/ui/card";
import { BadgeCheck, ShieldCheck, Factory, FlaskConical } from "lucide-react";

const iconMap = {
  leaf: BadgeCheck,
  shield: ShieldCheck,
  factory: Factory,
  flask: FlaskConical,
};

export const ExpertiseCard = ({ card }) => {
  const Icon = iconMap[card.icon] || BadgeCheck;

  return (
    <Card className="group h-full rounded-2xl border border-border/60 bg-surface-card shadow-card transition-[box-shadow,border-color] duration-300 hover:shadow-card-hover hover:border-primary/25 sm:rounded-3xl">
      <CardContent className="p-5 sm:p-6 lg:p-8">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary sm:h-14 sm:w-14 sm:rounded-2xl">
          <Icon className="h-6 w-6 sm:h-7 sm:w-7" />
        </div>

        <h3 className="mt-5 font-heading type-card-title font-bold text-foreground sm:mt-6">{card.title}</h3>
        <p className="mt-3 type-body-sm text-muted-foreground sm:mt-4">{card.description}</p>
      </CardContent>
    </Card>
  );
};
