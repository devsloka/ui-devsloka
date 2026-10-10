import { Metadata } from "next";
import { ComponentCard } from "@/components/root/component-card";
import { generateSEO } from "@/config/seo/seo.utils";
import { components } from "@/lib/components";

export function generateMetadata(): Metadata {
  return generateSEO({
    title: "Components - Devsloka UI",
    description:
      "Animated, accessible React components built on shadcn conventions. Preview each one and install it with the shadcn CLI.",
    path: "components",
    image: "images/components-og.png",
    keywords: [
      "react components",
      "animated components",
      "shadcn components",
      "next.js ui",
    ],
  });
}

export default function ComponentsPage() {
  return (
    <div className="mb-20">
      <header className="mb-10 max-w-2xl space-y-3">
        <h1 className="text-4xl font-semibold tracking-tight">Components</h1>
        <p className="text-lg text-muted-foreground">
          {components.length} animated, accessible components. Open one to try
          it, read the code and install it with the shadcn CLI.
        </p>
      </header>

      <ul className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {components.map((component) => (
          <li key={component.href}>
            <ComponentCard {...component} />
          </li>
        ))}
      </ul>
    </div>
  );
}
