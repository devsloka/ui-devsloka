"use client";

import { useId, useState, type ComponentProps, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export type NewsletterBlockProps = Omit<ComponentProps<"section">, "onSubmit"> & {
  title?: string;
  description?: string;
  /** Short facts shown in a mono row, e.g. cadence and audience size. */
  details?: string[];
  submitLabel?: string;
  successMessage?: string;
  onSubmit?: (values: { email: string }) => void | Promise<void>;
};

const DEFAULTS = {
  title: "Get the changelog by email.",
  description:
    "One message when something ships. Release notes, migration tips and the occasional bug we're not proud of.",
  details: ["Monthly", "1,480 developers", "Plain text"],
  submitLabel: "Notify me",
  successMessage: "Thanks. Check your inbox to confirm.",
};

type Status = "idle" | "sending" | "success" | "error";

/** A compact, inline sign-up strip that sits between other sections. */
export const NewsletterBlock = ({
  title = DEFAULTS.title,
  description = DEFAULTS.description,
  details = DEFAULTS.details,
  submitLabel = DEFAULTS.submitLabel,
  successMessage = DEFAULTS.successMessage,
  onSubmit,
  className,
  ...props
}: NewsletterBlockProps) => {
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
      data-slot="newsletter-block"
      aria-labelledby={headingId}
      className={cn("w-full bg-background text-foreground", className)}
      {...props}
    >
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid border md:grid-cols-12">
          <div className="border-b p-6 md:col-span-7 md:border-r md:border-b-0 md:p-8">
            <h2 id={headingId} className="text-2xl font-semibold tracking-[-0.02em]">
              {title}
            </h2>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
              {description}
            </p>
            {details.length > 0 && (
              <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-1 font-mono text-xs uppercase tracking-wider text-muted-foreground">
                {details.map((detail) => (
                  <li key={detail} className="flex items-center gap-2">
                    <span aria-hidden className="size-1.5 bg-primary" />
                    {detail}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-center gap-3 p-6 md:col-span-5 md:p-8"
          >
            <Label htmlFor={emailId} className="font-mono text-xs uppercase tracking-wider">
              Work email
            </Label>
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
              className="w-full rounded-none"
            >
              {status === "sending" ? "Sending…" : submitLabel}
            </Button>
            <p
              aria-live="polite"
              className={cn(
                "min-h-5 text-sm",
                status === "error" ? "text-destructive" : "text-muted-foreground"
              )}
            >
              {status === "success"
                ? successMessage
                : status === "error"
                  ? "That didn't go through. Please try again."
                  : ""}
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};
