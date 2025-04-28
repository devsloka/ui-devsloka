import { notFound } from "next/navigation";
import { AdvancedCodeBlock } from "@/components/ui/advanced-code-block";
import { getComponentCode } from "@/utilities/getComponentCode";
import { Metadata } from "next";
import { blocks } from "@/utilities/blocks.utils";
import { generateSEO } from "@/config/seo/seo.utils";

export async function generateStaticParams() {
  const blockKeys = await Promise.resolve(Object.keys(blocks));
  return blockKeys.map((id) => ({ id }));
}

export async function generateMetadata({
  params,
}: {
  params: { name: string };
}): Promise<Metadata> {
  const { name } = params;
  const block = blocks[name];
  if (!block) return {};

  // Format name with capitalized words
  const formattedName = name
    .replace(/-/g, " ")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return generateSEO({
    title: `${formattedName} - Devsloka Blocks`,
    description: block.description,
    path: `blocks/${name}`,
    image: `og-images/${name}.jpg`,
    keywords: [
      ...block.codeMetadata.keywords,
      "Devsloka",
      "UI Blocks",
      "Website Sections",
      "Page Components",
    ],
  });
}

export default async function BlockPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
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
