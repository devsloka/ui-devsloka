import { ExpandingCards } from "@/components/devsloka-components/ExpandingCards";
import { AdvancedCodeBlock } from "@/components/ui/advanced-code-block";
import React from "react";

const ExpandingCardsPage = () => {
  return (
    <div>
      <AdvancedCodeBlock
        code={`asd`}
        preview={<ExpandingCards />}
        language="tsx"
        showLineNumbers
        title="Expanding Cards"
      />
    </div>
  );
};

export default ExpandingCardsPage;
