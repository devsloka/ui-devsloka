"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function ExpandableCard() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const cards = [
    {
      id: "card1",
      title: "Mountain Retreat",
      description:
        "A peaceful getaway nestled in the mountains with breathtaking views.",
      longDescription:
        "Experience tranquility like never before at our mountain retreat. Wake up to the sound of birds chirping and the fresh mountain air. Enjoy hiking trails, wildlife spotting, and stargazing at night. Our fully equipped cabins provide all the comfort you need while staying connected with nature.",
      image:
        "https://images.unsplash.com/photo-1741851374430-d242e0dcd70c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      color: "bg-emerald-50 dark:bg-emerald-950/30",
    },
    {
      id: "card2",
      title: "Ocean Paradise",
      description:
        "Beachfront villas with direct access to crystal clear waters.",
      longDescription:
        "Dive into luxury at our ocean paradise. Our beachfront villas offer unparalleled views of the horizon where the sky meets the sea. Fall asleep to the gentle sound of waves and wake up to spectacular sunrises. Enjoy water sports, beach yoga, and fresh seafood prepared by our world-class chefs.",
      image:
        "https://plus.unsplash.com/premium_photo-1674406763863-b64be22c78a9?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      color: "bg-sky-50 dark:bg-sky-950/30",
    },
    {
      id: "card3",
      title: "Urban Escape",
      description:
        "Modern apartments in the heart of the city with all amenities.",
      longDescription:
        "Stay in the pulse of the city with our centrally located urban escapes. These modern apartments combine comfort with convenience, putting you minutes away from the best restaurants, shopping, and entertainment. Enjoy high-speed internet, smart home features, and 24/7 concierge service.",
      image:
        "https://images.unsplash.com/photo-1741620979760-bccef3bb5b17?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      color: "bg-violet-50 dark:bg-violet-950/30",
    },
  ];

  return (
    <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-4">
      {cards.map((card) => (
        <div key={card.id} className="relative">
          <motion.div
            layoutId={`card-container-${card.id}`}
            className={cn(
              "rounded-xl",
              card.color,
              expandedId === card.id
                ? "fixed z-10 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-3xl h-[80vh] overflow-auto shadow-xl"
                : "h-full overflow-hidden cursor-pointer"
            )}
            onClick={() => expandedId !== card.id && setExpandedId(card.id)}
          >
            <motion.div
              layoutId={`card-image-${card.id}`}
              className="relative w-full aspect-video"
            >
              <Image
                src={card.image || "/placeholder.svg"}
                alt={card.title}
                fill
                className="object-cover"
              />
            </motion.div>

            <motion.div layoutId={`card-content-${card.id}`} className="p-4">
              <motion.h3
                layoutId={`card-title-${card.id}`}
                className="text-xl font-bold"
              >
                {card.title}
              </motion.h3>

              {expandedId !== card.id ? (
                <motion.p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                  {card.description}
                </motion.p>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="mt-4"
                >
                  <p className="text-gray-600 dark:text-gray-300">
                    {card.longDescription}
                  </p>
                  <div className="mt-6 flex justify-end">
                    <Button>Book Now</Button>
                  </div>
                </motion.div>
              )}
            </motion.div>

            {expandedId === card.id && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/80 dark:bg-gray-800/80 text-gray-800 dark:text-gray-200 hover:bg-white dark:hover:bg-gray-800"
                onClick={(e) => {
                  e.stopPropagation();
                  setExpandedId(null);
                }}
              >
                <X size={20} />
              </motion.button>
            )}

            {expandedId !== card.id && (
              <motion.div className="absolute bottom-4 right-4 p-2 rounded-full bg-white/80 dark:bg-gray-800/80 text-gray-800 dark:text-gray-200">
                <ArrowRight size={16} />
              </motion.div>
            )}
          </motion.div>

          {/* Placeholder to maintain grid layout when card is expanded */}
          {expandedId === card.id && (
            <div
              className={`rounded-xl invisible ${card.color}`}
              style={{ aspectRatio: "1/1.2" }}
            ></div>
          )}
        </div>
      ))}

      {/* Overlay when a card is expanded */}
      <AnimatePresence>
        {expandedId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-[5]"
            onClick={() => setExpandedId(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// Helper function to conditionally join class names
const cn = (...classes: (string | boolean | undefined)[]) => {
  return classes.filter(Boolean).join(" ");
};
