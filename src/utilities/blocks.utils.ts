import ContactBlock from "@/registry/blocks/contact-block";
import FAQsBlock from "@/registry/blocks/faqs-block";
import FeaturesBlock from "@/registry/blocks/features-block";
import { FloatingFeatureShowcase } from "@/registry/blocks/feature-floating-showcase";
import { FloatingFooter } from "@/registry/blocks/floating-footer";
import FooterBlock from "@/registry/blocks/footer-block";
import { GridFooter } from "@/registry/blocks/grid-footer";
import HeroFloatingElements from "@/registry/blocks/hero-floating-elements";
import HeroGradientMesh from "@/registry/blocks/hero-gradient-mesh";
import HeroSectionBlock from "@/registry/blocks/hero-section";
import HeroSplitReveal from "@/registry/blocks/hero-split-reveal";
import PricingBlock from "@/registry/blocks/pricing-block";
import { WaveFooter } from "@/registry/blocks/wave-footer";
import { FeatureInteractiveCards } from "@/registry/blocks/feature-interactive-cards";
import { FAQBlockTwo } from "@/registry/blocks/faq-block-two";
import FeaturesBlockFour from "@/registry/blocks/features-block-four";
import { NewsletterBlockTwo } from "@/registry/blocks/newsletter/newsletter-block-two";
import TestimonialsBlock from "@/registry/blocks/testimonials/testimonials-block";
import { TestimonialsBlockTwo } from "@/registry/blocks/testimonials/testimonials-block-2";
import LogoCloudBlock from "@/registry/blocks/logo-cloud-1";
import { TeamBlock } from "@/registry/blocks/teams/team-block";
import HeroSection from "@/registry/blocks/hero-section/hero-section-four";

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
    imageUrl: "https://yourwebsite.com/images/pricing-block.png",
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
    imageUrl: "https://yourwebsite.com/images/hero-section.png",
    codeMetadata: {
      mainFile: {
        codePath: "hero-section.tsx",
        title: "Hero Component",
        language: "tsx",
        hasPreview: true,
      },
      relatedFiles: [
        {
          codePath: "hero-section-four.tsx",
          title: "Hero Section Four",
          language: "typescript",
          block: HeroSection,
        },
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
    imageUrl: "https://yourwebsite.com/images/testimonials-block.png",
    codeMetadata: {
      mainFile: {
        codePath: "/testimonials/testimonials-block.tsx",
        title: "Testimonials Component",
        language: "tsx",
        hasPreview: true,
      },
      keywords: ["reviews", "testimonials", "feedback"],
      dependencies: "npm i lucide-react",
      relatedFiles: [
        {
          codePath: "testimonials/testimonials-block-2.tsx",
          title: "Testimonials Component 2",
          language: "tsx",
          block: TestimonialsBlockTwo,
        },
      ],
    },
  },
  "footer-block": {
    block: FooterBlock,
    name: "footer-block",
    title: "Website Footer",
    description: "Complete website footer with navigation links",
    imageUrl: "https://yourwebsite.com/images/footer-block.png",
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
    imageUrl: "https://yourwebsite.com/images/faq-block.png",
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
    imageUrl: "https://yourwebsite.com/images/contact-block.png",
    codeMetadata: {
      mainFile: {
        codePath: "contact-block.tsx",
        title: "Contact Component",
        language: "tsx",
        hasPreview: true,
      },
      relatedFiles: [],
      keywords: ["contact", "form", "validation"],
      dependencies: "npm i react-hook-form zod",
    },
  },
  "features-block": {
    block: FloatingFeatureShowcase,
    name: "features-block",
    title: "Floating Feature Showcase",
    description: "Feature showcase with icon grid layout",
    imageUrl: "https://yourwebsite.com/images/features-block.png",
    codeMetadata: {
      mainFile: {
        codePath: "feature-floating-showcase.tsx",
        title: "Floating Feature Showcase",
        language: "tsx",
        hasPreview: true,
      },
      relatedFiles: [
        {
          codePath: "features-block.tsx",
          title: "Features Component",
          language: "typescript",
          block: FeaturesBlock,
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
    block: NewsletterBlockTwo,
    name: "newsletter-block",
    title: "Newsletter Signup",
    description: "Email newsletter subscription form",
    imageUrl: "https://yourwebsite.com/images/newsletter-block.png",
    codeMetadata: {
      mainFile: {
        codePath: "newsletter/newsletter-block-two.tsx",
        title: "Newsletter Component",
        language: "tsx",
        hasPreview: true,
      },
      keywords: ["newsletter", "email", "subscription"],
      dependencies: "npm i react-email",
    },
  },
  "logo-cloud": {
    block: LogoCloudBlock,
    name: "logo-cloud",
    title: "Logo Cloud",
    description: "Email newsletter subscription form",
    imageUrl: "https://yourwebsite.com/images/newsletter-block.png",
    codeMetadata: {
      mainFile: {
        codePath: "logo-cloud-1.tsx",
        title: "Logo Cloud",
        language: "tsx",
        hasPreview: true,
      },
      keywords: ["newsletter", "email", "subscription"],
      dependencies: "npm i react-email",
    },
  },
  "team-block": {
    block: TeamBlock,
    name: "team",
    title: "Team Section",
    description: "Responsive team section with call-to-action",
    imageUrl: "https://yourwebsite.com/images/team.png",
    codeMetadata: {
      mainFile: {
        codePath: "teams/team-block.tsx",
        title: "Team Component",
        language: "tsx",
        hasPreview: true,
      },
      // relatedFiles: [
      //   {
      //     codePath: "team.tsx",
      //     title: "Team Component",
      //     language: "typescript",
      //     block: Team,
      //   },
      // ],
      keywords: ["team", "members", "profiles"],
      dependencies: "npm i @radix-ui/react-dialog",
    },
  },
};
