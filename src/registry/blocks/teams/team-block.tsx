import { useId, type ComponentProps } from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type TeamMember = {
  name: string;
  role: string;
  /** City and timezone, e.g. "Lisbon · UTC+0". */
  location: string;
  /** One short, personal line. */
  note?: string;
  /** Portrait URL (4:5 works best). Falls back to an initials monogram. */
  image?: string;
};

export type TeamHiring = {
  label: string;
  href: string;
  linkLabel?: string;
};

export type TeamBlockProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  members?: TeamMember[];
  hiring?: TeamHiring | null;
} & ComponentProps<"section">;

const portrait = (id: string) =>
  `https://images.unsplash.com/${id}?w=600&h=750&fit=crop&crop=faces`;

const DEFAULT_MEMBERS: TeamMember[] = [
  {
    name: "Ines Carvalho",
    role: "Founder, Design",
    location: "Lisbon · UTC+0",
    note: "Still sketches every screen on paper first.",
    image: portrait("photo-1438761681033-6461ffad8d80"),
  },
  {
    name: "Theo Lindqvist",
    role: "Engineering",
    location: "Stockholm · UTC+1",
    note: "Wrote our sync engine twice. The second one stuck.",
    image: portrait("photo-1500648767791-00dcc994a43e"),
  },
  {
    name: "Adaeze Nwosu",
    role: "Product",
    location: "Lagos · UTC+1",
    note: "Reads every support ticket, including the angry ones.",
    image: portrait("photo-1531123897727-8f129e1688ce"),
  },
  {
    name: "Kenji Mori",
    role: "Engineering",
    location: "Osaka · UTC+9",
    note: "Keeps the p95 under 80ms and the build under a minute.",
    image: portrait("photo-1506794778202-cad84cf45f1d"),
  },
  {
    name: "Clara Weiss",
    role: "Customer Success",
    location: "Berlin · UTC+1",
    note: "Has onboarded 300-odd teams and remembers most of them.",
    image: portrait("photo-1544005313-94ddf0286df2"),
  },
  {
    name: "Marcus Bell",
    role: "Brand & Writing",
    location: "Toronto · UTC−5",
    note: "Deletes adjectives for a living.",
    image: portrait("photo-1472099645785-5658abf4ff4e"),
  },
  {
    name: "Sofía Ramírez",
    role: "Design Engineering",
    location: "Mexico City · UTC−6",
    note: "Owns the component library and the coffee budget.",
    image: portrait("photo-1534528741775-53994a69daeb"),
  },
  {
    name: "Arjun Mehta",
    role: "Infrastructure",
    location: "Bengaluru · UTC+5:30",
    note: "On call this week. Probably asleep right now.",
    image: portrait("photo-1539571696357-5a69c17a67c6"),
  },
];

const DEFAULT_HIRING: TeamHiring = {
  label: "We're hiring — 3 open roles in engineering and support",
  href: "#careers",
  linkLabel: "See open roles",
};

const pad = (n: number) => String(n).padStart(2, "0");

const initials = (name: string) =>
  name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("");

export function TeamBlock({
  eyebrow = "Team",
  title = "Eight people, five timezones, one product",
  description = "Halden is built by a small, fully remote team. We overlap for two hours a day and write everything else down.",
  members = DEFAULT_MEMBERS,
  hiring = DEFAULT_HIRING,
  className,
  ...props
}: TeamBlockProps) {
  const titleId = useId();

  return (
    <section
      data-slot="team-block"
      aria-labelledby={titleId}
      className={cn("w-full bg-background text-foreground", className)}
      {...props}
    >
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 border-t pt-8 md:grid-cols-12">
          <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground md:col-span-4">
            {eyebrow}
            <span className="ml-2 tabular-nums">({pad(members.length)})</span>
          </p>
          <div className="md:col-span-8">
            <h2
              id={titleId}
              className="max-w-xl text-3xl font-medium tracking-tight text-balance md:text-5xl md:tracking-[-0.03em]"
            >
              {title}
            </h2>
            {description && (
              <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground">
                {description}
              </p>
            )}
          </div>
        </div>

        <ul className="mt-14 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-3 lg:grid-cols-4">
          {members.map((member, i) => (
            <li key={`${member.name}-${i}`} className="group">
              <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-muted">
                {member.image ? (
                  // eslint-disable-next-line @next/next/no-img-element -- plain <img> keeps the block portable outside Next.js
                  <img
                    src={member.image}
                    alt={`Portrait of ${member.name}`}
                    width={600}
                    height={750}
                    loading="lazy"
                    className="size-full object-cover grayscale transition-[filter] duration-500 group-hover:grayscale-0 motion-reduce:transition-none"
                  />
                ) : (
                  <span
                    aria-hidden="true"
                    className="flex size-full items-center justify-center font-mono text-2xl text-muted-foreground"
                  >
                    {initials(member.name)}
                  </span>
                )}
              </div>
              <div className="mt-4 flex items-baseline justify-between gap-3 border-t pt-3">
                <h3 className="text-sm font-medium">{member.name}</h3>
                <span
                  aria-hidden="true"
                  className="font-mono text-xs tabular-nums text-muted-foreground"
                >
                  {pad(i + 1)}
                </span>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{member.role}</p>
              <p className="mt-2 font-mono text-[0.7rem] uppercase tracking-wider text-muted-foreground">
                {member.location}
              </p>
              {member.note && (
                <p className="mt-3 text-sm leading-snug text-pretty">
                  {member.note}
                </p>
              )}
            </li>
          ))}
        </ul>

        {hiring && (
          <div className="mt-16 flex flex-col gap-3 border-y py-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="flex items-center gap-3 text-sm">
              <span aria-hidden="true" className="size-2 shrink-0 bg-primary" />
              {hiring.label}
            </p>
            <a
              href={hiring.href}
              className="group/link inline-flex items-center gap-1 font-mono text-xs uppercase tracking-wider underline-offset-4 outline-none hover:underline focus-visible:ring-2 focus-visible:ring-ring"
            >
              {hiring.linkLabel ?? "Open roles"}
              <ArrowUpRight
                aria-hidden="true"
                className="size-3.5 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 motion-reduce:transition-none"
              />
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
