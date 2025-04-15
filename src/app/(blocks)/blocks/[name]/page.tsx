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
    description: block.description,
    keywords: [...block.codeMetadata.keywords, "Devsloka", "UI Blocks"],
    openGraph: {
      title: `${formattedName} - Devsloka Blocks`,
      description: block.description,
      images: [`https://yourwebsite.com/og-images/${name}.jpg`],
    },
  };
}

export default async function BlockPage({
  params,
}: {
  params: { name: string };
}) {
  const { name } = params;
  const blockInfo = blocks[name];

  if (!blockInfo) return notFound();

  const { block: MainComponent, codeMetadata } = blockInfo;
  const { mainFile, relatedFiles = [] } = codeMetadata;

  const codeFiles = await Promise.all(
    [mainFile, ...relatedFiles].map(async (file) => ({
      ...file,
      content: await getComponentCode(`src/components/blocks/${file.codePath}`),
    }))
  );

  return (
    <div className="w-full space-y-12">
      {codeFiles.map((file, index) => (
        <AdvancedCodeBlock
          key={file.codePath}
          code={file.content}
          preview={file.block ? <file.block /> : <MainComponent />}
          language={file.language}
          title={file.title}
          description={file.description}
          showLineNumbers
          className={index === 0 ? "md:mt-6" : ""}
        />
      ))}
    </div>
  );
}
