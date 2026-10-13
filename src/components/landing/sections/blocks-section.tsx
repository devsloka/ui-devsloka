import Image from "next/image";
import Link from "next/link";
import { BLOCKS } from "../data/blocks";
import { SectionHeading } from "../section-heading";

export function BlocksSection() {
  return (
    <section id="blocks" className="mt-40 scroll-mt-24">
      <SectionHeading
        title="Whole sections, ready to assemble."
        description="Heroes, pricing, FAQs, footers. Stack them into a page, then restyle them like any other component."
      />

      <ol className="mt-12 flex snap-x snap-mandatory gap-px overflow-x-auto border border-border bg-border pb-px">
        {BLOCKS.map((block, i) => (
          <li key={block.href} className="w-[78vw] shrink-0 snap-start bg-background sm:w-[26rem]">
            <Link href={block.href} className="group block">
              <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                <Image
                  src={block.image}
                  alt={`${block.name} block preview`}
                  fill
                  sizes="(min-width: 640px) 416px, 78vw"
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </div>
              <div className="flex items-baseline justify-between border-t border-border px-4 py-3">
                <span className="text-lg font-medium tracking-[-0.02em]">
                  <span className="mr-3 font-mono text-xs text-muted-foreground">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {block.name}
                </span>
                <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground transition-colors group-hover:text-foreground">
                  Open →
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ol>
    </section>
  );
}
