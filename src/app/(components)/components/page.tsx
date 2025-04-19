import React from "react";
import {
  ComponentCard,
  ComponentCardProps,
} from "@/components/root/component-card";

const components: ComponentCardProps[] = [
  {
    title: "Expanding Cards",
    href: "/components/expanding-cards",
    description: "Elegant expanding card animations",
    image: "/images/expanding-cards.png",
  },
  {
    title: "Image Gallery",
    href: "/components/image-gallery",
    description: "A responsive image gallery with masonry layout",
    image: "/images/image-gallery.png",
  },
  {
    title: "Budget Slider",
    href: "/components/range-slider-with-histogram",
    description: "Interactive range slider with histogram visualization",
    image: "/images/range-slider-with-histogram.png",
  },
  {
    title: "Tour",
    href: "/components/tour",
    description: "Guided tour interface for feature introduction",
    image: "/images/tour.png",
  },
  {
    title: "Airbnb Card",
    href: "/components/airbnb-card",
    description: "Animated Airbnb card effect",
    image: "/images/airbnb-card.png",
  },
  {
    title: "Content Carousel",
    href: "/components/content-carousel",
    description: "Smooth sliding carousel for content display",
    image: "/images/content-carousel.png",
  },
  {
    title: "Morphing Card",
    href: "/components/morphing-card",
    description: "Animated morphing card effect",
    image: "/images/morphing-card.png",
  },
  {
    title: "Morphing Modal",
    href: "/components/morphing-modal",
    description: "Animated morphing modal effect",
    image: "/images/morphing-modal.png",
  },
  {
    title: "Morphing Nav",
    href: "/components/morphing-nav",
    description: "Animated morphing navigation effect",
    image: "/images/morphing-nav.png",
  },
  {
    title: "Floating Dots",
    href: "/components/floating-dots",
    description: "Animated floating dots effect",
    image: "/images/floating-dots.png",
  },
  {
    title: "Gradient Text",
    href: "/components/gradient-text",
    description: "Animated gradient text effect",
    image: "/images/gradient-text.png",
  },
  {
    title: "Border Gradient Icon",
    href: "/components/border-gradient-icon",
    description: "Animated border gradient icon effect",
    image: "/images/border-gradient-icon.png",
  },
  {
    title: "Text Effect",
    href: "/components/text-effect",
    description: "Animated text effect",
    image: "/images/text-effect.png",
  },
];

const Components: React.FC = () => {
  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* <div className="text-center">
          <h1 className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl md:text-6xl">
            Component Library
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-xl text-gray-400 sm:mt-4">
            A collection of beautiful and reusable React components
          </p>
        </div> */}

        <div className="my-16 grid gap-8 grid-cols-1 md:grid-cols-2">
          {components.map((component) => (
            <ComponentCard key={component.href} {...component} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Components;
