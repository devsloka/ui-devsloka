"use client";
import ExploreAnimatedCard from "@/components/cards/explore-animated-card";
import { GlitchCard } from "@/components/cards/glitch-card";
import PricingCardDemo from "@/components/cards/demo/pricing-card";

export default function AnimatedCardsCollection() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 py-16 px-4">
      <h1 className="text-3xl font-bold text-center text-white mb-12">
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
