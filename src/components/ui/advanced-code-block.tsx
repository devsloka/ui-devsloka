"use client";

import * as React from "react";
import { useState } from "react";
import { Check, Copy, Code, Eye } from "lucide-react";
import { Highlight, themes } from "prism-react-renderer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface AdvancedCodeBlockProps {
  code: string;
  language?: string;
  className?: string;
  preview: React.ReactNode;
  showLineNumbers?: boolean;
  title?: string;
}

export function AdvancedCodeBlock({
  code,
  language = "tsx",
  className,
  preview,
  showLineNumbers = true,
  title,
}: AdvancedCodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("preview");

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Clean up any extra indentation in the code
  const formattedCode = React.useMemo(() => {
    const lines = code.split("\n");
    const padLength = lines[0]?.match(/^\s*/)?.[0].length || 0;
    return lines
      .map((line) => line.slice(padLength))
      .join("\n")
      .trim();
  }, [code]);

  return (
    <div className={cn("rounded-lg border shadow-sm", className)}>
      <Tabs
        defaultValue="preview"
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <div className="flex items-center justify-between px-4 border-b bg-muted/40">
          <div className="flex items-center">
            <TabsList className="h-12 bg-transparent p-2">
              <TabsTrigger value="preview">
                <Eye className="h-4 w-4" />
                Preview
              </TabsTrigger>
              <TabsTrigger value="code">
                <Code className="h-4 w-4" />
                Code
              </TabsTrigger>
            </TabsList>
            {title && (
              <div className="hidden md:flex items-center gap-2 ml-4 text-sm text-muted-foreground">
                <span>{title}</span>
              </div>
            )}
          </div>
          <div className="flex items-center gap-2">
            {activeTab === "code" && (
              <Badge variant="outline" className="text-xs font-mono">
                {language}
              </Badge>
            )}
            <button
              onClick={copyToClipboard}
              className="h-8 w-8 flex items-center justify-center rounded-md transition-colors hover:bg-muted"
              aria-label="Copy code"
            >
              {copied ? (
                <Check className="h-4 w-4 text-green-500" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>
        <TabsContent value="preview" className="p-6 border-none">
          <div className="flex min-h-[200px] w-full items-center justify-center rounded-md border p-8 bg-background">
            {preview}
          </div>
        </TabsContent>
        <TabsContent value="code" className="border-none p-0">
          <div className="relative overflow-hidden rounded-b-lg">
            <Highlight
              theme={themes.vsDark}
              code={formattedCode}
              language={language as string}
            >
              {({ className, style, tokens, getLineProps, getTokenProps }) => (
                <pre
                  className={cn(
                    "overflow-x-auto py-4 text-sm leading-6",
                    className
                  )}
                  style={{
                    ...style,
                    backgroundColor: "rgb(30, 30, 30)",
                    marginTop: 0,
                    marginBottom: 0,
                  }}
                >
                  {tokens.map((line, i) => (
                    <div
                      key={i}
                      {...getLineProps({ line, key: i })}
                      className="px-4 flex"
                    >
                      {showLineNumbers && (
                        <span className="mr-4 inline-block w-5 text-right text-gray-500 select-none">
                          {i + 1}
                        </span>
                      )}
                      <span>
                        {line.map((token, key) => (
                          <span key={key} {...getTokenProps({ token, key })} />
                        ))}
                      </span>
                    </div>
                  ))}
                </pre>
              )}
            </Highlight>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
