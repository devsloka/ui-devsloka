import { cn } from "@/lib/utils";

export type LogoCloudLogo = {
  /** Used as the image alt text. */
  name: string;
  src: string;
  /** Shown instead of `src` when a `.dark` ancestor is present. */
  darkSrc?: string;
  href?: string;
};

/** @deprecated Use `src` / `darkSrc`. Kept so older call sites keep compiling. */
type LegacyLogo = { name: string; url: string; darkUrl?: string; href?: string };

export type LogoCloudCarouselProps = React.ComponentProps<"div"> & {
  logos: (LogoCloudLogo | LegacyLogo)[];
  /** Seconds for one full loop. @default 40 */
  speed?: number;
  /** Scroll direction of the first row. @default "left" */
  direction?: "left" | "right";
  /** A second row scrolls in the opposite direction. @default 1 */
  rows?: 1 | 2;
  /** Pause while hovered. @default true */
  pauseOnHover?: boolean;
  /** Fade the left and right edges. @default true */
  fade?: boolean;
};

// Must match the keyframe name used in the animate-[...] class below.
const KEYFRAMES = "logo-cloud-marquee";

function normalize(logo: LogoCloudLogo | LegacyLogo): LogoCloudLogo {
  if ("src" in logo) return logo;
  return { name: logo.name, src: logo.url, darkSrc: logo.darkUrl, href: logo.href };
}

/**
 * Infinite logo marquee in pure CSS. With reduced motion it becomes a static, wrapped row.
 * Use `className` for spacing; the component adds no outer padding.
 */
export function LogoCloudCarousel({
  logos,
  speed = 40,
  direction = "left",
  rows = 1,
  pauseOnHover = true,
  fade = true,
  className,
  style,
  ...props
}: LogoCloudCarouselProps) {
  const items = logos.map(normalize);
  const rowDirections = rows === 2 ? [direction, direction === "left" ? "right" : "left"] : [direction];

  return (
    <div
      data-slot="logo-cloud-carousel"
      className={cn(
        "group/logo-cloud flex flex-col gap-6 overflow-hidden",
        fade &&
          "[mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] motion-reduce:[mask-image:none]",
        className
      )}
      style={{ "--logo-cloud-speed": `${speed}s`, ...style } as React.CSSProperties}
      {...props}
    >
      <style href={KEYFRAMES} precedence="default">
        {`@keyframes ${KEYFRAMES}{from{transform:translateX(0)}to{transform:translateX(-50%)}}`}
      </style>
      {rowDirections.map((rowDirection, row) => (
        <div
          key={row}
          className={cn(
            "flex w-max",
            rowDirection === "left"
              ? "animate-[logo-cloud-marquee_var(--logo-cloud-speed)_linear_infinite]"
              : "animate-[logo-cloud-marquee_var(--logo-cloud-speed)_linear_infinite_reverse]",
            pauseOnHover && "group-hover/logo-cloud:[animation-play-state:paused]",
            "motion-reduce:w-full motion-reduce:animate-none",
            row > 0 && "motion-reduce:hidden"
          )}
          aria-hidden={row > 0 || undefined}
        >
          <LogoList logos={items} hidden={row > 0} />
          <LogoList logos={items} hidden className="motion-reduce:hidden" />
        </div>
      ))}
    </div>
  );
}

function LogoList({
  logos,
  hidden,
  className,
}: {
  logos: LogoCloudLogo[];
  hidden?: boolean;
  className?: string;
}) {
  return (
    <ul
      aria-hidden={hidden || undefined}
      className={cn(
        // min-w-full keeps the loop seamless when there are only a few logos.
        "flex min-w-full shrink-0 items-center justify-around gap-12 pr-12",
        "motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:gap-y-6 motion-reduce:pr-0",
        className
      )}
    >
      {logos.map((logo) => (
        <li key={logo.name} className="shrink-0">
          {logo.href ? (
            <a
              href={logo.href}
              tabIndex={hidden ? -1 : undefined}
              className="block rounded-md opacity-70 outline-none transition-opacity hover:opacity-100 focus-visible:opacity-100 focus-visible:ring-2 focus-visible:ring-ring"
            >
              <LogoImage logo={logo} />
            </a>
          ) : (
            <div className="opacity-70">
              <LogoImage logo={logo} />
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}

// Plain <img> keeps the component framework-agnostic and works with SVG logos of unknown size.
function LogoImage({ logo }: { logo: LogoCloudLogo }) {
  const imgClass = "h-8 w-auto max-w-40 object-contain";
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={logo.src}
        alt={logo.name}
        height={32}
        loading="lazy"
        decoding="async"
        className={cn(imgClass, logo.darkSrc && "dark:hidden")}
      />
      {logo.darkSrc && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={logo.darkSrc}
          alt={logo.name}
          height={32}
          loading="lazy"
          decoding="async"
          className={cn(imgClass, "hidden dark:block")}
        />
      )}
    </>
  );
}
