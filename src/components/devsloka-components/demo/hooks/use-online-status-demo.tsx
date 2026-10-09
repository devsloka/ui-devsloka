"use client";

import { Wifi, WifiOff } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useOnlineStatus } from "@/registry/hooks/use-online-status";

export default function UseOnlineStatusDemo() {
  const isOnline = useOnlineStatus();
  const Icon = isOnline ? Wifi : WifiOff;

  return (
    <Card className="mx-auto w-full max-w-sm">
      <CardContent className="flex flex-col items-center gap-3 text-center">
        <Icon
          className={
            isOnline ? "size-10 text-primary" : "size-10 text-destructive"
          }
          aria-hidden
        />
        <Badge
          variant={isOnline ? "secondary" : "destructive"}
          aria-live="polite"
        >
          {isOnline ? "Online" : "Offline"}
        </Badge>
        <p className="text-sm text-muted-foreground">
          Toggle offline mode in your browser&apos;s DevTools to see it change.
        </p>
      </CardContent>
    </Card>
  );
}
