import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

export type FooterLink = { label: string; href: string };
export type FooterColumn = { title: string; links: FooterLink[] };

export type FooterBlockProps = {
  brand?: string;
  statement?: string;
  address?: string;
  columns?: FooterColumn[];
  legalLinks?: FooterLink[];
  year?: number;
} & ComponentProps<"footer">;

const DEFAULT_COLUMNS: FooterColumn[] = [
  {
    title: "Product",
    links: [
      { label: "Notebooks", href: "#" },
      { label: "Interview recorder", href: "#" },
      { label: "Tagging", href: "#" },
      { label: "Pricing", href: "#" },
      { label: "Changelog", href: "#" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Field guide", href: "#" },
      { label: "Templates", href: "#" },
      { label: "API reference", href: "#" },
      { label: "Status", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Careers — 3 open", href: "#" },
      { label: "Press kit", href: "#" },
      { label: "Contact", href: "#" },
    ],
  },
];

const DEFAULT_LEGAL: FooterLink[] = [
  { label: "Privacy", href: "#" },
  { label: "Terms", href: "#" },
  { label: "DPA", href: "#" },
];

/**
 * Classic footer: brand statement on the left, labelled link columns on the
 * right, and a hairline bottom bar with copyright and legal links.
 */
function FooterBlock({
  brand = "Fieldnote",
  statement = "A research notebook for product teams. Record the interview, tag what matters, and find it again six months later.",
  address = "Made in Lisbon and Rotterdam",
  columns = DEFAULT_COLUMNS,
  legalLinks = DEFAULT_LEGAL,
  year = 2026,
  className,
  ...props
}: FooterBlockProps) {
  return (
    <footer
      data-slot="footer-block"
      className={cn("w-full border-t bg-background text-foreground", className)}
      {...props}
    >
      <div className="mx-auto max-w-6xl px-6 pt-16 md:pt-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <h2 className="flex items-center gap-2 text-lg font-semibold tracking-tight">
              <span aria-hidden className="size-2.5 bg-primary" />
              {brand}
            </h2>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              {statement}
            </p>
            <p className="mt-6 font-mono text-xs uppercase tracking-wider text-muted-foreground">
              {address}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 md:col-span-7">
            {columns.map((column) => (
              <nav key={column.title} aria-label={column.title}>
                <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                  {column.title}
                </p>
                <ul className="mt-4 space-y-2.5 text-sm">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="underline-offset-4 outline-none hover:underline focus-visible:underline focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p className="tabular-nums">
            © {year} {brand}, Inc. All rights reserved.
          </p>
          <nav aria-label="Legal">
            <ul className="flex gap-6">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="underline-offset-4 outline-none hover:text-foreground hover:underline focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}

export { FooterBlock };
export default FooterBlock;
