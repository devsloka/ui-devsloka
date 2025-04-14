import { notFound } from "next/navigation";
import { AdvancedCodeBlock } from "@/components/ui/advanced-code-block";
import { getComponentCode } from "@/utilities/getComponentCode";
import { Metadata } from "next";
import { blocks } from "@/utilities/blocks.utils";

export async function generateStaticParams() {
  const blockKeys = await Promise.resolve(Object.keys(blocks));
  return blockKeys.map((id) => ({ name: id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ name: string }>;
}): Promise<Metadata> {
  const { name } = await params;
  const block = blocks[name];
  if (!block) return {};

  const formattedName = name.replace(/-/g, " ");
  return {
    title: `${formattedName} - Devsloka Blocks`,
    description: block.codeMetadata.description,
    keywords: [...block.codeMetadata.keywords, "Devsloka", "UI Blocks"],
    openGraph: {
      title: `${formattedName} - Devsloka Blocks`,
      description: block.codeMetadata.description,
      images: [`https://yourwebsite.com/og-images/${name}.jpg`],
    },
  };
}

export default async function BlockPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  const blockInfo = blocks[name];

  if (!blockInfo) {
    return notFound();
  }

  const { block: ActiveBlock, codeMetadata } = blockInfo;
  const blockPath = `src/components/blocks/${name}.tsx`;
  const blockCode = getComponentCode(blockPath);

  return (
    <div className="w-full">
      <AdvancedCodeBlock
        code={blockCode}
        preview={<ActiveBlock />}
        language={codeMetadata.language}
        showLineNumbers
        title={codeMetadata.title}
      />
    </div>
  );
}
