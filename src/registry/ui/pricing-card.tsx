import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type PricingCardProps = React.ComponentProps<"div"> & {
  name: React.ReactNode;
  description?: React.ReactNode;
  /** Pre-formatted price, e.g. "$9.99" or "Free". */
  price: React.ReactNode;
  /** Shown after the price, e.g. "/month". */
  period?: React.ReactNode;
  features: React.ReactNode[];
  /** Custom call to action (e.g. a Button or link). Takes precedence over ctaLabel. */
  cta?: React.ReactNode;
  ctaLabel?: React.ReactNode;
  ctaHref?: string;
  onCtaClick?: () => void;
  highlighted?: boolean;
  /** Shown next to the plan name, e.g. "Popular". */
  badge?: React.ReactNode;
};

export function PricingCard({
  name,
  description,
  price,
  period,
  features,
  cta,
  ctaLabel,
  ctaHref,
  onCtaClick,
  highlighted = false,
  badge,
  className,
  ...props
}: PricingCardProps) {
  const variant = highlighted ? "default" : "outline";

  let action = cta;
  if (!action && ctaLabel) {
    action = ctaHref ? (
      <Button asChild variant={variant} className="w-full">
        <a href={ctaHref} onClick={onCtaClick}>
          {ctaLabel}
        </a>
      </Button>
    ) : (
      <Button type="button" variant={variant} className="w-full" onClick={onCtaClick}>
        {ctaLabel}
      </Button>
    );
  }

  return (
    <div
      data-slot="pricing-card"
      data-highlighted={highlighted || undefined}
      className={cn(
        "flex h-full w-full max-w-sm flex-col gap-6 rounded-xl border bg-card p-6 text-card-foreground shadow-sm",
        highlighted && "border-primary ring-1 ring-primary",
        className
      )}
      {...props}
    >
      <div className="space-y-2">
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-medium">{name}</h3>
          {badge && (
            <span className="rounded-md bg-primary px-2 py-0.5 text-xs font-medium text-primary-foreground">
              {badge}
            </span>
          )}
        </div>
        {description && <p className="text-sm text-muted-foreground">{description}</p>}
        <p className="flex items-baseline gap-1">
          <span className="text-4xl font-semibold tracking-tight">{price}</span>
          {period && <span className="text-sm text-muted-foreground">{period}</span>}
        </p>
      </div>

      <ul className="flex-1 space-y-3 text-sm">
        {features.map((feature, i) => (
          <li key={i} className="flex items-start gap-2">
            <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-primary" />
            <span className="text-muted-foreground">{feature}</span>
          </li>
        ))}
      </ul>

      {action}
    </div>
  );
}
