import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  index: string;
  label: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  className?: string;
};

export function SectionHeading({
  index,
  label,
  title,
  description,
  className,
}: SectionHeadingProps) {
  return (
    <header
      className={cn(
        "grid grid-cols-1 gap-6 border-t border-border pt-4 md:grid-cols-12",
        className
      )}
    >
      <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground md:col-span-3">
        ({index}) {label}
      </p>
      <div className="md:col-span-9">
        <h2 className="text-4xl font-medium leading-[0.95] tracking-[-0.04em] text-balance md:text-6xl">
          {title}
        </h2>
        {description && (
          <p className="mt-5 max-w-xl text-base text-muted-foreground md:text-lg">
            {description}
          </p>
        )}
      </div>
    </header>
  );
}
