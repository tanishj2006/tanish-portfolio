# ⚡ TJ. — Full-Stack Systems & Editorial Portfolio (v2.0)

[![Next.js](https://img.shields.io/badge/Next.js-16.2-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2-black?style=flat-square&logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-black?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![GSAP](https://img.shields.io/badge/GSAP-3.14-green?style=flat-square&logo=greensock)](https://greensock.com/gsap/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)

An editorial, brutalist, and high-performance developer portfolio built with **Next.js 16**, **React 19**, **Tailwind CSS v4**, **GSAP**, and **Lenis**. Architected with frame-locked digital craft, fluid typography, zero layout shifts, and real-time client telemetry.

[Live Demo](https://tanishj-portfolio.vercel.app/) · [Work Archive](https://tanishj-portfolio.vercel.app/work) · [LinkedIn](https://www.linkedin.com/in/tanish-jain-7b37032bb) · [GitHub](https://github.com/tanishj2006)

---

## 🏛️ The v2 Architecture: An Editorial Transformation

Version 2 retires legacy portfolio tropes (heavy 3D canvas blobs, glassmorphism, multi-stop gradients, and pill radii) in favor of a **typeset, brutalist-minimal editorial experience** organized across five structured acts:

```
┌──────────────────────────────────────────────────────────────┐
│  ACT I   — INTRO           Full-dvh masthead, live IST time, │
│                            availability ping & spec card     │
├──────────────────────────────────────────────────────────────┤
│  ACT II  — HOW I WORK      Pinned manifesto scrubbed         │
│                            word-by-word with zero repaint    │
├──────────────────────────────────────────────────────────────┤
│  ACT III — SELECTED WORKS  Sticky card deck of real systems  │
│                            + live /work GitHub archive trigger│
├──────────────────────────────────────────────────────────────┤
│  INTERSTITIAL              Infinite CSS ticker + CURRENTLY   │
├──────────────────────────────────────────────────────────────┤
│  ACT IV  — THE STACK       Inverted bone ledger & real-time  │
│                            <SystemsStatus /> terminal        │
├──────────────────────────────────────────────────────────────┤
│  ACT V   — CONTACT         Monumental headline, inquiry form │
│                            & social matrix                   │
└──────────────────────────────────────────────────────────────┘
```

---

## ✨ Key Features & The Five Acts

### 1. Act I — Intro (Hero Masthead)
- **Authored Typography:** Fluid headline (`FULL STACK / SYSTEMS.`) revealed from behind hairline-clipped masks without mid-animation reflow.
- **Technical Metadata Bar:** Real-time Indian Standard Time (IST) clock (`Asia/Kolkata`), live availability status, and build tag (`V2.0.0`).
- **Right-Column Spec Card (`[SPEC // 01]`):** Hairline-framed technical specification panel with international orange corner ticks (`<CornerTicks />`) detailing disciplines, primary stack, and runtimes.

### 2. Act II — How I Work (Manifesto)
- **Pin & Opacity Scrub:** Viewport-pinned ScrollTrigger scrub revealing the engineering manifesto word-by-word. Opacity compositing ensures 60 FPS performance without triggering DOM repaints across the scrub frames.
- **Graceful Accommodations:** Automatically renders as static full-contrast typography when `prefers-reduced-motion` or `prefers-contrast` is detected.

### 3. Act III — Selected Works (Production Projects)
- **Sticky Stacking Deck:** Built with native CSS sticky (`motion-safe:sticky`) and GSAP scrubbed compression to avoid pin-spacer layout thrashing.
- **Real Production Systems:**
  - **Jay Laxmi Light House:** High-performance lighting catalogue engine with programmatic SEO, localized JSON-LD schema, and sub-second edge routing.
  - **Ambika Cycle Stores:** Commercial retail storefront deployed on Zoho Commerce with variant taxonomies and custom styling layers.
  - **JurisBridge AI:** Client-side PII scrubbing and automated entity redaction pipeline feeding Google Gemini legal analysis models.
  - **Urban Incident Response:** Multimodal civic incident triage platform handling photos, voice notes, and GPS with geo-temporal deduplication.
- **Archive Navigation Trigger:** Contextual trigger routing directly to the `/work` repository archive.

### 4. Interstitial — Marquee & CURRENTLY
- **Pure CSS Marquee:** Seamless, infinite dual-track ticker loop running entirely on GPU compositing without JavaScript or resize listeners.
- **Live Status Line:** Editorial `CURRENTLY` band highlighting active engineering focus.

### 5. Act IV — The Stack (Technical DNA)
- **Inverted Bone Surface:** High-contrast `#f4f4f0` surface designed like an engineering specification sheet with hairline-divided rows.
- **Zero-B.S. Ledger:** Replaces arbitrary percentage bars with verified disciplines, technologies, and exact system roles.
- **Live Systems Terminal (`<SystemsStatus />`):** Hydration-safe client terminal reporting live client-side telemetry:
  - React & Next.js versions
  - Viewport dimensions & Device Pixel Ratio (DPR)
  - Hardware concurrency / CPU thread count
  - User motion preference (`no-preference` / `reduce`)

### 6. Act V — Contact (The Close)
- **Monumental Headline:** Impactful `--text-mega` mask reveal (`LET'S TALK.`).
- **Interactive Inquiry Form (`<InquiryForm />`):** Type selector (Freelance, Full-time, Collaboration, Something Else) and structured transmission handling.
- **Micro-Interactions:** One-click email clipboard copy with visual feedback, hover-inverting social link matrix, and Lenis-powered "BACK TO TOP" smooth scroll.

### 7. Deep Architecture: `/work` Archive & Branded 404
- **Public Repository Ledger (`/work`):** Dynamic directory fetching public GitHub repositories via REST API with 1-hour Incremental Static Regeneration (ISR) and graceful fallback resilience against rate limits or offline builds.
- **Zero-JS 404 (`/not-found`):** Fully branded server component error page featuring masked typography, accessible naming, and automatic `noindex` headers.

---

## ⚡ Performance & Engineering Standards

- **Zero Cumulative Layout Shift (CLS: 0):** Rigorously tested and verified across all viewport widths (360px mobile up to 2560px ultra-wide).
- **Body-Mode Smooth Scrolling:** Lenis driven directly on the GSAP ticker without wrapping layout containers, keeping native `position: sticky` and `dvh` units intact.
- **Monotonic Scroll-Spy:** Custom `IntersectionObserver` hook (`useActiveSection.ts`) tracking masthead sections smoothly without GSAP dependencies or scroll drift.
- **Automated Design Linter (`npm run lint:design`):** Custom script (`scripts/lint-design.mjs`) mechanically barring outdated v1 patterns (glassmorphism, blob radii, glow orbs, multi-color gradients, ad-hoc gutters).
- **Self-Hosted Variable Fonts:** Syne (display), Inter Tight (text), and JetBrains Mono (technical) loaded via `next/font` with zero render-blocking third-party network requests.
- **Automated OpenGraph Generation:** Satori (`next/og`) dynamic share image rendering with vendored TTF fonts for deterministic, zero-dependency preview builds.
- **Strict A11y (WCAG 2.1 AA):** Calibrated contrast on both dark (`#080808`) and inverted bone (`#f4f4f0`) surfaces, full keyboard navigation, and semantic ARIA labeling.

---

## 🛠️ Tech Stack

### Core Framework & Runtime
- **Framework:** [Next.js 16](https://nextjs.org/) (App Router, Server Components)
- **Library:** [React 19](https://react.dev/)
- **Language:** [TypeScript 5](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) (CSS-first `@theme` design tokens)

### Motion & Interaction
- **Animation Engine:** [GSAP 3.14](https://greensock.com/gsap/) with [ScrollTrigger](https://greensock.com/scrolltrigger/)
- **Smooth Scroll:** [Lenis 1.3](https://github.com/darkroomengineering/lenis)

### Systems & Architecture
- **Analytics & SEO:** `@vercel/analytics`, `next/og`, JSON-LD Structured Data
- **Icons:** [Lucide React](https://lucide.dev/)
- **Typefaces:** Syne, Inter Tight, JetBrains Mono

---

## 📂 Project Structure

```text
tanish-portfolio/
├── public/                     # Static icons and assets
├── scripts/
│   └── lint-design.mjs         # Mechanical v2 design token & rule linter
├── src/
│   ├── app/
│   │   ├── _og-fonts/          # Vendored TTF fonts for Satori OG image generation
│   │   ├── globals.css         # Tailwind v4 @theme design tokens, hairlines & type scales
│   │   ├── layout.tsx          # Root layout, metadataBase, JSON-LD schema & grain overlay
│   │   ├── not-found.tsx       # Branded zero-JS editorial 404 page
│   │   ├── opengraph-image.tsx # Dynamic OpenGraph banner generator
│   │   ├── page.tsx            # Main single-page application orchestrator (Acts I-V)
│   │   ├── robots.ts           # Dynamic search engine crawler rules
│   │   ├── sitemap.ts          # XML sitemap generator
│   │   └── work/
│   │       └── page.tsx        # /work public GitHub repository archive (ISR)
│   ├── components/
│   │   ├── layout/             # Global layout primitives (Grain, SkipLink)
│   │   ├── providers/          # SmoothScroll (Lenis + GSAP ticker provider)
│   │   ├── sections/           # Core page sections (Hero, Manifesto, Works, Currently, Stack, Outro)
│   │   └── ui/                 # Reusable UI primitives (NavBar, SpecCard, SystemsStatus, InquiryForm, etc.)
│   ├── hooks/
│   │   ├── useActiveSection.ts # Monotonic IntersectionObserver scroll-spy
│   │   └── useGSAPContext.ts   # Leak-free GSAP context and matchMedia lifecycle hook
│   └── lib/
│       ├── archive.ts          # GitHub REST API repository fetcher & static fallback
│       ├── content.ts          # Centralized editorial copy, act metadata & social links
│       ├── fonts.ts            # Variable font definitions via next/font
│       ├── gsap.ts             # GSAP & ScrollTrigger registration helper
│       ├── ledger.ts           # Act IV technical specification dataset
│       ├── schema.ts           # JSON-LD Person and WebSite schema graph
│       ├── site.ts             # Canonical URL resolution & metadata constants
│       └── works.ts            # Act III featured works dataset & project narratives
├── next.config.ts              # Next.js configuration
├── package.json                # Dependencies and scripts
└── tsconfig.json               # TypeScript compiler configuration
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 20+ installed
- npm, pnpm, or bun

### Local Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/tanishj2006/my-portfolio.git
   cd my-portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

4. **Run Verification & Quality Checks:**
   ```bash
   # Run the mechanical v2 design-token linter
   npm run lint:design

   # Check TypeScript types
   npm run typecheck

   # Run ESLint
   npm run lint

   # Build for production
   npm run build
   ```

---

## 👤 About the Author

**Tanish Jain** is a full-stack engineer based in Mumbai, India, focused on high-throughput web platforms, distributed backends, and frame-locked digital craft.

- **Portfolio:** [tanishj-portfolio.vercel.app](https://tanishj-portfolio.vercel.app/)
- **GitHub:** [@tanishj2006](https://github.com/tanishj2006)
- **LinkedIn:** [Tanish Jain](https://www.linkedin.com/in/tanish-jain-7b37032bb)
- **Email:** [tanishj52@gmail.com](mailto:tanishj52@gmail.com)

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

Crafted with 🤍 in Mumbai, IN.
