import React from "react";
import fs from "fs";
import path from "path";
import { ExpandingCards } from "@/components/devsloka-components/ExpandingCards";
import { AdvancedCodeBlock } from "@/components/ui/advanced-code-block";

const ExpandingCardsPage = () => {
  const componentPath = path.resolve(
    "src/components/devsloka-components/ExpandingCards.tsx"
  );
  const ExpandingCardsCode = fs.readFileSync(componentPath, "utf-8");
  return (
    <div>
      <AdvancedCodeBlock
        code={ExpandingCardsCode}
        preview={<ExpandingCards />}
        language="tsx"
        showLineNumbers
        title="Expanding Cards"
      />
    </div>
  );
};

export default ExpandingCardsPage;
