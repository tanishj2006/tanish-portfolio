"use client";
// src/components/ui/SystemsStatus.tsx
//
// A terminal readout of the environment the page is actually running in.
// Everything here is measured, not decorative: React's own version, the
// build identifier, and live client telemetry that updates on resize.
//
// Zero layout shift, by construction:
//   * Every value column is .numeric (tabular figures) and fixed-width, so a
//     placeholder occupies exactly the space its resolved value will.
//   * Client-only values start as "--" and fill in after mount, which is the
//     only hydration-safe way to render something the server cannot know.
//   * The copy button's label is width-locked, so COPY -> COPIED cannot
//     nudge the row.

import { useCallback, useEffect, useMemo, useState } from "react";
import { version as reactVersion } from "react";
import { BUILD_VERSION } from "@/lib/content";

const COMMIT =
  process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA?.slice(0, 7).toUpperCase() ??
  "LOCAL";

const PENDING = "--";

// Next 16 resolves React to a canary build, so `version` reads
// "19.3.0-canary-3f0b9e61-20260317" — 36 characters that blow out the
// readout's value column on a narrow viewport. Only the semver prefix is
// meaningful here.
const REACT_VERSION = reactVersion.split("-")[0];

type Telemetry = {
  viewport: string;
  dpr: string;
  threads: string;
  motion: string;
};

function read(): Telemetry {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  return {
    viewport: `${window.innerWidth}×${window.innerHeight}`,
    dpr: window.devicePixelRatio.toFixed(2),
    threads: String(navigator.hardwareConcurrency ?? "n/a"),
    motion: reduced ? "REDUCED" : "FULL",
  };
}

export default function SystemsStatus() {
  const [live, setLive] = useState<Telemetry | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const update = () => setLive(read());
    update();

    window.addEventListener("resize", update, { passive: true });
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    mq.addEventListener("change", update);

    return () => {
      window.removeEventListener("resize", update);
      mq.removeEventListener("change", update);
    };
  }, []);

  // Memoised so it is a stable dependency for onCopy; rebuilt only when the
  // telemetry actually changes.
  const rows: [string, string][] = useMemo(
    () => [
      ["RUNTIME", `REACT ${REACT_VERSION}`],
      ["BUILD", `${BUILD_VERSION} / ${COMMIT}`],
      ["VIEWPORT", live?.viewport ?? PENDING],
      ["DPR", live?.dpr ?? PENDING],
      ["THREADS", live?.threads ?? PENDING],
      ["MOTION", live?.motion ?? PENDING],
    ],
    [live],
  );

  const onCopy = useCallback(async () => {
    const payload = rows.map(([k, v]) => `${k.padEnd(9)}${v}`).join("\n");
    try {
      await navigator.clipboard.writeText(payload);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // Clipboard is permission-gated and absent over plain http. Failing
      // silently is correct here: this is a flourish, not a feature.
    }
  }, [rows]);

  return (
    <div className="border border-rule bg-ink">
      <div className="flex items-center justify-between rule-b px-4 py-2.5">
        <span className="eyebrow text-slate">SYSTEMS STATUS</span>
        <button
          type="button"
          onClick={onCopy}
          // The visible label is "COPY"; on its own that does not say what is
          // being copied. The label also carries the result, so a screen
          // reader on the focused button hears the state change.
          aria-label={
            copied
              ? "Systems status readout copied to clipboard"
              : "Copy systems status readout"
          }
          className="eyebrow w-[7ch] text-right text-ash transition-colors duration-[--duration-swift] ease-swift hover:text-signal"
        >
          {copied ? "COPIED" : "COPY"}
        </button>
      </div>

      <dl className="px-4 py-3">
        {rows.map(([key, value]) => (
          <div
            key={key}
            className="flex items-baseline justify-between gap-6 py-1.5"
          >
            <dt className="numeric text-label text-ash tracking-eyebrow">
              {key}
            </dt>
            <dd className="numeric text-label text-chalk tracking-eyebrow">
              {value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
