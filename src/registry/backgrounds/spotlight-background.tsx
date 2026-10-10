"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export type SpotlightBackgroundProps = Omit<React.ComponentProps<"div">, "children"> & {
  /** Spotlight colors: the first follows the pointer, the rest orbit around it. Defaults to theme chart colors. */
  colors?: string[];
  /** Diameter of the main spotlight in CSS pixels. @default 600 */
  size?: number;
  /** Show the faint grid underneath. Its color follows the text color (`text-foreground/10`). @default true */
  grid?: boolean;
};

const DEFAULT_COLORS = ["var(--chart-1)", "var(--chart-2)", "var(--chart-4)"];

/** Fraction of the remaining distance covered per 60fps frame. */
const FOLLOW = 0.08;

/**
 * Soft colored spotlights that follow the pointer over the parent element.
 * The pointer position is written to CSS variables in a rAF, so moving the pointer never re-renders React.
 */
export function SpotlightBackground({
  colors = DEFAULT_COLORS,
  size = 600,
  grid = true,
  className,
  ...props
}: SpotlightBackgroundProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const parent = root?.parentElement;
    if (!root || !parent) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    // Offsets from the center of the parent, in CSS pixels.
    let x = 0;
    let y = 0;
    let targetX = 0;
    let targetY = 0;
    let frame = 0;
    let lastTime = 0;

    const write = () => {
      root.style.setProperty("--spotlight-x", `${x.toFixed(1)}px`);
      root.style.setProperty("--spotlight-y", `${y.toFixed(1)}px`);
    };

    const tick = (now: number) => {
      const step = lastTime ? Math.min((now - lastTime) / (1000 / 60), 3) : 1;
      lastTime = now;
      const k = 1 - Math.pow(1 - FOLLOW, step);
      x += (targetX - x) * k;
      y += (targetY - y) * k;
      const settled = Math.abs(targetX - x) < 0.5 && Math.abs(targetY - y) < 0.5;
      if (settled) {
        x = targetX;
        y = targetY;
      }
      write();
      frame = settled ? 0 : requestAnimationFrame(tick);
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = parent.getBoundingClientRect();
      targetX = event.clientX - rect.left - rect.width / 2;
      targetY = event.clientY - rect.top - rect.height / 2;
      if (reducedMotion.matches) {
        x = targetX;
        y = targetY;
        if (!frame) frame = requestAnimationFrame(() => {
          frame = 0;
          write();
        });
        return;
      }
      if (!frame) {
        lastTime = 0;
        frame = requestAnimationFrame(tick);
      }
    };

    parent.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => {
      parent.removeEventListener("pointermove", onPointerMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  const [lead, ...orbiting] = colors;

  return (
    <div
      ref={rootRef}
      aria-hidden
      data-slot="spotlight-background"
      className={cn("pointer-events-none absolute inset-0 overflow-hidden text-foreground/10", className)}
      {...props}
    >
      {grid && (
        <div className="absolute inset-0 bg-[linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] bg-[size:50px_50px]" />
      )}
      <div
        className="absolute top-1/2 left-1/2 size-0 will-change-transform"
        style={{ transform: "translate3d(var(--spotlight-x, 0px), var(--spotlight-y, 0px), 0)" }}
      >
        {lead && <Spot color={lead} size={size} />}
        {orbiting.map((color, i) => (
          <div
            key={i}
            className="absolute top-0 left-0 size-0 animate-spin motion-reduce:animate-none"
            style={{
              animationDuration: `${10 + i * 5}s`,
              animationDirection: i % 2 ? "reverse" : "normal",
            }}
          >
            <div className="absolute top-0 left-0 size-0" style={{ transform: `translateX(${100 + i * 50}px)` }}>
              <Spot color={color} size={size * Math.max(0.3, 0.7 - i * 0.1)} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Spot({ color, size }: { color: string; size: number }) {
  return (
    <div
      className="absolute rounded-full"
      style={{
        width: size,
        height: size,
        left: -size / 2,
        top: -size / 2,
        background: `radial-gradient(closest-side, color-mix(in oklab, ${color} 30%, transparent), transparent)`,
      }}
    />
  );
}
