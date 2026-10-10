import { useId, type ComponentProps } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Action = { label: string; href: string };

export type HeroSectionProps = {
  eyebrow?: string;
  /** The headline. The part after `emphasis` is set in italic. */
  title?: string;
  emphasis?: string;
  description?: string;
  primaryAction?: Action;
  secondaryAction?: Action;
  /** Paragraphs shown in the manuscript preview. */
  manuscript?: string[];
  comment?: { author: string; text: string };
} & ComponentProps<"section">;

const pad = (n: number) => String(n).padStart(2, "0");

const DEFAULTS = {
  eyebrow: "Quire · For long-form writers",
  title: "Write the long thing.",
  emphasis: "the long thing.",
  description:
    "A quiet editor for books, theses and 40-page specs. Chapters, footnotes and an editor's margin, without a single toolbar in the way.",
  primaryAction: { label: "Start a manuscript", href: "#" },
  secondaryAction: { label: "Read a sample chapter", href: "#" },
  manuscript: [
    "The harbour had been closed for eleven days when the first letter arrived, and nobody in the village could say who had carried it.",
    "Ines read it twice at the kitchen table, then folded it into the back of her ledger, between the March accounts and a recipe she had never tried.",
    "By evening the wind had turned. She could hear the boats knocking against the pier, patient as clocks.",
  ],
  comment: {
    author: "M. Ostrowski, editor",
    text: "Love this line. Could the ledger come back in chapter four?",
  },
};

export default function HeroSection({
  eyebrow = DEFAULTS.eyebrow,
  title = DEFAULTS.title,
  emphasis = DEFAULTS.emphasis,
  description = DEFAULTS.description,
  primaryAction = DEFAULTS.primaryAction,
  secondaryAction = DEFAULTS.secondaryAction,
  manuscript = DEFAULTS.manuscript,
  comment = DEFAULTS.comment,
  className,
  ...props
}: HeroSectionProps) {
  const headingId = useId();
  const split = emphasis && title.endsWith(emphasis) ? title.length - emphasis.length : -1;
  const words = manuscript.join(" ").split(/\s+/).length;

  return (
    <section
      data-slot="hero-section-four"
      aria-labelledby={headingId}
      className={cn("w-full bg-background text-foreground", className)}
      {...props}
    >
      <div className="mx-auto grid max-w-6xl gap-14 px-6 py-20 md:grid-cols-12 md:gap-10 md:py-28">
        <div className="md:col-span-6 md:pt-6">
          <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
            {eyebrow}
          </p>
          <h1
            id={headingId}
            className="mt-8 font-serif text-6xl leading-[0.95] tracking-[-0.03em] text-balance md:text-7xl lg:text-8xl"
          >
            {split > 0 ? (
              <>
                {title.slice(0, split)}
                <em className="italic">{title.slice(split)}</em>
              </>
            ) : (
              title
            )}
          </h1>
          <p className="mt-8 max-w-md text-base leading-relaxed text-muted-foreground">
            {description}
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
            <Button asChild size="lg" className="rounded-none">
              <a href={primaryAction.href}>{primaryAction.label}</a>
            </Button>
            <a
              href={secondaryAction.href}
              className="text-sm font-medium underline decoration-1 underline-offset-[6px] hover:text-muted-foreground"
            >
              {secondaryAction.label}
            </a>
          </div>
        </div>

        {/* The manuscript: a page with line numbers and an editor's margin note. */}
        <figure className="relative md:col-span-6">
          <div className="border bg-card">
            <div className="flex items-center justify-between border-b px-5 py-2.5 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
              <span>Ch. 1 · The Letter</span>
              <span>Draft 3</span>
            </div>
            <div className="grid grid-cols-[2.5rem_1fr] gap-x-2 px-5 py-8 sm:grid-cols-[2.5rem_1fr_9rem]">
              {manuscript.map((paragraph, i) => (
                <div key={i} className="contents">
                  <span className="pt-1 text-right font-mono text-[11px] tabular-nums text-muted-foreground">
                    {pad(i * 4 + 1)}
                  </span>
                  <p
                    className={cn(
                      "mb-5 font-serif text-[15px] leading-7",
                      i === 1 && "bg-primary/10 underline decoration-primary decoration-1 underline-offset-4"
                    )}
                  >
                    {paragraph}
                  </p>
                  <div className="hidden sm:block">
                    {i === 1 && comment && (
                      <aside className="border-l-2 border-primary pl-3 text-xs leading-relaxed">
                        <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                          {comment.author}
                        </p>
                        <p className="mt-1">{comment.text}</p>
                      </aside>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between border-t px-5 py-2.5 font-mono text-[11px] text-muted-foreground">
              <span>{words} words in this view</span>
              <span>Saved just now</span>
            </div>
          </div>
        </figure>
      </div>
    </section>
  );
}
