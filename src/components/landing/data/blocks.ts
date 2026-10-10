export type BlockEntry = {
  name: string;
  href: string;
  image: string;
};

const block = (name: string, slug: string, image = slug): BlockEntry => ({
  name,
  href: `/blocks/${slug}`,
  image: `/images/${image}.png`,
});

export const BLOCKS: BlockEntry[] = [
  block("Hero", "hero-section"),
  block("Features", "features-block"),
  block("Pricing", "pricing-block"),
  block("Testimonials", "testimonials-block"),
  block("FAQ", "faq-block"),
  block("Team", "team-block"),
  block("Contact", "contact-block"),
  block("Newsletter", "newsletter-block"),
  block("Logo Cloud", "logo-cloud"),
  block("Footer", "footer-block"),
  block("Changelog", "changelog"),
  block("Blog", "blog"),
  block("Call to Action", "cta"),
  block("Sign In", "sign-in"),
  block("Sign Up", "sign-up"),
  block("Forgot Password", "forgot-password"),
  block("OTP", "otp"),
  block("404", "not-found"),
];
