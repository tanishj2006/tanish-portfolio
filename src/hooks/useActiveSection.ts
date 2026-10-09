"use client";
// src/hooks/useActiveSection.ts
//
// Which act the reader is currently in, for the masthead index.
//
// IntersectionObserver rather than ScrollTrigger, deliberately: it needs no
// GSAP, behaves identically whether or not motion is reduced, cannot be
// perturbed by the pin Act II owns, and has nothing to leak beyond a single
// disconnect().
//
// The rule is "the last section whose top has passed under the masthead",
// which is monotonic — it stays correct at the very bottom of the page, where
// a naive "is this section in view" test clears itself once the final section
// scrolls past. rootMargin pulls the observer root down by the masthead height
// so every boundary crossing fires a callback; the active id is then recomputed
// from live geometry rather than from the entries, which is what keeps the two
// in agreement.

import { useEffect, useState } from "react";

export function useActiveSection(ids: string[]): string | null {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (!sections.length) return;

    const navHeight = () => {
      const raw = getComputedStyle(document.documentElement).getPropertyValue(
        "--nav-h",
      );
      const n = parseFloat(raw);
      if (Number.isNaN(n)) return 56;
      return raw.includes("rem") ? n * 16 : n;
    };

    const recompute = () => {
      const line = navHeight() + 1;
      let current: string | null = null;
      for (const el of sections) {
        if (el.getBoundingClientRect().top <= line) current = el.id;
      }
      setActive(current);
    };

    const observer = new IntersectionObserver(recompute, {
      rootMargin: `-${Math.round(navHeight())}px 0px 0px 0px`,
      threshold: 0,
    });
    sections.forEach((el) => observer.observe(el));

    // The observer fires on boundary crossings; a resize moves the boundaries
    // without crossing one, and the first paint needs a value before any
    // crossing has happened.
    recompute();
    window.addEventListener("resize", recompute, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", recompute);
    };
  }, [ids]);

  return active;
}
