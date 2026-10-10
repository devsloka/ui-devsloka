import Image from "next/image";
import { AnimatedMacBook } from "@/registry/ui/laptop-closes-on-scroll";

export default function AnimatedLaptopDemo() {
  return (
    <div className="w-full bg-background text-foreground">
      <div className="mx-auto max-w-xl px-4 py-16 text-center">
        <h2 className="text-2xl font-semibold tracking-tight">Your metrics, at a glance</h2>
        <p className="mt-2 text-muted-foreground">Keep scrolling to close the lid.</p>
      </div>

      <AnimatedMacBook color="space">
        <Image
          src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80"
          alt="Analytics dashboard with line and bar charts of weekly traffic"
          fill
          sizes="(min-width: 1024px) 800px, 90vw"
          className="object-cover"
        />
      </AnimatedMacBook>

      <div className="mx-auto max-w-xl px-4 py-16 text-center">
        <p className="text-muted-foreground">Pass any image or live UI as children.</p>
      </div>
    </div>
  );
}
