"use client";
// src/hooks/useGSAPContext.ts
//
// One place for the GSAP lifecycle, so no component has to remember it.
//
// What it guarantees:
//   * useLayoutEffect — the setup runs before the browser paints, so an
//     element's start state is never visible for a frame before GSAP sets it.
//   * gsap.context() — every tween, timeline and ScrollTrigger created inside
//     the callback is recorded and reverted on unmount. That covers React 18+
//     StrictMode's double-invoke in development, which otherwise leaves a
//     duplicate ScrollTrigger behind on every mount.
//   * gsap.matchMedia() (opt in with `media: true`) — rebuilds the animation
//     when the media query changes and reverts the old one, which is what
//     makes prefers-reduced-motion live and ScrollTrigger recalculate cleanly
//     across a breakpoint change or an orientation flip.
//
// @gsap/react's useGSAP() does roughly this, but it is a separate package and
// is not installed; this keeps the dependency list as it is.

import { useLayoutEffect, useRef, type RefObject } from "react";
import { gsap } from "@/lib/gsap";

type Conditions = Record<string, boolean>;

type ContextArg = {
  /** With `media`: { motion, desktop, highContrast } as booleans. */
  conditions?: Conditions;
};

type Options = {
  /** Limits selector lookups inside the callback to this subtree. */
  scope?: RefObject<HTMLElement | null>;
  /** Re-run when these change (same semantics as a dependency array). */
  deps?: unknown[];
  /** Wrap in gsap.matchMedia() and expose `motion` / `desktop` conditions. */
  media?: boolean;
};

const QUERIES = {
  motion: "(prefers-reduced-motion: no-preference)",
  desktop: "(min-width: 768px)",
  // Distinct from reduced motion: a reader can be happy with animation and
  // still need contrast. Effects that deliberately hold text below AA — the
  // manifesto's dim-to-bright scrub — opt out on this.
  highContrast: "(prefers-contrast: more)",
};

export function useGSAPContext(
  setup: (ctx: ContextArg) => void,
  { scope, deps = [], media = false }: Options = {},
) {
  // Keep the latest callback without making it a dependency, so an inline
  // arrow function does not tear down and rebuild the animation every render.
  const setupRef = useRef(setup);
  setupRef.current = setup;

  useLayoutEffect(() => {
    const element = scope?.current ?? undefined;

    if (!media) {
      const ctx = gsap.context(() => setupRef.current({}), element);
      return () => ctx.revert();
    }

    const mm = gsap.matchMedia(element);
    mm.add(QUERIES, (context) => {
      setupRef.current({ conditions: context.conditions as Conditions });
    });
    // revert() kills every tween and ScrollTrigger the matchMedia created and
    // restores inline styles, across all matched conditions.
    return () => mm.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
