import dynamic from "next/dynamic";
import { BlobBackground } from "@/registry/backgrounds/blob-background";
import { CirclesBackground } from "@/registry/backgrounds/circles-background";
import { ConfettiBackground } from "@/registry/backgrounds/confetti-background";
import { FirefliesBackground } from "@/registry/backgrounds/fireflies-background";
import { FloatingShapesBackground } from "@/registry/backgrounds/floating-shapes";
import { GalaxyBackground } from "@/registry/backgrounds/galaxy-background";
import { GradientBackground } from "@/registry/backgrounds/gradient-bg";
import { GradientMeshBackground } from "@/registry/backgrounds/gradient-mesh-background";
import { GradientWaveBackground } from "@/registry/backgrounds/gradient-wave";
import { GridMeshBackground } from "@/registry/backgrounds/grid-mesh-background";
import { LinesBackground } from "@/registry/backgrounds/lines-background";
import { MoonStarsBackground } from "@/registry/backgrounds/moon-stars-background";
import { NoiseBackground } from "@/registry/backgrounds/noise-background";
import { ParticlesBackground } from "@/registry/backgrounds/particles-background";
import { RippleBackground } from "@/registry/backgrounds/ripple-background";
import { SpotlightBackground } from "@/registry/backgrounds/spotlight-background";

// three.js is large, so the globe loads only where it renders.
const GlobeBackground = dynamic(() =>
  import("@/registry/backgrounds/3d-background").then((m) => m.GlobeBackground)
);

export type BackgroundMeta = {
  component: React.ComponentType;
  title: string;
  description: string;
  /** "dark" backgrounds paint their own dark base, so text on them should be light. */
  tone: "dark" | "theme";
};

// Single source for the background pages, the showcase and the sidebar.
export const backgrounds: Record<string, BackgroundMeta> = {
  "galaxy-background": {
    component: GalaxyBackground,
    title: "Galaxy",
    description: "A slowly turning spiral galaxy with depth-scaled stars and drifting dust.",
    tone: "dark",
  },
  "moon-stars-background": {
    component: MoonStarsBackground,
    title: "Moon & Stars",
    description: "A calm night sky with a glowing moon and twinkling stars.",
    tone: "dark",
  },
  "fireflies-background": {
    component: FirefliesBackground,
    title: "Fireflies",
    description: "Soft glowing particles that wander and pulse like fireflies.",
    tone: "dark",
  },
  "3d-background": {
    component: GlobeBackground,
    title: "3D Globe",
    description: "An interactive WebGL globe with country borders, built with three.js.",
    tone: "dark",
  },
  "particles-background": {
    component: ParticlesBackground,
    title: "Sky Particles",
    description: "A field of softly twinkling particles, rendered with CSS only.",
    tone: "theme",
  },
  "confetti-background": {
    component: ConfettiBackground,
    title: "Confetti",
    description: "Falling confetti in your theme colors.",
    tone: "theme",
  },
  "circles-background": {
    component: CirclesBackground,
    title: "Pulsing Circles",
    description: "Concentric circles that pulse outward from the center.",
    tone: "theme",
  },
  "ripple-background": {
    component: RippleBackground,
    title: "Ripple",
    description: "Ripples that spread from the pointer as it moves across the section.",
    tone: "theme",
  },
  "spotlight-background": {
    component: SpotlightBackground,
    title: "Spotlight",
    description: "A soft spotlight that follows the pointer.",
    tone: "theme",
  },
  "gradient-mesh-background": {
    component: GradientMeshBackground,
    title: "Gradient Mesh",
    description: "Slowly shifting color fields that blend into a soft mesh.",
    tone: "theme",
  },
  "gradient-wave": {
    component: GradientWaveBackground,
    title: "Gradient Wave",
    description: "A gentle animated gradient that flows like a wave.",
    tone: "theme",
  },
  "gradient-bg": {
    component: GradientBackground,
    title: "Gradient",
    description: "A soft animated gradient with floating dots.",
    tone: "theme",
  },
  "blob-background": {
    component: BlobBackground,
    title: "Blobs",
    description: "Blurred organic shapes that drift and morph.",
    tone: "theme",
  },
  "floating-shapes": {
    component: FloatingShapesBackground,
    title: "Floating Shapes",
    description: "Simple geometric shapes floating at different depths.",
    tone: "theme",
  },
  "grid-mesh-background": {
    component: GridMeshBackground,
    title: "Grid Mesh",
    description: "A fine grid with a subtle animated highlight.",
    tone: "theme",
  },
  "lines-background": {
    component: LinesBackground,
    title: "Lines",
    description: "Thin lines drifting across the section.",
    tone: "theme",
  },
  "noise-background": {
    component: NoiseBackground,
    title: "Noise",
    description: "A fine film-grain texture to add depth to flat surfaces.",
    tone: "theme",
  },
};
