import React from "react";
import { ComponentCard } from "@/components/root/component-card";
import { components } from "@/lib/components";

const Components: React.FC = () => {
  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="my-16 grid gap-8 grid-cols-1 md:grid-cols-2">
          {components.map((component) => (
            <ComponentCard key={component.href} {...component} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Components;
