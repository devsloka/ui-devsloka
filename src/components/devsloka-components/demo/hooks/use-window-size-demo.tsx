"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useWindowSize } from "@/registry/hooks/use-window-size";

export default function UseWindowSizeDemo() {
  const { width, height } = useWindowSize();

  return (
    <Card className="mx-auto w-full max-w-sm">
      <CardContent className="space-y-3 text-center">
        <p className="font-mono text-3xl tabular-nums">
          {width} × {height}
        </p>
        <p className="text-sm text-muted-foreground">
          Resize the browser window to update the readout.
        </p>
      </CardContent>
    </Card>
  );
}
