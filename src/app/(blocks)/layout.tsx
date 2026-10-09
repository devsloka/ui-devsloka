import { SectionNav } from "@/components/root/section-nav";
import { blockNavLinks } from "@/utilities/block-nav-link";

export default function BlockLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="pt-20 pb-20">
      <SectionNav items={blockNavLinks} aria-label="Blocks" className="mb-10" />
      {children}
    </div>
  );
}
