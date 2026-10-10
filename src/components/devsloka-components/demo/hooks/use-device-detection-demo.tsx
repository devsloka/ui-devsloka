"use client";

import { Monitor, Smartphone, Tablet } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useDeviceDetection } from "@/registry/hooks/use-device-detection";

const ICONS = { mobile: Smartphone, tablet: Tablet, desktop: Monitor };

export default function UseDeviceDetectionDemo() {
  const { device, isTouch, canHover, os } = useDeviceDetection();
  const Icon = ICONS[device];

  return (
    <Card className="mx-auto w-full max-w-sm">
      <CardContent className="flex flex-col items-center gap-4 text-center">
        <Icon className="size-10 text-primary" aria-hidden />
        <p className="text-lg font-medium capitalize">{device}</p>
        <div className="flex flex-wrap justify-center gap-2">
          <Badge variant="secondary">
            {isTouch ? "Coarse pointer" : "Fine pointer"}
          </Badge>
          <Badge variant="secondary">
            {canHover ? "Can hover" : "No hover"}
          </Badge>
          <Badge variant="outline">OS: {os}</Badge>
        </div>
        <p className="text-sm text-muted-foreground">
          Resize the window to see the device class update.
        </p>
      </CardContent>
    </Card>
  );
}
