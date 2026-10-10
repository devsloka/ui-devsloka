import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

export type WaveFooterLink = { label: string; href: string };

export type WaveFooterProps = {
  wordmark?: string;
  tagline?: string;
  links?: WaveFooterLink[];
  socialLinks?: WaveFooterLink[];
  email?: string;
  year?: number;
} & ComponentProps<"footer">;

const DEFAULT_LINKS: WaveFooterLink[] = [
  { label: "Work", href: "#" },
  { label: "Studio", href: "#" },
  { label: "Journal", href: "#" },
  { label: "Careers", href: "#" },
];

const DEFAULT_SOCIAL: WaveFooterLink[] = [
  { label: "Instagram", href: "#" },
  { label: "Are.na", href: "#" },
  { label: "LinkedIn", href: "#" },
];

const linkClass =
  "underline-offset-4 outline-none hover:underline focus-visible:underline focus-visible:ring-2 focus-visible:ring-ring";

/**
 * Oversized wordmark footer: a compact link row sits above the brand name,
 * which is set at display size and cropped by the bottom edge.
 */
export function WaveFooter({
  wordmark = "Halden",
  tagline = "Identity and type for cultural institutions. Booking projects from March.",
  links = DEFAULT_LINKS,
  socialLinks = DEFAULT_SOCIAL,
  email = "studio@halden.example",
  year = 2026,
  className,
  ...props
}: WaveFooterProps) {
  return (
    <footer
      data-slot="wave-footer"
      className={cn(
        "w-full overflow-hidden border-t bg-background text-foreground",
        className
      )}
      {...props}
    >
      <h2 className="sr-only">{wordmark} footer</h2>
      <div className="mx-auto max-w-6xl px-6 pt-16 md:pt-20">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          <p className="max-w-xs text-sm leading-relaxed text-muted-foreground md:col-span-4">
            {tagline}
          </p>

          <nav aria-label="Site" className="md:col-span-2">
            <ul className="space-y-1.5 text-sm">
              {links.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className={linkClass}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Social" className="md:col-span-3">
            <ul className="space-y-1.5 text-sm">
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className={linkClass}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="text-sm md:col-span-3 md:text-right">
            <a href={`mailto:${email}`} className={linkClass}>
              {email}
            </a>
          </div>
        </div>

        <div className="mt-14 flex items-center justify-between border-t pt-4 font-mono text-xs uppercase tracking-wider text-muted-foreground">
          <span className="tabular-nums">© {year}</span>
          <span>Oslo — Bergen</span>
        </div>
      </div>

      <div aria-hidden className="mx-auto max-w-6xl px-6">
        <p className="-mb-[0.24em] select-none text-[clamp(5rem,22vw,17rem)] font-semibold leading-[0.85] tracking-[-0.06em]">
          {wordmark}
        </p>
      </div>
    </footer>
  );
}
