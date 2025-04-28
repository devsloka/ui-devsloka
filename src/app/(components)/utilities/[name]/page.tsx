import React from "react";
import { notFound } from "next/navigation";
import { AdvancedCodeBlock } from "@/components/ui/advanced-code-block";
import { getComponentCode } from "@/utilities/getComponentCode";
import { utilities } from "@/utilities/hooks.utils";
import { Metadata } from "next";
import { formatToDemo } from "@/utilities/format-to-demo";
import { generateSEO } from "@/config/seo/seo.utils";

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

  // Capitalize first letter of each word
  const formattedName = name
    .replace(/-/g, " ")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const imagePath = `/og-images/${name}.jpg`;

  return generateSEO({
    title: `${formattedName} - Devsloka Components`,
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
  const formate = formatToDemo(name);
  const componentPath = `src/hooks/devsloka-hooks/demo/${formate}.tsx`;
  const componentCode = getComponentCode(componentPath);
  const secondaryCode = getComponentCode(
    `src/hooks/devsloka-hooks/${name}.tsx`
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
};

export default UtilPage;
