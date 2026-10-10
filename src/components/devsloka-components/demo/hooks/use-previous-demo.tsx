"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { usePrevious } from "@/registry/hooks/use-previous";

export default function UsePreviousDemo() {
  const [count, setCount] = useState(0);
  const previous = usePrevious(count);

  return (
    <Card className="mx-auto w-full max-w-sm">
      <CardContent className="space-y-4">
        <dl className="grid grid-cols-2 gap-3 text-center">
          <div className="rounded-lg bg-muted p-3">
            <dt className="text-xs text-muted-foreground">Current</dt>
            <dd className="font-mono text-2xl tabular-nums">{count}</dd>
          </div>
          <div className="rounded-lg bg-muted p-3">
            <dt className="text-xs text-muted-foreground">Previous</dt>
            <dd className="font-mono text-2xl tabular-nums">
              {previous ?? "—"}
            </dd>
          </div>
        </dl>
        <div className="flex justify-center gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => setCount((c) => c - 1)}
          >
            Decrement
          </Button>
          <Button type="button" onClick={() => setCount((c) => c + 1)}>
            Increment
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
