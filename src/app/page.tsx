import CopyPasteSection from "@/components/home/CopyPasteSection";
import CTASection from "@/components/home/CTASection";
import HeroSection from "@/components/home/HeroSection";
import TestimonialSection from "@/components/home/TestimonialSection";

import { defaultSEO } from "@/config/seo/seo.config";
import { generateSEO } from "@/config/seo/seo.utils";

export const metadata = generateSEO({
  title:
    "Devsloka UI | Premium Components , Blocks and Templates For React.js , Next.js , Remix.js and React-Router-Dom v7.0.0",
  description:
    defaultSEO.description ??
    "Premium Components , Blocks and Templates For React.js , Next.js , Remix.js and React-Router-Dom v7.0.0",
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
