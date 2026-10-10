import Link from "next/link";
import { generateSEO } from "@/config/seo/seo.utils";
import { CHANGELOG } from "@/lib/changelog";
import { cn } from "@/lib/utils";

export const metadata = generateSEO({
  title: "Changelog",
  description:
    "Follow Devsloka UI from its first release on May 21, 2025 to the latest UI updates, new blocks, and library improvements.",
  path: "changelog",
});

export default function ChangelogPage() {
  return (
    <div className="pt-28 pb-24 md:pt-36 md:pb-32">
      <header>
        <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-muted-foreground">
          <span aria-hidden className="size-1.5 bg-[#0A6EFF]" />
          Devsloka UI / Release notes
        </p>
        <h1 className="mt-6 text-[clamp(3.5rem,10vw,9rem)] leading-none font-medium tracking-[-0.065em]">
          Changelog<span className="text-[#0A6EFF]">.</span>
        </h1>
        <div className="mt-8 flex flex-col justify-between gap-6 border-t border-border pt-6 md:flex-row md:items-end">
          <p className="max-w-xl text-lg text-muted-foreground md:text-xl">
            New components, better details, and everything in between.
            Follow along as Devsloka UI grows.
          </p>
          <p className="shrink-0 font-mono text-xs uppercase tracking-wider text-muted-foreground">
            Building since <time dateTime="2025-05-21">May 2025</time>
          </p>
        </div>
      </header>

      <div className="mt-16 grid gap-10 lg:grid-cols-12 lg:gap-16">
        <nav aria-label="Release archive" className="lg:col-span-3">
          <div className="lg:sticky lg:top-24">
            <h2 className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
              The archive
            </h2>
            <ol className="mt-4 divide-y divide-border border-y border-border">
              {CHANGELOG.map((release, index) => (
                <li key={release.id}>
                  <a
                    href={`#${release.id}`}
                    className="group flex items-start justify-between gap-4 py-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0A6EFF]"
                  >
                    <span>
                      <span className="block text-sm font-medium transition-colors group-hover:text-[#0A6EFF]">
                        {release.label}
                      </span>
                      <time
                        dateTime={release.dateTime}
                        className="mt-1 block font-mono text-[0.6875rem] text-muted-foreground"
                      >
                        {release.date}
                      </time>
                    </span>
                    <span
                      className="font-mono text-xs text-muted-foreground"
                      aria-hidden
                    >
                      {String(CHANGELOG.length - index).padStart(2, "0")} ↓
                    </span>
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </nav>

        <ol className="min-w-0 lg:col-span-9">
          {CHANGELOG.map((release, index) => (
            <li key={release.id} className="pb-16 last:pb-0 md:pb-24">
              <article
                id={release.id}
                aria-labelledby={`${release.id}-title`}
                className="scroll-mt-24 border-t border-border"
              >
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 py-4 font-mono text-xs uppercase tracking-wider">
                  <time dateTime={release.dateTime}>{release.date}</time>
                  <span className="text-muted-foreground">{release.label}</span>
                  {index === 0 && (
                    <span className="ml-auto bg-[#0A6EFF] px-2 py-1 text-[0.625rem] text-white">
                      Latest
                    </span>
                  )}
                </div>

                <div
                  className={cn(
                    "relative overflow-hidden py-6 md:py-10",
                    index === 0 && "bg-[#0A6EFF] px-6 text-white md:px-10"
                  )}
                >
                  {index === 0 && (
                    <div
                      aria-hidden
                      className="mb-10 grid w-fit grid-cols-4 gap-1.5 md:mb-14"
                    >
                      {Array.from({ length: 16 }, (_, pixel) => (
                        <span
                          key={pixel}
                          className={cn(
                            "size-3 border border-white/50",
                            [0, 1, 4, 6, 9, 11, 14, 15].includes(pixel) &&
                              "bg-white"
                          )}
                        />
                      ))}
                    </div>
                  )}
                  <h2
                    id={`${release.id}-title`}
                    className="max-w-2xl text-3xl leading-[1.08] font-medium tracking-[-0.04em] text-balance md:text-5xl"
                  >
                    {release.title}
                  </h2>
                  <p
                    className={cn(
                      "mt-5 max-w-2xl text-base leading-relaxed text-pretty",
                      index === 0 ? "text-white/90" : "text-muted-foreground"
                    )}
                  >
                    {release.summary}
                  </p>
                </div>

                <ul className="mt-6 divide-y divide-border">
                  {release.changes.map((change) => (
                    <li
                      key={change.title}
                      className="grid gap-3 py-6 sm:grid-cols-[6rem_1fr] sm:gap-6"
                    >
                      <span
                        className={cn(
                          "mt-1 h-fit w-fit px-2 py-1 font-mono text-[0.625rem] uppercase tracking-wider",
                          change.type === "New"
                            ? "bg-[#0A6EFF] text-white"
                            : "bg-[#E8F0FF] text-[#0A0A0A]"
                        )}
                      >
                        {change.type}
                      </span>
                      <div className="min-w-0">
                        <h3 className="text-lg font-medium tracking-[-0.02em]">
                          {change.title}
                        </h3>
                        <p className="mt-2 max-w-prose text-sm leading-relaxed text-muted-foreground">
                          {change.description}
                        </p>
                        {change.link && (
                          <Link
                            href={change.link.href}
                            className="mt-4 inline-block text-sm underline underline-offset-4 transition-colors hover:text-[#0A6EFF]"
                          >
                            {change.link.label} <span aria-hidden>→</span>
                          </Link>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>

                {release.announcement && (
                  <a
                    href={release.announcement.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-block text-sm underline underline-offset-4 transition-colors hover:text-[#0A6EFF]"
                  >
                    {release.announcement.label} <span aria-hidden>↗</span>
                  </a>
                )}
              </article>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
