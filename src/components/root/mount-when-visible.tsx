"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type MountWhenVisibleProps = {
  children: React.ReactNode;
  className?: string;
  /** Start mounting this far before the element scrolls into view. */
  rootMargin?: string;
};

/** Renders children only once the placeholder nears the viewport, then keeps them mounted. */
export function MountWhenVisible({
  children,
  className,
  rootMargin = "200px",
}: MountWhenVisibleProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [rootMargin]);

  return (
    <div ref={ref} className={cn("relative", className)}>
      {isVisible && children}
    </div>
  );
}
