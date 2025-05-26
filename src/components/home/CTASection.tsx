import React from "react";
import { Button } from "@/components/ui/button";
import { CardDecorator } from "@/components/ui/card-decorator";
import { cn } from "@/lib/utils";
import Link from "next/link";

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
        <Link href="https://www.devsloka.in/contact-us" target="_blank">
          <Button className="mt-4">Contact Us</Button>
        </Link>
      </div>
    </div>
  );
};

export default CTASection;
