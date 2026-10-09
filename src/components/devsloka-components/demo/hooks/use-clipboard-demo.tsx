"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useClipboard } from "@/registry/hooks/use-clipboard";

export default function UseClipboardDemo() {
  const { copied, error, copy } = useClipboard({ timeout: 1500 });
  const [text, setText] = useState("npx shadcn@latest add button");

  return (
    <Card className="mx-auto w-full max-w-md">
      <CardContent className="space-y-3">
        <Label htmlFor="clipboard-text">Text to copy</Label>
        <div className="flex gap-2">
          <Input
            id="clipboard-text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="font-mono"
          />
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => copy(text)}
            aria-label={copied ? "Copied" : "Copy to clipboard"}
          >
            {copied ? <Check aria-hidden /> : <Copy aria-hidden />}
          </Button>
        </div>
        <p className="text-sm text-muted-foreground" aria-live="polite">
          {error ? (
            <span className="text-destructive">
              Copy failed: {error.message}
            </span>
          ) : copied ? (
            "Copied to clipboard."
          ) : (
            "Click the button to copy."
          )}
        </p>
      </CardContent>
    </Card>
  );
}
