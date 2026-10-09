// src/lib/ledger.ts
//
// The technical ledger: disciplines, the technologies that sit in each, and
// what the discipline is actually for.
//
// Deliberately no proficiency percentages. A bar reading "Three.js 50%" is
// unverifiable and self-diminishing: it invites a reader to discount you by a
// number you made up. This states what each layer is for; Act III is the
// evidence.

export type LedgerRow = {
  discipline: string;
  technologies: string[];
  role: string;
};

export const ledger: LedgerRow[] = [
  {
    discipline: "Core Architecture",
    technologies: ["Next.js 16", "React 19", "TypeScript"],
    role: "Server components and routing, typed throughout, and static wherever it can be.",
  },
  {
    discipline: "Interface & Motion",
    technologies: ["Tailwind v4", "GSAP / ScrollTrigger", "Lenis"],
    role: "Scroll and animation work, built so the page still reads properly with motion turned off.",
  },
  {
    discipline: "Graphics & Runtime",
    technologies: ["Three.js", "React Three Fiber", "GLSL"],
    role: "Canvas and shader work for things the DOM is too slow to draw.",
  },
  {
    discipline: "Systems & Data",
    technologies: ["Java", "Python", "SQL", "C"],
    role: "Schema design, queries, and the data structures coursework that sits under all of it.",
  },
  {
    discipline: "Tooling & Delivery",
    technologies: ["Git", "Vercel", "ESLint"],
    role: "Version control, preview builds, and linting that catches design drift before review.",
  },
];
