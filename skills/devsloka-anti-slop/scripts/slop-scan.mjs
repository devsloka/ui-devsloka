#!/usr/bin/env node
// Static scan of authored page code for AI-slop patterns.
//   node slop-scan.mjs <file|dir>... [--exclude <dir>]... [--json]
// Exit code 1 when any BAN finding exists. Installed library code (components/ui, components/linework, lib/linework)
// is skipped by default because it is reviewed upstream; pass --include-library to scan it too.
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, relative, extname } from "node:path";

const args = process.argv.slice(2);
const json = args.includes("--json");
const includeLibrary = args.includes("--include-library");
const excludes = [];
const targets = [];
for (let i = 0; i < args.length; i++) {
  if (args[i] === "--exclude") excludes.push(args[++i]);
  else if (!args[i].startsWith("--")) targets.push(args[i]);
}
if (!targets.length) targets.push("src");

const LIBRARY_DIRS = ["components/ui/", "components/linework/", "lib/linework/"];
// Devsloka block files installed into src/components/. Their DEFAULTS keep demo copy even when props override it,
// so they are library code here; leftover demo copy on the page is caught by audit.mjs in the rendered text.
const LIBRARY_FILES = new Set(["pricing-block.tsx","contact-block.tsx","faqs-block.tsx","faq-block-two.tsx","hero-section.tsx","hero-section-four.tsx","hero-floating-elements.tsx","hero-gradient-mesh.tsx","hero-split-reveal.tsx","logo-cloud-1.tsx","footer-block.tsx","floating-footer.tsx","grid-footer.tsx","wave-footer.tsx","features-block.tsx","features-block-four.tsx","feature-interactive-cards.tsx","feature-floating-showcase.tsx","newsletter-block.tsx","newsletter-block-two.tsx","team-block.tsx","testimonials-block.tsx","testimonials-block-2.tsx","changelog-timeline.tsx","changelog-release.tsx","changelog-compact.tsx","blog-featured.tsx","blog-index.tsx","blog-magazine.tsx","cta-poster.tsx","cta-split-photo.tsx","cta-ticket.tsx","sign-in-split.tsx","sign-in-minimal.tsx","sign-up-split.tsx","sign-up-steps.tsx","forgot-password-simple.tsx","forgot-password-reset.tsx","otp-verify.tsx","otp-two-factor.tsx","not-found-poster.tsx","not-found-index.tsx"]);
const EXT = new Set([".tsx", ".jsx", ".ts", ".js", ".mdx", ".css"]);

function walk(p, out) {
  if (!existsSync(p)) return out;
  const st = statSync(p);
  if (st.isDirectory()) {
    if (/node_modules|\.next|\.git/.test(p)) return out;
    for (const f of readdirSync(p)) walk(join(p, f), out);
  } else if (EXT.has(extname(p))) out.push(p);
  return out;
}

const files = targets.flatMap((t) => walk(t, [])).filter((f) => {
  const rel = f.replace(/\\/g, "/");
  if (excludes.some((e) => rel.startsWith(e.replace(/\/$/, "") + "/") || rel === e)) return false;
  if (!includeLibrary && LIBRARY_DIRS.some((d) => rel.includes(d))) return false;
  if (!includeLibrary && /(^|\/)components\/[^/]+$/.test(rel) && LIBRARY_FILES.has(rel.split("/").pop())) return false;
  return true;
});

const PHRASES = [
  "unlock", "unleash", "supercharge", "revolutioniz", "revolutionis", "seamless", "effortless", "elevate",
  "empower", "game-changer", "game changer", "cutting-edge", "cutting edge", "next-level", "next level",
  "leverage", "harness the power", "in today's fast-paced", "in today’s fast-paced", "to the next level",
  "transform your", "all-in-one", "all in one platform", "streamline", "boost your productivity", "world-class",
  "best-in-class", "robust", "powerful yet simple", "built for the future", "your journey", "say goodbye to",
  "look no further", "like never before", "at your fingertips", "reimagine", "lorem ipsum", "john doe",
];
// Default copy from Devsloka demos; leaving it in means a block was not customised.
const DEVSLOKA_DEFAULTS = ["Bramble", "Plinth", "Pallet CLI", "pallet.sh", "orders-api", "Zebra haworthia"];
const BAD_FONTS = ["Inter", "Roboto", "Arial", "Poppins", "Montserrat", "Open_Sans", "Open Sans"];

const RULES = [
  { id: "purple-gradient", level: "BAN", re: /\b(?:from|via|to)-(?:purple|violet|indigo|fuchsia)-\d{2,3}\b/g, msg: "Purple/violet/indigo gradient stop" },
  { id: "purple-css-gradient", level: "BAN", re: /(?:linear|radial|conic)-gradient\([^)]*(?:#(?:7c3aed|8b5cf6|a855f7|6366f1|4f46e5|9333ea|c026d3|d946ef)|purple|violet|indigo)/gi, msg: "CSS gradient using purple/violet/indigo" },
  { id: "gradient-text", level: "BAN", re: /bg-clip-text[^"'`]*text-transparent|text-transparent[^"'`]*bg-clip-text|background-clip:\s*text/g, msg: "Gradient text" },
  { id: "gradient-text-component", level: "WARN", re: /<GradientText\b/g, msg: "GradientText used; needs a written reason" },
  { id: "blob-background", level: "BAN", re: /<BlobBackground\b|blob-background/g, msg: "Blob background" },
  { id: "blur-blob", level: "BAN", re: /rounded-full[^"'`]*blur-(?:2xl|3xl|\[\d{2,3}px\])|blur-(?:2xl|3xl|\[\d{2,3}px\])[^"'`]*rounded-full/g, msg: "Blurred colour blob" },
  { id: "glassmorphism", level: "WARN", re: /backdrop-blur(?:-\w+)?/g, msg: "backdrop-blur (glassmorphism?)", max: 2 },
  { id: "emoji", level: "BAN", re: /\p{Emoji_Presentation}|\p{Extended_Pictographic}\uFE0F/gu, msg: "Emoji in source (icons/decoration)", textOnly: true },
  { id: "transition-all", level: "BAN", re: /\btransition-all\b|transition:\s*all\b/g, msg: "transition-all" },
  { id: "rounded-2xl-overuse", level: "WARN", re: /\brounded-(?:2xl|3xl)\b/g, msg: "rounded-2xl/3xl used a lot (uniform radius?)", max: 6 },
  { id: "shadow-overuse", level: "WARN", re: /\bshadow-(?:xl|2xl)\b/g, msg: "Heavy shadows used a lot", max: 3 },
  { id: "h-screen", level: "WARN", re: /\b(?:min-)?h-screen\b/g, msg: "h-screen; use svh/dvh" },
  { id: "raw-img", level: "WARN", re: /<img\s/g, msg: "Raw <img>; prefer next/image (unless decorative SVG)" },
  { id: "off-grid-px", level: "WARN", re: /\b-?(?:p|px|py|pt|pr|pb|pl|ps|pe|m|mx|my|mt|mr|mb|ml|gap|gap-x|gap-y|space-x|space-y)-\[(\d+)px\]/g, msg: "Arbitrary spacing off the 4px grid", test: (m) => Number(m[1]) % 4 !== 0 && Number(m[1]) > 2 },
  { id: "particles", level: "WARN", re: /<ParticlesBackground\b/g, msg: "Generic particles background" },
  { id: "pill-badge-sparkle", level: "BAN", re: /(?:✨|🚀|⚡)\s*(?:New|Introducing|Now)/g, msg: "Sparkle/rocket pill badge" },
  { id: "get-started-only", level: "WARN", re: />\s*Get Started\s*</g, msg: "'Get Started' CTA; name the action" },
];

const findings = [];
const add = (file, line, level, id, msg, sample) => findings.push({ file: relative(process.cwd(), file), line, level, id, msg, sample });

for (const file of files) {
  const src = readFileSync(file, "utf8");
  const lines = src.split("\n");
  const lineOf = (idx) => src.slice(0, idx).split("\n").length;

  for (const rule of RULES) {
    const matches = [...src.matchAll(rule.re)].filter((m) => (rule.test ? rule.test(m) : true));
    if (!matches.length) continue;
    if (rule.max !== undefined) {
      if (matches.length > rule.max) add(file, lineOf(matches[0].index), rule.level, rule.id, `${rule.msg} (${matches.length}× in file)`, matches[0][0]);
      continue;
    }
    for (const m of matches.slice(0, 5)) add(file, lineOf(m.index), rule.level, rule.id, rule.msg, lines[lineOf(m.index) - 1].trim().slice(0, 120));
  }

  // Copy: only look inside string literals and JSX text, not identifiers.
  const textChunks = [...src.matchAll(/"([^"\n]{3,})"|'([^'\n]{3,})'|`([^`]{3,})`|>([^<>{}\n]{3,})</g)];
  for (const m of textChunks) {
    const text = (m[1] ?? m[2] ?? m[3] ?? m[4] ?? "");
    if (/^[\w\-/.@:]+$/.test(text) && !text.includes(" ")) continue; // class names, paths, imports
    const lower = text.toLowerCase();
    for (const p of PHRASES) {
      const re = new RegExp(`\\b${p.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`, "i");
      if (re.test(lower) && !/className|class=/.test(text)) add(file, lineOf(m.index), "BAN", "copy-phrase", `Banned phrase "${p}"`, text.trim().slice(0, 120));
    }
    for (const d of DEVSLOKA_DEFAULTS) if (text.includes(d)) add(file, lineOf(m.index), "BAN", "default-copy", `Devsloka demo copy left in ("${d}")`, text.trim().slice(0, 120));
  }

  // Fonts loaded through next/font/google.
  for (const m of src.matchAll(/import\s*\{([^}]+)\}\s*from\s*["']next\/font\/google["']/g)) {
    for (const name of m[1].split(",").map((s) => s.trim().split(/\s+as\s+/)[0])) {
      if (BAD_FONTS.includes(name)) add(file, lineOf(m.index), "WARN", "default-font", `Default font ${name}; choose per preset (allowed as body only if the preset says so)`, name);
    }
  }
}

// Dedupe identical file+line+id.
const seen = new Set();
const unique = findings.filter((f) => { const k = `${f.file}:${f.line}:${f.id}:${f.msg}`; if (seen.has(k)) return false; seen.add(k); return true; });
const bans = unique.filter((f) => f.level === "BAN");
const warns = unique.filter((f) => f.level === "WARN");

if (json) {
  console.log(JSON.stringify({ files: files.length, bans, warns }, null, 2));
} else {
  console.log(`slop-scan: ${files.length} files · ${bans.length} BAN · ${warns.length} WARN`);
  for (const f of [...bans, ...warns]) console.log(`${f.level.padEnd(4)} ${f.file}:${f.line}  ${f.msg}${f.sample ? `  ← ${f.sample}` : ""}`);
  if (!bans.length && !warns.length) console.log("Clean.");
}
process.exit(bans.length ? 1 : 0);
