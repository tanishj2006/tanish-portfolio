// src/components/layout/Grain.tsx
//
// Film-grain overlay. A single fixed, pointer-transparent layer carrying an
// inline SVG feTurbulence tile as a repeating background.
//
// Why this and not a PNG: the tile is ~300 bytes of markup, needs no network
// request, and scales to any DPR without a @2x asset. `stitchTiles="stitch"`
// makes the noise seamless so the 160px repeat is invisible.
//
// Why no mix-blend-mode: over a near-black surface (#080808) `overlay` and
// `soft-light` both collapse to almost nothing — the blend maths bottoms out.
// Plain alpha over the top at ~4.5% lifts the floor into visible tooth, which
// is the actual goal. It is also one less compositing pass.
//
// This is a server component: it ships zero JavaScript.

const NOISE_TILE =
  "data:image/svg+xml," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="160" height="160">' +
      '<filter id="g" x="0" y="0" width="100%" height="100%">' +
      '<feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch"/>' +
      '<feColorMatrix type="saturate" values="0"/>' +
      "</filter>" +
      '<rect width="160" height="160" filter="url(#g)"/>' +
      "</svg>",
  );

export default function Grain() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[9999] print:hidden"
      style={{
        backgroundImage: `url("${NOISE_TILE}")`,
        backgroundRepeat: "repeat",
        backgroundSize: "var(--grain-tile) var(--grain-tile)",
        opacity: "var(--grain-opacity)",
      }}
    />
  );
}
