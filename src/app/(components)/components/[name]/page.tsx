import { notFound } from "next/navigation";
import { AdvancedCodeBlock } from "@/components/ui/advanced-code-block";
import { getComponentCode } from "@/utilities/getComponentCode";
import { Metadata } from "next";
import { components } from "@/utilities/components.utils";
import { components as componentCards } from "@/lib/components";
import { generateSEO } from "@/config/seo/seo.utils";
import { getCliCommand, getInstallCommands } from "@/utilities/registry";


export async function generateStaticParams() {
  const componentKeys = await Promise.resolve(Object.keys(components));
  return componentKeys.map((id) => ({ name: id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ name: string }>;
}): Promise<Metadata> {
  const { name } = await params;
  const component = components[name];
  if (!component) return {};

  const formattedName = name
    .replace(/-/g, " ")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  const imagePath = `/images/${name}.png`;
  const card = componentCards.find((entry) => entry.href === `/components/${name}`);

  return generateSEO({
    title: `${card?.title ?? formattedName} React Component`,
    description: card?.description ?? component.codeMetadata.description,
    path: `components/${name}`,
    image: imagePath,
    keywords: [...component.codeMetadata.keywords, "Devsloka", "UI Components"],
  });
}

export default async function ComponentPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  const componentInfo = components[name];

  if (!componentInfo) {
    return notFound();
  }

  const { component: ActiveComponent, codeMetadata } = componentInfo;
  const componentPath = `src/registry/ui/${name}.tsx`;
  const componentCode = getComponentCode(componentPath);
  const secondaryCode = getComponentCode(
    `src/components/devsloka-components/demo/${name + "-demo"}.tsx`
  );

  return (
    <div className="w-full">
      <AdvancedCodeBlock
        code={secondaryCode}
        preview={<ActiveComponent />}
        language={codeMetadata.language}
        showLineNumbers
        title={codeMetadata.title}
        description={codeMetadata.description}
        keywords={codeMetadata.keywords}
        dependencies={getInstallCommands(name)}
        secondaryCode={componentCode}
        secondaryTitle={componentInfo.codeMetadata.secondaryTitle}
        secondaryLanguage={componentInfo.codeMetadata.secondaryLanguage}
        secondaryDescription={componentInfo.codeMetadata.secondaryDescription}
        cliCommands={getCliCommand(name)}
        v0Url={`https://ui.devsloka.in/r/${name}.json`}
      />
    </div>
  );
}
