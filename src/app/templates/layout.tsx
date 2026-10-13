export default function TemplateLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}

// ── Templates are hidden for now. Uncomment the original below to bring them back. ──
// import { SectionNav } from "@/components/root/section-nav";
// import { templates } from "@/lib/templates";
//
// const NAV_ITEMS = [
//   { title: "All", href: "/templates" },
//   ...templates.map((template) => ({
//     title: template.title.replace(/ (Landing Page|Template)$/i, ""),
//     href: `/templates/${template.slug}`,
//   })),
// ];
//
// export default function TemplateLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <div className="pt-20 pb-20">
//       <SectionNav items={NAV_ITEMS} aria-label="Templates" className="mb-10" />
//       {children}
//     </div>
//   );
// }
