import { Metadata } from "next";
import { InstallationSteps } from "@/components/installation/installation-steps";
import { generateSEO } from "@/config/seo/seo.utils";

export const metadata: Metadata = generateSEO({
  title: "Installation - Devsloka UI",
  description:
    "Add Devsloka UI components to any React 19 + Tailwind CSS v4 project with the shadcn CLI, or copy the source manually.",
  path: "installation",
  image: "/images/installation-og.png",
  keywords: [
    "devsloka ui installation",
    "shadcn registry",
    "react components install",
    "tailwind css v4",
  ],
});

export default function InstallationPage() {
  return (
    <div className="mb-20 max-w-3xl">
      <header className="mb-12 space-y-3">
        <h1 className="text-4xl font-semibold tracking-tight">Installation</h1>
        <p className="text-lg text-muted-foreground">
          Add components with the shadcn CLI, or copy the source by hand. Either
          way, the code ends up in your project.
        </p>
      </header>
      <InstallationSteps />
    </div>
  );
}
