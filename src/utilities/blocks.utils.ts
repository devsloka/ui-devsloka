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
import { NewsletterBlock } from "@/registry/blocks/newsletter/newsletter-block";
import TestimonialsBlock from "@/registry/blocks/testimonials/testimonials-block";
import { TestimonialsBlockTwo } from "@/registry/blocks/testimonials/testimonials-block-2";
import LogoCloudBlock from "@/registry/blocks/logo-cloud-1";
import { TeamBlock } from "@/registry/blocks/teams/team-block";
import HeroSection from "@/registry/blocks/hero-section/hero-section-four";

import { ChangelogTimeline } from "@/registry/blocks/changelog/changelog-timeline";
import { ChangelogRelease } from "@/registry/blocks/changelog/changelog-release";
import { ChangelogCompact } from "@/registry/blocks/changelog/changelog-compact";
import { BlogFeatured } from "@/registry/blocks/blog/blog-featured";
import { BlogIndex } from "@/registry/blocks/blog/blog-index";
import { BlogMagazine } from "@/registry/blocks/blog/blog-magazine";
import { CtaPoster } from "@/registry/blocks/cta/cta-poster";
import { CtaSplitPhoto } from "@/registry/blocks/cta/cta-split-photo";
import { CtaTicket } from "@/registry/blocks/cta/cta-ticket";

import { SignInSplit } from "@/registry/blocks/auth/sign-in-split";
import { SignInMinimal } from "@/registry/blocks/auth/sign-in-minimal";
import { SignUpSplit } from "@/registry/blocks/auth/sign-up-split";
import { SignUpSteps } from "@/registry/blocks/auth/sign-up-steps";
import { ForgotPasswordSimple } from "@/registry/blocks/auth/forgot-password-simple";
import { ForgotPasswordReset } from "@/registry/blocks/auth/forgot-password-reset";
import { OtpVerify } from "@/registry/blocks/auth/otp-verify";
import { OtpTwoFactor } from "@/registry/blocks/auth/otp-two-factor";
import { NotFoundPoster } from "@/registry/blocks/not-found/not-found-poster";
import { NotFoundIndex } from "@/registry/blocks/not-found/not-found-index";

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
    title: "Hero",
    description: "Five heroes: a statement over a week calendar, a serif manuscript, a photo split reveal, an annotated spec sheet and a developer terminal",
    imageUrl: "/images/hero-section.png",
    codeMetadata: {
      mainFile: {
        codePath: "hero-section.tsx",
        title: "Statement and calendar",
        language: "tsx",
        hasPreview: true,
      },
      relatedFiles: [
        {
          codePath: "hero-section/hero-section-four.tsx",
          title: "Manuscript",
          language: "tsx",
          block: HeroSection,
        },
        {
          codePath: "hero-split-reveal.tsx",
          title: "Photo split reveal",
          language: "tsx",
          block: HeroSplitReveal,
        },
        {
          codePath: "hero-floating-elements.tsx",
          title: "Annotated spec sheet",
          language: "tsx",
          block: HeroFloatingElements,
        },
        {
          codePath: "hero-gradient-mesh.tsx",
          title: "Developer terminal",
          language: "tsx",
          block: HeroGradientMesh,
        },
      ],
      keywords: ["hero", "landing page", "headline"],
    },
  },
  "testimonials-block": {
    block: TestimonialsBlock,
    name: "testimonials-block",
    title: "Testimonials",
    description: "A large editorial pull quote with keyboard navigation, or a wall of short quotes",
    imageUrl: "/images/testimonials-block.png",
    codeMetadata: {
      mainFile: {
        codePath: "/testimonials/testimonials-block.tsx",
        title: "Pull quote",
        language: "tsx",
        hasPreview: true,
      },
      relatedFiles: [
        {
          codePath: "testimonials/testimonials-block-2.tsx",
          title: "Quote wall",
          language: "tsx",
          block: TestimonialsBlockTwo,
        },
      ],
      keywords: ["testimonials", "reviews", "social proof"],
    },
  },
  "footer-block": {
    block: FooterBlock,
    name: "footer-block",
    title: "Footer",
    description: "Four footers: classic link columns, an oversized wordmark, a bordered grid with sign-up and a minimal app footer",
    imageUrl: "/images/footer-block.png",
    codeMetadata: {
      mainFile: {
        codePath: "footer-block.tsx",
        title: "Classic footer",
        language: "tsx",
        hasPreview: true,
      },
      relatedFiles: [
        {
          codePath: "wave-footer.tsx",
          title: "Oversized wordmark",
          language: "tsx",
          block: WaveFooter,
        },
        {
          codePath: "grid-footer.tsx",
          title: "Bordered grid with sign-up",
          language: "tsx",
          block: GridFooter,
        },
        {
          codePath: "floating-footer.tsx",
          title: "Minimal app footer",
          language: "tsx",
          block: FloatingFooter,
        },
      ],
      keywords: ["footer", "navigation", "site map"],
    },
  },
  "faq-block": {
    block: FAQsBlock,
    name: "faq-block",
    title: "FAQ",
    description: "Accessible accordion FAQs: a two-column layout with a support note, or questions grouped by topic",
    imageUrl: "/images/faq-block.png",
    codeMetadata: {
      mainFile: {
        codePath: "faqs-block.tsx",
        title: "Two-column FAQ",
        language: "tsx",
        hasPreview: true,
      },
      relatedFiles: [
        {
          codePath: "faq-block-two.tsx",
          title: "Grouped FAQ",
          language: "tsx",
          block: FAQBlockTwo,
        },
      ],
      keywords: ["faq", "accordion", "help"],
    },
  },
  "contact-block": {
    block: ContactBlock,
    name: "contact-block",
    title: "Contact",
    description: "Contact section with direct channels and a validated form with sending and success states",
    imageUrl: "/images/contact-block.png",
    codeMetadata: {
      mainFile: {
        codePath: "contact-block.tsx",
        title: "Contact form",
        language: "tsx",
        hasPreview: true,
      },
      keywords: ["contact", "form", "validation"],
    },
  },
  "features-block": {
    block: FloatingFeatureShowcase,
    name: "features-block",
    title: "Features",
    description: "Four feature sections: a statement with a numbered index, a hairline grid, tabbed details and a by-the-numbers layout",
    imageUrl: "/images/features-block.png",
    codeMetadata: {
      mainFile: {
        codePath: "feature-floating-showcase.tsx",
        title: "Statement and index",
        language: "tsx",
        hasPreview: true,
      },
      relatedFiles: [
        {
          codePath: "features-block.tsx",
          title: "Feature grid",
          language: "tsx",
          block: FeaturesBlock,
        },
        {
          codePath: "feature-interactive-cards.tsx",
          title: "Tabbed features",
          language: "tsx",
          block: FeatureInteractiveCards,
        },
        {
          codePath: "features-block-four.tsx",
          title: "By the numbers",
          language: "tsx",
          block: FeaturesBlockFour,
        },
      ],
      keywords: ["features", "grid", "stats"],
    },
  },
  "newsletter-block": {
    block: NewsletterBlockTwo,
    name: "newsletter-block",
    title: "Newsletter",
    description: "Newsletter sign-ups: an issue-style section with recent issues, or a compact inline strip",
    imageUrl: "/images/newsletter-block.png",
    codeMetadata: {
      mainFile: {
        codePath: "newsletter/newsletter-block-two.tsx",
        title: "Issue sign-up",
        language: "tsx",
        hasPreview: true,
      },
      relatedFiles: [
        {
          codePath: "newsletter/newsletter-block.tsx",
          title: "Inline strip",
          language: "tsx",
          block: NewsletterBlock,
        },
      ],
      keywords: ["newsletter", "email", "sign-up"],
    },
  },
  "logo-cloud": {
    block: LogoCloudBlock,
    name: "logo-cloud",
    title: "Logo Cloud",
    description: "A “trusted by” section with typographic wordmarks in a hairline grid",
    imageUrl: "/images/logo-cloud.png",
    codeMetadata: {
      mainFile: {
        codePath: "logo-cloud-1.tsx",
        title: "Wordmark grid",
        language: "tsx",
        hasPreview: true,
      },
      keywords: ["logo cloud", "customers", "social proof"],
    },
  },
  "team-block": {
    block: TeamBlock,
    name: "team-block",
    title: "Team",
    description: "An editorial team index with portraits, roles and locations, plus an open-roles link",
    imageUrl: "/images/team-block.png",
    codeMetadata: {
      mainFile: {
        codePath: "teams/team-block.tsx",
        title: "Team index",
        language: "tsx",
        hasPreview: true,
      },
      keywords: ["team", "about", "people"],
    },
  },
  "changelog": {
    block: ChangelogTimeline,
    name: "changelog",
    title: "Changelog",
    description: "Release notes three ways: a dated timeline, a poster-style release spread and a compact filterable log",
    imageUrl: "/images/changelog.png",
    codeMetadata: {
      mainFile: {
        codePath: "changelog/changelog-timeline.tsx",
        title: "Release timeline",
        language: "tsx",
        hasPreview: true,
      },
      relatedFiles: [
        {
          codePath: "changelog/changelog-release.tsx",
          title: "Release spread",
          language: "tsx",
          block: ChangelogRelease,
        },
        {
          codePath: "changelog/changelog-compact.tsx",
          title: "Compact log",
          language: "tsx",
          block: ChangelogCompact,
        },
      ],
      keywords: ["changelog", "release notes", "updates"],
    },
  },
  "blog": {
    block: BlogFeatured,
    name: "blog",
    title: "Blog",
    description: "Article listings: a featured story with recent posts, a year-grouped archive with hover previews and a magazine-cover grid",
    imageUrl: "/images/blog.png",
    codeMetadata: {
      mainFile: {
        codePath: "blog/blog-featured.tsx",
        title: "Featured story",
        language: "tsx",
        hasPreview: true,
      },
      relatedFiles: [
        {
          codePath: "blog/blog-index.tsx",
          title: "Archive index",
          language: "tsx",
          block: BlogIndex,
        },
        {
          codePath: "blog/blog-magazine.tsx",
          title: "Magazine covers",
          language: "tsx",
          block: BlogMagazine,
        },
      ],
      keywords: ["blog", "articles", "editorial"],
    },
  },
  "cta": {
    block: CtaPoster,
    name: "cta",
    title: "Call to Action",
    description: "Closing calls to action: a Swiss-style poster, a photo split with bookable demo times and a printed event ticket",
    imageUrl: "/images/cta.png",
    codeMetadata: {
      mainFile: {
        codePath: "cta/cta-poster.tsx",
        title: "Poster",
        language: "tsx",
        hasPreview: true,
      },
      relatedFiles: [
        {
          codePath: "cta/cta-split-photo.tsx",
          title: "Photo split with booking",
          language: "tsx",
          block: CtaSplitPhoto,
        },
        {
          codePath: "cta/cta-ticket.tsx",
          title: "Event ticket",
          language: "tsx",
          block: CtaTicket,
        },
      ],
      keywords: ["call to action", "cta", "conversion"],
    },
  },
  "sign-in": {
    block: SignInSplit,
    name: "sign-in",
    title: "Sign In",
    description: "Sign-in screens: a split layout with a blue panel and SSO, or an editorial single column with a magic-link mode",
    imageUrl: "/images/sign-in.png",
    codeMetadata: {
      mainFile: {
        codePath: "auth/sign-in-split.tsx",
        title: "Split with blue panel",
        language: "tsx",
        hasPreview: true,
      },
      relatedFiles: [
        {
          codePath: "auth/sign-in-minimal.tsx",
          title: "Editorial with magic link",
          language: "tsx",
          block: SignInMinimal,
        },
      ],
      keywords: ["sign in", "login", "authentication"],
    },
  },
  "sign-up": {
    block: SignUpSplit,
    name: "sign-up",
    title: "Sign Up",
    description: "Sign-up screens: a split form with live password requirements, or a two-step account and workspace flow",
    imageUrl: "/images/sign-up.png",
    codeMetadata: {
      mainFile: {
        codePath: "auth/sign-up-split.tsx",
        title: "Split with plan summary",
        language: "tsx",
        hasPreview: true,
      },
      relatedFiles: [
        {
          codePath: "auth/sign-up-steps.tsx",
          title: "Two-step sign-up",
          language: "tsx",
          block: SignUpSteps,
        },
      ],
      keywords: ["sign up", "register", "onboarding"],
    },
  },
  "forgot-password": {
    block: ForgotPasswordSimple,
    name: "forgot-password",
    title: "Forgot Password",
    description: "Password recovery: a request form that becomes a check-your-email screen, and a choose-a-new-password step",
    imageUrl: "/images/forgot-password.png",
    codeMetadata: {
      mainFile: {
        codePath: "auth/forgot-password-simple.tsx",
        title: "Request a reset link",
        language: "tsx",
        hasPreview: true,
      },
      relatedFiles: [
        {
          codePath: "auth/forgot-password-reset.tsx",
          title: "Choose a new password",
          language: "tsx",
          block: ForgotPasswordReset,
        },
      ],
      keywords: ["forgot password", "reset password", "account recovery"],
    },
  },
  "otp": {
    block: OtpVerify,
    name: "otp",
    title: "OTP",
    description: "One-time code entry: an email code that submits itself, and an authenticator two-factor prompt with a backup code",
    imageUrl: "/images/otp.png",
    codeMetadata: {
      mainFile: {
        codePath: "auth/otp-verify.tsx",
        title: "Email code",
        language: "tsx",
        hasPreview: true,
      },
      relatedFiles: [
        {
          codePath: "auth/otp-two-factor.tsx",
          title: "Two-factor authenticator",
          language: "tsx",
          block: OtpTwoFactor,
        },
      ],
      keywords: ["otp", "verification code", "two-factor"],
    },
  },
  "not-found": {
    block: NotFoundPoster,
    name: "not-found",
    title: "404",
    description: "Not-found pages: a poster-style 404 on a blue field, and an editorial lost-and-found with search and suggestions",
    imageUrl: "/images/not-found.png",
    codeMetadata: {
      mainFile: {
        codePath: "not-found/not-found-poster.tsx",
        title: "Poster 404",
        language: "tsx",
        hasPreview: true,
      },
      relatedFiles: [
        {
          codePath: "not-found/not-found-index.tsx",
          title: "Lost and found",
          language: "tsx",
          block: NotFoundIndex,
        },
      ],
      keywords: ["404", "not found", "error page"],
    },
  },
};
