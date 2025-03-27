"use client";
import { useState } from "react";
import { useDebounce } from "@/hooks/devsloka-hooks/use-debounce";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function UseDebounceDemo() {
  const [input, setInput] = useState("");
  const debouncedValue = useDebounce(input, 500);

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold">useDebounce</h1>
        <p className="text-muted-foreground">
          Delay value updates until after specified time
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Instant Value</Label>
          <Input value={input} onChange={(e) => setInput(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Debounced Value</Label>
          <Input value={debouncedValue} readOnly className="bg-muted" />
        </div>
      </div>
    </div>
  );
}
