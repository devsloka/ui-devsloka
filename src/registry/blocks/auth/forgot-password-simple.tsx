"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  type ComponentProps,
  type CSSProperties,
  type FormEvent,
} from "react";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export type ForgotPasswordValues = { email: string };

export type ForgotPasswordSimpleProps = {
  /** Product name shown in the wordmark. */
  brand?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  /** Numbered next steps shown after the link is sent. */
  nextSteps?: string[];
  /** Seconds before "Resend" becomes available again. */
  resendCooldown?: number;
  signInHref?: string;
  supportHref?: string;
  /** Called with the email when the form is submitted. Throw to show an error. */
  onSubmit?: (values: ForgotPasswordValues) => void | Promise<void>;
  /** Called when the person asks for another email. Defaults to `onSubmit`. */
  onResend?: (values: ForgotPasswordValues) => void | Promise<void>;
  /** Ink for the wordmark square, rule and primary button. Defaults to Devsloka blue. */
  accent?: string;
  /** Text colour on `accent`. */
  accentForeground?: string;
} & Omit<ComponentProps<"section">, "onSubmit">;

const DEFAULTS = {
  brand: "Larch",
  eyebrow: "Account recovery",
  title: "Forgot your password?",
  description:
    "Enter the email you use for Larch and we will send a link to choose a new password.",
  nextSteps: [
    "Open the email from Larch. It usually arrives within a minute.",
    "Select “Choose a new password”. The link works once and expires after 30 minutes.",
    "Not there? Check spam or the Promotions tab, then resend below.",
  ],
  accent: "#0A6EFF",
  accentForeground: "#FFFFFF",
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateEmail(email: string) {
  if (!email.trim()) return "Enter the email address on your account.";
  if (!EMAIL_PATTERN.test(email.trim())) return "That email looks incomplete. Check for a typo.";
  return undefined;
}

const defaultSubmit = () => new Promise<void>((resolve) => setTimeout(resolve, 900));

const pad = (n: number) => String(n).padStart(2, "0");
const formatSeconds = (s: number) => `${Math.floor(s / 60)}:${pad(s % 60)}`;

/** Counts down once per second while `seconds > 0`. The interval starts when `start()` is called. */
function useCooldown() {
  const [seconds, setSeconds] = useState(0);
  const running = seconds > 0;

  useEffect(() => {
    if (!running) return;
    const timer = setInterval(() => {
      setSeconds((current) => Math.max(0, current - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [running]);

  return [seconds, setSeconds] as const;
}

function Wordmark({ name }: { name: string }) {
  return (
    <span className="inline-flex items-center gap-2 text-base font-semibold tracking-tight">
      <span aria-hidden="true" className="size-2.5 bg-[var(--block-accent)]" />
      {name}
    </span>
  );
}

export function ForgotPasswordSimple({
  brand = DEFAULTS.brand,
  eyebrow = DEFAULTS.eyebrow,
  title = DEFAULTS.title,
  description = DEFAULTS.description,
  nextSteps = DEFAULTS.nextSteps,
  resendCooldown = 30,
  signInHref = "#",
  supportHref = "#",
  onSubmit = defaultSubmit,
  onResend,
  accent = DEFAULTS.accent,
  accentForeground = DEFAULTS.accentForeground,
  className,
  style,
  ...props
}: ForgotPasswordSimpleProps) {
  const id = useId();
  const emailId = `${id}-email`;
  const errorId = `${id}-email-error`;
  const titleId = `${id}-title`;
  const inputRef = useRef<HTMLInputElement>(null);
  const confirmHeadingRef = useRef<HTMLHeadingElement>(null);

  const [email, setEmail] = useState("");
  const [sentTo, setSentTo] = useState("");
  const [error, setError] = useState<string>();
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [resending, setResending] = useState(false);
  const [announcement, setAnnouncement] = useState("");
  const [cooldown, setCooldown] = useCooldown();

  useEffect(() => {
    if (status === "success") confirmHeadingRef.current?.focus();
  }, [status]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
    const nextError = validateEmail(email);
    setError(nextError);
    if (nextError) {
      inputRef.current?.focus();
      return;
    }

    const values = { email: email.trim() };
    setStatus("submitting");
    setAnnouncement("");
    try {
      await onSubmit(values);
      setSentTo(values.email);
      setStatus("success");
      setCooldown(resendCooldown);
      setAnnouncement(`Reset link sent to ${values.email}.`);
    } catch {
      setStatus("idle");
      setError(
        "We couldn’t send the email just now. Your account is fine. Try again in a minute."
      );
      setAnnouncement("The reset email was not sent.");
    }
  };

  const handleResend = async () => {
    if (cooldown > 0 || resending) return;
    setResending(true);
    setAnnouncement("");
    try {
      await (onResend ?? onSubmit)({ email: sentTo });
      setCooldown(resendCooldown);
      setAnnouncement(`Sent another link to ${sentTo}. Use the newest email.`);
    } catch {
      setAnnouncement("We couldn’t resend the email. Try again in a minute.");
    } finally {
      setResending(false);
    }
  };

  const changeEmail = () => {
    setStatus("idle");
    setCooldown(0);
    setAnnouncement("");
    requestAnimationFrame(() => inputRef.current?.focus());
  };

  return (
    <section
      data-slot="forgot-password-simple"
      aria-labelledby={titleId}
      style={
        {
          "--block-accent": accent,
          "--block-accent-fg": accentForeground,
          ...style,
        } as CSSProperties
      }
      className={cn("w-full bg-background text-foreground", className)}
      {...props}
    >
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <div className="grid gap-10 md:grid-cols-12 md:gap-8">
          <div className="flex items-start justify-between md:col-span-3 md:flex-col md:justify-start md:gap-10">
            <Wordmark name={brand} />
            <p className="text-muted-foreground font-mono text-xs tracking-wider uppercase">
              {status === "success" ? "02 — Check inbox" : "01 — Request link"}
            </p>
          </div>

          <div className="border-t-2 border-[var(--block-accent)] pt-8 md:col-span-7 md:col-start-5 lg:col-span-6 lg:col-start-5">
            {status === "success" ? (
              <div>
                <p className="text-muted-foreground font-mono text-xs tracking-wider uppercase">
                  {eyebrow}
                </p>
                <h2
                  id={titleId}
                  ref={confirmHeadingRef}
                  tabIndex={-1}
                  className="mt-4 text-4xl font-semibold tracking-[-0.03em] outline-none md:text-5xl"
                >
                  Check your email
                </h2>
                <p className="text-muted-foreground mt-5 max-w-prose text-base leading-relaxed">
                  We sent a reset link to
                </p>
                <p className="mt-1 font-mono text-sm break-all">{sentTo}</p>

                <ol className="mt-10 divide-y border-y">
                  {nextSteps.map((step, index) => (
                    <li key={step} className="grid grid-cols-[2.5rem_1fr] gap-x-2 py-4 text-sm leading-relaxed">
                      <span
                        aria-hidden="true"
                        className="font-mono text-xs leading-6 font-semibold tabular-nums text-[var(--block-accent)] dark:text-foreground"
                      >
                        {pad(index + 1)}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>

                <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
                  <button
                    type="button"
                    onClick={handleResend}
                    disabled={cooldown > 0 || resending}
                    className="rounded-sm font-medium underline decoration-1 underline-offset-[6px] outline-none hover:decoration-2 focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:text-muted-foreground disabled:no-underline"
                  >
                    {resending ? (
                      "Resending…"
                    ) : cooldown > 0 ? (
                      <>
                        Resend in <span className="font-mono tabular-nums">{formatSeconds(cooldown)}</span>
                      </>
                    ) : (
                      "Resend email"
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={changeEmail}
                    className="text-muted-foreground hover:text-foreground rounded-sm underline-offset-[6px] outline-none hover:underline focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    Use a different address
                  </button>
                </div>

                <div className="mt-12 flex items-center justify-between gap-4 border-t pt-6 text-sm">
                  <a
                    href={signInHref}
                    className="rounded-sm font-medium underline-offset-4 outline-none hover:underline focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    ← Back to sign in
                  </a>
                  <a
                    href={supportHref}
                    className="text-muted-foreground hover:text-foreground rounded-sm text-xs underline-offset-4 outline-none hover:underline focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    Still stuck? Contact support
                  </a>
                </div>
              </div>
            ) : (
              <div>
                <p className="text-muted-foreground font-mono text-xs tracking-wider uppercase">
                  {eyebrow}
                </p>
                <h2
                  id={titleId}
                  className="mt-4 text-4xl font-semibold tracking-[-0.03em] text-balance md:text-5xl"
                >
                  {title}
                </h2>
                <p className="text-muted-foreground mt-5 max-w-md text-base leading-relaxed">
                  {description}
                </p>

                <form
                  noValidate
                  onSubmit={handleSubmit}
                  aria-busy={status === "submitting"}
                  className="mt-10 grid max-w-md gap-6"
                >
                  <div className="grid gap-2">
                    <Label htmlFor={emailId}>Email</Label>
                    <Input
                      ref={inputRef}
                      id={emailId}
                      name="email"
                      type="email"
                      autoComplete="email"
                      inputMode="email"
                      required
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      onBlur={() => {
                        if (submitted) setError(validateEmail(email));
                      }}
                      aria-invalid={error ? true : undefined}
                      aria-describedby={error ? errorId : undefined}
                      placeholder="you@fieldwork.org"
                    />
                    {error ? (
                      <p id={errorId} className="text-destructive text-xs">
                        {error}
                      </p>
                    ) : null}
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    disabled={status === "submitting"}
                    className="w-full rounded-none bg-[var(--block-accent)] text-[var(--block-accent-fg)] shadow-none hover:bg-[var(--block-accent)] hover:underline hover:underline-offset-4 sm:w-auto sm:justify-self-start"
                  >
                    {status === "submitting" ? (
                      <>
                        <Loader2 aria-hidden="true" className="animate-spin motion-reduce:animate-none" />
                        Sending link…
                      </>
                    ) : (
                      "Send reset link"
                    )}
                  </Button>
                </form>

                <p className="text-muted-foreground mt-12 border-t pt-6 text-sm">
                  Remembered it?{" "}
                  <a
                    href={signInHref}
                    className="text-foreground rounded-sm font-medium underline-offset-4 outline-none hover:underline focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    Back to sign in
                  </a>
                </p>
              </div>
            )}

            <p role="status" aria-live="polite" className="sr-only">
              {announcement}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
