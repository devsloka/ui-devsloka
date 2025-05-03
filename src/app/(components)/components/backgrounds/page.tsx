import AnimatedBackgroundsShowcase from "@/components/root/AnimatedBackgroundsShowcase";
import { generateSEO } from "@/config/seo/seo.utils";
import { Metadata } from "next";

export function generateMetadata(): Metadata {
  return generateSEO({
    title: "Animated Backgrounds Showcase",
    description:
      "Interactive demo of all DevsLoka's animated background components",
    path: "backgrounds",
    image: "images/backgrounds-og.png",
    keywords: [
      "animated backgrounds",
      "UI showcase",
      "web animations",
      "React effects demo",
      "Next.js animations",
    ],
  });
}

export default function ShowcasePage() {
  return <AnimatedBackgroundsShowcase />;
}
