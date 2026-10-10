"use client";

import {
  useId,
  useState,
  type ChangeEvent,
  type ComponentProps,
  type CSSProperties,
  type FormEvent,
} from "react";
import { Check, Eye, EyeOff, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export type SignUpSplitValues = {
  name: string;
  email: string;
  password: string;
  acceptedTerms: true;
};

export type SignUpSplitProvider = { id: string; label: string };

export type SignUpSplitPlan = {
  eyebrow: string;
  title: string;
  items: { title: string; detail: string }[];
  footnote?: string;
};

export type SignUpSplitProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  plan?: SignUpSplitPlan;
  providers?: SignUpSplitProvider[];
  onProviderClick?: (id: string) => void;
  onSubmit?: (values: SignUpSplitValues) => void | Promise<void>;
  signInHref?: string;
  termsHref?: string;
  privacyHref?: string;
  /** Panel field. Defaults to a pale blue tint. */
  surface?: string;
  /** Text colour on `surface`. Must pass contrast against it. */
  surfaceForeground?: string;
  /** Wordmark square, ticks, shapes and primary button. Defaults to Devsloka blue. */
  accent?: string;
  /** Text colour on `accent`. Defaults to white. */
  accentForeground?: string;
} & Omit<ComponentProps<"section">, "onSubmit">;

const DEFAULTS = {
  eyebrow: "Create an account",
  title: "Start a notebook for your next round of interviews.",
  description: "Free for teams of up to three. Set-up takes about two minutes.",
  plan: {
    eyebrow: "Free plan · No card",
    title: "What you get on the free plan",
    items: [
      {
        title: "Three seats, unlimited notebooks",
        detail: "Invite two colleagues and keep every study in its own notebook.",
      },
      {
        title: "10 hours of transcription a month",
        detail: "Upload interview audio in 14 languages; speakers are labelled for you.",
      },
      {
        title: "Tags, highlights and exports",
        detail: "Tag quotes across studies and export them to CSV or Markdown.",
      },
    ],
    footnote:
      "A fourth seat moves you to Studio at €9 per person a month. We ask before charging anything.",
  },
  providers: [
    { id: "google", label: "Continue with Google" },
    { id: "sso", label: "Continue with SSO" },
  ],
  surface: "#E8F0FF",
  surfaceForeground: "#0A0A0A",
  accent: "#0A6EFF",
  accentForeground: "#FFFFFF",
};

type Field = "name" | "email" | "password" | "terms";
type Errors = Partial<Record<Field, string>>;
type Status = "idle" | "submitting" | "success" | "error";
type Values = { name: string; email: string; password: string; terms: boolean };

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function passwordRequirements(password: string, email: string) {
  const lowerPassword = password.toLowerCase();
  const lowerEmail = email.trim().toLowerCase();
  const localPart = lowerEmail.split("@")[0] ?? "";
  const containsEmail =
    lowerEmail.length > 0 &&
    (lowerPassword.includes(lowerEmail) ||
      (localPart.length >= 3 && lowerPassword.includes(localPart)));
  return [
    { id: "length", label: "At least 12 characters", met: password.length >= 12 },
    { id: "number", label: "Includes a number", met: /\d/.test(password) },
    {
      id: "email",
      label: "Doesn't contain your email",
      met: password.length > 0 && !containsEmail,
    },
  ];
}

function validate(values: Values): Errors {
  const errors: Errors = {};
  if (!values.name.trim()) errors.name = "Add your name so teammates know who's who.";
  const email = values.email.trim();
  if (!email) errors.email = "Enter your work email.";
  else if (!EMAIL_PATTERN.test(email))
    errors.email = "That email looks incomplete. Check for a typo.";
  if (!values.password) errors.password = "Choose a password.";
  else {
    const missing = passwordRequirements(values.password, values.email).filter((r) => !r.met);
    if (missing.length > 0)
      errors.password = `Almost there. Still needed: ${missing
        .map((r) => r.label.toLowerCase())
        .join(", ")}.`;
  }
  if (!values.terms) errors.terms = "Accept the terms to create your account.";
  return errors;
}

const defaultSubmit = () =>
  new Promise<void>((resolve) => setTimeout(resolve, 900));

const linkClass =
  "rounded-sm font-medium underline decoration-1 underline-offset-4 outline-none hover:decoration-2 focus-visible:ring-2 focus-visible:ring-ring";

const pad = (n: number) => String(n).padStart(2, "0");

export function SignUpSplit({
  eyebrow = DEFAULTS.eyebrow,
  title = DEFAULTS.title,
  description = DEFAULTS.description,
  plan = DEFAULTS.plan,
  providers = DEFAULTS.providers,
  onProviderClick,
  onSubmit = defaultSubmit,
  signInHref = "#",
  termsHref = "#",
  privacyHref = "#",
  surface = DEFAULTS.surface,
  surfaceForeground = DEFAULTS.surfaceForeground,
  accent = DEFAULTS.accent,
  accentForeground = DEFAULTS.accentForeground,
  className,
  style,
  ...props
}: SignUpSplitProps) {
  const id = useId();
  const [values, setValues] = useState<Values>({
    name: "",
    email: "",
    password: "",
    terms: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [attempted, setAttempted] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  const fieldId = (name: Field) => `${id}-${name}`;
  const errorId = (name: Field) => `${id}-${name}-error`;
  const requirementsId = `${id}-requirements`;
  const submitting = status === "submitting";
  const requirements = passwordRequirements(values.password, values.email);
  const metCount = requirements.filter((r) => r.met).length;

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
      await onSubmit({
        name: values.name.trim(),
        email: values.email.trim(),
        password: values.password,
        acceptedTerms: true,
      });
      setStatus("success");
      setMessage(
        `Account created. We sent a confirmation to ${values.email.trim()}; open it to finish setting up.`
      );
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error && error.message
          ? error.message
          : "We couldn't create the account just now. Your details are still here, so try again in a moment."
      );
    }
  };

  const revalidate = (name: Field, next: Values = values) => {
    if (attempted) setErrors((current) => ({ ...current, [name]: validate(next)[name] }));
  };

  const fieldProps = (name: Exclude<Field, "terms">) => ({
    id: fieldId(name),
    name,
    value: values[name],
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? errorId(name) : undefined,
    onChange: (event: ChangeEvent<HTMLInputElement>) =>
      setValues((current) => ({ ...current, [name]: event.target.value })),
    onBlur: () => revalidate(name),
  });

  const errorText = (name: Field) =>
    errors[name] ? (
      <p id={errorId(name)} className="text-xs text-destructive">
        {errors[name]}
      </p>
    ) : null;

  return (
    <section
      data-slot="sign-up-split"
      aria-labelledby={`${id}-title`}
      style={
        {
          "--block-surface": surface,
          "--block-surface-fg": surfaceForeground,
          "--block-accent": accent,
          "--block-accent-fg": accentForeground,
          ...style,
        } as CSSProperties
      }
      className={cn("w-full bg-background text-foreground", className)}
      {...props}
    >
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <div className="grid border lg:grid-cols-12">
          <div className="px-6 py-10 sm:px-10 md:py-14 lg:col-span-7 lg:px-14">
            <span className="inline-flex items-center gap-2 text-lg font-semibold tracking-tight">
              <span aria-hidden="true" className="size-2.5 bg-[var(--block-accent)]" />
              Larch
            </span>
            <p className="mt-10 font-mono text-xs tracking-wider text-muted-foreground uppercase">
              {eyebrow}
            </p>
            <h2
              id={`${id}-title`}
              className="mt-4 max-w-lg text-3xl font-semibold tracking-[-0.03em] text-balance md:text-4xl"
            >
              {title}
            </h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
              {description}
            </p>

            <form
              noValidate
              onSubmit={handleSubmit}
              aria-busy={submitting}
              className="mt-10 grid max-w-md gap-6"
            >
              <div className="grid gap-2">
                <Label htmlFor={fieldId("name")}>Full name</Label>
                <Input {...fieldProps("name")} autoComplete="name" required />
                {errorText("name")}
              </div>

              <div className="grid gap-2">
                <Label htmlFor={fieldId("email")}>Work email</Label>
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
                <Label htmlFor={fieldId("password")}>Password</Label>
                <div className="relative">
                  <Input
                    {...fieldProps("password")}
                    aria-describedby={cn(requirementsId, errors.password && errorId("password"))}
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
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
                <ul id={requirementsId} className="mt-1 grid gap-1.5 text-xs">
                  {requirements.map((requirement) => (
                    <li
                      key={requirement.id}
                      className={cn(
                        "flex items-center gap-2",
                        requirement.met ? "text-foreground" : "text-muted-foreground"
                      )}
                    >
                      <span
                        aria-hidden="true"
                        className={cn(
                          "flex size-3.5 items-center justify-center border",
                          requirement.met
                            ? "border-[var(--block-accent)] bg-[var(--block-accent)] text-[var(--block-accent-fg)]"
                            : "border-current"
                        )}
                      >
                        {requirement.met ? <Check className="size-2.5" strokeWidth={3} /> : null}
                      </span>
                      {requirement.label}
                      <span className="sr-only">{requirement.met ? "(met)" : "(not met yet)"}</span>
                    </li>
                  ))}
                </ul>
                <p aria-live="polite" className="sr-only">
                  {values.password
                    ? `${metCount} of ${requirements.length} password requirements met.`
                    : ""}
                </p>
                {errorText("password")}
              </div>

              <div className="grid gap-2">
                <div className="flex items-start gap-3">
                  <Checkbox
                    id={fieldId("terms")}
                    checked={values.terms}
                    required
                    aria-required="true"
                    aria-invalid={errors.terms ? true : undefined}
                    aria-describedby={errors.terms ? errorId("terms") : undefined}
                    onCheckedChange={(checked) => {
                      const next = { ...values, terms: checked === true };
                      setValues(next);
                      revalidate("terms", next);
                    }}
                    className="mt-0.5"
                  />
                  <Label htmlFor={fieldId("terms")} className="block leading-relaxed font-normal">
                    I agree to the{" "}
                    <a href={termsHref} className={linkClass}>
                      Terms of service
                    </a>{" "}
                    and the{" "}
                    <a href={privacyHref} className={linkClass}>
                      Privacy policy
                    </a>
                    .
                  </Label>
                </div>
                {errorText("terms")}
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
                    Creating account…
                  </>
                ) : (
                  "Create account"
                )}
              </Button>

              <p
                role="status"
                aria-live="polite"
                className={cn(
                  "text-sm leading-relaxed empty:hidden",
                  status === "error" && "border-l-2 border-destructive pl-3 text-destructive",
                  status === "success" && "border-l-2 border-[var(--block-accent)] pl-3"
                )}
              >
                {message}
              </p>
            </form>

            {providers.length > 0 ? (
              <div className="mt-8 max-w-md">
                <div className="flex items-center gap-4" aria-hidden="true">
                  <span className="h-px flex-1 bg-border" />
                  <span className="font-mono text-[11px] tracking-wider text-muted-foreground uppercase">
                    or
                  </span>
                  <span className="h-px flex-1 bg-border" />
                </div>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
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
              </div>
            ) : null}

            <p className="mt-10 max-w-md border-t pt-6 text-sm text-muted-foreground">
              Already have an account?{" "}
              <a href={signInHref} className={cn(linkClass, "text-foreground")}>
                Sign in
              </a>
            </p>
          </div>

          <div className="flex flex-col bg-[var(--block-surface)] px-6 py-10 text-[var(--block-surface-fg)] sm:px-10 md:py-14 lg:col-span-5">
            <p className="font-mono text-xs tracking-wider uppercase">{plan.eyebrow}</p>
            <h3 className="mt-4 max-w-xs text-2xl font-semibold tracking-[-0.02em] text-balance">
              {plan.title}
            </h3>

            <ol className="mt-8 divide-y divide-[var(--block-surface-fg)]/25 border-y border-[var(--block-surface-fg)]/25">
              {plan.items.map((item, index) => (
                <li key={item.title} className="grid grid-cols-[2.5rem_1fr] gap-x-2 py-4">
                  <span aria-hidden="true" className="font-mono text-xs leading-6 font-semibold tabular-nums">
                    {pad(index + 1)}
                  </span>
                  <div>
                    <p className="font-medium leading-6">{item.title}</p>
                    <p className="mt-1 text-sm leading-relaxed">{item.detail}</p>
                  </div>
                </li>
              ))}
            </ol>

            <svg
              aria-hidden="true"
              viewBox="0 0 240 64"
              className="mt-10 w-full max-w-[15rem] lg:mt-auto lg:pt-10"
            >
              {[0, 1, 2].map((i) => (
                <rect
                  key={i}
                  x={i * 56}
                  y={8}
                  width={48}
                  height={48}
                  className="fill-[var(--block-accent)]"
                />
              ))}
              <rect
                x={169}
                y={9}
                width={46}
                height={46}
                strokeWidth={2}
                strokeDasharray="4 4"
                className="fill-none stroke-[var(--block-accent)]"
              />
            </svg>

            {plan.footnote ? (
              <p className="mt-4 max-w-xs text-xs leading-relaxed">{plan.footnote}</p>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
