import { BlocksSection } from "@/components/landing/sections/blocks-section";
import { ClosingSection } from "@/components/landing/sections/closing-section";
import { EditionsSection } from "@/components/landing/sections/editions-section";
import { HeroSection } from "@/components/landing/sections/hero-section";
import { IndexSection } from "@/components/landing/sections/index-section";
import { InstallSection } from "@/components/landing/sections/install-section";
import { PlaygroundSection } from "@/components/landing/sections/playground-section";
import { WorkflowSection } from "@/components/landing/sections/workflow-section";
import { defaultSEO } from "@/config/seo/seo.config";
import { generateSEO } from "@/config/seo/seo.utils";

export const metadata = generateSEO({
  title: "Devsloka UI | Animated React & Next.js Components",
  description:
    defaultSEO.description ??
    "Devsloka UI offers a curated collection of animated, minimalist React & Next.js components, blocks, and templates—powered by Tailwind CSS, Shadcn UI & Framer Motion.",
  image: "/og-home.png",
});

export default function Home() {
  return (
    <>
      <HeroSection />
      <InstallSection />
      <IndexSection />
      <PlaygroundSection />
      <BlocksSection />
      <WorkflowSection />
      <EditionsSection />
      <ClosingSection />
    </>
  );
}
