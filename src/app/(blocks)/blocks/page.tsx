import React from "react";
import { AdvancedCodeBlock } from "@/components/ui/advanced-code-block";
import { blocks } from "@/utilities/blocks.utils";
import { getComponentCode } from "@/utilities/getComponentCode";
import { Metadata } from "next";
import { generateSEO } from "@/config/seo/seo.utils";
export function generateMetadata(): Metadata {
  return generateSEO({
    title: "UI Blocks Collection - DevsLoka",
    description:
      "Explore our collection of beautiful and customizable blocks for your web projects",
    path: "blocks",
    image: "images/blocks-og.png",
    keywords: [
      "UI blocks",
      "website sections",
      "prebuilt components",
      "Next.js blocks",
    ],
  });
}

const BlocksPage: React.FC = () => {
  return (
    <div className="w-full">
      <h1 className="text-5xl font-bold my-3 text-center">Blocks</h1>
      <p className="text-muted-foreground mb-12 text-center">
        Explore our collection of beautiful and customizable blocks for your web
        projects.
      </p>
      <div className="space-y-12">
        {Object.values(blocks).map((block) => {
          const componentPath = `src/components/blocks/${block.codeMetadata.mainFile.codePath}`;
          const componentCode = getComponentCode(componentPath);
          const BlockComponent = block.block;

          return (
            <section key={block.name} className="border-b pb-12">
              <AdvancedCodeBlock
                code={componentCode}
                preview={<BlockComponent />}
                language={block.codeMetadata.mainFile.language || "tsx"}
                description={block.description}
                showLineNumbers
                title={`${block.title} Component`}
                className="rounded-lg"
                cliCommands={`npx shadcn@latest add https://ui.devsloka.in/r/${block.name}.json`}
              />
            </section>
          );
        })}
      </div>
    </div>
  );
};

export default BlocksPage;
