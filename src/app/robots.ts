// src/app/robots.ts
import type { MetadataRoute } from "next";
import { IS_PRODUCTION, SITE_URL } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  // Preview deployments get a blanket disallow. Every pushed branch gets its
  // own public URL on Vercel; indexed, they compete with production for the
  // same content and dilute it.
  if (!IS_PRODUCTION) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }

  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
