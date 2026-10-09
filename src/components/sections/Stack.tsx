// src/components/sections/Stack.tsx — Act IV: Technical DNA / Systems Ledger
//
// A specification sheet, not a skills section. Rows divided by hairlines,
// each stating a discipline, what it is built from, and what it is for.
//
// Server component: the only interactive part is <SystemsStatus>, which
// carries its own "use client". Nothing else here needs JavaScript, so
// nothing else ships any.

import { ledger } from "@/lib/ledger";
import { stack } from "@/lib/content";
import SystemsStatus from "@/components/ui/SystemsStatus";

export default function Stack() {
  return (
    <section
      id="stack"
      className="relative bg-void scroll-mt-[var(--nav-h)]"
    >
      {/* ── Act marker ───────────────────────────────────────────────── */}
      <div className="flex items-baseline justify-between rule-b gutter pt-24 pb-3 md:pt-28">
        <span className="eyebrow">
          {stack.act} <span className="text-chalk">— {stack.actTitle}</span>
        </span>
        <span className="numeric text-label-sm text-ash tracking-eyebrow-wide">
          {stack.index}
        </span>
      </div>

      <div className="gutter py-14 md:py-20">
        {/* ── Statement + status widget ──────────────────────────────── */}
        <div className="grid gap-10 pb-14 md:pb-20 lg:grid-cols-12 lg:gap-12">
          <div className="flex flex-col gap-6 lg:col-span-7">
            <span className="eyebrow">{stack.eyebrow}</span>
            <h2 className="font-display max-w-[20ch] text-headline tracking-editorial font-semibold">
              {stack.statement}
            </h2>
          </div>
          <div className="lg:col-span-5">
            <SystemsStatus />
          </div>
        </div>

        {/* ── Ledger ─────────────────────────────────────────────────── */}
        <dl className="rule-t">
          {ledger.map((row, i) => (
            <div
              key={row.discipline}
              className="group grid gap-x-8 gap-y-3 rule-b py-6 md:py-7 lg:grid-cols-12 lg:items-baseline"
            >
              {/* Index + discipline */}
              <dt className="flex items-baseline gap-4 lg:col-span-4">
                <span className="numeric text-label-sm text-ash tracking-eyebrow-wide transition-colors duration-[--duration-swift] ease-swift group-hover:text-signal">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-display text-title tracking-editorial font-medium">
                  {row.discipline}
                </span>
              </dt>

              {/* Technologies */}
              <dd className="flex flex-wrap items-baseline gap-x-2 gap-y-1 lg:col-span-4">
                {row.technologies.map((tech, t) => (
                  <span key={tech} className="inline-flex items-baseline gap-2">
                    {t > 0 && (
                      <span aria-hidden="true" className="text-rule-strong">
                        /
                      </span>
                    )}
                    <span className="numeric text-caption text-chalk">
                      {tech}
                    </span>
                  </span>
                ))}
              </dd>

              {/* Architectural role */}
              <dd className="text-caption text-slate lg:col-span-4">
                {row.role}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
