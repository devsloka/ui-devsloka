import type { Metadata } from "next";
import { getSEOKeywords } from "./keywords";
import {
  DEFAULT_OG_IMAGE,
  PAGE_OG_IMAGES,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TITLE,
  SITE_URL,
  defaultSEO,
  siteUrl,
} from "./seo.config";

type SEOProps = {
  /** Page title without the site name; branding is added once here. */
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  keywords?: string[];
};

export const generateSEO = ({
  title,
  description = SITE_DESCRIPTION,
  path = "",
  image,
  keywords = [],
}: SEOProps = {}): Metadata => {
  const pageTitle = title ? `${title} | ${SITE_NAME}` : SITE_TITLE;
  const url = siteUrl(path);
  const selectedImage = image ?? PAGE_OG_IMAGES[new URL(url).pathname] ?? DEFAULT_OG_IMAGE;
  const imageUrl = new URL(selectedImage, `${SITE_URL}/`).toString();
  const imagePath = new URL(imageUrl).pathname;
  const isShareCard = imagePath === DEFAULT_OG_IMAGE || Object.values(PAGE_OG_IMAGES).includes(imagePath);
  const socialImage = {
    url: imageUrl,
    alt: `${title ?? SITE_NAME} preview`,
    ...(isShareCard ? { width: 1200, height: 630 } : {}),
  };

  return {
    ...defaultSEO,
    // Absolute avoids Next.js applying the root title template a second time.
    title: { absolute: pageTitle },
    description,
    keywords: getSEOKeywords(path, title, keywords),
    alternates: { canonical: url },
    openGraph: {
      ...defaultSEO.openGraph,
      title: pageTitle,
      description,
      url,
      images: [socialImage],
    },
    twitter: {
      ...defaultSEO.twitter,
      title: pageTitle,
      description,
      images: [socialImage],
    },
  };
};
