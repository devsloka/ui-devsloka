import { useEffect, useMemo, useState } from "react";

/**
 * Return a copy of `value` that only updates after it has stopped changing for `delay` ms.
 *
 * @example
 * const debouncedQuery = useDebounce(query, 300);
 */
export function useDebounce<T>(value: T, delay = 500): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}

export type DebouncedFunction<Args extends unknown[]> = ((
  ...args: Args
) => void) & {
  /** Drop the pending call. */
  cancel: () => void;
  /** Run the pending call immediately, if there is one. */
  flush: () => void;
  /** Whether a call is waiting to run. */
  isPending: () => boolean;
};

function createDebounced<Args extends unknown[]>(
  initialCallback: (...args: Args) => void,
  delay: number,
) {
  let invoke = initialCallback;
  let timer: ReturnType<typeof setTimeout> | null = null;
  let pendingArgs: Args | null = null;

  const cancel = () => {
    if (timer) clearTimeout(timer);
    timer = null;
    pendingArgs = null;
  };
  const flush = () => {
    const args = pendingArgs;
    cancel();
    if (args) invoke(...args);
  };
  const debounced = (...args: Args) => {
    if (timer) clearTimeout(timer);
    pendingArgs = args;
    timer = setTimeout(flush, delay);
  };

  return {
    debounced: Object.assign(debounced, {
      cancel,
      flush,
      isPending: () => timer !== null,
    }) as DebouncedFunction<Args>,
    /** Swap in the latest callback without resetting a pending call. */
    setCallback: (next: (...args: Args) => void) => {
      invoke = next;
    },
  };
}

/**
 * Return a stable debounced version of `callback` with `cancel` and `flush` controls.
 * Always invokes the latest `callback`; pending calls are cancelled on unmount.
 *
 * @example
 * const save = useDebouncedCallback((text: string) => api.save(text), 1000);
 * <textarea onChange={(e) => save(e.target.value)} onBlur={save.flush} />
 */
export function useDebouncedCallback<Args extends unknown[]>(
  callback: (...args: Args) => void,
  delay = 500,
): DebouncedFunction<Args> {
  // The debouncer keeps its own "latest callback" slot (a closure, not a ref), updated
  // after each commit, so the returned function stays stable across renders.
  const [initialCallback] = useState(() => callback);
  const { debounced, setCallback } = useMemo(
    () => createDebounced(initialCallback, delay),
    [initialCallback, delay],
  );

  useEffect(() => {
    setCallback(callback);
  }, [setCallback, callback]);

  useEffect(() => debounced.cancel, [debounced]);

  return debounced;
}
