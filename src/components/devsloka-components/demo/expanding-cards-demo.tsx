"use client";

import { ExpandingCards } from "@/registry/ui/expanding-cards";

const destinations = [
  {
    id: "mountains",
    title: "Mountain Adventure",
    description: "Explore the highest peaks and alpine lakes.",
    image:
      "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=1200&q=80&auto=format&fit=crop",
    imageAlt: "Snow-covered mountain summit under a clear sky",
  },
  {
    id: "beach",
    title: "Beach Paradise",
    description: "Relax on golden sands by turquoise water.",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80&auto=format&fit=crop",
    imageAlt: "Empty beach with gentle waves at sunset",
  },
  {
    id: "city",
    title: "City Lights",
    description: "Experience the skyline after dark.",
    image:
      "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=1200&q=80&auto=format&fit=crop",
    imageAlt: "City skyline lit up at dusk",
  },
  {
    id: "forest",
    title: "Forest Trek",
    description: "Discover hidden trails beneath tall pines.",
    image:
      "https://images.unsplash.com/photo-1448375240586-882707db888b?w=1200&q=80&auto=format&fit=crop",
    imageAlt: "Sunlight filtering through a dense forest",
  },
  {
    id: "desert",
    title: "Desert Safari",
    description: "Journey through rolling sand dunes.",
    image:
      "https://images.unsplash.com/photo-1510479524860-95998e54a8c6?w=1200&q=80&auto=format&fit=crop",
    imageAlt: "Wind-shaped sand dunes in warm light",
  },
];

export function ExpandingCardsDemo() {
  return (
    <div className="w-full p-4">
      <ExpandingCards items={destinations} defaultValue="beach" />
    </div>
  );
}
