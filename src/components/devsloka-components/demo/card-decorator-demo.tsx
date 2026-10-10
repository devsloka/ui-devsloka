import React from "react";
import { CardDecorator, type CardDecoratorVariant } from "@/registry/ui/card-decorator";

const variants: CardDecoratorVariant[] = ["brackets", "dashed", "dots", "glow"];

const CardDecoratorDemo: React.FC = () => {
  return (
    <div className="grid w-full max-w-xl grid-cols-1 gap-6 sm:grid-cols-2">
      {variants.map((variant) => (
        <div key={variant} className="relative border bg-card p-6 text-card-foreground">
          <CardDecorator variant={variant} />
          <h3 className="font-medium capitalize">{variant}</h3>
          <p className="text-sm text-muted-foreground">Decorative corner accents.</p>
        </div>
      ))}
    </div>
  );
};

export default CardDecoratorDemo;
