"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  type ChangeEvent,
  type ComponentProps,
  type CSSProperties,
  type FormEvent,
} from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export type SignInMinimalMethod = "password" | "magic-link";

export type SignInMinimalValues =
  | { method: "password"; email: string; password: string }
  | { method: "magic-link"; email: string };

export type SignInMinimalProvider = { id: string; label: string };

export type SignInMinimalProps = {
  title?: string;
  /** Mono context line under the headline, e.g. the workspace address. */
  context?: string;
  /** Short lines in the left margin column. */
  notes?: string[];
  providers?: SignInMinimalProvider[];
  onProviderClick?: (id: string) => void;
  onSubmit?: (values: SignInMinimalValues) => void | Promise<void>;
  /** Show the "Email me a sign-in link" toggle. */
  allowMagicLink?: boolean;
  defaultMethod?: SignInMinimalMethod;
  forgotPasswordHref?: string;
  signUpHref?: string;
  termsHref?: string;
  privacyHref?: string;
  /** Service status line in the footer row. Pass an empty string to hide it. */
  statusLabel?: string;
  /** Wordmark square, status marker and primary button. Defaults to Devsloka blue. */
  accent?: string;
  /** Text colour on `accent`. Defaults to white. */
  accentForeground?: string;
} & Omit<ComponentProps<"section">, "onSubmit">;

const DEFAULTS = {
  title: "Welcome back.",
  context: "Workspace: field-notes.larch.app",
  notes: [
    "Larch is a shared notebook for small research teams.",
    "Interviews, field notes and tags in one place.",
  ],
  providers: [
    { id: "google", label: "Continue with Google" },
    { id: "sso", label: "Continue with SSO" },
  ],
  statusLabel: "All systems normal",
  accent: "#0A6EFF",
  accentForeground: "#FFFFFF",
};

type Field = "email" | "password";
type Errors = Partial<Record<Field, string>>;
type Status = "idle" | "submitting" | "success" | "error";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values: Record<Field, string>, method: SignInMinimalMethod): Errors {
  const errors: Errors = {};
  const email = values.email.trim();
  if (!email) errors.email = "Enter the email you use for Larch.";
  else if (!EMAIL_PATTERN.test(email))
    errors.email = "That email looks incomplete. Check for a typo.";
  if (method === "password" && !values.password) errors.password = "Enter your password.";
  return errors;
}

const defaultSubmit = () =>
  new Promise<void>((resolve) => setTimeout(resolve, 900));

const linkClass =
  "rounded-sm underline decoration-1 underline-offset-4 outline-none hover:decoration-2 focus-visible:ring-2 focus-visible:ring-ring";

export function SignInMinimal({
  title = DEFAULTS.title,
  context = DEFAULTS.context,
  notes = DEFAULTS.notes,
  providers = DEFAULTS.providers,
  onProviderClick,
  onSubmit = defaultSubmit,
  allowMagicLink = true,
  defaultMethod = "password",
  forgotPasswordHref = "#",
  signUpHref = "#",
  termsHref = "#",
  privacyHref = "#",
  statusLabel = DEFAULTS.statusLabel,
  accent = DEFAULTS.accent,
  accentForeground = DEFAULTS.accentForeground,
  className,
  style,
  ...props
}: SignInMinimalProps) {
  const id = useId();
  const inboxHeadingRef = useRef<HTMLHeadingElement>(null);
  const [method, setMethod] = useState<SignInMinimalMethod>(
    allowMagicLink ? defaultMethod : "password"
  );
  const [values, setValues] = useState<Record<Field, string>>({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [attempted, setAttempted] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  const fieldId = (name: Field) => `${id}-${name}`;
  const errorId = (name: Field) => `${id}-${name}-error`;
  const submitting = status === "submitting";
  const linkSent = method === "magic-link" && status === "success";

  useEffect(() => {
    if (linkSent) inboxHeadingRef.current?.focus();
  }, [linkSent]);

  const switchMethod = () => {
    setMethod((current) => (current === "password" ? "magic-link" : "password"));
    setErrors({});
    setStatus("idle");
    setMessage("");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setAttempted(true);
    const nextErrors = validate(values, method);
    setErrors(nextErrors);
    const firstInvalid = (Object.keys(nextErrors) as Field[])[0];
    if (firstInvalid) {
      document.getElementById(fieldId(firstInvalid))?.focus();
      return;
    }

    const email = values.email.trim();
    setStatus("submitting");
    setMessage("");
    try {
      await onSubmit(
        method === "password"
          ? { method, email, password: values.password }
          : { method, email }
      );
      setStatus("success");
      setMessage(
        method === "password"
          ? "Signed in. Opening your workspace…"
          : `Check your inbox. We sent a sign-in link to ${email}.`
      );
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error && error.message
          ? error.message
          : method === "password"
            ? "That email and password don't match an account here. Check both and try again."
            : "We couldn't send the link just now. Wait a minute and try again."
      );
    }
  };

  const fieldProps = (name: Field) => ({
    id: fieldId(name),
    name,
    value: values[name],
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? errorId(name) : undefined,
    onChange: (event: ChangeEvent<HTMLInputElement>) =>
      setValues((current) => ({ ...current, [name]: event.target.value })),
    onBlur: () => {
      if (attempted)
        setErrors((current) => ({ ...current, [name]: validate(values, method)[name] }));
    },
  });

  const errorText = (name: Field) =>
    errors[name] ? (
      <p id={errorId(name)} className="text-xs text-destructive">
        {errors[name]}
      </p>
    ) : null;

  return (
    <section
      data-slot="sign-in-minimal"
      aria-labelledby={`${id}-title`}
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
        <div className="grid gap-12 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-4">
            <span className="inline-flex items-center gap-2 text-lg font-semibold tracking-tight">
              <span aria-hidden="true" className="size-2.5 bg-[var(--block-accent)]" />
              Larch
            </span>
            {notes.length > 0 ? (
              <ul className="mt-6 hidden max-w-[16rem] space-y-2 text-sm leading-relaxed text-muted-foreground md:block">
                {notes.map((note) => (
                  <li key={note}>{note}</li>
                ))}
              </ul>
            ) : null}
          </div>

          <div className="md:col-span-6 md:col-start-6">
            <h2
              id={`${id}-title`}
              className="text-5xl font-semibold tracking-[-0.04em] md:text-7xl"
            >
              {title}
            </h2>
            {context ? (
              <p className="mt-4 font-mono text-xs tracking-wider text-muted-foreground">
                {context}
              </p>
            ) : null}

            <div className="mt-12 max-w-md border-t pt-8">
              <p role="status" aria-live="polite" className="sr-only">
                {linkSent ? message : ""}
              </p>

              {linkSent ? (
                <div>
                  <p className="font-mono text-xs tracking-wider text-muted-foreground uppercase">
                    Link sent
                  </p>
                  <h3
                    ref={inboxHeadingRef}
                    tabIndex={-1}
                    className="mt-3 text-2xl font-semibold tracking-tight outline-none"
                  >
                    Check your inbox
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    We sent a sign-in link to{" "}
                    <span className="font-medium text-foreground">{values.email.trim()}</span>.
                    It works once and expires in 15 minutes. Nothing there? Check spam, or
                    ask your admin whether Larch emails are filtered.
                  </p>
                  <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm">
                    <button
                      type="button"
                      onClick={() => {
                        setStatus("idle");
                        setMessage("");
                      }}
                      className={cn(linkClass, "font-medium")}
                    >
                      Use a different email
                    </button>
                    <button type="button" onClick={switchMethod} className={cn(linkClass, "text-muted-foreground hover:text-foreground")}>
                      Sign in with a password
                    </button>
                  </div>
                </div>
              ) : (
                <form
                  noValidate
                  onSubmit={handleSubmit}
                  aria-busy={submitting}
                  className="grid gap-6"
                >
                  <div className="grid gap-2">
                    <Label htmlFor={fieldId("email")}>Email</Label>
                    <Input
                      {...fieldProps("email")}
                      type="email"
                      autoComplete="email"
                      inputMode="email"
                      required
                    />
                    {errorText("email")}
                  </div>

                  {method === "password" ? (
                    <div className="grid gap-2">
                      <div className="flex items-baseline justify-between gap-4">
                        <Label htmlFor={fieldId("password")}>Password</Label>
                        <a
                          href={forgotPasswordHref}
                          className={cn(linkClass, "text-xs text-muted-foreground hover:text-foreground")}
                        >
                          Forgot password?
                        </a>
                      </div>
                      <div className="relative">
                        <Input
                          {...fieldProps("password")}
                          type={showPassword ? "text" : "password"}
                          autoComplete="current-password"
                          required
                          className="pr-10"
                        />
                        <button
                          type="button"
                          aria-label={showPassword ? "Hide password" : "Show password"}
                          onClick={() => setShowPassword((current) => !current)}
                          className="absolute inset-y-0 right-0 flex w-10 items-center justify-center rounded-r-md text-muted-foreground outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
                        >
                          {showPassword ? (
                            <EyeOff aria-hidden="true" className="size-4" />
                          ) : (
                            <Eye aria-hidden="true" className="size-4" />
                          )}
                        </button>
                      </div>
                      {errorText("password")}
                    </div>
                  ) : (
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      We&apos;ll email you a link that signs you in once. No password needed.
                    </p>
                  )}

                  <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-4">
                    <Button
                      type="submit"
                      size="lg"
                      disabled={submitting}
                      className="rounded-none bg-[var(--block-accent)] text-[var(--block-accent-fg)] shadow-none hover:bg-[var(--block-accent)] hover:underline hover:underline-offset-4"
                    >
                      {submitting ? (
                        <>
                          <Loader2 aria-hidden="true" className="animate-spin motion-reduce:animate-none" />
                          {method === "password" ? "Signing in…" : "Sending link…"}
                        </>
                      ) : method === "password" ? (
                        "Sign in"
                      ) : (
                        "Email me a sign-in link"
                      )}
                    </Button>
                    {allowMagicLink ? (
                      <button
                        type="button"
                        onClick={switchMethod}
                        className={cn(linkClass, "text-sm text-muted-foreground hover:text-foreground")}
                      >
                        {method === "password"
                          ? "Email me a sign-in link instead"
                          : "Use my password instead"}
                      </button>
                    ) : null}
                  </div>

                  <p
                    role="status"
                    aria-live="polite"
                    className={cn(
                      "text-sm empty:hidden",
                      status === "error" && "border-l-2 border-destructive pl-3 text-destructive"
                    )}
                  >
                    {message}
                  </p>
                </form>
              )}

              {providers.length > 0 && !linkSent ? (
                <div className="mt-10 border-t pt-6">
                  <p className="font-mono text-[11px] tracking-wider text-muted-foreground uppercase">
                    Or
                  </p>
                  <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm">
                    {providers.map((provider) => (
                      <li key={provider.id}>
                        <button
                          type="button"
                          onClick={() => onProviderClick?.(provider.id)}
                          className={cn(linkClass, "font-medium")}
                        >
                          {provider.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              <p className="mt-10 text-sm text-muted-foreground">
                No account yet?{" "}
                <a href={signUpHref} className={cn(linkClass, "font-medium text-foreground")}>
                  Create one
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t pt-6 font-mono text-[11px] tracking-wider text-muted-foreground uppercase md:mt-24">
          <nav aria-label="Legal" className="flex gap-6">
            <a href={termsHref} className={cn(linkClass, "hover:text-foreground")}>
              Terms
            </a>
            <a href={privacyHref} className={cn(linkClass, "hover:text-foreground")}>
              Privacy
            </a>
          </nav>
          {statusLabel ? (
            <p className="flex items-center gap-2">
              <span aria-hidden="true" className="size-1.5 bg-[var(--block-accent)]" />
              {statusLabel}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
