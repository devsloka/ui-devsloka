"use client";
import React from "react";

import { useKeyPress } from "@/hooks/devsloka-hooks/use-key-press";

import { Label } from "@/components/ui/label";

export default function UseKeyPressDemo() {
  const enterPressed = useKeyPress("Enter");
  const spacePressed = useKeyPress(" ");
  const aPressed = useKeyPress("a");

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold">useKeyPress</h1>
        <p className="text-muted-foreground">
          Detect keyboard key presses in real-time
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        <div className="space-y-2">
          <Label>Enter Key</Label>
          <kbd>{enterPressed ? "Pressed!" : "Press Enter"}</kbd>
        </div>
        <div className="space-y-2">
          <Label>Spacebar</Label>
          <kbd>{spacePressed ? "Pressed!" : "Press Space"}</kbd>
        </div>
        <div className="space-y-2">
          <Label>A Key</Label>
          <kbd>{aPressed ? "Pressed!" : "Press A"}</kbd>
        </div>
      </div>
    </div>
  );
}
