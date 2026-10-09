// src/app/sitemap.ts
import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  // The acts on the home page are in-page anchors rather than routes, so
  // listing fragments here would misreport the structure. /work is a real
  // route and belongs in the index.
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/work`,
      lastModified: new Date(),
      // It tracks the GitHub API on an hourly revalidate, so it genuinely
      // changes more often than the home page.
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];
}
