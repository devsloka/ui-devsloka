import BudgetSlider from "@/components/devsloka-components/budget-slider";
import { ExpandingCards } from "@/components/devsloka-components/expanding-cards";
import ShowcaseSlider from "@/components/devsloka-components/showcase-slider";
import TourDemo from "@/components/devsloka-components/tour-demo";
import { getComponentCode } from "./getComponentCode";
import FloatingDotsDemo from "@/components/devsloka-components/floating-dots-demo";
import AirbnbListingCardExample from "@/components/devsloka-components/airbnb-card-demo";

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
      title: "Budget Slider Component",
      description:
        "Interactive slider for budget range selection with dynamic visual feedback",
      keywords: ["React", "Slider", "Input", "Budget Control"],
      language: "tsx",
      dependencies: "npm i motion clsx tailwind-merge @tabler/icons-react cobe",
    },
  },
  "expanding-cards": {
    component: ExpandingCards,
    codeMetadata: {
      title: "Expanding Cards Component",
      description:
        "Interactive cards that expand on hover with smooth animations",
      keywords: ["React", "Animation", "UI Cards", "Hover Effects"],
      language: "tsx",
      dependencies: "npm i motion clsx tailwind-merge @tabler/icons-react cobe",
    },
  },
  "showcase-slider": {
    component: ShowcaseSlider,
    codeMetadata: {
      title: "Showcase Slider Component",
      description:
        "Responsive image slider with touch support and transition effects",
      keywords: ["React", "Carousel", "Slider", "Image Gallery"],
      language: "tsx",
      dependencies: "npm i motion clsx tailwind-merge @tabler/icons-react cobe",
    },
  },
  tour: {
    component: TourDemo,
    codeMetadata: {
      title: "Tour",
      description:
        "Interactive tour component to guide users through your application",
      keywords: ["React", "Tour", "Guide", "User Experience"],
      language: "tsx",
      dependencies: "npm i motion",
      secondaryCode: getComponentCode(
        "src/components/devsloka-components/tour.tsx"
      ),
      secondaryTitle: "Tour Component",
      secondaryLanguage: "tsx",
      secondaryDescription: "The tour component itself",
    },
  },
  "floating-dots": {
    component: FloatingDotsDemo,
    codeMetadata: {
      title: "Floating Dots",
      description:
        "Interactive tour component to guide users through your application",
      keywords: ["React", "Tour", "Guide", "User Experience"],
      language: "tsx",
      dependencies: "npm i motion",
    },
  },
  "airbnb-card": {
    component: AirbnbListingCardExample,
    codeMetadata: {
      title: "Airbnb Card",
      description:
        "Interactive tour component to guide users through your application",
      keywords: ["React", "Tour", "Guide", "User Experience"],
      language: "tsx",
      dependencies: "npm i motion",
    },
  },
};
