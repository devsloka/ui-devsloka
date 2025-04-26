export type SidebarItemChild = {
  title: string;
  href: string;
};

export type SidebarItem = {
  title: string;
  children: SidebarItemChild[];
};

export const sidebarItems: SidebarItem[] = [
  {
    title: "Components",
    children: [
      {
        title: "Animated Multi Select",
        href: "/components/animated-multi-select",
      },
      {
        title: "Tour",
        href: "/components/tour",
      },
      {
        title: "Animated Laptop",
        href: "/components/laptop-closes-on-scroll",
      },
      {
        title: "Image Gallery",
        href: "/components/image-gallery",
      },
      {
        title: "Content Carousel",
        href: "/components/content-carousel",
      },
      {
        title: "Budget Slider",
        href: "/components/range-slider-with-histogram",
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
        title: "Airbnb Card",
        href: "/components/airbnb-card",
      },
      {
        title: "Morphing Nav",
        href: "/components/morphing-nav",
      },
      {
        title: "Morphing Modal",
        href: "/components/morphing-modal",
      },
      {
        title: "Morphing Cards",
        href: "/components/morphing-card",
      },
      {
        title: "Text Effect",
        href: "/components/text-effect",
      },
      {
        title: "Border Gradient Icon",
        href: "/components/border-gradient-icon",
      },
      {
        title: "Gradient Text",
        href: "/components/gradient-text",
      },
      {
        title: "Tabs Switcher",
        href: "/components/tabs-switcher",
      },
      {
        title: "Card Radio",
        href: "/components/card-radio",
      },
      {
        title: "Icon Radio",
        href: "/components/icon-radio",
      },
      {
        title: "Logo Cloud Carousel",
        href: "/components/logo-cloud-carousel",
      },
      {
        title: "Card Decorator",
        href: "/components/card-decorator",
      },
    ],
  },
  {
    title: "Background",
    children: [
      {
        title: "Sky Particles Background",
        href: "/components/backgrounds/particles-background",
      },
      {
        title: "Galaxy & Milky Way",
        href: "/components/backgrounds/galaxy-background",
      },
      {
        title: "Moon & Stars",
        href: "/components/backgrounds/moon-stars-background",
      },
      {
        title: "Confetti Background",
        href: "/components/backgrounds/confetti-background",
      },
      {
        title: "Noise Background",
        href: "/components/backgrounds/noise-background",
      },
      {
        title: "3d globe Background",
        href: "/components/backgrounds/3d-background",
      },
      {
        title: "Gradient Background",
        href: "/components/backgrounds/gradient-bg",
      },
    ],
  },
  {
    title: "Cards",
    children: [
      {
        title: "Explore Animated Card",
        href: "/components/cards/explore-animated-card",
      },
      {
        title: "Pricing Card",
        href: "/components/cards/pricing-card",
      },
      { title: "Product Card", href: "/components/cards/product-card" },
    ],
  },
  {
    title: "Results",
    children: [
      {
        title: "Success Result",
        href: "/components/success-result",
      },
      {
        title: "Error Result",
        href: "/components/error-result",
      },
      {
        title: "Empty Result",
        href: "/components/empty-result",
      },
    ],
  },
  {
    title: "Utilities",
    children: [
      {
        title: "useFetch",
        href: "/utilities/use-fetch",
      },
      {
        title: "useDebounce",
        href: "/utilities/use-debounce",
      },
      {
        title: "useClipboard",
        href: "/utilities/use-clipboard",
      },
      // {
      //   title: "useOnlineStatus",
      //   href: "/utilities/use-online-status",
      // },
      {
        title: "useDeviceDetection",
        href: "/utilities/use-device-detection",
      },
      // {
      //   title: "useHover",
      //   href: "/utilities/use-hover",
      // },
      // {
      //   title: "useWindowSize",
      //   href: "/utilities/use-window-size",
      // },
      {
        title: "useForm",
        href: "/utilities/use-form",
      },
      {
        title: "useKeyPress",
        href: "/utilities/use-key-press",
      },
      // {
      //   title: "useScrollPosition",
      //   href: "/utilities/use-scroll-position",
      // },
      // {
      //   title: "useAnimation",
      //   href: "/utilities/use-animation",
      // },
      {
        title: "useDateFormatter",
        href: "/utilities/use-date-formatter",
      },
    ],
  },
];
