import CompSidebar from "@/components/comp-layout/comp-sidebar";
import DynamicBreadcrumb from "@/components/comp-layout/DynamicBreadcrumb";

export default function ComponentLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="container-wrapper lg:border-r border-dashed pr-2">
      <div className="container flex-1 items-start md:grid md:grid-cols-[0px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-10">
        <aside className="hidden lg:flex top-14 z-30 h-[calc(100vh-3.5rem)] w-full border-r border-dashed md:sticky md:block">
          <div className="no-scrollbar h-full overflow-y-auto overflow-x-hidden">
            <CompSidebar />
          </div>
        </aside>
        <div className="mt-20 min-h-screen">
          <DynamicBreadcrumb />
          {children}
        </div>
      </div>
    </div>
  );
}
