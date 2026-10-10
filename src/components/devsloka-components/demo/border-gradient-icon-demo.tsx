import React from "react";
import { BorderGradientIcon } from "@/registry/ui/border-gradient-icon";
import { Code2, Figma, Layers, PenTool } from "lucide-react";

const skills = [
  { label: "Figma", icon: <Figma />, href: "https://www.figma.com" },
  { label: "Photoshop", icon: <Layers /> },
  { label: "Illustrator", icon: <PenTool /> },
  { label: "VS Code", icon: <Code2 /> },
];

const BorderGradientIconDemo: React.FC = () => {
  return (
    <div className="flex flex-wrap justify-center gap-4">
      {skills.map(({ label, icon, href }) =>
        href ? (
          <BorderGradientIcon key={label} label={label} icon={icon} asChild>
            <a href={href} target="_blank" rel="noreferrer" />
          </BorderGradientIcon>
        ) : (
          <BorderGradientIcon key={label} label={label} icon={icon} />
        )
      )}
    </div>
  );
};

export default BorderGradientIconDemo;
