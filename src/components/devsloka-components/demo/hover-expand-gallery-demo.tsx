import { HoverExpandGallery, type HoverExpandItem } from "@/registry/ui/hover-expand-gallery";

const photo = (id: string) => `https://images.unsplash.com/${id}?q=80&w=800&auto=format&fit=crop`;

const styles: HoverExpandItem[] = [
  { label: "Black & White", image: { src: photo("photo-1500648767791-00dcc994a43e") }, imageClassName: "grayscale contrast-125" },
  { label: "Ink Bloom", image: { src: photo("photo-1541701494587-cb58502866ab") } },
  { label: "Portrait", image: { src: photo("photo-1494790108377-be9c29b29330") } },
  { label: "Fluid", image: { src: photo("photo-1550684848-fac1c5b4e853") } },
  { label: "Editorial", image: { src: photo("photo-1534528741775-53994a69daeb") } },
  { label: "3D Render", image: { src: photo("photo-1620641788421-7a1c342ea42e") } },
  { label: "Studio", image: { src: photo("photo-1507003211169-0a1dd7228f2d") }, imageClassName: "sepia-[.35]" },
  { label: "Gradient", image: { src: photo("photo-1618005182384-a83a8bd57fbe") } },
  { label: "Natural Light", image: { src: photo("photo-1438761681033-6461ffad8d80") } },
  { label: "Blueprint", image: { src: photo("photo-1604076913837-52ab5629fba9") }, imageClassName: "hue-rotate-180 saturate-150" },
];

export default function HoverExpandGalleryDemo() {
  return <HoverExpandGallery items={styles} className="max-w-4xl" />;
}
