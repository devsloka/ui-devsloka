"use client";

import { Button } from "@/components/ui/button";
import { MorphingCard } from "@/registry/ui/morphing-card";

const stays = [
  {
    id: "alpine",
    title: "Alpine cabin",
    description: "Timber cabin above the tree line with views across three valleys.",
    details:
      "Sleeps four in two bedrooms. Wood-burning stove, fully equipped kitchen and a drying room for ski gear. The nearest lift is a ten-minute walk; groceries are delivered on request.",
    image: "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=1200&q=80",
    imageAlt: "Snow-covered mountain peaks under a clear sky",
    price: "From $240 / night",
  },
  {
    id: "coast",
    title: "Coastal villa",
    description: "Whitewashed villa a short path from a quiet sandy beach.",
    details:
      "Three bedrooms, shaded terrace and an outdoor shower. Kayaks and snorkelling gear are included, and the village market is open every morning.",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80",
    imageAlt: "Turquoise sea meeting a sandy beach",
    price: "From $310 / night",
  },
  {
    id: "city",
    title: "City loft",
    description: "Bright top-floor loft in the old town, close to cafés and galleries.",
    details:
      "Open-plan living space with a workspace, fast Wi-Fi and a rooftop terrace shared with two other apartments. Self check-in from 3 pm.",
    image: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=1200&q=80",
    imageAlt: "Wooden deck chairs facing a calm lake",
    price: "From $180 / night",
  },
];

export function MorphingCardDemo() {
  return (
    <div className="grid w-full gap-6 p-6 sm:grid-cols-2 lg:grid-cols-3">
      {stays.map((stay) => (
        <MorphingCard
          key={stay.id}
          title={stay.title}
          description={stay.description}
          image={stay.image}
          imageAlt={stay.imageAlt}
          action={
            <>
              <span className="mr-auto self-center text-sm text-muted-foreground">
                {stay.price}
              </span>
              <Button>Check availability</Button>
            </>
          }
        >
          <p>{stay.details}</p>
        </MorphingCard>
      ))}
    </div>
  );
}
