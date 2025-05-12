import React from "react";
import { CardDecorator } from "@/components/ui/card-decorator";
import { cn } from "@/lib/utils";

const CardDecoratorDemo: React.FC = () => {
  return (
    <div
      className={cn(
        "group relative shadow-zinc-950/5 h-40 w-64 border border-dashed flex justify-center items-center"
      )}
    >
      <CardDecorator variant={"default"} />
      <div className={cn("p-4")}>
        <h2 className={cn("text-lg font-semibold")}>Card Title</h2>
        <p className={cn("text-sm text-muted-foreground")}>Card description</p>
      </div>
    </div>
  );
};

export default CardDecoratorDemo;
