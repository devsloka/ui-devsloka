"use client";
import { useState } from "react";
import { AnimatePresence } from "motion/react";
import { MorphingCard } from "../morphing-card";
import { motion } from "motion/react";
export function MorphingCardDemo() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const cards = [
    {
      id: "1",
      title: "Alpine Sanctuary",
      description:
        "Luxury cabins nestled in mountain peaks with panoramic views",
      content:
        "Experience ultimate serenity in our architect-designed alpine cabins. Featuring floor-to-ceiling windows, private hot springs, and direct access to ski slopes. Each cabin includes...",
      image: "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5",
    },
    {
      id: "2",
      title: "Coastal Haven",
      description: "Beachfront villas with private ocean access",
      content:
        "Wake up to the sound of waves in our exclusive coastal retreats. Enjoy private beaches, infinity pools, and world-class spa facilities. Our villas feature...",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    },
    {
      id: "3",
      title: "Urban Oasis",
      description: "Modern apartments in the city heart",
      content:
        "Sophisticated living spaces combining smart technology with designer interiors. Enjoy rooftop pools, 24/7 concierge service, and prime location...",
      image: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2",
    },
  ];

  return (
    <div className="p-8 bg-background">
      <div className="w-full h-full mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {cards.map((card) => (
            <MorphingCard
              key={card.id}
              {...card}
              isExpanded={expandedId === card.id}
              onExpand={() => setExpandedId(card.id)}
              onCollapse={() => setExpandedId(null)}
              onAction={() => console.log("Selected:", card.id)}
              actionText="Book Now"
              className="h-full"
            />
          ))}
        </AnimatePresence>

        <AnimatePresence>
          {expandedId && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
              onClick={() => setExpandedId(null)}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
