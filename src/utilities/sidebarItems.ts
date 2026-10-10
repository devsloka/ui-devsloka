// Static on purpose: the navbar and search import this, and importing the real
// component registries here would pull every demo into every page.
export type SidebarItemChild = {
  title: string;
  href: string;
  badge?: "New" | "Pro";
};

export type SidebarItem = {
  title: string;
  /** Index page for the section, if it has one. */
  href?: string;
  children: SidebarItemChild[];
};

export const sidebarItems: SidebarItem[] = [
  {
    title: "Getting Started",
    children: [
      { title: "Introduction", href: "/docs" },
      { title: "Installation", href: "/installation" },
    ],
  },
  {
    title: "Components",
    href: "/components",
    children: [
      { title: "Animated Multi Select", href: "/components/animated-multi-select" },
      { title: "Animated Smartwatch", href: "/components/animated-smartwatch" },
      { title: "Border Gradient Icon", href: "/components/border-gradient-icon" },
      { title: "Card Decorator", href: "/components/card-decorator" },
      { title: "Card Radio", href: "/components/card-radio" },
      { title: "Content Carousel", href: "/components/content-carousel" },
      { title: "Empty Result", href: "/components/empty-result" },
      { title: "Error Result", href: "/components/error-result" },
      { title: "Expanding Cards", href: "/components/expanding-cards" },
      { title: "Floating Dots", href: "/components/floating-dots" },
      { title: "Gradient Text", href: "/components/gradient-text" },
      { title: "Icon Radio", href: "/components/icon-radio" },
      { title: "Image Gallery", href: "/components/animated-image-gallery" },
      { title: "Laptop Closes on Scroll", href: "/components/laptop-closes-on-scroll" },
      { title: "Listing Card", href: "/components/airbnb-card" },
      { title: "Loader", href: "/components/loader" },
      { title: "Logo Cloud Carousel", href: "/components/logo-cloud-carousel" },
      { title: "Morphing Card", href: "/components/morphing-card" },
      { title: "Morphing Modal", href: "/components/morphing-modal" },
      { title: "Morphing Nav", href: "/components/morphing-nav" },
      { title: "Pricing Card", href: "/components/pricing-card" },
      { title: "Product Card", href: "/components/product-card" },
      { title: "Product Tour", href: "/components/tour" },
      { title: "Range Slider with Histogram", href: "/components/range-slider-with-histogram" },
      { title: "Success Result", href: "/components/success-result" },
      { title: "Tabs Switcher", href: "/components/tabs-switcher" },
      { title: "Text Effect", href: "/components/text-effect" },
    ],
  },
  {
    title: "Backgrounds",
    href: "/components/backgrounds",
    children: [
      { title: "3D Globe", href: "/components/backgrounds/3d-background" },
      { title: "Blobs", href: "/components/backgrounds/blob-background" },
      { title: "Confetti", href: "/components/backgrounds/confetti-background" },
      // { title: "Fireflies", href: "/components/backgrounds/fireflies-background" },
      // { title: "Floating Shapes", href: "/components/backgrounds/floating-shapes" },
      // { title: "Galaxy", href: "/components/backgrounds/galaxy-background" },
      // Hidden for now. Uncomment to bring these backgrounds back.
      // { title: "Gradient", href: "/components/backgrounds/gradient-bg" },
      // { title: "Gradient Mesh", href: "/components/backgrounds/gradient-mesh-background" },
      // { title: "Gradient Wave", href: "/components/backgrounds/gradient-wave" },
      // { title: "Grid Mesh", href: "/components/backgrounds/grid-mesh-background" },
      // { title: "Lines", href: "/components/backgrounds/lines-background" },
      // { title: "Moon & Stars", href: "/components/backgrounds/moon-stars-background" },
      // { title: "Noise", href: "/components/backgrounds/noise-background" },
      // { title: "Pulsing Circles", href: "/components/backgrounds/circles-background" },
      // { title: "Ripple", href: "/components/backgrounds/ripple-background" },
      { title: "Sky Particles", href: "/components/backgrounds/particles-background" },
      // { title: "Spotlight", href: "/components/backgrounds/spotlight-background" },
    ],
  },
  {
    title: "Hooks",
    href: "/utilities",
    children: [
      { title: "useAnimation", href: "/utilities/use-animation" },
      { title: "useClipboard", href: "/utilities/use-clipboard" },
      { title: "useDarkMode", href: "/utilities/use-dark-mode" },
      { title: "useDateFormatter", href: "/utilities/use-date-formatter" },
      { title: "useDebounce", href: "/utilities/use-debounce" },
      { title: "useDeviceDetection", href: "/utilities/use-device-detection" },
      { title: "useFetch", href: "/utilities/use-fetch" },
      { title: "useForm", href: "/utilities/use-form" },
      { title: "useHover", href: "/utilities/use-hover" },
      { title: "useKeyPress", href: "/utilities/use-key-press" },
      { title: "useLocalStorage", href: "/utilities/use-local-storage" },
      { title: "useOnClickOutside", href: "/utilities/use-on-click-outside" },
      { title: "useOnlineStatus", href: "/utilities/use-online-status" },
      { title: "usePrevious", href: "/utilities/use-previous" },
      { title: "useScrollPosition", href: "/utilities/use-scroll-position" },
      { title: "useWindowSize", href: "/utilities/use-window-size" },
    ],
  },
  {
    title: "Blocks",
    href: "/blocks",
    children: [
      { title: "All Blocks", href: "/blocks" },
    ],
  },
  {
    title: "Templates",
    href: "/templates",
    children: [
      { title: "All Templates", href: "/templates" },
      { title: "AI Agent Template", href: "/templates/ai-agent-template" },
      { title: "Devspro Portfolio", href: "/templates/devspro-portfolio" },
      { title: "E-commerce Store", href: "/templates/e-commerce-store" },
    ],
  },
];
