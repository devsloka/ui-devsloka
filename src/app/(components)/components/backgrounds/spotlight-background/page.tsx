import { AdvancedCodeBlock } from "@/components/ui/advanced-code-block";
import { getComponentCode } from "@/utilities/getComponentCode";
import BackgroundPreview from "@/components/backgrounds/preview/BackgroundPreview";
import SpotlightBackground from "@/components/backgrounds/spotlight-background";

export default function SpotlightBackgroundPage() {
  const SpotlightBackgroundCode = getComponentCode(
    "src/components/backgrounds/spotlight-background.tsx"
  );

  return (
    <div>
      <AdvancedCodeBlock
        code={SpotlightBackgroundCode}
        preview={
          <BackgroundPreview
            backgroundComponent={<SpotlightBackground />}
            title="Spotlight Background"
            description="Beautiful animated backgrounds for your website hero sections"
          />
        }
        language="tsx"
        showLineNumbers
        title="Spotlight Background"
      />
    </div>
  );
}
