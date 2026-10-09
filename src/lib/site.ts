// src/lib/site.ts
//
// Single source of truth for anything that needs an absolute URL: metadata,
// canonical links, OpenGraph, JSON-LD, sitemap and robots.
//
// Resolution order, most specific first:
//   1. NEXT_PUBLIC_SITE_URL                        — a custom domain, once you have one
//   2. NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL   — Vercel's own production domain
//   3. the literal below                           — local and last resort
//
// Step 2 matters: it resolves to the PRODUCTION domain even inside a preview
// build, which is what a canonical URL must point at. Hard-coding the domain
// means every preview advertises itself as canonical, and the one that is
// wrong by a character silently tells search engines the real site is a copy.
//
// ⚠ VERIFY THIS: the brief gave "tanishj-portfolio.vercel.app", but the Vercel
// project in this repo's PR deploys as "tanish-portfolio" (preview host
// tanish-portfolio-git-…-tanishj2006s-projects.vercel.app) — no "j". If the
// production host really is tanish-portfolio.vercel.app, the fallback below is
// wrong. Setting NEXT_PUBLIC_SITE_URL, or leaving Vercel's system environment
// variables exposed so step 2 applies, makes this moot.

function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");

  const vercel = process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel.replace(/\/$/, "")}`;

  return "https://tanishj-portfolio.vercel.app";
}

export const SITE_URL = resolveSiteUrl();

/** Vercel sets this to "production" | "preview" | "development". */
export const IS_PRODUCTION = process.env.NEXT_PUBLIC_VERCEL_ENV
  ? process.env.NEXT_PUBLIC_VERCEL_ENV === "production"
  : process.env.NODE_ENV === "production";

export const SITE = {
  name: "Tanish Jain",
  title: "Tanish Jain, Full-Stack Developer in Mumbai",
  jobTitle: "Full-Stack Developer",
  description:
    "Full-stack developer in Mumbai. Selected web projects, the tools behind them, and how to get in touch.",
  locale: "en_US",
  url: SITE_URL,
} as const;
