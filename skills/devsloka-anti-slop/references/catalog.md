# Devsloka UI catalog (ui.devsloka.in)

Install any item with `npx shadcn@latest add https://ui.devsloka.in/r/<name>.json`. The live index is at `https://ui.devsloka.in/r/registry.json`, and a full text guide is at `https://ui.devsloka.in/llms-full.txt`. Check the index if an item here seems missing, since new items ship often.

**Where files land:** blocks go to `src/components/<file>.tsx`, components and backgrounds to `src/components/ui/<file>.tsx`. Read the installed file's props type and `DEFAULTS` before using it. The summaries below are a map, not the full API.

**Legend**
- **Motion:** `0` static · `L` light (hover/in-view micro) · `H` heavy (scroll-driven, canvas or 3D). Each page gets one hero moment plus at most one or two `H` pieces.
- **Colour:** `accent` = takes colour props (pass `brand.accent`), `tokens` = follows CSS variables (`--primary`, `--foreground`…), `fixed` = has hard-coded colours that you edit in the installed file.
- **Fits:** the presets it suits best (see presets.md).

## Contents
1. Heroes
2. Proof (logos, numbers, testimonials)
3. Features and how-it-works
4. Showcase, work and galleries
5. Pricing
6. Team, about, contact
7. FAQ, newsletter, CTA
8. Footers
9. Navigation and interactive controls
10. Signature objects
11. Backgrounds
12. Supporting pages
13. Known gaps (build these custom)
14. Gotchas

---

## 1. Heroes (each renders the page's only `<h1>`)

| Name (import) | What it is | Props | Motion / Colour | Fits |
|---|---|---|---|---|
| `hero-section` (`import HeroSectionBlock from "@/components/hero-section"`) | Statement headline over a week-calendar visual | eyebrow, title, description, primaryAction{label,href}, secondaryAction, note, events[] | 0 / tokens | precision, swiss (scheduling, productivity, ops) |
| `hero-section-four` (`import HeroSection from "@/components/hero-section-four"`) | Serif "manuscript" page with an inline reviewer comment | eyebrow, title, emphasis, description, primaryAction, secondaryAction, manuscript[], comment{author,text} | 0 / tokens | editorial, paper (writing, docs, publishing, legal, research) |
| `hero-split-reveal` (`import HeroSplitReveal from "@/components/hero-split-reveal"`) | Copy beside a photo that reveals in, with a facts row | eyebrow, title, description, primaryAction, secondaryAction, facts[], image{src,alt,caption,credit} | L / tokens | editorial, tactile (physical products, D2C, hospitality, retail) |
| `hero-floating-elements` (`import HeroFloatingElements from "@/components/hero-floating-elements"`) | Annotated spec-sheet of the product with callouts | eyebrow, title, description, primaryAction, secondaryAction, specs[], annotations | 0 / tokens | swiss, precision, tactile (hardware, APIs, technical products) |
| `hero-gradient-mesh` (`import HeroGradientMesh from "@/components/hero-gradient-mesh"`) | Developer terminal that types out a deploy, with a copyable install command (despite the name, there's no gradient mesh) | eyebrow, title, description, installCommand, docsLink, windowTitle, lines[] (command/step/success/log) | L / tokens | precision, brutalist (CLIs, SDKs, devtools, infra) |

Hero companions (combine with a hero or build a custom hero around them):
- `text-effect` (`TextEffect`): cycles words in place, sized to the longest word. Props: words[], effect (8 styles), interval, align. **L.** Use one rotating word at most, never in every heading.
- `laptop-closes-on-scroll` (`AnimatedMacBook`): a laptop whose lid closes as you scroll, with any children on its screen. Props: children, scrollHeight, maxRotation, color, screenClassName. **H.** A great hero-to-content transition for software products.
- `animated-smartwatch` (`AnimatedSmartwatch`): a watch that rotates into view on scroll, with a live clock or your own content. Props: children, scrollHeight, color, bandColor, size. **H.** Wearables, health, timing products.
- `3d-background` (`GlobeBackground`): three.js globe. **H.** Network, global, logistics, infra. Load with `next/dynamic`.
- An ascii.devsloka.in particle mark (see ascii.md): **H.** Brand-first heroes.
- A large Linework figure (see linework.md): **L.** The `precision` and `paper` heroes.

## 2. Proof

| Name | What it is | Props | Motion / Colour | Fits |
|---|---|---|---|---|
| `logo-cloud-1` (`import LogoCloudBlock from "@/components/logo-cloud-1"`) | "Trusted by" typographic wordmarks in a hairline grid | eyebrow, title, wordmarks[], footnote | 0 / tokens | all; best for swiss, editorial, precision |
| `logo-cloud-carousel` (`LogoCloudCarousel`, ui) | Infinite CSS marquee of logos with edge fade | logos[], speed, direction, rows (1/2), pauseOnHover, fade | L / tokens | kinetic, tactile |
| `features-block-four` (`import FeaturesBlockFour from "@/components/features-block-four"`) | By-the-numbers stats section | eyebrow, title, description, stats[], measuredAt | 0 / tokens | all. **The default "numbers" section.** |
| `mission-bento` (`MissionBento`, ui) | Stats bento with masked heading reveal, count-ups and a self-drawing trend arrow | eyebrow, lead, title, description, badge, status, stats[2], highlight, accent, surface, foreground, card, highlightSurface, highlightForeground, statusColor | L / accent | precision, kinetic, brutalist. Defaults to a light card; on dark or warm pages pass the colour props |
| `testimonials-block` (`import TestimonialsBlock from "@/components/testimonials-block"`) | One large editorial pull quote with keyboard navigation | eyebrow, title, testimonials[], footnote | L / tokens | editorial, paper, swiss |
| `testimonials-block-2` (`TestimonialsBlockTwo`) | Wall of short quotes plus an aggregate rating | eyebrow, title, rating{score,count} (pass `null` without real numbers), quotes[], footnote | L / tokens | tactile, kinetic, brutalist |

## 3. Features and how-it-works

| Name | What it is | Props | Motion / Colour | Fits |
|---|---|---|---|---|
| `features-block` (`import FeaturesBlock from "@/components/features-block"`) | Statement with a numbered feature index, one highlighted | eyebrow, title, description, labels[], features[], highlightIndex | 0 / tokens | editorial, swiss, paper |
| `feature-interactive-cards` (`FeatureInteractiveCards`) | Tabbed feature details (Radix Tabs) | eyebrow, title, description, features[] (each can take a `figure`, e.g. a Linework illustration), value/defaultValue/onValueChange | L / tokens | precision, tactile, paper |
| `feature-floating-showcase` (`FloatingFeatureShowcase`) | Product surface with floating annotations, a deploy list and an audit line | eyebrow, title, description, annotations[], deploys[], auditLine, footnote | L / tokens | precision, brutalist (devtools, infra, security) |
| `tabs-switcher` (`TabsSwitcher`, ui) | Feature tabs with cross-fading panels | read source | L / tokens | precision, tactile |
| `expanding-cards` (`ExpandingCards`, ui) | Image cards that grow on selection (CSS flex-grow) | read source | L / tokens | tactile, editorial |
| `bento-grid` (`BentoGrid`, default, ui) | Animated feature bento: files flowing through an action, drifting rows, a playable install, a copy command. **Content and colours are mostly hard-coded**, so edit the installed copy | read source | L / fixed | precision, kinetic (dev tools) |
| `showcase-bento` (`ShowcaseBento`, ui) | Agency or studio bento: hopping portraits, count-up stat, rotating testimonials, tech rows | title, stat, statSuffix, statLabel, contactHref | L / fixed | kinetic, brutalist (agencies, studios) |
| `arc-scroll-steps` (`ArcScrollSteps`, ui) | Scroll-driven stepper: numbered steps orbit a large arc | steps[], header, footer, spacing, accent, label | H / accent | **Default "how it works"**; kinetic, precision, swiss |
| `tour` (`Tour`, ui) | Spotlight product tour | read source | L / tokens | in-app demos, not usually landing pages |
| `card-decorator` (`CardDecorator`, ui) | Corner brackets, dashes, dots or glow on any card | variant, size | 0 / currentColor | precision, swiss. A cheap way to add craft to custom cards |

## 4. Showcase, work and galleries

| Name | What it is | Props | Motion / Colour | Fits |
|---|---|---|---|---|
| `case-study-carousel` (`CaseStudyCarousel`) | Stacked case studies, the active one leads, with swipe and keys | items[], eyebrow, index, title, cta, readMoreLabel, accent | L / accent | agencies, B2B proof; editorial, kinetic |
| `dock-gallery` (`DockGallery`) | Project row that magnifies like a dock | items[], header, minWidth, maxWidth, spread, aspectRatio | L / tokens | portfolios, studios; kinetic, tactile |
| `hover-expand-gallery` (`HoverExpandGallery`) | Panels where the hovered one expands with a label | items[], activeIndex/defaultIndex, onActiveChange, accent | L / accent | hospitality, fashion, places; editorial |
| `animated-image-gallery` (`ImageGallery`) | Masonry gallery fading in on scroll | images[], columns | L / tokens | photography, products; editorial |
| `content-carousel` (`ContentCarousel`) | Titled slides with prev/next, dots and live region | read source | L / tokens | step-through stories |
| `morphing-card` (`MorphingCard`) | Card that morphs into a dialog (shared layout) | title, description, image, imageAlt, children, action, open… | L / tokens | "read more" for features or case studies |
| `morphing-modal` (`MorphingModal`) | Dialog that grows from its trigger, with tabs inside | trigger, title, tabs[], footer… | L / tokens | specs, plan comparison detail |

## 5. Pricing

| Name | What it is | Notes |
|---|---|---|
| `pricing-card` (`PricingCard`, ui) | One plan card: name, description, price, period, features[], cta/ctaLabel/ctaHref, highlighted, badge | Compose 2–4 cards in your own section when you want a custom layout, and give the highlighted plan a reason. |
| `pricing-block` (default `PricingBlock`) | Full pricing section: heading, monthly/yearly radio toggle, plan columns with hairlines, highlighted plan in the accent | eyebrow, title, description, plans[] (name, description, price{monthly,yearly}, period, features[], cta{label,href}, highlighted, badge), defaultBilling, yearlyNote, footnote, accent, accentForeground. Use it when the page needs a billing toggle; otherwise compose `pricing-card`s. |
| `receipt-printer` (`ReceiptPrinter`) | Prints a torn-edge receipt line by line | A memorable alternative for usage pricing or commerce: items[], charges[], payment, currency, locale |

## 6. Team, about, contact

| Name | What it is | Props | Fits |
|---|---|---|---|
| `team-block` (`TeamBlock`) | Editorial team index with portraits, roles, locations, plus an open-roles link | eyebrow, title, description, members[], hiring | editorial, swiss |
| `team-carousel` (`TeamCarousel`) | Infinite Embla carousel of portraits | members[], title, header, speed, edgeBlur | kinetic, tactile |
| `profile-card` (`ProfileCard`) | Social profile card with accent wave cover and follow toggle | name, handle, verified, avatar, cover, bio, stats[], link, accent | creators, communities |
| `contact-block` (default `ContactBlock`) | Direct channels plus a validated form with sending and success states | eyebrow, title, intro, channels[], responseNote, topics[], onSubmit | all |
| `availability-card` (`AvailabilityCard`) | "Hire me" card with an availability pulse, local clock, copy-email | read source | freelancer and portfolio pages |

## 7. FAQ, newsletter, CTA

| Name | What it is | Props | Motion / Colour |
|---|---|---|---|
| `faqs-block` (default `FAQsBlock`) | Two-column accordion with support note and last-updated | eyebrow, title, note, supportEmail, lastUpdated, faqs[] | 0 / tokens |
| `faqs-block-two` (`FAQBlockTwo`, file `faq-block-two`) | Searchable FAQs grouped by topic | title, description, searchPlaceholder, groups[] | L / tokens |
| `newsletter-block` (`NewsletterBlock`) | Issue-style sign-up with recent issues | read source | 0 / tokens |
| `newsletter-block-two` (`NewsletterBlockTwo`) | Compact inline sign-up strip | read source | 0 / tokens |
| `cta-poster` (`CtaPoster`) | Swiss-style poster CTA on an accent field | kicker[2], title, description, primaryAction, secondaryAction, footnote, accent, accentForeground, highlight | 0 / accent |
| `cta-split-photo` (`CtaSplitPhoto`) | Photo split with bookable demo slots | eyebrow, title, description, reasons[], image, photoSide, actions, slots[], timezoneNote, surface, surfaceForeground, accent, accentForeground | L / accent |
| `cta-ticket` (`CtaTicket`) | Printed event ticket with a stub | eyebrow, description, availability, eventName, edition, ticketNumber, details[], stub, primaryAction, calendarAction, accent, accentForeground | 0 / accent. Launches, events, waitlists |

## 8. Footers

| Name | What it is | Props | Fits |
|---|---|---|---|
| `footer-block` (default `FooterBlock`) | Classic link columns with statement and address | brand, statement, address, columns[], legalLinks[], year | editorial, swiss, paper |
| `wave-footer` (`WaveFooter`) | Oversized wordmark footer | wordmark, tagline, links[], socialLinks[], email, location (pass "" to hide), year | kinetic, brutalist, tactile |
| `grid-footer` (`GridFooter`) | Bordered grid with newsletter sign-up | brand, description, columns[], newsletterTitle, newsletterNote, onSubmit, year | precision, swiss |
| `floating-footer` (`FloatingFooter`) | Minimal app footer with status link | wordmark, version, links[], socialLinks[], status, year | precision (SaaS, devtools) |

## 9. Navigation and interactive controls

- `morphing-nav` (`MorphingNav`): segmented nav with a sliding indicator, rendered as links or a radio group. Good inside a custom header or as a pricing period toggle. **L.**
- `card-radio` (`CardRadioGroup`, `CardRadioItem`): selectable cards with radio semantics, for plan or use-case pickers.
- `icon-radio` (`IconRadioGroup`, `IconRadioItem`): icon options with a playful check.
- `animated-multi-select`, `range-slider-with-histogram`: product-demo widgets (filters, search) that make a feature tangible.
- `success-result`, `empty-result`, `error-result`: form result states (newsletter, waitlist, contact).
- `loader`: pulsing-dot loader in the current colour.

## 10. Signature objects (use when the product fits; they make a page memorable)

| Name | Use it for |
|---|---|
| `receipt-printer` (`ReceiptPrinter`) | commerce, fintech, POS, billing, usage pricing |
| `now-playing-card` (`NowPlayingCard`) | music, audio, podcasts, media, focus apps |
| `reminders-card` (`RemindersCard`) | productivity, tasks, habits |
| `fuzzy-mascot` (`FuzzyMascot`): 15 shapes, states idle/working/sleeping, hats, glasses, fur; eyes follow cursor | playful consumer brands, kids, community, onboarding states. Props: shape, color, state, shading, hat, glasses, furLength, size, trackPointer |
| `availability-card` | freelancers, studios, portfolios |
| `airbnb-card` (`ListingCard`) | travel, rentals, marketplaces |
| `product-card` (`ProductCard`) | e-commerce, D2C |
| `profile-card` | creators, social, communities |
| `animated-smartwatch`, `laptop-closes-on-scroll` | device-led storytelling |
| `border-gradient-icon` | **use sparingly**: a gradient border is a slop smell unless the preset calls for it |
| `gradient-text` (`GradientText`) | **off by default.** Gradient headline text is the #1 AI-slop tell. Only use it with a written reason (for example a brand that literally is a gradient), and never on the h1. |

## 11. Backgrounds

| Name | Notes |
|---|---|
| `3d-background` (`GlobeBackground`) | three.js globe. Heavy, so use `dynamic(() => import(...).then(m => m.GlobeBackground), { ssr: false })` |
| `floating-dots` (`FloatingDots`) | Light canvas of rising dots. Props: count, color, radii, speeds. Subtle texture for kinetic or dark presets |
| `particles-background` (`ParticlesBackground`) | Generic particles. A slop smell; prefer an ascii.devsloka.in mark made from the brand's own SVG |
| `confetti-background` (`ConfettiBackground`) | Only for a success moment (after sign-up), never as page decoration |
| `blob-background` (`BlobBackground`) | **Banned by default.** Blurred colour blobs are a top AI-slop tell |

## 12. Supporting pages (same install pattern)

- **Blog:** `blog-featured`, `blog-index`, `blog-magazine` (take `accent` or `inks`)
- **Changelog:** `changelog-timeline`, `changelog-release`, `changelog-compact` (`accent`)
- **Auth:** `sign-in-split`, `sign-in-minimal`, `sign-up-split`, `sign-up-steps`, `forgot-password-simple`, `forgot-password-reset`, `otp-verify`, `otp-two-factor` (`accent` and `onSubmit` callbacks)
- **404:** `not-found-poster`, `not-found-index` (`accent`)

## 13. Known gaps (build these custom in house style)

- **Site header/nav:** brand mark, 3–5 anchor links, one CTA, mobile sheet menu. `morphing-nav` can be the link group.
- **Stats strip** (if `features-block-four` or `mission-bento` is too big): a 3–4 figure row with tabular numbers and sources.
- **Comparison table** (us vs. the old way): a real `<table>` with a caption.
- **Integrations:** a typographic list or grid of names. Don't use a cloud of random logos.
- **Problem/agitation section:** often best as a large editorial paragraph plus one Linework figure.

## 14. Gotchas

For known component bugs and their fixes (hydration under reduced motion, mobile overlap, hard-coded colours or content), see the table in `customize.md`. Every installed component can be edited to fit the brief.

- Only one hero block per page, because every hero renders an `<h1>`.
- Components that use `next/image` (airbnb, case-study, gallery, hover-expand, now-playing, product, profile, showcase-bento, team-carousel, availability) need `images.remotePatterns` in `next.config` for remote URLs (for example `images.unsplash.com`).
- Defaults name fictional brands (Bramble, Plinth, Pallet…). Replace every string.
- Recent `shadcn init -d` uses the Base UI style, and some Devsloka blocks break under it (`faqs-block` fails to typecheck because Base UI's Accordion has no `type`/`collapsible`). Initialise with `npx shadcn@latest init -t next -b radix -p nova -y`.
- The `motion` package is imported as `motion/react`. Don't also add `framer-motion`.
