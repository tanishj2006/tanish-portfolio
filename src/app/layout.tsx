// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Tanish Jain | Full-Stack Developer",
  description:
    "B.Tech student and Full-stack Developer based in Mumbai. Building high-performance web applications at the intersection of UI design and Cybersecurity.",
  keywords: [
    "Tanish",
    "Full-Stack Developer",
    "Mumbai",
    "React",
    "Next.js",
    "Three.js",
    "Portfolio",
  ],
  authors: [{ name: "Tanish J." }],
  openGraph: {
    title: "Tanish Jain | Full-Stack Developer",
    description: "Engineering the future of digital experiences.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tanish Jain | Full-Stack Developer",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
