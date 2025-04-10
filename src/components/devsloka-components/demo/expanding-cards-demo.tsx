"use client";

import { ExpandingCards } from "../expanding-cards";

export function ExpandingCardsDemo() {
  const demoCards = [
    {
      title: "Mountain Adventure",
      description: "Explore the highest peaks",
      image: "https://images.unsplash.com/photo-1454496522488-7a8e488e8606",
    },
    {
      title: "Beach Paradise",
      description: "Relax on golden sands",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    },
    {
      title: "City Lights",
      description: "Experience urban nights",
      image: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b",
    },
    {
      title: "Forest Trek",
      description: "Discover hidden trails",
      image: "https://images.unsplash.com/photo-1448375240586-882707db888b",
    },
    {
      title: "Desert Safari",
      description: "Journey through dunes",
      image:
        "https://images.unsplash.com/photo-1510479524860-95998e54a8c6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Northern Lights",
      description: "Witness celestial magic",
      image: "https://images.unsplash.com/photo-1508974491678-7ec251d629fd",
    },
  ];

  return (
    <div className="w-full">
      <ExpandingCards
        cards={demoCards}
        gap="gap-3 md:gap-5"
        height="h-[350px] md:h-[450px]"
        classNames={{
          container: "rounded-xl",
          card: "rounded-xl",
          title: "font-extrabold tracking-wide truncate",
          description: "font-medium text-gray-200",
          button: "bg-black/40 hover:bg-black/60",
          buttonIcon: "text-white",
        }}
        breakpoints={[
          {
            maxWidth: 640,
            activeWidth: 250,
            inactiveWidth: 120,
            titleActive: "22px",
            titleInactive: "16px",
          },
          {
            maxWidth: 768,
            activeWidth: 300,
            inactiveWidth: 180,
            titleActive: "24px",
            titleInactive: "18px",
          },
        ]}
        transitionDuration={0.4}
      />
    </div>
  );
}
