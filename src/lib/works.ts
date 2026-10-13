// src/lib/works.ts
//
// The four featured works in Act III. Everything here is real: live URLs,
// public repositories, and narratives written from the projects themselves
// rather than from their names.
//
// The deck renders only the action triggers that exist, so omitting `live` or
// `source` hides that link rather than producing a dead button. Add an
// `image` path under /public and the framed placeholder becomes a screenshot.

export type Work = {
  /** Also the URL slug for /work/<id>. Keep it lowercase and hyphenated. */
  id: string;
  title: string;
  category: string;
  year: string;
  narrative: string;
  stack: string[];
  live?: string;
  source?: string;
  image?: string;
  /**
   * What the screenshot actually shows, for a reader who cannot see it. Not
   * "<title> interface": alt text that only repeats the heading beside it
   * tells a screen reader nothing it did not already have, and tells an
   * image crawler nothing at all. Describe the frame.
   */
  imageAlt?: string;
  /**
   * When THIS entry's copy last changed, as YYYY-MM-DD. It feeds <lastmod>
   * in the sitemap, so it has to be a real date: a lastmod that moves on
   * every deploy tells a crawler the page changed when it did not, and
   * Google discounts the signal across the whole sitemap once it catches
   * you doing it. Bump only the entry you actually edited.
   */
  updated: string;
};

export const works: Work[] = [
  {
    id: "jaylaxmi",
    title: "Jay Laxmi Light House",
    category: "FULL-STACK & DIGITAL CATALOGUE",
    year: "2026",
    updated: "2026-10-13",
    narrative:
      "Production lighting catalogue engine architected for high organic discovery and zero layout shift. Engineered with programmatic SEO, localized schema markup, and geo-targeted optimization, delivering near-perfect Lighthouse scores and sub-second edge routing.",
    stack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Supabase",
      "SEO / JSON-LD",
      "Edge Caching",
    ],
    live: "https://jaylaxmilighthouse.in/",
    image: "/work/jay-laxmi.webp",
    imageAlt:
      'Jay Laxmi Light House home page: a dark hero reading "Illuminate Every Room With Quiet Luxury", with Categories, Brands, Catalogue and Showroom navigation and an Explore the Catalogue call to action.',
  },
  {
    id: "ambika",
    title: "Ambika Cycle Stores",
    category: "E-COMMERCE ARCHITECTURE",
    year: "2026",
    updated: "2026-10-13",
    narrative:
      "Full-scale commercial cycle retail storefront deployed on Zoho Commerce. Engineered end-to-end catalog taxonomy, hierarchical variant groupings, custom styling layers, and integrated cart/checkout flows for seamless multi-device browsing.",
    stack: [
      "Zoho Commerce",
      "Liquid / Custom CSS",
      "Inventory Workflows",
      "Commerce APIs",
    ],
    live: "https://www.ambikacyclestores.com/",
    image: "/work/ambika.webp",
    imageAlt:
      'Ambika Cycle Stores storefront: a road bike on a turbo trainer behind the headline "Train Smarter. Ride Stronger.", above the Launch Collection product grid.',
  },
  {
    id: "jurisbridge",
    title: "JurisBridge AI",
    category: "AI SYSTEMS & LEGAL INTELLIGENCE",
    year: "2026",
    updated: "2026-10-13",
    narrative:
      "AI-powered legal document extraction and intelligence pipeline. Implemented client-side PII scrubbing and automated entity redaction before dispatching structured payloads to generative analysis models.",
    stack: [
      "Next.js",
      "TypeScript",
      "Google Gemini API",
      "PII Sanitization",
      "Tailwind CSS",
    ],
    source: "https://github.com/tanishj2006/JurisBridge-AI",
    image: "/work/jurisbridge.webp",
    imageAlt:
      "JurisBridge AI interface: a persona selector set to Tenant / Renter, a Paste Legal Contract Text field badged Privacy Guardrail Active, and a note that emails, phone numbers, SSNs and credit cards are scrubbed locally before analysis.",
  },
  {
    // Narrative written from the repository's own README and package.json,
    // not from the project name. No screenshot by choice: this one ships as
    // source only.
    id: "urban-incident",
    title: "Urban Incident Response",
    category: "MULTIMODAL AI & CIVIC SYSTEMS",
    year: "2026",
    updated: "2026-10-13",
    narrative:
      "Turns fragmented citizen reports (photographs, written descriptions, voice notes and GPS) into structured, de-duplicated, prioritised incidents routed to the department that owns them. The human-in-the-loop rules are enforced in code rather than documented: closure refuses without post-action evidence, a priority override is stored beside the recommendation instead of replacing it, and a low-confidence category is withheld into a triage queue. Every intake emits a trace of what each pipeline stage did and how long it took.",
    stack: [
      "Next.js",
      "TypeScript",
      "Google Gemini API",
      "Leaflet",
      "Geo-temporal Dedup",
    ],
    source: "https://github.com/tanishj2006/Urban-Incident-Response",
  },
];

export const WORK_COUNT = String(works.length).padStart(2, "0");

/** Slugs for generateStaticParams, so /work/<slug> is prerendered. */
export const workSlugs = works.map((w) => w.id);

export function getWork(slug: string): Work | undefined {
  return works.find((w) => w.id === slug);
}

/** Newest entry date, for the /work index <lastmod>. */
export const WORKS_UPDATED = works
  .map((w) => w.updated)
  .sort()
  .at(-1) as string;
