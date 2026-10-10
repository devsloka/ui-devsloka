import type { Metadata } from "next";
import { HOME_KEYWORDS } from "./keywords";

export const SITE_URL = "https://ui.devsloka.in";
export const SITE_NAME = "Devsloka UI";
export const SITE_TITLE = "Devsloka UI | Free Animated React Components & Blocks";
export const SITE_DESCRIPTION =
  "Free animated React and Next.js components, UI blocks, hooks, and templates built with Tailwind CSS and Motion. Install with shadcn and own the source.";
export const SITE_REPOSITORY = "https://github.com/devsloka/ui-devsloka";
export const DEFAULT_OG_IMAGE = "/og-home.png";
export const PAGE_OG_IMAGES: Record<string, string> = {
  "/components": "/images/components-og.png",
  "/components/backgrounds": "/images/backgrounds-og.png",
  "/utilities": "/images/utilities-og.png",
  "/blocks": "/images/blocks-og.png",
  "/templates": "/images/templates-og.png",
  "/docs": "/images/intro-og.png",
  "/installation": "/images/installation-og.png",
  "/changelog": "/images/changelog-og.png",
};

/** Canonical site URLs, with one slash between segments and no trailing slash. */
export function siteUrl(path = ""): string {
  const normalized = path.replace(/^\/+|\/+$/g, "").replace(/\/{2,}/g, "/");
  return normalized ? `${SITE_URL}/${normalized}` : SITE_URL;
}

export const defaultSEO: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_TITLE, template: `%s | ${SITE_NAME}` },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: "Devsloka", url: "https://www.devsloka.in" }],
  creator: "Devsloka",
  publisher: "Devsloka",
  category: "technology",
  keywords: HOME_KEYWORDS,
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [{ url: siteUrl(DEFAULT_OG_IMAGE), width: 1200, height: 630, alt: SITE_TITLE }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@devsloka_ui",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [{ url: siteUrl(DEFAULT_OG_IMAGE), alt: SITE_TITLE }],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon-light.png", type: "image/png", media: "(prefers-color-scheme: light)" },
      { url: "/favicon-dark.png", type: "image/png", media: "(prefers-color-scheme: dark)" },
      { url: "/favicon.ico", sizes: "any", type: "image/x-icon" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon.ico",
  },
  manifest: "/site.webmanifest",
};
