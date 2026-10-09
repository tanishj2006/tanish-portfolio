"use client";
// src/components/sections/Outro.tsx — Act V: Kinetic Outro & Editorial Footer
//
// The monumental close. Masked line reveal triggered by the viewport rather
// than on load, a contact matrix that inverts on hover, and a colophon rule.
//
// The reveal reuses the hero's technique and its hard-won lesson: every tween
// writes `y: 0` alongside `yPercent`, because getComputedStyle returns
// transform as a matrix and GSAP cannot tell a resolved percentage from
// pixels. Without it the lines never leave their masks.

import { useCallback, useRef, useState } from "react";
import { ArrowUp, ArrowUpRight, Check, Copy } from "lucide-react";
import { useGSAPContext } from "@/hooks/useGSAPContext";
import { gsap } from "@/lib/gsap";
import { useSmoothScroll } from "@/components/providers/SmoothScroll";
import { inquiry, outro, socials } from "@/lib/content";
import InquiryForm from "@/components/ui/InquiryForm";

export default function Outro() {
  const root = useRef<HTMLElement>(null);
  const { scrollTo } = useSmoothScroll();
  const [copied, setCopied] = useState(false);

  useGSAPContext(
    (ctx) => {
      const lines = gsap.utils.toArray<HTMLElement>("[data-outro-line]");

      if (!ctx.conditions?.motion) {
        gsap.set(lines, { yPercent: 0, y: 0 });
        return;
      }

      gsap.fromTo(
        lines,
        { yPercent: 115, y: 0 },
        {
          yPercent: 0,
          y: 0,
          duration: 1.1,
          stagger: 0.08,
          ease: "expo.out",
          scrollTrigger: {
            trigger: root.current,
            // Fires once the block is meaningfully on screen, not the instant
            // its top edge grazes the fold.
            start: "top 70%",
            once: true,
            invalidateOnRefresh: true,
          },
        },
      );
    },
    { scope: root, media: true },
  );

  const copyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(outro.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard is permission-gated; the mailto link beside this still works.
    }
  }, []);

  return (
    <section
      ref={root}
      id="contact"
      className="relative bg-void scroll-mt-[var(--nav-h)]"
    >
      <noscript>
        <style>{`[data-outro-line]{transform:none!important}`}</style>
      </noscript>

      {/* ── Act marker ───────────────────────────────────────────────── */}
      <div className="flex items-baseline justify-between rule-b gutter pt-24 pb-3 md:pt-28">
        <span className="eyebrow">
          {outro.act} <span className="text-chalk">/ {outro.actTitle}</span>
        </span>
        <span className="numeric text-label-sm text-ash tracking-eyebrow-wide">
          {outro.index}
        </span>
      </div>

      <div className="gutter pt-16 pb-16 md:pt-24 md:pb-24">
        {/* ── Monumental headline ──────────────────────────────────── */}
        <h2
          className="font-display text-mega tracking-brutal font-semibold uppercase"
          aria-label={outro.headline.join(" ")}
        >
          {outro.headline.map((line) => (
            <span key={line} className="line-clip" aria-hidden="true">
              <span
                data-outro-line
                className="block"
                style={{ transform: "translateY(115%)" }}
              >
                {line}
              </span>
            </span>
          ))}
        </h2>

        <div className="grid gap-14 pt-14 md:pt-20 lg:grid-cols-12 lg:gap-12">
          {/* ── Left: intent + direct channels ─────────────────────── */}
          <div className="flex flex-col gap-6 lg:col-span-5">
            <p className="measure text-lead text-slate">{outro.lede}</p>

            <div className="flex flex-wrap items-stretch gap-3">
              <a
                href={`mailto:${outro.email}`}
                aria-label={`Email Tanish Jain at ${outro.email}`}
                data-lenis-ignore
                className="group inline-flex items-center gap-3 border border-rule-strong px-5 py-3.5 transition-colors duration-[--duration-swift] ease-swift hover:invert-surface"
              >
                <span className="numeric text-caption text-chalk transition-colors group-hover:text-void-text">
                  {outro.email}
                </span>
                <ArrowUpRight
                  className="size-3.5 shrink-0 transition-transform duration-[--duration-swift] ease-editorial group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
              </a>

              <button
                type="button"
                onClick={copyEmail}
                aria-label={
                  copied
                    ? "Email address copied to clipboard"
                    : "Copy email address"
                }
                // Width-locked so the COPY -> COPIED swap cannot resize the row.
                className="inline-flex w-[13ch] items-center justify-center gap-2 border border-rule px-4 py-3.5 eyebrow text-ash transition-colors duration-[--duration-swift] ease-swift hover:border-rule-strong hover:text-chalk"
              >
                {copied ? (
                  <Check
                    className="size-3"
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                ) : (
                  <Copy
                    className="size-3"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                )}
                {copied ? "COPIED" : "COPY"}
              </button>
            </div>

            {/* ── Social matrix ────────────────────────────────────── */}
            <nav aria-label="Elsewhere" className="pt-2">
              <ul className="rule-t">
                {socials.map((s) => (
                  <li key={s.href}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label={`${s.label}, ${s.handle} (opens in a new tab)`}
                      data-lenis-ignore
                      className="group flex items-baseline gap-4 rule-b px-1 py-5 transition-colors duration-[--duration-swift] ease-swift hover:invert-surface"
                    >
                      <span className="numeric text-label-sm text-ash tracking-eyebrow-wide">
                        {s.n}
                      </span>
                      <span className="font-display text-title tracking-editorial uppercase">
                        {s.label}
                      </span>
                      <span className="numeric ml-auto text-label text-ash tracking-eyebrow">
                        {s.handle}
                      </span>
                      <ArrowUpRight
                        className="size-3.5 shrink-0 self-center transition-transform duration-[--duration-swift] ease-editorial group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        strokeWidth={1.5}
                        aria-hidden="true"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* ── Right: inquiry form ────────────────────────────────── */}
          <div className="flex flex-col gap-6 lg:col-span-7">
            <div className="flex items-baseline gap-3 rule-b pb-3">
              <span className="eyebrow text-signal">{inquiry.eyebrow}</span>
              <span className="eyebrow">{inquiry.heading}</span>
            </div>
            <InquiryForm />
          </div>
        </div>
      </div>

      {/* ── Colophon ─────────────────────────────────────────────────── */}
      <footer className="flex flex-col gap-3 rule-t gutter py-5 md:flex-row md:items-center md:justify-between">
        <span className="numeric text-label text-ash tracking-eyebrow uppercase">
          {/* The page is statically prerendered, so this is the build year and
              the client's year can differ for one day around New Year. That is
              the entire blast radius, hence suppressHydrationWarning rather
              than a placeholder that would flash on every load. */}
          <span suppressHydrationWarning>© {new Date().getFullYear()}</span>{" "}
          TANISH JAIN
        </span>

        <span className="eyebrow">{outro.place}</span>

        <button
          type="button"
          onClick={() => scrollTo(0)}
          aria-label="Back to top of page"
          className="group inline-flex items-center gap-2 eyebrow text-ash transition-colors duration-[--duration-swift] ease-swift hover:text-signal md:justify-end"
        >
          BACK TO TOP
          <ArrowUp
            className="size-3 transition-transform duration-[--duration-swift] ease-editorial group-hover:-translate-y-0.5"
            strokeWidth={1.5}
            aria-hidden="true"
          />
        </button>
      </footer>
    </section>
  );
}
