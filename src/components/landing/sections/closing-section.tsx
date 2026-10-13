import Link from "next/link";

export function ClosingSection() {
  return (
    <section className="mt-40 mb-32 border-t border-border pt-10">
      <div className="flex flex-col items-center gap-8 text-center">
        <p className="max-w-2xl text-4xl font-medium leading-[1] tracking-[-0.04em] text-balance md:text-6xl">
          Build something that moves.
        </p>
        <div className="flex justify-center gap-8">
          <Link
            href="/installation"
            className="text-lg font-medium underline decoration-1 underline-offset-[6px] transition-colors hover:text-[#0A6EFF]"
          >
            Get started →
          </Link>
          <Link
            href="/docs"
            className="text-lg text-muted-foreground underline decoration-1 underline-offset-[6px] transition-colors hover:text-foreground"
          >
            Docs
          </Link>
        </div>
      </div>
    </section>
  );
}
