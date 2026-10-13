"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import { AlarmClock, Check, CirclePlus, Copy, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

export type AvailabilityCardImage = { src: string; alt: string };

export type AvailabilityCardProps = Omit<
  React.ComponentProps<"article">,
  "title"
> & {
  name: React.ReactNode;
  role?: React.ReactNode;
  avatar?: AvailabilityCardImage;
  /** Shows the pulsing dot in `accent`; false shows a grey dot. */
  available?: boolean;
  statusLabel?: React.ReactNode;
  /** IANA time zone, e.g. "Asia/Kolkata". Shows a live clock; omit to hide it. */
  timeZone?: string;
  /** Renders "Hire Me" as a link. Takes precedence over `onHire`. */
  hireHref?: string;
  onHire?: () => void;
  hireLabel?: React.ReactNode;
  /** Shows the copy button when set. */
  email?: string;
  onCopy?: (email: string) => void;
  copyLabel?: React.ReactNode;
  copiedLabel?: React.ReactNode;
  /** Text on the accent strip under the card. */
  note?: React.ReactNode;
  noteIcon?: React.ReactNode;
  /** Any CSS color. Used for the strip and the availability dot. */
  accent?: string;
};

const COPIED_RESET_MS = 2000;

export function AvailabilityCard({
  name,
  role,
  avatar,
  available = true,
  statusLabel = available ? "Available for work" : "Not available",
  timeZone,
  hireHref,
  onHire,
  hireLabel = "Hire Me",
  email,
  onCopy,
  copyLabel = "Copy Email",
  copiedLabel = "Copied!",
  note,
  noteIcon = <Zap aria-hidden className="size-4" />,
  accent = "#A8F25F",
  className,
  style,
  ...props
}: AvailabilityCardProps) {
  const time = useLocalTime(timeZone);
  const { copied, copy } = useCopyToClipboard();

  const handleCopy = async () => {
    if (!email) return;
    if (await copy(email)) onCopy?.(email);
  };

  const hireContent = (
    <>
      <CirclePlus aria-hidden className="size-5" />
      {hireLabel}
    </>
  );

  return (
    <article
      data-slot="availability-card"
      style={
        { "--availability-accent": accent, ...style } as React.CSSProperties
      }
      className={cn(
        "w-full max-w-xl rounded-[2.5rem] bg-blue-600 shadow-xl shadow-black/10 p-0.5",
        className,
      )}
      {...props}
    >
      <div className="rounded-[2.5rem] bg-neutral-900 p-6 text-white shadow-[0_12px_24px_-12px_rgba(0,0,0,0.5)] sm:p-8">
        <div className="flex items-center justify-between gap-4 text-sm text-white/55 sm:text-base">
          <p className="flex items-center gap-2.5">
            <StatusDot available={available} />
            {statusLabel}
          </p>
          {timeZone && (
            <p className="flex items-center gap-1.5 tabular-nums">
              <AlarmClock aria-hidden className="size-4" />
              {/* Empty until mounted: the server can't know the visitor's clock. */}
              <span className="sr-only">Local time </span>
              <span className="min-w-[4.5ch]">{time ?? " "}</span>
            </p>
          )}
        </div>

        <div className="mt-7 flex items-center gap-4 sm:gap-5">
          {avatar && (
            <Image
              src={avatar.src}
              alt={avatar.alt}
              width={80}
              height={80}
              className="size-16 shrink-0 rounded-full object-cover sm:size-20"
            />
          )}
          <div className="min-w-0">
            <h3 className="truncate text-2xl leading-tight tracking-[-0.01em] sm:text-[2rem]">
              {name}
            </h3>
            {role && (
              <p className="truncate text-base text-white/50 sm:text-lg">
                {role}
              </p>
            )}
          </div>
        </div>

        {(hireHref || onHire || email) && (
          <div className="mt-8 grid grid-cols-1 gap-3 min-[420px]:grid-cols-2 sm:gap-4">
            {hireHref ? (
              <a
                href={hireHref}
                className={cn(
                  buttonClass,
                  "bg-neutral-600 hover:bg-neutral-500",
                )}
              >
                {hireContent}
              </a>
            ) : onHire ? (
              <button
                type="button"
                onClick={onHire}
                className={cn(
                  buttonClass,
                  "bg-neutral-600 hover:bg-neutral-500",
                )}
              >
                {hireContent}
              </button>
            ) : null}

            {email && (
              <button
                type="button"
                onClick={handleCopy}
                className={cn(
                  buttonClass,
                  "bg-neutral-800 hover:bg-neutral-700",
                )}
              >
                {/* Both states share one cell, so the button never changes size. */}
                <span className="grid place-items-center">
                  <SwapLabel visible={!copied}>
                    <Copy aria-hidden className="size-5" />
                    {copyLabel}
                  </SwapLabel>
                  <SwapLabel visible={copied}>
                    <Check aria-hidden className="size-5" />
                    {copiedLabel}
                  </SwapLabel>
                </span>
              </button>
            )}
          </div>
        )}
        <span role="status" className="sr-only">
          {copied ? "Email copied to clipboard" : ""}
        </span>
      </div>

      {note && (
        <p className="flex items-center justify-center gap-2 px-6 pt-4 pb-5 text-center text-base font-medium text-foreground">
          {noteIcon}
          {note}
        </p>
      )}
    </article>
  );
}

// Raised, tactile buttons: a top highlight, a soft drop shadow and a quick press dip.
const buttonClass = cn(
  "inline-flex h-14 cursor-pointer items-center justify-center gap-2.5 rounded-2xl px-5 text-lg font-medium text-white outline-none",
  "shadow-[inset_0_1px_0_rgb(255_255_255/0.08),0_10px_20px_-8px_rgb(0_0_0/0.6)] ring-1 ring-white/5",
  "transition-[background-color,transform] duration-[160ms] ease-[cubic-bezier(0.23,1,0.32,1)]",
  "active:scale-[0.97] motion-reduce:active:scale-100",
  "focus-visible:ring-2 focus-visible:ring-white/70",
);

function SwapLabel({
  visible,
  children,
}: {
  visible: boolean;
  children: React.ReactNode;
}) {
  return (
    <span
      aria-hidden={!visible}
      className={cn(
        "inline-flex items-center gap-2.5 [grid-area:1/1]",
        "transition-[opacity,filter] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)]",
        visible
          ? "opacity-100"
          : "opacity-0 blur-[2px] motion-reduce:blur-none",
      )}
    >
      {children}
    </span>
  );
}

function StatusDot({ available }: { available: boolean }) {
  return (
    <span aria-hidden className="relative flex size-2">
      {available && (
        <span className="absolute inset-0 animate-ping rounded-full bg-[var(--availability-accent)] opacity-60 [animation-duration:2s] motion-reduce:hidden" />
      )}
      <span
        className={cn(
          "relative size-2 rounded-full",
          available ? "bg-[var(--availability-accent)]" : "bg-neutral-500",
        )}
      />
    </span>
  );
}

// Formats "8:30PM" in a time zone, re-rendering on each minute boundary.
function useLocalTime(timeZone: string | undefined) {
  return useSyncExternalStore(
    subscribeToMinutes,
    () => (timeZone ? formatTime(timeZone) : null),
    () => null,
  );
}

function subscribeToMinutes(onTick: () => void) {
  let interval: ReturnType<typeof setInterval> | undefined;
  const timeout = setTimeout(
    () => {
      onTick();
      interval = setInterval(onTick, 60_000);
    },
    60_000 - (Date.now() % 60_000),
  );
  return () => {
    clearTimeout(timeout);
    clearInterval(interval);
  };
}

const formatters = new Map<string, Intl.DateTimeFormat>();

function formatTime(timeZone: string) {
  let formatter = formatters.get(timeZone);
  if (!formatter) {
    formatter = new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "2-digit",
      timeZone,
    });
    formatters.set(timeZone, formatter);
  }
  return formatter
    .formatToParts(new Date())
    .filter((part) => part.type !== "literal" || part.value === ":")
    .map((part) => part.value)
    .join("");
}

function useCopyToClipboard() {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );

  useEffect(() => () => clearTimeout(timeoutRef.current), []);

  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      return false;
    }
    setCopied(true);
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setCopied(false), COPIED_RESET_MS);
    return true;
  };

  return { copied, copy };
}
