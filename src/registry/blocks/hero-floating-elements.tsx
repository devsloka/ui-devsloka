import { useId, type ComponentProps } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Action = { label: string; href: string };
type Spec = { value: string; label: string };

export type HeroFloatingElementsProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  primaryAction?: Action;
  secondaryAction?: Action;
  specs?: Spec[];
  /** Show the spec-sheet annotations around the headline and paragraph. */
  annotations?: boolean;
} & ComponentProps<"section">;

const DEFAULTS = {
  eyebrow: "Sundial · Spec sheet, rev. 2",
  title: "Your timesheet, already filled in.",
  description:
    "Sundial notices the files, tickets and calendar events you work on and drafts your week. On Friday you skim it, fix one line and send it.",
  primaryAction: { label: "Try it for a week", href: "#" },
  secondaryAction: { label: "How tracking works", href: "#" },
  specs: [
    { value: "4.2 h", label: "Saved per person, per month" },
    { value: "6 min", label: "Rounding, or none at all" },
    { value: "52 s", label: "Median Friday review" },
  ],
};

/** A small mono label that sits on a frame edge, like a callout in a design file. */
function Tag({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <span
      aria-hidden
      className={cn(
        "absolute hidden bg-background px-1.5 font-mono text-[10px] uppercase tracking-wider whitespace-nowrap text-primary md:block",
        className
      )}
    >
      {children}
    </span>
  );
}

export default function HeroFloatingElements({
  eyebrow = DEFAULTS.eyebrow,
  title = DEFAULTS.title,
  description = DEFAULTS.description,
  primaryAction = DEFAULTS.primaryAction,
  secondaryAction = DEFAULTS.secondaryAction,
  specs = DEFAULTS.specs,
  annotations = true,
  className,
  ...props
}: HeroFloatingElementsProps) {
  const headingId = useId();
  const frame = annotations ? "md:border md:border-dashed md:border-primary/50" : "";

  return (
    <section
      data-slot="hero-floating-elements"
      aria-labelledby={headingId}
      className={cn("w-full bg-background text-foreground", className)}
      {...props}
    >
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <div className="flex items-baseline justify-between border-b pb-3 font-mono text-xs uppercase tracking-wider text-muted-foreground">
          <span>{eyebrow}</span>
          <span>Fig. 1</span>
        </div>

        <div className={cn("relative mt-14 md:p-6", frame)}>
          {annotations && (
            <>
              <Tag className="-top-2 left-4">H1 · 96 / 0.95 · −0.045em</Tag>
              <Tag className="right-4 -bottom-2">Measure 14ch</Tag>
            </>
          )}
          <h1
            id={headingId}
            className="max-w-[14ch] text-5xl font-semibold leading-[0.95] tracking-[-0.045em] sm:text-6xl md:text-8xl"
          >
            {title}
          </h1>
        </div>

        <div className="mt-12 grid gap-10 md:grid-cols-12">
          <div className={cn("relative md:col-span-6 md:p-4", frame)}>
            {annotations && <Tag className="-top-2 left-3">Body · 16 / 26 · muted</Tag>}
            <p className="max-w-md text-base leading-relaxed text-muted-foreground">
              {description}
            </p>
          </div>
          <div className="flex flex-wrap items-start gap-x-6 gap-y-3 md:col-span-6 md:justify-end md:pt-4">
            <Button asChild size="lg" className="rounded-none">
              <a href={primaryAction.href}>{primaryAction.label}</a>
            </Button>
            <a
              href={secondaryAction.href}
              className="py-2 text-sm font-medium underline decoration-1 underline-offset-[6px] hover:text-muted-foreground"
            >
              {secondaryAction.label}
            </a>
          </div>
        </div>

        {specs.length > 0 && (
          <dl className="mt-20 grid border-t sm:grid-cols-3">
            {specs.map((spec, i) => (
              <div
                key={spec.label}
                className={cn("border-b py-6 sm:border-b-0 sm:px-6", i > 0 && "sm:border-l", i === 0 && "sm:pl-0")}
              >
                <dt className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                  {String(i + 1).padStart(2, "0")} · {spec.label}
                </dt>
                <dd className="mt-3 text-4xl font-semibold tracking-[-0.03em] tabular-nums">
                  {spec.value}
                </dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </section>
  );
}
