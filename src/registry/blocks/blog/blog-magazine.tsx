import { useId, type CSSProperties, type ComponentProps } from "react";
import { cn } from "@/lib/utils";

export type MagazineInk = "blue" | "black" | "navy" | "tint";
export type MagazineShape = "half-circle" | "dots" | "bars" | "circle";

type TileBase = {
  /** Issue number, shown as "No. 14". */
  issue: number;
  /** Small mono label, e.g. "Autumn 2026". */
  label: string;
  title: string;
  href: string;
  /** "feature" spans 2×2, "wide" spans 2×1, default is 1×1. */
  size?: "feature" | "wide";
};

export type MagazineTile =
  | (TileBase & { kind: "photo"; image: { src: string; alt: string }; dek?: string })
  | (TileBase & { kind: "cover"; ink: MagazineInk; shape?: MagazineShape; numeral?: string });

export type BlogMagazineProps = {
  eyebrow?: string;
  title?: string;
  note?: string;
  tiles?: MagazineTile[];
  /** Override any of the four cover inks. */
  inks?: Partial<Record<MagazineInk, string>>;
} & ComponentProps<"section">;

const unsplash = (id: string, w: number) =>
  `https://images.unsplash.com/${id}?w=${w}&q=80&auto=format&fit=crop`;

const DEFAULT_INKS: Record<MagazineInk, string> = {
  blue: "#0A6EFF",
  black: "#0A0A0A",
  navy: "#0B2A66",
  tint: "#E8F0FF",
};

/** Text colour per ink, chosen for contrast (white on Devsloka blue keeps small labels above 4.5:1). */
const INK_TEXT: Record<MagazineInk, string> = {
  blue: "#FFFFFF",
  black: "#FFFFFF",
  navy: "#FFFFFF",
  tint: "#0A0A0A",
};

const DEFAULT_TILES: MagazineTile[] = [
  {
    kind: "photo",
    size: "feature",
    issue: 14,
    label: "Autumn 2026 · 64 pages",
    title: "The quiet season",
    dek: "Eleven owners on what they actually do between the last hikers and the first snow. Mostly: fix the boiler.",
    href: "#",
    image: {
      src: unsplash("photo-1506905925346-21bda4d32df4", 1400),
      alt: "Mountains above the clouds at dawn",
    },
  },
  {
    kind: "cover",
    ink: "blue",
    shape: "half-circle",
    issue: 13,
    label: "Summer 2026",
    title: "Full house, empty fridge",
    href: "#",
  },
  {
    kind: "photo",
    issue: 12,
    label: "Spring 2026",
    title: "Open until the last guest leaves",
    href: "#",
    image: { src: unsplash("photo-1472851294608-062f824d29cc", 800), alt: "An “Open” sign on a shop door" },
  },
  {
    kind: "photo",
    issue: 11,
    label: "Winter 2025",
    title: "The spare room economy",
    href: "#",
    image: { src: unsplash("photo-1583847268964-b28dc8f51f92", 800), alt: "A cosy living room interior" },
  },
  {
    kind: "cover",
    ink: "black",
    shape: "dots",
    issue: 10,
    label: "Autumn 2025",
    title: "Fewer rooms, better ones",
    href: "#",
  },
  {
    kind: "cover",
    ink: "navy",
    size: "wide",
    numeral: "40",
    issue: 9,
    label: "Summer 2025 · The staffing issue",
    title: "Forty rooms, one desk, no night shift",
    href: "#",
  },
  {
    kind: "photo",
    issue: 8,
    label: "Spring 2025",
    title: "Walks the guests found first",
    href: "#",
    image: { src: unsplash("photo-1441974231531-c6227db76b6e", 800), alt: "A sunlit forest path" },
  },
  {
    kind: "cover",
    ink: "tint",
    shape: "bars",
    issue: 7,
    label: "Winter 2024",
    title: "Notes on charging more",
    href: "#",
  },
];

const DEFAULTS = {
  eyebrow: "Saltbox Quarterly · In print since 2023",
  title: "A small magazine for people who run small places",
  note: "Posted free to every Saltbox owner who asks. Back issues while they last.",
};

const focusRing =
  "outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

const SIZE: Record<NonNullable<TileBase["size"]> | "default", string> = {
  feature: "col-span-2 row-span-2",
  wide: "col-span-2",
  default: "",
};

const pad = (n: number) => String(n).padStart(2, "0");

function Shape({ shape }: { shape: MagazineShape }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 100 100"
      className="absolute top-5 right-5 size-24 md:size-28"
      fill="currentColor"
    >
      {shape === "circle" && <circle cx="50" cy="50" r="46" />}
      {shape === "half-circle" && <path d="M4 50a46 46 0 0 1 92 0Z" />}
      {shape === "dots" &&
        Array.from({ length: 25 }, (_, i) => (
          <circle key={i} cx={10 + (i % 5) * 20} cy={10 + Math.floor(i / 5) * 20} r="4" />
        ))}
      {shape === "bars" &&
        [92, 70, 50, 30].map((w, i) => <rect key={i} x={100 - w} y={8 + i * 24} width={w} height="12" />)}
    </svg>
  );
}

export function BlogMagazine({
  eyebrow = DEFAULTS.eyebrow,
  title = DEFAULTS.title,
  note = DEFAULTS.note,
  tiles = DEFAULT_TILES,
  inks,
  className,
  style,
  ...props
}: BlogMagazineProps) {
  const headingId = useId();
  const palette = { ...DEFAULT_INKS, ...inks };

  return (
    <section
      data-slot="blog-magazine"
      aria-labelledby={headingId}
      className={cn("w-full bg-background text-foreground", className)}
      style={
        {
          "--ink-blue": palette.blue,
          "--ink-black": palette.black,
          "--ink-navy": palette.navy,
          "--ink-tint": palette.tint,
          ...style,
        } as CSSProperties
      }
      {...props}
    >
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <div className="grid gap-6 md:grid-cols-12 md:items-end">
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
          <p className="max-w-xs font-mono text-xs leading-relaxed text-muted-foreground md:col-span-4 md:justify-self-end md:text-right">
            {note}
          </p>
        </div>

        <ul className="mt-12 grid auto-rows-[15rem] grid-cols-2 gap-3 md:auto-rows-[17rem] md:grid-cols-4">
          {tiles.map((tile) => (
            <li key={tile.issue} className={SIZE[tile.size ?? "default"]}>
              {tile.kind === "photo" ? (
                <a
                  href={tile.href}
                  className={cn("group relative block size-full overflow-hidden bg-muted", focusRing)}
                >
                  {/* Plain <img> keeps the block portable outside Next.js. */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={tile.image.src}
                    alt={tile.image.alt}
                    width={tile.size === "feature" ? 1400 : 800}
                    height={tile.size === "feature" ? 1400 : 800}
                    loading="lazy"
                    className="absolute inset-0 size-full object-cover"
                  />
                  <div
                    className={cn(
                      "absolute bottom-0 left-0 bg-background text-foreground",
                      tile.size === "feature" ? "max-w-md p-5 pr-8 md:p-7" : "max-w-[88%] p-3 pr-5"
                    )}
                  >
                    <p className="flex gap-3 font-mono text-[10px] uppercase tracking-wider text-muted-foreground md:text-[11px]">
                      <span className="tabular-nums">No. {pad(tile.issue)}</span>
                      <span>{tile.label}</span>
                    </p>
                    <h3
                      className={cn(
                        "mt-2 font-semibold tracking-[-0.025em] text-balance decoration-1 underline-offset-4 group-hover:underline",
                        tile.size === "feature"
                          ? "text-3xl leading-[1.02] md:text-5xl"
                          : "text-base leading-snug md:text-lg"
                      )}
                    >
                      {tile.title}
                    </h3>
                    {tile.dek && tile.size === "feature" && (
                      <p className="mt-3 hidden text-sm leading-relaxed text-muted-foreground sm:block">
                        {tile.dek}
                      </p>
                    )}
                  </div>
                </a>
              ) : (
                <a
                  href={tile.href}
                  className={cn(
                    "group relative flex size-full flex-col justify-between overflow-hidden p-4 md:p-5",
                    focusRing
                  )}
                  style={{ backgroundColor: `var(--ink-${tile.ink})`, color: INK_TEXT[tile.ink] }}
                >
                  {tile.shape && <Shape shape={tile.shape} />}
                  {tile.numeral && (
                    <span
                      aria-hidden
                      className="absolute -top-4 right-3 text-[9rem] font-semibold leading-none tracking-[-0.06em] tabular-nums md:-top-6 md:text-[13rem]"
                    >
                      {tile.numeral}
                    </span>
                  )}
                  <p className="relative font-mono text-[10px] uppercase tracking-wider md:text-[11px]">
                    <span className="tabular-nums">No. {pad(tile.issue)}</span>
                  </p>
                  <div className="relative">
                    <h3 className="max-w-[14ch] text-2xl font-semibold leading-[1.02] tracking-[-0.03em] text-balance decoration-2 underline-offset-4 group-hover:underline md:text-3xl">
                      {tile.title}
                    </h3>
                    <p className="mt-3 border-t border-current pt-2 font-mono text-[10px] uppercase tracking-wider md:text-[11px]">
                      {tile.label}
                    </p>
                  </div>
                </a>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
