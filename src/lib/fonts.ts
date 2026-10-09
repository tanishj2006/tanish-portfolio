// src/lib/fonts.ts
//
// Editorial type pairing, self-hosted by next/font (zero network requests at
// runtime, zero FOUT, automatic size-adjust fallbacks → no CLS).
//
// Font choices and why:
//   Syne         — brutalist-editorial grotesque. Clash Display (Fontshare) and
//                  PP Neue Montreal (commercial) are not on Google Fonts, so they
//                  cannot be self-hosted via next/font/google. Syne is the closest
//                  tight, high-contrast, slightly-weird display face that is.
//   Inter Tight  — Inter's tighter sibling. Narrower sidebearings than Inter,
//                  which is what makes long editorial paragraphs read as set type
//                  rather than as UI text.
//   JetBrains Mono — technical mono for eyebrows, indices, metadata, captions.
//                  Swap to Geist Mono here if you want something cleaner//narrower;
//                  both are variable and available on Google Fonts.
//
// All three are loaded as variable fonts: one file per family, any weight free.

import { Syne, Inter_Tight, JetBrains_Mono } from "next/font/google";

export const fontDisplay = Syne({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display-src",
  // No `weight` key on purpose: omitting it makes next/font pull the variable
  // font file (400–800 on one axis). Listing weights would fetch static cuts.
  adjustFontFallback: true,
});

export const fontSans = Inter_Tight({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans-src",
  adjustFontFallback: true,
});

export const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono-src",
  adjustFontFallback: true,
});

/** Spread onto <html> so every --font-* custom property is in scope globally. */
export const fontVariables = [
  fontDisplay.variable,
  fontSans.variable,
  fontMono.variable,
].join(" ");

// Why the `-src` suffix: next/font writes the raw family name into whatever
// variable you name here. globals.css then composes it into the real token:
//
//   next/font  ->  --font-display-src: "Syne", "Syne Fallback";
//   @theme     ->  --font-display: var(--font-display-src), "Arial Narrow", …;
//
// Pointing next/font straight at --font-display would overwrite the @theme
// token and silently drop the explicit fallback stack.
