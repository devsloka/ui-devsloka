import { notFound } from "next/navigation";
import { AdvancedCodeBlock } from "@/components/ui/advanced-code-block";
import { getComponentCode } from "@/utilities/getComponentCode";
import { Metadata } from "next";
import ExploreAnimatedCard from "@/components/cards/explore-animated-card";

const cards: Record<string, React.FC> = {
  "explore-animated-card": ExploreAnimatedCard,
};

const cardsData = Object.keys(cards).map((id) => ({ id }));

export function generateStaticParams() {
  return cardsData;
}

export function generateMetadata({
  params,
}: {
  params: { name: string };
}): Metadata {
  const formattedName = params.name.replace(/-/g, " ");
  return {
    title: `${formattedName} - Animated Cards`,
    description: `Explore the ${formattedName} animation, a beautiful cards effect for web projects.`,
    keywords: [
      formattedName,
      "animated cards",
      "CSS cards",
      "React cards effects",
      "Next.js animated UI",
    ],
    openGraph: {
      title: `${formattedName} - Animated cards`,
      description: `Explore the ${formattedName} animation, a beautiful cards effect for web projects.`,
      url: `https://yourwebsite.com/components/cards/${params.name}`,
      type: "website",
      images: [`https://yourwebsite.com/images/${params.name}.png`],
    },
  };
}

export default function CardPage({ params }: { params: { name: string } }) {
  const CardComponent = cards[params.name];

  if (!CardComponent) {
    return notFound();
  }

  const componentPath = `src/components/cards/${params.name}.tsx`;
  const componentCode = getComponentCode(componentPath);

  return (
    <div>
      <AdvancedCodeBlock
        code={componentCode}
        preview={
          <div className="w-full bg-background mx-auto">
            <CardComponent />
          </div>
        }
        language="tsx"
        showLineNumbers
        title={params.name.replace(/-/g, " ")}
      />
    </div>
  );
}
