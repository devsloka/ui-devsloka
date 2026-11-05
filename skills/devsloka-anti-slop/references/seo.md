# SEO and performance (Next.js App Router)

A landing page that doesn't rank or loads slowly has failed, however good it looks. Everything here is cheap to do during the build and expensive to retrofit.

## Metadata (`src/app/layout.tsx` or `page.tsx`)

```ts
import type { Metadata, Viewport } from "next";
export const metadata: Metadata = {
  metadataBase: new URL("https://example.com"),
  title: { default: "Ledgerline: Invoice matching for finance teams", template: "%s · Ledgerline" }, // ≤ 60 chars
  description: "Ledgerline matches 14,000 invoices an hour against your ERP and flags the 2% that need a human.", // 140–160 chars, specific
  alternates: { canonical: "/" },
  openGraph: { type: "website", url: "/", siteName: "Ledgerline", title: "…", description: "…", locale: "en_US" },
  twitter: { card: "summary_large_image", title: "…", description: "…" },
  robots: { index: true, follow: true },
  icons: { icon: "/favicon.ico" },
};
export const viewport: Viewport = { themeColor: "#F6F3EE" };
```
- Write the title and description like copy, with the product name, what it does and a specific number or claim. Never "Home" or "Welcome".
- `<html lang="en">` (or the content language).
- **OG image:** `src/app/opengraph-image.tsx` with `ImageResponse` from `next/og`, 1200×630, using the preset's colours and the headline. Not a screenshot, and not a generic gradient.
- `src/app/sitemap.ts` and `src/app/robots.ts` (pointing to the sitemap). Add `src/app/icon.svg` or `favicon.ico` too.

## Structured data (JSON-LD)

Render it in the page with `<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />`.
- Always: `Organization` (name, url, logo, sameAs) and `WebSite`.
- Product type: `SoftwareApplication` (applicationCategory, operatingSystem, `offers` from the real pricing) or `Product`, or `Service`/`LocalBusiness` as fits.
- `FAQPage` when there's an FAQ section, with question and answer text **identical** to what's visible.
- Don't invent ratings (`aggregateRating`) unless the user provides real ones.

## Semantics and content

- Landmarks: `<header>`, `<nav aria-label="Primary">`, `<main>`, `<footer>`. Each section is a `<section aria-labelledby>` with an `<h2>` (Devsloka blocks already do this).
- **Exactly one `<h1>`** (the hero). Don't skip heading levels.
- Descriptive link text ("See pricing", not "Click here"), and `alt` text that describes what the image shows. Decorative images get `alt=""` and `aria-hidden` wrappers.
- Section `id`s that read well in URLs (`#pricing`, `#how-it-works`).
- Real text in HTML, not text baked into images or canvases. Rotating `text-effect` words and particle marks aren't indexable, so the static h1 must carry the keywords.

## Core Web Vitals

Targets: LCP < 2.5s, CLS < 0.1, INP < 200ms.
- **LCP:** the hero's largest element is usually the h1 or the hero image. Use `next/image` with `priority` and correct `sizes` for that image, and don't hide the h1 behind a JS-dependent animation (animate a mask, but render the text in the server HTML).
- **CLS:** every image, video, canvas and embed has reserved dimensions or an aspect ratio. Fonts load via `next/font` (metrics are adjusted automatically). Dynamic imports get a same-size `loading` fallback.
- **JS weight:** keep `page.tsx` a server component; client components should be leaves. Load three.js, GSAP-heavy sections and anything below the fold with `next/dynamic`. Remove unused installed components.
- Remote images: add hosts to `images.remotePatterns` in `next.config.ts`.

## Final check

`npm run build` must pass with no type errors. Then run `scripts/audit.mjs`, which reports title and description length, canonical, OG tags, h1 count, heading order, image alt text, `lang`, JSON-LD presence, LCP, CLS and console errors.
