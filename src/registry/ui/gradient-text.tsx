import { cn } from "@/lib/utils";

const ELEMENTS = {
  span: "span",
  p: "p",
  h1: "h1",
  h2: "h2",
  h3: "h3",
} as const;

// Must match the keyframe name used in the animate-[...] class below.
const KEYFRAMES = "gradient-text-shift";
const DEFAULT_COLORS = ["var(--primary)", "var(--muted-foreground)"];

export type GradientTextProps = React.HTMLAttributes<HTMLElement> & {
  /** Element to render. @default "span" */
  as?: keyof typeof ELEMENTS;
  /** CSS colors for the gradient, in order. Defaults to theme tokens. */
  colors?: string[];
  /** Slowly shift the gradient across the text. @default true */
  animate?: boolean;
  /** Seconds per full gradient cycle. @default 6 */
  speed?: number;
};

/** Text filled with a (optionally drifting) gradient. Pure CSS, no client JS. */
export function GradientText({
  as = "span",
  colors = DEFAULT_COLORS,
  animate = true,
  speed = 6,
  className,
  style,
  children,
  ...props
}: GradientTextProps) {
  const Comp = ELEMENTS[as];
  // When animating, repeat the colors so the 200%-wide image tiles seamlessly at a one-width offset.
  const stops = animate ? [...colors, ...colors, colors[0]] : colors;

  return (
    <>
      {animate && (
        <style href={KEYFRAMES} precedence="default">
          {`@keyframes ${KEYFRAMES}{from{background-position:0% 50%}to{background-position:100% 50%}}`}
        </style>
      )}
      <Comp
        data-slot="gradient-text"
        className={cn(
          "bg-clip-text text-transparent [-webkit-box-decoration-break:clone] [box-decoration-break:clone]",
          animate &&
            "animate-[gradient-text-shift_var(--gradient-text-speed)_linear_infinite] motion-reduce:animate-none",
          className
        )}
        style={{
          backgroundImage: `linear-gradient(to right, ${stops.join(", ")})`,
          backgroundSize: animate ? "200% 100%" : undefined,
          ...(animate && { "--gradient-text-speed": `${speed}s` }),
          ...style,
        } as React.CSSProperties}
        {...props}
      >
        {children}
      </Comp>
    </>
  );
}

export default GradientText;
