"use client";

import { useRef } from "react";

import { Badge } from "@/components/ui/badge";
import { useScrollPosition } from "@/registry/hooks/use-scroll-position";

const SECTIONS = Array.from({ length: 12 }, (_, i) => `Section ${i + 1}`);

export default function UseScrollPositionDemo() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { y } = useScrollPosition({ target: scrollRef });

  return (
    <div className="mx-auto w-full max-w-sm space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">Scroll the list</span>
        <Badge variant="secondary" className="font-mono">
          y: {Math.round(y)}px
        </Badge>
      </div>
      <div
        ref={scrollRef}
        tabIndex={0}
        aria-label="Scrollable list"
        className="h-56 space-y-2 overflow-y-auto rounded-xl border p-3 outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        {SECTIONS.map((label) => (
          <div key={label} className="rounded-lg bg-muted px-3 py-4 text-sm">
            {label}
          </div>
        ))}
      </div>
    </div>
  );
}
