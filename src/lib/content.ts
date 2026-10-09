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
  actTitle: "The Entry",
  index: "001",
  place: "MUMBAI, IN",
  zone: "Asia/Kolkata",
  zoneLabel: "IST",
  status: "AVAILABLE FOR COLLABORATION // Q4",

  // Line breaks are authored, not computed. A brutalist headline is a typeset
  // object: the designer picks where it breaks, and fixed breaks mean no
  // re-split and no reflow on resize. The longest line governs the fluid size,
  // so if you edit these, re-check for horizontal overflow at 360px.
  headline: ["SOFTWARE", "THAT KNOWS", "WHAT IT", "COSTS."],

  lede: "Tanish Jain — full-stack developer in Mumbai. Systems, interfaces, and the render loop between them.",
} as const;

export const manifesto = {
  act: "ACT II",
  actTitle: "The Shift",
  index: "002",

  // Scrubbed word by word. ~70 words suits a 250vh pin: long enough for the
  // scrub to have somewhere to go, short enough to finish before the reader
  // gives up on the pin.
  statement: [
    "Most of the web is written as if the machine were *free*.",
    "It is *not*.",
    "Every frame has a budget. Every query has a floor. Every abstraction bills someone.",
    "I work the stack *downward* — from Java, C and SQL to the render loop — because an interface is only as honest as the systems beneath it.",
    "Geometry, state, latency. Build the thing. Then know what it cost.",
  ],

  footer: "ENGINEERING PRINCIPLE / 01",
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
  actTitle: "Technical DNA",
  index: "004",
  eyebrow: "02 // TECHNICAL LEDGER",
  statement:
    "A stack is not a list of logos. These are the layers I work in and what each one is responsible for.",
} as const;

export const outro = {
  act: "ACT V",
  actTitle: "The Close",
  index: "005",

  // --text-mega finally earns its place. Authored breaks, same reasoning as
  // the hero: the designer picks where a monumental line breaks.
  headline: ["LET'S", "BUILD."],

  lede: "Open to internships, freelance work and collaborations. The fastest way to reach me is email.",

  // ──────────────────────────────────────────────────────────────────────
  // ACTION REQUIRED — set a real address.
  //
  // Your account email is known to this session, but publishing a personal
  // address on a public page is a different act from identifying you in a
  // commit, and scrapers read portfolios. Put whichever address you actually
  // want public here — many people keep a separate one for this.
  // ──────────────────────────────────────────────────────────────────────
  email: "you@example.com",

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
    href: "https://www.linkedin.com/in/tanish-jain-7b37032bb/",
  },
  // X / Twitter: add it here with n "03" once you tell me the handle. The
  // matrix renders whatever is in this array, so nothing else needs editing.
];
