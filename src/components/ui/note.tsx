import { cn } from "@/lib/utils";
import { InfoIcon } from "lucide-react";

type NoteProps = React.HTMLAttributes<HTMLDivElement>;

export function Note({ className, children, ...props }: NoteProps) {
  return (
    <div
      className={cn(
        "flex items-start space-x-2 rounded-md border bg-muted/50 p-4",
        className
      )}
      {...props}
    >
      <InfoIcon className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
      <div className="text-muted-foreground">{children}</div>
    </div>
  );
}
