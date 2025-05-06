"use client";

import * as React from "react";
import { useState } from "react";
import { ChevronDown, Code, Eye } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { CodeHighlighter } from "@/lib/code-highlighter";
import { cn } from "@/lib/utils";
import { formatCode } from "@/utilities/code";
import { CopyButton } from "../../lib/copy-button";

interface AdvancedCodeBlockProps {
  // Primary code preview block
  code: string;
  language?: string;
  preview: React.ReactNode;
  showLineNumbers?: boolean;
  title?: string;
  description?: string;
  keywords?: string[];
  dependencies?: string;

  // CLI vs Manual modes for dependencies/setup
  /** CLI commands (e.g. install/run), newline-separated */
  cliCommands?: string;
  /** Manual setup steps or imports, newline-separated */
  manualSteps?: string[];

  // Full manual code snippet
  secondaryCode?: string;
  secondaryLanguage?: string;
  secondaryTitle?: string;
  secondaryDescription?: string;

  className?: string;
}

export function AdvancedCodeBlock({
  code,
  language = "tsx",
  preview,
  showLineNumbers = true,
  title,
  description,
  keywords,
  cliCommands = "",
  manualSteps = [],
  secondaryCode,
  secondaryLanguage = "tsx",
  secondaryTitle,
  secondaryDescription,
  className,
  dependencies,
}: AdvancedCodeBlockProps) {
  const [viewTab, setViewTab] = useState<string>("preview");
  const [modeTab, setModeTab] = useState<string>("manual");

  return (
    <div className={cn("space-y-10 my-8", className)}>
      {/* Title & Metadata */}
      {(title || description) && (
        <div className="space-y-4">
          {title && (
            <h1 className="text-3xl font-bold text-foreground">{title}</h1>
          )}
          {description && (
            <p className="text-base text-muted-foreground">{description}</p>
          )}
          {keywords && (
            <div className="flex flex-wrap gap-2">
              {keywords.map((k) => (
                <Badge key={k} variant="secondary">
                  {k}
                </Badge>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Main Preview / Code */}
      <div className={cn("rounded-lg border shadow-sm", className)}>
        <Tabs value={viewTab} onValueChange={setViewTab} className="w-full">
          <div className="flex items-center justify-between px-4 border-b bg-muted/40">
            <TabsList className="h-12 bg-transparent p-2">
              <TabsTrigger value="preview" className="cursor-pointer">
                <Eye className="h-4 w-4 mr-2" /> Preview
              </TabsTrigger>
              <TabsTrigger value="code" className="cursor-pointer">
                <Code className="h-4 w-4 mr-2" /> Code
              </TabsTrigger>
            </TabsList>
            <div className="flex items-center gap-2">
              {viewTab === "code" && (
                <Badge variant="outline" className="text-xs font-mono">
                  {language}
                </Badge>
              )}
              <CopyButton textToCopy={formatCode(code)} />
            </div>
          </div>
          <TabsContent value="preview" className="p-6 border-none">
            <div className="flex min-h-[200px] w-full items-center justify-center bg-background">
              {preview}
            </div>
          </TabsContent>
          <TabsContent value="code" className="p-0 border-none">
            <div className="relative overflow-hidden rounded-b-lg">
              <CodeHighlighter
                code={code}
                language={language}
                showLineNumbers={showLineNumbers}
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* CLI vs Manual Mode Tabs */}
      {
        <Tabs value={modeTab} onValueChange={setModeTab} className="w-full">
          <TabsList className="bg-muted/40 p-2 rounded-lg">
            {cliCommands && <TabsTrigger value="cli">CLI</TabsTrigger>}
            <TabsTrigger value="manual">Manual</TabsTrigger>
          </TabsList>

          {cliCommands && (
            <TabsContent
              value="cli"
              className="p-4 border rounded-b-lg space-y-4"
            >
              <div>
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold mb-4">
                    Install Dependencies
                  </h2>
                  <CopyButton
                    textToCopy={formatCode(cliCommands)}
                    className="mb-4"
                  />
                </div>
                <CodeHighlighter
                  code={cliCommands}
                  language="bash"
                  showLineNumbers={true}
                />
              </div>
            </TabsContent>
          )}

          <TabsContent
            value="manual"
            className="space-y-4 border p-4 rounded-sm"
          >
            {manualSteps && (
              <div className="">
                {/* Dependencies Section */}
                {manualSteps.length > 0 && (
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold">
                      Manual Setup Steps
                    </h3>
                    <div className="space-y-4">
                      {manualSteps.map((step, i) => (
                        <div key={i} className="flex items-start">
                          <div className="flex flex-col items-center">
                            <div className="w-6 h-6 flex items-center justify-center rounded-full text-white-foreground text-xs border">
                              {i + 1}
                            </div>
                            {i < manualSteps.length - 1 && (
                              <ChevronDown className="mt-2 h-4 w-4 text-primary " />
                            )}
                          </div>
                          <p className="ml-4 text-md text-primary">{step}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {dependencies && (
              <div>
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold mb-4">
                    Install Dependencies
                  </h2>
                  <CopyButton
                    textToCopy={formatCode(dependencies)}
                    className="mb-4"
                  />
                </div>
                <CodeHighlighter
                  code={dependencies}
                  language="bash"
                  showLineNumbers={true}
                />
              </div>
            )}

            {secondaryCode && (
              <div className="space-y-2 relative">
                {secondaryTitle && (
                  <h3 className="text-lg font-semibold">{secondaryTitle}</h3>
                )}
                {secondaryDescription && (
                  <p className="text-sm text-muted-foreground">
                    {secondaryDescription}
                  </p>
                )}
                <CodeHighlighter
                  code={secondaryCode}
                  language={secondaryLanguage}
                  showLineNumbers
                />
                <div className="absolute top-2 right-2">
                  <CopyButton textToCopy={formatCode(secondaryCode)} />
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      }
    </div>
  );
}
