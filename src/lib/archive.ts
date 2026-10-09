// src/lib/archive.ts
//
// Public repositories for the /work archive.
//
// Fetched from the GitHub REST API with an hour of ISR. The API is
// unauthenticated, which means a shared 60-requests-per-hour-per-IP budget:
// on a busy host a 403 is routine, not exceptional. Every failure path
// therefore returns the static list below rather than throwing, because a
// rate limit must never be able to fail a build or blank the page.
//
// The fallback is real data (names and dates from the account), not invented
// filler. Fields the listing cannot know are left null and render as a rule.

export type Repo = {
  name: string;
  description: string | null;
  language: string | null;
  topics: string[];
  url: string;
  updated: string;
};

const ENDPOINT =
  "https://api.github.com/users/tanishj2006/repos?sort=updated&per_page=100";

type GitHubRepo = {
  name: string;
  description: string | null;
  language: string | null;
  topics?: string[];
  html_url: string;
  pushed_at: string;
  fork: boolean;
  archived: boolean;
  size: number;
};

/** Used when the API is unreachable, rate-limited, or returns junk. */
const FALLBACK: Repo[] = [
  ["Urban-Incident-Response", "2026-10-06"],
  ["StreamVerse", "2026-10-05"],
  ["JurisBridge-AI", "2026-09-25"],
  ["OceanFIR", "2026-09-12"],
  ["aura-2026-stadium-ops", "2026-07-13"],
  ["Visual-Product-Search-with-ML-Kit", "2026-07-01"],
  ["tflite-object-detection-model", "2026-06-28"],
  ["Node-Farm", "2026-04-14"],
  ["mapty", "2026-04-04"],
  ["forkify", "2026-03-26"],
  ["Bankist", "2025-11-02"],
  ["Cashless-village", "2025-11-01"],
  ["web-resume", "2025-10-24"],
  ["Fitness-Tracker", "2025-10-04"],
  ["Expense-Tracker", "2025-09-27"],
  ["Guess-My-Number", "2025-02-01"],
  ["Concert-Landing-Page", "2024-12-16"],
  ["Omnifood", "2024-09-28"],
  ["YourPigGame.in", "2022-10-18"],
].map(([name, updated]) => ({
  name,
  description: null,
  language: null,
  topics: [],
  url: `https://github.com/tanishj2006/${name}`,
  updated,
}));

/**
 * Repository count for the Act III archive trigger.
 *
 * Act III is a client component and cannot await the API, and making it do so
 * would turn a static section into a dynamic one for a single number. This is
 * the fallback list's length, which tracks the real total closely enough for
 * a teaser; /work shows the live count.
 */
export const ARCHIVE_COUNT = String(FALLBACK.length).padStart(2, "0");

export async function getRepos(): Promise<{
  repos: Repo[];
  live: boolean;
}> {
  try {
    const res = await fetch(ENDPOINT, {
      headers: {
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
      },
      next: { revalidate: 3600 },
    });

    if (!res.ok) return { repos: FALLBACK, live: false };

    const data: unknown = await res.json();
    // A rate-limit body is an object, not an array; checking the shape rather
    // than the status catches that and any other unexpected payload.
    if (!Array.isArray(data)) return { repos: FALLBACK, live: false };

    const repos = (data as GitHubRepo[])
      // Forks are someone else's work and empty repos are templates or
      // placeholders; neither belongs in an archive of what was built.
      .filter((r) => !r.fork && !r.archived && r.size > 0)
      .map(
        (r): Repo => ({
          name: r.name,
          description: r.description,
          language: r.language,
          topics: (r.topics ?? []).slice(0, 3),
          url: r.html_url,
          updated: r.pushed_at.slice(0, 10),
        }),
      )
      .sort((a, b) => b.updated.localeCompare(a.updated));

    return repos.length
      ? { repos, live: true }
      : { repos: FALLBACK, live: false };
  } catch {
    // Offline build, DNS failure, proxy refusal. Never throw from here.
    return { repos: FALLBACK, live: false };
  }
}
