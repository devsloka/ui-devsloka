import { SITE_REPOSITORY } from "@/config/seo/seo.config";

const REPO_API = SITE_REPOSITORY.replace("https://github.com/", "https://api.github.com/repos/");

async function getStarCount(): Promise<number | null> {
  try {
    // Cached for an hour, so the count stays fresh without hitting GitHub's rate limit.
    const response = await fetch(REPO_API, {
      headers: { Accept: "application/vnd.github+json" },
      next: { revalidate: 3600 },
    });
    if (!response.ok) return null;
    const { stargazers_count } = (await response.json()) as { stargazers_count?: number };
    return typeof stargazers_count === "number" ? stargazers_count : null;
  } catch {
    return null;
  }
}

const formatStars = (count: number) =>
  new Intl.NumberFormat("en", { notation: "compact", maximumFractionDigits: 1 }).format(count);

export async function GitHubStars() {
  const stars = await getStarCount();

  return (
    <a
      href={SITE_REPOSITORY}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={
        stars === null
          ? "Devsloka UI on GitHub"
          : `Star Devsloka UI on GitHub, ${stars} ${stars === 1 ? "star" : "stars"}`
      }
      className="group flex h-8 items-center gap-2 border border-border px-2.5 font-mono text-xs text-muted-foreground transition-colors outline-none hover:border-foreground/30 hover:text-foreground focus-visible:ring-2 focus-visible:ring-[#0A6EFF]"
    >
      <svg viewBox="0 0 16 16" aria-hidden className="size-4 fill-current">
        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
      </svg>
      {stars !== null && (
        <>
          <span aria-hidden className="h-3.5 w-px bg-border" />
          <svg viewBox="0 0 16 16" aria-hidden className="size-3.5 fill-current transition-colors group-hover:text-[#F5B400]">
            <path d="M8 .25a.75.75 0 01.67.42l1.88 3.8 4.2.61a.75.75 0 01.41 1.28l-3.04 2.96.72 4.18a.75.75 0 01-1.09.79L8 12.32l-3.75 1.97a.75.75 0 01-1.09-.79l.72-4.18L.84 6.36a.75.75 0 01.41-1.28l4.2-.61L7.33.67A.75.75 0 018 .25z" />
          </svg>
          <span className="tabular-nums">{formatStars(stars)}</span>
        </>
      )}
    </a>
  );
}
