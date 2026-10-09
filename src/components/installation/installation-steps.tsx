import Link from "next/link";
import { CodeBlock } from "@/components/ui/code-block";
import { InstallationStep } from "./installation-step";

const PACKAGE_MANAGERS = ["npm", "pnpm", "yarn", "bun"];
const RUNNERS: Record<string, string> = {
  npm: "npx",
  pnpm: "pnpm dlx",
  yarn: "yarn dlx",
  bun: "bunx",
};

/** The same command for every package manager tab. */
const withRunner = (command: string) =>
  Object.fromEntries(
    PACKAGE_MANAGERS.map((pm) => [pm, `${RUNNERS[pm]} ${command}`])
  );

const INSTALLS: Record<string, string> = {
  npm: "npm install motion lucide-react",
  pnpm: "pnpm add motion lucide-react",
  yarn: "yarn add motion lucide-react",
  bun: "bun add motion lucide-react",
};

const UTILS_CODE = `import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}`;

const USAGE_CODE = `import { MorphingNav } from "@/components/ui/morphing-nav";

const items = [
  { value: "overview", label: "Overview" },
  { value: "activity", label: "Activity" },
  { value: "settings", label: "Settings" },
];

export default function Page() {
  return <MorphingNav items={items} defaultValue="overview" aria-label="Sections" />;
}`;

const IMAGES_CODE = `// next.config.ts
const nextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
  },
};

export default nextConfig;`;

const inlineCode =
  "bg-muted px-[0.3rem] py-[0.2rem] font-mono text-[0.8125rem] text-foreground";

export function InstallationSteps() {
  return (
    <div className="space-y-16">
      <div>
        <h2 className="mb-8 text-2xl font-semibold tracking-tight">Using the CLI</h2>

        <InstallationStep number={1} title="Set up shadcn/ui">
          <p>
            Devsloka UI uses the shadcn registry. If your project doesn&apos;t
            have a <code className={inlineCode}>components.json</code> yet, run{" "}
            <code className={inlineCode}>init</code>. It configures Tailwind
            CSS, the <code className={inlineCode}>@/</code> import alias, theme
            tokens and the <code className={inlineCode}>cn</code> helper.
          </p>
          <CodeBlock tabs={PACKAGE_MANAGERS} code={withRunner("shadcn@latest init")} />
        </InstallationStep>

        <InstallationStep number={2} title="Add a component">
          <p>
            Every component, background, hook and block has its own install
            command on its page. The CLI copies the source into your project
            and installs the npm packages and shadcn primitives it needs.
          </p>
          <CodeBlock
            tabs={PACKAGE_MANAGERS}
            code={withRunner("shadcn@latest add https://ui.devsloka.in/r/morphing-nav.json")}
          />
        </InstallationStep>

        <InstallationStep number={3} title="Use it" isLastStep>
          <p>
            Components land in <code className={inlineCode}>components/ui</code>{" "}
            and hooks in <code className={inlineCode}>hooks</code>. The code is
            yours: change anything.
          </p>
          <CodeBlock language="tsx" code={USAGE_CODE} />
        </InstallationStep>
      </div>

      <div>
        <h2 className="mb-8 text-2xl font-semibold tracking-tight">Manual installation</h2>

        <InstallationStep number={1} title="Install shared dependencies">
          <p>
            Most components animate with <code className={inlineCode}>motion</code>{" "}
            and use <code className={inlineCode}>lucide-react</code> icons. Each
            page lists any extra packages under <strong>Manual</strong>.
          </p>
          <CodeBlock tabs={PACKAGE_MANAGERS} code={INSTALLS} />
        </InstallationStep>

        <InstallationStep number={2} title="Add the cn helper">
          <p>
            Create <code className={inlineCode}>lib/utils.ts</code> if you don&apos;t
            have it. It needs <code className={inlineCode}>clsx</code> and{" "}
            <code className={inlineCode}>tailwind-merge</code>.
          </p>
          <CodeBlock language="ts" code={UTILS_CODE} />
        </InstallationStep>

        <InstallationStep number={3} title="Copy the source" isLastStep>
          <p>
            Open a component&apos;s <strong>Code</strong> tab, paste the file
            into <code className={inlineCode}>components/ui</code>, and add any
            shadcn primitives it imports (for example{" "}
            <code className={inlineCode}>npx shadcn@latest add button</code>).
          </p>
        </InstallationStep>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Good to know</h2>
        <ul className="ml-5 list-disc space-y-3 text-muted-foreground">
          <li>
            Built for <strong className="text-foreground">React 19</strong> and{" "}
            <strong className="text-foreground">Tailwind CSS v4</strong>. Colors
            come from your shadcn theme tokens, so components follow your light
            and dark themes automatically.
          </li>
          <li>
            A few components use <code className={inlineCode}>next/image</code>.
            When you pass remote images, allow their host in your Next.js config.
            Outside Next.js, swap it for a plain <code className={inlineCode}>img</code>.
          </li>
          <li>
            Animations respect the visitor&apos;s reduced-motion setting, and
            canvas backgrounds pause when they scroll out of view.
          </li>
        </ul>
        <CodeBlock language="ts" code={IMAGES_CODE} />
        <p className="text-muted-foreground">
          Ready? Browse the{" "}
          <Link href="/components" className="text-foreground underline underline-offset-4">
            components
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
