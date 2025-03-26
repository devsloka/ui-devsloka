import { AdvancedCodeBlock } from "@/components/ui/advanced-code-block";
import { getComponentCode } from "@/utilities/getComponentCode";
import BackgroundPreview from "@/components/backgrounds/preview/BackgroundPreview";
import FloatingShapesBackground from "@/components/backgrounds/floating-shapes";

export default function FloatingShapesBackgroundPage() {
  const FloatingShapesBackgroundCode = getComponentCode(
    "src/components/backgrounds/floating-shapes.tsx"
  );

  return (
    <div>
      <AdvancedCodeBlock
        code={FloatingShapesBackgroundCode}
        preview={
          <BackgroundPreview
            backgroundComponent={<FloatingShapesBackground />}
            title="Floating Shapes Background"
            description="Beautiful animated backgrounds for your website hero sections"
          />
        }
        language="tsx"
        showLineNumbers
        title="Floating Shapes Background"
      />
    </div>
  );
}
