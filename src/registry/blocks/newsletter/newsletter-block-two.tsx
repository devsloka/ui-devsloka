"use client";

import { useId, useState, type ComponentProps, type FormEvent } from "react";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export type NewsletterIssue = {
  number: number;
  title: string;
  /** Display date, e.g. "2 Oct 2026". */
  date: string;
  href?: string;
};

export type NewsletterBlockTwoProps = Omit<ComponentProps<"section">, "onSubmit"> & {
  eyebrow?: string;
  title?: string;
  description?: string;
  /** Recent issues listed as proof of what subscribers get. */
  issues?: NewsletterIssue[];
  footnote?: string;
  submitLabel?: string;
  successMessage?: string;
  onSubmit?: (values: { email: string }) => void | Promise<void>;
};

const DEFAULT_ISSUES: NewsletterIssue[] = [
  { number: 48, title: "Why we deleted our onboarding checklist", date: "2 Oct 2026", href: "#" },
  { number: 47, title: "A year of shipping on Thursdays only", date: "18 Sep 2026", href: "#" },
  { number: 46, title: "The support inbox as a product roadmap", date: "4 Sep 2026", href: "#" },
];

const DEFAULTS = {
  eyebrow: "Issue 48 · Every other Thursday",
  title: "Field notes on building calm software.",
  description:
    "A short letter from the people making Northwind: what we shipped, what we got wrong, and one idea worth stealing. Read in about four minutes.",
  footnote: "2,900 readers. No tracking pixels, one click to unsubscribe.",
  submitLabel: "Subscribe",
  successMessage: "You're in. The next issue lands on Thursday.",
};

type Status = "idle" | "sending" | "success" | "error";

export function NewsletterBlockTwo({
  eyebrow = DEFAULTS.eyebrow,
  title = DEFAULTS.title,
  description = DEFAULTS.description,
  issues = DEFAULT_ISSUES,
  footnote = DEFAULTS.footnote,
  submitLabel = DEFAULTS.submitLabel,
  successMessage = DEFAULTS.successMessage,
  onSubmit,
  className,
  ...props
}: NewsletterBlockTwoProps) {
  const headingId = useId();
  const emailId = useId();
  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const email = String(new FormData(event.currentTarget).get("email") ?? "");
    setStatus("sending");
    try {
      await onSubmit?.({ email });
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section
      data-slot="newsletter-block-two"
      aria-labelledby={headingId}
      className={cn("w-full bg-background text-foreground", className)}
      {...props}
    >
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 md:grid-cols-12 md:gap-10 md:py-28">
        <div className="md:col-span-7">
          <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
            {eyebrow}
          </p>
          <h2
            id={headingId}
            className="mt-6 text-3xl font-semibold tracking-[-0.03em] text-balance sm:text-4xl md:text-5xl"
          >
            {title}
          </h2>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-muted-foreground">
            {description}
          </p>

          <form onSubmit={handleSubmit} className="mt-10 max-w-md">
            <Label htmlFor={emailId} className="font-mono text-xs uppercase tracking-wider">
              Email address
            </Label>
            <div className="mt-2 flex gap-2">
              <Input
                id={emailId}
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="you@company.com"
                disabled={status === "sending" || status === "success"}
                className="rounded-none"
              />
              <Button
                type="submit"
                disabled={status === "sending" || status === "success"}
                className="rounded-none"
              >
                {status === "sending" ? "Subscribing…" : submitLabel}
              </Button>
            </div>
            <p
              aria-live="polite"
              className={cn(
                "mt-3 text-sm",
                status === "error" ? "text-destructive" : "text-muted-foreground"
              )}
            >
              {status === "success"
                ? successMessage
                : status === "error"
                  ? "That didn't go through. Please try again."
                  : footnote}
            </p>
          </form>
        </div>

        {issues.length > 0 && (
          <aside className="md:col-span-5 md:pt-12" aria-label="Recent issues">
            <p className="border-b pb-3 font-mono text-xs uppercase tracking-wider text-muted-foreground">
              Recent issues
            </p>
            <ol className="divide-y">
              {issues.map((issue) => (
                <li key={issue.number}>
                  <a
                    href={issue.href}
                    className="group flex items-baseline gap-4 py-4 outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <span className="font-mono text-xs tabular-nums text-muted-foreground">
                      No. {issue.number}
                    </span>
                    <span className="flex-1">
                      <span className="block font-medium underline-offset-4 group-hover:underline">
                        {issue.title}
                      </span>
                      <span className="mt-1 block font-mono text-xs text-muted-foreground">
                        {issue.date}
                      </span>
                    </span>
                    <ArrowUpRight
                      aria-hidden
                      className="size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-foreground"
                    />
                  </a>
                </li>
              ))}
            </ol>
          </aside>
        )}
      </div>
    </section>
  );
}
