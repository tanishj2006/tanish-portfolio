"use client";
// src/components/ui/NavBar.tsx — The Masthead Bar
//
// Flat #080808, one hairline rule, mono index links. No blur, no shadow, no
// scroll-triggered restyle: the bar reads the same at every scroll position,
// which is the point of a masthead.
//
// Anchor navigation is handled globally by <SmoothScroll>, which intercepts
// same-page hash links and routes them through Lenis while honouring each
// target's scroll-margin-top. So these are plain <a href="#…"> elements — no
// onClick, and no scrollIntoView() racing the smooth scroller.

import { useEffect, useId, useRef, useState } from "react";
import { useSmoothScroll } from "@/components/providers/SmoothScroll";
import { useActiveSection } from "@/hooks/useActiveSection";

const IDENTIFIER = "TANISH JAIN // ENG";

const INDEX = [
  { n: "01", label: "WORK", href: "#work" },
  { n: "02", label: "STACK", href: "#stack" },
  { n: "03", label: "CONTACT", href: "#contact" },
];

// Hoisted to module scope so the array identity is stable; inline, it would be
// a fresh array every render and re-run the observer effect each time.
const SECTION_IDS = INDEX.map((i) => i.href.slice(1));

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const { stop, start } = useSmoothScroll();
  const panelId = useId();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const active = useActiveSection(SECTION_IDS);

  // Lock scrolling behind the overlay via Lenis rather than `overflow: hidden`
  // on <body>: toggling body overflow changes the scrollbar gutter and shifts
  // layout. Lenis just stops advancing.
  useEffect(() => {
    if (!open) return;

    stop();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);

    return () => {
      document.removeEventListener("keydown", onKey);
      start();
    };
  }, [open, stop, start]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-void rule-b">
      <nav
        aria-label="Primary"
        className="flex h-[var(--nav-h)] items-center justify-between gutter"
      >
        <a
          href="#hero"
          className="eyebrow text-chalk transition-colors duration-[--duration-swift] ease-swift hover:text-signal"
        >
          {IDENTIFIER}
        </a>

        {/* Desktop index */}
        <ul className="hidden items-center gap-8 md:flex">
          {INDEX.map((item) => {
            const isActive = active === item.href.slice(1);
            return (
              <li key={item.href}>
                <a
                  href={item.href}
                  aria-current={isActive ? "true" : undefined}
                  className="group eyebrow inline-flex gap-2"
                >
                  {/* Colour only — nothing here changes box size, so the
                      active state cannot shift the bar. */}
                  <span
                    className={`numeric transition-colors duration-[--duration-swift] ease-swift group-hover:text-signal ${
                      isActive ? "text-signal" : "text-ash"
                    }`}
                  >
                    {item.n}
                  </span>
                  <span
                    className={`transition-colors duration-[--duration-swift] ease-swift group-hover:text-chalk ${
                      isActive ? "text-chalk" : "text-slate"
                    }`}
                  >
                    {"//"} {item.label}
                  </span>
                </a>
              </li>
            );
          })}
        </ul>

        {/* Mobile toggle — a word, not a hamburger. Fixed width so the
            MENU/CLOSE swap cannot nudge the bar. */}
        <button
          ref={toggleRef}
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls={panelId}
          className="eyebrow w-[4.5ch] text-right text-chalk md:hidden"
        >
          {open ? "CLOSE" : "MENU"}
        </button>
      </nav>

      {/* Mobile overlay.
          Always mounted and toggled with visibility/opacity rather than
          conditionally rendered: the markup is identical on server and client,
          so there is no hydration mismatch, and because it is `fixed` it is
          out of flow and cannot shift the page either way. */}
      <div
        id={panelId}
        inert={!open || undefined}
        className={`fixed inset-x-0 top-[var(--nav-h)] bottom-0 bg-void transition-opacity duration-[--duration-swift] ease-swift md:hidden ${
          open ? "opacity-100" : "pointer-events-none invisible opacity-0"
        }`}
      >
        <ul className="flex flex-col">
          {INDEX.map((item) => {
            const isActive = active === item.href.slice(1);
            return (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-current={isActive ? "true" : undefined}
                  className="flex items-baseline gap-4 rule-b gutter py-5"
                >
                  <span
                    className={`numeric text-label-sm tracking-eyebrow-wide ${
                      isActive ? "text-signal" : "text-ash"
                    }`}
                  >
                    {item.n}
                  </span>
                  <span className="font-display text-title tracking-editorial uppercase">
                    {item.label}
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </header>
  );
}
