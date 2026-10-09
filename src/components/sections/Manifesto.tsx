"use client";
// src/components/sections/Manifesto.tsx — Act II: The Shift
//
// A pinned viewport whose statement resolves word by word as the reader
// scrubs through it.
//
// On the dim→bright transition:
//   The brief asks for #262626 → #f5f5f5. Tweening `color` on ~70 spans
//   repaints text on every scrub frame. Tweening `opacity` instead is
//   composited, and over --color-void the two are indistinguishable:
//
//     #f5f5f5 at alpha a over #080808  ->  8 + (245 - 8) * a
//     a = 0.127  ->  38  ->  #262626   (exactly the requested floor)
//
//   So WORD_DIM below is not a magic number — it is #262626 expressed as
//   alpha. If --color-void changes, recompute it.
//
// Pin + Lenis: Lenis drives the real window scroll, so ScrollTrigger needs no
// scrollerProxy. SmoothScroll already calls ScrollTrigger.update() on every
// Lenis scroll event, which keeps the pin in step with the eased position.

import { useRef } from "react";
import { useGSAPContext } from "@/hooks/useGSAPContext";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { manifesto, tokenize } from "@/lib/content";

/** #262626 over #080808, as alpha. See note above. */
const WORD_DIM = 0.127;

export default function Manifesto() {
  const root = useRef<HTMLElement>(null);
  const pin = useRef<HTMLDivElement>(null);
  const progress = useRef<HTMLDivElement>(null);

  useGSAPContext(
    (ctx) => {
      const words = gsap.utils.toArray<HTMLElement>("[data-word]");
      if (!words.length) return;

      // Reduced motion: no pin, no scrub, no scroll hijack. The statement is
      // simply legible at full contrast.
      if (!ctx.conditions?.motion) {
        gsap.set(words, { opacity: 1 });
        gsap.set(progress.current, { scaleX: 1 });
        return;
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "+=250%",
          pin: pin.current,
          pinSpacing: true,
          // Lenis scrolls the window natively, so pin with position:fixed
          // rather than a transform — no extra compositing layer.
          pinType: "fixed",
          anticipatePin: 1,
          scrub: 0.6,
          // Re-measure start/end from scratch on every refresh. Without this,
          // a mobile URL bar collapsing (which changes dvh) leaves the pin
          // computed against stale numbers.
          invalidateOnRefresh: true,
        },
      });

      tl.fromTo(
        words,
        { opacity: WORD_DIM },
        { opacity: 1, duration: 1, ease: "none", stagger: 0.55 },
        0,
      ).fromTo(
        progress.current,
        { scaleX: 0 },
        { scaleX: 1, duration: tl.duration() || 1, ease: "none" },
        0,
      );

      // Fonts settle after first paint; a mid-animation metric change would
      // otherwise leave the pin's end point computed against the fallback.
      void document.fonts?.ready.then(() => ScrollTrigger.refresh());
    },
    { scope: root, media: true },
  );

  let wordIndex = 0;

  return (
    <section ref={root} id="manifesto" className="relative bg-void">
      <div
        ref={pin}
        className="flex min-h-dvh flex-col justify-between gutter pt-24 pb-10 md:pt-28 md:pb-12"
      >
        {/* ── Act marker ───────────────────────────────────────────── */}
        <div className="flex items-baseline justify-between rule-b pb-3">
          <span className="eyebrow">
            {manifesto.act}{" "}
            <span className="text-chalk">— {manifesto.actTitle}</span>
          </span>
          <span className="numeric text-label-sm text-ash tracking-eyebrow-wide">
            {manifesto.index}
          </span>
        </div>

        {/* ── Statement ────────────────────────────────────────────── */}
        <p className="font-display my-auto max-w-[24ch] text-manifesto tracking-editorial font-medium sm:max-w-[30ch] lg:max-w-[34ch]">
          {manifesto.statement.map((line, lineIndex) => (
            <span key={lineIndex} className="block">
              {tokenize(line).map((token) => {
                const key = `${lineIndex}-${wordIndex++}`;
                return (
                  <span
                    key={key}
                    data-word
                    // Start dim in the markup too, so the first paint matches
                    // the animation's start state — no flash of full contrast
                    // before GSAP takes over.
                    style={{ opacity: WORD_DIM }}
                    className={
                      token.emphasis
                        ? "text-signal inline-block"
                        : "inline-block"
                    }
                  >
                    {token.text}
                    {/* A real space, outside the animated span, so word
                        spacing never animates with the word. */}
                    <span className="inline-block w-[0.25em]" />
                  </span>
                );
              })}
            </span>
          ))}
        </p>

        {/* ── Scrub progress ───────────────────────────────────────── */}
        <div className="flex flex-col gap-3">
          <div className="relative h-px w-full bg-rule">
            <div
              ref={progress}
              className="absolute inset-0 origin-left bg-signal"
              style={{ transform: "scaleX(0)" }}
            />
          </div>
          <span className="eyebrow">{manifesto.footer}</span>
        </div>
      </div>
    </section>
  );
}
