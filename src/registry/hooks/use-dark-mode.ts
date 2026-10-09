import {
  useCallback,
  useEffect,
  useSyncExternalStore,
  type RefObject,
} from "react";

export type Theme = "light" | "dark";

export type UseDarkModeOptions = {
  /** localStorage key used to persist the choice. Defaults to "theme". */
  storageKey?: string;
  /**
   * Element that receives the `dark` class. Defaults to `<html>`. Pass a ref to scope
   * dark mode to a subtree (works with Tailwind's `.dark *` variant).
   */
  element?: RefObject<HTMLElement | null>;
};

export type UseDarkModeReturn = {
  /** Whether dark mode is currently active. */
  isDark: boolean;
  /** The explicit user choice, or `null` when following the system preference. */
  theme: Theme | null;
  /** Set an explicit theme, or `null` to follow the system preference again. */
  setTheme: (theme: Theme | null) => void;
  /** Flip between light and dark (stores an explicit choice). */
  toggle: () => void;
};

const MEDIA_QUERY = "(prefers-color-scheme: dark)";
const CHANGE_EVENT = "devsloka:dark-mode";

// In-memory fallback for when localStorage is unavailable (private mode, blocked storage).
const memory = new Map<string, Theme>();

function readTheme(storageKey: string): Theme | null {
  try {
    const value = window.localStorage.getItem(storageKey);
    return value === "dark" || value === "light" ? value : null;
  } catch {
    return memory.get(storageKey) ?? null;
  }
}

function subscribe(callback: () => void) {
  const media = window.matchMedia(MEDIA_QUERY);
  media.addEventListener("change", callback);
  window.addEventListener("storage", callback);
  window.addEventListener(CHANGE_EVENT, callback);
  return () => {
    media.removeEventListener("change", callback);
    window.removeEventListener("storage", callback);
    window.removeEventListener(CHANGE_EVENT, callback);
  };
}

const getSystemSnapshot = () => window.matchMedia(MEDIA_QUERY).matches;
const getServerFalse = () => false;
const getServerTheme = () => null;

/**
 * Track and toggle dark mode by adding a `dark` class to `<html>`, persisted in localStorage.
 * Follows `prefers-color-scheme` until the user picks a theme.
 *
 * If your app already uses `next-themes`, prefer its `useTheme()` hook instead — it also
 * prevents the flash of the wrong theme before hydration.
 *
 * @example
 * const { isDark, toggle } = useDarkMode();
 * <button onClick={toggle}>{isDark ? "Light" : "Dark"}</button>
 */
export function useDarkMode({
  storageKey = "theme",
  element,
}: UseDarkModeOptions = {}): UseDarkModeReturn {
  const theme = useSyncExternalStore(
    subscribe,
    () => readTheme(storageKey),
    getServerTheme,
  );
  const systemDark = useSyncExternalStore(
    subscribe,
    getSystemSnapshot,
    getServerFalse,
  );
  const isDark = theme ? theme === "dark" : systemDark;

  useEffect(() => {
    const target = element?.current ?? document.documentElement;
    target.classList.toggle("dark", isDark);
    target.style.colorScheme = isDark ? "dark" : "light";
  }, [isDark, element]);

  const setTheme = useCallback(
    (next: Theme | null) => {
      if (next) memory.set(storageKey, next);
      else memory.delete(storageKey);
      try {
        if (next) window.localStorage.setItem(storageKey, next);
        else window.localStorage.removeItem(storageKey);
      } catch {
        // Storage unavailable: the in-memory fallback keeps the choice for this session.
      }
      window.dispatchEvent(new Event(CHANGE_EVENT));
    },
    [storageKey],
  );

  const toggle = useCallback(() => {
    const current = readTheme(storageKey);
    const dark = current ? current === "dark" : getSystemSnapshot();
    setTheme(dark ? "light" : "dark");
  }, [setTheme, storageKey]);

  return { isDark, theme, setTheme, toggle };
}
