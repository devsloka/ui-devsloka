import { Metadata } from "next";
import { defaultSEO } from "./seo.config";

type SEOProps = {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
};

export const generateSEO = ({
  title,
  description,
  path,
  image,
}: SEOProps = {}): Metadata => {
  const url = path
    ? `${defaultSEO.metadataBase}${path}`
    : defaultSEO.metadataBase;

  return {
    ...defaultSEO,
    title: title || defaultSEO.title,
    description: description || defaultSEO.description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      ...defaultSEO.openGraph,
      url: url || undefined,
      images: image
        ? [
            {
              url: image,
              width: 1200,
              height: 630,
            },
          ]
        : defaultSEO.openGraph?.images,
    },
    twitter: {
      ...defaultSEO.twitter,
      images: image ? [image] : defaultSEO.twitter?.images,
    },
  };
};
