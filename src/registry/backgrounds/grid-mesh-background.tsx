import { cn } from "@/lib/utils";

export type GridMeshBackgroundProps = Omit<React.ComponentProps<"div">, "children" | "color"> & {
  /** Cells per row and column (4–32). @default 20 */
  cells?: number;
  /** Any CSS color. Defaults to the current text color (`text-foreground`). */
  color?: string;
  /** Duration of one pulse in seconds. @default 4 */
  duration?: number;
};

const KEYFRAMES = `@keyframes devsloka-grid-mesh-pulse{0%,100%{opacity:.06}50%{opacity:.2}}`;

/** A grid of cells tilted into perspective, pulsing in a diagonal wave. */
export function GridMeshBackground({
  cells = 20,
  color,
  duration = 4,
  className,
  style,
  ...props
}: GridMeshBackgroundProps) {
  const size = Math.max(4, Math.min(32, Math.floor(cells)));
  const period = duration > 0 ? duration : 4;
  const step = period / (size * 2);

  return (
    <div
      aria-hidden
      data-slot="grid-mesh-background"
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden text-foreground [perspective:1000px]",
        className
      )}
      style={color ? { color, ...style } : style}
      {...props}
    >
      <style href="devsloka-grid-mesh-background" precedence="default">
        {KEYFRAMES}
      </style>
      <div
        className="absolute top-1/2 left-1/2 grid aspect-square w-[150%] gap-0.5"
        style={{
          gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))`,
          transform: "translate(-50%, -50%) rotateX(60deg)",
        }}
      >
        {Array.from({ length: size * size }, (_, index) => {
          const row = Math.floor(index / size);
          const col = index % size;
          // Negative delays start every cell mid-cycle, so the wave is visible immediately.
          const delay = (((row + col) * step) % period) - period;
          return (
            <span
              key={index}
              className="bg-current opacity-10 animate-[devsloka-grid-mesh-pulse_4s_ease-in-out_infinite] motion-reduce:animate-none"
              style={{
                animationDuration: `${period}s`,
                animationDelay: `${delay.toFixed(3)}s`,
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
