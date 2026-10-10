"use client";

import {
  useId,
  useState,
  type ComponentProps,
  type ChangeEvent,
  type CSSProperties,
  type FormEvent,
} from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export type SignInSplitValues = {
  email: string;
  password: string;
  remember: boolean;
};

export type SignInSplitProvider = { id: string; label: string };

export type SignInSplitQuote = {
  text: string;
  name: string;
  role: string;
  organization: string;
};

export type SignInSplitProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  /** Short line shown next to the wordmark on the collapsed mobile strip. */
  tagline?: string;
  quote?: SignInSplitQuote;
  providers?: SignInSplitProvider[];
  onProviderClick?: (id: string) => void;
  onSubmit?: (values: SignInSplitValues) => void | Promise<void>;
  forgotPasswordHref?: string;
  signUpHref?: string;
  /** Panel field and primary button. Defaults to Devsloka blue. */
  accent?: string;
  /** Text colour on `accent`. Defaults to white. */
  accentForeground?: string;
  /** Second ink used for the wordmark square and the shapes on the panel. Defaults to near-black. */
  highlight?: string;
} & Omit<ComponentProps<"section">, "onSubmit">;

const DEFAULTS = {
  eyebrow: "Sign in",
  title: "Pick up where your team left off.",
  description:
    "Your notebooks, transcripts and tags are where you left them on Friday.",
  tagline: "Notebooks for research teams",
  quote: {
    text: "We used to lose interview notes in someone's Downloads folder. Now four of us tag the same transcript on the same afternoon, and the synthesis meeting takes forty minutes instead of three hours.",
    name: "Imke Vos",
    role: "Lead researcher",
    organization: "Hollis Field Lab",
  },
  providers: [
    { id: "google", label: "Continue with Google" },
    { id: "sso", label: "Continue with SSO" },
  ],
  accent: "#0A6EFF",
  accentForeground: "#FFFFFF",
  highlight: "#0A0A0A",
};

type Field = "email" | "password";
type Errors = Partial<Record<Field, string>>;
type Status = "idle" | "submitting" | "success" | "error";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values: Record<Field, string>): Errors {
  const errors: Errors = {};
  const email = values.email.trim();
  if (!email) errors.email = "Enter the email you use for Larch.";
  else if (!EMAIL_PATTERN.test(email))
    errors.email = "That email looks incomplete. Check for a typo.";
  if (!values.password) errors.password = "Enter your password.";
  return errors;
}

const defaultSubmit = () =>
  new Promise<void>((resolve) => setTimeout(resolve, 900));

const linkClass =
  "rounded-sm font-medium underline decoration-1 underline-offset-4 outline-none hover:decoration-2 focus-visible:ring-2 focus-visible:ring-ring";

export function SignInSplit({
  eyebrow = DEFAULTS.eyebrow,
  title = DEFAULTS.title,
  description = DEFAULTS.description,
  tagline = DEFAULTS.tagline,
  quote = DEFAULTS.quote,
  providers = DEFAULTS.providers,
  onProviderClick,
  onSubmit = defaultSubmit,
  forgotPasswordHref = "#",
  signUpHref = "#",
  accent = DEFAULTS.accent,
  accentForeground = DEFAULTS.accentForeground,
  highlight = DEFAULTS.highlight,
  className,
  style,
  ...props
}: SignInSplitProps) {
  const id = useId();
  const [values, setValues] = useState<Record<Field, string>>({
    email: "",
    password: "",
  });
  const [remember, setRemember] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [attempted, setAttempted] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  const fieldId = (name: Field) => `${id}-${name}`;
  const errorId = (name: Field) => `${id}-${name}-error`;
  const submitting = status === "submitting";

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setAttempted(true);
    const nextErrors = validate(values);
    setErrors(nextErrors);
    const firstInvalid = (Object.keys(nextErrors) as Field[])[0];
    if (firstInvalid) {
      document.getElementById(fieldId(firstInvalid))?.focus();
      return;
    }

    setStatus("submitting");
    setMessage("");
    try {
      await onSubmit({ email: values.email.trim(), password: values.password, remember });
      setStatus("success");
      setMessage("Signed in. Opening your notebooks…");
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error && error.message
          ? error.message
          : "We couldn't sign you in with that email and password. Check both and try again."
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
        setErrors((current) => ({ ...current, [name]: validate(values)[name] }));
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
      data-slot="sign-in-split"
      aria-labelledby={`${id}-title`}
      style={
        {
          "--block-accent": accent,
          "--block-accent-fg": accentForeground,
          "--block-highlight": highlight,
          ...style,
        } as CSSProperties
      }
      className={cn("w-full bg-background text-foreground", className)}
      {...props}
    >
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <div className="grid border lg:grid-cols-12">
          {/* Ink panel: a top strip on small screens, a full column from lg. */}
          <div className="flex flex-col bg-[var(--block-accent)] px-6 py-4 text-[var(--block-accent-fg)] lg:col-span-5 lg:justify-between lg:p-10">
            <div className="flex items-center justify-between gap-4">
              <span className="inline-flex items-center gap-2 text-lg font-semibold tracking-tight">
                <span aria-hidden="true" className="size-2.5 bg-[var(--block-highlight)]" />
                Larch
              </span>
              <span className="font-mono text-[11px] tracking-wider uppercase lg:hidden">
                {tagline}
              </span>
            </div>

            <svg
              aria-hidden="true"
              viewBox="0 0 320 220"
              className="mt-12 hidden w-full max-w-sm lg:block"
            >
              {Array.from({ length: 24 }, (_, i) => (
                <circle
                  key={i}
                  cx={12 + (i % 6) * 18}
                  cy={12 + Math.floor(i / 6) * 18}
                  r={2.5}
                  className="fill-current"
                />
              ))}
              <path d="M 20 220 A 100 100 0 0 1 220 220 Z" className="fill-current" />
              <circle cx={258} cy={70} r={40} className="fill-[var(--block-highlight)]" />
              <rect x={244} y={130} width={28} height={90} className="fill-[var(--block-highlight)]" />
            </svg>

            {quote ? (
              <figure className="mt-12 hidden border-t border-current/30 pt-6 lg:block">
                <blockquote className="text-lg leading-snug tracking-tight text-pretty">
                  &ldquo;{quote.text}&rdquo;
                </blockquote>
                <figcaption className="mt-6 text-sm">
                  <span className="font-semibold">{quote.name}</span>, {quote.role}
                  <span className="mt-1 block font-mono text-[11px] tracking-wider uppercase">
                    {quote.organization}
                  </span>
                </figcaption>
              </figure>
            ) : null}
          </div>

          <div className="px-6 py-10 sm:px-10 md:py-14 lg:col-span-7 lg:px-16">
            <div className="max-w-md">
              <p className="font-mono text-xs tracking-wider text-muted-foreground uppercase">
                {eyebrow}
              </p>
              <h2
                id={`${id}-title`}
                className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-balance md:text-4xl"
              >
                {title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{description}</p>

              <form
                noValidate
                onSubmit={handleSubmit}
                aria-busy={submitting}
                className="mt-10 grid gap-6"
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

                <div className="grid gap-2">
                  <div className="flex items-baseline justify-between gap-4">
                    <Label htmlFor={fieldId("password")}>Password</Label>
                    <a href={forgotPasswordHref} className={cn(linkClass, "text-xs font-normal text-muted-foreground hover:text-foreground")}>
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

                <div className="flex items-center gap-2">
                  <Checkbox
                    id={`${id}-remember`}
                    checked={remember}
                    onCheckedChange={(checked) => setRemember(checked === true)}
                  />
                  <Label htmlFor={`${id}-remember`} className="font-normal">
                    Keep me signed in
                  </Label>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  disabled={submitting}
                  className="w-full rounded-none bg-[var(--block-accent)] text-[var(--block-accent-fg)] shadow-none hover:bg-[var(--block-accent)] hover:underline hover:underline-offset-4"
                >
                  {submitting ? (
                    <>
                      <Loader2 aria-hidden="true" className="animate-spin motion-reduce:animate-none" />
                      Signing in…
                    </>
                  ) : (
                    "Sign in"
                  )}
                </Button>

                <p
                  role="status"
                  aria-live="polite"
                  className={cn(
                    "text-sm empty:hidden",
                    status === "error" ? "border-l-2 border-destructive pl-3 text-destructive" : "flex items-center gap-2"
                  )}
                >
                  {status === "success" ? (
                    <span aria-hidden="true" className="size-1.5 bg-[var(--block-accent)]" />
                  ) : null}
                  {message}
                </p>
              </form>

              {providers.length > 0 ? (
                <>
                  <div className="my-8 flex items-center gap-4" aria-hidden="true">
                    <span className="h-px flex-1 bg-border" />
                    <span className="font-mono text-[11px] tracking-wider text-muted-foreground uppercase">
                      or
                    </span>
                    <span className="h-px flex-1 bg-border" />
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {providers.map((provider) => (
                      <Button
                        key={provider.id}
                        type="button"
                        variant="outline"
                        className="rounded-none shadow-none"
                        onClick={() => onProviderClick?.(provider.id)}
                      >
                        {provider.label}
                      </Button>
                    ))}
                  </div>
                </>
              ) : null}

              <p className="mt-10 border-t pt-6 text-sm text-muted-foreground">
                New to Larch?{" "}
                <a href={signUpHref} className={cn(linkClass, "text-foreground")}>
                  Create an account
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
