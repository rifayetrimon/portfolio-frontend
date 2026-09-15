/** Shared facts that were previously hardcoded (and had drifted) in several components. */

/**
 * The résumé lives under /public so Next serves it as a static asset; it was
 * originally dropped in a top-level `pdf/` folder, which is not web-reachable.
 */
export const RESUME = {
  /** URL path, served from public/resume/. */
  href: "/resume/Rifayet_uddin.pdf",
  /** Name the browser saves it as. */
  downloadName: "Rifayet-Uddin-Ahmed-Resume.pdf",
} as const;

/** First day of the current professional role — the date quoted throughout the site. */
export const CAREER_START = "2023-09-01";

/** First year of writing code, quoted in the About section. */
export const CODING_SINCE = 2020;

/**
 * Whole years elapsed since `from`. Derived rather than hardcoded: the two
 * places that stated this disagreed with each other ("2.5 Years +" vs "1+") and
 * both had gone stale.
 */
export function yearsSince(from: string, now: Date = new Date()): number {
  const start = new Date(from);
  let years = now.getFullYear() - start.getFullYear();
  const beforeAnniversary =
    now.getMonth() < start.getMonth() ||
    (now.getMonth() === start.getMonth() && now.getDate() < start.getDate());
  if (beforeAnniversary) years -= 1;
  return Math.max(0, years);
}
