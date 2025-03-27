"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useClipboard } from "../use-clipboard";
import { useState } from "react";

export default function UseClipboardDemo() {
  const { isCopied, copy } = useClipboard();
  const [text, setText] = useState("Copy me!");

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold">useClipboard</h1>
        <p className="text-muted-foreground">
          Copy text to clipboard with feedback
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Text to Copy</Label>
          <Input value={text} onChange={(e) => setText(e.target.value)} />
        </div>
        <Button onClick={() => copy(text)}>
          {isCopied ? "Copied!" : "Copy to Clipboard"}
        </Button>
      </div>
    </div>
  );
}
