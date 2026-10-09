import { cn } from "@/lib/utils";

export type ParticlesBackgroundProps = Omit<React.ComponentProps<"div">, "children" | "color"> & {
  /** Number of particles (capped at 400). @default 100 */
  count?: number;
  /** Any CSS color. Defaults to the current text color (`text-foreground`). */
  color?: string;
};

const KEYFRAMES = `@keyframes devsloka-particles-twinkle{0%,100%{opacity:var(--particle-opacity);transform:scale(1)}50%{opacity:calc(var(--particle-opacity) * 0.25);transform:scale(1.3)}}`;

/** Small deterministic PRNG so server and client render the same scatter. */
function mulberry32(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const round = (n: number) => Math.round(n * 100) / 100;

function createParticles(count: number) {
  const random = mulberry32(count);
  return Array.from({ length: count }, () => ({
    size: round(1 + random() * 2),
    x: round(random() * 100),
    y: round(random() * 100),
    opacity: round(0.3 + random() * 0.7),
    duration: round(3 + random() * 7),
    delay: round(random() * -10),
  }));
}

/** Twinkling dots scattered across the parent. Positions are seeded, so they are stable across renders. */
export function ParticlesBackground({
  count = 100,
  color,
  className,
  style,
  ...props
}: ParticlesBackgroundProps) {
  const particles = createParticles(Math.max(0, Math.min(400, Math.floor(count))));

  return (
    <div
      aria-hidden
      data-slot="particles-background"
      className={cn("pointer-events-none absolute inset-0 overflow-hidden text-foreground", className)}
      style={color ? { color, ...style } : style}
      {...props}
    >
      <style href="devsloka-particles-background" precedence="default">
        {KEYFRAMES}
      </style>
      {particles.map((p, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-current animate-[devsloka-particles-twinkle_5s_ease-in-out_infinite] motion-reduce:animate-none"
          style={
            {
              width: p.size,
              height: p.size,
              left: `${p.x}%`,
              top: `${p.y}%`,
              opacity: p.opacity,
              "--particle-opacity": p.opacity,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
