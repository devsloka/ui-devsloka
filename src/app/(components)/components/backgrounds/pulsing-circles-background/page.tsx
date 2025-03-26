import CirclesBackground from "@/components/backgrounds/circles-background";
import BackgroundPreview from "@/components/backgrounds/preview/BackgroundPreview";
import { AdvancedCodeBlock } from "@/components/ui/advanced-code-block";
import { getComponentCode } from "@/utilities/getComponentCode";

export default function PulsingCirclesBackgroundPage() {
  const PulsingCirclesBackgroundCode = getComponentCode(
    "src/components/backgrounds/circles-background.tsx"
  );

  return (
    <div>
      <AdvancedCodeBlock
        code={PulsingCirclesBackgroundCode}
        preview={
          <BackgroundPreview
            backgroundComponent={<CirclesBackground />}
            title="Pulsing Circles"
            description="Beautiful animated backgrounds for your website hero sections"
          />
        }
        language="tsx"
        showLineNumbers
        title="Pulsing Circles Background"
      />
    </div>
  );
}
