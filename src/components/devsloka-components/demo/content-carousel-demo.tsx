"use client";

import { ContentCarousel } from "@/registry/ui/content-carousel";

const items = [
  {
    id: "aurora",
    title: "Aurora",
    description: "Smooth, flowing aurora-like effects.",
  },
  {
    id: "beam",
    title: "Beam",
    description: "Light beams scanning across the screen.",
  },
  {
    id: "stars",
    title: "Stars",
    description: "Twinkling stars in a night sky.",
  },
  {
    id: "grid",
    title: "Grid",
    description: "A subtle grid that fades toward the edges.",
  },
];

export const ContentCarouselDemo = () => {
  return <ContentCarousel items={items} className="py-12" />;
};
