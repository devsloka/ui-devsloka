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
import EmptyResult from "@/components/ui/empty-result";
import ErrorResult from "@/components/ui/error-result";
import SuccessResult from "@/components/ui/success-result";
import AnimatedMultiSelectDemo from "@/components/devsloka-components/demo/animated-multi-select-demo";
import ImageGalleryDemo from "@/components/devsloka-components/demo/animated-image-gallery-demo";
import AnimatedSmartwatchDemo from "@/components/devsloka-components/demo/animated-smartwatch-demo";
import PricingCardDemo from "@/components/devsloka-components/demo/pricing-card-demo";
import { ProductCardDemo } from "@/components/devsloka-components/demo/product-card-demo";

export type ComponentMeta = {
  component: React.FC;
  codeMetadata: {
    title: string;
    description: string;
    keywords: string[];
    language: string;
    dependencies?: string;
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
      title: "Airbnb Card",
      description:
        "Adaptive rental listing component with image gallery, rating system, and price formatting. Implements favoriting logic and hover states.",
      keywords: [
        "React",
        "Property Showcase",
        "Image Carousel",
        "Rating System",
        "Commerce UI",
        "Commerce-ready",
        "Responsive",
      ],
      language: "tsx",
      dependencies:
        "npm i lucide-react clsx tailwind-merge shadcn@latest add badge",
      secondaryCode: "property-data.ts",
      secondaryTitle: "Airbnb Card",
      secondaryLanguage: "typescript",
      secondaryDescription:
        "Create a file named airbnb-card.tsx  under the ui folder and use it in your project",
    },
  },
  "content-carousel": {
    component: ContentCarouselDemo,
    codeMetadata: {
      title: "Full-width Image Carousel",
      description:
        "Touch-enabled gallery slider with lazy loading and adaptive breakpoints. Supports drag navigation and custom transition easing.",
      keywords: [
        "React",
        "Carousel",
        "Responsive",
        "Touch Gestures",
        "Image Optimization",
        "Mobile-friendly",
        "SWR Integration",
      ],
      language: "tsx",
      dependencies: "npm i motion clsx cobe",
      secondaryCode: "carousel-hooks.ts",
      secondaryTitle: "Carousel Navigation Logic",
      secondaryLanguage: "typescript",
      secondaryDescription:
        "Custom hooks for carousel navigation and touch gesture handling",
    },
  },
  "empty-result": {
    component: EmptyResult,
    codeMetadata: {
      title: "Zero-state Illustration",
      description:
        "Empty content state with configurable illustrations and action prompts. Supports dynamic theming and SVG customization.",
      keywords: [
        "React",
        "Empty State",
        "Zero Data",
        "Illustration System",
        "User Guidance",
        "Customizable SVG",
        "Theming",
      ],
      language: "tsx",
      dependencies: "npm i motion @lottiefiles/dotlottie-react",
      secondaryCode: "empty-states-config.ts",
      secondaryTitle: "Empty State Configurations",
      secondaryLanguage: "typescript",
      secondaryDescription:
        "Configuration objects for different empty state scenarios",
    },
  },
  "error-result": {
    component: ErrorResult,
    codeMetadata: {
      title: "Error Feedback Screen",
      description:
        "Interactive error display with recovery options and diagnostic logging. Implements error boundary integration and retry mechanisms.",
      keywords: [
        "React",
        "Error Handling",
        "User Feedback",
        "Error Boundaries",
        "Recovery UI",
        "Error Logging",
        "Analytics",
      ],
      language: "tsx",
      dependencies: "npm i motion @lottiefiles/dotlottie-react",
      secondaryCode: "error-codes.ts",
      secondaryTitle: "Error Code Definitions",
      secondaryLanguage: "typescript",
      secondaryDescription:
        "Standardized error codes and their metadata for consistent error handling",
    },
  },
  "expanding-cards": {
    component: ExpandingCardsDemo,
    codeMetadata: {
      title: "Expandable Cards",
      description: "Expandable card component with smooth transitions effects.",
      keywords: [
        "React",
        "Spring Animation",
        "UI Cards",
        "Content Reveal",
        "Framer Motion",
        "CSS Transitions",
        "Responsive",
      ],
      language: "tsx",
      dependencies: "npm i motion tailwind-merge lucide-react",
      secondaryCode: "card-content.ts",
      secondaryTitle: "Copy source code and paste it in components/ui folder",
      secondaryLanguage: "typescript",
      secondaryDescription: "components/ui/expanding-cards.tsx",
    },
  },
  "floating-dots": {
    component: FloatingDotsDemo,
    codeMetadata: {
      title: "Floating Dots Background",
      description:
        "Interactive background animation with where floating dots are moving bottom to top.",
      keywords: ["React", "Canvas", "Particles", "Background Effect"],
      language: "tsx",
      secondaryCode: "particle-config.ts",
      secondaryTitle: "Copy source code and paste it in components/ui folder",
      secondaryLanguage: "typescript",
      secondaryDescription: "components/ui/floating-dots.tsx",
    },
  },
  "morphing-card": {
    component: MorphingCardDemo,
    codeMetadata: {
      title: "Morphing Card",
      description: "Toggleable card component with smooth layout transitions.",
      keywords: ["React", "Content Toggle", "Layout Animation"],
      language: "tsx",
      dependencies:
        "npm i motion lucide-react clsx tailwind-merge shadcn@latest add button",
      secondaryCode: "morphing-transitions.ts",
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
        "Context-aware modal that morphs from trigger elements. Features shared element transitions and adaptive positioning.",
      keywords: ["React", "Modal", "Transition Animation", "Overlay"],
      language: "tsx",
      dependencies: "npm i motion @floating-ui/react",
      secondaryCode: "modal-context.ts",
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
        "Shape-shifting menu with seamless icon transitions. Implements path morphing animations and adaptive mobile layout.",
      keywords: [
        "React",
        "SVG Morphing",
        "Responsive Nav",
        "Menu Animation",
        "UI/UX",
      ],
      language: "tsx",
      dependencies: "npm i motion clsx tailwind-merge lucide-react",
      secondaryCode: "nav-items.ts",
      secondaryTitle: "Copy source code and paste it in components/ui folder",
      secondaryLanguage: "typescript",
      secondaryDescription: "components/ui/morphing-nav.tsx",
    },
  },
  "range-slider-with-histogram": {
    component: RangeSliderWithHistogramDemo,
    codeMetadata: {
      title: "Budget Range Slider",
      description:
        "Dual-thumb slider with currency formatting and live range updates. Features dynamic value labels and accessible keyboard controls.",
      keywords: [
        "React",
        "Range Slider",
        "Form Control",
        "Financial Input",
        "TSX",
        "Interactive",
        "TypeScript",
      ],
      language: "tsx",
      dependencies:
        "npm i motion clsx tailwind-merge lucide-react shadcn@latest add slider card tooltip",
      secondaryCode: "histogram-data.ts",
      secondaryTitle: "Copy source code and paste it in components/ui folder",
      secondaryLanguage: "typescript",
      secondaryDescription: "components/ui/range-slider-with-histogram.tsx",
    },
  },
  "success-result": {
    component: SuccessResult,
    codeMetadata: {
      title: "Animated Confirmation",
      description:
        "Payment success state with Lottie animation integration. Features auto-redirect timing and printable receipt layout.",
      keywords: [
        "React",
        "Lottie",
        "Success State",
        "E-commerce",
        "Payment Flow",
        "SVG Animations",
        "i18n Ready",
      ],
      language: "tsx",
      dependencies: "npm i motion @lottiefiles/dotlottie-react",
      secondaryCode: "receipt-generator.ts",
      secondaryTitle: "Copy source code and paste it in components/ui folder",
      secondaryLanguage: "typescript",
      secondaryDescription: "components/ui/success-result-with-receipt.tsx",
    },
  },
  tour: {
    component: TourDemo,
    codeMetadata: {
      title: "Interactive Product Tour",
      description:
        "Step-by-step user onboarding system with spotlight effects and tooltip positioning. Supports async step transitions and event hooks.",
      keywords: [
        "React",
        "User Onboarding",
        "Guided Tour",
        "Accessibility",
        "Focus Management",
      ],
      language: "tsx",
      dependencies:
        "npm i motion clsx tailwind-merge lucide-react shadcn@latest add card button",
      secondaryTitle: "Copy source code and paste it in components/ui folder",
      secondaryLanguage: "typescript",
      secondaryDescription: "components/ui/tour.tsx",
    },
  },
  "text-effect": {
    component: TextEffectDemo,
    codeMetadata: {
      title: "Text Effect",
      description: "Text animation with custom shapes and color palettes.",
      keywords: [
        "React",
        "Text Animation",
        "SVG Morphing",
        "UI/UX",
        "Interactive",
        "Motion",
      ],
      language: "tsx",
      dependencies: "npm i motion clsx tailwind-merge",
      secondaryTitle: "Copy source code and paste it in components/ui folder",
      secondaryLanguage: "typescript",
      secondaryDescription: "components/ui/text-effect.tsx",
    },
  },
  "border-gradient-icon": {
    component: BorderGradientIconDemo,
    codeMetadata: {
      title: "Border Gradient Icon",
      description: "Border gradient icon with hover effects.",
      keywords: ["React", "Border Gradient", "Icon Animation"],
      language: "tsx",
      dependencies: "npm i lucide-react",
      secondaryTitle: "Copy source code and paste it in components/ui folder",
      secondaryLanguage: "typescript",
      secondaryDescription: "components/ui/border-gradient-icon.tsx",
    },
  },
  "gradient-text": {
    component: GradientTextDemo,
    codeMetadata: {
      title: "Gradient Text Demo",
      description: "Text animation with custom shapes and color palettes.",
      keywords: ["React", "Text Animation", "Gradient Text Animation"],
      language: "tsx",
      dependencies: "npm i motion",
      secondaryTitle: "Copy source code and paste it in components/ui folder",
      secondaryLanguage: "typescript",
      secondaryDescription: "components/ui/gradient-text.tsx",
    },
  },
  "animated-image-gallery": {
    component: ImageGalleryDemo,
    codeMetadata: {
      title: "Scroll Effect Image Gallery",
      description:
        "Dynamic image gallery with smooth scroll animations and accessibility features. Scroll down to see the animations in action.",
      keywords: [
        "React",
        "Image Gallery",
        "Smooth Scroll",
        "Accessibility",
        "Focus Management",
        "Keyboard Nav",
        "ARIA-compliant",
      ],
      language: "tsx",
      dependencies: "npx shadcn@latest init",
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
        "Tabs switcher shows active tab effect and acording to selected tab it shows content",
      keywords: ["React", "Tabs", "Tab Switcher"],
      language: "tsx",
      dependencies: "npm i motion clsx tailwind-merge",
      secondaryCode: "tour-steps.ts",
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
        "Card radio shows active card effect and acording to selected card it shows content",
      keywords: ["React", "Card Radio"],
      language: "tsx",
      dependencies: "npm i motion lucide-react ",
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
        "Icon radio shows active card effect and acording to selected icon it shows content",
      keywords: ["React", "Icon", "Icon Radio"],
      language: "tsx",
      dependencies: "npm i motion lucide-react ",
      secondaryTitle: "Copy source code and paste it in components/ui folder",
      secondaryLanguage: "typescript",
      secondaryDescription: "components/ui/icon-radio.tsx",
    },
  },
  "card-decorator": {
    component: CardDecoratorDemo,
    codeMetadata: {
      title: "Card Decorator",
      description: "Card decorator Add add a decorative element to your card.",
      keywords: ["React", "Card", "Decorator"],
      language: "tsx",
      dependencies: "npm i motion clsx tailwind-merge class-variance-authority",
      secondaryTitle: "Copy source code and paste it in components/ui folder",
      secondaryLanguage: "typescript",
      secondaryDescription: "components/ui/card-decorator.tsx",
    },
  },
  "logo-cloud-carousel": {
    component: LogoCloudCarouselDemo,
    codeMetadata: {
      title: "Logo Cloud Carousel",
      description: "Logo Cloud Carousel",
      keywords: ["React", "Logo Cloud", "Infinite Scroll"],
      language: "tsx",
      dependencies: "npm i motion next-themes",
      secondaryTitle: "Copy source code and paste it in components/ui folder",
      secondaryLanguage: "typescript",
      secondaryDescription: "components/ui/logo-cloud-carousel.tsx",
    },
  },
  "laptop-closes-on-scroll": {
    component: AnimatedLaptopDemo,
    codeMetadata: {
      title: "Laptop Closes on Scroll",
      description: "Animated laptop that closes on scroll",
      keywords: [
        "React",
        "Smooth Scroll",
        "Accessibility",
        "Focus Management",
        "Keyboard Nav",
        "ARIA-compliant",
        "Animated Laptop",
      ],
      language: "tsx",
      dependencies: "npm i motion",
      secondaryTitle: "Copy source code and paste it in components/ui folder",
      secondaryLanguage: "typescript",
      secondaryDescription: "components/ui/laptop-closes-on-scroll.tsx",
    },
  },
  "animated-smartwatch": {
    component: AnimatedSmartwatchDemo,
    codeMetadata: {
      title: "Animated Smartwatch",
      description: "Animated smartwatch that closes on scroll",
      keywords: [
        "React",
        "Smooth Scroll",
        "Accessibility",
        "Focus Management",
        "Keyboard Nav",
        "ARIA-compliant",
        "Animated Smartwatch",
      ],
      language: "tsx",
      dependencies: "npm i framer-motion",
      secondaryTitle: "Copy source code and paste it in components/ui folder",
      secondaryLanguage: "typescript",
      secondaryDescription: "components/ui/animated-smartwatch.tsx",
    },
  },
  "animated-multi-select": {
    component: AnimatedMultiSelectDemo,
    codeMetadata: {
      title: "Animated Multi-Select",
      description:
        "Search and select multiple options with animations. Features keyboard navigation and accessibility support.",
      keywords: [
        "React",
        "Multi-Select",
        "Animated",
        "Accessibility",
        "Keyboard Nav",
        "ARIA-compliant",
      ],
      language: "tsx",
      dependencies: "npm i framer-motion lucide-react",
      secondaryTitle: "Copy the source code",
      secondaryLanguage: "typescript",
      secondaryDescription: "components/ui/animated-multi-select.tsx",
    },
  },
  "pricing-card": {
    component: PricingCardDemo,
    codeMetadata: {
      title: "Pricing Card",
      description: "Pricing Card",
      keywords: ["React", "Pricing", "Card"],
      language: "tsx",
      dependencies: "npm i motion lucide-react",
      secondaryTitle: "Copy source code and paste it in components/ui folder",
      secondaryLanguage: "typescript",
      secondaryDescription: "components/ui/pricing-card.tsx",
    },
  },
  "product-card": {
    component: ProductCardDemo,
    codeMetadata: {
      title: "Product Card",
      description: "Product Card",
      keywords: ["React", "Product", "Card"],
      language: "tsx",
      dependencies:
        "npm i motion lucide-react; npx shadcn@latest add button card badge",
      secondaryTitle: "Copy source code and paste it in components/ui folder",
      secondaryLanguage: "typescript",
      secondaryDescription: "components/ui/product-card.tsx",
    },
  },
};
