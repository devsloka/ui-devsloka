import { useCallback, useEffect, useRef, useState } from "react";

export type UseAnimationOptions = {
  /** How long the animating state stays `true`, in ms. Defaults to 300. */
  duration?: number;
  /** Called when the animation window ends. */
  onComplete?: () => void;
};

export type UseAnimationReturn = {
  /** `true` while the animation window is running. */
  isAnimating: boolean;
  /** Start (or restart) the animation window. */
  start: () => void;
  /** End the animation window immediately. */
  stop: () => void;
};

/**
 * Toggle a short-lived "animating" flag that turns itself off after `duration` ms.
 * Useful for one-shot CSS animations (shake, pulse, flash) triggered by events.
 *
 * @example
 * const { isAnimating, start } = useAnimation({ duration: 500 });
 * <div className={isAnimating ? "animate-bounce" : ""} onClick={start} />
 */
export function useAnimation({
  duration = 300,
  onComplete,
}: UseAnimationOptions = {}): UseAnimationReturn {
  // `run` increments on every start so restarting while animating resets the timer.
  const [run, setRun] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    if (!isAnimating) return;
    const timer = setTimeout(() => {
      setIsAnimating(false);
      onCompleteRef.current?.();
    }, duration);
    return () => clearTimeout(timer);
  }, [isAnimating, run, duration]);

  const start = useCallback(() => {
    setIsAnimating(true);
    setRun((r) => r + 1);
  }, []);

  const stop = useCallback(() => setIsAnimating(false), []);

  return { isAnimating, start, stop };
}
