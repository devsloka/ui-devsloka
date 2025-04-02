import { notFound } from "next/navigation";
import { AdvancedCodeBlock } from "@/components/ui/advanced-code-block";
import { getComponentCode } from "@/utilities/getComponentCode";
import { Metadata } from "next";

import { components } from "@/utilities/components.utils";

export function generateStaticParams() {
  return Object.keys(components).map((id) => ({ name: id }));
}

export function generateMetadata({
  params,
}: {
  params: { name: string };
}): Metadata {
  const component = components[params.name];
  if (!component) return {};

  const formattedName = params.name.replace(/-/g, " ");
  return {
    title: `${formattedName} - Devsloka Components`,
    description: component.codeMetadata.description,
    keywords: [...component.codeMetadata.keywords, "Devsloka", "UI Components"],
    openGraph: {
      title: `${formattedName} - Devsloka Components`,
      description: component.codeMetadata.description,
      images: [`https://yourwebsite.com/og-images/${params.name}.jpg`],
    },
  };
}

export default function ComponentPage({
  params,
}: {
  params: { name: string };
}) {
  const componentInfo = components[params.name];

  if (!componentInfo) {
    return notFound();
  }

  const { component: ActiveComponent, codeMetadata } = componentInfo;
  const componentPath = `src/components/devsloka-components/${params.name}.tsx`;
  const componentCode = getComponentCode(componentPath);
  const secondaryCode = getComponentCode(
    `src/components/devsloka-components/${params.name}.tsx`
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
        dependencies={codeMetadata.dependencies}
        secondaryCode={secondaryCode}
        secondaryTitle={componentInfo.codeMetadata.secondaryTitle}
        secondaryLanguage={componentInfo.codeMetadata.secondaryLanguage}
        secondaryDescription={componentInfo.codeMetadata.secondaryDescription}
      />
    </div>
  );
}
