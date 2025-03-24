import CompSiidebar from "@/components/comp-layout/comp-sidebar";
import DynamicBreadcrumb from "@/components/comp-layout/DynamicBreadcrumb";

export default function ComponentLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <main className="flex gap-2 mt-12 container">
        <CompSiidebar />
        <div className="lg:ml-64 p-4 w-full">
          <DynamicBreadcrumb />
          {children}
        </div>
      </main>
    </>
  );
}
