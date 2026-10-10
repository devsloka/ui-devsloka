import { AnimatedSmartwatch } from "@/registry/ui/animated-smartwatch";

export default function AnimatedSmartwatchDemo() {
  return (
    <div className="w-full bg-background text-foreground">
      <div className="mx-auto max-w-xl px-4 py-16 text-center">
        <h2 className="text-2xl font-semibold tracking-tight">Always on time</h2>
        <p className="mt-2 text-muted-foreground">
          Scroll down. The watch settles into place and shows the current time in your locale.
        </p>
      </div>

      <AnimatedSmartwatch color="midnight" size={200} />

      <div className="mx-auto max-w-xl px-4 py-16 text-center">
        <p className="text-muted-foreground">
          Pass any content as children to replace the built-in clock face.
        </p>
      </div>
    </div>
  );
}
