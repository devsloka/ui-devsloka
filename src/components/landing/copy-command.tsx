"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type CopyCommandProps = {
  command: string;
  className?: string;
};

export function CopyCommand({ command, className }: CopyCommandProps) {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timeoutRef.current), []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(command);
    } catch {
      return;
    }
    setCopied(true);
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div
      className={cn(
        "flex min-w-0 items-stretch border border-border font-mono text-sm",
        className
      )}
    >
      <span className="select-none border-r border-border px-3 py-3 text-muted-foreground">
        $
      </span>
      <code className="min-w-0 flex-1 overflow-x-auto whitespace-nowrap px-3 py-3">
        {command}
      </code>
      <button
        type="button"
        onClick={handleCopy}
        className="w-20 shrink-0 cursor-pointer border-l border-border px-3 text-xs uppercase tracking-wider transition-colors hover:bg-foreground hover:text-background"
        aria-label="Copy install command"
      >
        <span aria-live="polite">{copied ? "Copied" : "Copy"}</span>
      </button>
    </div>
  );
}
