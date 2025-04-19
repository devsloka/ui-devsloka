import React from "react";
import Link from "next/link";

export interface ComponentCardProps {
  title: string;
  href: string;
  description: string;
  image: string;
}
export function ComponentCard(component: ComponentCardProps) {
  return (
    <Link
      href={component.href}
      className="group relative block h-[400px] overflow-hidden rounded-2xl transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_80px_-20px_rgba(0,0,0,0.3)] border border-dashed"
    >
      <div className="absolute inset-0 z-0 bg-background">
        <img
          src={component.image}
          alt={component.title}
          className="h-full w-full object-contain transition-transform duration-700 group-hover:scale-110 bg-black"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20 opacity-0 transition-all duration-500 group-hover:opacity-100" />
      </div>

      <div className="absolute bottom-0 left-0 right-0 translate-y-[calc(100%-80px)] p-6 transition-all duration-500 group-hover:translate-y-0">
        <div className="relative z-10">
          <h3 className="mb-4 text-2xl font-bold text-white opacity-90 transition-all duration-500 group-hover:opacity-100">
            {component.title}
          </h3>
          <p className="transform text-sm leading-relaxed text-gray-300 opacity-0 transition-all duration-500 delay-100 group-hover:opacity-100">
            {component.description}
          </p>
          <div className="mt-6 inline-block rounded-lg bg-white/10 px-4 py-2 text-sm text-white backdrop-blur-sm transition-all duration-500 group-hover:bg-white/20">
            View Component →
          </div>
        </div>
      </div>
    </Link>
  );
}
