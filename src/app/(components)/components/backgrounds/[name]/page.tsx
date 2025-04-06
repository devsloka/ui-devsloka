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
import { Metadata } from "next";
import { GlobeHero } from "@/components/backgrounds/3d-background";
import GradientBg from "@/components/backgrounds/gradient-bg";

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
  "3d-background": GlobeHero,
  "gradient-bg": GradientBg,
};

export async function generateStaticParams() {
  const backgroundsKeys = await Promise.resolve(Object.keys(backgrounds));
  return backgroundsKeys.map((id) => ({ name: id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ name: string }>;
}): Promise<Metadata> {
  const { name } = await params;
  const formattedName = name.replace(/-/g, " ");
  return {
    title: `${formattedName} - Animated Background`,
    description: `Explore the ${formattedName} animation, a beautiful background effect for web projects.`,
    keywords: [
      formattedName,
      "animated background",
      "CSS background",
      "React background effects",
      "Next.js animated UI",
    ],
    openGraph: {
      title: `${formattedName} - Animated Background`,
      description: `Explore the ${formattedName} animation, a beautiful background effect for web projects.`,
      url: `https://yourwebsite.com/components/backgrounds/${name}`,
      type: "website",
      images: [`https://yourwebsite.com/images/${name}.png`],
    },
  };
}

export default async function BackgroundPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  const BackgroundComponent = backgrounds[name];

  if (!BackgroundComponent) {
    return notFound();
  }

  const componentPath = `src/components/backgrounds/${name}.tsx`;
  const componentCode = getComponentCode(componentPath);

  return (
    <div>
      <AdvancedCodeBlock
        code={componentCode}
        preview={
          <BackgroundPreview
            backgroundComponent={<BackgroundComponent />}
            title={name.replace(/-/g, " ")}
            description="Beautiful animated backgrounds for your website hero sections"
          />
        }
        language="tsx"
        showLineNumbers
        title={name.replace(/-/g, " ")}
      />
    </div>
  );
}
