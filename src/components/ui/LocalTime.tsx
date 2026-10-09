"use client";
// src/components/ui/LocalTime.tsx
//
// Live IST clock for the hero metadata bar.
//
// Hydration: the server has no idea what time it is in the client's frame of
// reference, so rendering a real time on the server guarantees a mismatch.
// This renders a fixed-width placeholder until mounted, then ticks. Because
// .numeric sets tabular-nums the placeholder is exactly as wide as the real
// value, so the swap costs zero layout shift.

import { useEffect, useState } from "react";

const PLACEHOLDER = "--:--:--";

function format(date: Date, timeZone: string) {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(date);
}

export default function LocalTime({
  timeZone,
  label,
}: {
  timeZone: string;
  label: string;
}) {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    // Align the first tick to the next whole second so the display does not
    // sit visibly behind the wall clock, then settle into a 1s interval.
    let interval: ReturnType<typeof setInterval>;
    const update = () => setTime(format(new Date(), timeZone));

    update();
    const timeout = setTimeout(() => {
      update();
      interval = setInterval(update, 1000);
    }, 1000 - (Date.now() % 1000));

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [timeZone]);

  return (
    <span className="numeric text-label text-slate tracking-eyebrow uppercase">
      {label}{" "}
      <time
        // No dateTime attribute while unresolved: an empty one is invalid.
        suppressHydrationWarning
        className="text-chalk"
      >
        {time ?? PLACEHOLDER}
      </time>
    </span>
  );
}
