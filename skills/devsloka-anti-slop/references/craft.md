# Craft: the pixel-perfection rules

The gap between "fine" and "designed" is mostly hundreds of small, consistent decisions. These rules make those decisions for you, so put your judgment into the concept instead.

## Spacing

- **Scale (4px base):** 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128 · 160. Tailwind steps 1,2,3,4,6,8,12,16,24,32,40 map to these. Avoid arbitrary values like `p-[22px]`, and when you do need one, keep it on the grid.
- **Proximity:** spacing inside a group is smaller than the spacing between groups. Label→input 8, field→field 16–24, block→block 48–64, section→section 96–160.
- **Section padding varies on purpose.** Use the same base (for example `py-24 md:py-32`), but give the hero and closing CTA more room and dense proof strips less. Identical padding on every section reads as a template.
- **Gutters:** 16px on mobile, 24px on tablet, 32–48px on desktop, from one container utility (for example `mx-auto w-full max-w-[1240px] px-4 sm:px-6 lg:px-12`). Every section uses the same container so edges line up down the page.
- **Grid:** 12 columns on desktop, 4–6 on mobile. Place content by column span (`col-span-7`, `col-start-2`). Asymmetric splits (7/5, 8/4) look designed; 6/6 looks default.
- **Off-grid media:** when an image or device has a fixed size, align the surrounding spacing to *it*, not the grid.
- **Density:** whitespace has to be *composed*, not left over. At 1440px, every section's visual (figure, product UI, image) should fill at least ~40% of the content width, and text and visual should together fill the section's height. A small illustration floating in a large empty field reads as unfinished, not as minimal. Linework figures in a feature row should be at least 480px wide on desktop. When a section feels sparse, make the visual bigger, tighten the section padding, or merge it with its neighbour. Don't add decoration.

## Typography

- **Two families max** (plus mono if the preset uses one), loaded with `next/font/google` (`display: "swap"`, `subsets: ["latin"]`, variable fonts where available).
- **Scale:** ratio ~1.25 for UI, larger jumps for display. The display size should be at least 3× the body size. Weak hierarchy is the most common amateur tell.
- **Fluid display:** `font-size: clamp(min, calc, max)`, for example `clamp(2.75rem, 1.4rem + 5.2vw, 6rem)`. Check it at 375px: the h1 should fit in 2–4 lines with no single-word orphan.
- **Line-height:** display 0.9–1.05, headings 1.1–1.2, body 1.5–1.65. **Tracking:** display −0.02 to −0.04em, small caps or labels +0.04 to +0.08em, body 0.
- **Measure:** body text 55–75 characters (`max-w-[62ch]`). Subheads should be one sentence, roughly ≤ 22 words.
- **Wrapping:** `text-wrap: balance` (`text-balance`) on headings, `text-pretty` on paragraphs.
- **Numbers:** `tabular-nums` in stats, prices and tables. Use real typographic punctuation (“ ” ’ – —), `&nbsp;` between a number and its unit, and the true multiplication sign × in "2× faster".
- **Body size:** 16px minimum on mobile (inputs too, so iOS doesn't zoom), and 17–18px for reading-heavy presets.

## Colour

- Use one accent, applied with rules (primary CTA, active states, the signature moment, small markers). If you can't say why something is the accent colour, it shouldn't be.
- Tune neutrals: tinted greys (warm for paper and editorial, cool for precision) instead of Tailwind's default `gray-*` everywhere.
- Contrast: body text ≥ 4.5:1, large text ≥ 3:1, including muted text. `muted-foreground` on `muted` surfaces is the usual failure.
- Gradients: at most one, used to *focus* attention (a light falloff behind the product). Never on text, never as section wallpaper, never purple→blue.
- Dark mode, if the preset has it: lower the accent's saturation slightly, and use surfaces stepped by about 3–5% lightness rather than pure black.

## Shape and depth

- **Pick a radius system** and stick to it: 0 (swiss, brutalist), 2–4px (editorial), 6–8px (precision), 10–12px (paper), 20–28px media + 10px UI (tactile). For nested elements, inner radius = outer radius − padding.
- **Borders:** 1px hairlines in a tuned `--border` colour. Prefer borders and surface steps to shadows. If you use shadows, layer them softly (e.g. `0 1px 2px rgb(0 0 0/.06), 0 8px 24px -12px rgb(0 0 0/.12)`) and use them only under things that float.
- **Icons:** one set (lucide), consistent stroke (1.5), sizes 16/20/24. Optically centre play and arrow icons (nudge 1–2px). Never use emoji as icons.
- **Images:** one treatment across the page (same aspect ratios, same crop logic, same tone), and every image is specific to the product. A code-built UI mock with real-looking data beats a blurry stock screenshot.

## Optical alignment

- Big headlines often look indented because of side bearings. Pull them left 0.02–0.05em (`-ml-[0.04em]`) so they align with the paragraph below.
- Centred icons inside circles, play triangles and quotation marks need 1–2px nudges. Hang large opening quotes into the margin.
- Align text baselines across columns when two columns start side by side.

## Responsive

- Check at **375, 768, 1024 and 1440** (the audit does this). Design mobile as a real layout, not a squashed desktop one: re-order, hide decorative duplicates, and stack splits deliberately (image first or text first: pick one).
- No horizontal scroll at any width. Find the offending element and fix it; don't hide overflow on `body`.
- Use `min-h-svh` or `dvh`, never `h-screen`, for full-height heroes.
- Tap targets ≥ 44×44px; nav links get padding, not just text.
- Every hover-only interaction needs a tap or focus path (Devsloka and Linework handle this; check custom code).
- Scroll-driven pieces (`laptop-closes-on-scroll`, `animated-smartwatch`, `arc-scroll-steps`) take tall scroll distances. On mobile, reduce `scrollHeight` or switch to a static composition.
- Mobile nav: a real menu (Radix Dialog/Sheet) with focus trap and Escape. Never just hide the links.

## States and details that signal care

- Visible focus rings that match the preset (2px offset ring in accent or ink).
- Hover states on every interactive element. Disabled and loading states on forms (`loader`, `success-result`).
- `::selection` coloured with the accent. `scroll-margin-top` on anchored sections so a sticky header doesn't cover headings. A favicon and theme-colour meta.
- A footer with real content: what the product is, real links, legal, year.
