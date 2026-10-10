import type { MetadataRoute } from "next";
import { SITE_URL, siteUrl } from "@/config/seo/seo.config";

export default function robots(): MetadataRoute.Robots {
  return {
    // Keep CSS, JavaScript, images, registry JSON, and AI guides crawlable.
    rules: { userAgent: "*", allow: "/" },
    sitemap: siteUrl("sitemap.xml"),
    host: SITE_URL,
  };
}
