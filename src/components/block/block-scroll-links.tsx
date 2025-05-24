"use client";

import React, { useEffect, useRef, useState } from "react";
import { blockNavLinks } from "@/utilities/block-nav-link";
import Link from "next/link";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const BlockScrollLinks = () => {
  const pathname = usePathname();
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    const scrollArea = scrollAreaRef.current;
    if (!scrollArea) return;

    const viewport = scrollArea.querySelector<HTMLDivElement>(
      "[data-radix-scroll-area-viewport]"
    );
    if (!viewport) return;

    viewportRef.current = viewport;

    const handleScroll = () => {
      if (viewport) {
        setCanScrollLeft(viewport.scrollLeft > 0);
        setCanScrollRight(
          viewport.scrollLeft + viewport.clientWidth < viewport.scrollWidth
        );
      }
    };

    const handleResize = () => {
      handleScroll();
    };

    viewport.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    handleScroll(); // Initial check

    return () => {
      viewport.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleScrollLeft = () => {
    viewportRef.current?.scrollBy({
      left: -200,
      behavior: "smooth",
    });
  };

  const handleScrollRight = () => {
    viewportRef.current?.scrollBy({
      left: 200,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative group" ref={scrollAreaRef}>
      <ScrollArea className="w-full whitespace-nowrap rounded-md border-b border-dashed">
        <motion.div
          className="flex gap-4 py-2 px-2 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {blockNavLinks?.map((item) => {
            const isActive = pathname === item.href;
            return (
              <motion.div
                key={item.id}
                className="inline-block"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Link
                  href={item.href}
                  className={cn(
                    "relative px-6 py-2 rounded-full text-sm font-medium transition-all",
                    isActive
                      ? "text-primary-foreground"
                      : "text-muted-foreground hover:bg-primary/20"
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="morphing-nav-active"
                      className="absolute inset-0 bg-primary rounded-full"
                      transition={{
                        type: "spring",
                        bounce: 0.2,
                        duration: 0.6,
                      }}
                    />
                  )}
                  <span className="relative z-10">{item.title}</span>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
        <ScrollBar orientation="horizontal" className="h-2" />
      </ScrollArea>

      {/* Scroll Arrows with Shadcn Buttons */}
      {canScrollLeft && (
        <Button
          variant="ghost"
          size="icon"
          onClick={handleScrollLeft}
          className="rounded-full absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 shadow-sm bg-background hover:bg-accent"
          aria-label="Scroll left"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
      )}

      {canScrollRight && (
        <Button
          variant="ghost"
          size="icon"
          onClick={handleScrollRight}
          className="rounded-full absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 shadow-sm bg-background hover:bg-accent"
          aria-label="Scroll right"
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      )}
    </div>
  );
};

export default BlockScrollLinks;
