# Anti-slop: ban list, screenshot rubric, fixes

"Slop" means output that sits at the statistical average of every landing page a model has seen. People can't always say why, but they recognise it instantly and trust the product less. This file is the checklist for catching it.

## A. Hard bans (fix before showing anything)

`scripts/slop-scan.mjs` catches most of these in code; the screenshot review catches the rest.

**Visual**
1. Purple, violet, indigo or fuchsia gradients, and purple→blue/pink anything, unless purple is the brand's documented colour.
2. Gradient text (`bg-clip-text text-transparent`), especially on the h1.
3. Blurred colour blobs, aurora backgrounds, gradient-mesh wallpaper (`blob-background`, `blur-3xl` circles).
4. Glassmorphism panels (`backdrop-blur` cards over gradients) as a general style.
5. Emoji used as icons or bullet decoration (🚀 ✨ ⚡ in headings or cards).
6. A **centred hero with a pill badge, a two-line headline, a grey subhead and two buttons**, in that exact arrangement, with nothing specific to the product.
7. A **row of three identical rounded cards** with an icon, a title and two lines of text.
8. Uniform `rounded-2xl` + `shadow-xl` on everything.
9. `transition-all`, and identical fade-up-on-scroll on every element.
10. Default font choices with no intent: Inter, Roboto, Arial, Poppins, Montserrat or Open Sans as the display face. (Inter as body text is acceptable only if the preset says so.)
11. Fake UI: lorem ipsum, "John Doe", grey placeholder rectangles, stock "dashboard" images unrelated to the product.
12. Any leftover Devsloka default copy (Bramble, Plinth, Pallet, …).

**Copy**
13. Banned phrases: *unlock, unleash, supercharge, revolutionize, seamless(ly), effortless(ly), elevate, empower, game-changer, cutting-edge, next-level, leverage, harness the power, in today's fast-paced, take X to the next level, transform your, all-in-one, streamline, boost your productivity, world-class, best-in-class, robust, powerful yet simple, built for the future, your journey, say goodbye to, look no further, like never before, at your fingertips, reimagine(d)*.
14. Headlines that could belong to any product ("The future of work is here", "Build faster").
15. "Get Started" as the only CTA label when a specific action exists.
16. Invented social proof that's presented as real (fake logos of real companies, fake review counts). Mark placeholders clearly in the hand-over message.

## B. Smells (allowed only with a stated reason)

`text-effect` rotating words · `gradient-text` · `border-gradient-icon` · `particles-background` · dark mode + neon accent · bento grid as the first feature section · logo marquee + testimonial marquee on the same page · more than two font families · more than one accent colour · every section centred · more than one heavy scroll piece outside the `kinetic` preset.

## C. Screenshot review rubric

Run `scripts/audit.mjs`, then **open the section screenshots** (1440 and 375 at least). For every section, score 1–5:

| # | Criterion | 5 looks like | 1 looks like |
|---|---|---|---|
| 1 | **Distinctiveness** | You couldn't swap in another product's logo and keep it. It has a concept, a signature detail, a specific visual. | A template; any SaaS could use it as-is. |
| 2 | **Typography** | Strong scale contrast, tuned tracking and leading, good rag, no orphans, readable measure. | Everything similar in size; default spacing; widows; walls of text. |
| 3 | **Spacing and rhythm** | Consistent scale, clear grouping, intentional section padding, edges align with neighbours, whitespace composed around a strong visual. | Cramped or floaty; random gaps; misaligned containers; a small visual adrift in a big empty section. |
| 4 | **Colour discipline** | Neutrals tuned, one accent with a clear job, AA contrast. | Many accents, default greys, low-contrast muted text, gradients as decoration. |
| 5 | **Composition** | A clear focal point, deliberate asymmetry or tension, grid-aligned, a reason to look. | Everything centred and evenly weighted; nothing leads the eye. |
| 6 | **Copy** | Specific nouns and numbers, a voice, CTAs that name the action. | Generic claims, banned phrases, "Get Started". |
| 7 | **Craft details** | Consistent radius, borders, icon sizes and image treatment; states present; optical alignment. | Mixed radii, blurry or mismatched images, misaligned icons. |
| 8 | **Responsive (375)** | Re-composed for mobile, readable, no overflow, tap targets OK. | Squashed desktop, tiny text, horizontal scroll, broken stacking. |

**Pass:** every criterion ≥ 4 and the section's average ≥ 4.3.

**What to do when a section fails:**
- Distinctiveness or Composition < 4: **redesign the section.** Change the layout or block, add the concept, introduce a Linework figure or a signature component. Polish won't fix a weak idea.
- Typography, Spacing, Colour or Craft < 4: fix the specific defect (the scale step, the padding token, the contrast value) and re-shoot.
- Copy < 4: rewrite with a concrete fact, number or mechanism.
- Responsive < 4: re-compose the mobile layout (order, stacking, sizes), not just font sizes.

**Whole-page checks:**
- **Sequence:** no two adjacent sections with the same pattern; the light and dark (or tint) bands alternate with intent; the page ends strongly (CTA + footer), not with an afterthought.
- **The squint test:** blur your eyes at the 1440 full-page shot. You should see a clear hierarchy and rhythm, not an even grey texture.
- **The logo-swap test:** replace the brand name with a competitor's. If the page still works, it isn't specific enough.
- **The Pinterest test:** would a designer save one of these sections as a reference? At least the hero and one other section should qualify.

Record the scores in a compact table in chat during the loop (section × criterion), and include the final table in the hand-over message.

## D. Smell → fix

| You see | Do this instead |
|---|---|
| Centred hero, two buttons, nothing else | Left-align with a product-specific visual (Linework figure, code-built UI, device scroll piece, particle mark) on a 7/5 split; one primary CTA + one text link |
| Three icon cards | `features-block` (numbered index), a pinned story, or one Linework figure per feature in alternating rows |
| Purple gradient background | Tuned neutral field + one accent used on one element |
| Gradient headline | Weight and size contrast; one italic serif word; or an accent underline on one phrase |
| Everything fades up | Remove all but the h1 reveal and one set piece; let the Devsloka components carry the micro-motion |
| Same padding everywhere | Vary by role: hero and CTA larger, proof strips smaller |
| Generic dashboard image | Build the relevant UI fragment in code with realistic data from the brief |
| "Trusted by 10,000+ teams" floating alone | A `features-block-four` stat with a source and a date, or a named customer quote |
| Rounded-2xl + shadow on every card | Hairline borders + the preset's radius; shadows only on things that float |
| Long generic FAQ | 5–7 real objections (pricing, security, migration, data ownership, support) answered in plain words |
