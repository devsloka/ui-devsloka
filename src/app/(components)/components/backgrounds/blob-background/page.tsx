import { AdvancedCodeBlock } from "@/components/ui/advanced-code-block";
import BackgroundPreview from "@/components/backgrounds/preview/BackgroundPreview";
import BlobBackground from "@/components/backgrounds/blob-background";
import { getComponentCode } from "@/utilities/getComponentCode";

const BlobBackgroundPage = () => {
  const BlobBackgroundCode = getComponentCode(
    "src/components/backgrounds/blob-background.tsx"
  );
  return (
    <div>
      <AdvancedCodeBlock
        code={BlobBackgroundCode}
        preview={
          <BackgroundPreview
            backgroundComponent={<BlobBackground />}
            title="Blob Background"
            description="Beautiful animated backgrounds for your website hero sections"
          />
        }
      />
    </div>
  );
};

export default BlobBackgroundPage;
