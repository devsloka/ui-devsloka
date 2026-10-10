import { useEffect, useRef, type RefObject } from "react";

export type OutsideEvent = PointerEvent | TouchEvent;

export type UseOnClickOutsideOptions = {
  /** Disable the listener without unmounting. Defaults to `true`. */
  enabled?: boolean;
};

/**
 * Call `handler` when a pointer or touch starts outside the referenced element(s).
 * Pass an array of refs to treat several elements (e.g. a trigger and its popover) as "inside".
 *
 * @example
 * const ref = useRef<HTMLDivElement>(null);
 * useOnClickOutside(ref, () => setOpen(false));
 */
export function useOnClickOutside(
  refs: RefObject<HTMLElement | null> | RefObject<HTMLElement | null>[],
  handler: (event: OutsideEvent) => void,
  { enabled = true }: UseOnClickOutsideOptions = {},
): void {
  const handlerRef = useRef(handler);
  const refsRef = useRef(refs);

  useEffect(() => {
    handlerRef.current = handler;
    refsRef.current = refs;
  });

  useEffect(() => {
    if (!enabled) return;

    const listener = (event: OutsideEvent) => {
      const target = event.target;
      if (!(target instanceof Node) || !target.isConnected) return;
      const list = Array.isArray(refsRef.current)
        ? refsRef.current
        : [refsRef.current];
      const inside = list.some((ref) => ref.current?.contains(target));
      if (!inside) handlerRef.current(event);
    };

    document.addEventListener("pointerdown", listener);
    document.addEventListener("touchstart", listener, { passive: true });
    return () => {
      document.removeEventListener("pointerdown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [enabled]);
}
