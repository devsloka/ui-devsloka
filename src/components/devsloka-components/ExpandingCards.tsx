"use client";

import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useRef, useEffect, useMemo } from "react";

const cards = [
  {
    title: "Design Process",
    description: "Explore our creative journey",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5",
    color: "bg-purple-500",
  },
  {
    title: "Development",
    description: "Building the future",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    color: "bg-blue-500",
  },
  {
    title: "Strategy",
    description: "Planning for success",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40",
    color: "bg-green-500",
  },
  {
    title: "Launch",
    description: "Taking off to new heights",
    image: "https://images.unsplash.com/photo-1518364538800-6bae3c2ea0f2",
    color: "bg-red-500",
  },
  {
    title: "Strategy",
    description: "Planning for success",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40",
    color: "bg-green-500",
  },
  {
    title: "Launch",
    description: "Taking off to new heights",
    image: "https://images.unsplash.com/photo-1518364538800-6bae3c2ea0f2",
    color: "bg-red-500",
  },
  {
    title: "Strategy",
    description: "Planning for success",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40",
    color: "bg-green-500",
  },
  {
    title: "Launch",
    description: "Taking off to new heights",
    image: "https://images.unsplash.com/photo-1518364538800-6bae3c2ea0f2",
    color: "bg-red-500",
  },
];

export function ExpandingCards() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [windowWidth, setWindowWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    handleResize(); // Set initial width
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { activeWidth, inactiveWidth, titleActive, titleInactive } =
    useMemo(() => {
      let activeWidth = 400;
      let inactiveWidth = 200;
      let titleActive = "24px";
      let titleInactive = "18px";

      if (windowWidth <= 640) {
        activeWidth = 200;
        inactiveWidth = 100;
        titleActive = "20px";
        titleInactive = "16px";
      } else if (windowWidth <= 768) {
        activeWidth = 300;
        inactiveWidth = 150;
        titleActive = "22px";
        titleInactive = "17px";
      }

      return { activeWidth, inactiveWidth, titleActive, titleInactive };
    }, [windowWidth]);

  const handleCardClick = (index: number) => {
    setActiveIndex(index);
  };
  const handlePrev = () => {
    setActiveIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => Math.min(cards.length - 1, prev + 1));
  };

  useEffect(() => {
    const cardElement = cardRefs.current[activeIndex];
    cardElement?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "nearest",
    });
  }, [activeIndex]);

  return (
    <div className="relative group w-full">
      <div
        ref={containerRef}
        className="flex gap-2 md:gap-4 h-[300px] md:h-[350px] lg:h-[400px] overflow-x-auto w-full"
      >
        {cards.map((card, index) => (
          <motion.div
            key={`${card.title}-${index}`}
            ref={(el) => {
              cardRefs.current[index] = el;
            }}
            className="relative rounded-2xl overflow-hidden cursor-pointer flex-shrink-0 snap-start"
            animate={{
              width: activeIndex === index ? activeWidth : inactiveWidth,
            }}
            transition={{ duration: 0.3 }}
            onClick={() => handleCardClick(index)}
          >
            <img
              src={card.image}
              alt={card.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60" />

            <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 text-white">
              <motion.h3
                initial={false}
                animate={{
                  fontSize: activeIndex === index ? titleActive : titleInactive,
                  opacity: activeIndex === index ? 1 : 0.7,
                }}
                className="font-bold mb-1 md:mb-2"
              >
                {card.title}
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: activeIndex === index ? 1 : 0,
                  y: activeIndex === index ? 0 : 20,
                }}
                className="text-xs md:text-sm"
              >
                {card.description}
              </motion.p>
            </div>
          </motion.div>
        ))}
      </div>
      {/* Navigation buttons */}
      <div className="absolute inset-0 pointer-events-none">
        <button
          onClick={handlePrev}
          disabled={activeIndex === 0}
          className={`absolute left-2 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 rounded-full p-2 transition-all pointer-events-auto ${
            activeIndex === 0 ? "opacity-0 cursor-default" : "opacity-100"
          }`}
        >
          <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-gray-800" />
        </button>

        <button
          onClick={handleNext}
          disabled={activeIndex === cards.length - 1}
          className={`absolute right-2 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 rounded-full p-2 transition-all pointer-events-auto ${
            activeIndex === cards.length - 1
              ? "opacity-0 cursor-default"
              : "opacity-100"
          }`}
        >
          <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-gray-800" />
        </button>
      </div>
    </div>
  );
}
