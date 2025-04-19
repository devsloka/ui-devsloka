import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const cardDecoratorVariants = cva("", {
  variants: {
    variant: {
      default: "",
      dashed: "",
      //   gradient: "",
      dots: "",
      //   curved: "",
      glow: "",
      //   diagonal: "",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface CardDecoratorProps
  extends VariantProps<typeof cardDecoratorVariants> {
  className?: string;
}

export const CardDecorator = ({ variant, className }: CardDecoratorProps) => {
  switch (variant) {
    case "dashed":
      return <DashedDecorator className={className} />;
    // case "gradient":
    //   return <GradientDecorator className={className} />;
    case "dots":
      return <DotsDecorator className={className} />;
    // case "curved":
    //   return <CurvedDecorator className={className} />;
    case "glow":
      return <GlowDecorator className={className} />;
    // case "diagonal":
    //   return <DiagonalDecorator className={className} />;
    default:
      return <DefaultDecorator className={className} />;
  }
};

// Default L-shaped corners (original implementation)
const DefaultDecorator = ({ className }: { className?: string }) => (
  <div className={cn("pointer-events-none absolute inset-0", className)}>
    <span className="border-primary absolute -left-px -top-px block size-2 border-l-2 border-t-2"></span>
    <span className="border-primary absolute -right-px -top-px block size-2 border-r-2 border-t-2"></span>
    <span className="border-primary absolute -bottom-px -left-px block size-2 border-b-2 border-l-2"></span>
    <span className="border-primary absolute -bottom-px -right-px block size-2 border-b-2 border-r-2"></span>
  </div>
);

// Dashed border decorator
const DashedDecorator = ({ className }: { className?: string }) => (
  <div className={cn("pointer-events-none absolute inset-0", className)}>
    <div className="absolute inset-0 border-2 border-dashed border-primary/50 rounded-sm"></div>
    <span className="border-primary absolute -left-px -top-px block size-3 border-l-2 border-t-2 bg-background"></span>
    <span className="border-primary absolute -right-px -top-px block size-3 border-r-2 border-t-2 bg-background"></span>
    <span className="border-primary absolute -bottom-px -left-px block size-3 border-b-2 border-l-2 bg-background"></span>
    <span className="border-primary absolute -bottom-px -right-px block size-3 border-b-2 border-r-2 bg-background"></span>
  </div>
);

// Gradient border decorator
// const GradientDecorator = ({ className }: { className?: string }) => (
//   <div
//     className={cn(
//       "pointer-events-none absolute inset-0 overflow-hidden",
//       className
//     )}
//   >
//     <div className="absolute inset-0 rounded-sm p-[1px]"></div>
//     <span className="absolute -left-px -top-px block size-4 bg-gradient-to-br from-primary to-primary/0"></span>
//     <span className="absolute -right-px -top-px block size-4 bg-gradient-to-bl from-primary to-primary/0"></span>
//     <span className="absolute -bottom-px -left-px block size-4 bg-gradient-to-tr from-primary to-primary/0"></span>
//     <span className="absolute -bottom-px -right-px block size-4 bg-gradient-to-tl from-primary to-primary/0"></span>
//   </div>
// );

// Dots corner decorator
const DotsDecorator = ({ className }: { className?: string }) => (
  <div className={cn("pointer-events-none absolute inset-0", className)}>
    <div className="absolute -left-[3px] -top-[3px] flex flex-col gap-[3px]">
      <div className="flex gap-[3px]">
        <span className="block size-1.5 rounded-full bg-primary"></span>
        <span className="block size-1.5 rounded-full bg-primary"></span>
        <span className="block size-1.5 rounded-full bg-primary"></span>
      </div>
      <div className="flex gap-[3px]">
        <span className="block size-1.5 rounded-full bg-primary"></span>
        <span className="block size-1.5 rounded-full bg-primary/60"></span>
        <span className="block size-1.5 rounded-full bg-primary/30"></span>
      </div>
      <div className="flex gap-[3px]">
        <span className="block size-1.5 rounded-full bg-primary"></span>
        <span className="block size-1.5 rounded-full bg-primary/30"></span>
        <span className="block size-1.5 rounded-full bg-primary/0"></span>
      </div>
    </div>
    <div className="absolute -right-[3px] -top-[3px] flex flex-col gap-[3px]">
      <div className="flex gap-[3px]">
        <span className="block size-1.5 rounded-full bg-primary/30"></span>
        <span className="block size-1.5 rounded-full bg-primary/60"></span>
        <span className="block size-1.5 rounded-full bg-primary"></span>
      </div>
      <div className="flex gap-[3px]">
        <span className="block size-1.5 rounded-full bg-primary/0"></span>
        <span className="block size-1.5 rounded-full bg-primary/30"></span>
        <span className="block size-1.5 rounded-full bg-primary"></span>
      </div>
      <div className="flex gap-[3px]">
        <span className="block size-1.5 rounded-full bg-primary/0"></span>
        <span className="block size-1.5 rounded-full bg-primary/0"></span>
        <span className="block size-1.5 rounded-full bg-primary/0"></span>
      </div>
    </div>
    <div className="absolute -bottom-[3px] -left-[3px] flex flex-col gap-[3px]">
      <div className="flex gap-[3px]">
        <span className="block size-1.5 rounded-full bg-primary"></span>
        <span className="block size-1.5 rounded-full bg-primary/30"></span>
        <span className="block size-1.5 rounded-full bg-primary/0"></span>
      </div>
      <div className="flex gap-[3px]">
        <span className="block size-1.5 rounded-full bg-primary/60"></span>
        <span className="block size-1.5 rounded-full bg-primary/30"></span>
        <span className="block size-1.5 rounded-full bg-primary/0"></span>
      </div>
      <div className="flex gap-[3px]">
        <span className="block size-1.5 rounded-full bg-primary"></span>
        <span className="block size-1.5 rounded-full bg-primary"></span>
        <span className="block size-1.5 rounded-full bg-primary"></span>
      </div>
    </div>
    <div className="absolute -bottom-[3px] -right-[3px] flex flex-col gap-[3px]">
      <div className="flex gap-[3px]">
        <span className="block size-1.5 rounded-full bg-primary/0"></span>
        <span className="block size-1.5 rounded-full bg-primary/30"></span>
        <span className="block size-1.5 rounded-full bg-primary"></span>
      </div>
      <div className="flex gap-[3px]">
        <span className="block size-1.5 rounded-full bg-primary/0"></span>
        <span className="block size-1.5 rounded-full bg-primary/30"></span>
        <span className="block size-1.5 rounded-full bg-primary/60"></span>
      </div>
      <div className="flex gap-[3px]">
        <span className="block size-1.5 rounded-full bg-primary"></span>
        <span className="block size-1.5 rounded-full bg-primary"></span>
        <span className="block size-1.5 rounded-full bg-primary"></span>
      </div>
    </div>
  </div>
);

// Curved corner decorator
// const CurvedDecorator = ({ className }: { className?: string }) => (
//   <div className={cn("pointer-events-none absolute inset-0", className)}>
//     <svg className="absolute -left-[1px] -top-[1px] size-4 overflow-visible">
//       <path
//         d="M 0 8 C 0 3.5 3.5 0 8 0"
//         fill="none"
//         strokeWidth="2"
//         stroke="hsl(var(--primary))"
//         strokeLinecap="round"
//       />
//     </svg>
//     <svg className="absolute -right-[1px] -top-[1px] size-4 overflow-visible">
//       <path
//         d="M 8 0 C 4.5 0 0 3.5 0 8"
//         fill="none"
//         strokeWidth="2"
//         stroke="hsl(var(--primary))"
//         strokeLinecap="round"
//       />
//     </svg>
//     <svg className="absolute -bottom-[1px] -left-[1px] size-4 overflow-visible">
//       <path
//         d="M 0 0 C 0 4.5 3.5 8 8 8"
//         fill="none"
//         strokeWidth="2"
//         stroke="hsl(var(--primary))"
//         strokeLinecap="round"
//       />
//     </svg>
//     <svg className="absolute -bottom-[1px] -right-[1px] size-4 overflow-visible">
//       <path
//         d="M 0 8 C 4.5 8 8 4.5 8 0"
//         fill="none"
//         strokeWidth="2"
//         stroke="hsl(var(--primary))"
//         strokeLinecap="round"
//       />
//     </svg>
//   </div>
// );

// Glow decorator with animation
const GlowDecorator = ({ className }: { className?: string }) => (
  <div className={cn("pointer-events-none absolute inset-0", className)}>
    <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
      <div className="absolute -left-px -top-px size-4 bg-primary/20 blur-sm"></div>
      <div className="absolute -right-px -top-px size-4 bg-primary/20 blur-sm"></div>
      <div className="absolute -bottom-px -left-px size-4 bg-primary/20 blur-sm"></div>
      <div className="absolute -bottom-px -right-px size-4 bg-primary/20 blur-sm"></div>
    </div>
    <span className="border-primary absolute -left-px -top-px block size-3 border-l-2 border-t-2 transition-all duration-300 group-hover:size-4 group-hover:border-l-[3px] group-hover:border-t-[3px]"></span>
    <span className="border-primary absolute -right-px -top-px block size-3 border-r-2 border-t-2 transition-all duration-300 group-hover:size-4 group-hover:border-r-[3px] group-hover:border-t-[3px]"></span>
    <span className="border-primary absolute -bottom-px -left-px block size-3 border-b-2 border-l-2 transition-all duration-300 group-hover:size-4 group-hover:border-b-[3px] group-hover:border-l-[3px]"></span>
    <span className="border-primary absolute -bottom-px -right-px block size-3 border-b-2 border-r-2 transition-all duration-300 group-hover:size-4 group-hover:border-b-[3px] group-hover:border-r-[3px]"></span>
  </div>
);

// Diagonal corner decorator
// const DiagonalDecorator = ({ className }: { className?: string }) => (
//   <div className={cn("pointer-events-none absolute inset-0", className)}>
//     <div className="absolute -left-px -top-px">
//       <svg
//         width="16"
//         height="16"
//         viewBox="0 0 16 16"
//         fill="none"
//         xmlns="http://www.w3.org/2000/svg"
//       >
//         <path
//           d="M1 15L15 1"
//           stroke="hsl(var(--primary))"
//           strokeWidth="2"
//           strokeLinecap="round"
//         />
//         <path
//           d="M8 15L15 8"
//           stroke="hsl(var(--primary))"
//           strokeWidth="2"
//           strokeLinecap="round"
//         />
//         <path
//           d="M1 8L8 1"
//           stroke="hsl(var(--primary))"
//           strokeWidth="2"
//           strokeLinecap="round"
//         />
//       </svg>
//     </div>
//     <div className="absolute -right-px -top-px rotate-90">
//       <svg
//         width="16"
//         height="16"
//         viewBox="0 0 16 16"
//         fill="none"
//         xmlns="http://www.w3.org/2000/svg"
//       >
//         <path
//           d="M1 15L15 1"
//           stroke="hsl(var(--primary))"
//           strokeWidth="2"
//           strokeLinecap="round"
//         />
//         <path
//           d="M8 15L15 8"
//           stroke="hsl(var(--primary))"
//           strokeWidth="2"
//           strokeLinecap="round"
//         />
//         <path
//           d="M1 8L8 1"
//           stroke="hsl(var(--primary))"
//           strokeWidth="2"
//           strokeLinecap="round"
//         />
//       </svg>
//     </div>
//     <div className="absolute -bottom-px -left-px rotate-270">
//       <svg
//         width="16"
//         height="16"
//         viewBox="0 0 16 16"
//         fill="none"
//         xmlns="http://www.w3.org/2000/svg"
//       >
//         <path
//           d="M1 15L15 1"
//           stroke="hsl(var(--primary))"
//           strokeWidth="2"
//           strokeLinecap="round"
//         />
//         <path
//           d="M8 15L15 8"
//           stroke="hsl(var(--primary))"
//           strokeWidth="2"
//           strokeLinecap="round"
//         />
//         <path
//           d="M1 8L8 1"
//           stroke="hsl(var(--primary))"
//           strokeWidth="2"
//           strokeLinecap="round"
//         />
//       </svg>
//     </div>
//     <div className="absolute -bottom-px -right-px rotate-180">
//       <svg
//         width="16"
//         height="16"
//         viewBox="0 0 16 16"
//         fill="none"
//         xmlns="http://www.w3.org/2000/svg"
//       >
//         <path
//           d="M1 15L15 1"
//           stroke="hsl(var(--primary))"
//           strokeWidth="2"
//           strokeLinecap="round"
//         />
//         <path
//           d="M8 15L15 8"
//           stroke="hsl(var(--primary))"
//           strokeWidth="2"
//           strokeLinecap="round"
//         />
//         <path
//           d="M1 8L8 1"
//           stroke="hsl(var(--primary))"
//           strokeWidth="2"
//           strokeLinecap="round"
//         />
//       </svg>
//     </div>
//   </div>
// );
