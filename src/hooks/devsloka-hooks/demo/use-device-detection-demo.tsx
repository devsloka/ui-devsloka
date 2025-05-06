"use client";
import { useDeviceDetection } from "@/hooks/devsloka-hooks/use-device-detection";
import { Badge } from "@/components/ui/badge";

export default function UseDeviceDetectionDemo() {
  const isMobile = useDeviceDetection();

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold">useDeviceDetection</h1>
        <p className="text-muted-foreground">
          Detect mobile devices based on user agent
        </p>
      </div>

      <div className="flex items-center gap-2">
        <Badge variant={isMobile ? "destructive" : "default"}>
          {isMobile ? "Mobile Device" : "Desktop Device"}
        </Badge>
        <p className="text-sm text-muted-foreground">
          (Based on user agent detection)
        </p>
      </div>
    </div>
  );
}
