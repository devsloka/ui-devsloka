import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useSyncExternalStore,
} from "react";

export type SetValue<T> = (value: T | ((previous: T) => T)) => void;

export type UseLocalStorageOptions<T> = {
  /** Convert a value to a string. Defaults to `JSON.stringify`. */
  serialize?: (value: T) => string;
  /** Parse a stored string. Defaults to `JSON.parse`. */
  deserialize?: (raw: string) => T;
};

export type UseLocalStorageReturn<T> = [
  value: T,
  setValue: SetValue<T>,
  remove: () => void,
];

// Notifies other hook instances in the same tab (the native "storage" event only fires in other tabs).
const LOCAL_EVENT = "devsloka:local-storage";

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(LOCAL_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(LOCAL_EVENT, callback);
  };
}

function readRaw(key: string): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

/**
 * `useState` that persists to localStorage as JSON and stays in sync across tabs and
 * across every component using the same key. Returns `initialValue` on the server.
 *
 * @example
 * const [todos, setTodos, clearTodos] = useLocalStorage<string[]>("todos", []);
 * setTodos((prev) => [...prev, "Write docs"]);
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T,
  {
    serialize = JSON.stringify,
    deserialize = JSON.parse,
  }: UseLocalStorageOptions<T> = {},
): UseLocalStorageReturn<T> {
  // Subscribe to the raw string: it is a stable primitive, unlike a freshly parsed object.
  const raw = useSyncExternalStore(
    subscribe,
    () => readRaw(key),
    () => null,
  );

  const value = useMemo<T>(() => {
    if (raw === null) return initialValue;
    try {
      return deserialize(raw);
    } catch {
      return initialValue;
    }
    // initialValue/deserialize are treated as stable; inline literals must not reparse each render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [raw]);

  // Latest options for the stable setter (inline values would otherwise change its identity).
  const optionsRef = useRef({ initialValue, serialize, deserialize });
  useEffect(() => {
    optionsRef.current = { initialValue, serialize, deserialize };
  });

  const setValue = useCallback<SetValue<T>>(
    (next) => {
      const { initialValue, serialize, deserialize } = optionsRef.current;
      const currentRaw = readRaw(key);
      let current = initialValue;
      if (currentRaw !== null) {
        try {
          current = deserialize(currentRaw);
        } catch {
          // Corrupt stored value: fall back to initialValue.
        }
      }
      const resolved =
        next instanceof Function ? (next as (prev: T) => T)(current) : next;
      try {
        window.localStorage.setItem(key, serialize(resolved));
      } catch (error) {
        console.warn(`useLocalStorage: could not write "${key}"`, error);
      }
      window.dispatchEvent(new Event(LOCAL_EVENT));
    },
    [key],
  );

  const remove = useCallback(() => {
    try {
      window.localStorage.removeItem(key);
    } catch {
      // Storage unavailable: nothing to remove.
    }
    window.dispatchEvent(new Event(LOCAL_EVENT));
  }, [key]);

  return [value, setValue, remove];
}
