import Image from "next/image";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { generateSEO } from "@/config/seo/seo.utils";
import { templates } from "@/lib/templates";
import { getTemplateData, templateSlugs } from "@/utilities/template.utils";

export function generateStaticParams() {
  return templateSlugs.map((name) => ({ name }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ name: string }>;
}): Promise<Metadata> {
  const { name } = await params;
  const template = getTemplateData(name);
  if (!template) return {};

  return generateSEO({
    title: `${template.seo.title} - Devsloka Templates`,
    description: template.seo.description,
    path: `templates/${name}`,
    image: templates.find((card) => card.slug === name)?.image,
    keywords: [...template.seo.keywords, "Devsloka", "Next.js template"],
  });
}

/** Drops exact repeats, so placeholder data doesn't render the same line twice. */
function unique<T>(items: T[], key: (item: T) => string) {
  const seen = new Set<string>();
  return items.filter((item) => {
    const id = key(item);
    if (seen.has(id)) return false;
    seen.add(id);
    return true;
  });
}

function Section({
  index,
  title,
  children,
}: {
  index: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="grid gap-6 border-t pt-4 md:grid-cols-12">
      <h2 className="font-mono text-xs uppercase tracking-wider text-muted-foreground md:col-span-3">
        ({String(index).padStart(2, "0")}) {title}
      </h2>
      <div className="md:col-span-9">{children}</div>
    </section>
  );
}

export default async function TemplatePage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  const template = getTemplateData(name);
  if (!template) notFound();

  const { heroContent, benefits, features, dependencies, seo } = template;
  const card = templates.find((entry) => entry.slug === name);
  const audience = unique(
    Array.isArray(heroContent.targetAudience)
      ? heroContent.targetAudience
      : [heroContent.targetAudience],
    (line) => line
  );
  const uniqueBenefits = unique(benefits, (b) => `${b.title}|${b.description}`);
  const uniqueFeatures = unique(features, (f) => `${f.title}|${f.description}`);
  const uniqueDependencies = unique(dependencies, (d) => d.name);

  return (
    <article className="space-y-20">
      <header className="space-y-8">
        <div className="max-w-3xl space-y-3">
          <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
            Template · {card?.isPro ? "Pro" : "Free"}
          </p>
          <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
            {heroContent.title}
          </h1>
          <p className="text-lg text-muted-foreground">{heroContent.subtitle}</p>
        </div>

        <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
          {heroContent.ctaPreview && (
            <a
              href={heroContent.ctaPreview}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              Live preview ↗
            </a>
          )}
          {heroContent.ctaLink && (
            <a
              href={heroContent.ctaLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium underline decoration-1 underline-offset-[6px] transition-colors hover:text-[#0A6EFF]"
            >
              Get the code ↗
            </a>
          )}
        </div>

        <div className="relative aspect-video overflow-hidden border bg-muted">
          {heroContent.videoUrl ? (
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster={card?.image}
              aria-label={`${heroContent.title} demo`}
              className="absolute inset-0 size-full object-cover"
            >
              <source src={heroContent.videoUrl} type="video/mp4" />
            </video>
          ) : (
            card?.image && (
              <Image
                src={card.image}
                alt={`${heroContent.title} screenshot`}
                fill
                priority
                sizes="(min-width: 1408px) 1408px, 100vw"
                className="object-cover object-top"
              />
            )
          )}
        </div>
      </header>

      <Section index={1} title="Overview">
        <p className="max-w-3xl text-lg leading-relaxed">{seo.description}</p>
      </Section>

      <Section index={2} title="Ideal for">
        <ul className="max-w-3xl space-y-3">
          {audience.map((line) => (
            <li key={line} className="flex gap-3 text-muted-foreground">
              <span aria-hidden className="mt-2 size-1.5 shrink-0 bg-[#0A6EFF]" />
              {line}
            </li>
          ))}
        </ul>
      </Section>

      <Section index={3} title="Advantages">
        <ul className="grid border-t border-l sm:grid-cols-2 lg:grid-cols-3">
          {uniqueBenefits.map((benefit) => (
            <li key={benefit.id} className="border-r border-b p-5">
              <h3 className="font-medium">{benefit.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{benefit.description}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section index={4} title="Features">
        <div className="space-y-10">
          {uniqueFeatures.map((feature) => {
            const subItems = unique(feature.subItems ?? [], (item) => item);
            return (
              <div key={feature.id} className="space-y-3">
                <h3 className="text-xl font-medium tracking-tight">{feature.title}</h3>
                <p className="max-w-3xl text-muted-foreground">{feature.description}</p>
                {subItems.length > 0 && (
                  <ul className="grid gap-x-8 gap-y-2 pt-1 sm:grid-cols-2">
                    {subItems.map((item) => (
                      <li key={item} className="border-t pt-2 text-sm">
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </div>
      </Section>

      <Section index={5} title="Built with">
        <ul className="grid border-t border-l sm:grid-cols-2 lg:grid-cols-4">
          {uniqueDependencies.map((dependency) => (
            <li key={dependency.id} className="border-r border-b p-4">
              <h3 className="font-mono text-sm">{dependency.name}</h3>
              <p className="mt-1.5 text-xs text-muted-foreground">{dependency.description}</p>
            </li>
          ))}
        </ul>
      </Section>
    </article>
  );
}
