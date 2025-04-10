import CompSidebar from "@/components/comp-layout/comp-sidebar";
import DynamicBreadcrumb from "@/components/comp-layout/DynamicBreadcrumb";

export default function ComponentLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex gap-2 mt-16 max-w-[88rem] mx-auto border-r border-dashed">
      <CompSidebar />
      <div className="lg:ml-64 lg:px-10 pt-4 min-h-dvh w-full max-w-[calc(88rem-18rem)] overflow-Y-auto">
        {/* Adjusted max width to ensure content fits within 88rem, considering sidebar */}
        <DynamicBreadcrumb />
        {children}
      </div>
    </main>
  );
}
