// src/components/sections/Currently.tsx
//
// The band between Act III and Act IV: a ticker, then a single line of what is
// being built right now.
//
// Server component — the marquee is CSS and the copy is static, so this ships
// no JavaScript at all. It is an interstitial rather than an act, so it carries
// no act marker or index number; it reads as a rule between two chapters.

import Marquee from "@/components/ui/Marquee";
import { currently, ticker } from "@/lib/content";

export default function Currently() {
  return (
    <section aria-label="Currently" className="relative bg-void">
      <Marquee items={ticker} className="rule-t rule-b py-3.5" />

      <div className="flex flex-col gap-4 rule-b gutter py-10 md:flex-row md:items-baseline md:justify-between md:gap-10 md:py-12">
        <div className="flex items-baseline gap-4">
          <span className="eyebrow shrink-0 text-signal">
            {currently.eyebrow}
          </span>
          <p className="measure text-lead text-chalk text-balance">
            {currently.line}
          </p>
        </div>
        <span className="numeric shrink-0 text-label-sm text-ash tracking-eyebrow-wide">
          {currently.since}
        </span>
      </div>
    </section>
  );
}
