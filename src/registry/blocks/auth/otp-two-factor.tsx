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
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export type TwoFactorMethod = "authenticator" | "backup";

export type OtpTwoFactorValues = {
  method: TwoFactorMethod;
  /** Six digits for the authenticator, or the 8-character backup code (upper case, no hyphen). */
  code: string;
  trustDevice: boolean;
};

export type OtpTwoFactorProps = {
  /** Product name shown in the wordmark. */
  brand?: string;
  title?: string;
  description?: string;
  /** Signed-in account, shown in mono. */
  account?: string;
  /** Number of days "Trust this device" lasts. */
  trustDays?: number;
  supportHref?: string;
  signInHref?: string;
  continueHref?: string;
  /** Called with the method, code and trust choice. Throw to show an error. */
  onSubmit?: (values: OtpTwoFactorValues) => void | Promise<void>;
  /** Panel ink. Defaults to a pale blue tint. */
  panel?: string;
  /** Text colour on `panel`. Defaults to near-black. */
  panelForeground?: string;
  /** Wordmark square and button ink. Defaults to Devsloka blue. */
  accent?: string;
  /** Text colour on `accent`. */
  accentForeground?: string;
} & Omit<ComponentProps<"section">, "onSubmit">;

const DEFAULTS = {
  brand: "Larch",
  title: "Two-step verification",
  description: "Open your authenticator app and enter the 6-digit code for Larch.",
  account: "priya@fieldwork.org",
  panel: "#E8F0FF",
  panelForeground: "#0A0A0A",
  accent: "#0A6EFF",
  accentForeground: "#FFFFFF",
};

const CODE_LENGTH = 6;
const BACKUP_PATTERN = /^[A-Z0-9]{8}$/;

const normalizeBackup = (value: string) => value.replace(/[\s-]/g, "").toUpperCase();

function validate(method: TwoFactorMethod, code: string, backup: string) {
  if (method === "authenticator") {
    if (code.length < CODE_LENGTH) return `Enter all ${CODE_LENGTH} digits from your authenticator app.`;
    return undefined;
  }
  const normalized = normalizeBackup(backup);
  if (!normalized) return "Enter one of your saved backup codes.";
  if (!BACKUP_PATTERN.test(normalized))
    return "Backup codes are 8 letters and numbers, like 4F7K-29QD.";
  return undefined;
}

/** Placeholder until you pass `onSubmit`: waits briefly, then succeeds. */
const defaultSubmit: (values: OtpTwoFactorValues) => Promise<void> = () =>
  new Promise<void>((resolve) => setTimeout(resolve, 800));

function AuthenticatorMark() {
  return (
    <svg viewBox="0 0 140 220" aria-hidden="true" className="h-44 w-auto md:h-56">
      {/* Body */}
      <rect x="2" y="2" width="136" height="216" rx="14" fill="none" stroke="currentColor" strokeWidth="4" />
      {/* Speaker */}
      <rect x="54" y="16" width="32" height="5" rx="2.5" fill="currentColor" />
      {/* Screen */}
      <rect x="16" y="34" width="108" height="152" fill="currentColor" opacity="0.12" />
      {/* Account row */}
      <rect x="28" y="54" width="52" height="6" fill="currentColor" />
      <rect x="28" y="66" width="34" height="4" fill="currentColor" opacity="0.5" />
      {/* Six digits, 3 + 3 */}
      {[0, 1, 2].map((i) => (
        <rect key={`a${i}`} x={28 + i * 14} y="88" width="10" height="22" fill="currentColor" />
      ))}
      {[0, 1, 2].map((i) => (
        <rect key={`b${i}`} x={78 + i * 14} y="88" width="10" height="22" fill="currentColor" />
      ))}
      {/* Timer bar */}
      <rect x="28" y="124" width="84" height="4" fill="currentColor" opacity="0.3" />
      <rect x="28" y="124" width="52" height="4" fill="currentColor" />
      {/* Second account, dimmed */}
      <rect x="28" y="148" width="44" height="6" fill="currentColor" opacity="0.5" />
      <rect x="28" y="160" width="60" height="10" fill="currentColor" opacity="0.3" />
      {/* Home bar */}
      <rect x="50" y="200" width="40" height="4" rx="2" fill="currentColor" />
    </svg>
  );
}

export function OtpTwoFactor({
  brand = DEFAULTS.brand,
  title = DEFAULTS.title,
  description = DEFAULTS.description,
  account = DEFAULTS.account,
  trustDays = 30,
  supportHref = "#",
  signInHref = "#",
  continueHref = "#",
  onSubmit = defaultSubmit,
  panel = DEFAULTS.panel,
  panelForeground = DEFAULTS.panelForeground,
  accent = DEFAULTS.accent,
  accentForeground = DEFAULTS.accentForeground,
  className,
  style,
  ...props
}: OtpTwoFactorProps) {
  const id = useId();
  const titleId = `${id}-title`;
  const codeId = `${id}-code`;
  const backupId = `${id}-backup`;
  const trustId = `${id}-trust`;
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;

  const codeRef = useRef<HTMLInputElement>(null);
  const backupRef = useRef<HTMLInputElement>(null);
  const successHeadingRef = useRef<HTMLHeadingElement>(null);
  const focusAfterSwitch = useRef(false);

  const [method, setMethod] = useState<TwoFactorMethod>("authenticator");
  const [code, setCode] = useState("");
  const [backup, setBackup] = useState("");
  const [trustDevice, setTrustDevice] = useState(false);
  const [error, setError] = useState<string>();
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [announcement, setAnnouncement] = useState("");

  useEffect(() => {
    if (status === "success") successHeadingRef.current?.focus();
  }, [status]);

  useEffect(() => {
    if (!focusAfterSwitch.current) return;
    focusAfterSwitch.current = false;
    (method === "authenticator" ? codeRef : backupRef).current?.focus();
  }, [method]);

  const focusField = () => (method === "authenticator" ? codeRef : backupRef).current?.focus();

  const switchMethod = () => {
    focusAfterSwitch.current = true;
    setMethod((current) => (current === "authenticator" ? "backup" : "authenticator"));
    setError(undefined);
    setSubmitted(false);
    setAnnouncement("");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "submitting") return;
    setSubmitted(true);
    const nextError = validate(method, code, backup);
    setError(nextError);
    if (nextError) {
      focusField();
      return;
    }

    setStatus("submitting");
    setAnnouncement("Checking the code…");
    try {
      await onSubmit({
        method,
        code: method === "authenticator" ? code : normalizeBackup(backup),
        trustDevice,
      });
      setStatus("success");
      setAnnouncement("Verified. You are signed in.");
    } catch {
      setStatus("idle");
      setAnnouncement("");
      setError(
        method === "authenticator"
          ? "That code didn’t work. Codes change every 30 seconds, so wait for the next one and try again."
          : "That backup code isn’t valid or has already been used. Each code works once."
      );
      focusField();
    }
  };

  const describedBy = [hintId, error ? errorId : undefined].filter(Boolean).join(" ");

  return (
    <section
      data-slot="otp-two-factor"
      aria-labelledby={titleId}
      style={
        {
          "--block-panel": panel,
          "--block-panel-fg": panelForeground,
          "--block-accent": accent,
          "--block-accent-fg": accentForeground,
          ...style,
        } as CSSProperties
      }
      className={cn("w-full bg-background text-foreground", className)}
      {...props}
    >
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <div className="grid border md:grid-cols-12">
          <div className="flex flex-col justify-between gap-10 bg-[var(--block-panel)] px-6 py-8 text-[var(--block-panel-fg)] md:col-span-5 md:px-10 md:py-12">
            <div className="flex items-baseline justify-between gap-4">
              <span className="inline-flex items-center gap-2 text-base font-semibold tracking-tight">
                <span aria-hidden="true" className="size-2.5 bg-[var(--block-accent)]" />
                {brand}
              </span>
              <span className="font-mono text-[11px] tracking-wider uppercase">Step 2 / 2</span>
            </div>
            <AuthenticatorMark />
            <p className="max-w-xs font-mono text-xs leading-relaxed">
              Any authenticator app works. The code refreshes every 30 seconds and never leaves
              your phone.
            </p>
          </div>

          <div className="px-6 py-10 md:col-span-7 md:px-12 md:py-14">
            {status === "success" ? (
              <div className="max-w-md">
                <p className="text-muted-foreground font-mono text-xs tracking-wider uppercase">
                  Verified
                </p>
                <h2
                  id={titleId}
                  ref={successHeadingRef}
                  tabIndex={-1}
                  className="mt-4 text-4xl font-semibold tracking-[-0.03em] outline-none md:text-5xl"
                >
                  Signed in
                </h2>
                <p className="text-muted-foreground mt-5 text-base leading-relaxed">
                  {trustDevice
                    ? `We won’t ask for a code on this browser for ${trustDays} days. You can revoke it in Settings → Security.`
                    : "We’ll ask for a code again next time you sign in on this browser."}
                </p>
                <Button
                  asChild
                  size="lg"
                  className="mt-10 rounded-none bg-[var(--block-accent)] text-[var(--block-accent-fg)] shadow-none hover:bg-[var(--block-accent)] hover:underline hover:underline-offset-4"
                >
                  <a href={continueHref}>Continue to {brand}</a>
                </Button>
              </div>
            ) : (
              <div className="max-w-md">
                <p className="text-muted-foreground font-mono text-xs tracking-wider uppercase">
                  Signing in as <span className="text-foreground normal-case">{account}</span>
                </p>
                <h2
                  id={titleId}
                  className="mt-4 text-4xl font-semibold tracking-[-0.03em] text-balance md:text-5xl"
                >
                  {title}
                </h2>
                <p id={hintId} className="text-muted-foreground mt-5 text-base leading-relaxed">
                  {method === "authenticator"
                    ? description
                    : "Enter one of the 8-character backup codes you saved when you turned on two-step verification. Each code works once."}
                </p>

                <form
                  noValidate
                  onSubmit={handleSubmit}
                  aria-busy={status === "submitting"}
                  className="mt-10 grid gap-6"
                >
                  {method === "authenticator" ? (
                    <div className="grid gap-3">
                      <Label htmlFor={codeId}>Authentication code</Label>
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
                        readOnly={status === "submitting"}
                        aria-invalid={error ? true : undefined}
                        aria-describedby={describedBy}
                        containerClassName="gap-3"
                      >
                        <InputOTPGroup>
                          {[0, 1, 2].map((index) => (
                            <InputOTPSlot
                              key={index}
                              index={index}
                              aria-invalid={error ? true : undefined}
                              className="h-12 w-11 font-mono text-lg"
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
                              className="h-12 w-11 font-mono text-lg"
                            />
                          ))}
                        </InputOTPGroup>
                      </InputOTP>
                    </div>
                  ) : (
                    <div className="grid gap-2">
                      <Label htmlFor={backupId}>Backup code</Label>
                      <Input
                        ref={backupRef}
                        id={backupId}
                        name="backup-code"
                        type="text"
                        autoComplete="one-time-code"
                        autoCapitalize="characters"
                        autoCorrect="off"
                        spellCheck={false}
                        maxLength={9}
                        required
                        placeholder="XXXX-XXXX"
                        value={backup}
                        onChange={(event) => setBackup(event.target.value)}
                        onBlur={() => {
                          if (submitted) setError(validate("backup", code, backup));
                        }}
                        readOnly={status === "submitting"}
                        aria-invalid={error ? true : undefined}
                        aria-describedby={describedBy}
                        className="max-w-60 font-mono tracking-widest uppercase"
                      />
                    </div>
                  )}

                  {error ? (
                    <p id={errorId} className="text-destructive -mt-3 text-sm">
                      {error}
                    </p>
                  ) : null}

                  <div className="flex items-start gap-3">
                    <Checkbox
                      id={trustId}
                      name="trust-device"
                      checked={trustDevice}
                      onCheckedChange={(checked) => setTrustDevice(checked === true)}
                      className="mt-0.5"
                    />
                    <div className="grid gap-1">
                      <Label htmlFor={trustId} className="font-normal">
                        Trust this device for {trustDays} days
                      </Label>
                      <p className="text-muted-foreground text-xs">
                        Only on a computer you don’t share.
                      </p>
                    </div>
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
                        Verifying…
                      </>
                    ) : (
                      "Verify and sign in"
                    )}
                  </Button>
                </form>

                <ul className="mt-10 divide-y border-y text-sm">
                  <li>
                    <button
                      type="button"
                      onClick={switchMethod}
                      className="flex w-full items-center justify-between gap-4 rounded-sm py-3 text-left font-medium outline-none hover:underline hover:underline-offset-4 focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      {method === "authenticator"
                        ? "Use a backup code instead"
                        : "Use your authenticator app instead"}
                      <span aria-hidden="true" className="text-muted-foreground font-mono text-xs">
                        →
                      </span>
                    </button>
                  </li>
                  <li>
                    <a
                      href={supportHref}
                      className="flex w-full items-center justify-between gap-4 rounded-sm py-3 outline-none hover:underline hover:underline-offset-4 focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      Lost access? Contact support
                      <span aria-hidden="true" className="text-muted-foreground font-mono text-xs">
                        Replies in 1 working day
                      </span>
                    </a>
                  </li>
                </ul>

                <p className="text-muted-foreground mt-6 text-xs">
                  Not you?{" "}
                  <a
                    href={signInHref}
                    className="text-foreground rounded-sm underline-offset-4 outline-none hover:underline focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    Sign in with a different account
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
