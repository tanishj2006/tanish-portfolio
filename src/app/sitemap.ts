// src/app/sitemap.ts
import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  // Single-page site: the acts are in-page anchors, not routes, and listing
  // fragments as separate URLs would be misreporting the structure.
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
