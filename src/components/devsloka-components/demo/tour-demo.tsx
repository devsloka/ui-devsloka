"use client";

import React, { useState } from "react";
import { Bell, FolderKanban, Search, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tour, type TourStep } from "@/registry/ui/tour";

const steps: TourStep[] = [
  {
    target: "#tour-search",
    title: "Search everything",
    description: "Find projects, people and files from one place.",
    placement: "bottom",
  },
  {
    target: "#tour-projects",
    title: "Your projects",
    description: "Pinned projects stay here so you can jump back in quickly.",
    placement: "right",
  },
  {
    target: "#tour-notifications",
    title: "Stay in the loop",
    description: "Mentions and review requests show up as notifications.",
    placement: "bottom",
  },
  {
    target: "#tour-settings",
    title: "Make it yours",
    description: "Change your theme, shortcuts and notification preferences.",
    placement: "left",
  },
];

const projects = ["Website redesign", "Mobile app", "Q3 roadmap"];

const TourDemo: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full p-6">
      <div className="overflow-hidden rounded-xl border bg-background">
        <div className="flex items-center gap-2 border-b px-4 py-3">
          <div
            id="tour-search"
            className="flex h-9 flex-1 items-center gap-2 rounded-lg border px-3 text-sm text-muted-foreground"
          >
            <Search className="size-4" aria-hidden />
            Search…
          </div>
          <Button id="tour-notifications" variant="ghost" size="icon" aria-label="Notifications">
            <Bell className="size-4" />
          </Button>
          <Button id="tour-settings" variant="ghost" size="icon" aria-label="Settings">
            <Settings className="size-4" />
          </Button>
        </div>

        <div className="grid gap-4 p-4 sm:grid-cols-[12rem_1fr]">
          <nav id="tour-projects" aria-label="Projects" className="space-y-1">
            {projects.map((project) => (
              <div
                key={project}
                className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-muted"
              >
                <FolderKanban className="size-4 text-muted-foreground" aria-hidden />
                {project}
              </div>
            ))}
          </nav>
          <div className="flex min-h-40 flex-col items-center justify-center gap-3 rounded-lg border border-dashed p-6 text-center">
            <p className="text-sm text-muted-foreground">New here? Take a quick look around.</p>
            <Button onClick={() => setOpen(true)}>Start tour</Button>
          </div>
        </div>
      </div>

      <Tour steps={steps} open={open} onOpenChange={setOpen} />
    </div>
  );
};

export default TourDemo;
