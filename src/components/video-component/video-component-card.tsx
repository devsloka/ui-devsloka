"use client";

import type * as React from "react";
import { ArrowUpRight, Play } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function VideoComponentCard({
  name,
  icon: Icon,
  index,
}: {
  name: string;
  icon: React.ElementType;
  index: number;
}) {
  return (
    <div className="group relative overflow-hidden rounded-xl border bg-card shadow-sm transition-all hover:shadow-md">
      {/* Video preview area */}
      <div className="relative aspect-video w-full bg-gradient-to-br from-primary/5 to-primary/10 overflow-hidden">
        {/* Component preview */}
        <div className="absolute inset-0 flex items-center justify-center transition-transform duration-700 group-hover:scale-110">
          <Icon className="h-12 w-12 text-primary/40 transition-all duration-700 group-hover:text-primary/70" />
        </div>

        {/* Play button overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/90 text-primary-foreground transform transition-all duration-300 group-hover:scale-110">
            <Play className="h-5 w-5" />
          </div>
        </div>

        {/* Animated gradient overlay to simulate video */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent opacity-0 group-hover:opacity-100"
          style={{
            backgroundSize: "200% 100%",
            animation: "none",
            animationPlayState: "paused",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.animation = "shimmer 2s infinite linear";
            e.currentTarget.style.animationPlayState = "running";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.animationPlayState = "paused";
          }}
        />

        {/* Interactive elements that animate on hover */}
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Animated dots to simulate video loading/playing */}
        <div className="absolute bottom-3 right-3 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="h-2 w-2 rounded-full bg-primary/80"
              style={{
                animation: `pulse 1.5s infinite ${i * 0.2}s`,
                opacity: 0.7,
              }}
            />
          ))}
        </div>
      </div>

      {/* Component info */}
      <div className="p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">{name}</h3>
          <Badge variant="outline" className="text-xs">
            v1.0
          </Badge>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">
          Interactive {name.toLowerCase()} component with customizable
          properties.
        </p>
        <div className="mt-4 flex items-center justify-between">
          <div className="flex -space-x-2">
            {[...Array(3)].map((_, i) => (
              <Avatar key={i} className="h-6 w-6 border-2 border-background">
                <AvatarFallback className="text-xs">
                  {String.fromCharCode(65 + ((index + i) % 26))}
                </AvatarFallback>
              </Avatar>
            ))}
          </div>
          <Button variant="ghost" size="sm" className="gap-1 text-xs">
            View <ArrowUpRight className="h-3 w-3" />
          </Button>
        </div>
      </div>
    </div>
  );
}
