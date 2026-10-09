"use client";

import { Minus, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLocalStorage } from "@/registry/hooks/use-local-storage";

function Counter({ label }: { label: string }) {
  const [count, setCount, remove] = useLocalStorage("devsloka-demo-count", 0);

  return (
    <div className="flex items-center justify-between gap-4 rounded-lg border p-3">
      <span className="text-sm text-muted-foreground">{label}</span>
      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="size-8"
          onClick={() => setCount((n) => n - 1)}
          aria-label="Decrement"
        >
          <Minus aria-hidden />
        </Button>
        <span className="w-8 text-center font-mono tabular-nums">{count}</span>
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="size-8"
          onClick={() => setCount((n) => n + 1)}
          aria-label="Increment"
        >
          <Plus aria-hidden />
        </Button>
        <Button type="button" variant="ghost" size="sm" onClick={remove}>
          Clear
        </Button>
      </div>
    </div>
  );
}

export default function UseLocalStorageDemo() {
  return (
    <Card className="mx-auto w-full max-w-md">
      <CardContent className="space-y-3">
        <Counter label="Instance A" />
        <Counter label="Instance B" />
        <p className="text-sm text-muted-foreground">
          Both instances share one key, survive reloads and sync across tabs.
        </p>
      </CardContent>
    </Card>
  );
}
