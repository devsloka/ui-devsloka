import Link from "next/link";
import { Metadata } from "next";
import { generateSEO } from "@/config/seo/seo.utils";
import { utilities } from "@/utilities/hooks.utils";

export function generateMetadata(): Metadata {
  return generateSEO({
    title: "Reusable React Hooks",
    description:
      "Small, SSR-safe React hooks for storage, events, network, layout and forms. Install with the shadcn CLI.",
    path: "utilities",
    keywords: ["react hooks", "custom hooks", "useLocalStorage", "useDebounce", "useFetch"],
  });
}

export default function UtilitiesPage() {
  return (
    <div className="mb-20">
      <header className="mb-10 max-w-2xl space-y-3">
        <h1 className="text-4xl font-semibold tracking-tight">Hooks</h1>
        <p className="text-lg text-muted-foreground">
          Small, SSR-safe hooks that clean up after themselves. Each one installs
          into your <code className="font-mono text-base text-foreground">hooks</code>{" "}
          folder with the shadcn CLI.
        </p>
      </header>

      <ul className="grid gap-px overflow-hidden border bg-border sm:grid-cols-2">
        {Object.entries(utilities).map(([slug, { codeMetadata }]) => (
          <li key={slug} className="bg-background">
            <Link
              href={`/utilities/${slug}`}
              className="block h-full p-5 transition-colors hover:bg-muted"
            >
              <p className="font-mono text-sm font-medium">{codeMetadata.title}</p>
              <p className="mt-1.5 text-sm text-muted-foreground">
                {codeMetadata.description}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
