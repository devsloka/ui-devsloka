"use client";

import {
  ChevronDown,
  FileText,
  LayoutDashboard,
  MessageSquare,
  Package,
  User,
} from "lucide-react";
import { VideoComponentCard } from "./video-component-card";

export function VideoComponentGrid() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 py-3">
      {[
        { name: "Button", icon: Package },
        { name: "Card", icon: LayoutDashboard },
        { name: "Dialog", icon: MessageSquare },
        { name: "Dropdown", icon: ChevronDown },
        { name: "Form", icon: FileText },
        { name: "Avatar", icon: User },
      ].map((component, i) => (
        <VideoComponentCard
          key={i}
          name={component.name}
          icon={component.icon}
          index={i}
        />
      ))}
    </div>
  );
}
