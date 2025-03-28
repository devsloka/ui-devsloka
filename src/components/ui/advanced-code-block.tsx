"use client";

import * as React from "react";
import { useState } from "react";
import { Code, Eye } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { CodeHighlighter } from "@/lib/code-highlighter";
import { cn } from "@/lib/utils";
import { formatCode } from "@/utilities/code";
import { CopyButton } from "../../lib/copy-button";

interface AdvancedCodeBlockProps {
  code: string;
  language?: string;
  className?: string;
  preview: React.ReactNode;
  showLineNumbers?: boolean;
  title?: string;
  description?: string;
  keywords?: string[];
  dependencies?: string;
  secondaryCode?: string;
  secondaryTitle?: string;
  secondaryLanguage?: string;
  secondaryDescription?: string;
}

export function AdvancedCodeBlock({
  code,
  language = "tsx",
  className,
  preview,
  showLineNumbers = true,
  title,
  description,
  keywords,
  dependencies = "",
  secondaryCode,
  secondaryTitle,
  secondaryLanguage,
  secondaryDescription,
}: AdvancedCodeBlockProps) {
  const [activeTab, setActiveTab] = useState<string>("preview");
  console.log(secondaryCode);

  return (
    <div className="space-y-10 my-8">
      {/* Title & Metadata Section */}
      {(title || description) && (
        <div className="space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-2">
              {title && (
                <h1 className="text-3xl font-bold text-foreground">{title}</h1>
              )}
              {description && (
                <p className="text-base text-muted-foreground">{description}</p>
              )}
              {keywords && (
                <div className="flex flex-wrap gap-2">
                  {keywords.map((keyword) => (
                    <Badge key={keyword} variant="secondary">
                      {keyword}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {/* Main Code/Preview Block */}
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
                <TabsTrigger className="cursor-pointer" value="preview">
                  <Eye className="h-4 w-4 mr-2" />
                  Preview
                </TabsTrigger>
                <TabsTrigger className="cursor-pointer" value="code">
                  <Code className="h-4 w-4 mr-2" />
                  Code
                </TabsTrigger>
              </TabsList>
            </div>
            <div className="flex items-center gap-2">
              {activeTab === "code" && (
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
          <TabsContent value="code" className="border-none p-0">
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
      {/* Dependencies Section */}
      {dependencies && (
        <div>
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold mb-4">Install Dependencies</h2>
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
        <div>
          <div className="flex items-center justify-between">
            <div className="mb-4 space-y-1">
              <h2 className="text-xl font-bold">{secondaryTitle}</h2>
              <p className="text-sm text-muted-foreground">
                {secondaryDescription}
              </p>
            </div>
            <CopyButton
              textToCopy={formatCode(secondaryCode)}
              className="mb-4"
            />
          </div>
          <CodeHighlighter
            code={secondaryCode}
            language={secondaryLanguage}
            showLineNumbers={true}
          />
        </div>
      )}
      {/* Secondry code section */}
    </div>
  );
}
