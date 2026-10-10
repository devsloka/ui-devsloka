"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  type ComponentProps,
  type CSSProperties,
  type FormEvent,
  type Ref,
} from "react";
import { Check, Eye, EyeOff, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export type ResetPasswordValues = { password: string };

export type PasswordRequirement = {
  id: string;
  label: string;
  test: (password: string) => boolean;
};

export type ForgotPasswordResetProps = {
  /** Product name shown in the wordmark. */
  brand?: string;
  title?: string;
  description?: string;
  /** The account being reset, shown in mono under the heading. */
  account?: string;
  requirements?: PasswordRequirement[];
  /** Short security note in the side panel. */
  securityNote?: string;
  continueHref?: string;
  signInHref?: string;
  /** Called with the new password. Throw to show an error. */
  onSubmit?: (values: ResetPasswordValues) => void | Promise<void>;
  /** Side panel and primary button ink. Defaults to Devsloka blue. */
  accent?: string;
  /** Text colour on `accent`. Defaults to white. */
  accentForeground?: string;
} & Omit<ComponentProps<"section">, "onSubmit">;

const DEFAULT_REQUIREMENTS: PasswordRequirement[] = [
  { id: "length", label: "12 characters or more", test: (p) => p.length >= 12 },
  { id: "case", label: "Upper and lower case letters", test: (p) => /[a-z]/.test(p) && /[A-Z]/.test(p) },
  { id: "number", label: "At least one number", test: (p) => /\d/.test(p) },
  { id: "spaces", label: "No spaces at the start or end", test: (p) => p.length > 0 && p.trim() === p },
];

const DEFAULTS = {
  brand: "Larch",
  title: "Choose a new password",
  description:
    "You’ll use it to sign in on every device. Sessions on other devices end once it’s saved.",
  account: "priya@fieldwork.org",
  securityNote:
    "Reset links expire after 30 minutes · requested from Lisbon, Chrome on macOS",
  accent: "#0A6EFF",
  accentForeground: "#FFFFFF",
};

const defaultSubmit = () => new Promise<void>((resolve) => setTimeout(resolve, 900));

type Field = "password" | "confirm";
type Errors = Partial<Record<Field, string>>;

function validate(password: string, confirm: string, requirements: PasswordRequirement[]): Errors {
  const errors: Errors = {};
  if (!password) errors.password = "Enter a new password.";
  else if (requirements.some((r) => !r.test(password)))
    errors.password = "This password doesn’t meet every requirement yet.";
  if (!confirm) errors.confirm = "Type the password again to confirm it.";
  else if (password && confirm !== password) errors.confirm = "The passwords don’t match.";
  return errors;
}

function Wordmark({ name }: { name: string }) {
  return (
    <span className="inline-flex items-center gap-2 text-base font-semibold tracking-tight">
      <span aria-hidden="true" className="size-2.5 bg-current" />
      {name}
    </span>
  );
}

function KeyholeMark() {
  return (
    <svg viewBox="0 0 120 160" aria-hidden="true" className="h-32 w-auto">
      <rect x="0" y="0" width="120" height="160" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="60" cy="62" r="22" fill="currentColor" />
      <rect x="51" y="70" width="18" height="52" fill="currentColor" />
      <rect x="0" y="140" width="120" height="2" fill="currentColor" opacity="0.4" />
    </svg>
  );
}

type PasswordFieldProps = {
  id: string;
  label: string;
  value: string;
  onValueChange: (value: string) => void;
  onBlur: () => void;
  error?: string;
  describedBy?: string;
  inputRef?: Ref<HTMLInputElement>;
};

function PasswordField({
  id,
  label,
  value,
  onValueChange,
  onBlur,
  error,
  describedBy,
  inputRef,
}: PasswordFieldProps) {
  const [visible, setVisible] = useState(false);
  const errorId = `${id}-error`;
  const describedByIds = [describedBy, error ? errorId : undefined].filter(Boolean).join(" ");

  return (
    <div className="grid gap-2">
      <Label htmlFor={id}>{label}</Label>
      <div className="relative">
        <Input
          ref={inputRef}
          id={id}
          type={visible ? "text" : "password"}
          autoComplete="new-password"
          required
          value={value}
          onChange={(event) => onValueChange(event.target.value)}
          onBlur={onBlur}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedByIds || undefined}
          className="pr-11"
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? "Hide password" : "Show password"}
          aria-controls={id}
          className="text-muted-foreground hover:text-foreground absolute inset-y-0 right-0 flex w-10 items-center justify-center rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {visible ? <EyeOff aria-hidden="true" className="size-4" /> : <Eye aria-hidden="true" className="size-4" />}
        </button>
      </div>
      {error ? (
        <p id={errorId} className="text-destructive text-xs">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function ForgotPasswordReset({
  brand = DEFAULTS.brand,
  title = DEFAULTS.title,
  description = DEFAULTS.description,
  account = DEFAULTS.account,
  requirements = DEFAULT_REQUIREMENTS,
  securityNote = DEFAULTS.securityNote,
  continueHref = "#",
  signInHref = "#",
  onSubmit = defaultSubmit,
  accent = DEFAULTS.accent,
  accentForeground = DEFAULTS.accentForeground,
  className,
  style,
  ...props
}: ForgotPasswordResetProps) {
  const id = useId();
  const titleId = `${id}-title`;
  const passwordId = `${id}-password`;
  const confirmId = `${id}-confirm`;
  const requirementsId = `${id}-requirements`;
  const formErrorId = `${id}-form-error`;

  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmRef = useRef<HTMLInputElement>(null);
  const successHeadingRef = useRef<HTMLHeadingElement>(null);

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [formError, setFormError] = useState<string>();
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  useEffect(() => {
    if (status === "success") successHeadingRef.current?.focus();
  }, [status]);

  const metCount = requirements.filter((r) => r.test(password)).length;

  const revalidate = () => {
    if (submitted) setErrors(validate(password, confirm, requirements));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
    setFormError(undefined);
    const nextErrors = validate(password, confirm, requirements);
    setErrors(nextErrors);
    if (nextErrors.password) return passwordRef.current?.focus();
    if (nextErrors.confirm) return confirmRef.current?.focus();

    setStatus("submitting");
    try {
      await onSubmit({ password });
      setStatus("success");
    } catch {
      setStatus("idle");
      setFormError(
        "We couldn’t save the new password. Your old one still works. Try again, or request a fresh link if this one has expired."
      );
    }
  };

  return (
    <section
      data-slot="forgot-password-reset"
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
        <div className="grid border md:grid-cols-12">
          <aside className="flex flex-col justify-between gap-12 bg-[var(--block-accent)] px-6 py-8 text-[var(--block-accent-fg)] md:col-span-4 md:px-8 md:py-10 lg:col-span-3">
            <Wordmark name={brand} />
            <KeyholeMark />
            <div>
              <p className="font-mono text-[11px] tracking-wider uppercase">Security note</p>
              <p className="mt-3 font-mono text-xs leading-relaxed">{securityNote}</p>
              <p className="mt-6 text-xs leading-relaxed">
                Didn’t ask for this?{" "}
                <a
                  href={signInHref}
                  className="rounded-sm underline underline-offset-4 outline-none focus-visible:ring-2 focus-visible:ring-[var(--block-accent-fg)]"
                >
                  Sign in
                </a>{" "}
                as usual and the link stops working.
              </p>
            </div>
          </aside>

          <div className="px-6 py-10 md:col-span-8 md:px-12 md:py-14 lg:col-span-9 lg:px-16">
            {status === "success" ? (
              <div className="max-w-md">
                <p className="text-muted-foreground font-mono text-xs tracking-wider uppercase">
                  Step 2 of 2 · Done
                </p>
                <h2
                  id={titleId}
                  ref={successHeadingRef}
                  tabIndex={-1}
                  className="mt-4 text-4xl font-semibold tracking-[-0.03em] outline-none md:text-5xl"
                >
                  Password updated
                </h2>
                <p className="text-muted-foreground mt-5 text-base leading-relaxed">
                  <span className="text-foreground font-mono text-sm">{account}</span> now signs in
                  with the new password. We signed you out everywhere else and sent a confirmation
                  email.
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
                  Step 2 of 2
                </p>
                <h2
                  id={titleId}
                  className="mt-4 text-4xl font-semibold tracking-[-0.03em] text-balance md:text-5xl"
                >
                  {title}
                </h2>
                <p className="text-muted-foreground mt-5 text-base leading-relaxed">{description}</p>
                <p className="mt-3 font-mono text-sm">{account}</p>

                <form
                  noValidate
                  onSubmit={handleSubmit}
                  aria-busy={status === "submitting"}
                  aria-describedby={formError ? formErrorId : undefined}
                  className="mt-10 grid gap-6"
                >
                  {/* Hidden username helps password managers save the new password to the right account. */}
                  <input type="hidden" name="username" autoComplete="username" value={account} />

                  <PasswordField
                    id={passwordId}
                    label="New password"
                    value={password}
                    onValueChange={setPassword}
                    onBlur={revalidate}
                    error={errors.password}
                    describedBy={requirementsId}
                    inputRef={passwordRef}
                  />

                  <div id={requirementsId}>
                    <p className="text-muted-foreground font-mono text-[11px] tracking-wider uppercase">
                      Requirements <span className="tabular-nums">{metCount}/{requirements.length}</span>
                    </p>
                    <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                      {requirements.map((requirement) => {
                        const met = requirement.test(password);
                        return (
                          <li
                            key={requirement.id}
                            className={cn(
                              "flex items-start gap-2 text-sm transition-colors motion-reduce:transition-none",
                              met ? "text-foreground" : "text-muted-foreground"
                            )}
                          >
                            <span
                              aria-hidden="true"
                              className={cn(
                                "mt-0.5 flex size-4 shrink-0 items-center justify-center border",
                                met
                                  ? "border-[var(--block-accent)] bg-[var(--block-accent)] text-[var(--block-accent-fg)]"
                                  : "border-border"
                              )}
                            >
                              {met ? <Check className="size-3" strokeWidth={3} /> : null}
                            </span>
                            {requirement.label}
                            <span className="sr-only">{met ? "(met)" : "(not met yet)"}</span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>

                  <PasswordField
                    id={confirmId}
                    label="Confirm new password"
                    value={confirm}
                    onValueChange={setConfirm}
                    onBlur={revalidate}
                    error={errors.confirm}
                    inputRef={confirmRef}
                  />

                  {formError ? (
                    <p id={formErrorId} className="text-destructive border-destructive border-l-2 pl-3 text-sm">
                      {formError}
                    </p>
                  ) : null}

                  <div className="flex flex-wrap items-center justify-between gap-4 border-t pt-6">
                    <a
                      href={signInHref}
                      className="text-muted-foreground hover:text-foreground rounded-sm text-sm underline-offset-4 outline-none hover:underline focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      Back to sign in
                    </a>
                    <Button
                      type="submit"
                      size="lg"
                      disabled={status === "submitting"}
                      className="rounded-none bg-[var(--block-accent)] text-[var(--block-accent-fg)] shadow-none hover:bg-[var(--block-accent)] hover:underline hover:underline-offset-4"
                    >
                      {status === "submitting" ? (
                        <>
                          <Loader2 aria-hidden="true" className="animate-spin motion-reduce:animate-none" />
                          Saving password…
                        </>
                      ) : (
                        "Save new password"
                      )}
                    </Button>
                  </div>
                </form>
              </div>
            )}

            <p role="status" aria-live="polite" className="sr-only">
              {status === "success"
                ? "Password updated."
                : formError
                  ? "The new password was not saved."
                  : ""}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
