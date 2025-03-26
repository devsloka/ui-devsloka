import { AdvancedCodeBlock } from "@/components/ui/advanced-code-block";
import { getComponentCode } from "@/utilities/getComponentCode";
import BackgroundPreview from "@/components/backgrounds/preview/BackgroundPreview";
import GradientWaveBackground from "@/components/backgrounds/gradient-wave";

export default function GradientWaveBackgroundPage() {
  const GradientWaveBackgroundCode = getComponentCode(
    "src/components/backgrounds/gradient-wave.tsx"
  );

  return (
    <div>
      <AdvancedCodeBlock
        code={GradientWaveBackgroundCode}
        preview={
          <BackgroundPreview
            backgroundComponent={<GradientWaveBackground />}
            title="Gradient Wave Background"
            description="Beautiful animated backgrounds for your website hero sections"
          />
        }
        language="tsx"
        showLineNumbers
        title="Gradient Wave Background"
      />
    </div>
  );
}
