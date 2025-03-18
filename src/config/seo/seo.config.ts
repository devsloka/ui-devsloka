import { Metadata } from "next";

const baseURL = "https://ui.devsloka.in";

export const defaultSEO: Metadata = {
  title: {
    default:
      "DevsLoka UI | Premium Components , Blocks and Templates For React.js , Next.js , Remix.js and React-Router-Dom v7.0.0",
    template: "%s | DevsLoka UI ",
  },
  description:
    "DevsLoka UI | Premium Components , Blocks and Templates For React , Next.js , Remix.js and React-Router-Dom v7.0.0",
  keywords: [
    "devsloka",
    "devsloka ui",
    "devsloka ui components",
    "devsloka ui blocks",
    "devsloka ui templates",
    "devsloka ui react",
    "devsloka ui nextjs",
    "devsloka ui remixjs",
    "devsloka ui react-router-dom",
    "devsloka ui react-router-dom v7",
  ],
  metadataBase: new URL(baseURL),
  alternates: {
    canonical: baseURL,
  },
  openGraph: {
    type: "website",
    url: baseURL,
    siteName: "DevsLoka",
    images: [
      {
        url: `${baseURL}/og-default.jpg`,
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@devsloka_in",
    creator: "@devsloka_tech",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
};
