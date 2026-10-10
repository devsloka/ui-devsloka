import CompSidebar from "@/components/comp-layout/comp-sidebar";
import DynamicBreadcrumb from "@/components/comp-layout/DynamicBreadcrumb";

export default function ComponentLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="pt-14 lg:grid lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
      <aside className="sticky top-14 hidden h-[calc(100svh-3.5rem)] border-r lg:block">
        <CompSidebar />
      </aside>
      <div className="min-h-screen min-w-0 pt-6">
        <DynamicBreadcrumb />
        {children}
      </div>
    </div>
  );
}
