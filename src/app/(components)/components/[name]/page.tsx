import { notFound } from "next/navigation";
import { AdvancedCodeBlock } from "@/components/ui/advanced-code-block";
import { getComponentCode } from "@/utilities/getComponentCode";
import { Metadata } from "next";
import { components } from "@/utilities/components.utils";
import { generateSEO } from "@/config/seo/seo.utils";

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

  return generateSEO({
    title: `${formattedName} - Devsloka Components`,
    description: component.codeMetadata.description,
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
  const componentPath = `src/components/devsloka-components/${name}.tsx`;
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
        dependencies={codeMetadata.dependencies}
        secondaryCode={componentCode}
        secondaryTitle={componentInfo.codeMetadata.secondaryTitle}
        secondaryLanguage={componentInfo.codeMetadata.secondaryLanguage}
        secondaryDescription={componentInfo.codeMetadata.secondaryDescription}
        cliCommands={`npx shadcn@latest add https://ui.devsloka.in/r/${name}.json`}
        manualSteps={["npm i @devsloka/react-components"]}
        // cliCommands="npm i @devsloka/react-components"
      />
    </div>
  );
}
