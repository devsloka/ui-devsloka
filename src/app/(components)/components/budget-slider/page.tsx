import fs from "fs";
import path from "path";
import React from "react";
import BudgetSlider from "@/components/devsloka-components/BudgetSlider";
import { AdvancedCodeBlock } from "@/components/ui/advanced-code-block";
import { getComponentCode } from "@/utilities/getComponentCode";

const BudgetSliderPage = () => {
  const BudgetSliderCode = getComponentCode(
    "src/components/devsloka-components/BudgetSlider.tsx"
  );
  return (
    <div>
      <AdvancedCodeBlock
        code={BudgetSliderCode}
        preview={<BudgetSlider />}
        language="tsx"
        showLineNumbers
        title="Budget Slider"
      />
    </div>
  );
};

export default BudgetSliderPage;
