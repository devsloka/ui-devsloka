"use client";

import { useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { useOnClickOutside } from "@/registry/hooks/use-on-click-outside";

export default function UseOnClickOutsideDemo() {
  const [open, setOpen] = useState(false);
  const [outsideClicks, setOutsideClicks] = useState(0);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Both the trigger and the panel count as "inside".
  useOnClickOutside(
    [triggerRef, panelRef],
    () => {
      setOpen(false);
      setOutsideClicks((n) => n + 1);
    },
    { enabled: open },
  );

  return (
    <div className="mx-auto flex w-full max-w-sm flex-col items-center gap-3">
      <Button
        ref={triggerRef}
        type="button"
        variant="outline"
        aria-expanded={open}
        aria-controls="click-outside-panel"
        onClick={() => setOpen((o) => !o)}
      >
        {open ? "Close panel" : "Open panel"}
      </Button>
      {open && (
        <div
          id="click-outside-panel"
          ref={panelRef}
          className="w-full rounded-xl border bg-card p-4 text-sm shadow-sm"
        >
          Click anywhere outside this panel to close it.
        </div>
      )}
      <p className="text-sm text-muted-foreground">
        Closed by outside click:{" "}
        <span className="font-mono text-foreground">{outsideClicks}</span>
      </p>
    </div>
  );
}
