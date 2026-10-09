import { useCallback, useState } from "react";

export type UseHoverReturn<T extends HTMLElement> = [
  /** Callback ref: attach to the element you want to watch. */
  ref: (node: T | null) => void,
  /** `true` while a pointer is over the element. */
  isHovered: boolean,
];

/**
 * Track whether the pointer is over an element. Returns a callback ref, so it keeps
 * working when the element mounts later or is swapped for another node.
 *
 * @example
 * const [ref, isHovered] = useHover<HTMLDivElement>();
 * <div ref={ref}>{isHovered ? "Hovering" : "Hover me"}</div>
 */
export function useHover<
  T extends HTMLElement = HTMLElement,
>(): UseHoverReturn<T> {
  const [isHovered, setIsHovered] = useState(false);

  // React 19 callback refs can return a cleanup function.
  const ref = useCallback((node: T | null) => {
    if (!node) return;
    const enter = () => setIsHovered(true);
    const leave = () => setIsHovered(false);
    node.addEventListener("pointerenter", enter);
    node.addEventListener("pointerleave", leave);
    return () => {
      node.removeEventListener("pointerenter", enter);
      node.removeEventListener("pointerleave", leave);
      setIsHovered(false);
    };
  }, []);

  return [ref, isHovered];
}
