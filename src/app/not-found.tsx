// src/app/not-found.tsx
//
// Server component, zero JavaScript.
//
// It renders inside the root layout, so SmoothScroll, Grain and SkipLink all
// apply — but NOT the masthead, which lives in page.tsx rather than the
// layout. Without its own identifier bar this page would be chrome-less, so it
// carries a minimal one: no index links (there is nothing to anchor to here),
// just the wordmark linking home.

import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { BUILD_VERSION } from "@/lib/content";

export const metadata: Metadata = {
  title: "404 — Not Found",
  // The root layout allows indexing in production; without this override that
  // would extend to every 404 the site serves.
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="flex min-h-dvh flex-col">
      {/* Minimal masthead — the real one is mounted by page.tsx. */}
      <header className="rule-b">
        <div className="flex h-[var(--nav-h)] items-center justify-between gutter">
          <Link
            href="/"
            className="eyebrow text-chalk transition-colors duration-[--duration-swift] ease-swift hover:text-signal"
          >
            TANISH JAIN // ENG
          </Link>
          <span className="numeric text-label-sm text-ash tracking-eyebrow-wide">
            {BUILD_VERSION}
          </span>
        </div>
      </header>

      <main className="flex flex-1 flex-col justify-between gutter py-14 md:py-20">
        <div className="flex items-baseline justify-between rule-b pb-3">
          <span className="eyebrow">
            ERR <span className="text-signal">/ 404</span>
          </span>
          <span className="numeric text-label-sm text-ash tracking-eyebrow-wide">
            NOT FOUND
          </span>
        </div>

        <div className="flex flex-col gap-8 py-12">
          {/* Same pattern as the hero: line-clip spans are display:block, so
              textContent runs the lines together ("THIS PAGEWAS NEVER.BUILT")
              and that is what a screen reader announces. The visual lines are
              aria-hidden and the heading carries a clean label. */}
          <h1
            className="font-display text-hero tracking-brutal font-semibold uppercase"
            aria-label="Page not found"
          >
            <span className="line-clip" aria-hidden="true">
              <span className="block">PAGE NOT</span>
            </span>
            <span className="line-clip" aria-hidden="true">
              <span className="block">
                FOUND<span className="text-signal">.</span>
              </span>
            </span>
          </h1>

          <p className="measure text-lead text-slate">
            There&apos;s nothing at this address. It may have moved, or it may
            never have been here.
          </p>

          <div>
            <Link
              href="/"
              className="group inline-flex items-center gap-2.5 border border-rule-strong px-5 py-3.5 eyebrow text-chalk transition-colors duration-[--duration-swift] ease-swift hover:invert-surface"
            >
              <ArrowLeft
                className="size-3.5 transition-transform duration-[--duration-swift] ease-editorial group-hover:-translate-x-0.5"
                strokeWidth={1.5}
                aria-hidden="true"
              />
              RETURN TO INDEX
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-3 rule-t pt-3 md:flex-row md:items-center md:justify-between">
          <span className="eyebrow">HTTP 404 / RESOURCE NOT FOUND</span>
          <span className="eyebrow">MUMBAI, IN</span>
        </div>
      </main>
    </div>
  );
}
