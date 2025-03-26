import { notFound } from "next/navigation";
import { AdvancedCodeBlock } from "@/components/ui/advanced-code-block";
import { getComponentCode } from "@/utilities/getComponentCode";
import ConfettiBackground from "@/components/backgrounds/confetti-background";
import NoiseBackground from "@/components/backgrounds/noise-background";
import CirclesBackground from "@/components/backgrounds/circles-background";
import GradientMeshBackground from "@/components/backgrounds/gradient-mesh-background";
import SpotlightBackground from "@/components/backgrounds/spotlight-background";
import RippleBackground from "@/components/backgrounds/ripple-background";
import GalaxyBackground from "@/components/backgrounds/galaxy-background";
import FirefliesBackground from "@/components/backgrounds/fireflies-background";
import GradientWaveBackground from "@/components/backgrounds/gradient-wave";
import FloatingShapesBackground from "@/components/backgrounds/floating-shapes";
import ParticleBackground from "@/components/backgrounds/particles-background";
import GridMeshBackground from "@/components/backgrounds/grid-mesh-background";
import BlobBackground from "@/components/backgrounds/blob-background";
import NightSkyCanvas from "@/components/backgrounds/moon-stars-background";
import BackgroundPreview from "@/components/backgrounds/preview/BackgroundPreview";

const backgrounds: Record<string, React.FC> = {
  "particles-background": ParticleBackground,
  "moon-stars-background": NightSkyCanvas,
  "galaxy-background": GalaxyBackground,
  "gradient-wave": GradientWaveBackground,
  "floating-shapes": FloatingShapesBackground,
  "grid-mesh-background": GridMeshBackground,
  "blob-background": BlobBackground,
  "fireflies-background": FirefliesBackground,
  "confetti-background": ConfettiBackground,
  "noise-background": NoiseBackground,
  "circles-background": CirclesBackground,
  "gradient-mesh-background": GradientMeshBackground,
  "spotlight-background": SpotlightBackground,
  "ripple-background": RippleBackground,
};

export default function BackgroundPage({
  params,
}: {
  params: { name: string };
}) {
  const BackgroundComponent = backgrounds[params.name];

  if (!BackgroundComponent) {
    return notFound();
  }

  const componentPath = `src/components/backgrounds/${params.name}.tsx`;
  const componentCode = getComponentCode(componentPath);

  return (
    <div>
      <AdvancedCodeBlock
        code={componentCode}
        preview={
          <BackgroundPreview
            backgroundComponent={<BackgroundComponent />}
            title={params.name.replace(/-/g, " ")}
            description="Beautiful animated backgrounds for your website hero sections"
          />
        }
        language="tsx"
        showLineNumbers
        title={params.name.replace(/-/g, " ")}
      />
    </div>
  );
}
