// src/app/opengraph-image.tsx
//
// The share card, built from the same tokens as the site: void ground,
// hairline grid, Syne masthead, mono metadata, one accent tick.
//
// Fonts are vendored as TTF in src/app/_og-fonts/ and read from disk at build
// time. Two reasons they are not the files next/font already downloaded:
// Satori (which next/og renders through) cannot parse WOFF2, which is all
// next/font emits; and reading from disk means the build needs no network,
// so a Google Fonts outage cannot fail a deploy.

import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { SITE } from "@/lib/site";

export const alt = `${SITE.name} — ${SITE.jobTitle}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const VOID = "#080808";
const CHALK = "#f5f5f5";
const ASH = "#737373";
const RULE = "#1c1c1c";
const SIGNAL = "#ff3e00";

const fontPath = (name: string) =>
  join(process.cwd(), "src/app/_og-fonts", name);

export default async function Image() {
  const [syne, mono] = await Promise.all([
    readFile(fontPath("Syne-ExtraBold.ttf")),
    readFile(fontPath("JetBrainsMono-Regular.ttf")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: VOID,
          padding: "56px 64px",
          position: "relative",
        }}
      >
        {/* Hairline grid — four verticals, drawn as absolutely positioned
            1px rules because Satori has no border-image or repeating
            background. */}
        {[0.2, 0.4, 0.6, 0.8].map((f) => (
          <div
            key={f}
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: size.width * f,
              width: 1,
              background: RULE,
            }}
          />
        ))}

        {/* Masthead */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: `1px solid ${RULE}`,
            paddingBottom: 20,
          }}
        >
          <div
            style={{
              fontFamily: "JetBrains Mono",
              fontSize: 20,
              letterSpacing: 3.4,
              color: CHALK,
            }}
          >
            TANISH JAIN // ENG
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              fontFamily: "JetBrains Mono",
              fontSize: 18,
              letterSpacing: 3.4,
              color: ASH,
            }}
          >
            <div style={{ width: 9, height: 9, background: SIGNAL }} />
            MUMBAI, IN
          </div>
        </div>

        {/* Name, set as the card's subject. Syne ExtraBold runs about 1.2em
            per capital, so the longest line here ("TANISH", 6 characters)
            needs roughly 6 x 1.2 x 132 = 950px inside a 1072px column.
            nowrap makes that a guarantee rather than a hope. */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontFamily: "Syne",
            fontSize: 132,
            lineHeight: 0.86,
            letterSpacing: -5.5,
            color: CHALK,
          }}
        >
          <span style={{ whiteSpace: "nowrap" }}>TANISH</span>
          <span style={{ whiteSpace: "nowrap", display: "flex" }}>
            JAIN<span style={{ color: SIGNAL }}>.</span>
          </span>
        </div>

        {/* Metadata rule */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: `1px solid ${RULE}`,
            paddingTop: 20,
            fontFamily: "JetBrains Mono",
            fontSize: 18,
            letterSpacing: 3,
            color: ASH,
          }}
        >
          <div>FULL-STACK DEVELOPER</div>
          <div>SELECTED WORK / THE STACK / CONTACT</div>
          <div style={{ color: CHALK }}>V2.0.0</div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Syne", data: syne, style: "normal", weight: 800 },
        { name: "JetBrains Mono", data: mono, style: "normal", weight: 400 },
      ],
    },
  );
}
