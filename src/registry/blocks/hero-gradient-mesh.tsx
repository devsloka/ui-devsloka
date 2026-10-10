"use client";

import { useEffect, useId, useRef, useState, type ComponentProps } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

type TerminalLine =
  | { kind: "command"; text: string }
  | { kind: "step"; text: string; detail?: string }
  | { kind: "success"; text: string }
  | { kind: "log"; text: string };

export type HeroGradientMeshProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  installCommand?: string;
  docsLink?: { label: string; href: string };
  windowTitle?: string;
  lines?: TerminalLine[];
} & ComponentProps<"section">;

const DEFAULTS = {
  eyebrow: "Pallet CLI · v1.8",
  title: "Deploy from the terminal you already have open.",
  description:
    "Pallet turns any folder with a Dockerfile into a running service. One command, a URL back, and logs streaming before you've switched windows.",
  installCommand: "curl -fsSL pallet.sh/install | sh",
  docsLink: { label: "Read the docs", href: "#" },
  windowTitle: "~/code/orders-api — zsh",
  lines: [
    { kind: "command", text: "pallet deploy" },
    { kind: "step", text: "Found Dockerfile (node 22)" },
    { kind: "step", text: "Building image", detail: "14.2s" },
    { kind: "step", text: "Pushing to fra-1", detail: "3.1s" },
    { kind: "step", text: "Health check on /healthz", detail: "200" },
    { kind: "success", text: "Live at https://orders-api.pallet.run" },
    { kind: "command", text: "pallet logs --follow" },
    { kind: "log", text: "12:04:11  GET  /orders        200  18ms" },
    { kind: "log", text: "12:04:12  POST /orders        201  42ms" },
    { kind: "log", text: "12:04:15  GET  /orders/8812   200  11ms" },
  ] satisfies TerminalLine[],
};

export default function HeroGradientMesh({
  eyebrow = DEFAULTS.eyebrow,
  title = DEFAULTS.title,
  description = DEFAULTS.description,
  installCommand = DEFAULTS.installCommand,
  docsLink = DEFAULTS.docsLink,
  windowTitle = DEFAULTS.windowTitle,
  lines = DEFAULTS.lines,
  className,
  ...props
}: HeroGradientMeshProps) {
  const headingId = useId();
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timeoutRef.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(installCommand);
    } catch {
      return;
    }
    setCopied(true);
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setCopied(false), 1800);
  };

  return (
    <section
      data-slot="hero-gradient-mesh"
      aria-labelledby={headingId}
      className={cn("w-full bg-background text-foreground", className)}
      {...props}
    >
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
          {eyebrow}
        </p>
        <h1
          id={headingId}
          className="mt-8 max-w-4xl text-5xl font-semibold leading-[0.95] tracking-[-0.045em] text-balance sm:text-6xl md:text-7xl"
        >
          {title}
        </h1>

        <div className="mt-14 grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="max-w-md text-base leading-relaxed text-muted-foreground">
              {description}
            </p>

            <div className="mt-8 flex max-w-md items-stretch border font-mono text-sm">
              <span aria-hidden className="border-r px-3 py-2.5 text-muted-foreground">
                $
              </span>
              <code className="min-w-0 flex-1 overflow-x-auto px-3 py-2.5 whitespace-nowrap">
                {installCommand}
              </code>
              <button
                type="button"
                onClick={copy}
                aria-label={copied ? "Copied" : "Copy install command"}
                className="flex w-11 shrink-0 items-center justify-center border-l text-muted-foreground transition-colors outline-none hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
              >
                {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
              </button>
            </div>
            <p aria-live="polite" className="sr-only">
              {copied ? "Install command copied" : ""}
            </p>
            <a
              href={docsLink.href}
              className="mt-5 inline-block text-sm font-medium underline decoration-1 underline-offset-[6px] hover:text-muted-foreground"
            >
              {docsLink.label}
            </a>
          </div>

          <figure className="border bg-card md:col-span-7" aria-label="Example terminal session">
            <div className="flex items-center gap-3 border-b px-4 py-2.5">
              <span aria-hidden className="flex gap-1.5">
                <span className="size-2.5 border" />
                <span className="size-2.5 border" />
                <span className="size-2.5 border" />
              </span>
              <span className="flex-1 text-center font-mono text-xs text-muted-foreground">
                {windowTitle}
              </span>
            </div>
            <pre className="overflow-x-auto p-5 font-mono text-[13px] leading-6">
              <code>
                {lines.map((line, i) => (
                  <TerminalRow key={i} line={line} />
                ))}
                <span className="text-muted-foreground">$ </span>
                <span
                  aria-hidden
                  className="inline-block h-4 w-2 translate-y-0.5 animate-pulse bg-foreground motion-reduce:animate-none"
                />
              </code>
            </pre>
          </figure>
        </div>
      </div>
    </section>
  );
}

function TerminalRow({ line }: { line: TerminalLine }) {
  switch (line.kind) {
    case "command":
      return (
        <span className="block">
          <span className="text-muted-foreground">$ </span>
          {line.text}
        </span>
      );
    case "step":
      return (
        <span className="flex justify-between gap-6 text-muted-foreground">
          <span>→ {line.text}</span>
          {line.detail && <span className="tabular-nums">{line.detail}</span>}
        </span>
      );
    case "success":
      return (
        <span className="mb-4 block">
          <span className="text-primary">✓</span> {line.text}
        </span>
      );
    case "log":
      return <span className="block text-muted-foreground">{line.text}</span>;
  }
}
