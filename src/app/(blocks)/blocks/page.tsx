import React from "react";
import { AdvancedCodeBlock } from "@/components/ui/advanced-code-block";
import { blocks } from "@/utilities/blocks.utils";
import { getComponentCode } from "@/utilities/getComponentCode";

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
                className="rounded-lg border"
              />
            </section>
          );
        })}
      </div>
    </div>
  );
};

export default BlocksPage;
