import { cn } from "@/lib/utils";

export type CardDecoratorVariant = "brackets" | "dashed" | "dots" | "glow";

export type CardDecoratorProps = React.ComponentProps<"div"> & {
  /** `"default"` is accepted as an alias of `"brackets"`. */
  variant?: CardDecoratorVariant | "default";
  /** Corner size in px. */
  size?: number;
};

const corners = [
  { position: "top-0 left-0", rotate: 0 },
  { position: "top-0 right-0", rotate: 90 },
  { position: "bottom-0 right-0", rotate: 180 },
  { position: "bottom-0 left-0", rotate: 270 },
] as const;

// Dot opacities for a 3x3 corner pattern, drawn for the top-left corner and rotated for the others.
const dotPattern = [
  [1, 1, 1],
  [1, 0.6, 0.3],
  [1, 0.3, 0],
];

/**
 * Decorative corner accents. Place inside a `relative` container.
 * Colored with `currentColor` (defaults to `text-primary`); override with a text color class.
 */
export function CardDecorator({
  variant = "brackets",
  size = 12,
  className,
  ...props
}: CardDecoratorProps) {
  const kind = variant === "default" ? "brackets" : variant;

  return (
    <div
      data-slot="card-decorator"
      data-variant={kind}
      aria-hidden
      className={cn("pointer-events-none absolute -inset-px text-primary", className)}
      {...props}
    >
      {kind === "dashed" && (
        <div className="absolute inset-0 rounded-[inherit] border border-dashed border-current opacity-50" />
      )}

      {corners.map(({ position, rotate }) => (
        <span
          key={position}
          className={cn("absolute block", position)}
          style={{ width: size, height: size, transform: `rotate(${rotate}deg)` }}
        >
          {kind === "dots" ? (
            <span className="grid size-full grid-cols-3 gap-[15%]">
              {dotPattern.flat().map((opacity, i) => (
                <span
                  key={i}
                  className="rounded-full bg-current"
                  style={{ opacity }}
                />
              ))}
            </span>
          ) : (
            <span
              className={cn(
                "block size-full border-t-2 border-l-2 border-current",
                kind === "glow" &&
                  "drop-shadow-[0_0_4px_currentColor]"
              )}
            />
          )}
        </span>
      ))}
    </div>
  );
}
