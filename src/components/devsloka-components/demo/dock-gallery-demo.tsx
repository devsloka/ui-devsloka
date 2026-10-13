import Image from "next/image";
import Link from "next/link";
import { DockGallery, type DockGalleryItem } from "@/registry/ui/dock-gallery";

const photo = (id: string) => `https://images.unsplash.com/${id}?q=80&w=500&auto=format&fit=crop`;

// The same fictional team as the Team Carousel demo.
const items: DockGalleryItem[] = [
  { title: "Aarav Mehta", image: { src: photo("photo-1500648767791-00dcc994a43e"), alt: "Portrait of Aarav Mehta" } },
  { title: "Ira Kapoor", image: { src: photo("photo-1494790108377-be9c29b29330"), alt: "Portrait of Ira Kapoor" } },
  { title: "Kabir Rao", image: { src: photo("photo-1507003211169-0a1dd7228f2d"), alt: "Portrait of Kabir Rao" } },
  { title: "Meera Iyer", image: { src: photo("photo-1438761681033-6461ffad8d80"), alt: "Portrait of Meera Iyer" } },
  { title: "Ananya Das", image: { src: photo("photo-1534528741775-53994a69daeb"), alt: "Portrait of Ananya Das" } },
  { title: "Rohan Shah", image: { src: photo("photo-1506794778202-cad84cf45f1d"), alt: "Portrait of Rohan Shah" } },
  { title: "Sara Thomas", image: { src: photo("photo-1544005313-94ddf0286df2"), alt: "Portrait of Sara Thomas" } },
];

export default function DockGalleryDemo() {
  return (
    <DockGallery
      className="min-h-[34rem] max-w-5xl"
      items={items}
      header={
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-[1fr_1.4fr_auto]">
          <p className="flex items-start gap-2 text-2xl font-medium tracking-tight">
            <span className="mt-1 flex size-6 shrink-0 items-center justify-center rounded-md bg-[linear-gradient(#2A2A2A,#0B0B0B)]">
              <Image src="/favicon-dark.png" alt="" width={14} height={14} />
            </span>
            Devsloka<sup className="text-xs">®</sup>
          </p>
          <div className="max-w-sm text-xs leading-relaxed text-neutral-600">
            <p className="font-medium text-neutral-900">Interfaces that move</p>
            Animated React components you copy into your project and own. Hover the row to
            bring any of them forward.
          </div>
          <nav aria-label="Demo" className="flex flex-col items-end gap-0.5 font-mono text-[0.625rem] tracking-wider uppercase">
            <Link href="/components" className="text-neutral-900">Components +</Link>
            <Link href="/blocks" className="text-neutral-500 hover:text-neutral-900">Blocks</Link>
            <a href="https://github.com/devsloka/ui-devsloka" className="text-neutral-500 hover:text-neutral-900">GitHub</a>
            <a href="https://www.devsloka.in/contact" className="text-neutral-500 hover:text-neutral-900">Contact</a>
          </nav>
        </div>
      }
    />
  );
}
