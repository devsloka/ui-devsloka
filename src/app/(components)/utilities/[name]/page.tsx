import React from "react";
import { notFound } from "next/navigation";
import { AdvancedCodeBlock } from "@/components/ui/advanced-code-block";
import { getComponentCode } from "@/utilities/getComponentCode";

import { utilities } from "@/utilities/hooks.utils";
import { Metadata } from "next";
import { formatToDemo } from "@/utilities/format-to-demo";
export function generateStaticParams() {
  return Object.keys(utilities).map((id) => ({ name: id }));
}

export function generateMetadata({
  params,
}: {
  params: { name: string };
}): Metadata {
  const component = utilities[params.name];
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

const UtilPage = ({ params }: { params: { name: string } }) => {
  const componentInfo = utilities[params.name];

  if (!componentInfo) {
    return notFound();
  }

  const { component: ActiveComponent, codeMetadata } = componentInfo;

  // const componentPath = `src/hooks/devsloka-hooks/demo/${params.name}.tsx`;
  const formate = formatToDemo(params.name);
  const componentPath = `src/hooks/devsloka-hooks/demo/${formate}.tsx`;
  const componentCode = getComponentCode(componentPath);
  const secondaryCode = getComponentCode(
    `src/hooks/devsloka-hooks/${params.name}.tsx`
  );
  console.log("componentCode", `src/hooks/devsloka-hooks/${params.name}.tsx`);

  return (
    <>
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
    </>
  );
};

export default UtilPage;
