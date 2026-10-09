// src/lib/works.ts
//
// ──────────────────────────────────────────────────────────────────────────
// ACTION REQUIRED — the four narratives below are DRAFTS.
//
// Structure, voice and layout are final. The facts are not: I know these
// four projects only by name, so each `narrative` is a scaffold written in
// the right register, and every entry carries `draft: true`.
//
// Before this goes in front of anyone, replace per project:
//   narrative  the real problem, the real architectural decision, the real
//              outcome. Keep it to 2–3 sentences. If you have a number worth
//              quoting (latency, bundle size, query time, users) put it in —
//              but only a measured one. An invented metric is worse than
//              none, because the first person who asks about it will find out.
//   stack      the actual dependencies, not aspirational ones
//   year       confirm
//   live/source omit the key entirely if the link does not exist; the UI
//              renders only the triggers that are present
//   image      /public path to a screenshot; without it the card renders a
//              framed placeholder, which is deliberate, not broken
//
// Clear `draft: true` as each one is verified. Nothing renders differently
// because of the flag — it is a checklist you can grep.
// ──────────────────────────────────────────────────────────────────────────

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
  draft?: boolean;
};

export const works: Work[] = [
  {
    id: "vertex",
    title: "Vertex",
    category: "3D WEBGL",
    year: "2026",
    narrative:
      "A telemetry dashboard that draws to a single WebGL canvas instead of a DOM tree. Dense, continuously-updating readouts are the case where React's reconciler stops being free — every tick touches hundreds of nodes — so the render path moves to the GPU and React keeps only the shell and the controls.",
    stack: ["Three.js", "React Three Fiber", "TypeScript", "GLSL"],
    draft: true,
  },
  {
    id: "jurisbridge",
    title: "JurisBridge AI",
    category: "AI / SYSTEMS",
    year: "2026",
    narrative:
      "Legal text is long, repetitive, and expensive to pass through a model verbatim. JurisBridge sits between the document and the model: it segments source material, retrieves only the passages a question actually needs, and returns answers that cite the clause they came from rather than paraphrasing it away.",
    stack: ["Next.js", "Python", "Vector Search", "LLM API"],
    draft: true,
  },
  {
    id: "cozytte",
    title: "Cozytte",
    category: "FULL-STACK ARCHITECTURE",
    year: "2025",
    narrative:
      "A circular fashion platform, where the hard part is not the storefront but identity: every garment is a single physical object that changes hands repeatedly. The data model tracks the item rather than the listing, so ownership, condition and price history stay attached to the piece across its whole life.",
    stack: ["Next.js", "React", "Node.js", "SQL"],
    draft: true,
  },
  {
    id: "ambika",
    title: "Ambika Cycle Stores",
    category: "COMMERCE / CATALOG",
    year: "2025",
    narrative:
      "A working catalogue for a bicycle retailer whose inventory lived in a spreadsheet and a phone. Built around how the shop actually operates — stock that changes daily, specifications that matter to buyers, and a browsing path that survives a slow connection on a mid-range Android.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
    draft: true,
  },
];

export const WORK_COUNT = String(works.length).padStart(2, "0");
