import Image from "next/image";
import { CaseStudyCarousel, type CaseStudy } from "@/registry/ui/case-study-carousel";

function Brand({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 tracking-[0.2em] uppercase">
      <span className="flex size-6 items-center justify-center rounded-md bg-[linear-gradient(#2A2A2A,#0B0B0B)]">
        <Image src="/favicon-dark.png" alt="" width={14} height={14} />
      </span>
      {children}
    </span>
  );
}

// Devsloka components as the "case studies", using their real preview images.
const items: CaseStudy[] = [
  {
    brand: <Brand>Devsloka UI</Brand>,
    title: "Receipt Printer for Order Flows",
    description: "A torn-edge receipt that prints line by line, totals itself and tears off to reset.",
    href: "/components/receipt-printer",
    image: { src: "/images/receipt-printer.png", alt: "Receipt Printer component preview" },
    stats: [
      { value: "1", label: "File to copy" },
      { value: "100%", label: "Typed" },
      { value: "₹", label: "Any currency" },
    ],
  },
  {
    brand: <Brand>Devsloka UI</Brand>,
    title: "Now Playing Card with Vinyl Morph",
    description: "Album art spins as a disc and opens into the full cover on hover, tap or keyboard.",
    href: "/components/now-playing-card",
    image: { src: "/images/now-playing-card.png", alt: "Now Playing Card component preview" },
    stats: [
      { value: "1", label: "File to copy" },
      { value: "0", label: "Frame re-renders" },
      { value: "A11y", label: "Keyboard ready" },
    ],
  },
  {
    brand: <Brand>Devsloka UI</Brand>,
    title: "Dock Gallery for Project Showcases",
    description: "A dock-style row where the card nearest the pointer grows and its neighbours step down.",
    href: "/components/dock-gallery",
    image: { src: "/images/dock-gallery.png", alt: "Dock Gallery component preview" },
    stats: [
      { value: "1", label: "File to copy" },
      { value: "100%", label: "Typed" },
      { value: "SSR", label: "No layout flash" },
    ],
  },
  {
    brand: <Brand>Devsloka UI</Brand>,
    title: "Team Carousel That Pauses on Hover",
    description: "An infinite Embla strip of portraits that lifts the hovered member and highlights their team.",
    href: "/components/team-carousel",
    image: { src: "/images/team-carousel.png", alt: "Team Carousel component preview" },
    stats: [
      { value: "1", label: "File to copy" },
      { value: "∞", label: "Seamless loop" },
      { value: "A11y", label: "Pausable" },
    ],
  },
  {
    brand: <Brand>Devsloka UI</Brand>,
    title: "Profile Card with Pixel Cover",
    description: "A social profile card whose cover is a live pixel field with a cursor trail.",
    href: "/components/profile-card",
    image: { src: "/images/profile-card.png", alt: "Profile Card component preview" },
    stats: [
      { value: "1", label: "File to copy" },
      { value: "30", label: "FPS canvas cap" },
      { value: "Any", label: "Accent colour" },
    ],
  },
];

export default function CaseStudyCarouselDemo() {
  return (
    <CaseStudyCarousel
      index="06"
      eyebrow="Showcase"
      title="What We've Built"
      items={items}
      cta={{ label: "Explore all components", href: "/components" }}
    />
  );
}
