export type EditionPlan = {
  name: string;
  price: string;
  priceNote: string;
  features: string[];
  cta: { label: string; href: string };
  highlighted?: boolean;
};

// Pro is not launched yet. Update price, features and CTA here when it is.
export const EDITIONS: EditionPlan[] = [
  {
    name: "Free",
    price: "₹0",
    priceNote: "Free forever. MIT licensed.",
    features: [
      "Every component, background and hook in the index",
      "Section blocks for real pages",
      "Install with the shadcn CLI or copy the source",
      "Personal and commercial projects",
    ],
    cta: { label: "Browse components", href: "/components" },
  },
  {
    name: "Pro",
    price: "Soon",
    priceNote: "One licence. Lifetime updates.",
    features: [
      "Advanced components with complex interactions",
      "Full-page blocks and complete templates",
      "Early access to new releases",
      "Priority support",
    ],
    cta: {
      label: "Get notified",
      href: "https://www.devsloka.in/contact-us",
    },
    highlighted: true,
  },
];
