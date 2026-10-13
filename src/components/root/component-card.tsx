import Image from "next/image";
import Link from "next/link";
import { isNewItem } from "@/lib/new-items";
import { NewBadge } from "./new-badge";

export type ComponentCardProps = {
  title: string;
  href: string;
  description: string;
  image: string;
};

export function ComponentCard({ title, href, description, image }: ComponentCardProps) {
  return (
    <Link
      href={href}
      className="group flex h-full flex-col overflow-hidden border bg-card transition-colors hover:border-foreground/30 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
    >
      {/* Previews are captured in dark mode, so the frame matches their background
          and object-contain shows wide and tall previews whole. */}
      <div className="relative aspect-[16/10] overflow-hidden border-b bg-neutral-950">
        <Image
          src={image}
          alt={`${title} preview`}
          fill
          sizes="(min-width: 1280px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-contain transition-transform duration-500 group-hover:scale-[1.02]"
        />
        {isNewItem(href) && <NewBadge className="absolute top-3 left-3" />}
      </div>
      <div className="flex flex-1 flex-col gap-1.5 p-4">
        <h2 className="flex items-center justify-between gap-2 font-medium">
          {title}
          <span
            aria-hidden
            className="text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-foreground"
          >
            →
          </span>
        </h2>
        <p className="line-clamp-2 text-sm text-muted-foreground">{description}</p>
      </div>
    </Link>
  );
}
