import type { MetadataRoute } from "next";
import { siteUrl } from "@/config/seo/seo.config";
import { CHANGELOG } from "@/lib/changelog";
import { PUBLIC_PAGE_PATHS } from "@/lib/seo-content";

export default function sitemap(): MetadataRoute.Sitemap {
  return [...new Set(PUBLIC_PAGE_PATHS)].map((path) => ({
    url: siteUrl(path),
    // Use an actual content date rather than stamping every URL at each build.
    ...(path === "/changelog" && CHANGELOG[0]
      ? { lastModified: CHANGELOG[0].dateTime }
      : {}),
  }));
}
