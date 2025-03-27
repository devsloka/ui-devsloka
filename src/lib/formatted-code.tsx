"use client";

import { cn } from "@/lib/utils";
import { formatCode } from "@/utilities/code";

interface FormattedCodeProps {
  code: string;
  className?: string;
}

export const FormattedCode = ({ code, className }: FormattedCodeProps) => {
  const formattedCode = formatCode(code);
  return (
    <pre className={cn("whitespace-pre-wrap font-mono text-sm", className)}>
      <code>{formattedCode}</code>
    </pre>
  );
};
