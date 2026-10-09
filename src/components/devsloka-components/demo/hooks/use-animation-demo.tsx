"use client";

import { Bell } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useAnimation } from "@/registry/hooks/use-animation";

export default function UseAnimationDemo() {
  const { isAnimating, start } = useAnimation({ duration: 600 });

  return (
    <Card className="mx-auto w-full max-w-sm">
      <CardContent className="flex flex-col items-center gap-6">
        <div
          className={cn(
            "flex size-16 items-center justify-center rounded-xl border bg-muted text-foreground transition-transform duration-300 motion-reduce:transition-none",
            isAnimating && "scale-110 border-primary text-primary",
          )}
        >
          <Bell
            className={cn(
              "size-6",
              isAnimating && "motion-safe:animate-bounce",
            )}
            aria-hidden
          />
        </div>
        <p className="text-sm text-muted-foreground">
          isAnimating:{" "}
          <span className="font-mono text-foreground">
            {String(isAnimating)}
          </span>
        </p>
        <Button type="button" onClick={start}>
          Ring for 600ms
        </Button>
      </CardContent>
    </Card>
  );
}
