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
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export type OtpVerifyValues = { code: string };

export type OtpVerifyProps = {
  /** Product name shown in the wordmark. */
  brand?: string;
  title?: string;
  /** Where the code was sent, already masked, e.g. "p••••@fieldwork.org". */
  destination?: string;
  /** Seconds before another code can be requested. The first countdown starts on mount. */
  resendCooldown?: number;
  footnote?: string;
  changeEmailHref?: string;
  continueHref?: string;
  /** Called with the 6-digit code (automatically once all six are entered). Throw to show an error. */
  onSubmit?: (values: OtpVerifyValues) => void | Promise<void>;
  onResend?: () => void | Promise<void>;
  /** Ink for the wordmark square, rule and button. Defaults to Devsloka blue. */
  accent?: string;
  /** Text colour on `accent`. */
  accentForeground?: string;
} & Omit<ComponentProps<"section">, "onSubmit">;

const DEFAULTS = {
  brand: "Larch",
  title: "Enter the code we sent",
  destination: "p••••@fieldwork.org",
  footnote: "Codes expire in 10 minutes. Requesting a new one cancels the old one.",
  accent: "#0A6EFF",
  accentForeground: "#FFFFFF",
};

const CODE_LENGTH = 6;

/** Placeholder until you pass `onSubmit`: waits briefly, then succeeds. */
const defaultSubmit: (values: OtpVerifyValues) => Promise<void> = () =>
  new Promise<void>((resolve) => setTimeout(resolve, 800));

const defaultResend = () => new Promise<void>((resolve) => setTimeout(resolve, 600));

const pad = (n: number) => String(n).padStart(2, "0");
const formatSeconds = (s: number) => `${Math.floor(s / 60)}:${pad(s % 60)}`;

/** Counts down once per second while `seconds > 0`; setting a positive value starts the interval. */
function useCooldown(initial: number) {
  const [seconds, setSeconds] = useState(initial);
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

export function OtpVerify({
  brand = DEFAULTS.brand,
  title = DEFAULTS.title,
  destination = DEFAULTS.destination,
  resendCooldown = 30,
  footnote = DEFAULTS.footnote,
  changeEmailHref = "#",
  continueHref = "#",
  onSubmit = defaultSubmit,
  onResend = defaultResend,
  accent = DEFAULTS.accent,
  accentForeground = DEFAULTS.accentForeground,
  className,
  style,
  ...props
}: OtpVerifyProps) {
  const id = useId();
  const titleId = `${id}-title`;
  const codeId = `${id}-code`;
  const hintId = `${id}-hint`;
  const errorId = `${id}-error`;

  const codeRef = useRef<HTMLInputElement>(null);
  const successHeadingRef = useRef<HTMLHeadingElement>(null);
  const submittingRef = useRef(false);

  const [code, setCode] = useState("");
  const [error, setError] = useState<string>();
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [resending, setResending] = useState(false);
  const [announcement, setAnnouncement] = useState("");
  const [cooldown, setCooldown] = useCooldown(resendCooldown);

  useEffect(() => {
    if (status === "success") successHeadingRef.current?.focus();
  }, [status]);

  const verify = async (value: string) => {
    if (submittingRef.current) return;
    if (value.length < CODE_LENGTH) {
      setError(`Enter all ${CODE_LENGTH} digits from the email.`);
      codeRef.current?.focus();
      return;
    }
    setError(undefined);
    setAnnouncement("Checking the code…");
    setStatus("submitting");
    submittingRef.current = true;
    try {
      await onSubmit({ code: value });
      setStatus("success");
      setAnnouncement("Code accepted.");
    } catch {
      setStatus("idle");
      setError(`That code didn’t match. Check the newest email from ${brand}, or request another code.`);
      setAnnouncement("");
      codeRef.current?.focus();
    } finally {
      submittingRef.current = false;
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void verify(code);
  };

  const handleResend = async () => {
    if (cooldown > 0 || resending) return;
    setResending(true);
    setAnnouncement("");
    try {
      await onResend();
      setCode("");
      setError(undefined);
      setCooldown(resendCooldown);
      setAnnouncement(`New code sent to ${destination}. The previous code no longer works.`);
      codeRef.current?.focus();
    } catch {
      setAnnouncement("We couldn’t send a new code. Try again in a minute.");
    } finally {
      setResending(false);
    }
  };

  return (
    <section
      data-slot="otp-verify"
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
      <div className="mx-auto flex max-w-lg flex-col items-center px-6 py-16 text-center md:py-24">
        <span className="inline-flex items-center gap-2 text-base font-semibold tracking-tight">
          <span aria-hidden="true" className="size-2.5 bg-[var(--block-accent)]" />
          {brand}
        </span>

        <span aria-hidden="true" className="mt-10 h-12 w-px bg-border" />

        {status === "success" ? (
          <div className="mt-10">
            <p className="text-muted-foreground font-mono text-xs tracking-wider uppercase">
              Verified
            </p>
            <h2
              id={titleId}
              ref={successHeadingRef}
              tabIndex={-1}
              className="mt-4 text-4xl font-semibold tracking-[-0.03em] outline-none md:text-5xl"
            >
              You’re in.
            </h2>
            <p className="text-muted-foreground mx-auto mt-5 max-w-sm text-base leading-relaxed">
              Your email is confirmed. Your team’s notebooks are ready.
            </p>
            <Button
              asChild
              size="lg"
              className="mt-10 rounded-none bg-[var(--block-accent)] text-[var(--block-accent-fg)] shadow-none hover:bg-[var(--block-accent)] hover:underline hover:underline-offset-4"
            >
              <a href={continueHref}>Open {brand}</a>
            </Button>
          </div>
        ) : (
          <div className="mt-10 flex w-full flex-col items-center">
            <h2
              id={titleId}
              className="text-4xl font-semibold tracking-[-0.03em] text-balance md:text-5xl"
            >
              {title}
            </h2>
            <p id={hintId} className="text-muted-foreground mt-5 text-base leading-relaxed">
              A {CODE_LENGTH}-digit code went to{" "}
              <span className="text-foreground font-mono text-sm">{destination}</span>
            </p>

            <form
              noValidate
              onSubmit={handleSubmit}
              aria-busy={status === "submitting"}
              className="mt-10 flex w-full flex-col items-center"
            >
              <Label htmlFor={codeId} className="sr-only">
                Verification code
              </Label>
              <InputOTP
                ref={codeRef}
                id={codeId}
                name="code"
                maxLength={CODE_LENGTH}
                pattern={REGEXP_ONLY_DIGITS}
                inputMode="numeric"
                autoComplete="one-time-code"
                required
                value={code}
                onChange={(value) => {
                  setCode(value);
                  if (error) setError(undefined);
                }}
                onComplete={(value: string) => void verify(value)}
                readOnly={status === "submitting"}
                aria-invalid={error ? true : undefined}
                aria-describedby={error ? `${hintId} ${errorId}` : hintId}
                containerClassName="justify-center gap-3"
              >
                <InputOTPGroup>
                  {[0, 1, 2].map((index) => (
                    <InputOTPSlot
                      key={index}
                      index={index}
                      aria-invalid={error ? true : undefined}
                      className="h-14 w-11 font-mono text-xl sm:w-12"
                    />
                  ))}
                </InputOTPGroup>
                <InputOTPSeparator className="text-muted-foreground" />
                <InputOTPGroup>
                  {[3, 4, 5].map((index) => (
                    <InputOTPSlot
                      key={index}
                      index={index}
                      aria-invalid={error ? true : undefined}
                      className="h-14 w-11 font-mono text-xl sm:w-12"
                    />
                  ))}
                </InputOTPGroup>
              </InputOTP>

              <div className="mt-3 min-h-5">
                {error ? (
                  <p id={errorId} className="text-destructive text-sm">
                    {error}
                  </p>
                ) : null}
              </div>

              <Button
                type="submit"
                size="lg"
                disabled={status === "submitting"}
                className="mt-6 w-full max-w-xs rounded-none bg-[var(--block-accent)] text-[var(--block-accent-fg)] shadow-none hover:bg-[var(--block-accent)] hover:underline hover:underline-offset-4"
              >
                {status === "submitting" ? (
                  <>
                    <Loader2 aria-hidden="true" className="animate-spin motion-reduce:animate-none" />
                    Checking code…
                  </>
                ) : (
                  "Verify"
                )}
              </Button>
            </form>

            <div className="mt-10 flex w-full flex-wrap items-center justify-center gap-x-6 gap-y-3 border-t pt-6 text-sm">
              <button
                type="button"
                onClick={handleResend}
                disabled={cooldown > 0 || resending}
                className="rounded-sm font-medium underline decoration-1 underline-offset-[6px] outline-none hover:decoration-2 focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:text-muted-foreground disabled:no-underline"
              >
                {resending ? (
                  "Sending…"
                ) : cooldown > 0 ? (
                  <>
                    Resend code in{" "}
                    <span className="font-mono tabular-nums">{formatSeconds(cooldown)}</span>
                  </>
                ) : (
                  "Resend code"
                )}
              </button>
              <a
                href={changeEmailHref}
                className="text-muted-foreground hover:text-foreground rounded-sm underline-offset-[6px] outline-none hover:underline focus-visible:ring-2 focus-visible:ring-ring"
              >
                Use a different email
              </a>
            </div>

            <p className="text-muted-foreground mt-6 max-w-xs font-mono text-[11px] leading-relaxed">
              <span aria-hidden="true">* </span>
              {footnote}
            </p>
          </div>
        )}

        <p role="status" aria-live="polite" className="sr-only">
          {announcement}
        </p>
      </div>
    </section>
  );
}
