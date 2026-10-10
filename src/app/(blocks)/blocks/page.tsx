import { Metadata } from "next";
import { ComponentCard } from "@/components/root/component-card";
import { generateSEO } from "@/config/seo/seo.utils";
import { blocks } from "@/utilities/blocks.utils";

export function generateMetadata(): Metadata {
  return generateSEO({
    title: "Blocks - Devsloka UI",
    description:
      "Complete page sections for React: heroes, pricing, features, FAQs, footers and more. Copy them in and restyle like any component.",
    path: "blocks",
    image: "images/blocks-og.png",
    keywords: ["ui blocks", "website sections", "react sections", "next.js blocks"],
  });
}

export default function BlocksPage() {
  const entries = Object.entries(blocks);

  return (
    <div>
      <header className="mb-10 max-w-2xl space-y-3">
        <h1 className="text-4xl font-semibold tracking-tight">Blocks</h1>
        <p className="text-lg text-muted-foreground">
          {entries.length} complete page sections. Stack them into a page, then
          restyle them like any other component.
        </p>
      </header>

      <ul className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {entries.map(([slug, block]) => {
          const variants = 1 + (block.codeMetadata.relatedFiles?.length ?? 0);
          return (
            <li key={slug}>
              <ComponentCard
                title={block.title}
                href={`/blocks/${slug}`}
                description={
                  variants > 1
                    ? `${block.description}. ${variants} variants.`
                    : `${block.description}.`
                }
                image={`/images/${slug}.png`}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
