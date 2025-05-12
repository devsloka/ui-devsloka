import React from "react";
import GradientText from "@/components/ui/gradient-text";

const GradientTextDemo = () => {
  return (
    <>
      <GradientText
        className="text-xl lg:text-4xl font-bold text-center"
        animationDuration={2}
      >
        Welcome to Devsloka Ui
      </GradientText>
    </>
  );
};

export default GradientTextDemo;
