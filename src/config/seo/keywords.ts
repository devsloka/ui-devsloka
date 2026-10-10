const BRAND_KEYWORDS = ["Devsloka UI", "React UI library"];

export const HOME_KEYWORDS = [
  ...BRAND_KEYWORDS,
  "free React components",
  "animated React components",
  "Next.js UI components",
  "Tailwind CSS components",
  "shadcn components",
  "shadcn registry",
  "React UI blocks",
  "Next.js templates",
  "React hooks",
  "open source UI components",
];

const SECTION_KEYWORDS: Record<string, string[]> = {
  components: ["animated React components", "Next.js UI components", "Tailwind CSS components", "shadcn components", "Motion animations"],
  backgrounds: ["animated React backgrounds", "Next.js backgrounds", "canvas backgrounds", "CSS background animations", "hero section backgrounds"],
  blocks: ["React UI blocks", "Tailwind CSS blocks", "shadcn blocks", "Next.js page sections", "landing page blocks"],
  utilities: ["custom React hooks", "TypeScript React hooks", "reusable React hooks", "Next.js hooks", "SSR safe React hooks"],
  templates: ["free Next.js templates", "React website templates", "Tailwind CSS templates", "Next.js starter templates"],
  docs: ["Devsloka UI documentation", "React component library", "shadcn registry documentation", "Tailwind CSS UI library"],
  installation: ["install Devsloka UI", "shadcn CLI installation", "install React components", "Tailwind CSS component setup"],
  changelog: ["Devsloka UI changelog", "Devsloka UI releases", "React component library updates"],
};

/** Relevant topics per route; keep the full library keyword set on the home page. */
export function getSEOKeywords(path: string, title?: string, extra: string[] = []): string[] {
  const segments = path.split("/").filter(Boolean);
  const section = segments[0] === "components" && segments[1] === "backgrounds"
    ? "backgrounds"
    : segments[0];
  const detailPage = segments.length > (section === "backgrounds" ? 2 : 1);
  const terms = [
    ...(segments.length ? BRAND_KEYWORDS : HOME_KEYWORDS),
    ...(SECTION_KEYWORDS[section] ?? []),
    ...(detailPage && title ? [title, `${title} Tailwind CSS`] : []),
    ...extra,
  ];
  const seen = new Set<string>();
  return terms.flatMap((term) => term.split(",")).map((term) => term.trim()).filter((term) => {
    const key = term.toLowerCase();
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}
