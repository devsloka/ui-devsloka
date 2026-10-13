import type { ComponentCardProps } from "@/components/root/component-card";

// Cards on /components. Kept separate from components.utils so this page doesn't
// import every demo. Images come from `npm run previews`.
export const components: ComponentCardProps[] = [
  {
    title: "Animated Multi Select",
    href: "/components/animated-multi-select",
    description:
      "Searchable multi-select with animated chips, built on cmdk and Radix Popover with full keyboard support.",
    image: "/images/animated-multi-select.png",
  },
  {
    title: "Animated Smartwatch",
    href: "/components/animated-smartwatch",
    description:
      "Scroll-driven smartwatch mockup that rotates into view, with a live clock face or your own screen content.",
    image: "/images/animated-smartwatch.png",
  },
  {
    title: "Arc Scroll Steps",
    href: "/components/arc-scroll-steps",
    description:
      "Scroll-driven stepper: numbered steps orbit a large arc and the active step's title swaps in as you scroll.",
    image: "/images/arc-scroll-steps.png",
  },
  {
    title: "Availability Card",
    href: "/components/availability-card",
    description:
      "Hire-me card with a live availability pulse, local-time clock, tactile buttons and a copy-email confirmation.",
    image: "/images/availability-card.png",
  },
  {
    title: "Bento Grid",
    href: "/components/bento-grid",
    description:
      "Animated bento feature grid: files flowing through an action, drifting category rows, a playable install and a copyable command.",
    image: "/images/bento-grid.png",
  },
  {
    title: "Border Gradient Icon",
    href: "/components/border-gradient-icon",
    description:
      "Icon tile with a subtle gradient border that can render as a link or button.",
    image: "/images/border-gradient-icon.png",
  },
  {
    title: "Card Decorator",
    href: "/components/card-decorator",
    description:
      "Decorative corner accents for cards: brackets, dashes, dots or glow, in the current text color.",
    image: "/images/card-decorator.png",
  },
  {
    title: "Card Radio",
    href: "/components/card-radio",
    description:
      "Selectable cards with real radio semantics and arrow-key navigation, built on Radix Radio Group.",
    image: "/images/card-radio.png",
  },
  {
    title: "Case Study Carousel",
    href: "/components/case-study-carousel",
    description:
      "Stacked case-study carousel: the active card leads while neighbours peek behind, with arrows, dots, swipe and keyboard.",
    image: "/images/case-study-carousel.png",
  },
  {
    title: "Content Carousel",
    href: "/components/content-carousel",
    description:
      "Step through titled content with labelled previous/next controls, dot navigation and live-region announcements.",
    image: "/images/content-carousel.png",
  },
  {
    title: "Dock Gallery",
    href: "/components/dock-gallery",
    description:
      "Bottom-aligned project row that magnifies like a dock: the card nearest the pointer grows and its neighbours step down.",
    image: "/images/dock-gallery.png",
  },
  {
    title: "Empty Result",
    href: "/components/empty-result",
    description:
      "Empty state with an animated icon, title, description and an action slot.",
    image: "/images/empty-result.png",
  },
  {
    title: "Error Result",
    href: "/components/error-result",
    description:
      "Error state announced as an alert, with an animated icon, description and recovery actions.",
    image: "/images/error-result.png",
  },
  {
    title: "Expanding Cards",
    href: "/components/expanding-cards",
    description:
      "Image cards that expand on selection using pure CSS flex-grow transitions, with accessible buttons.",
    image: "/images/expanding-cards.png",
  },
  {
    title: "Floating Dots",
    href: "/components/floating-dots",
    description:
      "Lightweight canvas background of rising dots that pauses offscreen, scales for high-DPI screens and respects reduced motion.",
    image: "/images/floating-dots.png",
  },
  {
    title: "Fuzzy Mascot",
    href: "/components/fuzzy-mascot",
    description:
      "Plush SVG mascots in 15 shapes whose eyes follow the cursor, with idle, working and sleeping states, five shadings, hats, glasses and fur length.",
    image: "/images/fuzzy-mascot.png",
  },
  {
    title: "Gradient Text",
    href: "/components/gradient-text",
    description:
      "CSS-only animated gradient text using your theme colors. No client JavaScript.",
    image: "/images/gradient-text.png",
  },
  {
    title: "Hover Expand Gallery",
    href: "/components/hover-expand-gallery",
    description:
      "Row of image panels where the hovered one expands and reveals its label while the rest narrow; tap and arrow keys work too.",
    image: "/images/hover-expand-gallery.png",
  },
  {
    title: "Icon Radio",
    href: "/components/icon-radio",
    description:
      "Icon-based radio options with a playful check animation, built on Radix Radio Group.",
    image: "/images/icon-radio.png",
  },
  {
    title: "Image Gallery",
    href: "/components/animated-image-gallery",
    description:
      "Masonry image gallery whose items fade in as they scroll into view, with captions.",
    image: "/images/animated-image-gallery.png",
  },
  {
    title: "Laptop Closes on Scroll",
    href: "/components/laptop-closes-on-scroll",
    description:
      "Scroll-driven laptop mockup whose lid closes as you scroll, with any content on its screen.",
    image: "/images/laptop-closes-on-scroll.png",
  },
  {
    title: "Listing Card",
    href: "/components/airbnb-card",
    description:
      "Rental listing card with a swipeable scroll-snap photo carousel, rating, badge and a controllable favorite toggle.",
    image: "/images/airbnb-card.png",
  },
  {
    title: "Loader",
    href: "/components/loader",
    description:
      "Accessible pulsing-dot loader that inherits the current text color, in three sizes.",
    image: "/images/loader.png",
  },
  {
    title: "Logo Cloud Carousel",
    href: "/components/logo-cloud-carousel",
    description:
      "Infinite CSS marquee of logos with hover pause, edge fade, dark-mode logos and a reduced-motion fallback.",
    image: "/images/logo-cloud-carousel.png",
  },
  {
    title: "Mission Bento",
    href: "/components/mission-bento",
    description:
      "Stats bento with a masked heading reveal, staggered tiles, count-up numbers and a self-drawing trend arrow.",
    image: "/images/mission-bento.png",
  },
  {
    title: "Morphing Card",
    href: "/components/morphing-card",
    description:
      "A card that morphs into a dialog with shared-layout animation, built on Radix Dialog for focus and Escape handling.",
    image: "/images/morphing-card.png",
  },
  {
    title: "Morphing Modal",
    href: "/components/morphing-modal",
    description:
      "A dialog that grows from its trigger and contains animated tabs, built on Radix Dialog and Tabs.",
    image: "/images/morphing-modal.png",
  },
  {
    title: "Morphing Nav",
    href: "/components/morphing-nav",
    description:
      "Segmented navigation with a sliding active indicator. Renders links or a keyboard-navigable radio group.",
    image: "/images/morphing-nav.png",
  },
  {
    title: "Now Playing Card",
    href: "/components/now-playing-card",
    description:
      "Music widget whose album art spins as a vinyl disc and morphs into the full cover on hover, with a live progress clock.",
    image: "/images/now-playing-card.png",
  },
  {
    title: "Pricing Card",
    href: "/components/pricing-card",
    description:
      "Plan card with price, period, feature list, badge and a call to action.",
    image: "/images/pricing-card.png",
  },
  {
    title: "Product Card",
    href: "/components/product-card",
    description:
      "E-commerce product card with color swatches, wishlist toggle, ratings and add-to-cart.",
    image: "/images/product-card.png",
  },
  {
    title: "Product Tour",
    href: "/components/tour",
    description:
      "Step-by-step spotlight tour with smart card placement, keyboard navigation and focus management.",
    image: "/images/tour.png",
  },
  {
    title: "Profile Card",
    href: "/components/profile-card",
    description:
      "Social profile card with accent-tinted wave cover art, verified badge, follow toggle, stats and link.",
    image: "/images/profile-card.png",
  },
  {
    title: "Range Slider with Histogram",
    href: "/components/range-slider-with-histogram",
    description:
      "Dual-thumb range slider over a histogram that highlights the selected range. Controlled or uncontrolled.",
    image: "/images/range-slider-with-histogram.png",
  },
  {
    title: "Receipt Printer",
    href: "/components/receipt-printer",
    description:
      "Order card that prints a torn-edge receipt line by line, with itemised totals, a pay-by-QR slot and tear-off reset.",
    image: "/images/receipt-printer.png",
  },
  {
    title: "Reminders Card",
    href: "/components/reminders-card",
    description:
      "Widget-style checklist with a glowing accent header, live clock, animated checkboxes and inline add.",
    image: "/images/reminders-card.png",
  },
  {
    title: "Showcase Bento",
    href: "/components/showcase-bento",
    description:
      "Animated showcase bento: hopping team portraits, a count-up stat, rotating testimonials and drifting framework and tech rows.",
    image: "/images/showcase-bento.png",
  },
  {
    title: "Success Result",
    href: "/components/success-result",
    description:
      "Success state with a self-drawing check icon, announced as a status, plus an action slot.",
    image: "/images/success-result.png",
  },
  {
    title: "Tabs Switcher",
    href: "/components/tabs-switcher",
    description:
      "Feature tabs with descriptions and cross-fading panels, built on Radix Tabs.",
    image: "/images/tabs-switcher.png",
  },
  {
    title: "Team Carousel",
    href: "/components/team-carousel",
    description:
      "Infinite Embla carousel of team portraits that pauses on hover, lifts the hovered member and highlights their division.",
    image: "/images/team-carousel.png",
  },
  {
    title: "Text Effect",
    href: "/components/text-effect",
    description:
      "Cycles words in place with eight transition styles, sized to the longest word so nothing shifts.",
    image: "/images/text-effect.png",
  },
];
