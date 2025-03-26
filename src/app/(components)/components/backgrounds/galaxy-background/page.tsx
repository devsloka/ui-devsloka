import GalaxyBackground from "@/components/backgrounds/galaxy-background";
import { AdvancedCodeBlock } from "@/components/ui/advanced-code-block";
import { getComponentCode } from "@/utilities/getComponentCode";
import BackgroundPreview from "@/components/backgrounds/preview/BackgroundPreview";

export default function GalaxyBackgroundPage() {
  const GalaxyBackgroundCode = getComponentCode(
    "src/components/backgrounds/galaxy-background.tsx"
  );

  return (
    <div>
      <AdvancedCodeBlock
        code={GalaxyBackgroundCode}
        preview={
          <BackgroundPreview
            backgroundComponent={<GalaxyBackground />}
            title="Galaxy Background"
            description="Beautiful animated backgrounds for your website hero sections"
          />
        }
        language="tsx"
        showLineNumbers
        title="Galaxy Background"
      />
    </div>
  );
}
