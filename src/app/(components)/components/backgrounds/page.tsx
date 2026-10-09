import Link from "next/link";
import { Metadata } from "next";
import { generateSEO } from "@/config/seo/seo.utils";
import { MountWhenVisible } from "@/components/root/mount-when-visible";
import { backgrounds } from "@/utilities/backgrounds.utils";
import { cn } from "@/lib/utils";

export function generateMetadata(): Metadata {
  return generateSEO({
    title: "Animated Backgrounds - Devsloka UI",
    description:
      "Animated canvas and CSS backgrounds for React. Drop a layer behind any section; it follows your theme and pauses off screen.",
    path: "components/backgrounds",
    image: "images/backgrounds-og.png",
    keywords: [
      "animated backgrounds",
      "react backgrounds",
      "canvas background",
      "hero background",
    ],
  });
}

export default function BackgroundsPage() {
  return (
    <div className="mb-20">
      <header className="mb-10 max-w-2xl space-y-3">
        <h1 className="text-4xl font-semibold tracking-tight">Backgrounds</h1>
        <p className="text-lg text-muted-foreground">
          Animated layers you drop behind any section. Put one inside a
          relatively positioned container and place your content on top.
        </p>
      </header>

      <ul className="grid gap-6 sm:grid-cols-2">
        {Object.entries(backgrounds).map(([slug, background]) => {
          const Background = background.component;
          return (
            <li key={slug}>
              <Link
                href={`/components/backgrounds/${slug}`}
                className="group block overflow-hidden border transition-colors hover:border-foreground/30"
              >
                <MountWhenVisible className="aspect-video overflow-hidden bg-muted">
                  <Background />
                  <span
                    className={cn(
                      "absolute inset-0 flex items-center justify-center text-lg font-semibold",
                      background.tone === "dark" ? "text-white" : "text-foreground"
                    )}
                  >
                    {background.title}
                  </span>
                </MountWhenVisible>
                <p className="border-t px-4 py-3 text-sm text-muted-foreground group-hover:text-foreground">
                  {background.description}
                </p>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
