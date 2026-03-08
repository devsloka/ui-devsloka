"use client";

import { useState } from "react";
import { MessageSquareHeart, X } from "lucide-react";

const FORM_URL = "https://forms.gle/wCs5knKiXRtFXb9C7";

export default function TestimonialBubble() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {isOpen && (
        <div className="relative w-72 rounded-2xl border border-border bg-background p-4 shadow-xl">
          <button
            onClick={() => setIsOpen(false)}
            className="absolute right-3 top-3 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Close"
          >
            <X size={16} />
          </button>
          <p className="pr-5 text-sm text-foreground leading-relaxed">
            Hey! Have you used{" "}
            <span className="font-semibold text-primary">Devsloka UI</span>?
            We&apos;d love to hear your feedback. Please share your testimonial.
          </p>
          <a
            href={FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block w-full rounded-lg bg-primary px-4 py-2 text-center text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            Share Testimonial ✨
          </a>
        </div>
      )}

      <button
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Share your testimonial"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-110 active:scale-95"
      >
        <MessageSquareHeart size={24} />
      </button>
    </div>
  );
}
