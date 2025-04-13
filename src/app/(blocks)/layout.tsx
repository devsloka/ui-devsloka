import BlockScrollLinks from "@/components/block/block-scroll-links";

export default function BlockLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="py-18">
      <BlockScrollLinks />
      <div className="mt-12">{children}</div>
    </div>
  );
}
