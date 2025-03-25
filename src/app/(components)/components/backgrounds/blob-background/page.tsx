"use client";
import { AdvancedCodeBlock } from "@/components/ui/advanced-code-block";
import BackgroundPreview from "@/components/backgrounds/preview/BackgroundPreview";
import BlobBackground from "@/components/backgrounds/blob-background";

const BlobBackgroundPage = () => {
  return (
    <div>
      <AdvancedCodeBlock
        code={`"use client";`}
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
