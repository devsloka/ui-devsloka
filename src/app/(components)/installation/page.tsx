import React from "react";
import { InstallationSteps } from "@/components/installation/installation-steps";
import { generateSEO } from "@/config/seo/seo.utils";
import { Metadata } from "next";
export const metadata: Metadata = generateSEO({
  title: "Install Devsloka UI",
  description:
    "Quickstart guide for installing Devsloka UI—our animated, minimalist React & Next.js component library built with Tailwind CSS, Shadcn UI & Framer Motion.",
  path: "/installation",
  image: "/images/installation-og.png",
  keywords: [
    "devsloka ui installation",
    "install devsloka ui",
    "react component library install",
    "tailwind css installation",
  ],
});
const InstallationPage = () => {
  return (
    <div className="mb-10 space-y-2">
      <div className="mb-10 space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">Installation</h1>
        <p className="text-muted-foreground text-lg">
          How to install dependencies and structure your app.
        </p>
      </div>
      <div className="mb-20">
        <InstallationSteps />
      </div>
    </div>
  );
};

export default InstallationPage;
