import { cn } from "@/lib/utils";

interface InstallationStepProps {
  number: number;
  title: string;
  children: React.ReactNode;
  isLastStep?: boolean;
}

export function InstallationStep({
  number,
  title,
  children,
  isLastStep = false,
}: InstallationStepProps) {
  return (
    <section className="relative pb-12 pl-12 last:pb-0">
      <span
        aria-hidden
        className="absolute top-0 left-0 flex size-8 items-center justify-center border bg-background font-mono text-xs"
      >
        {number}
      </span>
      {!isLastStep && (
        <span aria-hidden className="absolute top-10 bottom-2 left-4 w-px bg-border" />
      )}
      <h2 className="mb-3 pt-1 text-lg font-semibold tracking-tight">{title}</h2>
      <div className={cn("space-y-4 text-muted-foreground")}>{children}</div>
    </section>
  );
}
