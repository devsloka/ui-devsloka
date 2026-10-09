"use client";

import { useState } from "react";
import { Home, Search, Settings, User } from "lucide-react";
import { MorphingNav, type MorphingNavItem } from "@/registry/ui/morphing-nav";

const ITEMS: MorphingNavItem[] = [
  { value: "home", label: "Home", icon: Home },
  { value: "profile", label: "Profile", icon: User },
  { value: "settings", label: "Settings", icon: Settings },
  { value: "search", label: "Search", icon: Search },
];

export default function MorphingNavDemo() {
  const [active, setActive] = useState("home");

  return (
    <div className="flex flex-col items-center gap-4">
      <MorphingNav
        items={ITEMS}
        value={active}
        onValueChange={setActive}
        aria-label="Sections"
      />
      <p className="text-sm text-muted-foreground">
        Selected: <span className="font-medium text-foreground">{active}</span>
      </p>
    </div>
  );
}
