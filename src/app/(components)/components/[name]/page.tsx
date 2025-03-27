import { notFound } from "next/navigation";
import { AdvancedCodeBlock } from "@/components/ui/advanced-code-block";
import { getComponentCode } from "@/utilities/getComponentCode";
import { Metadata } from "next";

import BudgetSlider from "@/components/devsloka-components/budget-slider";
import { ExpandingCards } from "@/components/devsloka-components/expanding-cards";
import ShowcaseSlider from "@/components/devsloka-components/showcase-slider";

type ComponentMeta = {
  component: React.FC;
  codeMetadata: {
    title: string;
    description: string;
    keywords: string[];
    language: string;
    dependencies?: string;
  };
};

const components: Record<string, ComponentMeta> = {
  "budget-slider": {
    component: BudgetSlider,
    codeMetadata: {
      title: "Budget Slider Component",
      description:
        "Interactive slider for budget range selection with dynamic visual feedback",
      keywords: ["React", "Slider", "Input", "Budget Control"],
      language: "tsx",
      dependencies: "npm i motion clsx tailwind-merge @tabler/icons-react cobe",
    },
  },
  "expanding-cards": {
    component: ExpandingCards,
    codeMetadata: {
      title: "Expanding Cards Component",
      description:
        "Interactive cards that expand on hover with smooth animations",
      keywords: ["React", "Animation", "UI Cards", "Hover Effects"],
      language: "tsx",
      dependencies: "npm i motion clsx tailwind-merge @tabler/icons-react cobe",
    },
  },
  "showcase-slider": {
    component: ShowcaseSlider,
    codeMetadata: {
      title: "Showcase Slider Component",
      description:
        "Responsive image slider with touch support and transition effects",
      keywords: ["React", "Carousel", "Slider", "Image Gallery"],
      language: "tsx",
      dependencies: "npm i motion clsx tailwind-merge @tabler/icons-react cobe",
    },
  },
};

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
      />
    </div>
  );
}
