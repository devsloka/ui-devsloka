import { notFound } from "next/navigation";
import { AdvancedCodeBlock } from "@/components/ui/advanced-code-block";
import { getComponentCode } from "@/utilities/getComponentCode";
import ParticleBackground from "@/components/backgrounds/particles-background";
import BackgroundPreview from "@/components/backgrounds/preview/BackgroundPreview";
import { Metadata } from "next";
import ExploreAnimatedCard from "@/components/cards/explore-animated-card";

const cards: Record<string, React.FC> = {
  //   "particles-background": ParticleBackground,
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
          //   <BackgroundPreview
          //     CardComponent={<CardComponent />}
          //     title={params.name.replace(/-/g, " ")}
          //     description="Beautiful animated cards for your website hero sections"
          //   />
          <div className="w-full max-w-7xl mx-auto">
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
