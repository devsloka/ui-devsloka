import { cn } from "@/lib/utils";

export type GradientWaveBackgroundProps = Omit<
  React.ComponentProps<"div">,
  "children" | "color"
> & {
  /** Any CSS color for the waves. Defaults to the theme primary color (`text-primary`). */
  color?: string;
  /** Number of stacked waves (1–8). @default 5 */
  waves?: number;
  /** Animation speed multiplier. @default 1 */
  speed?: number;
};

const KEYFRAMES = `@keyframes devsloka-gradient-wave{from{transform:translateY(var(--wave-y)) rotate(var(--wave-r))}to{transform:translateY(calc(var(--wave-y) + 5%)) rotate(calc(var(--wave-r) * -1))}}`;

/** Layered translucent arcs gently rising and tilting from the bottom, over a soft vertical gradient. */
export function GradientWaveBackground({
  color,
  waves = 5,
  speed = 1,
  className,
  style,
  ...props
}: GradientWaveBackgroundProps) {
  const count = Math.max(1, Math.min(8, Math.floor(waves)));
  const rate = speed > 0 ? speed : 1;

  return (
    <div
      aria-hidden
      data-slot="gradient-wave"
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden text-primary",
        "bg-[linear-gradient(to_bottom,transparent,color-mix(in_oklab,currentColor_8%,transparent))]",
        className
      )}
      style={color ? { color, ...style } : style}
      {...props}
    >
      <style href="devsloka-gradient-wave" precedence="default">
        {KEYFRAMES}
      </style>
      {Array.from({ length: count }, (_, i) => (
        <span
          key={i}
          className="absolute -left-1/4 bottom-0 h-1/2 w-[150%] rounded-t-[100%] bg-current will-change-transform animate-[devsloka-gradient-wave_8s_ease-in-out_infinite_alternate] motion-reduce:animate-none"
          style={
            {
              opacity: 0.04 + i * 0.02,
              transform: `translateY(${10 + i * 15}%) rotate(${i % 2 ? -1 : 1}deg)`,
              "--wave-y": `${10 + i * 15}%`,
              "--wave-r": `${i % 2 ? -1.5 : 1.5}deg`,
              animationDuration: `${(8 + i * 2) / rate}s`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
