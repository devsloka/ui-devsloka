"use client";

import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  useDebounce,
  useDebouncedCallback,
} from "@/registry/hooks/use-debounce";

export default function UseDebounceDemo() {
  const [input, setInput] = useState("");
  const debouncedValue = useDebounce(input, 500);
  const [saves, setSaves] = useState(0);
  const save = useDebouncedCallback(() => setSaves((n) => n + 1), 1000);

  return (
    <Card className="mx-auto w-full max-w-md">
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="debounce-input">Type something</Label>
          <Input
            id="debounce-input"
            value={input}
            placeholder="Search…"
            onChange={(e) => {
              setInput(e.target.value);
              save();
            }}
            onBlur={save.flush}
          />
        </div>
        <dl className="space-y-2 rounded-lg bg-muted p-4 text-sm">
          <div className="flex justify-between gap-4">
            <dt className="text-muted-foreground">Instant</dt>
            <dd className="truncate font-mono">{input || "—"}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-muted-foreground">useDebounce (500ms)</dt>
            <dd className="truncate font-mono">{debouncedValue || "—"}</dd>
          </div>
          <div className="flex items-center justify-between gap-4">
            <dt className="text-muted-foreground">
              useDebouncedCallback (1s, flush on blur)
            </dt>
            <dd>
              <Badge variant="secondary">{saves} saves</Badge>
            </dd>
          </div>
        </dl>
      </CardContent>
    </Card>
  );
}
