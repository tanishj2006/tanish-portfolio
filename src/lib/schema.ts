// src/lib/schema.ts
//
// JSON-LD. Two entities: the Person being described, and the WebSite that
// describes them, linked by @id so a crawler reads them as one graph rather
// than two unrelated blobs.

import { SITE, SITE_URL } from "@/lib/site";
import { socials } from "@/lib/content";
import { ledger } from "@/lib/ledger";

const PERSON_ID = `${SITE_URL}/#person`;
const SITE_ID = `${SITE_URL}/#website`;

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
        email: `mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL || "tanishj52@gmail.com"}`,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Mumbai",
          addressCountry: "IN",
        },
        // Derived from the ledger so the schema cannot drift from what the
        // page actually claims.
        knowsAbout: [
          ...new Set(ledger.flatMap((row) => row.technologies)),
          "Systems Design",
          "Web Performance",
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
 * insurance: these values are ours today, but socials and the ledger are data
 * files that someone will edit later.
 */
export function serializeGraph(): string {
  return JSON.stringify(buildGraph())
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026");
}
