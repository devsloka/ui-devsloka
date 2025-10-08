export type SidebarItemChild = {
  title: string;
  href: string;
  isNew?: boolean;
  isPro?: boolean;
};

export type SidebarItem = {
  title: string;
  children: SidebarItemChild[];
};

export const sidebarItems: SidebarItem[] = [
  {
    title: "Getting Started",
    children: [
      {
        title: "Installation",
        href: "/installation",
      },
      {
        title: "Introduction",
        href: "/docs",
      },
    ],
  },
  {
    title: "Templates",
    children: [
      {
        title: "AI Agent Template",
        href: "/templates/ai-agent-template",
        isPro: false,
      },
      {
        title: "All Templates",
        href: "/templates",
        isPro: false,
      },
      {
        title: "Devspro Portfolio",
        href: "/templates/devspro-portfolio",
        isPro: false,
      },
    ],
  },
  {
    title: "Blocks",
    children: [
      {
        title: "Premium Blocks for Free",
        href: "/blocks",
        isPro: false,
      },
    ],
  },
  {
    title: "Components",
    children: [
      {
        title: "Airbnb Card",
        href: "/components/airbnb-card",
      },
      {
        title: "Animated Multi Select",
        href: "/components/animated-multi-select",
      },
      {
        title: "Animated Smartwatch",
        href: "/components/animated-smartwatch",
      },
      {
        title: "Border Gradient Icon",
        href: "/components/border-gradient-icon",
      },
      {
        title: "Budget Slider",
        href: "/components/range-slider-with-histogram",
      },
      {
        title: "Card Decorator",
        href: "/components/card-decorator",
      },
      {
        title: "Card Radio",
        href: "/components/card-radio",
      },
      {
        title: "Content Carousel",
        href: "/components/content-carousel",
      },
      {
        title: "Expanding Cards",
        href: "/components/expanding-cards",
      },
      {
        title: "Floating Dots",
        href: "/components/floating-dots",
      },
      {
        title: "Gradient Text",
        href: "/components/gradient-text",
      },
      {
        title: "Icon Radio",
        href: "/components/icon-radio",
      },
      {
        title: "Image Gallery",
        href: "/components/animated-image-gallery",
      },
      {
        title: "Logo Cloud Carousel",
        href: "/components/logo-cloud-carousel",
      },
      {
        title: "Morphing Cards",
        href: "/components/morphing-card",
      },
      {
        title: "Morphing Modal",
        href: "/components/morphing-modal",
      },
      {
        title: "Morphing Nav",
        href: "/components/morphing-nav",
      },
      {
        title: "Tabs Switcher",
        href: "/components/tabs-switcher",
      },
      {
        title: "Loader",
        href: "/components/loader",
        isNew: true,
      },
      {
        title: "Text Effect",
        href: "/components/text-effect",
      },
      {
        title: "Tour",
        href: "/components/tour",
        isNew: true,
      },
    ],
  },
  {
    title: "Background",
    children: [
      {
        title: "3d globe Background",
        href: "/components/backgrounds/3d-background",
      },
      {
        title: "Confetti Background",
        href: "/components/backgrounds/confetti-background",
      },
      {
        title: "Galaxy & Milky Way",
        href: "/components/backgrounds/galaxy-background",
      },
      {
        title: "Gradient Background",
        href: "/components/backgrounds/gradient-bg",
      },
      {
        title: "Moon & Stars",
        href: "/components/backgrounds/moon-stars-background",
      },
      {
        title: "Noise Background",
        href: "/components/backgrounds/noise-background",
      },
      {
        title: "Sky Particles Background",
        href: "/components/backgrounds/particles-background",
      },
    ],
  },
  {
    title: "Cards",
    children: [
      {
        title: "Airbnb Card",
        href: "/components/airbnb-card",
      },
      {
        title: "Pricing Card",
        href: "/components/pricing-card",
      },
      { 
        title: "Product Card", 
        href: "/components/product-card" 
      },
    ],
  },
  {
    title: "Results",
    children: [
      {
        title: "Empty Result",
        href: "/components/empty-result",
      },
      {
        title: "Error Result",
        href: "/components/error-result",
      },
      {
        title: "Success Result",
        href: "/components/success-result",
      },
    ],
  },
  {
    title: "Utilities",
    children: [
      {
        title: "useClipboard",
        href: "/utilities/use-clipboard",
      },
      {
        title: "useDateFormatter",
        href: "/utilities/use-date-formatter",
      },
      {
        title: "useDebounce",
        href: "/utilities/use-debounce",
      },
      {
        title: "useDeviceDetection",
        href: "/utilities/use-device-detection",
      },
      {
        title: "useFetch",
        href: "/utilities/use-fetch",
      },
      {
        title: "useForm",
        href: "/utilities/use-form",
      },
      {
        title: "useKeyPress",
        href: "/utilities/use-key-press",
      },
    ],
  },
];