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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export type SignUpStepsValues = {
  email: string;
  password: string;
  workspaceName: string;
  teamSize: string;
  role: string;
};

export type SignUpStepsOption = { value: string; label: string };

export type SignUpStepsProps = {
  /** Headings for step 1 and step 2. */
  stepTitles?: [string, string];
  /** Short labels for the step list in the margin. */
  stepLabels?: [string, string];
  teamSizes?: SignUpStepsOption[];
  roles?: SignUpStepsOption[];
  /** Domain shown after the workspace slug, e.g. "larch.app". */
  workspaceDomain?: string;
  onSubmit?: (values: SignUpStepsValues) => void | Promise<void>;
  signInHref?: string;
  termsHref?: string;
  /** Wordmark square, progress fill, selected segment and primary button. Defaults to Devsloka blue. */
  accent?: string;
  /** Text colour on `accent`. Defaults to white. */
  accentForeground?: string;
} & Omit<ComponentProps<"section">, "onSubmit">;

const DEFAULTS = {
  stepTitles: ["Create your account", "Set up your workspace"] as [string, string],
  stepLabels: ["Account", "Workspace"] as [string, string],
  teamSizes: [
    { value: "1", label: "Just me" },
    { value: "2-5", label: "2–5" },
    { value: "6-15", label: "6–15" },
    { value: "16+", label: "16+" },
  ],
  roles: [
    { value: "researcher", label: "Researcher" },
    { value: "designer", label: "Designer" },
    { value: "product", label: "Product manager" },
    { value: "academic", label: "Academic or student" },
    { value: "other", label: "Something else" },
  ],
  workspaceDomain: "larch.app",
  accent: "#0A6EFF",
  accentForeground: "#FFFFFF",
};

type Field = keyof SignUpStepsValues;
type Errors = Partial<Record<Field, string>>;
type Status = "idle" | "submitting" | "success" | "error";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const STEP_FIELDS: Record<1 | 2, Field[]> = {
  1: ["email", "password"],
  2: ["workspaceName", "teamSize", "role"],
};

function validate(values: SignUpStepsValues, step: 1 | 2): Errors {
  const errors: Errors = {};
  if (step === 1) {
    const email = values.email.trim();
    if (!email) errors.email = "Enter your work email.";
    else if (!EMAIL_PATTERN.test(email))
      errors.email = "That email looks incomplete. Check for a typo.";
    if (!values.password) errors.password = "Choose a password.";
    else if (values.password.length < 12)
      errors.password = `Use at least 12 characters (${values.password.length} so far).`;
  } else {
    if (!values.workspaceName.trim())
      errors.workspaceName = "Name the workspace. You can change it later.";
    if (!values.teamSize) errors.teamSize = "Pick the closest team size.";
    if (!values.role) errors.role = "Pick the role closest to yours.";
  }
  return errors;
}

const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40);

const defaultSubmit = () =>
  new Promise<void>((resolve) => setTimeout(resolve, 900));

const linkClass =
  "rounded-sm font-medium underline decoration-1 underline-offset-4 outline-none hover:decoration-2 focus-visible:ring-2 focus-visible:ring-ring";

export function SignUpSteps({
  stepTitles = DEFAULTS.stepTitles,
  stepLabels = DEFAULTS.stepLabels,
  teamSizes = DEFAULTS.teamSizes,
  roles = DEFAULTS.roles,
  workspaceDomain = DEFAULTS.workspaceDomain,
  onSubmit = defaultSubmit,
  signInHref = "#",
  termsHref = "#",
  accent = DEFAULTS.accent,
  accentForeground = DEFAULTS.accentForeground,
  className,
  style,
  ...props
}: SignUpStepsProps) {
  const id = useId();
  const headingRef = useRef<HTMLHeadingElement>(null);
  const navigatedRef = useRef(false);
  const [step, setStep] = useState<1 | 2>(1);
  const [values, setValues] = useState<SignUpStepsValues>({
    email: "",
    password: "",
    workspaceName: "",
    teamSize: "",
    role: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [attempted, setAttempted] = useState<Record<1 | 2, boolean>>({ 1: false, 2: false });
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  const fieldId = (name: Field) => `${id}-${name}`;
  const errorId = (name: Field) => `${id}-${name}-error`;
  const submitting = status === "submitting";
  const slug = slugify(values.workspaceName);
  const done = status === "success";

  // Move focus to the new step's heading after Back / Continue (not on first render).
  useEffect(() => {
    if (navigatedRef.current) headingRef.current?.focus();
  }, [step, done]);

  const goTo = (next: 1 | 2) => {
    navigatedRef.current = true;
    setErrors({});
    setStatus("idle");
    setMessage("");
    setStep(next);
  };

  const update = <K extends Field>(name: K, value: SignUpStepsValues[K], revalidateNow = false) => {
    const next = { ...values, [name]: value };
    setValues(next);
    if (revalidateNow && attempted[step])
      setErrors((current) => ({ ...current, [name]: validate(next, step)[name] }));
  };

  const revalidate = (name: Field) => {
    if (attempted[step])
      setErrors((current) => ({ ...current, [name]: validate(values, step)[name] }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setAttempted((current) => ({ ...current, [step]: true }));
    const nextErrors = validate(values, step);
    setErrors(nextErrors);
    const firstInvalid = STEP_FIELDS[step].find((field) => nextErrors[field]);
    if (firstInvalid) {
      const target = document.getElementById(fieldId(firstInvalid));
      // For the radio group, focus the checked radio or the first one.
      if (target instanceof HTMLFieldSetElement) {
        target
          .querySelector<HTMLInputElement>("input:checked, input[type=radio]")
          ?.focus();
      } else {
        target?.focus();
      }
      return;
    }

    if (step === 1) {
      goTo(2);
      return;
    }

    setStatus("submitting");
    setMessage("");
    try {
      await onSubmit({
        ...values,
        email: values.email.trim(),
        workspaceName: values.workspaceName.trim(),
      });
      navigatedRef.current = true;
      setStatus("success");
      setMessage(`Workspace created at ${slug || "your-team"}.${workspaceDomain}.`);
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error && error.message
          ? error.message
          : "We couldn't create the workspace just now. Nothing was lost; try again in a moment."
      );
    }
  };

  const inputProps = (name: "email" | "password" | "workspaceName") => ({
    id: fieldId(name),
    name,
    value: values[name],
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? errorId(name) : undefined,
    onChange: (event: ChangeEvent<HTMLInputElement>) => update(name, event.target.value),
    onBlur: () => revalidate(name),
  });

  const errorText = (name: Field) =>
    errors[name] ? (
      <p id={errorId(name)} className="text-xs text-destructive">
        {errors[name]}
      </p>
    ) : null;

  const progress = done ? 100 : step === 1 ? 50 : 100;

  return (
    <section
      data-slot="sign-up-steps"
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
        <div className="grid gap-10 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-4">
            <span className="inline-flex items-center gap-2 text-lg font-semibold tracking-tight">
              <span aria-hidden="true" className="size-2.5 bg-[var(--block-accent)]" />
              Larch
            </span>
            <ol className="mt-10 hidden border-t md:block">
              {stepLabels.map((label, index) => {
                const number = (index + 1) as 1 | 2;
                const current = !done && number === step;
                const complete = done || number < step;
                return (
                  <li
                    key={label}
                    aria-current={current ? "step" : undefined}
                    className={cn(
                      "flex items-baseline gap-4 border-b py-3 text-sm",
                      current ? "font-medium text-foreground" : "text-muted-foreground"
                    )}
                  >
                    <span className="font-mono text-xs tabular-nums">0{number}</span>
                    {label}
                    {complete ? (
                      <span className="ml-auto font-mono text-[11px] tracking-wider uppercase">
                        Done
                      </span>
                    ) : null}
                  </li>
                );
              })}
            </ol>
            <p className="mt-6 hidden max-w-[16rem] text-xs leading-relaxed text-muted-foreground md:block">
              Free for up to three people. No card, and you can delete the workspace at any time.
            </p>
          </div>

          <div className="md:col-span-7 md:col-start-6">
            <div className="max-w-md">
              <div className="flex items-baseline justify-between font-mono text-xs tracking-wider text-muted-foreground uppercase">
                <span>{done ? "Complete" : `Step ${step} of 2`}</span>
                <span>{done ? "" : stepLabels[step - 1]}</span>
              </div>
              <div aria-hidden="true" className="mt-3 h-0.5 w-full bg-border">
                <div
                  className="h-full bg-[var(--block-accent)] transition-[width] duration-300 motion-reduce:transition-none"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <h2
                id={`${id}-title`}
                ref={headingRef}
                tabIndex={-1}
                className="mt-10 text-3xl font-semibold tracking-[-0.03em] outline-none md:text-4xl"
              >
                {done ? "Your workspace is ready." : stepTitles[step - 1]}
              </h2>

              {done ? (
                <div className="mt-6">
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    We sent a confirmation to{" "}
                    <span className="font-medium text-foreground">{values.email.trim()}</span>.
                    Your team can find you at:
                  </p>
                  <p className="mt-4 border-y py-3 font-mono text-sm">
                    {slug || "your-team"}.{workspaceDomain}
                  </p>
                </div>
              ) : (
                <form
                  noValidate
                  onSubmit={handleSubmit}
                  aria-busy={submitting}
                  className="mt-8 grid gap-6"
                >
                  {step === 1 ? (
                    <>
                      <div className="grid gap-2">
                        <Label htmlFor={fieldId("email")}>Work email</Label>
                        <Input
                          {...inputProps("email")}
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
                            {...inputProps("password")}
                            aria-describedby={cn(`${id}-password-hint`, errors.password && errorId("password"))}
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
                        <p id={`${id}-password-hint`} className="text-xs text-muted-foreground">
                          At least 12 characters. A short sentence works well.
                        </p>
                        {errorText("password")}
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="grid gap-2">
                        <Label htmlFor={fieldId("workspaceName")}>Workspace name</Label>
                        <Input
                          {...inputProps("workspaceName")}
                          aria-describedby={cn(`${id}-slug`, errors.workspaceName && errorId("workspaceName"))}
                          autoComplete="organization"
                          placeholder="Field Notes"
                          required
                        />
                        <p id={`${id}-slug`} className="font-mono text-xs text-muted-foreground">
                          {slug || "your-team"}.{workspaceDomain}
                        </p>
                        {errorText("workspaceName")}
                      </div>

                      <fieldset
                        id={fieldId("teamSize")}
                        aria-invalid={errors.teamSize ? true : undefined}
                        aria-describedby={errors.teamSize ? errorId("teamSize") : undefined}
                        className="grid gap-2"
                      >
                        <legend className="mb-2 text-sm leading-none font-medium">Team size</legend>
                        <div className="grid grid-cols-2 border-t border-l sm:grid-cols-4">
                          {teamSizes.map((option) => {
                            const optionId = `${id}-team-${option.value}`;
                            return (
                              <label
                                key={option.value}
                                htmlFor={optionId}
                                className="relative cursor-pointer border-r border-b text-center text-sm has-[:checked]:bg-[var(--block-accent)] has-[:checked]:text-[var(--block-accent-fg)] has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring has-[:focus-visible]:ring-inset"
                              >
                                <input
                                  id={optionId}
                                  type="radio"
                                  name="teamSize"
                                  value={option.value}
                                  checked={values.teamSize === option.value}
                                  onChange={() => update("teamSize", option.value, true)}
                                  className="sr-only"
                                />
                                <span className="block px-3 py-2.5 tabular-nums">{option.label}</span>
                              </label>
                            );
                          })}
                        </div>
                        {errorText("teamSize")}
                      </fieldset>

                      <div className="grid gap-2">
                        <Label htmlFor={fieldId("role")}>Your role</Label>
                        <Select
                          name="role"
                          value={values.role}
                          onValueChange={(value) => update("role", value, true)}
                        >
                          <SelectTrigger
                            id={fieldId("role")}
                            aria-invalid={errors.role ? true : undefined}
                            aria-describedby={errors.role ? errorId("role") : undefined}
                            className="w-full"
                          >
                            <SelectValue placeholder="Choose one" />
                          </SelectTrigger>
                          <SelectContent>
                            {roles.map((role) => (
                              <SelectItem key={role.value} value={role.value}>
                                {role.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errorText("role")}
                      </div>
                    </>
                  )}

                  <div className="flex flex-wrap items-center justify-between gap-4 border-t pt-6">
                    {step === 2 ? (
                      <Button
                        type="button"
                        variant="ghost"
                        className="rounded-none"
                        disabled={submitting}
                        onClick={() => goTo(1)}
                      >
                        Back
                      </Button>
                    ) : (
                      <p className="text-xs text-muted-foreground">
                        By continuing you accept the{" "}
                        <a href={termsHref} className={linkClass}>
                          terms
                        </a>
                        .
                      </p>
                    )}
                    <Button
                      type="submit"
                      size="lg"
                      disabled={submitting}
                      className="rounded-none bg-[var(--block-accent)] text-[var(--block-accent-fg)] shadow-none hover:bg-[var(--block-accent)] hover:underline hover:underline-offset-4"
                    >
                      {submitting ? (
                        <>
                          <Loader2 aria-hidden="true" className="animate-spin motion-reduce:animate-none" />
                          Creating workspace…
                        </>
                      ) : step === 1 ? (
                        "Continue"
                      ) : (
                        "Create workspace"
                      )}
                    </Button>
                  </div>
                </form>
              )}

              <p
                role="status"
                aria-live="polite"
                className={cn(
                  "mt-6 text-sm empty:hidden",
                  status === "error" ? "border-l-2 border-destructive pl-3 text-destructive" : "sr-only"
                )}
              >
                {status === "idle" && !done ? `Step ${step} of 2: ${stepLabels[step - 1]}` : message}
              </p>

              {!done ? (
                <p className="mt-10 text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <a href={signInHref} className={cn(linkClass, "text-foreground")}>
                    Sign in
                  </a>
                </p>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
