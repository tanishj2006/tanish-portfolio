// src/app/work/page.tsx
//
// The full archive: every public repository as a dense editorial ledger.
//
// Server component. The repository list is fetched with an hour of ISR and
// falls back to a static list on any failure, so a GitHub rate limit cannot
// fail the build or blank the page.

import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { getRepos } from "@/lib/archive";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  // The root layout's template appends " | Tanish Jain", so writing the suffix
  // here as well would double it.
  title: "Archive & Projects",
  description:
    "Every public repository by Tanish Jain: client work, systems projects and experiments.",
  alternates: { canonical: "/work" },
  openGraph: {
    title: `Archive & Projects | ${SITE.name}`,
    description:
      "Every public repository: client work, systems and experiments.",
    url: "/work",
  },
};

export default async function ArchivePage() {
  const { repos, live } = await getRepos();

  return (
    <div className="flex min-h-dvh flex-col">
      {/* Minimal masthead. The site's real one lives in page.tsx, not the
          layout, so this route supplies its own. */}
      <header className="rule-b">
        <div className="flex h-[var(--nav-h)] items-center justify-between gutter">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 eyebrow text-chalk transition-colors duration-[--duration-swift] ease-swift hover:text-signal"
          >
            <ArrowLeft
              className="size-3 transition-transform duration-[--duration-swift] ease-editorial group-hover:-translate-x-0.5"
              strokeWidth={1.5}
              aria-hidden="true"
            />
            [RETURN TO HOME]
          </Link>
          <span className="numeric text-label-sm text-ash tracking-eyebrow-wide">
            ARCHIVE
          </span>
        </div>
      </header>

      <main className="flex-1 gutter pt-16 pb-20 md:pt-20">
        {/* ── Title ────────────────────────────────────────────────── */}
        <div className="flex flex-col gap-6 pb-12 md:pb-16">
          <div className="flex items-baseline justify-between rule-b pb-3">
            <span className="eyebrow">
              INDEX <span className="text-chalk">/ All Repositories</span>
            </span>
            <span className="numeric text-label-sm text-signal tracking-eyebrow-wide">
              {String(repos.length).padStart(3, "0")}
            </span>
          </div>

          <h1 className="font-display text-name tracking-brutal font-semibold uppercase">
            <span className="line-clip">
              <span className="block whitespace-nowrap">
                ALL ARTIFACTS<span className="text-signal">.</span>
              </span>
            </span>
          </h1>

          <p className="measure text-lead text-slate">
            {repos.length} public repositories, newest first. Client work,
            systems projects and the experiments that did not become either.
          </p>
        </div>

        {/* ── Ledger ───────────────────────────────────────────────── */}
        {/* Column headers are desktop-only: on a phone each row stacks, and a
            header row would describe a layout that is no longer there. */}
        <div className="hidden rule-t rule-b py-2.5 lg:grid lg:grid-cols-12 lg:gap-6">
          <span className="eyebrow lg:col-span-2">UPDATED</span>
          <span className="eyebrow lg:col-span-3">PROJECT</span>
          <span className="eyebrow lg:col-span-4">DESCRIPTION</span>
          <span className="eyebrow lg:col-span-2">LANGUAGE</span>
          <span className="eyebrow lg:col-span-1 lg:text-right">SOURCE</span>
        </div>

        <ul className="lg:rule-t">
          {repos.map((repo) => (
            <li key={repo.name}>
              <a
                href={repo.url}
                target="_blank"
                rel="noreferrer noopener"
                data-lenis-ignore
                aria-label={`${repo.name} on GitHub (opens in a new tab)`}
                className="group grid gap-x-6 gap-y-2 rule-b py-5 transition-colors duration-[--duration-swift] ease-swift hover:invert-surface lg:grid-cols-12 lg:items-baseline lg:py-4"
              >
                <span className="numeric text-label text-ash tracking-eyebrow lg:col-span-2">
                  {repo.updated}
                </span>

                <span className="font-display text-title tracking-editorial lg:col-span-3">
                  {repo.name}
                </span>

                <span className="text-caption text-slate lg:col-span-4">
                  {repo.description ?? (
                    <span className="numeric text-ash">--</span>
                  )}
                  {repo.topics.length > 0 && (
                    <span className="numeric block pt-1 text-label text-ash tracking-eyebrow uppercase">
                      {repo.topics.join(" / ")}
                    </span>
                  )}
                </span>

                <span className="numeric text-label text-chalk tracking-eyebrow uppercase lg:col-span-2">
                  {repo.language ?? <span className="text-ash">--</span>}
                </span>

                <span className="inline-flex items-center gap-1.5 eyebrow text-ash transition-colors duration-[--duration-swift] ease-swift group-hover:text-signal lg:col-span-1 lg:justify-end">
                  GITHUB
                  <ArrowUpRight
                    className="size-3 transition-transform duration-[--duration-swift] ease-editorial group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                </span>
              </a>
            </li>
          ))}
        </ul>

        {/* Says plainly when the list is the offline fallback rather than
            quietly presenting stale data as live. */}
        {!live && (
          <p className="pt-6 eyebrow text-ash">
            SOURCE LIST CACHED / GITHUB API UNAVAILABLE AT BUILD TIME
          </p>
        )}
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
