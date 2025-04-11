import PricingBlock from "@/components/blocks/pricing-page";
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
  const componentPath = `src/components/blocks/${"pricing-page"}.tsx`;
  const componentCode = getComponentCode(componentPath);
  return (
    <div>
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
