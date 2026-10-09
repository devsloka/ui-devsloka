export type Edition = "free" | "pro";

export type CatalogCategory =
  | "Interaction"
  | "Inputs"
  | "Cards"
  | "Feedback"
  | "Effects"
  | "Backgrounds"
  | "Hooks";

export type CatalogEntry = {
  name: string;
  href: string;
  category: CatalogCategory;
  edition: Edition;
  /** Preview image in /public, shown when hovering the row. */
  image?: string;
};

export const CATALOG_CATEGORIES: CatalogCategory[] = [
  "Interaction",
  "Inputs",
  "Cards",
  "Feedback",
  "Effects",
  "Backgrounds",
  "Hooks",
];

const component = (
  name: string,
  slug: string,
  category: CatalogCategory,
  image: string | null = slug
): CatalogEntry => ({
  name,
  href: `/components/${slug}`,
  category,
  edition: "free",
  image: image ? `/images/${image}.png` : undefined,
});

const background = (name: string, slug: string): CatalogEntry => ({
  name,
  href: `/components/backgrounds/${slug}`,
  category: "Backgrounds",
  edition: "free",
  image: `/images/${slug}.png`,
});

const hook = (name: string, slug: string): CatalogEntry => ({
  name,
  href: `/utilities/${slug}`,
  category: "Hooks",
  edition: "free",
  image: `/images/${slug}.png`,
});

export const CATALOG: CatalogEntry[] = [
  component("Morphing Nav", "morphing-nav", "Interaction"),
  component("Morphing Card", "morphing-card", "Interaction"),
  component("Morphing Modal", "morphing-modal", "Interaction"),
  component("Tabs Switcher", "tabs-switcher", "Interaction"),
  component("Text Effect", "text-effect", "Interaction"),
  component("Tour", "tour", "Interaction"),
  component("Expanding Cards", "expanding-cards", "Interaction"),
  component("Content Carousel", "content-carousel", "Interaction"),
  component("Image Gallery", "animated-image-gallery", "Interaction", "image-gallery"),
  component("Logo Cloud Carousel", "logo-cloud-carousel", "Interaction"),
  component("Laptop Closes On Scroll", "laptop-closes-on-scroll", "Interaction"),
  component("Animated Smartwatch", "animated-smartwatch", "Interaction"),
  component("Animated Multi Select", "animated-multi-select", "Inputs"),
  component("Budget Slider", "range-slider-with-histogram", "Inputs"),
  component("Card Radio", "card-radio", "Inputs"),
  component("Icon Radio", "icon-radio", "Inputs"),
  component("Airbnb Card", "airbnb-card", "Cards"),
  component("Pricing Card", "pricing-card", "Cards"),
  component("Product Card", "product-card", "Cards"),
  component("Card Decorator", "card-decorator", "Cards", null),
  component("Empty Result", "empty-result", "Feedback"),
  component("Error Result", "error-result", "Feedback"),
  component("Success Result", "success-result", "Feedback"),
  component("Loader", "loader", "Feedback", null),
  component("Floating Dots", "floating-dots", "Effects"),
  component("Gradient Text", "gradient-text", "Effects"),
  component("Border Gradient Icon", "border-gradient-icon", "Effects"),
  background("3D Globe", "3d-background"),
  background("Confetti", "confetti-background"),
  background("Galaxy & Milky Way", "galaxy-background"),
  background("Gradient", "gradient-bg"),
  background("Moon & Stars", "moon-stars-background"),
  background("Noise", "noise-background"),
  background("Sky Particles", "particles-background"),
  hook("useClipboard", "use-clipboard"),
  hook("useDateFormatter", "use-date-formatter"),
  hook("useDebounce", "use-debounce"),
  hook("useDeviceDetection", "use-device-detection"),
  hook("useFetch", "use-fetch"),
  hook("useForm", "use-form"),
  hook("useKeyPress", "use-key-press"),
];

export const CATALOG_STATS = {
  components: CATALOG.filter(
    (entry) => entry.category !== "Backgrounds" && entry.category !== "Hooks"
  ).length,
  backgrounds: CATALOG.filter((entry) => entry.category === "Backgrounds")
    .length,
  hooks: CATALOG.filter((entry) => entry.category === "Hooks").length,
};
