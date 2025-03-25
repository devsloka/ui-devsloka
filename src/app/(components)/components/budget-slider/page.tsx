import BudgetSlider from "@/components/devsloka-components/BudgetSlider";
import { AdvancedCodeBlock } from "@/components/ui/advanced-code-block";
import { componentsData } from "@/utilities/code-snippets";
import React from "react";

const BudgetSliderPage = () => {
  return (
    <div>
      <AdvancedCodeBlock
        code={componentsData[0].code}
        preview={<BudgetSlider />}
        language="tsx"
        showLineNumbers
        title="Budget Slider"
      />
    </div>
  );
};

export default BudgetSliderPage;
