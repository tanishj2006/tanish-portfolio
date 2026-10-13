// src/app/sitemap.ts
//
// The acts on the home page are in-page anchors rather than routes, so
// listing fragments here would misreport the structure. /work and the four
// case pages are real routes and belong in the index.
//
// No changefreq, no priority. Google has said for years that it ignores
// both, and keeping them is worse than useless: they read as a claim the
// site cannot back up and they invite exactly the kind of drift that makes
// the rest of the file untrustworthy.
//
// lastmod is the one field here that still carries weight, and only while it
// is honest. `new Date()` would stamp every URL with the build time, which
// says "all five pages changed" after a deploy that changed a font. So each
// entry gets a date it can actually justify: the case pages and the home
// page from the dates in works.ts, and /work from the newest repository it
// lists, which is the thing that genuinely changes it between deploys.

import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { works, WORKS_UPDATED } from "@/lib/works";
import { getRepos } from "@/lib/archive";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // getRepos never throws: on a rate limit or a network failure it returns
  // the static fallback, whose dates are real. So this cannot fail a build.
  const { repos } = await getRepos();
  const archiveUpdated =
    repos
      .map((r) => r.updated)
      .sort()
      .at(-1) ?? WORKS_UPDATED;

  return [
    {
      url: SITE_URL,
      // The home page is the deck, so it is current as of the newest work on
      // it. Editing a narrative in works.ts and bumping that entry's
      // `updated` moves this too, which is the correct coupling.
      lastModified: new Date(WORKS_UPDATED),
    },
    {
      url: `${SITE_URL}/work`,
      lastModified: new Date(archiveUpdated),
    },
    ...works.map((work) => ({
      url: `${SITE_URL}/work/${work.id}`,
      lastModified: new Date(work.updated),
    })),
  ];
}
