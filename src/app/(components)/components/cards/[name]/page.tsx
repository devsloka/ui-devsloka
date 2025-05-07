import { notFound } from "next/navigation";
import { AdvancedCodeBlock } from "@/components/ui/advanced-code-block";
import { getComponentCode } from "@/utilities/getComponentCode";
import { Metadata } from "next";
import ExploreAnimatedCard from "@/components/cards/explore-animated-card";
import { GlitchCard } from "@/components/cards/glitch-card";
import PricingCardDemo from "@/components/cards/demo/pricing-card";
import { ProductCardDemo } from "@/components/cards/demo/product-card";
import { generateSEO } from "@/config/seo/seo.utils";

const cards: Record<string, React.FC> = {
  "explore-animated-card": ExploreAnimatedCard,
  "product-card": ProductCardDemo,
  "pricing-card": PricingCardDemo,
  "glitch-card": GlitchCard,
};

export async function generateStaticParams() {
  const cardsKeys = await Promise.resolve(Object.keys(cards));
  return cardsKeys.map((id) => ({ name: id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ name: string }>;
}): Promise<Metadata> {
  const { name } = await params;

  // Capitalize first letter of each word
  const formattedName = name
    .replace(/-/g, " ")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return generateSEO({
    title: `${formattedName} - Animated Cards`,
    description: `Explore the ${formattedName} animation, a beautiful card effect for web projects.`,
    path: `components/cards/${name}`,
    image: `images/${name}.png`,
    keywords: [
      formattedName,
      "animated cards",
      "CSS cards",
      "React card effects",
      "Next.js animated UI",
    ],
  });
}
export default async function CardPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  const CardComponent = cards[name];

  if (!CardComponent) {
    return notFound();
  }

  const componentPath = `src/components/cards/${name}.tsx`;
  const componentCode = getComponentCode(componentPath);

  return (
    <div>
      <AdvancedCodeBlock
        code={componentCode}
        cliCommands={`npx shadcn@latest add https://ui.devsloka.in/r/${name}.json`}
        preview={
          <div className="w-lg bg-background mx-auto">
            <CardComponent />
          </div>
        }
        language="tsx"
        showLineNumbers
        title={name.replace(/-/g, " ")}
      />
    </div>
  );
}
