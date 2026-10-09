import Image from "next/image";
import Link from "next/link";
import type { Template } from "@/lib/templates";

const externalLink =
  "font-mono text-xs uppercase tracking-wider text-muted-foreground transition-colors hover:text-foreground";

export function TemplateCard({ template }: { template: Template }) {
  return (
    <article className="group flex h-full flex-col border bg-card transition-colors hover:border-foreground/30">
      <Link
        href={`/templates/${template.slug}`}
        className="relative block aspect-[16/10] overflow-hidden border-b bg-muted"
        aria-label={`${template.title} details`}
      >
        <Image
          src={template.image}
          alt=""
          fill
          sizes="(min-width: 1280px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
        />
        <span className="absolute top-3 left-3 bg-background px-2 py-1 font-mono text-[0.625rem] uppercase tracking-wider">
          {template.isPro ? "Pro" : "Free"}
        </span>
      </Link>

      <div className="flex flex-1 flex-col gap-1.5 p-4">
        <h2 className="font-medium">
          <Link href={`/templates/${template.slug}`} className="hover:underline underline-offset-4">
            {template.title}
          </Link>
        </h2>
        <p className="line-clamp-2 text-sm text-muted-foreground">{template.description}</p>
        <p className="mt-1 font-mono text-[0.6875rem] uppercase tracking-wider text-muted-foreground">
          {template.tags.join(" · ")}
        </p>
      </div>

      <div className="flex divide-x border-t">
        <Link href={`/templates/${template.slug}`} className={`flex-1 px-4 py-3 ${externalLink}`}>
          Details →
        </Link>
        {template.href && (
          <a
            href={template.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex-1 px-4 py-3 ${externalLink}`}
          >
            Live ↗
          </a>
        )}
        {template.github && (
          <a
            href={template.github}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex-1 px-4 py-3 ${externalLink}`}
          >
            Code ↗
          </a>
        )}
      </div>
    </article>
  );
}
