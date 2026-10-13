"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ReceiptText, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

export type ReceiptAmount = { label: React.ReactNode; amount: number };

export type ReceiptPayment = {
  /** Small caption above the code, e.g. "Scan to pay · UPI". */
  label?: React.ReactNode;
  /** Your QR code (an <svg> or <img>). */
  code: React.ReactNode;
  /** Shown under the code, e.g. a UPI ID. */
  id?: React.ReactNode;
};

export type ReceiptPrinterProps = Omit<React.ComponentProps<"section">, "title"> & {
  /** Shown as the badge next to the title, e.g. "#4471". */
  orderId?: React.ReactNode;
  merchant: React.ReactNode;
  /** Lines under the merchant: address, date, table… */
  details?: React.ReactNode[];
  items: ReceiptAmount[];
  /** Added to the subtotal, e.g. service charge and tax. */
  charges?: ReceiptAmount[];
  thankYou?: React.ReactNode;
  payment?: ReceiptPayment;
  /** ISO 4217 code used to format amounts. */
  currency?: string;
  locale?: string;
  /** Time between printed lines, in ms. */
  lineInterval?: number;
  onPrinted?: () => void;
  onTearOff?: () => void;
  title?: React.ReactNode;
};

type Phase = "ready" | "printing" | "printed";

const EASE_OUT = [0.23, 1, 0.32, 1] as const;
const EASE_IN_OUT = [0.77, 0, 0.175, 1] as const;

// Zig-zag torn edges on the top and bottom of the paper.
const PAPER_MASK = [
  "conic-gradient(from 135deg at top, #0000, #000 1deg 89deg, #0000 90deg) top / 10px 5px repeat-x",
  "conic-gradient(from -45deg at bottom, #0000, #000 1deg 89deg, #0000 90deg) bottom / 10px 5px repeat-x",
  "linear-gradient(#000 0 0) center / 100% calc(100% - 10px) no-repeat",
].join(", ");

export function ReceiptPrinter({
  orderId,
  merchant,
  details = [],
  items,
  charges = [],
  thankYou = "Thank you ✦",
  payment,
  currency = "INR",
  locale = "en-IN",
  lineInterval = 140,
  onPrinted,
  onTearOff,
  title = "Receipt",
  className,
  ...props
}: ReceiptPrinterProps) {
  const reduceMotion = useReducedMotion();
  // Lines fed so far. 0 means the printer is idle; the phase follows from the count.
  const [printed, setPrinted] = useState(0);
  // Set when the user acts, so the next control to appear takes focus.
  const moveFocus = useRef(false);
  const focusIfRequested = (element: HTMLButtonElement | null) => {
    if (element && moveFocus.current) {
      moveFocus.current = false;
      element.focus();
    }
  };

  const money = useMemo(
    () => new Intl.NumberFormat(locale, { style: "currency", currency }),
    [locale, currency]
  );
  const subtotal = items.reduce((sum, item) => sum + item.amount, 0);
  const total = charges.reduce((sum, charge) => sum + charge.amount, subtotal);

  // Each entry is one printed line; `rule` draws a dashed divider above it.
  const lines: { node: React.ReactNode; rule?: boolean }[] = [
    { node: <p className="text-center text-base font-bold tracking-[0.2em] text-neutral-900">{merchant}</p> },
    ...details.map((detail) => ({
      node: <p className="text-center tracking-wider text-neutral-500 uppercase">{detail}</p>,
    })),
    ...items.map((item, i) => ({ node: <Row {...item} money={money} />, rule: i === 0 })),
    { node: <Row label="Subtotal" amount={subtotal} money={money} />, rule: true },
    ...charges.map((charge) => ({ node: <Row {...charge} money={money} /> })),
    {
      node: (
        <Row
          label="TOTAL"
          amount={total}
          money={money}
          className="text-sm font-bold text-neutral-900"
        />
      ),
    },
    { node: <p className="text-center tracking-[0.15em] text-neutral-800">{thankYou}</p>, rule: true },
    ...(payment
      ? [
          ...(payment.label
            ? [{ node: <p className="text-center tracking-[0.2em] text-neutral-400 uppercase">{payment.label}</p> }]
            : []),
          {
            node: (
              <div className="mx-auto w-fit rounded-lg border border-neutral-200 bg-white p-2">
                {payment.code}
              </div>
            ),
          },
          ...(payment.id ? [{ node: <p className="text-center text-neutral-700">{payment.id}</p> }] : []),
        ]
      : []),
  ];
  const lineCount = lines.length;
  const phase: Phase = printed === 0 ? "ready" : printed < lineCount ? "printing" : "printed";

  // Feed one line per tick until the receipt is complete.
  useEffect(() => {
    if (phase !== "printing") return;
    const timer = setTimeout(() => {
      const next = printed + 1;
      setPrinted(next);
      if (next === lineCount) onPrinted?.();
    }, lineInterval);
    return () => clearTimeout(timer);
  }, [phase, printed, lineCount, lineInterval, onPrinted]);

  const print = () => {
    moveFocus.current = true;
    // Reduced motion prints the whole receipt at once.
    const first = reduceMotion ? lineCount : 1;
    setPrinted(first);
    if (first === lineCount) onPrinted?.();
  };
  const tearOff = () => {
    moveFocus.current = true;
    setPrinted(0);
    onTearOff?.();
  };

  const summary = items.map((item, i) => (
    <span key={i}>
      {i > 0 && " · "}
      {item.label}
    </span>
  ));

  // One timing for every layout change: the card resizing and its parts moving with it.
  const layoutTransition = reduceMotion
    ? { duration: 0 }
    : phase === "printing"
      ? // The paper feeds at a steady rate, one line per tick.
        { duration: lineInterval / 1000, ease: "linear" as const }
      : { duration: 0.3, ease: EASE_IN_OUT };

  return (
    <section
      data-slot="receipt-printer"
      aria-label={typeof title === "string" ? title : "Receipt"}
      className={cn("w-full max-w-sm text-foreground", className)}
      {...props}
    >
      {/* The card animates its size with a layout animation; children opt in so they
          aren't stretched. Radius lives in style so Motion can correct it while scaling. */}
      <motion.div
        layout
        transition={{ layout: layoutTransition }}
        style={{ borderRadius: 32 }}
        className={cn(
          // The card edge clips the paper: it feeds out while printing and slides out when torn.
          "overflow-hidden bg-muted p-2.5 shadow-xl shadow-black/5 ring-1 ring-black/5 dark:ring-white/10"
        )}
      >
        <motion.header
          layout="position"
          transition={{ layout: layoutTransition }}
          className="flex h-12 items-center justify-between gap-3 px-3.5"
        >
          <div className="flex items-center gap-2.5">
            <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
            {orderId && (
              <span className="rounded-full bg-foreground/[0.07] px-2.5 py-0.5 font-mono text-xs text-muted-foreground">
                {orderId}
              </span>
            )}
          </div>
          {phase === "printed" ? (
            <button
              ref={focusIfRequested}
              type="button"
              onClick={tearOff}
              className="inline-flex h-9 cursor-pointer items-center gap-1.5 rounded-full border bg-background px-3.5 text-sm font-medium shadow-sm outline-none transition-[background-color,transform] duration-[160ms] ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-background/70 focus-visible:ring-2 focus-visible:ring-ring active:scale-[0.97] motion-reduce:active:scale-100"
            >
              <RotateCcw aria-hidden className="size-3.5" />
              Tear off
            </button>
          ) : (
            <p
              className={cn(
                "text-sm text-muted-foreground",
                phase === "printing" && "font-mono tabular-nums"
              )}
            >
              {phase === "printing" ? `printing ${printed}/${lineCount}` : "Ready"}
            </p>
          )}
        </motion.header>

        {/* popLayout lifts the leaving view out of the flow, so the next one takes its
            place immediately and the card resizes while the old one animates away. */}
        <div className="relative">
          <AnimatePresence mode="popLayout" initial={false}>
            {phase === "ready" ? (
              <motion.div
                key="ready"
                layout="position"
                initial={{ opacity: 0 }}
                // Waits a beat so a torn receipt clears before the panel shows through it.
                animate={{ opacity: 1, transition: { duration: 0.2, ease: EASE_OUT, delay: 0.1 } }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2, ease: EASE_OUT, layout: layoutTransition }}
                className="flex flex-col items-center rounded-3xl bg-card px-6 py-10 text-center shadow-sm"
              >
                <span className="flex size-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
                  <ReceiptText aria-hidden className="size-5" />
                </span>
                <p className="mt-5 text-lg font-semibold tracking-tight">Order ready</p>
                <p className="mt-1 text-sm text-muted-foreground">{summary}</p>
                <button
                  ref={focusIfRequested}
                  type="button"
                  onClick={print}
                  className="mt-6 inline-flex h-11 cursor-pointer items-center rounded-full bg-foreground px-6 text-sm font-medium text-background outline-none transition-[opacity,transform] duration-[160ms] ease-[cubic-bezier(0.23,1,0.32,1)] hover:opacity-90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card active:scale-[0.97] motion-reduce:active:scale-100"
                >
                  Print receipt
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="paper"
                layout="position"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                // Torn off the way real receipts are: pulled down against the blade, sliding out
                // through the bottom of the card while the ready panel fades in beneath it.
                exit={
                  reduceMotion
                    ? { opacity: 0 }
                    : { opacity: 0, transform: "translateY(48px) rotate(1.5deg)" }
                }
                transition={{ duration: 0.3, ease: EASE_OUT, layout: layoutTransition }}
                aria-busy={phase === "printing"}
                // Above its siblings, so it covers the footer as it feeds and stays on top as it leaves.
                className="relative z-10 mx-1 bg-white px-6 py-6 font-mono text-[0.6875rem] text-neutral-600"
                style={{ mask: PAPER_MASK, WebkitMask: PAPER_MASK }}
              >
                <div className="flex flex-col gap-2">
                  {lines.slice(0, printed).map((line, i) => (
                    <div
                      key={i}
                      className={cn(
                        // Each new line inks in as it mounts.
                        "transition-[opacity,filter] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] starting:opacity-0 starting:blur-[2px] motion-reduce:starting:blur-none",
                        line.rule && "mt-1 border-t border-dashed border-neutral-300 pt-3"
                      )}
                    >
                      {line.node}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <motion.p
          layout="position"
          transition={{ layout: layoutTransition }}
          aria-live="polite"
          className="py-4 text-center text-sm text-muted-foreground"
        >
          {phase === "ready"
            ? "Tap print to issue the receipt"
            : phase === "printing"
              ? "Printing…"
              : "Tear off the receipt to reset"}
        </motion.p>
      </motion.div>
    </section>
  );
}

function Row({
  label,
  amount,
  money,
  className,
}: ReceiptAmount & { money: Intl.NumberFormat; className?: string }) {
  return (
    <p className={cn("flex items-baseline justify-between gap-4", className)}>
      <span>{label}</span>
      <span className="tabular-nums">{money.format(amount)}</span>
    </p>
  );
}
