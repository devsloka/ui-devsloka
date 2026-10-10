import { BlocksSection } from "@/components/landing/sections/blocks-section";
import { ClosingSection } from "@/components/landing/sections/closing-section";
import { EditionsSection } from "@/components/landing/sections/editions-section";
import { HeroSection } from "@/components/landing/sections/hero-section";
import { IndexSection } from "@/components/landing/sections/index-section";
import { InstallSection } from "@/components/landing/sections/install-section";
import { PlaygroundSection } from "@/components/landing/sections/playground-section";
import { WorkflowSection } from "@/components/landing/sections/workflow-section";
import { LibraryJsonLd } from "@/components/seo/json-ld";
import { generateSEO } from "@/config/seo/seo.utils";

export const metadata = generateSEO();

export default function Home() {
  return (
    <>
      <LibraryJsonLd />
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
