// src/components/layout/SkipLink.tsx
//
// Keyboard escape hatch past the nav. Visually hidden until focused, then it
// lands as a hard accent block in the top-left — no pill, no fade.
// `data-lenis-ignore` keeps it on the browser's instant jump: a skip link that
// takes 1.3s to animate defeats its own purpose.

export default function SkipLink() {
  return (
    <a
      href="#main"
      data-lenis-ignore
      className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:top-4 focus-visible:left-4 focus-visible:z-[10000] focus-visible:bg-signal focus-visible:px-4 focus-visible:py-2 focus-visible:font-mono focus-visible:text-label focus-visible:tracking-eyebrow focus-visible:text-signal-contrast focus-visible:uppercase"
    >
      Skip to content
    </a>
  );
}
