import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  title: React.ReactNode;
  description: React.ReactNode;
  className?: string;
};

// Every landing section opens the same way: a title, then a sentence on what's in it.
// Centred, and calmer than the hero's display type: a moderate size, natural spacing,
// and the description right under the title.
export function SectionHeading({ title, description, className }: SectionHeadingProps) {
  return (
    <header className={cn("border-t border-border pt-8 text-center", className)}>
      <h2 className="mx-auto max-w-3xl text-3xl leading-[1.1] font-medium tracking-[-0.03em] text-balance md:text-5xl md:leading-[1.05]">
        {title}
      </h2>
      <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-pretty text-foreground/70 md:mt-5 md:text-lg">
        {description}
      </p>
    </header>
  );
}
