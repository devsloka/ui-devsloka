import Link from "next/link";
import { CopyCommand } from "@/components/landing/copy-command";
import { JsonLd } from "@/components/seo/json-ld";
import { SITE_REPOSITORY, SITE_URL } from "@/config/seo/seo.config";
import { generateSEO } from "@/config/seo/seo.utils";
import {
  SKILL,
  SKILL_FAQ,
  SKILL_FILES,
  SKILL_PRESETS,
  SKILL_PROMPTS,
  SKILL_WORKFLOW,
} from "@/lib/skill";

export const metadata = generateSEO({
  title: "Anti-Slop Skill for Landing Pages",
  description:
    "A free agent skill that builds landing pages from Devsloka UI, Linework and ASCII, then screenshots each section and redesigns anything that looks AI-generated.",
  path: "skill",
  keywords: [
    "ai agent skill",
    "claude code skill",
    "landing page generator",
    "anti ai slop",
    "agent skills",
  ],
});

const SECTIONS = [
  { id: "install", label: "Install" },
  { id: "workflow", label: "How it works" },
  { id: "use", label: "Use it" },
  { id: "presets", label: "Presets" },
  { id: "loop", label: "The anti-slop loop" },
  { id: "files", label: "What's inside" },
  { id: "toolkit", label: "The toolkit" },
  { id: "faq", label: "FAQ" },
];

const TOOLKIT = [
  {
    name: "Devsloka UI",
    href: "/blocks",
    body: "Blocks and animated components for every section, from hero to footer, installed with the shadcn CLI.",
  },
  {
    name: "Linework",
    href: "https://linework.devsloka.in",
    body: "94 interactive line illustrations. The skill picks the figure whose metaphor matches each feature.",
  },
  {
    name: "ASCII",
    href: "https://ascii.devsloka.in",
    body: "A studio that turns a brand mark into an interactive particle field for the hero.",
  },
];

const linkClass =
  "underline underline-offset-4 transition-colors hover:text-[#0A6EFF] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0A6EFF]";

function SectionTitle({ id, index, children }: { id: string; index: number; children: React.ReactNode }) {
  return (
    <div className="border-t border-border pt-4">
      <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
        {String(index).padStart(2, "0")}
      </p>
      <h2
        id={`${id}-title`}
        className="mt-6 max-w-2xl text-3xl leading-[1.08] font-medium tracking-[-0.04em] text-balance md:text-5xl"
      >
        {children}
      </h2>
    </div>
  );
}

function Code({ children }: { children: string }) {
  return (
    <pre className="overflow-x-auto border border-border bg-muted/40 px-4 py-3 font-mono text-sm leading-relaxed">
      <code>{children}</code>
    </pre>
  );
}

export default function SkillPage() {
  return (
    <div className="pt-28 pb-24 md:pt-36 md:pb-32">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "SoftwareSourceCode",
              "@id": `${SITE_URL}/skill#skill`,
              name: `Devsloka ${SKILL.title} skill`,
              description: SKILL.summary,
              url: `${SITE_URL}/skill`,
              codeRepository: SKILL.source,
              license: `${SITE_REPOSITORY}/blob/main/LICENSE`,
              programmingLanguage: ["Markdown", "JavaScript"],
              publisher: { "@id": `${SITE_URL}/#organization` },
            },
            {
              "@type": "FAQPage",
              mainEntity: SKILL_FAQ.map(({ question, answer }) => ({
                "@type": "Question",
                name: question,
                acceptedAnswer: { "@type": "Answer", text: answer },
              })),
            },
          ],
        }}
      />

      <header>
        <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-muted-foreground">
          <span aria-hidden className="size-1.5 bg-[#0A6EFF]" />
          Devsloka UI / Agent skill
        </p>
        <h1 className="mt-6 text-[clamp(3.5rem,10vw,9rem)] leading-none font-medium tracking-[-0.065em]">
          Anti-Slop<span className="text-[#0A6EFF]">.</span>
        </h1>
        <div className="mt-8 grid grid-cols-1 gap-8 border-t border-border pt-6 lg:grid-cols-12">
          <p className="min-w-0 max-w-xl text-lg text-pretty text-muted-foreground md:text-xl lg:col-span-6">
            Landing pages that look designed, not generated. Your AI agent
            builds the page from Devsloka parts, screenshots every section and
            redesigns anything that reads as AI slop.
          </p>
          <div className="min-w-0 space-y-3 lg:col-span-6">
            <CopyCommand command={SKILL.install} />
            <div className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs uppercase tracking-wider">
              <a href={SKILL.download} download className={linkClass}>
                Download .zip <span aria-hidden>↓</span>
              </a>
              <a href={SKILL.source} target="_blank" rel="noopener noreferrer" className={linkClass}>
                Source on GitHub <span aria-hidden>↗</span>
              </a>
              <span className="text-muted-foreground">MIT · Free</span>
            </div>
          </div>
        </div>
      </header>

      <div className="mt-16 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
        <nav aria-label="On this page" className="min-w-0 lg:col-span-3">
          <div className="lg:sticky lg:top-24">
            <h2 className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
              On this page
            </h2>
            <ol className="mt-4 divide-y divide-border border-y border-border">
              {SECTIONS.map((section, index) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="group flex items-center justify-between gap-4 py-3 text-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0A6EFF]"
                  >
                    <span className="transition-colors group-hover:text-[#0A6EFF]">{section.label}</span>
                    <span aria-hidden className="font-mono text-xs text-muted-foreground">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </nav>

        <div className="min-w-0 space-y-24 lg:col-span-9 md:space-y-32">
          {/* Install */}
          <section id="install" aria-labelledby="install-title" className="scroll-mt-24">
            <SectionTitle id="install" index={1}>Install it three ways</SectionTitle>
            <ol className="mt-10 divide-y divide-border border-y border-border">
              <li className="grid grid-cols-1 gap-4 py-8 md:grid-cols-[12rem_1fr] md:gap-8">
                <h3 className="text-lg font-medium tracking-[-0.02em]">With the skills CLI</h3>
                <div className="min-w-0 space-y-4 text-sm leading-relaxed text-muted-foreground">
                  <p>Run this in your project. It adds the skill to the project&apos;s agent folder, for example <code className="font-mono text-foreground">.claude/skills</code>.</p>
                  <CopyCommand command={SKILL.install} />
                  <p>To make it available in every project, install it globally:</p>
                  <CopyCommand command={SKILL.installGlobal} />
                </div>
              </li>
              <li className="grid grid-cols-1 gap-4 py-8 md:grid-cols-[12rem_1fr] md:gap-8">
                <h3 className="text-lg font-medium tracking-[-0.02em]">Download the zip</h3>
                <div className="min-w-0 space-y-4 text-sm leading-relaxed text-muted-foreground">
                  <p>
                    <a href={SKILL.download} download className={linkClass}>devsloka-anti-slop.zip</a>{" "}
                    unpacks into a <code className="font-mono text-foreground">devsloka-anti-slop</code> folder. Put that folder in your project&apos;s skills directory:
                  </p>
                  <Code>{`mkdir -p .claude/skills
unzip devsloka-anti-slop.zip -d .claude/skills`}</Code>
                  <p>Use <code className="font-mono text-foreground">~/.claude/skills</code> instead to make it available in every project.</p>
                </div>
              </li>
              <li className="grid grid-cols-1 gap-4 py-8 md:grid-cols-[12rem_1fr] md:gap-8">
                <h3 className="text-lg font-medium tracking-[-0.02em]">Copy from GitHub</h3>
                <div className="min-w-0 space-y-4 text-sm leading-relaxed text-muted-foreground">
                  <p>
                    The source lives in{" "}
                    <a href={SKILL.source} target="_blank" rel="noopener noreferrer" className={linkClass}>skills/devsloka-anti-slop</a>{" "}
                    in the Devsloka UI repository. Copy that folder into your project, or commit it so your whole team gets it.
                  </p>
                  <Code>{`git clone --depth 1 ${SITE_REPOSITORY}.git /tmp/devsloka-ui
mkdir -p .claude/skills
cp -R /tmp/devsloka-ui/skills/devsloka-anti-slop .claude/skills/`}</Code>
                </div>
              </li>
            </ol>
            <div className="mt-8 grid gap-4 text-sm leading-relaxed text-muted-foreground sm:grid-cols-3">
              <p><span className="block font-mono text-xs uppercase tracking-wider text-foreground">Agent</span>Claude Code, or any agent that supports SKILL.md skills.</p>
              <p><span className="block font-mono text-xs uppercase tracking-wider text-foreground">Runtime</span>Node.js 22 or newer for the audit scripts.</p>
              <p><span className="block font-mono text-xs uppercase tracking-wider text-foreground">Browser</span>Chrome, Brave, Edge or Chromium for screenshots. Set <code className="font-mono text-foreground">CHROME_PATH</code> if it isn&apos;t found.</p>
            </div>
          </section>

          {/* Workflow */}
          <section id="workflow" aria-labelledby="workflow-title" className="scroll-mt-24">
            <SectionTitle id="workflow" index={2}>Eight steps, from brief to verified page</SectionTitle>
            <ol className="mt-10 grid gap-px border border-border bg-border sm:grid-cols-2">
              {SKILL_WORKFLOW.map((step, index) => (
                <li key={step.title} className="bg-background p-6">
                  <p className="font-mono text-xs text-[#0A6EFF]">{String(index + 1).padStart(2, "0")}</p>
                  <h3 className="mt-3 text-lg font-medium tracking-[-0.02em]">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-pretty text-muted-foreground">{step.body}</p>
                </li>
              ))}
            </ol>
          </section>

          {/* Use */}
          <section id="use" aria-labelledby="use-title" className="scroll-mt-24">
            <SectionTitle id="use" index={3}>Ask for a page the way you&apos;d brief a designer</SectionTitle>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-pretty text-muted-foreground">
              The skill starts when you ask your agent for a landing page, a product page or a redesign. You
              don&apos;t need to name it. The more real facts you give (numbers, prices, customers, how the
              product works), the less the agent has to invent. Name a style or a reference site to pick a
              preset; if you don&apos;t, the agent asks or chooses one and explains why.
            </p>
            <ul className="mt-10 space-y-4">
              {SKILL_PROMPTS.map((prompt) => (
                <li key={prompt} className="border-l-2 border-[#0A6EFF] bg-muted/40 px-5 py-4 text-sm leading-relaxed text-pretty">
                  {prompt}
                </li>
              ))}
            </ul>
            <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              Every invented detail, such as a statistic, testimonial or link, is listed in the agent&apos;s
              final message so you can replace it before launch.
            </p>
          </section>

          {/* Presets */}
          <section id="presets" aria-labelledby="presets-title" className="scroll-mt-24">
            <SectionTitle id="presets" index={4}>Seven art directions to start from</SectionTitle>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-pretty text-muted-foreground">
              A preset sets the tokens, type, section recipe and motion budget. It names a quality, not a
              brand to copy: ask for “like Linear” and you get that level of precision with your own brand,
              words and layout.
            </p>
            <div className="mt-10 overflow-x-auto">
              <table className="w-full min-w-[36rem] border-collapse text-left text-sm">
                <caption className="sr-only">Art-direction presets and how to ask for them</caption>
                <thead>
                  <tr className="border-b border-border font-mono text-xs uppercase tracking-wider text-muted-foreground">
                    <th scope="col" className="py-3 pr-6 font-normal">Preset</th>
                    <th scope="col" className="py-3 pr-6 font-normal">Quality</th>
                    <th scope="col" className="py-3 font-normal">Ask with</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {SKILL_PRESETS.map((preset) => (
                    <tr key={preset.name}>
                      <th scope="row" className="py-4 pr-6 font-mono font-normal text-[#0A6EFF]">{preset.name}</th>
                      <td className="py-4 pr-6">{preset.quality}</td>
                      <td className="py-4 text-muted-foreground">{preset.say}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Loop */}
          <section id="loop" aria-labelledby="loop-title" className="scroll-mt-24">
            <SectionTitle id="loop" index={5}>It checks its own work with screenshots</SectionTitle>
            <div className="mt-10 grid gap-8 md:grid-cols-3">
              <div>
                <h3 className="text-lg font-medium tracking-[-0.02em]">Scan the code</h3>
                <p className="mt-2 text-sm leading-relaxed text-pretty text-muted-foreground">
                  slop-scan flags purple gradients, gradient text, blurred blobs, emoji icons, transition-all,
                  leftover demo copy and about thirty stock marketing phrases that make a page read as
                  machine-written.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium tracking-[-0.02em]">Shoot every section</h3>
                <p className="mt-2 text-sm leading-relaxed text-pretty text-muted-foreground">
                  The audit captures each section at four widths and reports overflow, missing SEO, console
                  errors, off-grid spacing, radius drift and small tap targets.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium tracking-[-0.02em]">Score and redesign</h3>
                <p className="mt-2 text-sm leading-relaxed text-pretty text-muted-foreground">
                  The agent scores each screenshot on distinctiveness, type, spacing, colour, composition, copy,
                  craft and mobile. Any section that scores below 4 on distinctiveness or composition is redesigned,
                  not just polished.
                </p>
              </div>
            </div>
            <p className="mt-10 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              You can run both scripts yourself on any project, for example after editing a page by hand:
            </p>
            <div className="mt-4">
              <Code>{`node .claude/skills/devsloka-anti-slop/scripts/slop-scan.mjs src
node .claude/skills/devsloka-anti-slop/scripts/audit.mjs http://localhost:3000 --out /tmp/audit`}</Code>
            </div>
          </section>

          {/* Files */}
          <section id="files" aria-labelledby="files-title" className="scroll-mt-24">
            <SectionTitle id="files" index={6}>What&apos;s in the folder</SectionTitle>
            <ul className="mt-10 divide-y divide-border border-y border-border">
              {SKILL_FILES.map((file) => (
                <li key={file.path} className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-[16rem_1fr] sm:gap-6">
                  <code className="font-mono text-sm">{file.path}</code>
                  <span className="text-sm text-muted-foreground">{file.note}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Toolkit */}
          <section id="toolkit" aria-labelledby="toolkit-title" className="scroll-mt-24">
            <SectionTitle id="toolkit" index={7}>Built on the Devsloka toolkit</SectionTitle>
            <ul className="mt-10 grid gap-px border border-border bg-border md:grid-cols-3">
              {TOOLKIT.map((tool) => {
                const external = tool.href.startsWith("http");
                return (
                  <li key={tool.name} className="bg-background p-6">
                    <h3 className="text-lg font-medium tracking-[-0.02em]">
                      {external ? (
                        <a href={tool.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                          {tool.name} <span aria-hidden>↗</span>
                        </a>
                      ) : (
                        <Link href={tool.href} className={linkClass}>{tool.name}</Link>
                      )}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-pretty text-muted-foreground">{tool.body}</p>
                  </li>
                );
              })}
            </ul>
          </section>

          {/* FAQ */}
          <section id="faq" aria-labelledby="faq-title" className="scroll-mt-24">
            <SectionTitle id="faq" index={8}>Questions</SectionTitle>
            <div className="mt-10 divide-y divide-border border-y border-border">
              {SKILL_FAQ.map(({ question, answer }) => (
                <details key={question} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-base font-medium focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0A6EFF] [&::-webkit-details-marker]:hidden">
                    {question}
                    <span aria-hidden className="font-mono text-muted-foreground transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-pretty text-muted-foreground">{answer}</p>
                </details>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
