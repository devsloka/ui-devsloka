import Image from "next/image";
import { NowPlayingCard } from "@/registry/ui/now-playing-card";

// Devsloka cover art: brand blues, the footer's pixel grid and the logo.
const COVER_GLOW =
  "radial-gradient(circle at 25% 15%, #86B6FF, transparent 45%), radial-gradient(circle at 85% 90%, #0B3D91, transparent 55%), #0A6EFF";
const COVER_GRID =
  "linear-gradient(to right, rgb(255 255 255 / 0.08) 1px, transparent 1px), linear-gradient(to bottom, rgb(255 255 255 / 0.08) 1px, transparent 1px)";

function DevslokaCover() {
  return (
    <div className="relative size-full" style={{ background: COVER_GLOW }}>
      <div className="absolute inset-0" style={{ backgroundImage: COVER_GRID, backgroundSize: "18px 18px" }} />
      <Image
        src="/favicon-dark.png"
        alt=""
        width={160}
        height={160}
        className="absolute top-1/2 left-1/2 w-[38%] -translate-x-1/2 -translate-y-1/2 opacity-95"
      />
      <div className="absolute bottom-[9%] left-[8%] leading-tight text-white">
        <p className="text-xl font-medium tracking-tight">DEVSLOKA</p>
        <p className="text-xs font-medium tracking-wide">INTERFACES THAT MOVE</p>
      </div>
    </div>
  );
}

export default function NowPlayingCardDemo() {
  return (
    <NowPlayingCard
      artist="Devsloka"
      title="Interfaces that move"
      cover={<DevslokaCover />}
      duration={146}
      defaultElapsed={75}
    />
  );
}
