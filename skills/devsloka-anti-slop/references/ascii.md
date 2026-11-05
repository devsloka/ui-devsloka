# ASCII (ascii.devsloka.in)

A free browser studio that turns a **filled SVG** (a logo, a mark, a glyph) into an interactive particle field. Each sampled pixel becomes a spring that the cursor pushes away and that drifts back home. It exports one self-contained React + TypeScript component. It's the strongest way to make a brand's own mark the hero's signature moment, much better than a generic particles or blob background.

## When to use it

- `kinetic` and `precision` heroes, a brand-first section, or a closing CTA backdrop.
- Only when there's a real mark to animate (the brand's logo or symbol, or a product glyph). A random shape is decoration, and decoration is slop.
- One per page.

## How it works (the user exports; you integrate)

The studio is interactive and has no CLI or registry, so the export is a user step:

1. Prepare a clean, **filled** SVG of the mark (outlined text, no strokes-only paths). If you have the logo, simplify it and save it somewhere the user can find it, such as `public/brand/mark.svg`.
2. Ask the user to open `https://ascii.devsloka.in/playground`, drop the SVG in, tune it, then use **Export Code → Copy component**. Suggest settings that match the preset:
   - precision: Density 3px, Size 0.9, Reach 40, Force 6, Spring 0.08, Damping 0.85, colour = ink `#F7F8F8` on dark
   - kinetic: Density 2px, Size 1.1, Reach 70, Force 10, Spring 0.06, Damping 0.9, colour = bone or brand
3. They paste the component as `src/components/brand/svg-particle-animation.tsx` (the default export is `SvgParticleAnimation`, about 160 lines; the SVG and all settings are baked in as constants such as `COLOR`, `PARTICLE_SIZE`, `MOUSE_RADIUS`).
4. Install its deps: `npm i three @react-three/fiber`.

Until the export exists, build the hero with a **static, composed fallback**: the same SVG rendered large, in place, at the final size. The page should look finished either way, and say in your hand-over message that the particle version is one paste away.

The preset shapes on the site (Infinity, Asterisk, Orbit: `/playground?preset=infinity|asterisk|orbit`) are demos. Only use them if they genuinely mean something for the product.

## Integration rules

```tsx
// src/components/hero-mark.tsx
"use client";
import dynamic from "next/dynamic";
const SvgParticleAnimation = dynamic(() => import("@/components/brand/svg-particle-animation"), {
  ssr: false,
  loading: () => <img src="/brand/mark.svg" alt="" className="size-full object-contain opacity-90" />,
});
export function HeroMark() {
  return <div className="relative aspect-square w-full max-w-[560px]"><SvgParticleAnimation /></div>;
}
```
- Load it with `ssr: false` and a static fallback that has identical dimensions (no layout shift).
- Give it a fixed-aspect container. The canvas fills its parent.
- Edit `COLOR` in the exported file to match the preset ink or brand colour (it's a constant near the top).
- It's decorative: the wrapper should be `aria-hidden`, and the hero's `<h1>` carries the meaning.
- Check it in the audit screenshots. WebGL renders in headless Chrome via SwiftShader, so if it comes out blank, the fallback must still look intentional.
