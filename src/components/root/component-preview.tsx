"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Laptop, Smartphone, Tablet, Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  vscDarkPlus,
  vs,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import { useIsMobile } from "@/hooks/use-mobile";
import { useTheme } from "next-themes";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

type DeviceType = "mobile" | "tablet" | "desktop";

interface ComponentPreviewProps {
  component: React.ReactNode;
  code: string;
  language?: string;
  title?: string;
  description?: string;
  className?: string;
}

export function ComponentPreview({
  component,
  code,
  language = "tsx",
  title = "Component Preview",
  description = "A preview of the component with code example",
  className,
}: ComponentPreviewProps) {
  const [activeTab, setActiveTab] = React.useState<"preview" | "code">(
    "preview"
  );
  const [device, setDevice] = React.useState<DeviceType>("desktop");
  const [copied, setCopied] = React.useState(false);
  const { theme } = useTheme();
  const isMobile = useIsMobile();

  const handleCopy = React.useCallback(() => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [code]);

  const deviceFrameVariants = {
    mobile: { width: "320px", height: "568px" },
    tablet: { width: "768px", height: "1024px" },
    desktop: { width: "100%", height: "100%" },
  };

  const deviceFrameStyles = {
    mobile: "rounded-[32px] border-[12px]",
    tablet: "rounded-[24px] border-[16px]",
    desktop: "rounded-md border-[1px]",
  };

  return (
    <div className={cn(className)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-3xl font-semibold">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>

      {/* Tabs */}
      <Tabs
        defaultValue="preview"
        value={activeTab}
        onValueChange={(value) => setActiveTab(value as "preview" | "code")}
      >
        <div className=" p-2 flex justify-end">
          <div className="flex items-center gap-2">
            {!isMobile && (
              <div className="mr-2 flex items-center rounded-md border p-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "h-8 w-8 rounded-sm",
                    device === "mobile" && "bg-muted"
                  )}
                  onClick={() => setDevice("mobile")}
                >
                  <Smartphone className="h-4 w-4" />
                  <span className="sr-only">Mobile view</span>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "h-8 w-8 rounded-sm",
                    device === "tablet" && "bg-muted"
                  )}
                  onClick={() => setDevice("tablet")}
                >
                  <Tablet className="h-4 w-4" />
                  <span className="sr-only">Tablet view</span>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "h-8 w-8 rounded-sm",
                    device === "desktop" && "bg-muted"
                  )}
                  onClick={() => setDevice("desktop")}
                >
                  <Laptop className="h-4 w-4" />
                  <span className="sr-only">Desktop view</span>
                </Button>
              </div>
            )}
          </div>
          <TabsList className="h-10">
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="code">Code</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="preview" className="">
          <div className="flex min-h-[400px] w-full items-center justify-center overflow-hidden rounded-md border bg-background p-4">
            <motion.div
              className={cn(
                "relative overflow-auto border border-border bg-background p-1",
                deviceFrameStyles[device]
              )}
              variants={deviceFrameVariants}
              initial={false}
              animate={device}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
              }}
            >
              {component}
            </motion.div>
          </div>
        </TabsContent>

        <TabsContent value="code" className="relative">
          <div className="absolute right-4 top-4 z-10 p-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleCopy}
              className="h-8 w-8 rounded-md bg-primary/10 backdrop-blur-sm"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={copied ? "check" : "copy"}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  {copied ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </motion.div>
              </AnimatePresence>
              <span className="sr-only">Copy code</span>
            </Button>
          </div>
          <div className="overflow-auto p-4">
            <SyntaxHighlighter
              language={language}
              style={theme === "dark" ? vscDarkPlus : vs}
              customStyle={{
                margin: 0,
                borderRadius: "0.375rem",
                fontSize: "0.875rem",
              }}
              showLineNumbers
            >
              {code}
            </SyntaxHighlighter>
          </div>
        </TabsContent>
      </Tabs>

      {/* Documentation Panel */}
      <div className="border-t">
        <AnimatePresence>
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="prose prose-sm max-w-none p-4 dark:prose-invert">
              <h4>Usage</h4>
              <p>
                Import the component and provide the required props to display
                your component with a preview and code example.
              </p>
              <SyntaxHighlighter
                language={language}
                style={theme === "dark" ? vscDarkPlus : vs}
                customStyle={{
                  margin: 0,
                  borderRadius: "0.375rem",
                  fontSize: "0.875rem",
                }}
                showLineNumbers
              >
                {`import { ComponentPreview } from "@/components/component-preview"

export default function Page() {
  return (
    <ComponentPreview
      component={<YourComponent />}
      code={\`const YourComponent = () => <div>Hello World</div>\`}
      title="Your Component"
      description="Description of your component"
    />
  )
}`}
              </SyntaxHighlighter>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
