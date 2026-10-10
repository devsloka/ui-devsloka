import { notFound } from "next/navigation";
import { Metadata } from "next";
import { AdvancedCodeBlock } from "@/components/ui/advanced-code-block";
import { BackgroundPreview } from "@/components/root/background-preview";
import { generateSEO } from "@/config/seo/seo.utils";
import { backgrounds } from "@/utilities/backgrounds.utils";
import { getComponentCode } from "@/utilities/getComponentCode";
import { getCliCommand, getInstallCommands } from "@/utilities/registry";

export function generateStaticParams() {
  return Object.keys(backgrounds).map((name) => ({ name }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ name: string }>;
}): Promise<Metadata> {
  const { name } = await params;
  const background = backgrounds[name];
  if (!background) return {};

  return generateSEO({
    title: `${background.title} Background - Devsloka UI`,
    description: background.description,
    path: `components/backgrounds/${name}`,
    image: `images/${name}.png`,
    keywords: [background.title, "animated background", "React background", "Next.js"],
  });
}

const toPascalCase = (value: string) =>
  value.replace(/(^|-)(\w)/g, (_, __, char: string) => char.toUpperCase());

export default async function BackgroundPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  const background = backgrounds[name];
  if (!background) notFound();

  const Background = background.component;
  const exportName = getComponentCode(`src/registry/backgrounds/${name}.tsx`).match(
    /export function (\w+)/
  )?.[1] ?? toPascalCase(name);
  const usage = `import { ${exportName} } from "@/components/ui/${name}";

export function Hero() {
  return (
    <section className="relative isolate h-[480px] overflow-hidden">
      <${exportName} />
      <div className="relative z-10 flex h-full items-center justify-center">
        <h1 className="text-4xl font-semibold">Your content</h1>
      </div>
    </section>
  );
}`;

  return (
    <AdvancedCodeBlock
      title={background.title}
      description={background.description}
      code={usage}
      preview={
        <BackgroundPreview
          title={background.title}
          description={background.description}
          tone={background.tone}
        >
          <Background />
        </BackgroundPreview>
      }
      language="tsx"
      showLineNumbers
      cliCommands={getCliCommand(name)}
      dependencies={getInstallCommands(name)}
      secondaryCode={getComponentCode(`src/registry/backgrounds/${name}.tsx`)}
      secondaryTitle="Copy the source into components/ui"
      secondaryLanguage="tsx"
      secondaryDescription={`components/ui/${name}.tsx`}
      v0Url={`https://ui.devsloka.in/r/${name}.json`}
    />
  );
}
