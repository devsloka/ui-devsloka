"use client";

import { useId, useRef, useState, type ComponentProps, type FormEvent } from "react";
import { ArrowUpRight, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

export type ContactValues = {
  name: string;
  email: string;
  company: string;
  topic: string;
  message: string;
};

export type ContactChannel = {
  label: string;
  value: string;
  href?: string;
  detail?: string;
};

export type ContactBlockProps = {
  eyebrow?: string;
  title?: string;
  intro?: string;
  channels?: ContactChannel[];
  responseNote?: string;
  topics?: string[];
  onSubmit?: (values: ContactValues) => void | Promise<void>;
} & Omit<ComponentProps<"section">, "onSubmit">;

const DEFAULT_CHANNELS: ContactChannel[] = [
  {
    label: "New work",
    value: "projects@halden.studio",
    href: "mailto:projects@halden.studio",
    detail: "Briefs, budgets, timelines. A rough outline is fine.",
  },
  {
    label: "Everything else",
    value: "hello@halden.studio",
    href: "mailto:hello@halden.studio",
    detail: "Press, talks, internships, saying hello.",
  },
  {
    label: "Studio",
    value: "Torstraße 118, 10119 Berlin",
    detail: "Mon–Thu, 09:30–18:00 CET. Visits by appointment.",
  },
];

const DEFAULT_TOPICS = ["New project", "Existing project", "Press", "Something else"];

type Errors = Partial<Record<keyof ContactValues, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values: ContactValues): Errors {
  const errors: Errors = {};
  if (!values.name.trim()) errors.name = "Tell us who you are.";
  if (!values.email.trim()) errors.email = "We need an email to reply to.";
  else if (!EMAIL_PATTERN.test(values.email.trim()))
    errors.email = "That email looks incomplete — check for a typo.";
  if (!values.topic) errors.topic = "Pick the closest topic.";
  if (values.message.trim().length < 20)
    errors.message = "A sentence or two, please (20 characters minimum).";
  return errors;
}

const defaultSubmit = () =>
  new Promise<void>((resolve) => setTimeout(resolve, 900));

export default function ContactBlock({
  eyebrow = "Contact",
  title = "Start with an email. We'll take it from there.",
  intro = "Halden is a six-person design studio working on identities, websites and the occasional book. We take on four or five projects a year.",
  channels = DEFAULT_CHANNELS,
  responseNote = "We reply within one working day.",
  topics = DEFAULT_TOPICS,
  onSubmit = defaultSubmit,
  className,
  ...props
}: ContactBlockProps) {
  const id = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [topic, setTopic] = useState(topics[0] ?? "");
  const [sentName, setSentName] = useState("");

  const fieldId = (name: keyof ContactValues) => `${id}-${name}`;
  const errorId = (name: keyof ContactValues) => `${id}-${name}-error`;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const values: ContactValues = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      company: String(data.get("company") ?? ""),
      topic,
      message: String(data.get("message") ?? ""),
    };

    const nextErrors = validate(values);
    setErrors(nextErrors);
    const firstInvalid = Object.keys(nextErrors)[0] as keyof ContactValues | undefined;
    if (firstInvalid) {
      formRef.current
        ?.querySelector<HTMLElement>(`#${CSS.escape(fieldId(firstInvalid))}`)
        ?.focus();
      return;
    }

    setStatus("sending");
    try {
      await onSubmit(values);
      setSentName(values.name.trim().split(" ")[0]);
      setStatus("sent");
    } catch {
      setStatus("idle");
    }
  };

  const clearError = (name: keyof ContactValues) => {
    if (errors[name]) setErrors((current) => ({ ...current, [name]: undefined }));
  };

  const fieldProps = (name: keyof ContactValues) => ({
    id: fieldId(name),
    name,
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? errorId(name) : undefined,
    onChange: () => clearError(name),
  });

  const errorText = (name: keyof ContactValues) =>
    errors[name] ? (
      <p id={errorId(name)} className="text-destructive text-xs">
        {errors[name]}
      </p>
    ) : null;

  return (
    <section
      data-slot="contact-block"
      aria-labelledby={`${id}-title`}
      className={cn("bg-background text-foreground w-full", className)}
      {...props}
    >
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <div className="grid gap-14 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-5">
            <p className="text-muted-foreground font-mono text-xs tracking-wider uppercase">
              {eyebrow}
            </p>
            <h2
              id={`${id}-title`}
              className="mt-4 max-w-md text-3xl font-semibold tracking-tight text-balance md:text-5xl"
            >
              {title}
            </h2>
            <p className="text-muted-foreground mt-5 max-w-sm text-sm leading-relaxed">
              {intro}
            </p>

            <dl className="mt-12 divide-y border-y">
              {channels.map((channel) => (
                <div key={channel.label} className="grid grid-cols-3 gap-4 py-5">
                  <dt className="text-muted-foreground font-mono text-xs tracking-wider uppercase">
                    {channel.label}
                  </dt>
                  <dd className="col-span-2 text-sm">
                    {channel.href ? (
                      <a
                        href={channel.href}
                        className="group decoration-primary inline-flex items-center gap-1 rounded-sm font-medium underline-offset-4 outline-none hover:underline focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        {channel.value}
                        <ArrowUpRight
                          aria-hidden="true"
                          className="text-muted-foreground size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transition-none"
                        />
                      </a>
                    ) : (
                      <span className="font-medium">{channel.value}</span>
                    )}
                    {channel.detail ? (
                      <p className="text-muted-foreground mt-1 leading-relaxed">
                        {channel.detail}
                      </p>
                    ) : null}
                  </dd>
                </div>
              ))}
            </dl>

            <p className="mt-6 flex items-center gap-2 text-sm">
              <span aria-hidden="true" className="bg-primary size-1.5" />
              {responseNote}
            </p>
          </div>

          <div className="md:col-span-6 md:col-start-7">
            <div aria-live="polite" role="status">
              {status === "sent" ? (
                <div className="border-t pt-6">
                  <p className="text-muted-foreground font-mono text-xs tracking-wider uppercase">
                    Message received
                  </p>
                  <p className="mt-4 text-2xl font-semibold tracking-tight">
                    Thanks{sentName ? `, ${sentName}` : ""}. It&apos;s in our inbox.
                  </p>
                  <p className="text-muted-foreground mt-3 max-w-prose text-sm leading-relaxed">
                    {responseNote} If it&apos;s urgent, reply to the confirmation email and
                    mark the subject with [urgent].
                  </p>
                  <Button
                    type="button"
                    variant="outline"
                    className="mt-8"
                    onClick={() => {
                      setStatus("idle");
                      setErrors({});
                    }}
                  >
                    Send another message
                  </Button>
                </div>
              ) : null}
            </div>

            {status !== "sent" ? (
              <form
                ref={formRef}
                noValidate
                onSubmit={handleSubmit}
                aria-busy={status === "sending"}
                className="grid gap-6 border-t pt-6"
              >
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor={fieldId("name")}>Name</Label>
                    <Input {...fieldProps("name")} autoComplete="name" required />
                    {errorText("name")}
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor={fieldId("email")}>Email</Label>
                    <Input
                      {...fieldProps("email")}
                      type="email"
                      autoComplete="email"
                      required
                    />
                    {errorText("email")}
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor={fieldId("company")}>
                    Company{" "}
                    <span className="text-muted-foreground font-normal">(optional)</span>
                  </Label>
                  <Input {...fieldProps("company")} autoComplete="organization" />
                </div>

                <fieldset className="grid gap-3">
                  <legend className="mb-3 text-sm leading-none font-medium">Topic</legend>
                  <RadioGroup
                    id={fieldId("topic")}
                    value={topic}
                    onValueChange={(value) => {
                      setTopic(value);
                      clearError("topic");
                    }}
                    aria-invalid={errors.topic ? true : undefined}
                    aria-describedby={errors.topic ? errorId("topic") : undefined}
                    className="grid grid-cols-2 gap-0 border-t border-l"
                  >
                    {topics.map((option, index) => {
                      const optionId = `${id}-topic-${index}`;
                      return (
                        <Label
                          key={option}
                          htmlFor={optionId}
                          className="has-[[data-state=checked]]:bg-muted cursor-pointer gap-3 border-r border-b px-4 py-3 font-normal"
                        >
                          <RadioGroupItem id={optionId} value={option} />
                          {option}
                        </Label>
                      );
                    })}
                  </RadioGroup>
                  {errorText("topic")}
                </fieldset>

                <div className="grid gap-2">
                  <Label htmlFor={fieldId("message")}>Message</Label>
                  <Textarea
                    {...fieldProps("message")}
                    rows={6}
                    required
                    placeholder="What are you working on, and when does it need to ship?"
                  />
                  {errorText("message")}
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 border-t pt-6">
                  <p className="text-muted-foreground max-w-xs text-xs leading-relaxed">
                    We only use your details to reply. Nothing goes on a mailing list.
                  </p>
                  <Button type="submit" disabled={status === "sending"}>
                    {status === "sending" ? (
                      <>
                        <Loader2 aria-hidden="true" className="animate-spin" />
                        Sending…
                      </>
                    ) : (
                      "Send message"
                    )}
                  </Button>
                </div>
              </form>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}

export { ContactBlock };
