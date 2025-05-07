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
}: //   isLastStep = false,
InstallationStepProps) {
  return (
    <div className="relative pl-8 pt-1">
      <div className="absolute left-0 top-0 flex h-8 w-8 items-center justify-center rounded-full bg-muted text-center text-sm font-medium border border-foreground/20">
        {number}
      </div>
      {/* Connecting line with gradient */}
      <div className="absolute left-[15px] top-8 h-[calc(100%+2.5rem)] w-[2px] -z-10 bg-gradient-to-b from-foreground/80 via-foreground/50 to-foreground/10" />
      <h2 className="font-semibold text-xl mb-4 ml-2">{title}</h2>
      <div>{children}</div>
    </div>
  );
}
