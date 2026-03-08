"use client";

import { useState, useRef, useCallback } from "react";
import { MessageSquareHeart, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const FORM_URL = "https://forms.gle/wCs5knKiXRtFXb9C7";

export default function TestimonialBubble() {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsOpen(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 150);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 10 }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 25,
              mass: 0.8,
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="relative w-72 origin-bottom-right rounded-2xl border border-border bg-background p-4 shadow-xl"
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute cursor-pointer right-3 top-3 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Close"
            >
              <X size={16} />
            </button>

            <p className="pr-5 text-sm text-foreground leading-relaxed">
              Hey! Have you used{" "}
              <span className="font-semibold text-primary">Devsloka UI</span>?
              We&apos;d love to hear your feedback. Please share your
              testimonial.
            </p>

            <a
              href={FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block w-full rounded-lg bg-primary px-4 py-2 text-center text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              Share Testimonial ✨
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        aria-label="Share your testimonial"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg cursor-pointer"
      >
        <MessageSquareHeart size={24} />
      </motion.button>
    </div>
  );
}
