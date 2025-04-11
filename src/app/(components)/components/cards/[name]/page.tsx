import { notFound } from "next/navigation";
import { AdvancedCodeBlock } from "@/components/ui/advanced-code-block";
import { getComponentCode } from "@/utilities/getComponentCode";
import { Metadata } from "next";
import ExploreAnimatedCard from "@/components/cards/explore-animated-card";
import { GlassCard } from "@/components/cards/glass-card";
import { FloatingCard } from "@/components/cards/floating-card";
import { ParallaxCard } from "@/components/cards/parallax-card";
import { GlitchCard } from "@/components/cards/glitch-card";
import { WaterCard } from "@/components/cards/water-card";
import { ProductCard } from "@/components/cards/product-card";
import { FoliageCard } from "@/components/cards/foliage-card";
import { NeonCard } from "@/components/cards/neon-card";
import PricingCard from "@/components/cards/pricing-card";

const cards: Record<string, React.ComponentType<any>> = {
  "explore-animated-card": ExploreAnimatedCard,
  "glass-card": GlassCard,
  "floating-card": FloatingCard,
  "parallax-card": ParallaxCard,
  "glitch-card": GlitchCard,
  "water-card": WaterCard,
  "product-card": ProductCard,
  "foliage-card": FoliageCard,
  "neon-card": NeonCard,
  "pricing-card": PricingCard,
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
  const formattedName = name.replace(/-/g, " ");
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
      url: `https://yourwebsite.com/components/cards/${name}`,
      type: "website",
      images: [`https://yourwebsite.com/images/${name}.png`],
    },
  };
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
