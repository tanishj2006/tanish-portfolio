"use client";
// src/components/providers/SmoothScroll.tsx
//
// Lenis momentum scrolling, wired to the GSAP ticker and to App Router
// navigation.
//
// Design constraints this file deliberately satisfies:
//
//  1. No wrapper element. Lenis in default (body) mode drives the real
//     document scroll position — it does not transform a container. That is
//     why <SmoothScroll> renders `children` bare: introducing a wrapper div
//     would create a new containing block and break `position: fixed`,
//     `position: sticky` and 100dvh units. Zero layout shift by construction.
//
//  2. One rAF loop. `autoRaf: false` hands the loop to `gsap.ticker`, so Lenis
//     and every ScrollTrigger tick on the same frame. Two independent loops is
//     the usual cause of ScrollTrigger jitter under Lenis.
//
//  3. Honest cleanup. The ticker callback is kept in a named binding so it can
//     actually be removed — `gsap.ticker.remove(lenis.raf)` does not work,
//     because the function passed to `add()` was a closure over `lenis.raf`,
//     not `lenis.raf` itself. That mismatch leaks a ticker callback per mount,
//     which in dev StrictMode (double mount) is immediate.
//
//  4. prefers-reduced-motion is respected at the source: Lenis is never
//     constructed, so the browser's own instant scroll is used. The listener
//     is live, so toggling the OS setting re-initialises without a reload.

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";

type ScrollTarget = number | string | HTMLElement;

type ScrollToOptions = {
  offset?: number;
  duration?: number;
  immediate?: boolean;
  lock?: boolean;
  onComplete?: () => void;
};

type SmoothScrollApi = {
  /** The live instance, or null when reduced-motion is on or before mount. */
  lenis: Lenis | null;
  /** Falls back to native scrolling when Lenis is absent. */
  scrollTo: (target: ScrollTarget, options?: ScrollToOptions) => void;
  /** Pause scrolling — for modals, menus, drawers. */
  stop: () => void;
  start: () => void;
  isReducedMotion: boolean;
};

const SmoothScrollContext = createContext<SmoothScrollApi | null>(null);

/** Programmatic scroll + instance access from any client component. */
export function useSmoothScroll(): SmoothScrollApi {
  const ctx = useContext(SmoothScrollContext);
  if (!ctx) {
    throw new Error("useSmoothScroll must be used inside <SmoothScroll>");
  }
  return ctx;
}

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  // Forces one re-render once the instance exists, so consumers reading
  // `lenis` off the context get the real object rather than null.
  const [, setReady] = useState(0);
  const pathname = usePathname();
  const isFirstRender = useRef(true);

  // --- reduced-motion, live -------------------------------------------------
  useEffect(() => {
    const mq = window.matchMedia(REDUCED_MOTION_QUERY);
    setIsReducedMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // --- instance lifecycle --------------------------------------------------
  useEffect(() => {
    if (isReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.1,
      // expo-out: fast departure, long settle. Matches --ease-editorial.
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      // Touch devices keep native inertia; smoothing it feels laggy and
      // fights the platform's own overscroll.
      syncTouch: false,
      touchMultiplier: 1.6,
      wheelMultiplier: 1,
      autoRaf: false, // gsap.ticker drives it — see note 2 above.
      anchors: false, // handled below so offsets are ours to control.
    });

    lenisRef.current = lenis;
    setReady((n) => n + 1);

    // Keep ScrollTrigger's cached scroll position in step with Lenis.
    const onScroll = () => ScrollTrigger.update();
    lenis.on("scroll", onScroll);

    // Named so it is removable. GSAP passes `time` in seconds; Lenis wants ms.
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    // GSAP skips frames it considers "lagging"; with an externally driven
    // scroll that shows up as a visible stutter. `lagSmoothing` is a setter
    // only — there is no getter overload — so cleanup restores GSAP's
    // documented default (500ms threshold, 33ms adjusted step) rather than a
    // captured previous value.
    gsap.ticker.lagSmoothing(0);

    // Measure after fonts land, otherwise every ScrollTrigger start/end is
    // computed against pre-swap metrics and jumps on first scroll.
    let refreshRaf = 0;
    const refresh = () => {
      refreshRaf = requestAnimationFrame(() => ScrollTrigger.refresh());
    };
    refresh();
    if (document.fonts?.status !== "loaded") {
      void document.fonts?.ready.then(refresh);
    }

    return () => {
      cancelAnimationFrame(refreshRaf);
      gsap.ticker.remove(tick);
      gsap.ticker.lagSmoothing(500, 33);
      lenis.off("scroll", onScroll);
      lenis.destroy();
      lenisRef.current = null;
      setReady((n) => n + 1);
    };
  }, [isReducedMotion]);

  // --- navigation ----------------------------------------------------------
  // App Router preserves scroll position across route changes, which with an
  // externally driven scroller leaves Lenis's internal `animatedScroll` out of
  // sync with the document — the next wheel event then snaps. Reset hard, then
  // re-measure the new DOM.
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const lenis = lenisRef.current;
    if (lenis) {
      lenis.scrollTo(0, { immediate: true, force: true });
    } else {
      window.scrollTo(0, 0);
    }
    const raf = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(raf);
  }, [pathname]);

  // --- api -----------------------------------------------------------------
  const scrollTo = useCallback(
    (target: ScrollTarget, options: ScrollToOptions = {}) => {
      const lenis = lenisRef.current;
      if (lenis) {
        lenis.scrollTo(target, {
          offset: options.offset ?? 0,
          duration: options.duration ?? 1.3,
          immediate: options.immediate ?? false,
          lock: options.lock ?? false,
          easing: (t) => 1 - Math.pow(1 - t, 4),
          onComplete: options.onComplete,
        });
        return;
      }
      // Reduced-motion / pre-mount fallback.
      const node =
        typeof target === "string" ? document.querySelector(target) : target;
      if (typeof target === "number") {
        window.scrollTo({ top: target + (options.offset ?? 0) });
      } else if (node instanceof HTMLElement) {
        const top =
          node.getBoundingClientRect().top +
          window.scrollY +
          (options.offset ?? 0);
        window.scrollTo({ top });
      }
      options.onComplete?.();
    },
    [],
  );

  const stop = useCallback(() => {
    const lenis = lenisRef.current;
    if (lenis) lenis.stop();
    else document.documentElement.style.overflow = "clip";
  }, []);

  const start = useCallback(() => {
    const lenis = lenisRef.current;
    if (lenis) lenis.start();
    else document.documentElement.style.removeProperty("overflow");
  }, []);

  // --- in-page anchors -----------------------------------------------------
  // Intercept same-document hash links so they run through Lenis instead of
  // the browser's instant jump. Opt out per-link with `data-lenis-ignore`.
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }

      const anchor = (event.target as Element | null)?.closest?.(
        'a[href*="#"]',
      ) as HTMLAnchorElement | null;
      if (!anchor || anchor.hasAttribute("data-lenis-ignore")) return;
      if (anchor.target && anchor.target !== "_self") return;

      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      if (url.pathname !== window.location.pathname) return; // let Next route
      if (!url.hash || url.hash === "#") return;

      const node = document.querySelector(url.hash);
      if (!(node instanceof HTMLElement)) return;

      event.preventDefault();
      // Respect the target's own scroll-margin-top instead of hard-coding a
      // masthead height here: Lenis offsets are positive-downward, so the
      // margin is applied as a negative offset.
      const margin =
        parseFloat(getComputedStyle(node).scrollMarginTop || "0") || 0;

      scrollTo(node, {
        offset: -margin,
        onComplete: () => {
          // Keep the URL and the a11y focus target honest.
          window.history.pushState(null, "", url.hash);
          node.setAttribute("tabindex", "-1");
          node.focus({ preventScroll: true });
        },
      });
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [scrollTo]);

  // --- deep link on load ---------------------------------------------------
  useEffect(() => {
    if (!window.location.hash) return;
    const node = document.querySelector(window.location.hash);
    if (!(node instanceof HTMLElement)) return;
    const raf = requestAnimationFrame(() =>
      scrollTo(node, { immediate: true }),
    );
    return () => cancelAnimationFrame(raf);
    // Intentionally mount-only: a deep link is resolved once.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SmoothScrollContext.Provider
      value={{
        lenis: lenisRef.current,
        scrollTo,
        stop,
        start,
        isReducedMotion,
      }}
    >
      {children}
    </SmoothScrollContext.Provider>
  );
}
