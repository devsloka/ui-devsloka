"use client";

import { ContentCarousel } from "@/components/ui/content-carousel";

const items = [
  {
    name: "Aurora",
    description: "Smooth, flowing aurora-like effects",
    component: "AuroraBackground",
  },
  {
    name: "Beam",
    description: "Light beams scanning across the screen",
    component: "BeamBackground",
  },
  {
    name: "Stars",
    description: "Twinkling stars in a night sky",
    component: "StarsBackground",
  },
];

export const ContentCarouselDemo = () => {
  return (
    <ContentCarousel
      items={items}
      onItemChange={(item) => console.log("Selected background:", item.name)}
    />
  );
};
