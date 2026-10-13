// src/app/work/[slug]/page.tsx
//
// One page per featured work. Four static routes, prerendered from works.ts.
//
// Why these exist at all: Act III is a single scroll-jacked deck on "/", so
// every project shares one URL, one title and one canonical. A crawler has
// nowhere to send someone searching for "Jay Laxmi Light House" except the
// home page, and an answer engine has no document whose subject is that one
// project. These give each work an addressable page with its own title,
// description and canonical, and nothing else changes about the deck.
//
// Server component, zero client JS beyond what the root layout already ships.

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

import { getWork, works, workSlugs, WORK_COUNT } from "@/lib/works";
import { SITE } from "@/lib/site";

type Params = { params: Promise<{ slug: string }> };

/** Prerenders all four at build time; anything else is a 404, not a render. */
export function generateStaticParams() {
  return workSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const work = getWork(slug);
  if (!work) return {};

  // The narrative runs long on some entries and a description over ~160
  // characters is simply truncated in a result. Cut on a sentence boundary
  // rather than mid-word.
  const description = truncate(work.narrative, 155);
  const url = `/work/${work.id}`;

  return {
    title: work.title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: `${work.title} | ${SITE.name}`,
      description,
      url,
    },
    twitter: { title: `${work.title} | ${SITE.name}`, description },
  };
}

function truncate(text: string, max: number): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const stop = cut.lastIndexOf(". ");
  if (stop > max * 0.5) return cut.slice(0, stop + 1);
  return `${cut.slice(0, cut.lastIndexOf(" "))}...`;
}

export default async function WorkPage({ params }: Params) {
  const { slug } = await params;
  const work = getWork(slug);
  if (!work) notFound();

  const position = works.findIndex((w) => w.id === work.id) + 1;
  const index = String(position).padStart(2, "0");

  return (
    <div className="flex min-h-dvh flex-col">
      {/* The site masthead lives in page.tsx, not the layout, so this route
          carries its own — same bar as /work. */}
      <header className="rule-b">
        <div className="flex h-[var(--nav-h)] items-center justify-between gutter">
          <Link
            href="/work"
            className="group inline-flex items-center gap-2 eyebrow text-chalk transition-colors duration-[--duration-swift] ease-swift hover:text-signal"
          >
            <ArrowLeft
              className="size-3 transition-transform duration-[--duration-swift] ease-editorial group-hover:-translate-x-0.5"
              strokeWidth={1.5}
              aria-hidden="true"
            />
            [RETURN TO ARCHIVE]
          </Link>
          <span className="numeric text-label-sm text-ash tracking-eyebrow-wide">
            CASE {index} {"//"} {WORK_COUNT}
          </span>
        </div>
      </header>

      <main className="flex-1 gutter pt-16 pb-20 md:pt-20">
        {/* ── Title ────────────────────────────────────────────────── */}
        <div className="flex flex-col gap-6 pb-12 md:pb-16">
          <div className="flex items-baseline justify-between rule-b pb-3">
            <span className="eyebrow">
              CASE <span className="text-chalk">/ {work.category}</span>
            </span>
            <span className="numeric text-label-sm text-signal tracking-eyebrow-wide">
              {work.year}
            </span>
          </div>

          <h1 className="font-display text-hero tracking-brutal font-semibold uppercase">
            <span className="line-clip">
              <span className="block">
                {work.title}
                <span className="text-signal">.</span>
              </span>
            </span>
          </h1>

          <p className="measure text-lead text-slate">{work.narrative}</p>
        </div>

        {/* ── Screenshot ───────────────────────────────────────────── */}
        {/* Explicit width/height rather than `fill`: this page has no fixed
            aspect frame to fill, and the intrinsic pair is what reserves the
            box before the bytes arrive, so the text below it never jumps.
            The captures are all 2000x1106. */}
        {work.image && (
          <figure className="pb-12 md:pb-16">
            <Image
              src={work.image}
              alt={work.imageAlt ?? `${work.title} interface`}
              width={2000}
              height={1106}
              sizes="(min-width: 1280px) 1120px, 100vw"
              priority
              className="h-auto w-full border border-rule bg-ink"
            />
          </figure>
        )}

        {/* ── Stack + links ────────────────────────────────────────── */}
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <section className="lg:col-span-7">
            <h2 className="eyebrow rule-b pb-3">BUILT WITH</h2>
            <ul className="flex flex-wrap gap-x-2 gap-y-2 pt-5">
              {work.stack.map((tech) => (
                <li
                  key={tech}
                  className="numeric border border-rule px-2.5 py-1 text-label text-slate tracking-eyebrow uppercase"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </section>

          <section className="lg:col-span-5">
            <h2 className="eyebrow rule-b pb-3">LINKS</h2>
            <ul className="flex flex-col pt-1">
              {work.live && (
                <li>
                  <ExternalRow href={work.live} label="[VIEW ARTIFACT]" />
                </li>
              )}
              {work.source && (
                <li>
                  <ExternalRow href={work.source} label="[SOURCE]" />
                </li>
              )}
              {!work.live && !work.source && (
                <li className="numeric pt-4 text-label text-ash tracking-eyebrow uppercase">
                  PRIVATE / NO PUBLIC LINK
                </li>
              )}
            </ul>
          </section>
        </div>
      </main>

      <footer className="flex flex-col gap-3 rule-t gutter py-5 md:flex-row md:items-center md:justify-between">
        <span className="eyebrow">
          <span suppressHydrationWarning>© {new Date().getFullYear()}</span>{" "}
          TANISH JAIN
        </span>
        <Link
          href="/#work"
          className="eyebrow text-ash transition-colors duration-[--duration-swift] ease-swift hover:text-chalk"
        >
          [BACK TO SELECTED WORKS]
        </Link>
      </footer>
    </div>
  );
}

function ExternalRow({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      data-lenis-ignore
      // flex, not inline-flex: the bottom rule should run the width of the
      // column like every other ruled row on the site, not stop at the end
      // of the label.
      className="group flex items-center gap-1.5 rule-b py-4 eyebrow text-chalk transition-colors duration-[--duration-swift] ease-swift hover:text-signal"
    >
      {label}
      <ArrowUpRight
        className="size-3 transition-transform duration-[--duration-swift] ease-editorial group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        strokeWidth={1.5}
        aria-hidden="true"
      />
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  );
}
