import { FloatingDots } from "@/registry/ui/floating-dots";

const FloatingDotsDemo = () => {
  return (
    <div className="grid w-full gap-6 md:grid-cols-2">
      {/* Dots inherit the text color by default. */}
      <div className="relative h-72 overflow-hidden rounded-xl bg-primary text-primary-foreground/70">
        <FloatingDots maxRadius={1.5} />
      </div>

      <div className="relative h-72 overflow-hidden rounded-xl border bg-muted text-muted-foreground">
        <FloatingDots count={90} minRadius={1} maxRadius={3} minSpeed={0.3} maxSpeed={1.2} />
        <div className="relative flex h-full flex-col items-center justify-center gap-1 text-center">
          <h3 className="text-2xl font-semibold tracking-tight text-foreground">Ship with calm</h3>
          <p className="text-sm">A quiet, ambient background for hero sections.</p>
        </div>
      </div>
    </div>
  );
};

export default FloatingDotsDemo;
