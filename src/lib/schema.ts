// src/lib/schema.ts
//
// JSON-LD. Two entities: the Person being described, and the WebSite that
// describes them, linked by @id so a crawler reads them as one graph rather
// than two unrelated blobs.
//
// Server-rendered from the root layout. It is deliberately not injected on
// the client: a crawler that does not execute JavaScript, and every answer
// engine that reads the raw document, would otherwise see no structured data
// at all.

import { SITE, SITE_URL } from "@/lib/site";
import { socials } from "@/lib/content";

const PERSON_ID = `${SITE_URL}/#person`;
const SITE_ID = `${SITE_URL}/#website`;

// The share card, which is also the only image of the site that exists at a
// stable URL. Next serves app/opengraph-image.tsx at this path and appends a
// cache-busting hash to the <meta> version; the unhashed path serves the same
// image and does not change between deploys, which is what a @graph node
// wants.
const IMAGE_URL = `${SITE_URL}/opengraph-image`;

export function buildGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": PERSON_ID,
        name: SITE.name,
        jobTitle: SITE.jobTitle,
        url: SITE_URL,
        description: SITE.description,
        image: IMAGE_URL,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Mumbai",
          addressCountry: "IN",
        },
        // No `email`. Publishing a mailto in machine-readable form is an
        // invitation to every scraper that reads structured data, and the
        // address is already on the page for a human who wants it.
        knowsAbout: [
          "Next.js",
          "React",
          "TypeScript",
          "Three.js",
          "GSAP",
          "PostgreSQL",
          "Python",
        ],
        sameAs: socials.map((s) => s.href),
      },
      {
        "@type": "WebSite",
        "@id": SITE_ID,
        url: SITE_URL,
        name: SITE.name,
        description: SITE.description,
        inLanguage: "en",
        author: { "@id": PERSON_ID },
        publisher: { "@id": PERSON_ID },
      },
    ],
  };
}

/**
 * Serialise for embedding in a <script> tag.
 *
 * JSON.stringify happily emits a literal "</script>" if any value ever
 * contains one, which closes the tag early and turns the rest of the document
 * into executable markup. Escaping the angle brackets as < / > keeps
 * the JSON byte-identical to a parser while making that impossible. Cheap
 * insurance: these values are ours today, but socials is a data file that
 * someone will edit later.
 */
export function serializeGraph(): string {
  return JSON.stringify(buildGraph())
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026");
}
