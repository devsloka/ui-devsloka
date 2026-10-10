import { useCallback, useEffect, useRef, useState } from "react";

export type FetchStatus = "idle" | "loading" | "success" | "error";

export type UseFetchOptions<T> = Omit<RequestInit, "signal"> & {
  /** Skip the request while `false` (status stays "idle"). Defaults to `true`. */
  enabled?: boolean;
  /** Parse the response. Defaults to `response.json()`. */
  parse?: (response: Response) => Promise<T>;
};

export type UseFetchReturn<T> = {
  status: FetchStatus;
  data: T | undefined;
  error: Error | null;
  isLoading: boolean;
  /** Re-run the request with the same URL and options. */
  refetch: () => void;
};

type State<T> = {
  key: string | null;
  status: FetchStatus;
  data: T | undefined;
  error: Error | null;
};

/**
 * Fetch JSON (or anything via `parse`) with status, error, abort-on-change and `refetch`.
 * Responses that arrive after the URL changes or the component unmounts are ignored;
 * `data` keeps the last successful result while a new request is loading.
 *
 * @example
 * const { status, data, error, refetch } = useFetch<User[]>("/api/users");
 */
export function useFetch<T = unknown>(
  url: string | null | undefined,
  { enabled = true, parse, ...init }: UseFetchOptions<T> = {},
): UseFetchReturn<T> {
  const [attempt, setAttempt] = useState(0);
  const [state, setState] = useState<State<T>>({
    key: null,
    status: "idle",
    data: undefined,
    error: null,
  });

  // Keep the latest init/parse without making them effect dependencies
  // (inline objects would otherwise refetch on every render).
  const initRef = useRef(init);
  const parseRef = useRef(parse);
  useEffect(() => {
    initRef.current = init;
    parseRef.current = parse;
  });

  const active = enabled && !!url;
  const key = active ? `${url}#${attempt}` : null;

  useEffect(() => {
    if (!active || !url || !key) return;
    const controller = new AbortController();
    let ignore = false;

    fetch(url, { ...initRef.current, signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }
        const parseFn = parseRef.current ?? ((r: Response) => r.json());
        return (await parseFn(response)) as T;
      })
      .then((data) => {
        if (!ignore) setState({ key, status: "success", data, error: null });
      })
      .catch((err: unknown) => {
        if (ignore || controller.signal.aborted) return;
        setState((prev) => ({
          key,
          status: "error",
          data: prev.data,
          error: err instanceof Error ? err : new Error(String(err)),
        }));
      });

    return () => {
      ignore = true;
      controller.abort();
    };
  }, [active, url, key]);

  const refetch = useCallback(() => setAttempt((n) => n + 1), []);

  // Derive "loading" during render: a request is in flight whenever the settled
  // result belongs to a different key than the current one.
  const status: FetchStatus = !active
    ? "idle"
    : state.key === key
      ? state.status
      : "loading";

  return {
    status,
    data: state.data,
    error: status === "error" ? state.error : null,
    isLoading: status === "loading",
    refetch,
  };
}
