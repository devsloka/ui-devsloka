import Image from "next/image";
import Link from "next/link";
import { ArcScrollSteps } from "@/registry/ui/arc-scroll-steps";

const steps = [
  { title: "Discover", description: "Browse 90+ animated components, blocks and backgrounds." },
  { title: "Install", description: "One shadcn command. The source lands in your project." },
  { title: "Customize", description: "Plain Tailwind and props, so it bends to your design system." },
  { title: "Interaction", description: "Motion that answers every click, key press and gesture." },
  { title: "Accessible", description: "Keyboard, screen reader and reduced-motion support built in." },
  { title: "Ship", description: "Copy it, own it, deploy it. No runtime lock-in." },
];

export default function ArcScrollStepsDemo() {
  return (
    <ArcScrollSteps
      className="max-w-4xl"
      label="How Devsloka UI works"
      steps={steps}
      header={
        <div className="flex items-center gap-2 text-sm font-semibold tracking-[0.2em]">
          <span className="flex size-6 items-center justify-center rounded-md bg-[linear-gradient(#2A2A2A,#0B0B0B)]">
            <Image src="/favicon-dark.png" alt="" width={14} height={14} />
          </span>
          DEVSLOKA
        </div>
      }
      footer={
        <div className="flex items-end justify-between gap-4 text-xs text-muted-foreground">
          <p>
            Made by{" "}
            <a href="https://www.devsloka.in" className="text-foreground underline-offset-4 hover:underline">
              devsloka.in
            </a>
          </p>
          <Link
            href="/components"
            className="rounded-full bg-[#0A6EFF] px-4 py-2 text-xs font-medium text-white transition-[filter,transform] duration-150 hover:brightness-110 active:scale-[0.97]"
          >
            Get started
          </Link>
        </div>
      }
    />
  );
}
