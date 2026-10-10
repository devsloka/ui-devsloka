import { Metadata } from "next";
import { ComponentCard } from "@/components/root/component-card";
import { generateSEO } from "@/config/seo/seo.utils";
import { components } from "@/lib/components";

export function generateMetadata(): Metadata {
  return generateSEO({
    title: "Animated React Components",
    description:
      "Free animated React and Next.js components built with Tailwind CSS, Motion, and shadcn conventions. Preview live demos and install with the shadcn CLI.",
    path: "components",
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
        <h1 className="text-4xl font-semibold tracking-tight">Animated React components</h1>
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
