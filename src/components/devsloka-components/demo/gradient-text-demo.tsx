import { GradientText } from "@/registry/ui/gradient-text";

const GradientTextDemo = () => {
  return (
    <div className="flex flex-col items-center gap-6 text-center">
      <GradientText as="h2" className="text-4xl font-bold tracking-tight lg:text-6xl">
        Build interfaces faster
      </GradientText>

      <p className="max-w-md text-lg text-muted-foreground">
        Accent a single phrase with{" "}
        <GradientText
          colors={["var(--chart-1)", "var(--chart-2)", "var(--chart-4)"]}
          speed={4}
          className="font-semibold"
        >
          custom colors
        </GradientText>{" "}
        or keep it{" "}
        <GradientText animate={false} className="font-semibold">
          perfectly still
        </GradientText>
        .
      </p>
    </div>
  );
};

export default GradientTextDemo;
