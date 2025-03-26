import { notFound } from "next/navigation";
import { AdvancedCodeBlock } from "@/components/ui/advanced-code-block";
import { getComponentCode } from "@/utilities/getComponentCode";

import { Metadata } from "next";
import BudgetSlider from "@/components/devsloka-components/budget-slider";
import { ExpandingCards } from "@/components/devsloka-components/expanding-cards";
import ShowcaseSlider from "@/components/devsloka-components/showcase-slider";
// import { Tour } from "@/components/devsloka-components/tour";

const components: Record<string, React.FC> = {
  "budget-slider": BudgetSlider,
  "expanding-cards": ExpandingCards,
  // "tour-component": Tour,
  "showcase-slider": ShowcaseSlider,
};

const componentsData = Object.keys(components).map((id) => ({ id }));

export function generateStaticParams() {
  return componentsData;
}

export function generateMetadata({
  params,
}: {
  params: { name: string };
}): Metadata {
  const formattedName = params.name.replace(/-/g, " ");
  return {
    title: `${formattedName} - Animated Background`,
    description: `Explore the ${formattedName} animation, a beautiful background effect for web projects.`,
    keywords: [
      formattedName,
      "animated background",
      "CSS background",
      "React background effects",
      "Next.js animated UI",
    ],
    openGraph: {
      title: `${formattedName} - Animated Background`,
      description: `Explore the ${formattedName} animation, a beautiful background effect for web projects.`,
      url: `https://yourwebsite.com/components/backgrounds/${params.name}`,
      type: "website",
      images: [`https://yourwebsite.com/images/${params.name}.png`],
    },
  };
}

export default function ComponentPage({
  params,
}: {
  params: { name: string };
}) {
  const ActiveComponent = components[params.name];

  if (!ActiveComponent) {
    return notFound();
  }

  const componentPath = `src/components/devsloka-components/${params.name}.tsx`;
  const componentCode = getComponentCode(componentPath);

  return (
    <div className="w-full">
      <AdvancedCodeBlock
        code={componentCode}
        preview={<ActiveComponent />}
        language="tsx"
        showLineNumbers
        title="Showcase Slider"
      />
    </div>
  );
}
