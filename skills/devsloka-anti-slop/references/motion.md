# Motion: what to animate, with what, and how much

Motion should explain something (state, hierarchy, cause and effect) or create the page's one memorable moment. Everything fading up on scroll is the motion equivalent of a purple gradient.

## Budget (per page)

- **One signature moment**, usually the hero or the first act break.
- **At most one heavy scroll piece** besides it (two in `kinetic`). Heavy means scroll-driven, pinned, canvas or 3D.
- **Everything else is micro:** hover, press, focus, small in-view reveals on section *headers* only, and count-ups for numbers once.
- Devsloka and Linework pieces already carry motion. Count them toward the budget, and don't add a wrapper fade on top of an already animated component.

## Which library

| Need | Use | Notes |
|---|---|---|
| Component state, hover and press, layout and shared-element transitions, simple in-view reveals | **Motion** (`motion/react`) | Already a dependency of most Devsloka items. Use `useReducedMotion()`. |
| Scroll choreography: pinning, scrubbing, timelines across sections, SplitText headline reveals | **GSAP** + ScrollTrigger (`gsap`, `@gsap/react`) | All GSAP plugins are free (including SplitText). Use the `useGSAP()` hook for cleanup, and `gsap.matchMedia()` for reduced-motion and mobile variants. Register plugins once. |
| Smooth scroll (`kinetic` only) | **Lenis** (`lenis`) | Sync with ScrollTrigger (`lenis.on('scroll', ScrollTrigger.update)`). Never with scroll-snap. |
| 3D | **three.js** via `@react-three/fiber` + `@react-three/drei` | Load with `next/dynamic` and `ssr: false`, `dpr={[1, 1.5]}`, `frameloop="demand"` or pause off-screen. Use `3d-background` or an ascii export before writing a scene from scratch. |

Don't let two libraries animate the same element, and keep one library in charge of scroll.

## Easing and duration

| Movement | Curve | Duration |
|---|---|---|
| Enter (appear, reveal) | ease-out: `cubic-bezier(0.16, 1, 0.3, 1)` (expo-out) or `(0.22, 1, 0.36, 1)` | UI 180–260ms; large type or image reveals 500–900ms |
| Exit | ease-in: `cubic-bezier(0.7, 0, 0.84, 0)` | about 70% of the enter duration |
| Move or resize on screen | ease-in-out: `cubic-bezier(0.65, 0, 0.35, 1)` | 240–400ms |
| Colour or opacity only (hover) | `ease` or linear | 120–180ms |
| Draggable, interruptible, playful | spring (Motion `type: "spring"`, `bounce` ≤ 0.2) | n/a |

- UI interactions stay ≤ 300ms. Only cinematic reveals go longer.
- Don't animate frequent or keyboard-driven actions (menus opened 50 times a day should be instant).
- Entrances start from `scale: 0.96–0.98` + `opacity: 0` + `y: 8–16px`, never from `scale: 0`. Popovers scale from their trigger.
- Stagger lists by 40–80ms, max ~6 items, and don't stagger paragraphs.
- Animate only `transform`, `opacity`, `clip-path` and `filter` (sparingly). Never `width`, `height`, `top`, `left` or `transition: all`.
- To debug, slow it 3–5× and watch for jumps at the start and end.

## Patterns that look designed

- **Mask reveal:** a headline line slides up from `overflow: hidden` (SplitText lines or manual spans). Use it once for the h1, and maybe once for the closing CTA.
- **Clip reveal for images:** `clip-path: inset(100% 0 0 0)` → `inset(0)`.
- **Pinned story:** pin a section and scrub 3–5 states (product UI changing, a Linework figure progressing). Use this instead of five separate feature sections.
- **Count-up:** stats count once on first view (use `tabular-nums` to avoid jitter).
- **Marquee:** one band at most (`logo-cloud-carousel`), pausing on hover.

## Reduced motion and performance

- `prefers-reduced-motion: reduce` gets a composed static state, meaning final positions rather than hidden elements. With Motion use `useReducedMotion()`; with GSAP use `gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", …)`.
- Content must never depend on JavaScript to become visible. If an in-view animation fails, the text has to stay readable. Set initial hidden states via Motion `initial` (which SSR renders as styles, so test that the audit screenshots show content).
- Pause off-screen work (IntersectionObserver, or a three.js `frameloop`).
- Mobile: avoid pinning long sections under 768px, and prefer simpler variants.
