import React from "react";
import { Button } from "../ui/button";
import { CardDecorator } from "../devsloka-components/card-decorator";
import { cn } from "@/lib/utils";

const CTASection: React.FC = () => {
  return (
    <div className="w-full flex justify-center items-center bg-background border rounded-sm p-6 my-24">
      <div
        className={cn(
          "relative shadow-zinc-950/5 flex flex-col justify-center items-center p-6 bg-gradient-to-br from-blue-600 to-blue-900 w-full "
        )}
      >
        <CardDecorator variant={"default"} />
        <h1 className="text-3xl md:text-4xl text-white font-bold mb-4 text-center">
          Got an idea you&apos;re excited about?
        </h1>
        <p className="text-lg text-gray-200 max-w-xl text-center">
          Let&apos;s bring your dream website to life — reach out to us and
          let&apos;s make it happen!
        </p>
        <Button className="mt-6 bg-white text-black hover:bg-gray-100 transition-colors">
          Contact Us
        </Button>
      </div>
    </div>
  );
};

export default CTASection;
