import React from "react";
import { ComponentCard } from "@/components/root/component-card";
import { Metadata } from "next";
import { components as libComponents } from "@/lib/components";
import { generateSEO } from "@/config/seo/seo.utils";

export function generateMetadata(): Metadata {
  return generateSEO({
    title: "All Components - DevsLoka UI Collection",
    description:
      "Explore our collection of premium React components for Next.js, Remix, and modern web applications",
    path: "components",
    image: "images/components-og.jpg",
    keywords: [
      "React components",
      "Next.js UI kit",
      "Remix components",
      "UI collection",
      "web development components",
    ],
  });
}

const Components: React.FC = () => {
  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="my-16 grid gap-8 grid-cols-1 md:grid-cols-2">
          {libComponents.map((component) => (
            <ComponentCard key={component.href} {...component} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Components;
