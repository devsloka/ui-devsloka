import { LogoCloudCarousel, type LogoCloudLogo } from "@/registry/ui/logo-cloud-carousel";

const logos: LogoCloudLogo[] = [
  { name: "Next.js", src: "https://cdn.simpleicons.org/nextdotjs/000000", darkSrc: "https://cdn.simpleicons.org/nextdotjs/ffffff" },
  { name: "React", src: "https://cdn.simpleicons.org/react/000000", darkSrc: "https://cdn.simpleicons.org/react/ffffff" },
  { name: "Tailwind CSS", src: "https://cdn.simpleicons.org/tailwindcss/000000", darkSrc: "https://cdn.simpleicons.org/tailwindcss/ffffff" },
  { name: "TypeScript", src: "https://cdn.simpleicons.org/typescript/000000", darkSrc: "https://cdn.simpleicons.org/typescript/ffffff" },
  { name: "Vercel", src: "https://cdn.simpleicons.org/vercel/000000", darkSrc: "https://cdn.simpleicons.org/vercel/ffffff" },
  { name: "GitHub", src: "https://cdn.simpleicons.org/github/000000", darkSrc: "https://cdn.simpleicons.org/github/ffffff" },
  { name: "Figma", src: "https://cdn.simpleicons.org/figma/000000", darkSrc: "https://cdn.simpleicons.org/figma/ffffff" },
];

const LogoCloudCarouselDemo = () => {
  return (
    <div className="flex w-full flex-col gap-4 py-10">
      <p className="text-center text-sm text-muted-foreground">Built with the tools you already use</p>
      <LogoCloudCarousel logos={logos} rows={2} speed={30} />
    </div>
  );
};

export default LogoCloudCarouselDemo;
