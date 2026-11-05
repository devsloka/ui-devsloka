import { SITE_REPOSITORY } from "@/config/seo/seo.config";

// The Anti-Slop agent skill lives in skills/devsloka-anti-slop. `npm run skill:build` packages it into
// public/skill/devsloka-anti-slop.zip; this module feeds the /skill guide and the AI context files.
export const SKILL = {
  name: "devsloka-anti-slop",
  title: "Anti-Slop",
  summary:
    "An agent skill that builds art-directed landing pages from Devsloka UI blocks and components, Linework illustrations and ASCII particle art, then screenshots every section and redesigns anything that reads as generic AI output.",
  install: "npx skills add devsloka/ui-devsloka --skill devsloka-anti-slop",
  installGlobal: "npx skills add devsloka/ui-devsloka --skill devsloka-anti-slop -g",
  download: "/skill/devsloka-anti-slop.zip",
  source: `${SITE_REPOSITORY}/tree/main/skills/devsloka-anti-slop`,
} as const;

export const SKILL_WORKFLOW = [
  { title: "Brief", body: "Collects the product, the audience, one to three concrete facts and the action the page should drive. Specific inputs are what keep the output from looking generic." },
  { title: "Art direction", body: "Picks one of seven presets, commits to a single concept and plans one signature moment before writing any code." },
  { title: "Compose", body: "Maps each section to a Devsloka block or component and each feature to a Linework figure, with rules that stop the page from feeling templated." },
  { title: "Install", body: "Adds every part through the shadcn CLI from ui.devsloka.in and linework.devsloka.in, then reads each installed file's props before using it." },
  { title: "Build", body: "Themes once from a single brand file and fills every block through props with specific copy. Where props aren't enough, it edits the installed components to fit your brand and layout, and writes custom sections in the library's own style." },
  { title: "SEO and responsive", body: "Metadata, an Open Graph image, JSON-LD, exactly one h1, a sitemap, fluid type and real mobile layouts." },
  { title: "Verify", body: "Scans the code for slop patterns, screenshots every section at 375, 768, 1024 and 1440 pixels, scores them against an eight-point rubric and redesigns the ones that fail." },
  { title: "Hand over", body: "Reports the direction, the section-by-section map, invented placeholder facts to replace and the final audit." },
] as const;

export const SKILL_PRESETS = [
  { name: "precision", quality: "Engineered calm: dark, dense, exact", say: "“like Linear”, “clean dark SaaS”, devtools" },
  { name: "editorial", quality: "A well-designed magazine: serif type, rules and captions", say: "“editorial”, “magazine”, publishing, research" },
  { name: "kinetic", quality: "Type as image and scroll as narrative", say: "“Awwwards”, “bold”, agencies, launches" },
  { name: "swiss", quality: "A visible grid, flush-left type and one loud colour", say: "“Swiss”, “poster”, design tools, events" },
  { name: "paper", quality: "Warm and friendly, illustrated with line art", say: "“like Notion”, “warm”, education, docs" },
  { name: "brutalist", quality: "Exposed structure, heavy borders, mono type", say: "“brutalist”, “raw”, indie tools" },
  { name: "tactile", quality: "Premium product: the object is the hero", say: "“like Apple”, hardware, D2C products" },
] as const;

export const SKILL_PROMPTS = [
  "I'm launching Driftwire, an open-source feature flag service. Self-host free or $29/month cloud, SDKs for TypeScript, Go and Python, flags evaluate locally in under 1ms. Build the landing page and make it feel like Linear.",
  "Build a landing page for Northbound, a six-person motion studio in Lisbon that makes launch films for fintech and climate startups. Awwwards energy, but fast and good for SEO.",
  "Make a landing page for Margin, a note app for medical students that turns lecture slides into flashcards. Free for students, $6/month Pro. Warm and friendly, no purple AI gradients.",
] as const;

export const SKILL_FILES = [
  { path: "SKILL.md", note: "The workflow the agent follows" },
  { path: "references/catalog.md", note: "Every Devsloka block and component, with its section slot, motion weight and props" },
  { path: "references/customize.md", note: "How to adapt installed components safely, plus known fixes per component" },
  { path: "references/presets.md", note: "Seven art directions with tokens, fonts and section recipes" },
  { path: "references/linework.md", note: "All 94 Linework figures, mapped from feature concepts" },
  { path: "references/ascii.md", note: "Turning a brand mark into an interactive particle hero" },
  { path: "references/craft.md", note: "Spacing, type, colour, density and responsive rules" },
  { path: "references/motion.md", note: "When to use Motion, GSAP or three.js, plus easing and budgets" },
  { path: "references/seo.md", note: "Metadata, structured data and Core Web Vitals" },
  { path: "references/anti-slop.md", note: "The ban list, the screenshot rubric and fixes" },
  { path: "scripts/slop-scan.mjs", note: "Static scan for slop patterns in your code" },
  { path: "scripts/audit.mjs", note: "Section screenshots and quality checks in a local headless browser" },
] as const;

export const SKILL_FAQ = [
  {
    question: "Is the skill free?",
    answer: "Yes. It is MIT licensed like the rest of Devsloka UI, and you can edit your copy however you like.",
  },
  {
    question: "Which AI agents does it work with?",
    answer: "It is a standard agent skill: a folder with a SKILL.md file. Claude Code loads it from .claude/skills in your project or ~/.claude/skills for every project, and the skills CLI can also install it for other agents that support skills. The bundled scripts need Node.js 22 or newer.",
  },
  {
    question: "Do I need a Next.js project?",
    answer: "The workflow targets Next.js with the App Router, Tailwind CSS v4 and shadcn on Radix. If you start from an empty folder, the agent scaffolds that setup first. The audit script works against any URL.",
  },
  {
    question: "Does it send my code anywhere?",
    answer: "No. Both scripts run on your machine, and the audit drives a headless Chrome, Brave, Edge or Chromium that is already installed. The only network requests are the component installs from ui.devsloka.in and linework.devsloka.in.",
  },
  {
    question: "How long does a page take?",
    answer: "In our tests a complete page took 12 to 18 minutes, including two to four screenshot review rounds. The review rounds are where weak sections get redesigned, so they are worth the time.",
  },
  {
    question: "Why do I export the ASCII particle mark myself?",
    answer: "ASCII is an interactive studio without a command-line export. The agent prepares your logo as a clean SVG, suggests settings and builds a static fallback, so the page looks finished before you paste the exported component in.",
  },
  {
    question: "Will it change the Devsloka components in my project?",
    answer: "When it needs to, yes. Installed components are your code, so the agent edits them to fit your brand and layout: restyling, turning hard-coded content into props, adding slots, re-laying them out for mobile and fixing known bugs. It keeps accessibility, reduced motion and types intact, and lists every edited file in its final message, because running shadcn add again for that component would overwrite the changes.",
  },
  {
    question: "Can I add my own presets or rules?",
    answer: "Yes. Presets live in references/presets.md and the ban list and rubric in references/anti-slop.md. Change them in your copy and the agent follows your version.",
  },
  {
    question: "Is this the AI skill planned for Pro?",
    answer: "No. This free skill composes landing pages from the open library. The Pro skill is a separate tool for reshaping individual components to fit your design system.",
  },
] as const;
