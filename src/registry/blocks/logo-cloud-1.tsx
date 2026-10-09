import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

export type Wordmark = {
  name: string;
  /** Typographic styling that gives each wordmark its own character. */
  className?: string;
  href?: string;
};

export type LogoCloudBlockProps = {
  eyebrow?: string;
  title?: string;
  wordmarks?: Wordmark[];
  footnote?: string;
} & ComponentProps<"section">;

const DEFAULT_WORDMARKS: Wordmark[] = [
  { name: "Northgate", className: "font-semibold tracking-tight" },
  { name: "PAPERMILL", className: "font-mono text-sm font-medium tracking-[0.2em]" },
  { name: "oddform", className: "font-bold lowercase tracking-[-0.04em]" },
  { name: "Kessler & Ward", className: "font-serif italic" },
  { name: "LUMEN/9", className: "font-black tracking-wide" },
  { name: "Brightwater", className: "font-light tracking-[0.04em]" },
  { name: "tessellate", className: "font-mono text-sm lowercase" },
  { name: "Ostra", className: "font-serif text-xl font-semibold" },
];

/**
 * "Trusted by" section: fictional company wordmarks set as type in a
 * hairline grid, with a label column on the left.
 */
function LogoCloudBlock({
  eyebrow = "Customers",
  title = "Trusted by teams at",
  wordmarks = DEFAULT_WORDMARKS,
  footnote = "4,200+ teams · since 2021",
  className,
  ...props
}: LogoCloudBlockProps) {
  return (
    <section
      data-slot="logo-cloud-1"
      className={cn("w-full bg-background text-foreground", className)}
      {...props}
    >
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 py-20 md:grid-cols-12 md:py-28">
        <div className="md:col-span-3">
          <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
            {eyebrow}
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight">{title}</h2>
          <p className="mt-6 font-mono text-xs tabular-nums text-muted-foreground">
            {footnote}
          </p>
        </div>

        <ul className="grid grid-cols-2 border-l border-t sm:grid-cols-4 md:col-span-9">
          {wordmarks.map((mark) => {
            const label = (
              <span className={cn("text-lg text-foreground/80", mark.className)}>
                {mark.name}
              </span>
            );
            return (
              <li
                key={mark.name}
                className="flex h-24 items-center justify-center border-b border-r px-4 text-center md:h-28"
              >
                {mark.href ? (
                  <a
                    href={mark.href}
                    className="outline-none transition-opacity hover:opacity-60 focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none"
                  >
                    {label}
                  </a>
                ) : (
                  label
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

export { LogoCloudBlock };
export default LogoCloudBlock;
