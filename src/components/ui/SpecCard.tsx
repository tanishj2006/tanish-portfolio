// src/components/ui/SpecCard.tsx
//
// The technical spec panel in Act I's right column. Flat surface, hairline
// frame, mono throughout.
//
// Server component: static content, no JavaScript.
//
// Values are set at --text-label rather than --text-caption so the longest
// row ("NEXT.JS / TYPESCRIPT / POSTGRES", 31 characters) fits beside its key
// without wrapping in a four-column-wide card. Keys are fixed-width so the
// values form a clean right edge.

import CornerTicks from "@/components/ui/CornerTicks";
import { spec } from "@/lib/content";

export default function SpecCard() {
  return (
    <div className="relative border border-neutral-800 bg-void">
      <CornerTicks />

      <div className="rule-b px-4 py-2.5">
        <span className="eyebrow text-signal">[{spec.label}]</span>
      </div>

      <dl className="flex flex-col px-4 py-3">
        {spec.rows.map(([key, value]) => (
          <div
            key={key}
            className="flex items-baseline justify-between gap-4 py-1.5"
          >
            <dt className="numeric shrink-0 text-label text-ash tracking-eyebrow">
              {key}
            </dt>
            <dd className="numeric text-right text-label text-chalk tracking-eyebrow">
              {value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
