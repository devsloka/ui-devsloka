import registry from "../../registry.json";
import { components } from "@/lib/components";
import { templates } from "@/lib/templates";
import { backgrounds } from "@/utilities/backgrounds.utils";
import { blocks } from "@/utilities/blocks.utils";
import { utilities } from "@/utilities/hooks.utils";
import { CHANGELOG } from "@/lib/changelog";
import { SITE_DESCRIPTION, SITE_NAME, SITE_REPOSITORY, siteUrl } from "@/config/seo/seo.config";

type DocumentationEntry = {
  title: string;
  path: string;
  description: string;
  registryNames: string[];
};

export const CORE_PAGES = [
  { title: "Home", path: "/", description: "Library overview, live previews, filterable index, text-effect playground, and Free / Pro editions." },
  { title: "Introduction", path: "/docs", description: "Source ownership, design principles, supported stack, and library overview." },
  { title: "Installation", path: "/installation", description: "shadcn CLI setup, manual installation, dependencies, and image configuration." },
  { title: "Components", path: "/components", description: "Animated React components with live demos and source code." },
  { title: "Backgrounds", path: "/components/backgrounds", description: "Animated layers for React sections." },
  { title: "Hooks", path: "/utilities", description: "Reusable React hooks for browser state, events, data, and forms." },
  { title: "Blocks", path: "/blocks", description: "Page sections, authentication screens, and not-found layouts with multiple variants." },
  { title: "Templates", path: "/templates", description: "Complete Next.js sites with live previews and separate source repositories." },
  { title: "Changelog", path: "/changelog", description: "Dated releases from the May 21, 2025 launch onward." },
];

const registryName = (path: string) => path.split("/").pop()!.replace(/\.(tsx?|jsx?)$/, "");

export const DOCUMENTATION: Record<string, DocumentationEntry[]> = {
  Components: components.map((component) => ({
    title: component.title,
    path: component.href,
    description: component.description,
    registryNames: [component.href.split("/").pop()!],
  })),
  Backgrounds: Object.entries(backgrounds).map(([slug, background]) => ({
    title: background.title,
    path: `/components/backgrounds/${slug}`,
    description: background.description,
    registryNames: [slug],
  })),
  Hooks: Object.entries(utilities).map(([slug, hook]) => ({
    title: hook.codeMetadata.title,
    path: `/utilities/${slug}`,
    description: hook.codeMetadata.description,
    registryNames: [slug],
  })),
  Blocks: Object.entries(blocks).map(([slug, block]) => ({
    title: block.title,
    path: `/blocks/${slug}`,
    description: block.description,
    registryNames: [block.codeMetadata.mainFile, ...(block.codeMetadata.relatedFiles ?? [])]
      .map((file) => registryName(file.codePath)),
  })),
};

// This catalog also drives AI discovery, so new published docs appear in both.
export const PUBLIC_PAGE_PATHS = [
  ...CORE_PAGES.map((page) => page.path),
  ...Object.values(DOCUMENTATION).flat().map((page) => page.path),
  ...templates.map((template) => `/templates/${template.slug}`),
];

export function renderLlmsIndex(): string {
  return [
    `# ${SITE_NAME}`,
    `> ${SITE_DESCRIPTION}`,
    "Devsloka UI is a free, MIT-licensed source library for React 19 and Tailwind CSS v4 projects. Components use Motion and Radix UI where applicable. Install individual files with shadcn or copy their source; no Devsloka runtime package is required. Pro is coming soon.",
    "## Guides",
    `- [Full Devsloka UI context](${siteUrl("llms-full.txt")}): Installation, customization, every published documentation entry, every registry variant, templates, and release history in Markdown.`,
    `- [Project README](${SITE_REPOSITORY}/raw/refs/heads/main/README.md): Project overview and contributor workflow.`,
    "## Website",
    ...CORE_PAGES.map((page) => `- [${page.title}](${siteUrl(page.path)}): ${page.description}`),
    "## Source and registry",
    `- [Source repository](${SITE_REPOSITORY}): TypeScript component, block, background, and hook implementations.`,
    `- [Registry catalog](${SITE_REPOSITORY}/raw/refs/heads/main/registry.json): Exact installable names, source paths, and dependencies.`,
    `- [Text Effect registry JSON](${siteUrl("r/text-effect.json")}): Example of the installable JSON format, including source content.`,
    "## Optional",
    `- [Studio](https://www.devsloka.in): The team behind Devsloka UI.`,
    `- [Contact](https://www.devsloka.in/contact-us): Questions and Pro updates.`,
    `- [Issues](${SITE_REPOSITORY}/issues): Bug reports and feature requests.`,
  ].join("\n\n") + "\n";
}

export function renderLlmsFull(): string {
  const entries = Object.values(DOCUMENTATION).flat();
  const lines = [
    `# ${SITE_NAME} — Full Context`,
    `> ${SITE_DESCRIPTION}`,
    "## Project",
    `Website: ${siteUrl()}\nSource: ${SITE_REPOSITORY}\nLicense: MIT (${SITE_REPOSITORY}/blob/main/LICENSE)\nStudio: https://www.devsloka.in\nContact: https://www.devsloka.in/contact-us\nSocial: https://x.com/devsloka_ui`,
    "Devsloka UI provides source files for animated interfaces. The documentation site is built with Next.js. The components target React 19 and Tailwind CSS v4, use TypeScript, follow shadcn conventions, and use Motion, Radix UI, and other per-item dependencies where needed. They can be adapted to other React applications; replace Next.js-specific image or navigation integrations when necessary.",
    `The published library contains ${DOCUMENTATION.Components.length} components, ${DOCUMENTATION.Backgrounds.length} backgrounds, ${DOCUMENTATION.Hooks.length} hooks, ${DOCUMENTATION.Blocks.length} block categories, and ${templates.length} templates. There are ${registry.items.length} installable registry items, including ${registry.items.filter((item) => item.type === "registry:block").length} block variants. Templates have separate source repositories and are not registry components.`,
    "## Editions and ownership",
    "The current library is free and MIT licensed for personal and commercial use. The source is copied into the consumer’s project and can be modified there. Pro is listed as coming soon; advanced components, full-page blocks, templates, early access, and priority support are planned Pro features, not a currently available paid release.",
    "## Installation",
    "Start with a React 19 and Tailwind CSS v4 application. Configure shadcn’s component aliases, utilities, and theme tokens. If your project has not been initialized, run `npx shadcn@latest init` first.",
    "```bash\nnpx shadcn@latest add https://ui.devsloka.in/r/text-effect.json\n# Bun alternative\nbunx shadcn@latest add https://ui.devsloka.in/r/text-effect.json\n# Install a specific block variant\nnpx shadcn@latest add https://ui.devsloka.in/r/sign-in-split.json\n```",
    "Registry URLs end in `.json`. A documentation category can group multiple registry variants: `/blocks/sign-in` documents `sign-in-split` and `sign-in-minimal`. Install the exact variant name from the registry list below. The shadcn CLI reads each item’s dependencies and registryDependencies. For manual installation, copy the source, preserve its exports, install those dependencies, and adapt import aliases to your project.",
    "```tsx\n\"use client\";\n\nimport { TextEffect } from \"@/components/ui/text-effect\";\n\nexport default function Example() {\n  return <h1>Ship <TextEffect words={[\"faster\", \"calmer\", \"better\"]} effect=\"slide\" /></h1>;\n}\n```",
    "Interactive components need a client boundary in Next.js. A registry JSON response includes each source file’s content and therefore the current export names, prop types, defaults, and implementation. Consult those types for the selected variant rather than assuming that every block shares an API.",
    "## Styling and behavior",
    "Components use Tailwind classes, CSS variables, and shadcn theme tokens such as background, foreground, muted, and border. The website has light/dark themes. The latest blocks default to Devsloka blue (#0A6EFF), white foregrounds, pale blue (#E8F0FF) panels, and near-black secondary artwork. Blocks expose colour props where supported. Customize the copied source or pass the documented props to fit another brand.",
    "Animations use Motion or CSS. Reduced-motion behavior is documented in each implementation; canvas backgrounds include visibility and motion handling. Preserve visible labels, focus states, keyboard interactions, and ARIA semantics when adapting controls. Authentication blocks provide form behavior and submission callbacks; connect callbacks to your own authentication service. Demo success states are not a backend authentication implementation.",
    "Screen content can be passed to the Laptop Closes on Scroll component. Its lid pivots at the bottom hinge, fades the screen near closure, and closes flush with the base. maxRotation is clamped to 0–90 degrees, scrollHeight controls its scroll track, and reduced motion keeps the lid open.",
    "Some demos use next/image. Remote images need an allowed hostname in Next.js image configuration; use an ordinary img element when adapting to a different React framework. Template demos and repositories are linked below.",
    "## Website navigation",
    ...CORE_PAGES.map((page) => `- [${page.title}](${siteUrl(page.path)}): ${page.description}`),
  ];

  for (const [group, pages] of Object.entries(DOCUMENTATION)) {
    lines.push(`## ${group}`);
    for (const page of pages) {
      lines.push(`### ${page.title}`, page.description, `Documentation: ${siteUrl(page.path)}`, `Registry names: ${page.registryNames.map((name) => `\`${name}\``).join(", ")}`);
    }
  }

  lines.push("## Installable registry reference");
  for (const item of registry.items) {
    const page = entries.find((entry) => entry.registryNames.includes(item.name));
    lines.push(
      `### ${item.title} (${item.name})`,
      item.description,
      `Type: ${item.type}\nDocumentation: ${page ? siteUrl(page.path) : siteUrl("docs")}\nRegistry JSON with full source: ${siteUrl(`r/${item.name}.json`)}`,
      `Install: \`npx shadcn@latest add ${siteUrl(`r/${item.name}.json`)}\``,
      `npm dependencies: ${"dependencies" in item ? item.dependencies?.join(", ") : "None declared"}\nRegistry dependencies: ${"registryDependencies" in item ? item.registryDependencies?.join(", ") : "None declared"}`,
      ...item.files.map((file) => `Source: ${SITE_REPOSITORY}/blob/main/${file.path}`),
    );
  }

  lines.push("## Templates");
  for (const template of templates) {
    lines.push(`### ${template.title}`, template.description, `Documentation: ${siteUrl(`templates/${template.slug}`)}\nCategory: ${template.category}\nEdition: ${template.isPro ? "Pro" : "Free"}\nLive preview: ${template.href}\nSource repository: ${template.github}`);
  }

  lines.push("## Release history");
  for (const release of CHANGELOG) {
    lines.push(`### ${release.date}: ${release.title}`, release.summary, ...release.changes.map((change) => `- ${change.type}: ${change.title}. ${change.description}${change.link ? ` ${siteUrl(change.link.href)}` : ""}`));
    if (release.announcement) lines.push(`Announcement: ${release.announcement.href}`);
  }

  lines.push(
    "## Development and contributions",
    "Clone the source repository, install dependencies with npm ci, and run npm run dev. npm run build produces the production site; npm run start serves it. npm run registry:build regenerates public/r from registry.json and derives dependencies from imports. npm run registry:check verifies synchronization. npm run lint checks code style. npm run previews captures published demo images using a local Chromium-based browser; CHROME_PATH and BASE_URL can override browser location and preview origin.",
    "The sitemap and AI context routes are generated from the published documentation catalogs and registry during a build. Add new entries to the relevant catalog and registry, then rebuild. Release entries live in src/lib/changelog.ts, newest first with fixed dates.",
  );
  return lines.join("\n\n") + "\n";
}

export function llmsResponse(content: string): Response {
  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Link": `<${siteUrl("llms.txt")}>; rel="describedby"`,
    },
  });
}
