import { FloatingDots } from "@/components/ui/floating-dots";
import { cn } from "@/lib/utils";

export type GradientBackgroundProps = Omit<React.ComponentProps<"div">, "children"> & {
  /** Start and end colors of the gradient glow. Any CSS colors. Defaults to theme chart colors. */
  colors?: [string, string];
  /** Show slowly rising dots in the current text color (`text-foreground/30`). @default true */
  dots?: boolean;
};

const DEFAULT_COLORS: [string, string] = ["var(--chart-1)", "var(--chart-4)"];

const SHAPE =
  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)";

const KEYFRAMES = `@keyframes devsloka-gradient-bg-drift{from{transform:translateX(-50%) rotate(30deg) scale(1)}to{transform:translateX(-44%) rotate(38deg) scale(1.08)}}`;

/** A soft, blurred gradient glow that slowly drifts near the top, with optional floating dots. */
export function GradientBackground({
  colors = DEFAULT_COLORS,
  dots = true,
  className,
  ...props
}: GradientBackgroundProps) {
  const [from, to] = colors;

  return (
    <div
      aria-hidden
      data-slot="gradient-bg"
      className={cn("pointer-events-none absolute inset-0 isolate overflow-hidden text-foreground/30", className)}
      {...props}
    >
      <style href="devsloka-gradient-bg" precedence="default">
        {KEYFRAMES}
      </style>
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
        <div
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] opacity-30 animate-[devsloka-gradient-bg-drift_18s_ease-in-out_infinite_alternate] motion-reduce:animate-none sm:left-[calc(80%-30rem)] sm:w-[72.1875rem] dark:opacity-40"
          style={{
            transform: "translateX(-50%) rotate(30deg)",
            clipPath: SHAPE,
            backgroundImage: `linear-gradient(to top right, ${from}, ${to})`,
          }}
        />
      </div>
      {dots && <FloatingDots maxRadius={1.5} minRadius={0.5} maxSpeed={0.8} minSpeed={0.1} />}
    </div>
  );
}
