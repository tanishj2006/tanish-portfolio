// scripts/lint-design.mjs
//
// Enforces the v2 art direction mechanically, because taste does not survive
// a late-night commit. Run via `npm run lint:design`.
//
// Each rule is a regex over src/**. Anything matched is a pattern the brief
// explicitly rules out, or a v1 leftover that should have been removed.

import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

// Files still carrying v1 art direction. Violations here are REPORTED as
// pending work but do not fail the run — this doubles as the v2 rewrite
// checklist. Delete each entry as the component is rebuilt; when the list is
// empty, remove it along with the v1 bridge block at the end of globals.css.
const LEGACY = [
  "src/components/sections/Skills.module.css",
  "src/components/sections/Contact.module.css",
];

const ROOT = new URL("..", import.meta.url).pathname;
const SRC = join(ROOT, "src");
const SELF = join(ROOT, "src/app/globals.css");

const RULES = [
  {
    id: "no-glassmorphism",
    re: /\bbackdrop-(blur|filter)\b|backdrop-filter\s*:/,
    why: "Glassmorphism is out. Use a flat bg-ink block with a 1px rule instead.",
  },
  {
    id: "no-blob-radii",
    re: /\brounded-(2xl|3xl|4xl|full)\b|border-radius\s*:\s*(1[2-9]|[2-9]\d|\d{3,})px/,
    why: "Pill/blob geometry. Radii are capped at 4px — prefer rounded-none.",
  },
  {
    id: "no-multicolour-gradients",
    re: /\b(bg|from|via|to)-gradient|bg-gradient-to-|linear-gradient\((?![^)]*\b(transparent|currentColor)\b)[^)]*,[^)]*,[^)]*\)/,
    why: "No multi-stop gradients. Two-stop fades to transparent are fine.",
  },
  {
    id: "no-glow-orbs",
    re: /blur-(2xl|3xl)|box-shadow\s*:[^;]*\b(0 0 \d{2,}px)/,
    why: "Glowing blur circles are the signature of the look we are leaving.",
  },
  {
    id: "no-v1-palette",
    re: /#0066ff|#00aaff|\b(indigo|violet|purple|fuchsia|sky|cyan)-\d{2,3}\b/i,
    why: "v1 indigo/blue palette. The only accent is --color-signal.",
  },
  {
    id: "no-v1-tokens",
    re: /var\(--(bg-oled|bg-surface|text-primary|text-secondary|text-muted|border-subtle|accent-blue|accent-glow|radius-card|radius-btn)\)/,
    why: "v1 token. Use --color-void / --color-chalk / --color-rule / --color-signal.",
  },
  {
    id: "no-adhoc-gutters",
    re: /px-6\s+md:px-16\s+lg:px-24/,
    why: "Use the `gutter` utility so the editorial margin cannot drift.",
  },
];

function walk(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) out.push(...walk(full));
    else if (/\.(tsx?|css|mts)$/.test(name)) out.push(full);
  }
  return out;
}

/**
 * Blank out comments so rationale prose ("no backdrop-blur here") and
 * commented-out code never trip a rule. Line structure is preserved so
 * reported line numbers stay accurate.
 */
function stripComments(source) {
  return source
    .replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "))
    .replace(/(^|[^:"'`\\])\/\/[^\n]*/g, (m, p1) => p1 + " ".repeat(m.length - p1.length));
}

const blocking = [];
const pending = [];

for (const file of walk(SRC)) {
  const rel = relative(ROOT, file);
  const isLegacy = LEGACY.includes(rel);
  // globals.css legitimately declares the v1 bridge aliases.
  const skipV1Tokens = file === SELF;
  const lines = stripComments(readFileSync(file, "utf8")).split("\n");

  lines.forEach((line, i) => {
    for (const rule of RULES) {
      if (skipV1Tokens && rule.id === "no-v1-tokens") continue;
      if (!rule.re.test(line)) continue;
      (isLegacy ? pending : blocking).push({
        where: `${rel}:${i + 1}`,
        rule: rule.id,
        line: line.trim(),
        why: rule.why,
      });
    }
  });
}

const stale = LEGACY.filter(
  (rel) => !pending.some((p) => p.where.startsWith(`${rel}:`)),
);

if (pending.length) {
  const byFile = new Map();
  for (const p of pending) {
    const f = p.where.split(":")[0];
    byFile.set(f, (byFile.get(f) ?? 0) + 1);
  }
  console.log(`v1 rewrite checklist — ${pending.length} violation(s) in ${byFile.size} file(s):`);
  for (const [f, n] of [...byFile].sort((a, b) => b[1] - a[1])) {
    console.log(`  ${String(n).padStart(3)}  ${f}`);
  }
  console.log("");
}

if (stale.length) {
  console.log("LEGACY entries that are now clean — remove them from scripts/lint-design.mjs:");
  for (const f of stale) console.log(`  ${f}`);
  console.log("");
}

if (blocking.length) {
  for (const b of blocking) {
    console.error(`\n${b.where}  [${b.rule}]\n  ${b.line}\n  → ${b.why}`);
  }
  console.error(`\n✗ ${blocking.length} design-token violation(s) in v2 code.\n`);
  process.exit(1);
}

console.log("✓ no design-token violations outside the v1 rewrite checklist");
