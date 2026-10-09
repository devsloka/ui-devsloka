"use client";

import { Heart, Shield, Star, Zap } from "lucide-react";
import { IconRadioGroup, IconRadioItem } from "@/registry/ui/icon-radio";

export default function IconRadioDemo() {
  return (
    <IconRadioGroup defaultValue="favorite" aria-label="Collection">
      <IconRadioItem value="favorite" icon={Heart} label="Favorite" />
      <IconRadioItem value="popular" icon={Star} label="Popular" />
      <IconRadioItem value="trending" icon={Zap} label="Trending" />
      <IconRadioItem value="secure" icon={Shield} label="Secure" />
    </IconRadioGroup>
  );
}
