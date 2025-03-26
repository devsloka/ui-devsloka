import { AdvancedCodeBlock } from "@/components/ui/advanced-code-block";
import { getComponentCode } from "@/utilities/getComponentCode";
import BackgroundPreview from "@/components/backgrounds/preview/BackgroundPreview";
import ConfettiBackground from "@/components/backgrounds/confetti-background";

export default function ConfettiBackgroundPage() {
  const ConfettiBackgroundCode = getComponentCode(
    "src/components/backgrounds/confetti-background.tsx"
  );

  return (
    <div>
      <AdvancedCodeBlock
        code={ConfettiBackgroundCode}
        preview={
          <BackgroundPreview
            backgroundComponent={<ConfettiBackground />}
            title="Confetti Background"
            description="Beautiful animated backgrounds for your website hero sections"
          />
        }
        language="tsx"
        showLineNumbers
        title="Confetti Background"
      />
    </div>
  );
}
