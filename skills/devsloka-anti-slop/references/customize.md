# Customizing installed Devsloka components

Devsloka follows the shadcn model: `shadcn add` copies the source into the user's project, and from then on the user owns it. Installed components are a starting point, not a sealed package. When props can't make a component fit the brief, edit the installed file. This is expected, and often it's what turns a library section into one designed for this product.

## Contents
1. Props first, then edit
2. What you may change
3. Rules that keep an edit safe
4. Common edits, with patterns
5. Known issues per component (fixed in the library, and still open)
6. Record what you changed

## 1. Props first, then edit

Work through this order and stop at the first step that works:
1. **Props:** content, `accent`/`accentForeground`/`surface`/`highlight`, `className`, the variants it exposes.
2. **Theme tokens:** CSS variables in `globals.css` (`--primary`, `--muted-foreground`, `--border`, `--radius`, `--hairline-*`).
3. **Wrapping:** put it in your own section (header, grid placement, a figure beside it) without touching its file.
4. **Editing the installed file:** when the fit still isn't right, or a known issue applies (section 5).

Don't avoid a component that's 80% right because the last 20% needs a code change. Make the change.

## 2. What you may change

You may change anything in the installed copy:
- **Content:** replace hard-coded strings, data and art with props (keep the old values as `DEFAULTS`, or drop them).
- **Styling:** colours, radius, borders, shadows, type scale, spacing, all to match the preset. Replace hard-coded hex values and Tailwind palette colours (`emerald-500`, `#F4F4F3`) with theme tokens or new colour props.
- **Structure:** add or remove slots (a `figure` slot, an `after` caption, optional rating), re-order elements, change the mobile layout.
- **Motion:** retune durations and easing to the preset, remove motion that fights the page's motion budget, or add a reduced-motion variant.
- **Behaviour:** controlled and uncontrolled state, callbacks (`onSubmit`, `onValueChange`), real links instead of `#`.
- **Bugs:** anything in section 5, or anything the audit surfaces.

## 3. Rules that keep an edit safe

These parts are why the component exists, so they survive every edit:
- **Accessibility:** semantic elements, `aria-*`, labels, focus rings, keyboard handling (arrow keys in carousels and radio groups, Escape in dialogs), live regions. If you restructure, keep the roles.
- **Reduced motion:** every animation still has a `prefers-reduced-motion` path that looks composed (final state, not hidden).
- **SSR and hydration:** the first client render must match the server HTML. Never branch markup on `window`, `matchMedia`, `useReducedMotion()`, `Date.now()` or random values during the first render. Branch after mount, or use `useSyncExternalStore` with a server snapshot.
- **Types:** keep the exported props type accurate. New props are optional with sensible defaults, so existing call sites still compile.
- **Exports:** keep the export name and kind (named or default), so imports elsewhere don't break.
- **Headings:** a block keeps its single `<h2>` (heroes keep their `<h1>`).
- **No slop:** your edit must not introduce anything from the ban list (`anti-slop.md`).

After editing, run `npx tsc --noEmit` and re-run the audit. The screenshot of that section is the test.

## 4. Common edits, with patterns

**Hard-coded content → prop.**
```tsx
// before: <span>Oslo — Bergen</span>
export type WaveFooterProps = { /* … */ location?: string } & ComponentProps<"footer">;
// …
{location && <span>{location}</span>}
```

**Optional element the defaults force on you** (for example a made-up rating). Make the default `undefined`, or accept `null`:
```tsx
rating?: { score: string; count: string } | null;
// default: rating = null   → render only when provided
```

**Hard-coded palette → tokens or a prop.**
```tsx
// before: "bg-[#F4F4F3] text-neutral-900"   after: "bg-card text-card-foreground"
// before: "bg-emerald-500"                   after: "bg-[var(--block-accent)]" with style={{ "--block-accent": accent }}
```

**New slot** (a Linework figure inside a feature card, a caption after a scroll piece):
```tsx
figure?: React.ReactNode;   // render where the old icon was; keep the old icon as the fallback
```

**Mobile re-layout:** add a stacked variant under `md:` instead of shrinking the desktop layout. Check it at 375 in the audit.

**Matching the preset:** square corners for swiss and brutalist (`rounded-none` on the component's own containers), serif headings for editorial (`font-display` on its heading), mono labels for precision.

## 5. Known issues per component

### Fixed in Devsloka UI (November 2026)

Fresh installs already include these fixes. If a project installed the component earlier, its copy may still have the old behaviour. Check for the symptom, then re-install (`npx shadcn@latest add <url> --overwrite`, which discards local edits) or apply the fix by hand.

| Component | Old symptom | What changed |
|---|---|---|
| `laptop-closes-on-scroll` | Hydration error (React #418) for visitors who prefer reduced motion. | Reads the preference with `useSyncExternalStore` (server snapshot `false`), so the first client render matches the server HTML. |
| `arc-scroll-steps` | Step numbers overlapped the step title on phones. | Narrow containers (`< @md`) set the arc higher and stack the step text below it; numbers and titles are a size smaller there. |
| `wave-footer` | "Oslo — Bergen" was hard-coded. | New `location` prop; pass `""` to hide it. |
| `case-study-carousel` | The active dot blended into purple; dots had a 16px tap area. | Solid accent dot; 44px tap area. |
| `testimonials-block-2` | A made-up "4.9 · 1,240" rating always showed. | `rating={null}` hides it. Do that unless the user gives real numbers. |
| `mission-bento` | Hard-coded light surface, dark card and emerald dot. | New colour props: `surface`, `foreground`, `card`, `highlightSurface`, `highlightForeground`, `statusColor`. Defaults are unchanged, so pass them on dark or warm presets. |
| `pricing-block` | Two `<h1>`s, hard-coded plans, glass cards with gradient text. | Rebuilt: one `<h2>`, plans and prices from props, an accessible monthly/yearly radio toggle, accent props, link CTAs. |
| `hero-gradient-mesh` | Terminal and copy row could widen the page at 375; small docs link. | Constrained grid columns (`grid-cols-1`, `min-w-0`); 44px docs link. |
| `feature-interactive-cards` | No place for an illustration. | Each feature takes an optional `figure` (a Linework figure or UI fragment). |

### Still open (fix in the installed copy when you use them)

| Component | Issue | Fix |
|---|---|---|
| `bento-grid`, `showcase-bento` | Content and colours mostly hard-coded. | Edit the installed copy's data and colours, or choose a props-driven section. |
| `feature-floating-showcase`, `cta-poster` | Some text and art (annotations, the poster's shapes) are hard-coded. | Expose them as props, or replace the art with something product-specific (a Linework figure, a code-built fragment). |
| `mission-bento` | The default badge ("5 core tools" icon row) is filler on most pages. | Pass a `badge` with real content, or remove that tile in the installed copy. |
| `feature-interactive-cards` | Vertical tabs can leave an empty column at 1440 when panels are short. | Add a `figure`, or switch to a horizontal step row on wide screens. |
| `arc-scroll-steps` | The stepper scrolls inside its own panel, which can feel trapped on desktop. | Keep the step count small (3–5) and the panel height modest. |

If you hit a new issue, fix it the same way and mention it in the hand-over, so it can be reported upstream to Devsloka UI.

## 6. Record what you changed

In the hand-over, list each edited component with a one-line reason ("`wave-footer`: added `location` prop; was hard-coded"). Re-running `shadcn add` for that item would overwrite the edits, so the user needs to know which files carry customizations. Don't add comments in the code saying who changed it; describe *why* in a normal code comment only where the reason isn't obvious.
