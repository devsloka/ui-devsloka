export default function TemplateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="py-18">
      <div className="mt-12">{children}</div>
    </div>
  );
}
