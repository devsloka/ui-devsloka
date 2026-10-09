import { cn } from "@/lib/utils";

type BackgroundPreviewProps = {
  children: React.ReactNode;
  title: string;
  description?: string;
  tone: "dark" | "theme";
  className?: string;
};

/** Shows a background layer behind sample content, the way it's used in a real section. */
export function BackgroundPreview({
  children,
  title,
  description,
  tone,
  className,
}: BackgroundPreviewProps) {
  return (
    <div
      className={cn(
        "relative isolate flex aspect-video w-full items-center justify-center overflow-hidden rounded-md",
        className
      )}
    >
      {children}
      <div
        className={cn(
          "pointer-events-none relative max-w-xl px-6 text-center",
          tone === "dark" ? "text-white" : "text-foreground"
        )}
      >
        <p className="text-3xl font-semibold tracking-tight md:text-5xl">{title}</p>
        {description && (
          <p
            className={cn(
              "mt-3 text-base md:text-lg",
              tone === "dark" ? "text-white/75" : "text-muted-foreground"
            )}
          >
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
