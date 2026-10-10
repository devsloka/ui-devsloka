"use client";

import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type ComponentProps,
  type PointerEvent,
} from "react";
import { useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

export type BlogIndexEntry = {
  title: string;
  href: string;
  category: string;
  /** Display date inside its year group, e.g. "02 Oct". */
  date: string;
  /** Machine-readable date, e.g. "2026-10-02". The year groups come from this. */
  dateTime: string;
  /** Reading time in minutes. */
  readingTime: number;
  /** Shown as a pointer-following preview on desktop. */
  image: { src: string; alt: string };
};

export type BlogIndexProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  entries?: BlogIndexEntry[];
  /** Ink for the active filter and the hovered row marker. */
  accent?: string;
} & ComponentProps<"section">;

const unsplash = (id: string) =>
  `https://images.unsplash.com/${id}?w=480&h=360&q=80&auto=format&fit=crop`;

const DEFAULT_ENTRIES: BlogIndexEntry[] = [
  {
    title: "We moved booking reminders to the night before. No-shows fell 31%",
    href: "#",
    category: "Field notes",
    date: "02 Oct",
    dateTime: "2026-10-02",
    readingTime: 9,
    image: { src: unsplash("photo-1501785888041-af3ef285b470"), alt: "An alpine lake with a small boat" },
  },
  {
    title: "Why the shops we love still hand-letter their opening hours",
    href: "#",
    category: "Owners",
    date: "24 Sep",
    dateTime: "2026-09-24",
    readingTime: 6,
    image: { src: unsplash("photo-1472851294608-062f824d29cc"), alt: "An “Open” sign on a shop door" },
  },
  {
    title: "Seasonal pricing is mostly a guess. Here is how to guess better",
    href: "#",
    category: "Operations",
    date: "11 Sep",
    dateTime: "2026-09-11",
    readingTime: 7,
    image: { src: unsplash("photo-1507525428034-b723cf961d3e"), alt: "A beach at sunset" },
  },
  {
    title: "Rebuilding the calendar view without breaking anyone’s bookmarks",
    href: "#",
    category: "Engineering",
    date: "19 Aug",
    dateTime: "2026-08-19",
    readingTime: 12,
    image: { src: unsplash("photo-1551288049-bebda4e38f71"), alt: "An analytics dashboard on a laptop" },
  },
  {
    title: "One person, forty rooms, and a front desk that closes at nine",
    href: "#",
    category: "Owners",
    date: "03 Jul",
    dateTime: "2026-07-03",
    readingTime: 8,
    image: { src: unsplash("photo-1583847268964-b28dc8f51f92"), alt: "A cosy living room interior" },
  },
  {
    title: "The case against a “Book now” button on every page",
    href: "#",
    category: "Design",
    date: "28 Nov",
    dateTime: "2025-11-28",
    readingTime: 5,
    image: { src: unsplash("photo-1493809842364-78817add7ffb"), alt: "A bright living room with a blue sofa" },
  },
  {
    title: "What a hostel in Zermatt taught us about overbooking on purpose",
    href: "#",
    category: "Field notes",
    date: "14 Oct",
    dateTime: "2025-10-14",
    readingTime: 10,
    image: { src: unsplash("photo-1483728642387-6c3bdd6c93e5"), alt: "Snowy alpine peaks" },
  },
  {
    title: "We deleted 40% of the settings screen. Nobody wrote in",
    href: "#",
    category: "Design",
    date: "02 Jun",
    dateTime: "2025-06-02",
    readingTime: 6,
    image: { src: unsplash("photo-1485955900006-10f4d324d411"), alt: "A succulent in a mint pot on a white surface" },
  },
  {
    title: "Moving nine million bookings to a new database on a Tuesday afternoon",
    href: "#",
    category: "Engineering",
    date: "17 Mar",
    dateTime: "2025-03-17",
    readingTime: 14,
    image: { src: unsplash("photo-1480714378408-67cf0d13bc1b"), alt: "A city skyline" },
  },
  {
    title: "Pricing the shoulder season: notes from sixty owners",
    href: "#",
    category: "Operations",
    date: "21 Nov",
    dateTime: "2024-11-21",
    readingTime: 9,
    image: { src: unsplash("photo-1506905925346-21bda4d32df4"), alt: "Mountains above the clouds at dawn" },
  },
  {
    title: "The guest who booked the same room for twenty-two summers",
    href: "#",
    category: "Owners",
    date: "08 Aug",
    dateTime: "2024-08-08",
    readingTime: 7,
    image: { src: unsplash("photo-1441974231531-c6227db76b6e"), alt: "A sunlit forest path" },
  },
  {
    title: "Why our invoices still fit on one printed page",
    href: "#",
    category: "Design",
    date: "15 Feb",
    dateTime: "2024-02-15",
    readingTime: 4,
    image: { src: unsplash("photo-1448375240586-882707db888b"), alt: "Tall forest trees seen from below" },
  },
];

const DEFAULTS = {
  eyebrow: "Saltbox Journal · Archive",
  title: "Everything we’ve written down",
  description:
    "Three years of notes on running small guesthouses and shops: what worked, what didn’t, and the numbers behind both.",
  accent: "#0A6EFF",
};

const PREVIEW_W = 240;
const PREVIEW_H = 180;
const OFFSET = 24;

const focusRing =
  "outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

export function BlogIndex({
  eyebrow = DEFAULTS.eyebrow,
  title = DEFAULTS.title,
  description = DEFAULTS.description,
  entries = DEFAULT_ENTRIES,
  accent = DEFAULTS.accent,
  className,
  style,
  ...props
}: BlogIndexProps) {
  const headingId = useId();
  const reduceMotion = useReducedMotion();
  const [category, setCategory] = useState<string | null>(null);
  const [active, setActive] = useState<string | null>(null);

  const listRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef(0);
  const pointRef = useRef({ x: 0, y: 0 });

  useEffect(() => () => cancelAnimationFrame(frameRef.current), []);

  const categories = useMemo(
    () => Array.from(new Set(entries.map((entry) => entry.category))),
    [entries]
  );

  const groups = useMemo(() => {
    const visible = category ? entries.filter((e) => e.category === category) : entries;
    const byYear = new Map<string, BlogIndexEntry[]>();
    for (const entry of visible) {
      const year = entry.dateTime.slice(0, 4);
      byYear.set(year, [...(byYear.get(year) ?? []), entry]);
    }
    return Array.from(byYear, ([year, items]) => ({ year, items })).sort((a, b) =>
      b.year.localeCompare(a.year)
    );
  }, [entries, category]);

  const visibleCount = groups.reduce((sum, group) => sum + group.items.length, 0);

  const place = (x: number, y: number) => {
    const preview = previewRef.current;
    if (preview) preview.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  };

  // Follow the pointer: write the transform straight to the DOM, once per frame.
  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse" || reduceMotion || !listRef.current) return;
    const rect = listRef.current.getBoundingClientRect();
    pointRef.current = {
      x: Math.min(event.clientX - rect.left + OFFSET, rect.width - PREVIEW_W),
      y: event.clientY - rect.top - PREVIEW_H / 2,
    };
    if (frameRef.current) return;
    frameRef.current = requestAnimationFrame(() => {
      frameRef.current = 0;
      place(pointRef.current.x, pointRef.current.y);
    });
  };

  const handleRowEnter = (event: PointerEvent<HTMLAnchorElement>, key: string) => {
    if (event.pointerType !== "mouse" || !listRef.current) return;
    const list = listRef.current.getBoundingClientRect();
    if (reduceMotion) {
      // No following: pin the preview to the right edge, level with the row.
      const row = event.currentTarget.getBoundingClientRect();
      place(list.width - PREVIEW_W, row.top - list.top + row.height / 2 - PREVIEW_H / 2);
    } else {
      place(
        Math.min(event.clientX - list.left + OFFSET, list.width - PREVIEW_W),
        event.clientY - list.top - PREVIEW_H / 2
      );
    }
    setActive(key);
  };

  return (
    <section
      data-slot="blog-index"
      aria-labelledby={headingId}
      className={cn("w-full bg-background text-foreground", className)}
      style={{ "--block-accent": accent, ...style } as CSSProperties}
      {...props}
    >
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <div className="grid gap-8 md:grid-cols-12">
          <div className="md:col-span-7">
            <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
              {eyebrow}
            </p>
            <h2
              id={headingId}
              className="mt-5 text-4xl font-semibold leading-[1.02] tracking-[-0.03em] text-balance md:text-5xl"
            >
              {title}
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-muted-foreground md:col-span-5 md:self-end md:justify-self-end">
            {description}
          </p>
        </div>

        <div className="mt-12 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-4 border-y py-4">
          <div role="group" aria-label="Filter by category" className="flex flex-wrap gap-x-5 gap-y-2">
            {[null, ...categories].map((item) => {
              const pressed = category === item;
              return (
                <button
                  key={item ?? "all"}
                  type="button"
                  aria-pressed={pressed}
                  onClick={() => setCategory(item)}
                  className={cn(
                    "py-1 text-sm decoration-2 underline-offset-[6px] transition-colors",
                    pressed
                      ? "font-medium text-foreground underline decoration-[var(--block-accent)]"
                      : "text-muted-foreground hover:text-foreground",
                    focusRing
                  )}
                >
                  {item ?? "All"}
                </button>
              );
            })}
          </div>
          <p aria-live="polite" className="font-mono text-xs tabular-nums text-muted-foreground">
            {visibleCount} {visibleCount === 1 ? "article" : "articles"}
          </p>
        </div>

        <div
          ref={listRef}
          className="relative"
          onPointerMove={handlePointerMove}
          onPointerLeave={() => setActive(null)}
        >
          {groups.map(({ year, items }) => (
            <div key={year} className="grid gap-x-10 border-b md:grid-cols-12">
              <h3 className="pt-8 pb-2 font-mono text-sm tabular-nums text-muted-foreground md:col-span-2 md:pb-8">
                {year}
              </h3>
              <ul className="divide-y md:col-span-10 md:py-2">
                {items.map((entry) => {
                  const key = entry.dateTime + entry.title;
                  return (
                    <li key={key}>
                      <a
                        href={entry.href}
                        onPointerEnter={(event) => handleRowEnter(event, key)}
                        className={cn(
                          "group grid grid-cols-[1fr_auto] gap-x-6 gap-y-1 py-5 md:grid-cols-[4.5rem_1fr_7.5rem_4.5rem] md:items-baseline",
                          focusRing
                        )}
                      >
                        <time
                          dateTime={entry.dateTime}
                          className="col-start-1 row-start-1 font-mono text-xs tabular-nums text-muted-foreground md:col-auto md:row-auto"
                        >
                          {entry.date}
                        </time>
                        <span className="col-span-2 flex items-baseline gap-3 text-lg font-medium leading-snug tracking-[-0.015em] text-pretty md:col-span-1">
                          <span
                            aria-hidden
                            className={cn(
                              "hidden size-2 shrink-0 translate-y-[-0.15em] bg-[var(--block-accent)] transition-opacity md:inline-block",
                              active === key ? "opacity-100" : "opacity-0"
                            )}
                          />
                          <span className="decoration-1 underline-offset-4 group-hover:underline">
                            {entry.title}
                          </span>
                        </span>
                        <span className="col-start-2 row-start-1 text-right text-xs text-muted-foreground md:col-auto md:row-auto md:text-left md:text-sm">
                          {entry.category}
                        </span>
                        <span className="hidden text-right font-mono text-xs tabular-nums text-muted-foreground md:block">
                          {entry.readingTime} min
                        </span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}

          {visibleCount === 0 && (
            <p className="border-b py-10 text-sm text-muted-foreground">Nothing filed here yet.</p>
          )}

          {/* Pointer-following preview. Fine pointers only; touch taps just follow the link. */}
          <div
            ref={previewRef}
            aria-hidden
            className={cn(
              "pointer-events-none absolute top-0 left-0 z-10 hidden overflow-hidden border bg-muted transition-opacity duration-150 [@media(hover:hover)_and_(pointer:fine)]:md:block",
              active ? "opacity-100" : "opacity-0"
            )}
            style={{ width: PREVIEW_W, height: PREVIEW_H }}
          >
            {entries.map((entry) => {
              const key = entry.dateTime + entry.title;
              return (
                // Plain <img> keeps the block portable outside Next.js.
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={key}
                  src={entry.image.src}
                  alt=""
                  width={PREVIEW_W}
                  height={PREVIEW_H}
                  loading="lazy"
                  className={cn(
                    "absolute inset-0 size-full object-cover",
                    active === key ? "opacity-100" : "opacity-0"
                  )}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
