import Image from "next/image";
import Link from "next/link";
import { TeamCarousel, type TeamMember } from "@/registry/ui/team-carousel";

const photo = (id: string) => `https://images.unsplash.com/${id}?q=80&w=400&auto=format&fit=crop`;

// Fictional Devsloka team for the demo.
const members: TeamMember[] = [
  { name: "Aarav Mehta", role: "Design Engineer", location: "Bengaluru", image: { src: photo("photo-1500648767791-00dcc994a43e") } },
  { name: "Ira Kapoor", role: "Product Designer", location: "Mumbai", image: { src: photo("photo-1494790108377-be9c29b29330") } },
  { name: "Kabir Rao", role: "Frontend Engineer", location: "Pune", image: { src: photo("photo-1507003211169-0a1dd7228f2d") } },
  { name: "Meera Iyer", role: "Motion Designer", location: "Chennai", image: { src: photo("photo-1438761681033-6461ffad8d80") } },
  { name: "Ananya Das", role: "Developer Advocate", location: "Delhi", image: { src: photo("photo-1534528741775-53994a69daeb") } },
  { name: "Rohan Shah", role: "Frontend Engineer", location: "Ahmedabad", image: { src: photo("photo-1506794778202-cad84cf45f1d") } },
  { name: "Sara Thomas", role: "Product Designer", location: "Kochi", image: { src: photo("photo-1544005313-94ddf0286df2") } },
  { name: "Vihaan Nair", role: "Design Engineer", location: "Remote", image: { src: photo("photo-1531427186611-ecfd6d936c79") } },
];

export default function TeamCarouselDemo() {
  return (
    <TeamCarousel
      className="min-h-[34rem] max-w-5xl"
      members={members}
      header={
        <div className="grid grid-cols-3 items-start text-[0.6875rem] tracking-wide">
          <span className="flex items-center gap-2 font-semibold tracking-[0.2em]">
            <Image src="/favicon-dark.png" alt="" width={14} height={14} />
            DEVSLOKA
          </span>
          <nav aria-label="Demo" className="flex flex-col items-center leading-relaxed text-white/80">
            <Link href="/components" className="hover:text-white">Components</Link>
            <Link href="/blocks" className="hover:text-white">Blocks</Link>
            <a href="https://github.com/devsloka/ui-devsloka" className="hover:text-white">GitHub</a>
          </nav>
          <a href="https://www.devsloka.in/contact" className="justify-self-end text-white/80 hover:text-white">
            Contact
          </a>
        </div>
      }
    />
  );
}
