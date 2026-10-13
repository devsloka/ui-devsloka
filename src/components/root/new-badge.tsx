import { cn } from "@/lib/utils";

export function NewBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center bg-[#0A6EFF] px-1.5 py-px font-mono text-[0.625rem] leading-4 font-medium tracking-wider text-white uppercase",
        className
      )}
    >
      New
    </span>
  );
}
