"use client";

import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useKeyPress } from "@/registry/hooks/use-key-press";

function Key({ label, pressed }: { label: string; pressed: boolean }) {
  return (
    <kbd
      className={cn(
        "inline-flex h-10 min-w-10 items-center justify-center rounded-md border bg-muted px-3 font-mono text-sm transition-colors",
        pressed && "border-primary bg-primary text-primary-foreground",
      )}
    >
      {label}
    </kbd>
  );
}

export default function UseKeyPressDemo() {
  const shift = useKeyPress("Shift");
  const space = useKeyPress("space", undefined, { ignoreInputs: true });
  const arrows = useKeyPress(["ArrowLeft", "ArrowRight"]);
  const [count, setCount] = useState(0);
  const combo = useKeyPress("mod+k", () => setCount((n) => n + 1), {
    preventDefault: true,
  });

  return (
    <Card className="mx-auto w-full max-w-md">
      <CardContent className="space-y-6">
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Key label="Shift" pressed={shift} />
          <Key label="Space" pressed={space} />
          <Key label="← / →" pressed={arrows} />
          <Key label="⌘/Ctrl + K" pressed={combo} />
        </div>
        <p className="text-center text-sm text-muted-foreground">
          Press the keys above. The shortcut handler has run{" "}
          <Badge variant="secondary">{count}</Badge> times.
        </p>
      </CardContent>
    </Card>
  );
}
