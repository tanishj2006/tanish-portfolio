// src/components/ui/Marquee.tsx
//
// A horizontal ticker with no JavaScript: the track holds two identical copies
// of the content and animates translateX to -50%, which lands copy two exactly
// where copy one started. No measurement, no resize handler, no layout shift.
//
// Two things here are load-bearing:
//
//   overflow-hidden — the track is deliberately wider than the viewport. Without
//   a clipping parent it extends the document's scrollWidth and the whole page
//   gains a horizontal scrollbar. On a 360px viewport that is the difference
//   between a clean page and a broken one.
//
//   motion-safe: — globals.css forces animation-duration to 0.01ms and
//   iteration-count to 1 under prefers-reduced-motion. Applied to a marquee
//   that would park it instantly at translateX(-50%), i.e. mid-sentence with
//   the first copy scrolled off. Gating the animation on motion-safe means
//   reduced motion gets a plain static row instead.

import { Fragment } from "react";

export default function Marquee({
  items,
  className = "",
}: {
  items: readonly string[];
  className?: string;
}) {
  const copy = (ariaHidden: boolean) => (
    <ul
      aria-hidden={ariaHidden || undefined}
      className="flex shrink-0 items-center"
    >
      {items.map((item, i) => (
        <Fragment key={`${item}-${i}`}>
          <li className="eyebrow px-6 whitespace-nowrap text-slate">{item}</li>
          <li aria-hidden="true" className="text-signal">
            <span className="block size-1" style={{ background: "currentColor" }} />
          </li>
        </Fragment>
      ))}
    </ul>
  );

  return (
    <div className={`overflow-hidden ${className}`}>
      <div className="flex w-max motion-safe:animate-marquee">
        {copy(false)}
        {/* The duplicate is decorative: a screen reader should hear the list
            once, not twice. */}
        {copy(true)}
      </div>
    </div>
  );
}
