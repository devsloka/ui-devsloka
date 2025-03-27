"use client";

import { Highlight, themes } from "prism-react-renderer";
import { cn } from "@/lib/utils";
import { formatCode } from "@/utilities/code";

interface CodeHighlighterProps {
  code: string;
  language?: string;
  showLineNumbers?: boolean;
  className?: string;
}

export const CodeHighlighter = ({
  code,
  language = "tsx",
  showLineNumbers = true,
  className,
}: CodeHighlighterProps) => {
  const formattedCode = formatCode(code);

  return (
    <Highlight theme={themes.vsDark} code={formattedCode} language={language}>
      {({
        className: highlightClassName,
        style,
        tokens,
        getLineProps,
        getTokenProps,
      }) => (
        <pre
          className={cn(
            "overflow-x-auto py-4 text-sm leading-6 rounded-sm max-h-96",
            highlightClassName,
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
            <div key={i} {...getLineProps({ line })} className="px-4 flex">
              {showLineNumbers && (
                <span className="mr-4 inline-block w-5 text-right text-gray-500 select-none">
                  {i + 1}
                </span>
              )}
              <span>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </span>
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
};
