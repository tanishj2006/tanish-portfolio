// src/lib/ledger.ts
//
// The technical ledger: disciplines, the technologies that sit in each, and
// what the discipline is actually for.
//
// Deliberately no proficiency percentages. A bar reading "Three.js 50%" is
// both unverifiable and self-diminishing — it invites a reader to discount
// you by a number you made up. A spec sheet states what the system is built
// from and what each layer does; the work in Act III is the evidence.

export type LedgerRow = {
  discipline: string;
  technologies: string[];
  role: string;
};

export const ledger: LedgerRow[] = [
  {
    discipline: "Core Architecture",
    technologies: ["Next.js 16", "React 19", "TypeScript"],
    role: "App Router server components, typed end to end, static by default.",
  },
  {
    discipline: "Interface & Motion",
    technologies: ["Tailwind v4", "GSAP / ScrollTrigger", "Lenis"],
    role: "Frame-locked choreography on a single ticker, with reduced-motion parity rather than a reduced-motion afterthought.",
  },
  {
    discipline: "Graphics & Runtime",
    technologies: ["Three.js", "React Three Fiber", "GLSL"],
    role: "GPU render paths for the cases where a DOM tree stops being free.",
  },
  {
    discipline: "Systems & Data",
    technologies: ["Java", "Python", "SQL", "C"],
    role: "Relational modelling, data structures, and the layer underneath the framework.",
  },
  {
    discipline: "Tooling & Delivery",
    technologies: ["Git", "Vercel", "ESLint"],
    role: "Preview deploys per branch and design tokens enforced in CI, not by memory.",
  },
];
