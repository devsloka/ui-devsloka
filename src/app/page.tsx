import CopyPasteSection from "@/components/home/CopyPasteSection";
import CTASection from "@/components/home/CTASection";
import HeroSection from "@/components/home/HeroSection";
import TestimonialSection from "@/components/home/TestimonialSection";

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
    <div className="mt-12">
      <HeroSection />
      <CopyPasteSection />
      <TestimonialSection />
      <CTASection />
    </div>
  );
}
