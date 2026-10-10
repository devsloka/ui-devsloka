import { notFound } from "next/navigation";
import { AdvancedCodeBlock } from "@/components/ui/advanced-code-block";
import { getComponentCode } from "@/utilities/getComponentCode";
import { Metadata } from "next";
import { blocks } from "@/utilities/blocks.utils";
import { generateSEO } from "@/config/seo/seo.utils";
import { getCliCommand, getInstallCommands } from "@/utilities/registry";

export async function generateStaticParams() {
  const blockKeys = await Promise.resolve(Object.keys(blocks));
  return blockKeys.map((name) => ({ name }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ name: string }>;
}): Promise<Metadata> {
  const { name } = await params;
  const block = blocks[name];
  if (!block) return {};

  const formattedName = name
    .replace(/-/g, " ")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return generateSEO({
    title: `${formattedName} - Devsloka Blocks`,
    description: block.description,
    path: `blocks/${name}`,
    image: `images/${name}.png`,
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

  const codeFiles = [mainFile, ...relatedFiles].map((file) => {
    const fullPath = `src/registry/blocks/${file.codePath}`;
    return {
      ...file,
      content: getComponentCode(fullPath) || "// Component code not available",
    };
  });

  const itemName = (codePath: string) =>
    codePath.split("/").pop()!.replace(/\.tsx$/, "");

  return (
    <div>
      <header className="mb-10 max-w-2xl space-y-3">
        <h1 className="text-4xl font-semibold tracking-tight">{blockInfo.title}</h1>
        <p className="text-lg text-muted-foreground">
          {blockInfo.description}.{" "}
          {codeFiles.length > 1 && `${codeFiles.length} variants below.`}
        </p>
      </header>

      <div className="space-y-16">
        {codeFiles.map((file, index) => (
          <section key={file.codePath} aria-label={file.title}>
            <p className="mb-2 font-mono text-xs uppercase tracking-wider text-muted-foreground">
              ({String(index + 1).padStart(2, "0")}) {file.title.trim()}
            </p>
            <AdvancedCodeBlock
              code={file.content}
              preview={file.block ? <file.block /> : <MainComponent />}
              language={file.language}
              description={file.description}
              showLineNumbers
              cliCommands={getCliCommand(itemName(file.codePath))}
              dependencies={getInstallCommands(itemName(file.codePath))}
              v0Url={`https://ui.devsloka.in/r/${itemName(file.codePath)}.json`}
            />
          </section>
        ))}
      </div>
    </div>
  );
}
