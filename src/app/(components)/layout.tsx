import CompSidebar from "@/components/comp-layout/comp-sidebar";
import DynamicBreadcrumb from "@/components/comp-layout/DynamicBreadcrumb";

export default function ComponentLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex gap-2 mt-12 max-w-[88rem] mx-auto">
      <CompSidebar />
      <div className="lg:ml-64 p-4 min-h-dvh w-full max-w-[calc(88rem-18rem)]">
        {/* Adjusted max width to ensure content fits within 88rem, considering sidebar */}
        <DynamicBreadcrumb />
        {children}
      </div>
    </main>
  );
}
