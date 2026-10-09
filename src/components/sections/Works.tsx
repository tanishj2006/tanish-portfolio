"use client";
// src/components/sections/Works.tsx — Act III: Selected Works / Artifacts
//
// A sticky stacked deck. Each article sticks beneath the masthead at a
// slightly lower offset than the one before, so as you scroll the next work
// slides over the last and the stack stays visible at the top edge.
//
// Why CSS sticky and not a second ScrollTrigger pin:
//   Act II already owns a pin. Pinning four more elements means four more
//   pin-spacers, and every refresh re-measures and re-writes all of them —
//   which is exactly the layout thrash this section is supposed to avoid.
//   `position: sticky` is native, needs no spacer, costs nothing to unpin,
//   and cannot leak. ScrollTrigger is used only to scrub the compress, so
//   there is nothing to unpin here at all.
//
// Reduced motion is handled in CSS, not JS: `motion-safe:sticky` means the
// deck is a plain vertical list with rule dividers when the user asks for
// reduced motion, with no class swap after hydration and so no flash.

import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { useGSAPContext } from "@/hooks/useGSAPContext";
import { gsap } from "@/lib/gsap";
import { works, WORK_COUNT } from "@/lib/works";
import CornerTicks from "@/components/ui/CornerTicks";

export default function Works() {
  const root = useRef<HTMLElement>(null);

  useGSAPContext(
    (ctx) => {
      if (!ctx.conditions?.motion) return;

      const cards = gsap.utils.toArray<HTMLElement>("[data-work-card]");

      // Each card compresses as the NEXT one arrives over it. The last card
      // has nothing stacking on top, so it is left alone.
      //
      // Scale goes on the <article> and opacity goes on the inner body, and
      // that split is the whole trick. Fading the article itself makes its
      // own background translucent, so every card already stacked underneath
      // shows straight through it and the deck turns into a pile of
      // overlapping text. Keeping the article opaque means it reliably
      // covers its predecessors; only its contents dim.
      cards.forEach((card, i) => {
        const next = cards[i + 1];
        if (!next) return;

        const body = card.querySelector("[data-work-body]");

        const trigger = {
          trigger: next,
          start: "top 80%",
          end: "top top",
          scrub: 0.5,
          invalidateOnRefresh: true,
        } as const;

        gsap.to(card, { scale: 0.94, ease: "none", scrollTrigger: trigger });
        if (body) {
          gsap.to(body, {
            opacity: 0.25,
            ease: "none",
            scrollTrigger: trigger,
          });
        }
      });
    },
    { scope: root, media: true },
  );

  return (
    <section
      ref={root}
      id="work"
      className="relative bg-void scroll-mt-[var(--nav-h)]"
    >
      {/* ── Act marker ───────────────────────────────────────────────── */}
      <div className="flex items-baseline justify-between rule-b gutter pt-24 pb-3 md:pt-28">
        {/* A real <h2>: the project titles below are <h3>, and without a
            level-2 heading above them the document outline jumps h1 -> h3.
            Styled as an eyebrow — a heading does not have to be loud. */}
        <h2 className="eyebrow">
          ACT III <span className="text-chalk">/ Selected Works</span>
        </h2>
        <span className="numeric text-label-sm text-ash tracking-eyebrow-wide">
          003
        </span>
      </div>

      {/* ── The deck ─────────────────────────────────────────────────── */}
      <div className="relative">
        {works.map((work, i) => {
          const index = String(i + 1).padStart(2, "0");
          return (
            <article
              key={work.id}
              data-work-card
              // transform-origin at the top edge so a compressing card
              // shrinks away from the viewport top, keeping its own metadata
              // header visible as the next card covers the body.
              style={{
                top: `calc(var(--nav-h) + ${i * 0.75}rem)`,
                transformOrigin: "50% 0%",
              }}
              className="relative bg-void rule-t gutter py-10 motion-safe:sticky md:py-14"
            >
              <div data-work-body>
                {/* Metadata header */}
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 pb-8 md:pb-10">
                  <span className="numeric text-label text-ash tracking-eyebrow">
                    {index} <span className="text-ash">{"//"}</span>{" "}
                    {WORK_COUNT}
                  </span>
                  <span className="eyebrow text-slate">{work.category}</span>
                  <span className="numeric text-label text-ash tracking-eyebrow">
                    {work.year}
                  </span>
                </div>

                <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
                  {/* ── Text column ──────────────────────────────────── */}
                  <div className="flex flex-col gap-7 lg:col-span-6">
                    <h3 className="font-display text-headline tracking-editorial font-semibold uppercase">
                      {/* Hairline underline grows on hover; it is a
                        transform on a 1px box, so no reflow. */}
                      <span className="group relative inline-block">
                        {work.title}
                        <span
                          aria-hidden="true"
                          className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-signal transition-transform duration-[--duration-editorial] ease-editorial group-hover:scale-x-100"
                        />
                      </span>
                    </h3>

                    <p className="measure text-lead text-slate">
                      {work.narrative}
                    </p>

                    {/* Stack chips */}
                    <ul className="flex flex-wrap gap-2">
                      {work.stack.map((tech) => (
                        <li
                          key={tech}
                          className="numeric border border-rule px-2.5 py-1.5 text-label text-ash tracking-eyebrow uppercase"
                        >
                          {tech}
                        </li>
                      ))}
                    </ul>

                    {/* Action triggers — only rendered when the link exists. */}
                    {(work.live || work.source) && (
                      <div className="flex flex-wrap gap-x-8 gap-y-3 pt-1">
                        {work.live && (
                          <WorkLink
                            href={work.live}
                            label="VIEW ARTIFACT"
                            // Without the title these read as four identical
                            // links in a screen reader's link list.
                            title={work.title}
                            primary
                          />
                        )}
                        {work.source && (
                          <WorkLink
                            href={work.source}
                            label="SOURCE"
                            title={work.title}
                          />
                        )}
                      </div>
                    )}
                  </div>

                  {/* ── Preview ──────────────────────────────────────── */}
                  <div className="lg:col-span-6">
                    <div className="relative aspect-[4/3] w-full border border-rule bg-ink">
                      {work.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={work.image}
                          alt={`${work.title} interface`}
                          className="absolute inset-0 size-full object-cover"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="numeric text-label-sm text-ash tracking-eyebrow-wide uppercase">
                            {work.id} / no screenshot yet
                          </span>
                        </div>
                      )}

                      {/* Drafting marks, not decoration. */}
                      <CornerTicks />
                    </div>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function WorkLink({
  href,
  label,
  title,
  primary = false,
}: {
  href: string;
  label: string;
  title: string;
  primary?: boolean;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      aria-label={`${label}: ${title} (opens in a new tab)`}
      data-lenis-ignore
      className={`group inline-flex items-center gap-1.5 eyebrow transition-colors duration-[--duration-swift] ease-swift ${
        primary ? "text-chalk hover:text-signal" : "text-ash hover:text-chalk"
      }`}
    >
      [{label}
      <ArrowUpRight
        className="size-3 transition-transform duration-[--duration-swift] ease-editorial group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        strokeWidth={1.5}
        aria-hidden="true"
      />
      ]
    </a>
  );
}
