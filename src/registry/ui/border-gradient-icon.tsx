import { Slot, Slottable } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

const sizes = {
  sm: { tile: "size-16 rounded-lg", icon: "[&_svg]:size-5", label: "text-xs" },
  md: { tile: "size-24 rounded-xl", icon: "[&_svg]:size-7", label: "text-xs" },
  lg: { tile: "size-32 rounded-xl", icon: "[&_svg]:size-9", label: "text-sm" },
} as const;

export type BorderGradientIconProps = React.ComponentProps<"div"> & {
  icon: React.ReactNode;
  label: React.ReactNode;
  size?: keyof typeof sizes;
  /** Render as the child element (e.g. an `<a>` or `<button>`) instead of a `<div>`. */
  asChild?: boolean;
};

/**
 * An icon tile with a subtle 1px gradient border.
 * Use `asChild` with an empty `<a>` or `<button>` child to make it interactive;
 * the icon and label are rendered inside that element.
 */
export function BorderGradientIcon({
  icon,
  label,
  size = "md",
  asChild = false,
  className,
  children,
  ...props
}: BorderGradientIconProps) {
  const Comp = asChild ? Slot : "div";
  const s = sizes[size];

  const content = (
    <>
      <span aria-hidden className={cn("text-foreground", s.icon)}>
        {icon}
      </span>
      <span
        className={cn(
          "font-medium text-muted-foreground transition-colors group-hover/tile:text-foreground",
          s.label
        )}
      >
        {label}
      </span>
    </>
  );

  return (
    <Comp
      data-slot="border-gradient-icon"
      className={cn(
        "flex flex-col items-center justify-center gap-2 border border-transparent text-center outline-none transition-colors",
        // 1px gradient border: solid card fill on the padding box, gradient on the border box.
        "[background:linear-gradient(var(--card),var(--card))_padding-box,linear-gradient(to_bottom,var(--border),color-mix(in_oklab,var(--primary)_40%,transparent))_border-box]",
        "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "group/tile [a&]:cursor-pointer [button&]:cursor-pointer",
        s.tile,
        className
      )}
      {...props}
    >
      {content}
      <Slottable>{children}</Slottable>
    </Comp>
  );
}

export { BorderGradientIcon as IconTile };
export type IconTileProps = BorderGradientIconProps;
