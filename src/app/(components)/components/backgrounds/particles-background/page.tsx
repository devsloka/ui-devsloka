import React from "react";
import { AdvancedCodeBlock } from "@/components/ui/advanced-code-block";
import ParticlesBackground from "@/components/backgrounds/particles-background";
import { getComponentCode } from "@/utilities/getComponentCode";
import BackgroundPreview from "@/components/backgrounds/preview/BackgroundPreview";

const ParticlesBackgroundPage = () => {
  const ParticlesBackgroundCode = getComponentCode(
    "src/components/backgrounds/particles-background.tsx"
  );
  return (
    <div>
      <AdvancedCodeBlock
        code={ParticlesBackgroundCode}
        preview={
          <BackgroundPreview
            backgroundComponent={<ParticlesBackground />}
            title="Sky Particles Background"
            description="Beautiful animated backgrounds for your website hero sections"
          />
        }
        language="tsx"
        showLineNumbers
        title="Particles Background"
      />
    </div>
  );
};

export default ParticlesBackgroundPage;
