import React from "react";
import {
  ComponentCard,
  ComponentCardProps,
} from "@/components/root/component-card";

const components: ComponentCardProps[] = [
  {
    title: "Image Gallery",
    href: "/components/image-gallery",
    description: "A responsive image gallery with masonry layout",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=60",
  },
  {
    title: "Content Carousel",
    href: "/components/content-carousel",
    description: "Smooth sliding carousel for content display",
    image:
      "https://images.unsplash.com/photo-1604537529428-15bcbeecfe4d?w=800&auto=format&fit=crop&q=60",
  },
  {
    title: "Budget Slider",
    href: "/components/range-slider-with-histogram",
    description: "Interactive range slider with histogram visualization",
    image:
      "https://images.unsplash.com/photo-1518183214770-9cffbec72538?w=800&auto=format&fit=crop&q=60",
  },
  {
    title: "Expanding Cards",
    href: "/components/expanding-cards",
    description: "Elegant expanding card animations",
    image: "/images/expanding-cards.png",
  },
  {
    title: "Tour",
    href: "/components/tour",
    description: "Guided tour interface for feature introduction",
    image:
      "https://images.unsplash.com/photo-1516383740770-fbcc5ccbece0?w=800&auto=format&fit=crop&q=60",
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
