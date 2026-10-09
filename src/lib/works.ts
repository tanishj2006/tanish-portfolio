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
  id: string;
  title: string;
  category: string;
  year: string;
  narrative: string;
  stack: string[];
  live?: string;
  source?: string;
  image?: string;
};

export const works: Work[] = [
  {
    id: "jaylaxmi",
    title: "Jay Laxmi Light House",
    category: "FULL-STACK & DIGITAL CATALOGUE",
    year: "2026",
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
  },
  {
    id: "ambika",
    title: "Ambika Cycle Stores",
    category: "E-COMMERCE ARCHITECTURE",
    year: "2026",
    narrative:
      "Full-scale commercial cycle retail storefront deployed on Zoho Commerce. Engineered end-to-end catalog taxonomy, hierarchical variant groupings, custom styling layers, and integrated cart/checkout flows for seamless multi-device browsing.",
    stack: [
      "Zoho Commerce",
      "Liquid / Custom CSS",
      "Inventory Workflows",
      "Commerce APIs",
    ],
    live: "https://www.ambikacyclestores.com/",
  },
  {
    id: "jurisbridge",
    title: "JurisBridge AI",
    category: "AI SYSTEMS & LEGAL INTELLIGENCE",
    year: "2026",
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
  },
  {
    // Narrative written from the repository's own README and package.json,
    // not from the project name. Note for the record: this is a three-person
    // academic project (TYCM-2, SAKEC) rather than solo work, worth stating
    // somewhere if a reader is likely to assume otherwise.
    id: "urban-incident",
    title: "Urban Incident Response",
    category: "MULTIMODAL AI & CIVIC SYSTEMS",
    year: "2026",
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
