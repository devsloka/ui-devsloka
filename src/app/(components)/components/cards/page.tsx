import ExploreAnimatedCard from "@/components/cards/explore-animated-card";
import { GlitchCard } from "@/components/cards/glitch-card";
import PricingCardDemo from "@/components/cards/demo/pricing-card";
import { Metadata } from "next";
import { generateSEO } from "@/config/seo/seo.utils";

export function generateMetadata(): Metadata {
  return generateSEO({
    title: "3D Animated Cards Collection - DevsLoka UI",
    description:
      "Explore our premium collection of animated UI cards with modern effects and interactions",
    path: "components/cards",
    image: "images/cards-collection-og.jpg",
    keywords: [
      "animated cards",
      "3D UI components",
      "React card effects",
      "Next.js animations",
      "glitch effect",
      "pricing cards",
      "interactive UI",
    ],
  });
}
export default function AnimatedCardsCollection() {
  return (
    <div className="min-h-screen py-16 px-4">
      <h1 className="text-3xl font-bold text-center mb-12">
        3D Animated Cards Collection
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
        <ExploreAnimatedCard />
        <GlitchCard />
        <PricingCardDemo />
      </div>
    </div>
  );
}
