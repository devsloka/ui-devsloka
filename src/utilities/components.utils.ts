import AirbnbListingCardExample from "@/components/devsloka-components/demo/airbnb-card-demo";
import AnimatedLaptopDemo from "@/components/devsloka-components/demo/laptop-closes-on-scroll-demo";
import BorderGradientIconDemo from "@/components/devsloka-components/demo/border-gradient-icon-demo";
import CardDecoratorDemo from "@/components/devsloka-components/demo/card-decorator-demo";
import CardRadioDemo from "@/components/devsloka-components/demo/card-radio-demo";
import { ContentCarouselDemo } from "@/components/devsloka-components/demo/content-carousel-demo";
import { ExpandingCardsDemo } from "@/components/devsloka-components/demo/expanding-cards-demo";
import FloatingDotsDemo from "@/components/devsloka-components/demo/floating-dots-demo";
import GradientTextDemo from "@/components/devsloka-components/demo/gradient-text-demo";
import IconRadioDemo from "@/components/devsloka-components/demo/icon-radio-demo";
import LogoCloudCarouselDemo from "@/components/devsloka-components/demo/logo-cloud-carousel-demo";
import { MorphingCardDemo } from "@/components/devsloka-components/demo/morphing-card-demo";
import { MorphingModalDemo } from "@/components/devsloka-components/demo/morphing-modal-demo";
import MorphingNavDemo from "@/components/devsloka-components/demo/morphing-nav-demo";
import RangeSliderWithHistogramDemo from "@/components/devsloka-components/demo/range-slider-with-histogram-demo";
import TabsSwitcherDemo from "@/components/devsloka-components/demo/tabs-switcher-demo";
import { TextEffectDemo } from "@/components/devsloka-components/demo/text-effect-demo";
import TourDemo from "@/components/devsloka-components/demo/tour-demo";
import EmptyResultDemo from "@/components/devsloka-components/demo/empty-result-demo";
import ErrorResultDemo from "@/components/devsloka-components/demo/error-result-demo";
import SuccessResultDemo from "@/components/devsloka-components/demo/success-result-demo";
import AnimatedMultiSelectDemo from "@/components/devsloka-components/demo/animated-multi-select-demo";
import ImageGalleryDemo from "@/components/devsloka-components/demo/animated-image-gallery-demo";
import AnimatedSmartwatchDemo from "@/components/devsloka-components/demo/animated-smartwatch-demo";
import PricingCardDemo from "@/components/devsloka-components/demo/pricing-card-demo";
import { ProductCardDemo } from "@/components/devsloka-components/demo/product-card-demo";
import LoaderDemo from "@/components/devsloka-components/demo/loader-demo";
import ProfileCardDemo from "@/components/devsloka-components/demo/profile-card-demo";
import AvailabilityCardDemo from "@/components/devsloka-components/demo/availability-card-demo";
import ReceiptPrinterDemo from "@/components/devsloka-components/demo/receipt-printer-demo";
import RemindersCardDemo from "@/components/devsloka-components/demo/reminders-card-demo";
import NowPlayingCardDemo from "@/components/devsloka-components/demo/now-playing-card-demo";
import ArcScrollStepsDemo from "@/components/devsloka-components/demo/arc-scroll-steps-demo";
import TeamCarouselDemo from "@/components/devsloka-components/demo/team-carousel-demo";
import DockGalleryDemo from "@/components/devsloka-components/demo/dock-gallery-demo";
import BentoGridDemo from "@/components/devsloka-components/demo/bento-grid-demo";
import ShowcaseBentoDemo from "@/components/devsloka-components/demo/showcase-bento-demo";
import MissionBentoDemo from "@/components/devsloka-components/demo/mission-bento-demo";
import HoverExpandGalleryDemo from "@/components/devsloka-components/demo/hover-expand-gallery-demo";
import CaseStudyCarouselDemo from "@/components/devsloka-components/demo/case-study-carousel-demo";
import FuzzyMascotDemo from "@/components/devsloka-components/demo/fuzzy-mascot-demo";

export type ComponentMeta = {
  component: React.FC;
  codeMetadata: {
    title: string;
    description: string;
    keywords: string[];
    language: string;
    secondaryCode?: string;
    secondaryTitle?: string;
    secondaryLanguage?: string;
    secondaryDescription?: string;
  };
};

export const components: Record<string, ComponentMeta> = {
  "airbnb-card": {
    component: AirbnbListingCardExample,
    codeMetadata: {
      title: "Listing Card",
      description:
        "Rental listing card with a swipeable scroll-snap photo carousel, rating, badge and a controllable favorite toggle.",
      keywords: ["React", "Listing Card", "Image Carousel", "Scroll Snap", "Commerce UI", "Accessible"],
      language: "tsx",
      secondaryTitle: "Copy source code and paste it in components/ui folder",
      secondaryLanguage: "typescript",
      secondaryDescription: "components/ui/airbnb-listing-card.tsx",
    },
  },
  "content-carousel": {
    component: ContentCarouselDemo,
    codeMetadata: {
      title: "Content Carousel",
      description:
        "Step through titled content with labelled previous/next controls, dot navigation and live-region announcements.",
      keywords: ["React", "Carousel", "Controlled", "Motion", "Accessible"],
      language: "tsx",
      secondaryTitle: "Copy source code and paste it in components/ui folder",
      secondaryLanguage: "typescript",
      secondaryDescription: "components/ui/content-carousel.tsx",
    },
  },
  "empty-result": {
    component: EmptyResultDemo,
    codeMetadata: {
      title: "Empty Result",
      description:
        "Empty state with an animated icon, title, description and an action slot.",
      keywords: ["React", "Empty State", "Motion", "Feedback"],
      language: "tsx",
      secondaryTitle: "Copy source code and paste it in components/ui folder",
      secondaryLanguage: "typescript",
      secondaryDescription: "components/ui/empty-result.tsx",
    },
  },
  "error-result": {
    component: ErrorResultDemo,
    codeMetadata: {
      title: "Error Result",
      description:
        "Error state announced as an alert, with an animated icon, description and recovery actions.",
      keywords: ["React", "Error State", "Alert", "Motion", "Feedback"],
      language: "tsx",
      secondaryTitle: "Copy source code and paste it in components/ui folder",
      secondaryLanguage: "typescript",
      secondaryDescription: "components/ui/error-result.tsx",
    },
  },
  "expanding-cards": {
    component: ExpandingCardsDemo,
    codeMetadata: {
      title: "Expanding Cards",
      description:
        "Image cards that expand on selection using pure CSS flex-grow transitions, with accessible buttons.",
      keywords: ["React", "Accordion", "Image Cards", "CSS Transitions", "Accessible"],
      language: "tsx",
      secondaryTitle: "Copy source code and paste it in components/ui folder",
      secondaryLanguage: "typescript",
      secondaryDescription: "components/ui/expanding-cards.tsx",
    },
  },
  "floating-dots": {
    component: FloatingDotsDemo,
    codeMetadata: {
      title: "Floating Dots",
      description:
        "Lightweight canvas background of rising dots that pauses offscreen, scales for high-DPI screens and respects reduced motion.",
      keywords: ["React", "Canvas", "Particles", "Background", "Performance"],
      language: "tsx",
      secondaryTitle: "Copy source code and paste it in components/ui folder",
      secondaryLanguage: "typescript",
      secondaryDescription: "components/ui/floating-dots.tsx",
    },
  },
  "morphing-card": {
    component: MorphingCardDemo,
    codeMetadata: {
      title: "Morphing Card",
      description:
        "A card that morphs into a dialog with shared-layout animation, built on Radix Dialog for focus and Escape handling.",
      keywords: ["React", "Dialog", "Shared Layout", "Motion", "Accessible"],
      language: "tsx",
      secondaryTitle: "Copy source code and paste it in components/ui folder",
      secondaryLanguage: "typescript",
      secondaryDescription: "components/ui/morphing-card.tsx",
    },
  },
  "morphing-modal": {
    component: MorphingModalDemo,
    codeMetadata: {
      title: "Morphing Modal",
      description:
        "A dialog that grows from its trigger and contains animated tabs, built on Radix Dialog and Tabs.",
      keywords: ["React", "Modal", "Tabs", "Shared Layout", "Motion"],
      language: "tsx",
      secondaryTitle: "Copy source code and paste it in components/ui folder",
      secondaryLanguage: "typescript",
      secondaryDescription: "components/ui/morphing-modal.tsx",
    },
  },
  "morphing-nav": {
    component: MorphingNavDemo,
    codeMetadata: {
      title: "Morphing Nav",
      description:
        "Segmented navigation with a sliding active indicator. Renders links or a keyboard-navigable radio group.",
      keywords: ["React", "Navigation", "Segmented Control", "Motion", "Accessible"],
      language: "tsx",
      secondaryTitle: "Copy source code and paste it in components/ui folder",
      secondaryLanguage: "typescript",
      secondaryDescription: "components/ui/morphing-nav.tsx",
    },
  },
  "loader": {
    component: LoaderDemo,
    codeMetadata: {
      title: "Loader",
      description:
        "Accessible pulsing-dot loader that inherits the current text color, in three sizes.",
      keywords: ["React", "Loader", "Loading State", "Accessible"],
      language: "tsx",
      secondaryTitle: "Copy source code and paste it in components/ui folder",
      secondaryLanguage: "typescript",
      secondaryDescription: "components/ui/loader.tsx",
    },
  },
  "range-slider-with-histogram": {
    component: RangeSliderWithHistogramDemo,
    codeMetadata: {
      title: "Range Slider with Histogram",
      description:
        "Dual-thumb range slider over a histogram that highlights the selected range. Controlled or uncontrolled.",
      keywords: ["React", "Range Slider", "Histogram", "Form Control", "Radix"],
      language: "tsx",
      secondaryTitle: "Copy source code and paste it in components/ui folder",
      secondaryLanguage: "typescript",
      secondaryDescription: "components/ui/range-slider-with-histogram.tsx",
    },
  },
  "success-result": {
    component: SuccessResultDemo,
    codeMetadata: {
      title: "Success Result",
      description:
        "Success state with a self-drawing check icon, announced as a status, plus an action slot.",
      keywords: ["React", "Success State", "SVG Animation", "Motion", "Feedback"],
      language: "tsx",
      secondaryTitle: "Copy source code and paste it in components/ui folder",
      secondaryLanguage: "typescript",
      secondaryDescription: "components/ui/success-result.tsx",
    },
  },
  tour: {
    component: TourDemo,
    codeMetadata: {
      title: "Product Tour",
      description:
        "Step-by-step spotlight tour with smart card placement, keyboard navigation and focus management.",
      keywords: ["React", "Onboarding", "Spotlight", "Guided Tour", "Accessible"],
      language: "tsx",
      secondaryTitle: "Copy source code and paste it in components/ui folder",
      secondaryLanguage: "typescript",
      secondaryDescription: "components/ui/tour.tsx",
    },
  },
  "text-effect": {
    component: TextEffectDemo,
    codeMetadata: {
      title: "Text Effect",
      description:
        "Cycles words in place with eight transition styles, sized to the longest word so nothing shifts.",
      keywords: ["React", "Text Animation", "Motion", "Typography"],
      language: "tsx",
      secondaryTitle: "Copy source code and paste it in components/ui folder",
      secondaryLanguage: "typescript",
      secondaryDescription: "components/ui/text-effect.tsx",
    },
  },
  "border-gradient-icon": {
    component: BorderGradientIconDemo,
    codeMetadata: {
      title: "Border Gradient Icon",
      description:
        "Icon tile with a subtle gradient border that can render as a link or button.",
      keywords: ["React", "Icon", "Gradient Border", "Radix Slot"],
      language: "tsx",
      secondaryTitle: "Copy source code and paste it in components/ui folder",
      secondaryLanguage: "typescript",
      secondaryDescription: "components/ui/border-gradient-icon.tsx",
    },
  },
  "gradient-text": {
    component: GradientTextDemo,
    codeMetadata: {
      title: "Gradient Text",
      description:
        "CSS-only animated gradient text using your theme colors. No client JavaScript.",
      keywords: ["React", "Typography", "Gradient", "CSS Animation"],
      language: "tsx",
      secondaryTitle: "Copy source code and paste it in components/ui folder",
      secondaryLanguage: "typescript",
      secondaryDescription: "components/ui/gradient-text.tsx",
    },
  },
  "animated-image-gallery": {
    component: ImageGalleryDemo,
    codeMetadata: {
      title: "Image Gallery",
      description:
        "Masonry image gallery whose items fade in as they scroll into view, with captions.",
      keywords: ["React", "Image Gallery", "Masonry", "Scroll Animation", "next/image"],
      language: "tsx",
      secondaryTitle: "Copy source code and paste it in components/ui folder",
      secondaryLanguage: "typescript",
      secondaryDescription: "components/ui/animated-image-gallery.tsx",
    },
  },
  "tabs-switcher": {
    component: TabsSwitcherDemo,
    codeMetadata: {
      title: "Tabs Switcher",
      description:
        "Feature tabs with descriptions and cross-fading panels, built on Radix Tabs.",
      keywords: ["React", "Tabs", "Radix", "Motion", "Accessible"],
      language: "tsx",
      secondaryTitle: "Copy source code and paste it in components/ui folder",
      secondaryLanguage: "typescript",
      secondaryDescription: "components/ui/tabs-switcher.tsx",
    },
  },
  "card-radio": {
    component: CardRadioDemo,
    codeMetadata: {
      title: "Card Radio",
      description:
        "Selectable cards with real radio semantics and arrow-key navigation, built on Radix Radio Group.",
      keywords: ["React", "Radio Group", "Form Control", "Radix", "Accessible"],
      language: "tsx",
      secondaryTitle: "Copy source code and paste it in components/ui folder",
      secondaryLanguage: "typescript",
      secondaryDescription: "components/ui/card-radio.tsx",
    },
  },
  "icon-radio": {
    component: IconRadioDemo,
    codeMetadata: {
      title: "Icon Radio",
      description:
        "Icon-based radio options with a playful check animation, built on Radix Radio Group.",
      keywords: ["React", "Radio Group", "Icons", "Radix", "Accessible"],
      language: "tsx",
      secondaryTitle: "Copy source code and paste it in components/ui folder",
      secondaryLanguage: "typescript",
      secondaryDescription: "components/ui/icon-radio.tsx",
    },
  },
  "card-decorator": {
    component: CardDecoratorDemo,
    codeMetadata: {
      title: "Card Decorator",
      description:
        "Decorative corner accents for cards: brackets, dashes, dots or glow, in the current text color.",
      keywords: ["React", "Card", "Decoration"],
      language: "tsx",
      secondaryTitle: "Copy source code and paste it in components/ui folder",
      secondaryLanguage: "typescript",
      secondaryDescription: "components/ui/card-decorator.tsx",
    },
  },
  "logo-cloud-carousel": {
    component: LogoCloudCarouselDemo,
    codeMetadata: {
      title: "Logo Cloud Carousel",
      description:
        "Infinite CSS marquee of logos with hover pause, edge fade, dark-mode logos and a reduced-motion fallback.",
      keywords: ["React", "Logo Cloud", "Marquee", "CSS Animation"],
      language: "tsx",
      secondaryTitle: "Copy source code and paste it in components/ui folder",
      secondaryLanguage: "typescript",
      secondaryDescription: "components/ui/logo-cloud-carousel.tsx",
    },
  },
  "laptop-closes-on-scroll": {
    component: AnimatedLaptopDemo,
    codeMetadata: {
      title: "Laptop Closes on Scroll",
      description:
        "Scroll-driven laptop mockup whose lid closes as you scroll, with any content on its screen.",
      keywords: ["React", "Scroll Animation", "Device Mockup", "Motion"],
      language: "tsx",
      secondaryTitle: "Copy source code and paste it in components/ui folder",
      secondaryLanguage: "typescript",
      secondaryDescription: "components/ui/laptop-closes-on-scroll.tsx",
    },
  },
  "animated-smartwatch": {
    component: AnimatedSmartwatchDemo,
    codeMetadata: {
      title: "Animated Smartwatch",
      description:
        "Scroll-driven smartwatch mockup that rotates into view, with a live clock face or your own screen content.",
      keywords: ["React", "Scroll Animation", "Device Mockup", "Motion"],
      language: "tsx",
      secondaryTitle: "Copy source code and paste it in components/ui folder",
      secondaryLanguage: "typescript",
      secondaryDescription: "components/ui/animated-smartwatch.tsx",
    },
  },
  "animated-multi-select": {
    component: AnimatedMultiSelectDemo,
    codeMetadata: {
      title: "Animated Multi Select",
      description:
        "Searchable multi-select with animated chips, built on cmdk and Radix Popover with full keyboard support.",
      keywords: ["React", "Multi Select", "Combobox", "Form Control", "Accessible"],
      language: "tsx",
      secondaryTitle: "Copy the source code",
      secondaryLanguage: "typescript",
      secondaryDescription: "components/ui/animated-multi-select.tsx",
    },
  },
  "pricing-card": {
    component: PricingCardDemo,
    codeMetadata: {
      title: "Pricing Card",
      description:
        "Plan card with price, period, feature list, badge and a call to action.",
      keywords: ["React", "Pricing", "Card", "SaaS"],
      language: "tsx",
      secondaryTitle: "Copy source code and paste it in components/ui folder",
      secondaryLanguage: "typescript",
      secondaryDescription: "components/ui/pricing-card.tsx",
    },
  },
  "product-card": {
    component: ProductCardDemo,
    codeMetadata: {
      title: "Product Card",
      description:
        "E-commerce product card with color swatches, wishlist toggle, ratings and add-to-cart.",
      keywords: ["React", "Product Card", "E-commerce", "Accessible"],
      language: "tsx",
      secondaryTitle: "Copy source code and paste it in components/ui folder",
      secondaryLanguage: "typescript",
      secondaryDescription: "components/ui/product-card.tsx",
    },
  },
  "profile-card": {
    component: ProfileCardDemo,
    codeMetadata: {
      title: "Profile Card",
      description:
        "Social profile card with accent-tinted wave cover art, verified badge, controllable follow toggle, stats and link.",
      keywords: ["React", "Profile Card", "Social", "Follow Button", "Accessible"],
      language: "tsx",
      secondaryTitle: "Copy source code and paste it in components/ui folder",
      secondaryLanguage: "typescript",
      secondaryDescription: "components/ui/profile-card.tsx",
    },
  },
  "availability-card": {
    component: AvailabilityCardDemo,
    codeMetadata: {
      title: "Availability Card",
      description:
        "Hire-me card with a live availability pulse, local-time clock, tactile buttons and a copy-email confirmation.",
      keywords: ["React", "Availability Card", "Portfolio", "Copy to Clipboard", "Accessible"],
      language: "tsx",
      secondaryTitle: "Copy source code and paste it in components/ui folder",
      secondaryLanguage: "typescript",
      secondaryDescription: "components/ui/availability-card.tsx",
    },
  },
  "receipt-printer": {
    component: ReceiptPrinterDemo,
    codeMetadata: {
      title: "Receipt Printer",
      description:
        "Order card that prints a torn-edge receipt line by line, with itemised totals, a pay-by-QR slot and tear-off reset.",
      keywords: ["React", "Receipt", "Printer Animation", "Commerce UI", "Motion", "Accessible"],
      language: "tsx",
      secondaryTitle: "Copy source code and paste it in components/ui folder",
      secondaryLanguage: "typescript",
      secondaryDescription: "components/ui/receipt-printer.tsx",
    },
  },
  "reminders-card": {
    component: RemindersCardDemo,
    codeMetadata: {
      title: "Reminders Card",
      description:
        "Widget-style checklist with a glowing accent header, live clock, animated checkboxes and inline add.",
      keywords: ["React", "Reminders", "Checklist", "Todo", "Widget", "Accessible"],
      language: "tsx",
      secondaryTitle: "Copy source code and paste it in components/ui folder",
      secondaryLanguage: "typescript",
      secondaryDescription: "components/ui/reminders-card.tsx",
    },
  },
  "now-playing-card": {
    component: NowPlayingCardDemo,
    codeMetadata: {
      title: "Now Playing Card",
      description:
        "Music widget whose album art spins as a vinyl disc and morphs into the full cover on hover, with a live progress clock.",
      keywords: ["React", "Music Player", "Vinyl", "Morph", "Motion", "Accessible"],
      language: "tsx",
      secondaryTitle: "Copy source code and paste it in components/ui folder",
      secondaryLanguage: "typescript",
      secondaryDescription: "components/ui/now-playing-card.tsx",
    },
  },
  "arc-scroll-steps": {
    component: ArcScrollStepsDemo,
    codeMetadata: {
      title: "Arc Scroll Steps",
      description:
        "Scroll-driven stepper: numbered steps orbit a large arc and the active step's title swaps in as you scroll.",
      keywords: ["React", "Scroll Animation", "Stepper", "Snap Scrolling", "Motion", "Accessible"],
      language: "tsx",
      secondaryTitle: "Copy source code and paste it in components/ui folder",
      secondaryLanguage: "typescript",
      secondaryDescription: "components/ui/arc-scroll-steps.tsx",
    },
  },
  "team-carousel": {
    component: TeamCarouselDemo,
    codeMetadata: {
      title: "Team Carousel",
      description:
        "Infinite Embla carousel of team portraits that pauses on hover, lifts the hovered member and highlights their division.",
      keywords: ["React", "Embla Carousel", "Infinite Carousel", "Team Section", "Auto Scroll", "Accessible"],
      language: "tsx",
      secondaryTitle: "Copy source code and paste it in components/ui folder",
      secondaryLanguage: "typescript",
      secondaryDescription: "components/ui/team-carousel.tsx",
    },
  },
  "dock-gallery": {
    component: DockGalleryDemo,
    codeMetadata: {
      title: "Dock Gallery",
      description:
        "Bottom-aligned project row that magnifies like a dock: the card nearest the pointer grows and its neighbours step down.",
      keywords: ["React", "Dock", "Magnification", "Gallery", "Motion", "Accessible"],
      language: "tsx",
      secondaryTitle: "Copy source code and paste it in components/ui folder",
      secondaryLanguage: "typescript",
      secondaryDescription: "components/ui/dock-gallery.tsx",
    },
  },
  "bento-grid": {
    component: BentoGridDemo,
    codeMetadata: {
      title: "Bento Grid",
      description:
        "Animated bento feature grid: files flowing through an action, drifting category rows, a playable install and a copyable command.",
      keywords: ["React", "Bento Grid", "Features", "Marquee", "Tailwind", "Accessible"],
      language: "tsx",
      secondaryTitle: "Copy source code and paste it in components/ui folder",
      secondaryLanguage: "typescript",
      secondaryDescription: "components/ui/bento-grid.tsx",
    },
  },
  "showcase-bento": {
    component: ShowcaseBentoDemo,
    codeMetadata: {
      title: "Showcase Bento",
      description:
        "Animated showcase bento: hopping team portraits, a count-up stat, rotating testimonials and drifting framework and tech rows.",
      keywords: ["React", "Bento Grid", "Testimonials", "Counter", "Marquee", "Accessible"],
      language: "tsx",
      secondaryTitle: "Copy source code and paste it in components/ui folder",
      secondaryLanguage: "typescript",
      secondaryDescription: "components/ui/showcase-bento.tsx",
    },
  },
  "mission-bento": {
    component: MissionBentoDemo,
    codeMetadata: {
      title: "Mission Bento",
      description:
        "Stats bento with a masked heading reveal, staggered tiles, count-up numbers and a self-drawing trend arrow.",
      keywords: ["React", "Bento Grid", "Stats", "Counter", "Scroll Reveal", "Accessible"],
      language: "tsx",
      secondaryTitle: "Copy source code and paste it in components/ui folder",
      secondaryLanguage: "typescript",
      secondaryDescription: "components/ui/mission-bento.tsx",
    },
  },
  "hover-expand-gallery": {
    component: HoverExpandGalleryDemo,
    codeMetadata: {
      title: "Hover Expand Gallery",
      description:
        "Row of image panels where the hovered one expands and reveals its label while the rest narrow; tap and arrow keys work too.",
      keywords: ["React", "Image Gallery", "Accordion", "Hover Effect", "Tailwind", "Accessible"],
      language: "tsx",
      secondaryTitle: "Copy source code and paste it in components/ui folder",
      secondaryLanguage: "typescript",
      secondaryDescription: "components/ui/hover-expand-gallery.tsx",
    },
  },
  "case-study-carousel": {
    component: CaseStudyCarouselDemo,
    codeMetadata: {
      title: "Case Study Carousel",
      description:
        "Stacked case-study carousel: the active card leads while neighbours peek behind, with arrows, dots, swipe and keyboard.",
      keywords: ["React", "Carousel", "Case Studies", "Portfolio", "Motion", "Accessible"],
      language: "tsx",
      secondaryTitle: "Copy source code and paste it in components/ui folder",
      secondaryLanguage: "typescript",
      secondaryDescription: "components/ui/case-study-carousel.tsx",
    },
  },
  "fuzzy-mascot": {
    component: FuzzyMascotDemo,
    codeMetadata: {
      title: "Fuzzy Mascot",
      description:
        "Plush SVG mascots in 15 shapes whose eyes follow the cursor, with idle, working and sleeping states, five shadings, hats, glasses and fur length.",
      keywords: ["React", "Mascot", "Character", "Eye Tracking", "SVG Filters", "Fuzzy"],
      language: "tsx",
      secondaryTitle: "Copy source code and paste it in components/ui folder",
      secondaryLanguage: "typescript",
      secondaryDescription: "components/ui/fuzzy-mascot.tsx",
    },
  },
};
