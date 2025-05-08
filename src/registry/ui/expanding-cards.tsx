"use client";

import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useRef, useEffect, useMemo } from "react";

export interface CardType {
  title: string;
  description: string;
  image: string;
}

export interface Breakpoint {
  maxWidth: number;
  activeWidth: number;
  inactiveWidth: number;
  titleActive: string;
  titleInactive: string;
}

export interface ExpandingCardsProps {
  cards: CardType[];
  breakpoints?: Breakpoint[];
  gap?: string;
  height?: string;
  prevIcon?: React.ReactNode;
  nextIcon?: React.ReactNode;
  classNames?: {
    container?: string;
    card?: string;
    image?: string;
    overlay?: string;
    title?: string;
    description?: string;
    button?: string;
    buttonIcon?: string;
  };
  transitionDuration?: number;
}

const DEFAULT_BREAKPOINTS: Breakpoint[] = [
  {
    maxWidth: 640,
    activeWidth: 200,
    inactiveWidth: 100,
    titleActive: "20px",
    titleInactive: "16px",
  },
  {
    maxWidth: 768,
    activeWidth: 300,
    inactiveWidth: 150,
    titleActive: "22px",
    titleInactive: "17px",
  },
];

export function ExpandingCards({
  cards,
  breakpoints = DEFAULT_BREAKPOINTS,
  gap = "gap-2 md:gap-4",
  height = "h-[300px] md:h-[350px] lg:h-[400px]",
  prevIcon,
  nextIcon,
  classNames,
  transitionDuration = 0.3,
}: ExpandingCardsProps) {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [windowWidth, setWindowWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { activeWidth, inactiveWidth, titleActive, titleInactive } =
    useMemo(() => {
      const sortedBreakpoints = [...breakpoints].sort(
        (a, b) => a.maxWidth - b.maxWidth
      );
      let settings = {
        activeWidth: 400,
        inactiveWidth: 200,
        titleActive: "24px",
        titleInactive: "18px",
      };

      for (const bp of sortedBreakpoints) {
        if (windowWidth <= bp.maxWidth) {
          settings = {
            activeWidth: bp.activeWidth,
            inactiveWidth: bp.inactiveWidth,
            titleActive: bp.titleActive,
            titleInactive: bp.titleInactive,
          };
        }
      }

      return settings;
    }, [windowWidth, breakpoints]);

  const handleCardClick = (index: number) => setActiveIndex(index);
  const handlePrev = () => setActiveIndex((prev) => Math.max(0, prev - 1));
  const handleNext = () =>
    setActiveIndex((prev) => Math.min(cards.length - 1, prev + 1));

  useEffect(() => {
    cardRefs.current[activeIndex]?.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "center",
    });
  }, [activeIndex]);

  return (
    <div className="relative group w-full">
      <div
        ref={containerRef}
        className={`flex overflow-x-auto w-full ${gap} ${height} ${
          classNames?.container || ""
        }`}
      >
        {cards.map((card, index) => (
          <motion.div
            key={`${card.title}-${index}`}
            ref={(el) => {
              cardRefs.current[index] = el;
            }}
            className={`relative rounded-2xl overflow-hidden cursor-pointer flex-shrink-0 snap-start ${
              classNames?.card || ""
            }`}
            animate={{
              width: activeIndex === index ? activeWidth : inactiveWidth,
            }}
            transition={{ duration: transitionDuration }}
            onClick={() => handleCardClick(index)}
          >
            <img
              src={card.image}
              alt={card.title}
              className={`absolute inset-0 w-full h-full object-cover ${
                classNames?.image || ""
              }`}
            />
            <div
              className={`absolute inset-0 bg-gradient-to-b from-transparent to-black/60 ${
                classNames?.overlay || ""
              }`}
            />

            <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 text-white">
              <motion.h3
                animate={{
                  fontSize: activeIndex === index ? titleActive : titleInactive,
                  opacity: activeIndex === index ? 1 : 0.7,
                }}
                className={`font-bold mb-1 md:mb-2 ${classNames?.title || ""}`}
              >
                {card.title}
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: activeIndex === index ? 1 : 0,
                  y: activeIndex === index ? 0 : 20,
                }}
                className={`text-xs md:text-sm ${
                  classNames?.description || ""
                }`}
              >
                {card.description}
              </motion.p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="absolute inset-0 pointer-events-none">
        <button
          onClick={handlePrev}
          disabled={activeIndex === 0}
          className={`absolute left-2 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 rounded-full p-2 transition-all pointer-events-auto ${
            activeIndex === 0 ? "opacity-0 cursor-default" : "opacity-100"
          } ${classNames?.button || ""}`}
        >
          {prevIcon || (
            <ChevronLeft
              className={`w-5 h-5 md:w-6 md:h-6 text-gray-800 ${
                classNames?.buttonIcon || ""
              }`}
            />
          )}
        </button>

        <button
          onClick={handleNext}
          disabled={activeIndex === cards.length - 1}
          className={`absolute right-2 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 rounded-full p-2 transition-all pointer-events-auto ${
            activeIndex === cards.length - 1
              ? "opacity-0 cursor-default"
              : "opacity-100"
          } ${classNames?.button || ""}`}
        >
          {nextIcon || (
            <ChevronRight
              className={`w-5 h-5 md:w-6 md:h-6 text-gray-800 ${
                classNames?.buttonIcon || ""
              }`}
            />
          )}
        </button>
      </div>
    </div>
  );
}
