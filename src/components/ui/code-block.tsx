"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { CheckIcon, CopyIcon } from "lucide-react";

interface CodeBlockProps {
  code: string | Record<string, string>;
  language?: string;
  tabs?: string[];
  className?: string;
}

export function CodeBlock({
  code,
  //   language = "bash",
  tabs,
  className,
}: CodeBlockProps) {
  const [activeTab, setActiveTab] = useState<string>(tabs ? tabs[0] : "");
  const [copied, setCopied] = useState(false);

  const codeString = typeof code === "string" ? code : code[activeTab];

  useEffect(() => {
    if (copied) {
      const timeout = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timeout);
    }
  }, [copied]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(codeString);
      setCopied(true);
    } catch (error) {
      console.error("Failed to copy: ", error);
    }
  };

  return (
    <div className={cn("relative rounded-md", className)}>
      {tabs && (
        <div className="flex items-center border-b">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={cn(
                "px-4 py-1.5 font-mono text-sm font-medium transition-colors",
                activeTab === tab
                  ? "border-b-2 border-primary text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      )}
      <div className="relative">
        <pre
          className={cn(
            "p-4 rounded-md bg-muted font-mono text-sm overflow-x-auto",
            tabs ? "rounded-t-none" : ""
          )}
        >
          <code>{codeString}</code>
        </pre>
        <button
          type="button"
          className="absolute right-2 top-2 h-8 w-8 rounded-md border bg-muted/80 backdrop-blur flex items-center justify-center text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          onClick={handleCopy}
        >
          {copied ? (
            <CheckIcon className="h-4 w-4" />
          ) : (
            <CopyIcon className="h-4 w-4" />
          )}
          <span className="sr-only">Copy code</span>
        </button>
      </div>
    </div>
  );
}
