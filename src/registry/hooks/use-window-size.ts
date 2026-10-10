import { useSyncExternalStore } from "react";

export type WindowSize = { width: number; height: number };

export type UseWindowSizeOptions = {
  /** Size reported on the server and during hydration. Defaults to 0 x 0. */
  initialSize?: WindowSize;
};

function subscribe(callback: () => void) {
  window.addEventListener("resize", callback);
  return () => window.removeEventListener("resize", callback);
}

const getSnapshot = () => `${window.innerWidth}x${window.innerHeight}`;

/**
 * Track the viewport's inner width and height, updated on resize.
 * Prefer CSS media/container queries for pure layout; use this when JS needs the numbers.
 *
 * @example
 * const { width, height } = useWindowSize();
 */
export function useWindowSize({
  initialSize = { width: 0, height: 0 },
}: UseWindowSizeOptions = {}): WindowSize {
  const serverSnapshot = `${initialSize.width}x${initialSize.height}`;
  const snapshot = useSyncExternalStore(
    subscribe,
    getSnapshot,
    () => serverSnapshot,
  );
  const [width, height] = snapshot.split("x").map(Number);
  return { width, height };
}
