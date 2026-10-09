import { cn } from "@/lib/utils";

export type BlobBackgroundProps = Omit<React.ComponentProps<"div">, "children"> & {
  /** One blob per color. Any CSS colors. Defaults to the theme chart colors. */
  colors?: string[];
  /** Strength of each blob's color, 0–1. @default 0.35 */
  intensity?: number;
  /** Animation speed multiplier. @default 1 */
  speed?: number;
};

const DEFAULT_COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
];

const PATHS = [
  ["-20%,-20%,1", "10%,10%,1.2", "30%,-10%,.8", "0%,20%,1.1"],
  ["20%,20%,1.1", "-10%,10%,.9", "-30%,-10%,1.2", "10%,-20%,.8"],
  ["0%,-30%,.9", "20%,0%,1.1", "-20%,30%,.8", "-10%,-10%,1.2"],
  ["-30%,10%,1.2", "0%,-20%,.8", "30%,0%,1.1", "-10%,30%,.9"],
  ["10%,30%,.8", "-30%,-10%,1.1", "10%,-30%,.9", "30%,10%,1.2"],
];

const frame = (value: string) => {
  const [x, y, scale] = value.split(",");
  return `transform:translate(${x},${y}) scale(${scale})`;
};

const KEYFRAMES = PATHS.map(
  ([a, b, c, d], i) =>
    `@keyframes devsloka-blob-${i}{0%,100%{${frame(a)}}25%{${frame(b)}}50%{${frame(c)}}75%{${frame(d)}}}`
).join("");

/** Soft colored blobs drifting around the parent. */
export function BlobBackground({
  colors = DEFAULT_COLORS,
  intensity = 0.35,
  speed = 1,
  className,
  ...props
}: BlobBackgroundProps) {
  const mix = Math.round(Math.max(0, Math.min(1, intensity)) * 100);
  const duration = 20 / (speed > 0 ? speed : 1);

  return (
    <div
      aria-hidden
      data-slot="blob-background"
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
      {...props}
    >
      <style href="devsloka-blob-background" precedence="default">
        {KEYFRAMES}
      </style>
      {colors.map((color, i) => (
        <span
          key={i}
          className="absolute top-1/2 aspect-square w-[60%] rounded-full will-change-transform motion-reduce:animate-none!"
          style={{
            // Margins in % resolve against the parent's width, so this centers the square vertically.
            left: `${5 + ((i * 17) % 35)}%`,
            marginTop: "-30%",
            background: `radial-gradient(closest-side, color-mix(in oklab, ${color} ${mix}%, transparent), transparent)`,
            animation: `devsloka-blob-${i % PATHS.length} ${duration}s ease-in-out ${-i * (duration / 5)}s infinite`,
          }}
        />
      ))}
    </div>
  );
}
