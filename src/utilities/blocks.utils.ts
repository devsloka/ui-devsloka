// Import other block demos as needed

import FooterBlock from "@/components/blocks/footer-block";
import HeroSectionBlock from "@/components/blocks/hero-section";
import PricingBlock from "@/components/blocks/pricing-block";
import TestimonialsBlock from "@/components/blocks/testimonials-block";

export type BlockMeta = {
  block: React.FC;
  name: string;
  title: string;
  description: string;
  imageUrl: string;
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

export const blocks: Record<string, BlockMeta> = {
  "pricing-block": {
    block: PricingBlock,
    name: "pricing-block",
    title: "Pricing Block",
    description: "A customizable pricing component for your application.",
    imageUrl: "https://yourwebsite.com/images/pricing-block.jpg",
    codeMetadata: {
      title: "Pricing Block",
      description: "A block to display various pricing plans.",
      keywords: ["pricing", "plans", "subscriptions"],
      language: "tsx",
      dependencies: "npm i @radix-ui/react-toggle",
      secondaryCode: "pricing-data.ts",
      secondaryTitle: "Pricing Data Structure",
      secondaryLanguage: "typescript",
      secondaryDescription: "Type definitions for pricing plans data",
    },
  },
  "hero-section": {
    block: HeroSectionBlock,
    name: "Hero Section",
    title: "Pricing Block",
    description: "A customizable pricing component for your application.",
    imageUrl: "https://yourwebsite.com/images/pricing-block.jpg",
    codeMetadata: {
      title: "Pricing Block",
      description: "A block to display various pricing plans.",
      keywords: ["pricing", "plans", "subscriptions"],
      language: "tsx",
      dependencies: "npm i @radix-ui/react-toggle",
      secondaryCode: "pricing-data.ts",
      secondaryTitle: "Pricing Data Structure",
      secondaryLanguage: "typescript",
      secondaryDescription: "Type definitions for pricing plans data",
    },
  },
  "testimonials-block": {
    block: TestimonialsBlock,
    name: "Hero Section",
    title: "Pricing Block",
    description: "A customizable pricing component for your application.",
    imageUrl: "https://yourwebsite.com/images/pricing-block.jpg",
    codeMetadata: {
      title: "Pricing Block",
      description: "A block to display various pricing plans.",
      keywords: ["pricing", "plans", "subscriptions"],
      language: "tsx",
      dependencies: "npm i @radix-ui/react-toggle",
      secondaryCode: "pricing-data.ts",
      secondaryTitle: "Pricing Data Structure",
      secondaryLanguage: "typescript",
      secondaryDescription: "Type definitions for pricing plans data",
    },
  },
  "footer-block": {
    block: FooterBlock,
    name: "Hero Section",
    title: "Pricing Block",
    description: "A customizable pricing component for your application.",
    imageUrl: "https://yourwebsite.com/images/pricing-block.jpg",
    codeMetadata: {
      title: "Pricing Block",
      description: "A block to display various pricing plans.",
      keywords: ["pricing", "plans", "subscriptions"],
      language: "tsx",
      dependencies: "npm i @radix-ui/react-toggle",
      secondaryCode: "pricing-data.ts",
      secondaryTitle: "Pricing Data Structure",
      secondaryLanguage: "typescript",
      secondaryDescription: "Type definitions for pricing plans data",
    },
  },
  // Additional blocks would follow the same structure:
  /*
  "feature-block": {
    block: FeatureBlockDemo,
    name: "feature-block",
    title: "Feature Block",
    description: "Showcase product features in a grid layout.",
    imageUrl: "https://yourwebsite.com/images/feature-block.jpg",
    codeMetadata: {
      description: "Responsive feature grid with icons.",
      keywords: ["features", "grid", "product"],
      language: "tsx"
    }
  }
  */
};
