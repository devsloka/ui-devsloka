import ContactBlock from "@/components/blocks/contact-block";
import FAQsBlock from "@/components/blocks/faqs-block";
import FeaturesBlock from "@/components/blocks/features-block";
import FooterBlock from "@/components/blocks/footer-block";
import HeroSectionBlock from "@/components/blocks/hero-section";
import { NewsletterBlock } from "@/components/blocks/newsletter-block";
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
    title: "Hero Section",
    description: "A customizable pricing component for your application.",
    imageUrl: "https://yourwebsite.com/images/pricing-block.jpg",
    codeMetadata: {
      title: "Hero Section",
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
    name: "Testimonials Section",
    title: "Testimonials Block",
    description: "A customizable pricing component for your application.",
    imageUrl: "https://yourwebsite.com/images/pricing-block.jpg",
    codeMetadata: {
      title: "Testimonials Block",
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
    name: "Footer Section",
    title: "Footer Block",
    description: "A customizable pricing component for your application.",
    imageUrl: "https://yourwebsite.com/images/pricing-block.jpg",
    codeMetadata: {
      title: "Footer Block",
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
  "faq-block": {
    block: FAQsBlock,
    name: "FAQ Section",
    title: "FAQs Block",
    description: "A customizable pricing component for your application.",
    imageUrl: "https://yourwebsite.com/images/pricing-block.jpg",
    codeMetadata: {
      title: "FAQs Block",
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
  "contact-block": {
    block: ContactBlock,
    name: "Contact Section",
    title: "Contact Block",
    description: "A customizable pricing component for your application.",
    imageUrl: "https://yourwebsite.com/images/pricing-block.jpg",
    codeMetadata: {
      title: "Contact Block",
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
  "features-block": {
    block: FeaturesBlock,
    name: "Features Section",
    title: "Features Block",
    description: "A customizable pricing component for your application.",
    imageUrl: "https://yourwebsite.com/images/pricing-block.jpg",
    codeMetadata: {
      title: "Features Block",
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
  "newsletter-block": {
    block: NewsletterBlock,
    name: "Newsletter Section",
    title: "Newsletter Block",
    description: "A customizable pricing component for your application.",
    imageUrl: "https://yourwebsite.com/images/pricing-block.jpg",
    codeMetadata: {
      title: "Newsletter Block",
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
};
