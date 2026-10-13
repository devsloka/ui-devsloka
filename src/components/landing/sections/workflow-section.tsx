import { SectionHeading } from "../section-heading";

const STEPS = [
  {
    title: "Pick",
    body: "Find a component in the index and tune it in the preview.",
    detail: "ui.devsloka.in/components/morphing-nav",
  },
  {
    title: "Add",
    body: "Install it with the shadcn CLI, or paste the source by hand.",
    detail: "npx shadcn@latest add …/r/morphing-nav.json",
  },
  {
    title: "Own",
    body: "The file lands in your repo. No package, no lock-in. Change anything.",
    detail: "components/ui/morphing-nav.tsx",
  },
];

export function WorkflowSection() {
  return (
    <section className="mt-40">
      <SectionHeading
        title="Copy. Paste. Own it."
        description="No package to update, no runtime to depend on. The source lands in your repo and becomes yours to change."
      />
      <ol className="mt-12 grid grid-cols-1 border-t border-l border-border md:grid-cols-3">
        {STEPS.map((step, i) => (
          <li
            key={step.title}
            className="flex min-h-80 flex-col border-r border-b border-border p-6"
          >
            <span className="text-8xl leading-none font-medium tracking-[-0.06em]">
              {i + 1}
            </span>
            <h3 className="mt-auto pt-10 text-2xl font-medium tracking-[-0.02em]">
              {step.title}
            </h3>
            <p className="mt-2 text-muted-foreground">{step.body}</p>
            <code className="mt-6 block truncate border-t border-border pt-3 font-mono text-xs">
              {step.detail}
            </code>
          </li>
        ))}
      </ol>
    </section>
  );
}
