import { useCallback, useMemo, useSyncExternalStore } from "react";

export type DeviceType = "mobile" | "tablet" | "desktop";
export type OperatingSystem =
  "ios" | "android" | "windows" | "macos" | "linux" | "unknown";

export type UseDeviceDetectionOptions = {
  /** Viewport width (px) where tablet starts. Defaults to 768. */
  tabletBreakpoint?: number;
  /** Viewport width (px) where desktop starts. Defaults to 1024. */
  desktopBreakpoint?: number;
};

export type DeviceInfo = {
  /** Layout class derived from viewport width media queries. */
  device: DeviceType;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  /** Primary input is touch-like (`pointer: coarse`). */
  isTouch: boolean;
  /** Primary input can hover (`hover: hover`). */
  canHover: boolean;
  /** Best-effort OS guess from the user agent. "unknown" on the server. */
  os: OperatingSystem;
};

function subscribeToQueries(queries: string[]) {
  return (callback: () => void) => {
    const lists = queries.map((q) => window.matchMedia(q));
    lists.forEach((l) => l.addEventListener("change", callback));
    return () =>
      lists.forEach((l) => l.removeEventListener("change", callback));
  };
}

function detectOs(): OperatingSystem {
  const ua = navigator.userAgent;
  if (/iPhone|iPad|iPod/i.test(ua)) return "ios";
  // iPadOS 13+ reports itself as macOS; touch support gives it away.
  if (/Macintosh/i.test(ua) && navigator.maxTouchPoints > 1) return "ios";
  if (/Android/i.test(ua)) return "android";
  if (/Windows/i.test(ua)) return "windows";
  if (/Mac OS X|Macintosh/i.test(ua)) return "macos";
  if (/Linux/i.test(ua)) return "linux";
  return "unknown";
}

const noopSubscribe = () => () => {};
const getServerOs = (): OperatingSystem => "unknown";

/**
 * Classify the current device as mobile / tablet / desktop using viewport media queries,
 * plus pointer and hover capabilities. Updates live when the viewport changes.
 *
 * Server render (and the first client render) reports `desktop` with a fine pointer.
 *
 * @example
 * const { isMobile, isTouch } = useDeviceDetection();
 */
export function useDeviceDetection({
  tabletBreakpoint = 768,
  desktopBreakpoint = 1024,
}: UseDeviceDetectionOptions = {}): DeviceInfo {
  const queries = useMemo(
    () => [
      `(min-width: ${tabletBreakpoint}px)`,
      `(min-width: ${desktopBreakpoint}px)`,
      "(pointer: coarse)",
      "(hover: hover)",
    ],
    [tabletBreakpoint, desktopBreakpoint],
  );
  const subscribe = useMemo(() => subscribeToQueries(queries), [queries]);
  // Encode all query results as one string so the snapshot is a stable primitive.
  const getSnapshot = useCallback(
    () =>
      queries.map((q) => (window.matchMedia(q).matches ? "1" : "0")).join(""),
    [queries],
  );
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, () => "1101");
  const os = useSyncExternalStore(noopSubscribe, detectOs, getServerOs);

  const [tablet, desktop, coarse, hover] = snapshot
    .split("")
    .map((c) => c === "1");
  const device: DeviceType = desktop ? "desktop" : tablet ? "tablet" : "mobile";

  return {
    device,
    isMobile: device === "mobile",
    isTablet: device === "tablet",
    isDesktop: device === "desktop",
    isTouch: coarse,
    canHover: hover,
    os,
  };
}
