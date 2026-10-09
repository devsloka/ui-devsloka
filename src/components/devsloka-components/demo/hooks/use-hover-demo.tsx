"use client";

import { cn } from "@/lib/utils";
import { useHover } from "@/registry/hooks/use-hover";

export default function UseHoverDemo() {
  const [ref, isHovered] = useHover<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={cn(
        "mx-auto flex h-40 w-full max-w-sm flex-col items-center justify-center gap-1 rounded-xl border bg-card transition-colors",
        isHovered && "border-primary bg-muted",
      )}
    >
      <p className="font-medium">{isHovered ? "Hovering" : "Hover over me"}</p>
      <p className="font-mono text-sm text-muted-foreground">
        isHovered: {String(isHovered)}
      </p>
    </div>
  );
}
