import { useEffect, useRef, useState, type RefObject } from "react";

/**
 * A key or combo such as `"Enter"`, `"k"`, `"mod+k"`, `"ctrl+shift+p"`.
 * `mod` means Cmd on macOS and Ctrl elsewhere. Matching is case-insensitive.
 */
export type KeyFilter = string | string[];

export type UseKeyPressOptions = {
  /** Element to listen on. Defaults to `window`. */
  target?: RefObject<HTMLElement | null> | Window | Document | null;
  /** Which event fires the handler. Defaults to "keydown". */
  event?: "keydown" | "keyup";
  /** Call `preventDefault()` on matching events. */
  preventDefault?: boolean;
  /** Ignore presses while typing in inputs, textareas and contenteditable. Defaults to `false`. */
  ignoreInputs?: boolean;
  /** Disable the listener. */
  enabled?: boolean;
};

const MODIFIERS = ["ctrl", "shift", "alt", "meta"] as const;

function parseCombo(combo: string) {
  const parts = combo.toLowerCase().split("+");
  // A trailing "+" means the plus key itself, e.g. "shift++".
  const key = combo.endsWith("+") ? "+" : parts.pop()!;
  const mods = new Set(parts.filter(Boolean));
  return { key: key === "space" ? " " : key, mods };
}

function matches(event: KeyboardEvent, combo: string) {
  const { key, mods } = parseCombo(combo);
  const isMac = /Mac|iPhone|iPad/.test(navigator.platform);
  if (mods.has("mod")) {
    mods.delete("mod");
    mods.add(isMac ? "meta" : "ctrl");
  }
  const state = {
    ctrl: event.ctrlKey,
    shift: event.shiftKey,
    alt: event.altKey,
    meta: event.metaKey,
  };
  // Only enforce modifiers when the combo names some; plain "a" still matches with Shift held.
  if (mods.size > 0 && MODIFIERS.some((m) => state[m] !== mods.has(m))) {
    return false;
  }
  return event.key.toLowerCase() === key || event.code.toLowerCase() === key;
}

function isTypingTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false;
  return (
    target.isContentEditable ||
    ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName)
  );
}

function resolveTarget(target: UseKeyPressOptions["target"]) {
  if (target === undefined) return window;
  if (target === null) return null;
  if ("current" in target) return target.current;
  return target;
}

/**
 * Listen for a key or key combo. Returns whether it is currently held down and
 * optionally calls `handler` on each matching press.
 *
 * @example
 * const isShiftHeld = useKeyPress("Shift");
 * useKeyPress("mod+k", () => setOpen(true), { preventDefault: true });
 */
export function useKeyPress(
  keys: KeyFilter,
  handler?: (event: KeyboardEvent) => void,
  {
    target,
    event = "keydown",
    preventDefault = false,
    ignoreInputs = false,
    enabled = true,
  }: UseKeyPressOptions = {},
): boolean {
  const [pressed, setPressed] = useState(false);
  const handlerRef = useRef(handler);
  const keyList = (Array.isArray(keys) ? keys : [keys]).join("\u0000");

  useEffect(() => {
    handlerRef.current = handler;
  }, [handler]);

  useEffect(() => {
    if (!enabled) return;
    const el = resolveTarget(target);
    if (!el) return;
    const combos = keyList.split("\u0000");
    const isMatch = (e: KeyboardEvent) => combos.some((c) => matches(e, c));

    // Tracks whether a matching press is in progress, so keyup only reacts to our combo.
    let isDown = false;

    const onDown = (e: Event) => {
      const ke = e as KeyboardEvent;
      if (ignoreInputs && isTypingTarget(ke.target)) return;
      if (!isMatch(ke)) return;
      if (preventDefault) ke.preventDefault();
      isDown = true;
      setPressed(true);
      if (event === "keydown") handlerRef.current?.(ke);
    };
    const onUp = (e: Event) => {
      const ke = e as KeyboardEvent;
      if (!isDown) return;
      // Release on the main key itself (modifiers may already be up).
      const key = ke.key.toLowerCase();
      const code = ke.code.toLowerCase();
      const released = combos.some((c) => {
        const k = parseCombo(c).key;
        return k === key || k === code;
      });
      if (!released) return;
      isDown = false;
      setPressed(false);
      if (event === "keyup") {
        if (preventDefault) ke.preventDefault();
        handlerRef.current?.(ke);
      }
    };
    const onBlur = () => {
      isDown = false;
      setPressed(false);
    };

    el.addEventListener("keydown", onDown);
    el.addEventListener("keyup", onUp);
    window.addEventListener("blur", onBlur);
    return () => {
      el.removeEventListener("keydown", onDown);
      el.removeEventListener("keyup", onUp);
      window.removeEventListener("blur", onBlur);
    };
  }, [keyList, target, event, preventDefault, ignoreInputs, enabled]);

  return pressed;
}
