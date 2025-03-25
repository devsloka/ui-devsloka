import fs from "fs";
import path from "path";
import React from "react";
import BudgetSlider from "@/components/devsloka-components/BudgetSlider";
import { AdvancedCodeBlock } from "@/components/ui/advanced-code-block";

const BudgetSliderPage = () => {
  const componentPath = path.resolve(
    "src/components/devsloka-components/BudgetSlider.tsx"
  );
  const BudgetSliderCode = fs.readFileSync(componentPath, "utf-8");

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
