import NightSkyCanvas from "@/components/backgrounds/moon-stars-background";
import { AdvancedCodeBlock } from "@/components/ui/advanced-code-block";
import { getComponentCode } from "@/utilities/getComponentCode";
import BackgroundPreview from "@/components/backgrounds/preview/BackgroundPreview";

export default function MoonStarsBackgroundPage() {
  const MoonStarsBackgroundCode = getComponentCode(
    "src/components/backgrounds/moon-stars-background.tsx"
  );

  return (
    <div>
      <AdvancedCodeBlock
        code={MoonStarsBackgroundCode}
        preview={
          <BackgroundPreview
            backgroundComponent={<NightSkyCanvas />}
            title="Moon Stars Background"
            description="Beautiful animated backgrounds for your website hero sections"
          />
        }
        language="tsx"
        showLineNumbers
        title="Moon Stars Background"
      />
    </div>
  );
}
