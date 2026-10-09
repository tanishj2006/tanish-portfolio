"use client";
// src/components/sections/Hero.tsx — Act I: The Entry
//
// Full-dvh brutalist masthead: authored headline lines revealed behind
// overflow masks, over a mono metadata bar.
//
// Why hand-authored line masks instead of SplitText:
//   The headline is fluid (clamp on vw), so with SplitText the line breaks
//   move as the viewport changes and every resize needs a re-split — which
//   re-measures, re-wraps and can shift layout mid-animation. Fixed breaks
//   from content.ts are deterministic, survive resize untouched, and are
//   what a typeset brutalist headline wants anyway. The `line-clip` utility
//   supplies the mask; GSAP only moves the inner span.
//
// No-JS: the inner spans ship translated out of view so GSAP can bring them
// in without a flash of final position. The <noscript> block below resets
// them, so the headline is still readable with JavaScript disabled.

import { useRef } from "react";
import { useGSAPContext } from "@/hooks/useGSAPContext";
import { gsap } from "@/lib/gsap";
import { hero, BUILD_VERSION } from "@/lib/content";
import LocalTime from "@/components/ui/LocalTime";
import SpecCard from "@/components/ui/SpecCard";

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAPContext(
    (ctx) => {
      const reduced = !ctx.conditions?.motion;
      const lines = gsap.utils.toArray<HTMLElement>("[data-hero-line]");
      const fades = gsap.utils.toArray<HTMLElement>("[data-hero-fade]");

      // Every tween below pins `y: 0` alongside `yPercent`, and that is load
      // bearing. getComputedStyle reports `transform` as a MATRIX, so GSAP
      // reads the markup's `translateY(115%)` back as `y: 183px,
      // yPercent: 0` — it cannot tell a percentage from pixels once the
      // browser has resolved it. A plain `to({ yPercent: 0 })` is then a
      // no-op against a start state GSAP believes is already 0, and the
      // headline never leaves its mask. Writing both components explicitly
      // makes GSAP own the whole transform and zero the stale pixel offset.
      if (reduced) {
        // Static, full-contrast end state. No motion, no scroll dependency.
        gsap.set(lines, { yPercent: 0, y: 0 });
        gsap.set(fades, { opacity: 1, y: 0 });
        return;
      }

      const tl = gsap.timeline({
        defaults: { ease: "expo.out" }, // matches --ease-editorial
      });

      tl.fromTo(
        lines,
        { yPercent: 115, y: 0 },
        { yPercent: 0, y: 0, duration: 1.1, stagger: 0.075 },
      ).fromTo(
        fades,
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.06 },
        "-=0.65",
      );
    },
    { scope: root, media: true },
  );

  return (
    <header
      ref={root}
      id="hero"
      // pt is tied to --nav-h rather than a fixed scale step: the masthead is
      // fixed, so this is the only thing keeping the act marker out from under
      // it, and a hard-coded value silently breaks if the bar height changes.
      // It was pt-24/md:pt-28, which pushed the whole column down far enough
      // that the metadata bar fell below the fold on a laptop viewport.
      className="relative flex min-h-dvh flex-col justify-between gutter pt-[calc(var(--nav-h)+1rem)] pb-8"
    >
      <noscript>
        {/* Without JS the entrance never runs, so neutralise the start state. */}
        <style>{`[data-hero-line]{transform:none!important}[data-hero-fade]{opacity:1!important;transform:none!important}`}</style>
      </noscript>

      {/* ── Masthead rule ────────────────────────────────────────────── */}
      <div
        data-hero-fade
        className="flex items-baseline justify-between rule-b pb-3 opacity-0"
        style={{ transform: "translateY(8px)" }}
      >
        <span className="eyebrow">
          {hero.act} <span className="text-chalk">/ {hero.actTitle}</span>
        </span>
        <span className="numeric text-label-sm text-signal tracking-eyebrow-wide">
          {hero.index}
        </span>
      </div>

      {/* ── Headline ─────────────────────────────────────────────────── */}
      {/* Headline and spec card share a row, bottom-aligned. Putting the card
          beside the headline rather than under it fills the right-hand void
          without adding a single pixel of height, which matters because the
          whole hero has to stay above the fold on a short laptop window. */}
      <div className="my-4 grid items-end gap-8 md:my-6 lg:grid-cols-12 lg:gap-10">
        <h1
          className="font-display text-name tracking-brutal font-semibold uppercase lg:col-span-8"
          // The visible text is the sum of the lines; give AT a clean version.
          aria-label={hero.headline.join(" ")}
        >
          {hero.headline.map((line, i) => (
            <span key={line} className="line-clip" aria-hidden="true">
              <span
                data-hero-line
                // nowrap is not cosmetic. line-clip is overflow:hidden sized
                // for one line, so if a line wraps the overflow is not
                // reflowed, it is clipped away: "FULL STACK" silently
                // rendered as "FULL" at 1024, 1280 and 1440. The breaks here
                // are authored in content.ts and must stay authored.
                className="block whitespace-nowrap"
                style={{ transform: "translateY(115%)" }}
              >
                {line}
                {/* One accent glyph, on the last line only. At display size it
                  reads from across the room while costing almost nothing
                  against the under-5%-of-viewport accent budget, and it
                  echoes the share card. */}
                {i === hero.headline.length - 1 && (
                  <span className="text-signal">.</span>
                )}
              </span>
            </span>
          ))}
        </h1>

        <aside
          aria-label="Technical specification"
          // Desktop only. Below lg the grid collapses to one column, so the
          // card would stack under the headline and push the metadata bar
          // off the fold on a phone or a tablet in portrait. Everything it
          // states also appears in the metadata bar or Act IV.
          className="hidden lg:col-span-4 lg:block"
        >
          <SpecCard />
        </aside>
      </div>

      {/* ── Lede + metadata ──────────────────────────────────────────── */}
      <div className="flex flex-col gap-8">
        <p
          data-hero-fade
          className="measure text-lead text-slate opacity-0"
          style={{ transform: "translateY(8px)" }}
        >
          {hero.lede}
        </p>

        <div
          data-hero-fade
          className="flex flex-col gap-3 rule-t pt-3 opacity-0 md:flex-row md:items-center md:justify-between md:gap-6"
          style={{ transform: "translateY(8px)" }}
        >
          <LocalTime
            timeZone={hero.zone}
            label={`${hero.place} [${hero.zoneLabel}]`}
          />

          <span className="flex items-center gap-2.5">
            {/* Square, not a dot — the pill vocabulary is what we removed.
                The global prefers-reduced-motion rule stops the pulse. */}
            <span className="relative flex size-1.5 shrink-0">
              <span className="absolute inset-0 animate-ping bg-signal opacity-75" />
              <span className="relative size-1.5 bg-signal" />
            </span>
            <span className="eyebrow text-chalk">{hero.status}</span>
          </span>

          <span className="numeric text-label-sm text-ash tracking-eyebrow-wide">
            {BUILD_VERSION}
          </span>
        </div>
      </div>
    </header>
  );
}
