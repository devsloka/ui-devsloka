import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { generateSEO } from "@/config/seo/seo.utils";
export const metadata: Metadata = generateSEO({
  title: "Introduction – DevSloka UI",
  description:
    "Welcome to Devsloka UI – your go-to source for animated, minimalist React/Next.js components, blocks, and templates built with Tailwind CSS, Shadcn UI & Framer Motion.",
  path: "/introduction",
  image: "/images/intro-og.png",
  keywords: [
    "devsloka ui introduction",
    "react ui components",
    "nextjs templates",
    "animated react components",
    "minimalist ui library",
  ],
});
const DocsPage = () => {
  return (
    <div className="mx-auto w-full mb-10">
      {/* Intro */}
      <div className="space-y-2">
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">
          Welcome to DevSloka UI
        </h1>
        <p className="text-lg text-muted-foreground">
          A curated collection of animated, minimalist components, blocks, and
          templates—perfectly tuned for React.js, Next.js, React Router, Remix,
          Tailwind CSS, Shadcn UI, and Framer Motion. Open-source,
          production-ready, and infinitely customizable.
        </p>
      </div>

      {/* Why DevSloka UI */}
      <div className="mt-12 space-y-6">
        <h2 className="font-bold text-2xl">
          More Than a Library—It’s Your Component Framework
        </h2>
        <p>
          Install via NPM or Yarn, pick the blocks you need, and drop them into
          your project. Every piece is ergonomically designed for seamless
          customization, so you never fight against defaults or override deep
          CSS.
        </p>
        <p>
          Whether you need a hero banner with smooth scroll animations, a
          data-driven table, or an interactive modal sequence, DevSloka UI gives
          you the code you can own and evolve.
        </p>

        <p>Under the hood, everything shares:</p>
        <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
          <li>
            <strong>Framework Agnostic:</strong> Works out-of-the-box with
            React, Next.js, Remix, and React Router.
          </li>
          <li>
            <strong>Tailwind CSS & Shadcn UI:</strong> Built with utility
            classes plus shadcn’s design primitives for rapid theming.
          </li>
          <li>
            <strong>Framer Motion Ready:</strong> Animate any prop with minimal
            boilerplate.
          </li>
          <li>
            <strong>Open Code:</strong> Full source for each component—tweak,
            extend, or fork to match your brand.
          </li>
          <li>
            <strong>Minimalist Defaults:</strong> Clean, responsive styles that
            look great without artifice.
          </li>
        </ul>

        {/* Sections */}
        <h3 className="font-bold text-xl mt-8">Custom Animated Blocks</h3>
        <p>
          Prebuilt, composable blocks—from accordions and carousels to
          interactive forms—that ship with Framer Motion hooks and variants
          already wired up.
        </p>

        <h3 className="font-bold text-xl mt-8">Minimalist Templates</h3>
        <p>
          Starter layouts and pages (landing, dashboard, blog, docs) that you
          can clone and adapt. All templates follow mobile-first, accessible
          design principles.
        </p>

        {/* <h3 className="font-bold text-xl mt-8">AI-Friendly Architecture</h3>
        <p>
          Each component’s code is open and annotated, so LLMs can understand
          your patterns, suggest improvements, or scaffold new components for
          you.
        </p> */}

        <h3 className="font-bold text-xl mt-8">Get Started</h3>
        <p className="text-md mt-8">
          click the this link to installation guide{" "}
          <Link className="underline" href="/installation">
            Installation
          </Link>
        </p>

        <p className="text-center text-sm text-muted-foreground">
          Dive into the docs and start building faster, with less boilerplate
          and more joy.
        </p>
      </div>
    </div>
  );
};

export default DocsPage;
