import Link from "next/link";
import { Metadata } from "next";
import { generateSEO } from "@/config/seo/seo.utils";
import { countRegistryItems } from "@/utilities/registry";

export const metadata: Metadata = generateSEO({
  title: "Introduction - Devsloka UI",
  description:
    "Devsloka UI is a collection of animated, accessible React components, backgrounds, hooks and blocks that you copy into your project and own.",
  path: "docs",
  image: "/images/intro-og.png",
  keywords: [
    "devsloka ui",
    "react components",
    "animated components",
    "shadcn registry",
    "tailwind css",
  ],
});

function getLibraryCounts() {
  return [
    { label: "Components", count: countRegistryItems("ui"), href: "/components" },
    { label: "Backgrounds", count: countRegistryItems("backgrounds"), href: "/components/backgrounds" },
    { label: "Hooks", count: countRegistryItems("hooks"), href: "/utilities" },
    { label: "Blocks", count: countRegistryItems("blocks"), href: "/blocks" },
  ];
}

const PRINCIPLES = [
  {
    title: "You own the code",
    body: "Components are copied into your project, not installed as a package. Read them, change them, delete what you don't need.",
  },
  {
    title: "Accessible by default",
    body: "Built on Radix primitives where it matters: real buttons, radios, tabs and dialogs, keyboard navigation, focus management and labelled controls.",
  },
  {
    title: "Follows your theme",
    body: "Colors come from your shadcn theme tokens, so every component fits your brand and switches between light and dark mode on its own.",
  },
  {
    title: "Motion with restraint",
    body: "Animations use Motion and CSS, respect reduced-motion settings, and canvas effects pause when they're off screen.",
  },
];

const STACK = ["React 19", "Next.js", "Tailwind CSS v4", "Motion", "Radix UI", "TypeScript"];

export default function DocsPage() {
  const counts = getLibraryCounts();

  return (
    <div className="mb-20 max-w-3xl">
      <header className="space-y-3">
        <h1 className="text-4xl font-semibold tracking-tight">Introduction</h1>
        <p className="text-lg text-muted-foreground">
          Devsloka UI is a collection of animated, accessible React components
          that you copy into your project and make your own. It follows shadcn/ui
          conventions, so everything installs with the shadcn CLI and drops into{" "}
          <code className="font-mono text-base text-foreground">components/ui</code>.
        </p>
      </header>

      <ul className="mt-10 grid grid-cols-2 gap-px overflow-hidden border bg-border sm:grid-cols-4">
        {counts.map((item) => (
          <li key={item.label} className="bg-background">
            <Link
              href={item.href}
              className="group block p-4 transition-colors hover:bg-muted"
            >
              <span className="block text-3xl font-semibold tracking-tight tabular-nums">
                {item.count}
              </span>
              <span className="mt-1 block text-sm text-muted-foreground group-hover:text-foreground">
                {item.label} →
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <section className="mt-14 space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight">Principles</h2>
        <div className="grid gap-6 sm:grid-cols-2">
          {PRINCIPLES.map((principle) => (
            <div key={principle.title} className="space-y-2">
              <h3 className="font-medium">{principle.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {principle.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-14 space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">What&apos;s inside</h2>
        <ul className="ml-5 list-disc space-y-3 text-muted-foreground">
          <li>
            <strong className="text-foreground">Components:</strong> interactive
            building blocks such as morphing navigation, radio cards, multi-select,
            tours, dialogs and product cards.
          </li>
          <li>
            <strong className="text-foreground">Backgrounds:</strong> animated
            canvas and CSS layers you drop behind any section.
          </li>
          <li>
            <strong className="text-foreground">Hooks:</strong> small, SSR-safe
            utilities like <code className="font-mono text-sm">useLocalStorage</code>,{" "}
            <code className="font-mono text-sm">useDebounce</code> and{" "}
            <code className="font-mono text-sm">useFetch</code>.
          </li>
          <li>
            <strong className="text-foreground">Blocks:</strong> complete page
            sections such as heroes, pricing, FAQs and footers.
          </li>
        </ul>
      </section>

      <section className="mt-14 space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Built with</h2>
        <ul className="flex flex-wrap gap-2">
          {STACK.map((item) => (
            <li key={item} className="border px-2.5 py-1 font-mono text-xs">
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-14 flex flex-wrap items-center justify-between gap-4 border p-6">
        <div>
          <h2 className="font-semibold">Get started</h2>
          <p className="text-sm text-muted-foreground">
            Set up your project and add your first component in a minute.
          </p>
        </div>
        <Link
          href="/installation"
          className="bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
        >
          Installation →
        </Link>
      </section>
    </div>
  );
}
