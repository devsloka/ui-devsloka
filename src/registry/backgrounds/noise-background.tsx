import { cn } from "@/lib/utils";

export type NoiseBackgroundProps = Omit<React.ComponentProps<"div">, "children" | "color"> & {
  /** Any CSS color for the grain. Defaults to the current text color (`text-foreground`). */
  color?: string;
  /** Grain strength, 0–1. @default 0.25 */
  intensity?: number;
  /** Shift the grain like film noise. Disabled automatically for reduced motion. @default true */
  animated?: boolean;
};

// Static fractal noise tile; the red channel is copied to alpha so it can be used as a mask.
const NOISE_TILE = `url("data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch"/><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0"/></filter><rect width="100%" height="100%" filter="url(#n)"/></svg>`
)}")`;

const KEYFRAMES = `@keyframes devsloka-noise-shift{0%{transform:translate(0px,0px)}10%{transform:translate(-20px,-40px)}20%{transform:translate(-60px,20px)}30%{transform:translate(28px,-80px)}40%{transform:translate(-20px,80px)}50%{transform:translate(-60px,40px)}60%{transform:translate(60px,0px)}70%{transform:translate(0px,60px)}80%{transform:translate(12px,72px)}90%{transform:translate(-40px,40px)}100%{transform:translate(0px,0px)}}`;

/** Film-grain texture from a static SVG noise tile, optionally shifted with a stepped CSS animation. */
export function NoiseBackground({
  color,
  intensity = 0.25,
  animated = true,
  className,
  style,
  ...props
}: NoiseBackgroundProps) {
  return (
    <div
      aria-hidden
      data-slot="noise-background"
      className={cn("pointer-events-none absolute inset-0 overflow-hidden text-foreground", className)}
      style={color ? { color, ...style } : style}
      {...props}
    >
      {animated && (
        <style href="devsloka-noise-background" precedence="default">
          {KEYFRAMES}
        </style>
      )}
      <div
        className={cn(
          "absolute -inset-24 bg-current",
          animated &&
            "animate-[devsloka-noise-shift_1.5s_steps(1)_infinite] will-change-transform motion-reduce:animate-none"
        )}
        style={{
          opacity: Math.max(0, Math.min(1, intensity)),
          maskImage: NOISE_TILE,
          WebkitMaskImage: NOISE_TILE,
          maskSize: "200px 200px",
          WebkitMaskSize: "200px 200px",
        }}
      />
    </div>
  );
}
