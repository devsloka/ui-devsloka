import { cn } from "@/lib/utils";

export type FloatingShapesBackgroundProps = Omit<
  React.ComponentProps<"div">,
  "children" | "color"
> & {
  /** Number of shapes (capped at 60). @default 20 */
  count?: number;
  /** Any CSS color. Defaults to the current text color (`text-foreground`). */
  color?: string;
  /** Animation speed multiplier. @default 1 */
  speed?: number;
};

const KEYFRAMES = `@keyframes devsloka-floating-shapes{0%{transform:translate(0,0) rotate(var(--shape-rotate))}25%{transform:translate(10%,10%) rotate(calc(var(--shape-rotate) + 90deg))}50%{transform:translate(0,20%) rotate(calc(var(--shape-rotate) + 180deg))}75%{transform:translate(-10%,10%) rotate(calc(var(--shape-rotate) + 270deg))}100%{transform:translate(0,0) rotate(calc(var(--shape-rotate) + 360deg))}}`;

/** Small deterministic PRNG so server and client render the same layout. */
function mulberry32(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const round = (n: number) => Math.round(n * 100) / 100;

function createShapes(count: number) {
  const random = mulberry32(count + 7);
  return Array.from({ length: count }, () => ({
    size: Math.round(20 + random() * 80),
    x: round(random() * 100),
    y: round(random() * 100),
    rotate: Math.round(random() * 360),
    opacity: round(0.04 + random() * 0.08),
    duration: 15 + random() * 30,
    delay: round(random() * -30),
  }));
}

/** Rounded squares slowly drifting and rotating across the parent. */
export function FloatingShapesBackground({
  count = 20,
  color,
  speed = 1,
  className,
  style,
  ...props
}: FloatingShapesBackgroundProps) {
  const shapes = createShapes(Math.max(0, Math.min(60, Math.floor(count))));
  const rate = speed > 0 ? speed : 1;

  return (
    <div
      aria-hidden
      data-slot="floating-shapes"
      className={cn("pointer-events-none absolute inset-0 overflow-hidden text-foreground", className)}
      style={color ? { color, ...style } : style}
      {...props}
    >
      <style href="devsloka-floating-shapes" precedence="default">
        {KEYFRAMES}
      </style>
      {shapes.map((s, i) => (
        <span
          key={i}
          className="absolute rounded-lg bg-current will-change-transform animate-[devsloka-floating-shapes_30s_linear_infinite] motion-reduce:animate-none"
          style={
            {
              width: s.size,
              height: s.size,
              left: `${s.x}%`,
              top: `${s.y}%`,
              opacity: s.opacity,
              transform: `rotate(${s.rotate}deg)`,
              "--shape-rotate": `${s.rotate}deg`,
              animationDuration: `${round(s.duration / rate)}s`,
              animationDelay: `${round(s.delay / rate)}s`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
