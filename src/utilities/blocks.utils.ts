import ContactBlock from "@/components/blocks/contact-block";
import FAQsBlock from "@/components/blocks/faqs-block";
import FeaturesBlock from "@/components/blocks/features-block";
import { FloatingFeatureShowcase } from "@/components/blocks/feature-floating-showcase";
import { FloatingFooter } from "@/components/blocks/floating-footer";
import FooterBlock from "@/components/blocks/footer-block";
import { GridFooter } from "@/components/blocks/grid-footer";
import HeroFloatingElements from "@/components/blocks/hero-floating-elements";
import HeroGradientMesh from "@/components/blocks/hero-gradient-mesh";
import HeroSectionBlock from "@/components/blocks/hero-section";
import HeroSplitReveal from "@/components/blocks/hero-split-reveal";
import { NewsletterBlock } from "@/components/blocks/newsletter-block";
import PricingBlock from "@/components/blocks/pricing-block";
import TestimonialsBlock from "@/components/blocks/testimonials-block";
import { WaveFooter } from "@/components/blocks/wave-footer";
import { FeatureInteractiveCards } from "@/components/blocks/feature-interactive-cards";
import { FAQBlockTwo } from "@/components/blocks/faq-block-two";
import FeaturesBlockFour from "@/components/blocks/features-block-four";

export type CodeFile = {
  codePath: string;
  title: string;
  language: string;
  description?: string;
  hasPreview?: boolean;
  block?: React.FC;
};

export type BlockMeta = {
  block: React.FC;
  name: string;
  title: string;
  description: string;
  imageUrl: string;
  codeMetadata: {
    mainFile: CodeFile;
    relatedFiles?: CodeFile[];
    keywords: string[];
    dependencies?: string;
  };
};

export const blocks: Record<string, BlockMeta> = {
  "pricing-block": {
    block: PricingBlock,
    name: "pricing-block",
    title: "Pricing Section",
    description: "Interactive pricing component with multiple plans",
    imageUrl: "https://yourwebsite.com/images/pricing-block.jpg",
    codeMetadata: {
      mainFile: {
        codePath: "pricing-block.tsx",
        title: "Pricing Component",
        language: "tsx",
        hasPreview: true,
      },
      keywords: ["pricing", "plans", "subscriptions"],
      dependencies: "npm i @radix-ui/react-toggle",
    },
  },
  "hero-section": {
    block: HeroSectionBlock,
    name: "hero-section",
    title: "Hero Section",
    description: "Responsive hero section with call-to-action",
    imageUrl: "https://yourwebsite.com/images/hero-section.jpg",
    codeMetadata: {
      mainFile: {
        codePath: "hero-section.tsx",
        title: "Hero Component",
        language: "tsx",
        hasPreview: true,
      },
      relatedFiles: [
        {
          codePath: "hero-split-reveal.tsx",
          title: "Hero Split Reveal",
          language: "typescript",
          block: HeroSplitReveal,
        },
        {
          codePath: "hero-floating-elements.tsx",
          title: "Hero Floating ",
          language: "typescript",
          block: HeroFloatingElements,
        },
        {
          codePath: "hero-gradient-mesh.tsx",
          title: "Hero Gradient Mesh",
          language: "typescript",
          block: HeroGradientMesh,
        },
      ],
      keywords: ["hero", "cta", "banner"],
      dependencies: "npm i @radix-ui/react-dialog",
    },
  },
  "testimonials-block": {
    block: TestimonialsBlock,
    name: "testimonials-block",
    title: "Testimonials Section",
    description: "Customer review and testimonial showcase",
    imageUrl: "https://yourwebsite.com/images/testimonials-block.jpg",
    codeMetadata: {
      mainFile: {
        codePath: "testimonials-block.tsx",
        title: "Testimonials Component",
        language: "tsx",
        hasPreview: true,
      },
      keywords: ["reviews", "testimonials", "feedback"],
      dependencies: "npm i lucide-react",
    },
  },
  "footer-block": {
    block: FooterBlock,
    name: "footer-block",
    title: "Website Footer",
    description: "Complete website footer with navigation links",
    imageUrl: "https://yourwebsite.com/images/footer-block.jpg",
    codeMetadata: {
      mainFile: {
        codePath: "footer-block.tsx",
        title: "Footer Component",
        language: "tsx",
        hasPreview: true,
      },
      relatedFiles: [
        {
          codePath: "wave-footer.tsx",
          title: "Wave Footer Data",
          language: "typescript",
          block: WaveFooter,
        },
        {
          codePath: "grid-footer.tsx",
          title: "Grid Footer",
          language: "typescript",
          block: GridFooter,
        },
        {
          codePath: "floating-footer.tsx",
          title: "Floating Footer",
          language: "typescript",
          block: FloatingFooter,
        },
      ],
      keywords: ["footer", "navigation", "links"],
    },
  },
  "faq-block": {
    block: FAQsBlock,
    name: "faq-block",
    title: "FAQ Section",
    description: "Expandable frequently asked questions section",
    imageUrl: "https://yourwebsite.com/images/faq-block.jpg",
    codeMetadata: {
      mainFile: {
        codePath: "faqs-block.tsx",
        title: "FAQ Component",
        language: "tsx",
        hasPreview: true,
      },
      relatedFiles: [
        {
          codePath: "faq-block-two.tsx",
          title: "FAQ Item",
          language: "typescript",
          block: FAQBlockTwo,
        },
      ],
      keywords: ["faq", "questions", "accordion"],
      dependencies: "npm i @radix-ui/react-accordion",
    },
  },
  "contact-block": {
    block: ContactBlock,
    name: "contact-block",
    title: "Contact Form",
    description: "Interactive contact form with validation",
    imageUrl: "https://yourwebsite.com/images/contact-block.jpg",
    codeMetadata: {
      mainFile: {
        codePath: "contact-block.tsx",
        title: "Contact Component",
        language: "tsx",
        hasPreview: true,
      },
      relatedFiles: [
        {
          codePath: "contact-schema.ts",
          title: "Validation Schema",
          language: "typescript",
        },
      ],
      keywords: ["contact", "form", "validation"],
      dependencies: "npm i react-hook-form zod",
    },
  },
  "features-block": {
    block: FeaturesBlock,
    name: "features-block",
    title: "Features Grid",
    description: "Feature showcase with icon grid layout",
    imageUrl: "https://yourwebsite.com/images/features-block.jpg",
    codeMetadata: {
      mainFile: {
        codePath: "features-block.tsx",
        title: "Features Component",
        language: "tsx",
        hasPreview: true,
      },
      relatedFiles: [
        {
          codePath: "floating-feature-showcase.tsx",
          title: "Floating Feature Showcase",
          language: "typescript",
          block: FloatingFeatureShowcase,
        },
        {
          codePath: "feature-interactive-cards.tsx",
          title: "Floating Feature Showcase",
          language: "typescript",
          block: FeatureInteractiveCards,
        },
        {
          codePath: "features-block-four.tsx",
          title: "Floating Feature Showcase",
          language: "typescript",
          block: FeaturesBlockFour,
        },
      ],
      keywords: ["features", "grid", "icons"],
    },
  },
  "newsletter-block": {
    block: NewsletterBlock,
    name: "newsletter-block",
    title: "Newsletter Signup",
    description: "Email newsletter subscription form",
    imageUrl: "https://yourwebsite.com/images/newsletter-block.jpg",
    codeMetadata: {
      mainFile: {
        codePath: "newsletter-block.tsx",
        title: "Newsletter Component",
        language: "tsx",
        hasPreview: true,
      },
      keywords: ["newsletter", "email", "subscription"],
      dependencies: "npm i react-email",
    },
  },
};
