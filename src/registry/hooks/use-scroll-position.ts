import { useCallback, useSyncExternalStore, type RefObject } from "react";

export type ScrollPosition = { x: number; y: number };

export type UseScrollPositionOptions = {
  /** Scrollable element to track. Defaults to the window. */
  target?: RefObject<HTMLElement | null>;
};

const SERVER_SNAPSHOT = "0,0";

const getElement = (target?: RefObject<HTMLElement | null>) =>
  target?.current ?? null;

/**
 * Track the scroll offset of the window or a scrollable element. Returns `{ x: 0, y: 0 }`
 * on the server and until the element mounts.
 *
 * @example
 * const { y } = useScrollPosition();
 * const showBackToTop = y > 400;
 */
export function useScrollPosition({
  target,
}: UseScrollPositionOptions = {}): ScrollPosition {
  const subscribe = useCallback(
    (callback: () => void) => {
      const el: HTMLElement | Window = getElement(target) ?? window;
      el.addEventListener("scroll", callback, { passive: true });
      window.addEventListener("resize", callback);
      return () => {
        el.removeEventListener("scroll", callback);
        window.removeEventListener("resize", callback);
      };
    },
    [target],
  );

  // Snapshot as a string so identical positions compare equal between reads.
  const getSnapshot = useCallback(() => {
    const el = getElement(target);
    if (el) return `${el.scrollLeft},${el.scrollTop}`;
    return target ? SERVER_SNAPSHOT : `${window.scrollX},${window.scrollY}`;
  }, [target]);

  const snapshot = useSyncExternalStore(
    subscribe,
    getSnapshot,
    () => SERVER_SNAPSHOT,
  );
  const [x, y] = snapshot.split(",").map(Number);
  return { x, y };
}
