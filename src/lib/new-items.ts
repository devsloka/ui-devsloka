// Items shown with a "New" tag in the sidebar, on /components and in the landing index.
// Add an href when an item ships and remove it after a release or two.
const NEW_ITEMS = new Set<string>([
  "/components/profile-card",
  "/components/availability-card",
  "/components/receipt-printer",
  "/components/reminders-card",
  "/components/now-playing-card",
  "/components/arc-scroll-steps",
  "/components/team-carousel",
  "/components/dock-gallery",
  "/components/bento-grid",
  "/components/showcase-bento",
  "/components/mission-bento",
  "/components/hover-expand-gallery",
  "/components/case-study-carousel",
  "/components/fuzzy-mascot",
  // Blocks added in the October 2026 update.
  "/blocks/changelog",
  "/blocks/blog",
  "/blocks/cta",
  "/blocks/sign-in",
  "/blocks/sign-up",
  "/blocks/forgot-password",
  "/blocks/otp",
  "/blocks/not-found",
  "/blocks/footer-block",
  "/blocks/faq-block",
  "/blocks/hero-section",
]);

export const isNewItem = (href: string) => NEW_ITEMS.has(href);
