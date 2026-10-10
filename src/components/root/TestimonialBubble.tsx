"use client";

import { useEffect, useId, useRef, useState } from "react";
import { X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

const FORM_URL = "https://forms.gle/wCs5knKiXRtFXb9C7";

export default function TestimonialBubble() {
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();
  const reduceMotion = useReducedMotion();

  // Escape and clicks elsewhere close the panel, like any other popover on the site.
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setIsOpen(false);
      triggerRef.current?.focus();
    };
    const handlePointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setIsOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", handlePointerDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [isOpen]);

  return (
    <div
      ref={rootRef}
      className="fixed right-4 bottom-4 z-50 flex flex-col items-end gap-2 md:right-6 md:bottom-6"
    >
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id={panelId}
            role="dialog"
            aria-labelledby={`${panelId}-title`}
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="w-[min(20rem,calc(100vw-2rem))] border border-border bg-background shadow-[0_12px_32px_-16px_rgba(0,0,0,0.25)]"
          >
            <div className="flex items-center justify-between gap-4 border-b border-border px-4 py-2.5 font-mono text-[0.6875rem] uppercase tracking-wider">
              <span className="text-muted-foreground">(FB) Feedback</span>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="-m-1 cursor-pointer p-1 text-muted-foreground transition-colors hover:text-foreground"
                aria-label="Close feedback panel"
              >
                <X size={14} />
              </button>
            </div>

            <div className="px-4 pt-4 pb-5">
              <p
                id={`${panelId}-title`}
                className="text-2xl leading-[1] font-medium tracking-[-0.04em] text-balance"
              >
                Built something with it<span className="text-[#0A6EFF]">?</span>
              </p>
              <p className="mt-3 text-sm text-muted-foreground">
                Tell us how Devsloka UI worked for you. Two minutes, and it may
                end up on the site.
              </p>

              <div className="mt-5 flex items-center justify-between gap-4">
                <a
                  href={FORM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsOpen(false)}
                  className="font-medium underline decoration-1 underline-offset-[6px] transition-colors hover:text-[#0A6EFF]"
                >
                  Share a testimonial ↗
                </a>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="cursor-pointer text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Not now
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        ref={triggerRef}
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        aria-controls={isOpen ? panelId : undefined}
        className="group flex cursor-pointer items-center gap-2 border border-border bg-background px-3 py-2 font-mono text-[0.6875rem] uppercase tracking-wider shadow-[0_8px_24px_-12px_rgba(0,0,0,0.25)] transition-colors hover:border-foreground/40"
      >
        <span
          aria-hidden
          className="size-2 bg-[#0A6EFF] transition-transform group-hover:scale-125"
        />
        Feedback
      </button>
    </div>
  );
}
