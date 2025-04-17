import PricingBlock from "@/components/blocks/pricing-block";
import { AdvancedCodeBlock } from "@/components/ui/advanced-code-block";
import { getComponentCode } from "@/utilities/getComponentCode";
import React from "react";

// export async function generateMetadata({
//   params,
// }: {
//   params: Promise<{ name: string }>;
// }): Promise<Metadata> {
//   const { name } = await params;
//   const block = blocks[name];
//   if (!block) return {};

//   return {
//     title: `${name.replace(/-/g, " ")} - Devsloka Blocks`,
//     description: block.codeMetadata.description,
//     keywords: [...block.codeMetadata.keywords, "Devsloka", "Blocks"],
//     openGraph: {
//       title: `${name.replace(/-/g, " ")} - Devsloka Blocks`,
//       description: block.codeMetadata.description,
//       images: [`https://yourwebsite.com/og-images/${name}.jpg`],
//     },
//   };
// }

const BlocksPage = () => {
  const componentPath = `src/components/blocks/${"pricing-block"}.tsx`;
  const componentCode = getComponentCode(componentPath);
  return (
    <div className="w-full">
      <h1 className="text-4xl font-bold my-3">Blocks</h1>
      <p className="text-muted-foreground mb-8">
        Explore our collection of beautiful and customizable blocks for your web
        projects.
      </p>
      <AdvancedCodeBlock
        code={componentCode}
        preview={<PricingBlock />}
        language="tsx"
        showLineNumbers
        title={"Pricing Page"}
      />
    </div>
  );
};

export default BlocksPage;
