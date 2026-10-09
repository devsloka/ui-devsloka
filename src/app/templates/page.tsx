import Link from "next/link";
import { Metadata } from "next";
import { TemplateCard } from "@/components/templates/template-card";
import { generateSEO } from "@/config/seo/seo.utils";
import { templates } from "@/lib/templates";

export function generateMetadata(): Metadata {
  return generateSEO({
    title: "Templates - Devsloka UI",
    description:
      "Complete Next.js templates built with Devsloka UI. Preview them live and start from the source.",
    path: "templates",
    image: "images/templates-og.png",
    keywords: ["next.js templates", "react templates", "landing page template", "portfolio template"],
  });
}

export default function TemplatesPage() {
  return (
    <div>
      <header className="mb-10 max-w-2xl space-y-3">
        <h1 className="text-4xl font-semibold tracking-tight">Templates</h1>
        <p className="text-lg text-muted-foreground">
          Complete Next.js sites built with Devsloka UI. Open the live preview,
          then start from the source.
        </p>
      </header>

      <ul className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {templates.map((template) => (
          <li key={template.id}>
            <TemplateCard template={template} />
          </li>
        ))}
      </ul>

      <section className="mt-16 flex flex-wrap items-center justify-between gap-4 border p-6">
        <div>
          <h2 className="font-medium">More templates are coming with Pro</h2>
          <p className="text-sm text-muted-foreground">
            Full-page templates for SaaS, dashboards and portfolios.
          </p>
        </div>
        <Link
          href="/#editions"
          className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider transition-colors hover:text-[#0A6EFF]"
        >
          See Pro
          <span aria-hidden className="size-1.5 bg-[#0A6EFF]" />
        </Link>
      </section>
    </div>
  );
}
