import { useState } from "react";

/**
 * Return the value from the previous render where `value` was different, or `undefined`
 * before the first change.
 *
 * Implemented with state instead of the classic ref-read-during-render pattern, which
 * breaks under concurrent rendering and the React Compiler. Comparison uses `Object.is`.
 *
 * @example
 * const prevCount = usePrevious(count);
 */
export function usePrevious<T>(value: T): T | undefined {
  const [current, setCurrent] = useState(value);
  const [previous, setPrevious] = useState<T | undefined>(undefined);

  // "Adjusting state when a prop changes": React re-renders immediately with the
  // updated state, before committing, so consumers never see a stale pair.
  if (!Object.is(value, current)) {
    setPrevious(current);
    setCurrent(value);
  }

  return previous;
}
