import BudgetSlider from "@/components/devsloka-components/budget-slider";
import { ExpandingCards } from "@/components/devsloka-components/expanding-cards";
import ShowcaseSlider from "@/components/devsloka-components/showcase-slider";
import TourDemo from "@/components/devsloka-components/demo/tour-demo";
import FloatingDotsDemo from "@/components/devsloka-components/demo/floating-dots-demo";
import AirbnbListingCardExample from "@/components/devsloka-components/demo/airbnb-card-demo";
import MorphingNav from "@/components/devsloka-components/morphing-nav";
import MorphingModal from "@/components/devsloka-components/morphing-modal";
import ExpandableCard from "@/components/devsloka-components/morphing-card";
import SuccessResult from "@/components/devsloka-components/success-result";
import ErrorResult from "@/components/devsloka-components/error-result";
import EmptyResult from "@/components/devsloka-components/empty-result";

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
  "budget-slider": {
    component: BudgetSlider,
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
        "Accessible",
        "TypeScript",
      ],
      language: "tsx",
      dependencies: "npm i motion clsx tailwind-merge",
    },
  },
  "expanding-cards": {
    component: ExpandingCards,
    codeMetadata: {
      title: "Animated Content Cards",
      description:
        "Collapsible card stack with spring physics animations. Implements smooth height transitions and click-activated content expansion.",
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
      dependencies: "npm i motion tailwind-merge",
    },
  },
  "showcase-slider": {
    component: ShowcaseSlider,
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
        "Keyboard Nav",
        "ARIA-compliant",
      ],
      language: "tsx",
      dependencies: "npm i motion @floating-ui/react",
      secondaryTitle: "Tour Controller",
      secondaryDescription:
        "State management and transition logic for tour sequences",
    },
  },
  "floating-dots": {
    component: FloatingDotsDemo,
    codeMetadata: {
      title: "Animated Particle Background",
      description:
        "Procedural floating dots animation with mouse interaction. Features velocity controls and canvas-based rendering.",
      keywords: [
        "React",
        "Canvas",
        "Particles",
        "Background Effect",
        "Physics Animation",
        "60 FPS",
        "GPU-optimized",
      ],
      language: "tsx",
      dependencies: "npm i motion",
    },
  },
  "airbnb-card": {
    component: AirbnbListingCardExample,
    codeMetadata: {
      title: "Property Listing Card",
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
      dependencies: "npm i motion @tabler/icons-react",
    },
  },
  "morphing-nav": {
    component: MorphingNav,
    codeMetadata: {
      title: "Animated Navigation Bar",
      description:
        "Shape-shifting menu with seamless icon transitions. Implements path morphing animations and adaptive mobile layout.",
      keywords: [
        "React",
        "SVG Morphing",
        "Responsive Nav",
        "Menu Animation",
        "UI/UX",
        "SVG Animations",
        "Mobile-first",
      ],
      language: "tsx",
      dependencies: "npm i motion",
    },
  },
  "morphing-modal": {
    component: MorphingModal,
    codeMetadata: {
      title: "Transformative Dialog",
      description:
        "Context-aware modal that morphs from trigger elements. Features shared element transitions and adaptive positioning.",
      keywords: [
        "React",
        "Modal",
        "Transition Animation",
        "Floating UI",
        "Overlay",
        "Portals",
        "Focus Trap",
      ],
      language: "tsx",
      dependencies: "npm i motion @floating-ui/react",
    },
  },
  "morphing-card": {
    component: ExpandableCard,
    codeMetadata: {
      title: "Expandable Content Card",
      description:
        "Toggleable card component with smooth layout transitions. Implements compound component pattern and ARIA expansion controls.",
      keywords: [
        "React",
        "Accordion",
        "Content Toggle",
        "Layout Animation",
        "Accessibility",
        "WCAG 2.1",
        "Compound Components",
      ],
      language: "tsx",
      dependencies: "npm i motion",
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
    },
  },
};
