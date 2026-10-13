export type EditionPlan = {
  name: string;
  /** One line under the price: who the plan is for. */
  tagline: string;
  price: string;
  /** Small text after the price, e.g. "forever" or "one-time". */
  priceSuffix: string;
  /** A launch offer shown in place of the full price, which is then struck through. */
  offer?: { price: string; note: string };
  features: string[];
  cta: { label: string; href: string };
  comingSoon?: boolean;
  highlighted?: boolean;
};

// Pro is not launched yet. Update the offer, features and CTA here when it is.
export const EDITIONS: EditionPlan[] = [
  {
    name: "Free",
    tagline: "Everything in the library, free for personal and commercial work.",
    price: "$0",
    priceSuffix: "forever",
    features: [
      "Every component, background and hook in the index",
      "Section blocks for real pages",
      "Install with the shadcn CLI or copy the source",
      "MIT licensed, for personal and commercial projects",
      "Updates as the library grows",
    ],
    cta: { label: "Browse components", href: "/components" },
  },
  {
    name: "Pro",
    tagline: "More motion, more depth, and new components every month. Pay once, keep it forever.",
    price: "$199",
    priceSuffix: "one-time",
    offer: { price: "$149", note: "Launch price for the first 30 days" },
    features: [
      "More animated and complex components",
      "New, on-trend components every month",
      "An AI skill that customizes components for your project",
      "Full-page blocks and complete templates",
      "Lifetime updates and priority support",
    ],
    cta: { label: "Get the launch price", href: "/pro" },
    comingSoon: true,
    highlighted: true,
  },
];
