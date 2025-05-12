import React from "react";
import { BorderGradientIcon } from "@/components/ui/border-gradient-icon";
import { FigmaIcon, Layers } from "lucide-react";
const skillsData = [
  {
    title: "Figma",
    icon: <FigmaIcon className="h-8 w-8" />,
  },
  {
    title: "Photoshop",
    icon: <Layers className="h-8 w-8" />,
  },
  // ... other skills
];

const BorderGradientIconDemo: React.FC = () => {
  return (
    <div className="flex flex-wrap gap-4">
      {skillsData.map((skill) => (
        <BorderGradientIcon key={skill.title} {...skill} />
      ))}
    </div>
  );
};

export default BorderGradientIconDemo;
