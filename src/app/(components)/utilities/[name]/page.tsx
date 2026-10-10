import React from "react";
import { notFound } from "next/navigation";
import { AdvancedCodeBlock } from "@/components/ui/advanced-code-block";
import { getComponentCode } from "@/utilities/getComponentCode";
import { utilities } from "@/utilities/hooks.utils";
import { Metadata } from "next";
import { generateSEO } from "@/config/seo/seo.utils";
import { getCliCommand, getInstallCommands } from "@/utilities/registry";

export async function generateStaticParams() {
  const utilitiesKeys = await Promise.resolve(Object.keys(utilities));
  return utilitiesKeys.map((id) => ({ name: id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ name: string }>;
}): Promise<Metadata> {
  const { name } = await params;
  const component = utilities[name];
  if (!component) return {};

  const imagePath = `/images/${name}.png`;

  return generateSEO({
    title: `${component.codeMetadata.title} React Hook`,
    description: component.codeMetadata.description,
    path: `utilities/${name}`,
    image: imagePath,
    keywords: [...component.codeMetadata.keywords, "Devsloka", "UI Components"],
  });
}

const UtilPage = async ({ params }: { params: Promise<{ name: string }> }) => {
  const { name } = await params;
  const componentInfo = utilities[name];

  if (!componentInfo) {
    return notFound();
  }

  const { component: ActiveComponent, codeMetadata } = componentInfo;

  const componentPath = `src/components/devsloka-components/demo/hooks/${name}-demo.tsx`;
  const componentCode = getComponentCode(componentPath);
  const secondaryCode = getComponentCode(
    `src/registry/hooks/${name}.ts`
  );

  return (
    <div className="w-full">
      <AdvancedCodeBlock
        code={componentCode}
        preview={<ActiveComponent />}
        language={codeMetadata.language}
        showLineNumbers
        title={codeMetadata.title}
        description={codeMetadata.description}
        keywords={codeMetadata.keywords}
        dependencies={getInstallCommands(name)}
        cliCommands={getCliCommand(name)}
        v0Url={`https://ui.devsloka.in/r/${name}.json`}
        secondaryCode={secondaryCode}
        secondaryTitle={componentInfo.codeMetadata.secondaryTitle}
        secondaryLanguage={componentInfo.codeMetadata.secondaryLanguage}
        secondaryDescription={componentInfo.codeMetadata.secondaryDescription}
      />
    </div>
  );
};

export default UtilPage;
