"use client";

import { useRef } from "react";
import { Moon, Sun } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useDarkMode } from "@/registry/hooks/use-dark-mode";

export default function UseDarkModeDemo() {
  // Scoped to this preview so the demo doesn't fight the docs site's own theme switcher.
  const previewRef = useRef<HTMLDivElement>(null);
  const { isDark, theme, setTheme, toggle } = useDarkMode({
    storageKey: "devsloka-dark-mode-demo",
    element: previewRef,
  });

  return (
    <div
      ref={previewRef}
      className="mx-auto w-full max-w-sm rounded-xl border bg-background p-6 text-foreground"
    >
      <div className="flex items-center justify-between gap-4">
        <div className="space-y-1">
          <p className="font-medium">{isDark ? "Dark" : "Light"} mode</p>
          <Badge variant="secondary">
            {theme ? `Saved: ${theme}` : "Following system"}
          </Badge>
        </div>
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={toggle}
          aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        >
          {isDark ? <Sun aria-hidden /> : <Moon aria-hidden />}
        </Button>
      </div>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="mt-4 px-0"
        onClick={() => setTheme(null)}
        disabled={theme === null}
      >
        Reset to system preference
      </Button>
    </div>
  );
}
