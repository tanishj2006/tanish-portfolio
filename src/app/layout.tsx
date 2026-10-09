// src/app/layout.tsx
import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";

import { fontVariables } from "@/lib/fonts";
import SmoothScroll from "@/components/providers/SmoothScroll";
import Grain from "@/components/layout/Grain";
import SkipLink from "@/components/layout/SkipLink";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Tanish Jain — Full-stack developer, Mumbai",
    template: "%s — Tanish Jain",
  },
  description:
    "Full-stack developer and B.Tech student in Mumbai. I build web applications, and I take an interest in where interface work meets application security.",
  authors: [{ name: "Tanish Jain" }],
  creator: "Tanish Jain",
  openGraph: {
    title: "Tanish Jain — Full-stack developer, Mumbai",
    description:
      "Full-stack developer and B.Tech student in Mumbai. Selected work, in detail.",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tanish Jain — Full-stack developer, Mumbai",
  },
};

// Replaces the hand-written <meta name="viewport"> in v1. Next injects this,
// and `viewportFit: cover` is what lets the gutters sit under a device notch.
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#080808",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // `fontVariables` puts --font-display-src / --font-sans-src /
    // --font-mono-src in scope on the root, where globals.css composes them
    // into the --font-* theme tokens.
    <html lang="en" className={fontVariables} suppressHydrationWarning>
      <body className="bg-void text-chalk font-sans antialiased">
        <SkipLink />
        <SmoothScroll>
          <div id="main">{children}</div>
        </SmoothScroll>
        <Grain />
        <Analytics />
      </body>
    </html>
  );
}
