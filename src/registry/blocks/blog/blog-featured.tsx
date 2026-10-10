import { useId, type CSSProperties, type ComponentProps } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type BlogPost = {
  title: string;
  dek?: string;
  href: string;
  category: string;
  author?: string;
  /** Display date, e.g. "2 Oct 2026". */
  date: string;
  /** Machine-readable date for <time>, e.g. "2026-10-02". */
  dateTime: string;
  /** Reading time in minutes. */
  readingTime: number;
  image: { src: string; alt: string };
};

export type BlogFeaturedProps = {
  eyebrow?: string;
  title?: string;
  archive?: { label: string; href: string };
  featured?: BlogPost;
  posts?: BlogPost[];
  /** Ink used for the category tags. Text on the tag is white, so keep it dark. */
  accent?: string;
} & ComponentProps<"section">;

const unsplash = (id: string, w: number) =>
  `https://images.unsplash.com/${id}?w=${w}&q=80&auto=format&fit=crop`;

const DEFAULT_FEATURED: BlogPost = {
  title: "We moved booking reminders to the night before. No-shows fell 31%.",
  dek: "A guesthouse above Lake Oeschinen asked why half its guests missed the 8 a.m. boat. Eight weeks and 412 properties later we have an answer, and a few caveats we did not expect.",
  href: "#",
  category: "Field notes",
  author: "Ana Ferreira",
  date: "2 Oct 2026",
  dateTime: "2026-10-02",
  readingTime: 9,
  image: {
    src: unsplash("photo-1501785888041-af3ef285b470", 1400),
    alt: "An alpine lake with a small boat, mountains rising behind it",
  },
};

const DEFAULT_POSTS: BlogPost[] = [
  {
    title: "Why the shops we love still hand-letter their opening hours",
    href: "#",
    category: "Owners",
    author: "Hanne Vos",
    date: "24 Sep 2026",
    dateTime: "2026-09-24",
    readingTime: 6,
    image: {
      src: unsplash("photo-1472851294608-062f824d29cc", 400),
      alt: "An “Open” sign hanging on a shop door",
    },
  },
  {
    title: "Seasonal pricing is mostly a guess. Here is how to guess better.",
    href: "#",
    category: "Operations",
    author: "Tomás Reyes",
    date: "11 Sep 2026",
    dateTime: "2026-09-11",
    readingTime: 7,
    image: {
      src: unsplash("photo-1507525428034-b723cf961d3e", 400),
      alt: "A beach at sunset",
    },
  },
  {
    title: "Rebuilding the calendar view without breaking anyone’s bookmarks",
    href: "#",
    category: "Engineering",
    author: "Jun Watanabe",
    date: "19 Aug 2026",
    dateTime: "2026-08-19",
    readingTime: 12,
    image: {
      src: unsplash("photo-1551288049-bebda4e38f71", 400),
      alt: "An analytics dashboard open on a laptop",
    },
  },
];

const DEFAULTS = {
  eyebrow: "Saltbox Journal · Notes from the front desk",
  title: "What we learned running 4,000 small front desks",
  archive: { label: "All 146 articles", href: "#" },
  accent: "#0A6EFF",
};

const TAG_TEXT = "#FFFFFF";

const focusRing =
  "outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background";

function Tag({ children }: { children: string }) {
  return (
    <span
      className="inline-block bg-[var(--block-accent)] px-2 py-1 font-mono text-[11px] uppercase leading-none tracking-wider"
      style={{ color: TAG_TEXT }}
    >
      {children}
    </span>
  );
}

function Meta({ post, className }: { post: BlogPost; className?: string }) {
  return (
    <p
      className={cn(
        "flex flex-wrap gap-x-3 gap-y-1 font-mono text-xs text-muted-foreground",
        className
      )}
    >
      {post.author && <span>{post.author}</span>}
      <time dateTime={post.dateTime}>{post.date}</time>
      <span>{post.readingTime} min read</span>
    </p>
  );
}

export function BlogFeatured({
  eyebrow = DEFAULTS.eyebrow,
  title = DEFAULTS.title,
  archive = DEFAULTS.archive,
  featured = DEFAULT_FEATURED,
  posts = DEFAULT_POSTS,
  accent = DEFAULTS.accent,
  className,
  style,
  ...props
}: BlogFeaturedProps) {
  const headingId = useId();

  return (
    <section
      data-slot="blog-featured"
      aria-labelledby={headingId}
      className={cn("w-full bg-background text-foreground", className)}
      style={{ "--block-accent": accent, ...style } as CSSProperties}
      {...props}
    >
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <div className="grid gap-6 border-b pb-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
              {eyebrow}
            </p>
            <h2
              id={headingId}
              className="mt-5 max-w-2xl text-4xl font-semibold leading-[1.02] tracking-[-0.03em] text-balance md:text-5xl"
            >
              {title}
            </h2>
          </div>
          <a
            href={archive.href}
            className={cn(
              "inline-flex items-center gap-2 justify-self-start text-sm font-medium underline decoration-1 underline-offset-[6px] hover:text-muted-foreground md:col-span-4 md:justify-self-end",
              focusRing
            )}
          >
            {archive.label}
            <ArrowRight aria-hidden className="size-4" />
          </a>
        </div>

        <div className="mt-10 grid gap-12 md:grid-cols-12 md:gap-10">
          <article className="md:col-span-7">
            <a href={featured.href} className={cn("group block", focusRing)}>
              {/* Plain <img> keeps the block portable outside Next.js. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={featured.image.src}
                alt={featured.image.alt}
                width={1400}
                height={1050}
                className="aspect-[4/3] w-full bg-muted object-cover"
              />
              <div className="mt-6">
                <Tag>{featured.category}</Tag>
                <h3 className="mt-4 text-3xl font-semibold leading-[1.08] tracking-[-0.025em] text-balance decoration-1 underline-offset-[6px] group-hover:underline md:text-4xl">
                  {featured.title}
                </h3>
                {featured.dek && (
                  <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
                    {featured.dek}
                  </p>
                )}
                <Meta post={featured} className="mt-5" />
              </div>
            </a>
          </article>

          <div className="md:col-span-5">
            <p className="flex items-baseline justify-between border-b pb-3 font-mono text-xs uppercase tracking-wider text-muted-foreground">
              <span>Also this month</span>
              <span className="tabular-nums">{String(posts.length).padStart(2, "0")}</span>
            </p>
            <ul className="divide-y border-b">
              {posts.map((post) => (
                <li key={post.href + post.title}>
                  <article>
                    <a
                      href={post.href}
                      className={cn("group grid grid-cols-[1fr_6rem] gap-5 py-6 sm:grid-cols-[1fr_7.5rem]", focusRing)}
                    >
                      <div>
                        <Tag>{post.category}</Tag>
                        <h3 className="mt-3 text-lg font-semibold leading-snug tracking-[-0.015em] text-pretty decoration-1 underline-offset-4 group-hover:underline">
                          {post.title}
                        </h3>
                        <Meta post={post} className="mt-3" />
                      </div>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={post.image.src}
                        alt={post.image.alt}
                        width={400}
                        height={300}
                        loading="lazy"
                        className="aspect-[4/3] w-full bg-muted object-cover"
                      />
                    </a>
                  </article>
                </li>
              ))}
            </ul>
            <p className="mt-4 font-mono text-[11px] leading-relaxed text-muted-foreground">
              New pieces most Thursdays. Written by the people who answer your support emails.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
