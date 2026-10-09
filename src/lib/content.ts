// src/lib/content.ts
//
// Editorial copy, kept out of the components so wording can be revised without
// touching animation or layout code.
//
// A word wrapped in *asterisks* renders in --color-signal. Keep it to one or
// two per act: the accent budget is roughly 5% of the viewport.

export const BUILD_VERSION = "V2.0.0";

export const hero = {
  act: "ACT I",
  actTitle: "Intro",
  index: "001",
  place: "MUMBAI, IN",
  zone: "Asia/Kolkata",
  zoneLabel: "IST",
  status: "AVAILABLE FOR COLLABORATION // Q4",

  // Line breaks are authored, not computed. A brutalist headline is a typeset
  // object: the designer picks where it breaks, and fixed breaks mean no
  // re-split and no reflow on resize. The longest line governs the fluid size,
  // so if you edit these, re-check for horizontal overflow at 360px.
  // The accent full stop is appended by Hero.tsx, not written here, so the
  // last line must NOT carry its own period or it renders "SYSTEMS..".
  headline: ["FULL STACK", "SYSTEMS"],

  lede: "Full-stack engineer based in Mumbai. Architecting high-throughput web platforms, distributed backends, and frame-locked digital craft.",
} as const;

/** Technical spec card, right column of Act I. */
export const spec = {
  label: "SPEC // 01",
  rows: [
    ["DISCIPLINE", "FULL-STACK & GRAPHICS"],
    ["STACK", "NEXT.JS / TYPESCRIPT / POSTGRES"],
    ["RUNTIMES", "EDGE & NODE"],
    ["LOCATION", "MUMBAI, IN"],
  ] as const satisfies readonly (readonly [string, string])[],
} as const;

export const manifesto = {
  act: "ACT II",
  actTitle: "How I Work",
  index: "002",

  // Scrubbed word by word. ~70 words suits a 250vh pin: long enough for the
  // scrub to have somewhere to go, short enough to finish before the reader
  // gives up on the pin.
  statement: [
    "I started with Java and C, so I learned about memory and pointers before I learned about components, and that order stuck.",
    "When I build for the web now I still want to know what's happening underneath, like why a query is slow or what the bundle actually ships.",
    "Most of what I've built is small, and I'd rather finish one thing *properly* than leave five half done.",
  ],

  footer: "HOW I WORK / 01",
} as const;

export type Token = { text: string; emphasis: boolean };

/** Splits a line into word tokens, flagging the *emphasised* ones. */
export function tokenize(line: string): Token[] {
  return line
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => ({
      text: word.replace(/\*/g, ""),
      emphasis: word.includes("*"),
    }));
}

export const stack = {
  act: "ACT IV",
  actTitle: "The Stack",
  index: "004",
  eyebrow: "02 // THE STACK",
  statement: "The tools I actually work with, and what each one does.",
} as const;

export const outro = {
  act: "ACT V",
  actTitle: "Contact",
  index: "005",

  // --text-mega finally earns its place. Authored breaks, same reasoning as
  // the hero: the designer picks where a monumental line breaks.
  headline: ["LET'S", "TALK."],

  lede: "I'm open to internships, freelance work and collaborations. Email is the fastest way to reach me.",

  // Set NEXT_PUBLIC_CONTACT_EMAIL in Vercel to route mail somewhere else
  // (a forwarding alias on a custom domain, say) without a redeploy of this
  // file. The literal is the address you asked to publish.
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "tanishj52@gmail.com",

  place: "DESIGNED & ARCHITECTED IN MUMBAI, IN",
} as const;

export type SocialLink = { n: string; label: string; handle: string; href: string };

export const socials: SocialLink[] = [
  {
    n: "01",
    label: "GITHUB",
    handle: "tanishj2006",
    href: "https://github.com/tanishj2006",
  },
  {
    n: "02",
    label: "LINKEDIN",
    handle: "tanish-jain",
    href: "https://www.linkedin.com/in/tanish-jain-7b37032bb",
  },
  {
    // ⚠ Confirm this handle. It came through as a suggested placeholder, and
    // it is also published in the Person JSON-LD sameAs array — a dead
    // profile there weakens the entity link rather than strengthening it.
    // Delete this entry if the account does not exist.
    n: "03",
    label: "X",
    handle: "tanishj52",
    href: "https://x.com/tanishj52",
  },
];

export const currently = {
  eyebrow: "CURRENTLY",

  // ⚠ Yours to edit. This is carried over from your own v1 hero copy, which
  // is the only thing I know to be true about what you are building now. A
  // "currently" block that is months stale is worse than no block at all —
  // it is the first thing a reader checks for signs of life.
  line: "Building Cozytte, a circular fashion platform, and rebuilding this site in the open.",

  // Shown as a mono stamp beside the line. Update it when the line changes.
  since: "Q4 2026",
} as const;

/** Marquee ticker. Rendered twice to form a seamless loop. */
export const ticker: string[] = [
  "AVAILABLE FOR COLLABORATION",
  "FULL-STACK ENGINEERING",
  "SYSTEMS",
  "INTERFACE",
  "RENDER LOOP",
  "MUMBAI, IN",
];

export const inquiry = {
  eyebrow: "INQUIRY",
  heading: "Send me a message",
  types: [
    "FREELANCE",
    "FULL-TIME",
    "COLLABORATION",
    "SOMETHING ELSE",
  ] as const,
  success: "TRANSMISSION RECEIVED // WILL REPLY SHORTLY",
  mailtoNote: "Opening your mail client. No form endpoint is configured yet.",
} as const;
