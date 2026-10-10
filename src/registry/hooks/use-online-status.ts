import { useSyncExternalStore } from "react";

function subscribe(callback: () => void) {
  window.addEventListener("online", callback);
  window.addEventListener("offline", callback);
  return () => {
    window.removeEventListener("online", callback);
    window.removeEventListener("offline", callback);
  };
}

const getSnapshot = () => navigator.onLine;
// Assume online during SSR; the client corrects it after hydration if needed.
const getServerSnapshot = () => true;

/**
 * Whether the browser reports a network connection (`navigator.onLine`), updated live
 * from the `online` / `offline` events.
 *
 * @example
 * const isOnline = useOnlineStatus();
 * if (!isOnline) return <p>You are offline</p>;
 */
export function useOnlineStatus(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
