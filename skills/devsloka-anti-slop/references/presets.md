# Art-direction presets

A preset is a starting direction, not a costume. Take its tokens and recipe, then bend them to the brand: swap the accent for the brand colour, pick the concept, and change sections that don't fit. Each preset names a *quality* (precise, editorial, kinetic…), never a company to copy.

## Contents
- Picking a preset
- Applying tokens (shared mechanics)
- 1. precision
- 2. editorial
- 3. kinetic
- 4. swiss
- 5. paper
- 6. brutalist
- 7. tactile

## Picking a preset

| The user says… | Preset |
|---|---|
| "like Linear / Vercel / Raycast", "clean dark SaaS", devtools, infra, API | **precision** |
| "editorial", "magazine", "like a publication", writing, research, publishing, premium services | **editorial** |
| "Awwwards", "creative", "wow", "agency", "3D", "motion-heavy", launches, studios, entertainment | **kinetic** |
| "Swiss", "poster", "bold grid", architecture, design tools, events, cultural | **swiss** |
| "like Notion", "friendly", "warm", "illustrated", docs, education, collaboration, consumer productivity | **paper** |
| "brutalist", "raw", "indie", "dev-y and loud", hackathons, indie tools, zines | **brutalist** |
| "like Apple", "premium product", hardware, wearables, D2C physical goods, app launches | **tactile** |

If two fit, choose by the audience: buyers who want to see trust lean toward precision or editorial, and audiences you need to delight lean toward kinetic or paper. Mention the runner-up in your message.

## Applying tokens (shared mechanics)

Put the tokens in `globals.css`. shadcn variables accept any colour format; use hex to keep it readable.

```css
:root {
  --background: #F6F3EE;  --foreground: #141414;
  --muted: #EDE8E0;       --muted-foreground: #6B655C;
  --card: #FBF9F5;        --card-foreground: #141414;
  --border: #D9D3C7;      --input: #D9D3C7;  --ring: #141414;
  --primary: #141414;     --primary-foreground: #F6F3EE;   /* buttons are usually ink, not accent */
  --accent: #EDE8E0;      --accent-foreground: #141414;
  --radius: 0.125rem;
  /* Linework figures */
  --hairline-plate: var(--background); --hairline-hi: #141414; --hairline-edge: #8C857A;
  --hairline-mid: #BDB6AA; --hairline-lo: #E3DDD3; --hairline-stroke: 0.9;
  /* brand accent for custom CSS */
  --brand: #0A6EFF;
}
.dark { /* only if the preset ships a dark mode */ }
```

Notes:
- shadcn's `--accent` is a hover-surface colour, not the brand colour. Keep the brand colour in `--brand` and in `src/lib/brand.ts`, and pass it to Devsloka `accent` props.
- Make `--primary` (buttons) ink-on-paper by default. Use the brand colour for at most one CTA per viewport, the signature moment, and small markers.
- For dark-only presets, put `className="dark"` on `<html>` and define the `.dark` tokens; you can skip next-themes.
- Map fonts in `@theme inline`: `--font-sans: var(--font-body); --font-display: var(--font-display-face); --font-mono: var(--font-mono-face);` then use `font-display` on headings.

---

## 1. precision

**Quality:** engineered calm. Dense with information, quiet in colour, exact in alignment. Every pixel looks decided.

- **Palette (dark-first):** bg `#08090A`, surface `#0F1011`, ink `#F7F8F8`, muted `#8A8F98`, line `rgba(255,255,255,0.08)`, accent = brand (default Devsloka `#0A6EFF`). Light variant: bg `#FCFCFD`, ink `#0B0C0E`, muted `#6B6F76`, line `#E6E7EA`.
- **Type:** `Geist` (display 560–620 weight, tracking −0.03em; body 400) + `Geist_Mono` for labels, numbers and metadata. Alternatives: `Inter_Tight`, `Schibsted_Grotesk`. Display size `clamp(2.75rem, 1.6rem + 4.2vw, 5rem)`, line-height 1.02.
- **Shape:** radius 6–8px, 1px hairline borders, no drop shadows (use borders and surface steps instead). `card-decorator` brackets on key cards.
- **Signature moves:** a product surface built in code (terminal, timeline, app frame) with real-looking data; Linework figures in dark theme (`data-hairline-theme="dark"`) as feature illustrations; mono labels like `01 / Sync`; keyboard shortcuts shown as `<kbd>`.
- **Recipe:** custom header (sticky, blurred only by its own background, 56px) → `hero-gradient-mesh` or `hero-section` (left-aligned) with a code-built product frame → `logo-cloud-1` → `features-block` with a Linework figure per feature → `feature-floating-showcase` → `arc-scroll-steps` → `testimonials-block` → `pricing-card` ×3 + `morphing-nav` toggle → `faqs-block` → `cta-poster` (accent field) → `floating-footer` or `grid-footer`.
- **Motion:** quiet. 150–250ms UI transitions, headers enter with 8px translate and opacity, one signature (`arc-scroll-steps` or `laptop-closes-on-scroll`).
- **Avoid:** coloured glow orbs, gradient text, purple. At most one faint white radial light at the top of the hero (≤6% opacity). Avoid emptiness posing as precision: dark sections with one small figure look unfinished, so keep figures large (480px+) and sections dense with real data.

## 2. editorial

**Quality:** a well-designed magazine. Hierarchy comes from type and rules rather than boxes; it reads before it sells.

- **Palette:** paper `#F6F3EE`, ink `#141414`, muted `#6B655C`, rule `#D9D3C7`, accent = brand, or an ink colour (oxblood `#7A1F1F`, forest `#1F3D2B`, ultramarine `#1F3AA6`).
- **Type:** serif display: `Instrument_Serif`, `Fraunces` (opsz, soft), or `Newsreader`. Sans body: `Instrument_Sans`, `Hanken_Grotesk`, or `Source_Serif_4` for long reading. Display up to `clamp(3rem, 1.4rem + 6vw, 7rem)`, line-height 0.95–1.0. Italic for emphasis words.
- **Shape:** radius 0–2px, 1px rules between sections, captions in small caps or mono, numbered sections (`No. 03 — Method`), generous margins, asymmetric 7/5 or 8/4 column splits.
- **Signature moves:** a drop cap or giant pull quote; photo captions with credits; footnote-style asides; images with consistent treatment (same crop ratio, maybe a slight warm tone).
- **Recipe:** custom masthead header → `hero-section-four` (manuscript) or `hero-split-reveal` → `logo-cloud-1` → `features-block` → `testimonials-block` (one big quote) → `hover-expand-gallery` or `animated-image-gallery` → `team-block` → `faqs-block` → `newsletter-block` → `cta-poster` (accent = ink colour) → `footer-block`.
- **Motion:** minimal and literary. Line-by-line mask reveals for headlines, `clip-path` reveals for images, nothing bouncy.
- **Avoid:** cards with shadows, pill badges, centred everything, icon grids.

## 3. kinetic

**Quality:** the Awwwards register. Type as image, scroll as narrative, one moment people screen-record.

- **Palette:** commit to one field: near-black `#0B0B0C` with bone `#EDE9E0`, or one saturated brand field (for example cobalt `#0A3BFF` with paper type). Accent = brand. Use a second colour only if it's the brand's.
- **Type:** condensed or expressive display: `Big_Shoulders_Display`, `Anton`, `Bricolage_Grotesque` (wide or condensed axes), `Archivo` (width axis). Body: `Hanken_Grotesk` or `Instrument_Sans`. Display up to `clamp(4rem, 2rem + 12vw, 16rem)`, uppercase allowed, line-height 0.85–0.9, tracking −0.02 to −0.04em.
- **Shape:** full-bleed sections, no visible containers, big numerals, marquee bands, a custom cursor only if it carries information.
- **Signature moves:** an ascii.devsloka.in particle version of the logo in the hero, or `3d-background` for global products; a GSAP pinned section that scrubs a story; SplitText headline reveals; `laptop-closes-on-scroll` as the act break.
- **Recipe:** minimal header (logo + menu button) → custom kinetic hero (huge type + ascii mark or globe) → `logo-cloud-carousel` → pinned GSAP story or `laptop-closes-on-scroll` → `arc-scroll-steps` → `case-study-carousel` or `dock-gallery` → `testimonials-block-2` → `mission-bento` → `cta-ticket` or `cta-poster` → `wave-footer` (giant wordmark).
- **Motion:** larger budget: hero moment plus two heavy pieces. Lenis smooth scroll is allowed. Everything has a reduced-motion fallback that still looks composed (static, not broken).
- **Avoid:** motion without meaning; scroll-jacking that blocks reading; `particles-background` or `blob-background` as filler.

## 4. swiss

**Quality:** International Typographic Style. A visible grid, flush-left type, big numbers, one loud colour, zero decoration.

- **Palette:** white `#FFFFFF` or `#F4F4F0`, black `#0A0A0A`, one signal colour = brand (default `#0A6EFF`; classic alternatives are red `#E4002B` or yellow `#FFD400` when the brand allows).
- **Type:** `Archivo`, `Inter_Tight` or `Schibsted_Grotesk` at weights 500/700 only. Large sizes tight (−0.03em). Numerals huge. Labels small uppercase with +0.06em tracking.
- **Shape:** radius 0, 12-column grid with visible 1px column or row rules, content snapped to columns, poster-like asymmetry.
- **Signature moves:** a spec sheet with callouts (`hero-floating-elements`); a poster CTA (`cta-poster`); oversized index numbers; a grid that shows through.
- **Recipe:** custom header on the grid → `hero-floating-elements` → `features-block-four` (numbers) → `features-block` → `arc-scroll-steps` → `team-block` → `faqs-block` → `cta-poster` → `grid-footer`.
- **Motion:** low. Hard cuts, wipes along grid lines, 200ms.
- **Avoid:** rounded corners, soft shadows, more than one colour, centred text blocks.

## 5. paper

**Quality:** warm, friendly, literate. Feels like a well-kept notebook, with line illustrations instead of stock art.

- **Palette:** warm white `#FBFAF7`, ink `#1F1E1C`, muted `#787670`, line `#E9E7E2`. Soft highlighter tints used as section markers: yellow `#FBEDC5`, blue `#DCEAF3`, green `#DDEEDF`, pink `#F6E1DD`. Accent = brand, used for links and the primary CTA.
- **Type:** `Hanken_Grotesk` or `Bricolage_Grotesque` (700 for headings) + `Newsreader` italic for emphasis words. Body `Hanken_Grotesk` 17–18px.
- **Shape:** radius 10–12px, 1px warm borders, soft flat surfaces (no glassmorphism), highlighter underlines on one key phrase per section.
- **Signature moves:** Linework figures (light theme) are the illustration system, one per feature; `fuzzy-mascot` as a brand character where the tone allows; product UI shown as calm cards (`reminders-card`, `now-playing-card`, tabs).
- **Recipe:** custom header → custom hero (headline + subhead + Linework figure cluster), or `hero-section-four` → `logo-cloud-1` → `feature-interactive-cards` with Linework figures → `tabs-switcher` or a signature card section → `testimonials-block-2` → `pricing-card` ×3 → `faqs-block-two` → `cta-split-photo`, or a custom CTA with a mascot → `footer-block`.
- **Motion:** gentle springs (Motion), small hover lifts, the Linework tour enabled.
- **Avoid:** dark mode by default, neon, gradients, 3D.

## 6. brutalist

**Quality:** honest structure. Exposed grid, heavy borders, mono type, confident and a little loud, but still disciplined.

- **Palette:** off-white `#F2F1EC`, black `#0A0A0A`, one hard accent = brand (or an industrial orange `#FF4F00` if the brand allows). Avoid acid-lime by default; it has become a cliché.
- **Type:** `JetBrains_Mono` or `IBM_Plex_Mono` for body and labels + `Archivo_Black` or `Anton` for display. Uppercase labels.
- **Shape:** radius 0, 2px black borders, hard offset shadows (`4px 4px 0 #0A0A0A`) only on interactive elements, visible table-like grids, raw dividers.
- **Signature moves:** a terminal hero (`hero-gradient-mesh`); stats in bordered cells (`mission-bento`, `features-block-four`); a ticket CTA.
- **Recipe:** header as a bordered bar → `hero-gradient-mesh` or a type-only hero → `showcase-bento` or `mission-bento` → `features-block-four` → `testimonials-block-2` → `pricing-card` in a bordered grid → `cta-ticket` → `wave-footer`.
- **Motion:** snappy (120–180ms, steps or linear), no soft easing.
- **Avoid:** chaos for its own sake. The grid still has to align, and text still has to be readable.

## 7. tactile

**Quality:** premium product. The object is the hero, the type is restrained, and space is luxurious.

- **Palette:** `#F5F5F7` and `#FFFFFF` alternating bands, ink `#1D1D1F`, muted `#6E6E73`, accent = brand (links and the CTA only). Optional dark band `#000000` for one act.
- **Type:** `Instrument_Sans` or `Geist` at semibold for display (tracking −0.025em), regular body at 17–19px. Centred headlines are allowed here; centred paragraphs stay short.
- **Shape:** large media radius 20–28px (consistent across the page), small UI radius 10px, no borders on media, shadows very soft and only under objects.
- **Signature moves:** `laptop-closes-on-scroll` or `animated-smartwatch` storytelling; real product photography, or an object built in code; `expanding-cards` for variants or colours.
- **Recipe:** minimal header → `hero-split-reveal`, or a custom centred product reveal → device scroll piece → `expanding-cards` → `feature-interactive-cards` → `logo-cloud-carousel` → `testimonials-block-2` → `pricing-card` ×2–3 → `faqs-block` → `cta-split-photo` → `wave-footer`.
- **Motion:** smooth and expensive-feeling: long eases (`cubic-bezier(0.16,1,0.3,1)`, 600–900ms) on big reveals only; UI stays ≤250ms.
- **Avoid:** busy backgrounds, many accents, small product imagery.
