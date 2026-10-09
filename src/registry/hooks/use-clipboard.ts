import { useCallback, useEffect, useRef, useState } from "react";

export type UseClipboardOptions = {
  /** How long `copied` stays `true` after a successful copy, in ms. Defaults to 2000. */
  timeout?: number;
};

export type UseClipboardReturn = {
  /** `true` for `timeout` ms after a successful copy. */
  copied: boolean;
  /** The last error thrown while copying, if any. */
  error: Error | null;
  /** Copy text to the clipboard. Resolves to `true` on success. */
  copy: (text: string) => Promise<boolean>;
  /** Reset `copied` and `error`. */
  reset: () => void;
};

function legacyCopy(text: string): boolean {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  try {
    return document.execCommand("copy");
  } finally {
    document.body.removeChild(textarea);
  }
}

/**
 * Copy text to the clipboard with a temporary `copied` flag for UI feedback.
 * Uses the async Clipboard API and falls back to `execCommand("copy")` in insecure contexts.
 *
 * @example
 * const { copied, copy } = useClipboard();
 * <button onClick={() => copy("npm i devsloka")}>{copied ? "Copied" : "Copy"}</button>
 */
export function useClipboard({
  timeout = 2000,
}: UseClipboardOptions = {}): UseClipboardReturn {
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimer = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = null;
  }, []);

  useEffect(() => clearTimer, [clearTimer]);

  const copy = useCallback(
    async (text: string) => {
      clearTimer();
      try {
        if (navigator.clipboard?.writeText && window.isSecureContext) {
          await navigator.clipboard.writeText(text);
        } else if (!legacyCopy(text)) {
          throw new Error("Copy command was rejected");
        }
        setError(null);
        setCopied(true);
        timerRef.current = setTimeout(() => setCopied(false), timeout);
        return true;
      } catch (err) {
        setError(err instanceof Error ? err : new Error(String(err)));
        setCopied(false);
        return false;
      }
    },
    [clearTimer, timeout],
  );

  const reset = useCallback(() => {
    clearTimer();
    setCopied(false);
    setError(null);
  }, [clearTimer]);

  return { copied, error, copy, reset };
}
