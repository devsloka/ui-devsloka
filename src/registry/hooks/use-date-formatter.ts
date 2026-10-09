import { useCallback, useMemo } from "react";

export type DateInput = Date | string | number;

export type UseDateFormatterOptions = Intl.DateTimeFormatOptions & {
  /** BCP 47 locale, e.g. "en-US". Defaults to the runtime locale. */
  locale?: string;
  /** Options for relative formatting ("3 days ago"). */
  relative?: Intl.RelativeTimeFormatOptions;
};

export type UseDateFormatterReturn = {
  /** Format a date with `Intl.DateTimeFormat`. Returns "" for invalid input. */
  format: (date: DateInput) => string;
  /**
   * Format a date relative to `now` with `Intl.RelativeTimeFormat` ("in 2 hours").
   * Pass `now` explicitly during render to keep server and client output identical.
   */
  formatRelative: (date: DateInput, now: DateInput) => string;
  /** Format a date range with `formatRange`. */
  formatRange: (start: DateInput, end: DateInput) => string;
};

const UNITS: [Intl.RelativeTimeFormatUnit, number][] = [
  ["year", 60 * 60 * 24 * 365],
  ["month", 60 * 60 * 24 * 30],
  ["week", 60 * 60 * 24 * 7],
  ["day", 60 * 60 * 24],
  ["hour", 60 * 60],
  ["minute", 60],
  ["second", 1],
];

const toDate = (value: DateInput) =>
  value instanceof Date ? value : new Date(value);

/**
 * Memoized, locale-aware date formatting built on `Intl.DateTimeFormat` and `Intl.RelativeTimeFormat`.
 *
 * @example
 * const { format, formatRelative } = useDateFormatter({ locale: "en-GB", dateStyle: "long" });
 * format("2024-05-01"); // "1 May 2024"
 */
export function useDateFormatter({
  locale,
  relative,
  ...options
}: UseDateFormatterOptions = {}): UseDateFormatterReturn {
  // Serialize options so inline object literals don't recreate the formatter every render.
  const optionsKey = JSON.stringify(options);
  const relativeKey = JSON.stringify(relative ?? { numeric: "auto" });

  const dateFormatter = useMemo(
    () => new Intl.DateTimeFormat(locale, JSON.parse(optionsKey)),
    [locale, optionsKey],
  );
  const relativeFormatter = useMemo(
    () => new Intl.RelativeTimeFormat(locale, JSON.parse(relativeKey)),
    [locale, relativeKey],
  );

  const format = useCallback(
    (date: DateInput) => {
      const d = toDate(date);
      return Number.isNaN(d.getTime()) ? "" : dateFormatter.format(d);
    },
    [dateFormatter],
  );

  const formatRelative = useCallback(
    (date: DateInput, now: DateInput) => {
      const diff = (toDate(date).getTime() - toDate(now).getTime()) / 1000;
      if (Number.isNaN(diff)) return "";
      for (const [unit, seconds] of UNITS) {
        if (Math.abs(diff) >= seconds || unit === "second") {
          return relativeFormatter.format(Math.round(diff / seconds), unit);
        }
      }
      return "";
    },
    [relativeFormatter],
  );

  const formatRange = useCallback(
    (start: DateInput, end: DateInput) => {
      const a = toDate(start);
      const b = toDate(end);
      if (Number.isNaN(a.getTime()) || Number.isNaN(b.getTime())) return "";
      return dateFormatter.formatRange(a, b);
    },
    [dateFormatter],
  );

  return { format, formatRelative, formatRange };
}
