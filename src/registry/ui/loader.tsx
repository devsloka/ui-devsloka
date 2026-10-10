import { cn } from "@/lib/utils";

const SIZES = {
  sm: { root: "gap-1", dot: "size-1.5" },
  md: { root: "gap-1.5", dot: "size-2.5" },
  lg: { root: "gap-2", dot: "size-3.5" },
} as const;

export type LoaderProps = React.ComponentProps<"div"> & {
  size?: keyof typeof SIZES;
  /** Number of dots. */
  dots?: number;
  /** Announced to screen readers. */
  label?: string;
};

/** Pulsing dots in the current text color. Set the color with a `text-*` class. */
export function Loader({
  size = "md",
  dots = 3,
  label = "Loading",
  className,
  ...props
}: LoaderProps) {
  return (
    <div
      role="status"
      aria-label={label}
      data-slot="loader"
      className={cn("inline-flex items-center", SIZES[size].root, className)}
      {...props}
    >
      {Array.from({ length: dots }, (_, i) => (
        <span
          key={i}
          aria-hidden
          className={cn(
            "animate-pulse rounded-full bg-current [animation-duration:1.2s] motion-reduce:animate-none motion-reduce:opacity-60",
            SIZES[size].dot
          )}
          style={{ animationDelay: `${i * 0.15}s` }}
        />
      ))}
    </div>
  );
}
