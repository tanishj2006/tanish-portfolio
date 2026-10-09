// src/app/layout.tsx
import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";

import { fontVariables } from "@/lib/fonts";
import { IS_PRODUCTION, SITE, SITE_URL } from "@/lib/site";
import { serializeGraph } from "@/lib/schema";
import SmoothScroll from "@/components/providers/SmoothScroll";
import Grain from "@/components/layout/Grain";
import SkipLink from "@/components/layout/SkipLink";
import "./globals.css";

export const metadata: Metadata = {
  // Makes every relative URL below (canonical, OG image, sitemap) resolve
  // against the right origin instead of silently emitting a relative path
  // that crawlers cannot follow.
  metadataBase: new URL(SITE_URL),

  title: {
    default: SITE.title,
    template: "%s — Tanish Jain",
  },
  description: SITE.description,

  keywords: [
    "Tanish Jain",
    "Full-Stack Engineer",
    "Creative Technologist",
    "Next.js",
    "React 19",
    "TypeScript",
    "GSAP",
    "WebGL",
    "Three.js",
    "Systems Design",
    "Web Performance",
    "Mumbai",
    "Portfolio",
  ],

  authors: [{ name: SITE.name, url: SITE_URL }],
  creator: SITE.name,
  publisher: SITE.name,

  alternates: { canonical: "/" },

  // Preview deployments must not be indexed: each branch gets a public URL,
  // and indexing them competes with production for identical content.
  robots: IS_PRODUCTION
    ? {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          "max-video-preview": -1,
          "max-image-preview": "large",
          "max-snippet": -1,
        },
      }
    : { index: false, follow: false },

  openGraph: {
    type: "website",
    locale: SITE.locale,
    siteName: SITE.name,
    title: SITE.title,
    description: SITE.description,
    url: SITE_URL,
    // The image itself is declared by app/opengraph-image.tsx; Next wires it
    // in automatically, including dimensions and the absolute URL.
  },

  twitter: {
    card: "summary_large_image",
    title: SITE.title,
    description: SITE.description,
    creator: "@tanishj52",
  },

  category: "technology",
  formatDetection: { telephone: false, address: false, email: false },
};

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
    <html lang="en" className={fontVariables} suppressHydrationWarning>
      <head>
        {/* Rendered with dangerouslySetInnerHTML rather than as a child
            expression: React escapes text children, which would corrupt the
            JSON. The payload is angle-bracket escaped in serializeGraph().
            Server-rendered and never touched on the client, so it cannot
            produce a hydration mismatch. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeGraph() }}
        />
      </head>
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
