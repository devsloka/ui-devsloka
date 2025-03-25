import ShowcaseSlider from "@/components/devsloka-components/ShowcaseSlider";
import { AdvancedCodeBlock } from "@/components/ui/advanced-code-block";
import { componentsData } from "@/utilities/code-snippets";
import React from "react";

const Showcase = () => {
  return (
    <div>
      <AdvancedCodeBlock
        code={componentsData[1].code}
        preview={<ShowcaseSlider />}
        language="tsx"
        showLineNumbers
        title="Showcase Slider"
      />
    </div>
  );
};

export default Showcase;
