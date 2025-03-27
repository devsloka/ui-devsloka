"use client";
import { useMemo } from "react";

export const useDateFormatter = (
  options?: Intl.DateTimeFormatOptions,
  locale?: string
) => {
  const formatter = useMemo(
    () => new Intl.DateTimeFormat(locale, options),
    [locale, options]
  );

  const formatDate = (date: Date | string | number): string => {
    return formatter.format(new Date(date));
  };

  return formatDate;
};
