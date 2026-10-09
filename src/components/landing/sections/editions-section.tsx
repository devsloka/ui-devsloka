import Link from "next/link";
import { cn } from "@/lib/utils";
import { EDITIONS } from "../data/editions";
import { SectionHeading } from "../section-heading";

export function EditionsSection() {
  return (
    <section id="editions" className="mt-40 scroll-mt-24">
      <SectionHeading
        index="05"
        label="Editions"
        title="Free to build with. Pro when you need more."
      />

      <div className="mt-12 grid grid-cols-1 border-t border-l border-border md:grid-cols-2">
        {EDITIONS.map((plan) => {
          const isExternal = plan.cta.href.startsWith("http");

          return (
            <article
              key={plan.name}
              className="flex flex-col border-r border-b border-border p-6 md:p-10"
            >
              <header className="flex items-baseline justify-between gap-4">
                <h3 className="font-mono text-xs uppercase tracking-wider">
                  {plan.name}
                </h3>
                <p className="font-mono text-xs text-muted-foreground">
                  {plan.priceNote}
                </p>
              </header>
              <p
                className={cn(
                  "mt-10 text-7xl font-medium tracking-[-0.06em] md:text-8xl",
                  plan.highlighted && "text-[#0A6EFF]"
                )}
              >
                {plan.price}
              </p>
              <ul className="mt-10 mb-12">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="border-t border-border py-3 text-base"
                  >
                    {feature}
                  </li>
                ))}
              </ul>
              <Link
                href={plan.cta.href}
                {...(isExternal && { target: "_blank", rel: "noopener noreferrer" })}
                className={cn(
                  "mt-auto flex items-center justify-between border border-border px-5 py-4 text-lg font-medium transition-colors",
                  plan.highlighted
                    ? "bg-foreground text-background hover:bg-[#0A6EFF] hover:border-[#0A6EFF] hover:text-white"
                    : "hover:bg-foreground hover:text-background"
                )}
              >
                {plan.cta.label}
                <span aria-hidden>→</span>
              </Link>
            </article>
          );
        })}
      </div>
    </section>
  );
}
