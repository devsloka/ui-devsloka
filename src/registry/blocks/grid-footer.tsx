"use client";

import { useId, useState, type ComponentProps, type FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export type GridFooterLink = { label: string; href: string };
export type GridFooterColumn = { title: string; links: GridFooterLink[] };
export type GridFooterNewsletterValues = { email: string };

export type GridFooterProps = {
  brand?: string;
  description?: string;
  columns?: GridFooterColumn[];
  newsletterTitle?: string;
  newsletterNote?: string;
  onSubmit?: (values: GridFooterNewsletterValues) => void | Promise<void>;
  year?: number;
} & Omit<ComponentProps<"footer">, "onSubmit">;

const DEFAULT_COLUMNS: GridFooterColumn[] = [
  {
    title: "Product",
    links: [
      { label: "Invoicing", href: "#" },
      { label: "Expenses", href: "#" },
      { label: "Month-end close", href: "#" },
      { label: "Pricing", href: "#" },
    ],
  },
  {
    title: "Help",
    links: [
      { label: "Guides", href: "#" },
      { label: "VAT calendar", href: "#" },
      { label: "Talk to an accountant", href: "#" },
      { label: "Status", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Privacy", href: "#" },
      { label: "Terms", href: "#" },
    ],
  },
];

const linkClass =
  "underline-offset-4 outline-none hover:underline focus-visible:underline focus-visible:ring-2 focus-visible:ring-ring";

/**
 * Strict bordered grid footer: every region sits in a hairline cell,
 * including a newsletter mini-form.
 */
export function GridFooter({
  brand = "Ledgerline",
  description = "Bookkeeping for studios of 2 to 40 people. Invoices out, receipts matched, books closed by the 5th.",
  columns = DEFAULT_COLUMNS,
  newsletterTitle = "The Monthly Close",
  newsletterNote = "One email on the first Monday of the month. Deadlines, rate changes, nothing else.",
  onSubmit,
  year = 2026,
  className,
  ...props
}: GridFooterProps) {
  const inputId = useId();
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const email = String(new FormData(form).get("email") ?? "");
    setState("sending");
    try {
      await onSubmit?.({ email });
      form.reset();
      setState("done");
    } catch {
      setState("idle");
    }
  }

  return (
    <footer
      data-slot="grid-footer"
      className={cn("w-full bg-background text-foreground", className)}
      {...props}
    >
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <div className="grid grid-cols-1 border-l border-t sm:grid-cols-2 lg:grid-cols-4">
          <div className="border-b border-r p-6 sm:col-span-2 lg:col-span-2">
            <h2 className="text-2xl font-semibold tracking-tight">{brand}</h2>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
              {description}
            </p>
          </div>

          <div className="border-b border-r p-6 sm:col-span-2 lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-3">
              <Label
                htmlFor={inputId}
                className="font-mono text-xs uppercase tracking-wider text-muted-foreground"
              >
                {newsletterTitle}
              </Label>
              <div className="flex gap-2">
                <Input
                  id={inputId}
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="you@studio.com"
                  disabled={state === "sending"}
                />
                <Button type="submit" disabled={state === "sending"}>
                  {state === "sending" ? "Subscribing…" : "Subscribe"}
                </Button>
              </div>
              <p aria-live="polite" className="text-xs text-muted-foreground">
                {state === "done"
                  ? "You're on the list. First issue lands next month."
                  : newsletterNote}
              </p>
            </form>
          </div>

          {columns.map((column, index) => (
            <nav
              key={column.title}
              aria-label={column.title}
              className="border-b border-r p-6"
            >
              <p className="flex justify-between font-mono text-xs uppercase tracking-wider text-muted-foreground">
                <span>{column.title}</span>
                <span className="tabular-nums">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </p>
              <ul className="mt-6 space-y-2.5 text-sm">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className={linkClass}>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className="flex flex-col justify-end border-b border-r bg-muted p-6 text-xs text-muted-foreground">
            <p className="tabular-nums">© {year} {brand} Ltd.</p>
            <p className="mt-1">Registered in England, No. 11842907.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
