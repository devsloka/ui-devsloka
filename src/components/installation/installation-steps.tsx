"use client";

import { Note } from "@/components/ui/note";

import { InstallationStep } from "./installation-step";
import { CodeBlock } from "../ui/code-block";

export function InstallationSteps() {
  return (
    <div className="space-y-10 relative">
      <Note className="">
        We have the exact same installation process as{" "}
        <a
          href="https://ui.shadcn.com/docs/installation/next"
          target="_blank"
          className="font-medium underline underline-offset-4 text-primary hover:text-primary/80 transition-colors"
        >
          shadcn/ui
        </a>
        .
      </Note>

      <InstallationStep number={1} title="Create project">
        <p className="mb-4 text-muted-foreground">
          Run the{" "}
          <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
            init
          </code>{" "}
          command to create a new Next.js project or to setup an existing one:
        </p>
        <CodeBlock
          tabs={["npm", "pnpm", "yarn", "bun"]}
          code={{
            npm: "npx shadcn@latest init",
            pnpm: "pnpm dlx shadcn@latest init",
            yarn: "yarn dlx shadcn@latest init",
            bun: "bunx shadcn@latest init",
          }}
        />
      </InstallationStep>

      <InstallationStep number={2} title="Add components">
        <p className="mb-4 text-muted-foreground">
          You can now start adding components to your project.
        </p>
        <CodeBlock
          tabs={["npm", "pnpm", "yarn", "bun"]}
          code={{
            npm: 'npx shadcn@latest add "https://ui.devsloka.in/r/pricing-block.json"',
            pnpm: 'pnpm dlx shadcn@latest add "https://ui.devsloka.in/r/pricing-block.json"',
            yarn: 'yarn dlx shadcn@latest add "https://ui.devsloka.in/r/pricing-block.json"',
            bun: 'bunx shadcn@latest add "https://ui.devsloka.in/r/pricing-block.json"',
          }}
        />
      </InstallationStep>

      <InstallationStep number={3} title="Import component" isLastStep>
        <p className="mb-4 text-muted-foreground">
          The command above will add the{" "}
          <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm mr-1">
            PricingBlock
          </code>
          component to your project. You can then import it like this:
        </p>
        <CodeBlock
          language="tsx"
          code={`import { PricingBlock } from "@/components/ui/pricing-block";

export default function Home() {
  return (
    <div>
      <PricingBlock />
    </div>
  );
}`}
        />
      </InstallationStep>
    </div>
  );
}
