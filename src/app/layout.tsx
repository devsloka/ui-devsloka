import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/root/Navbar";
import { ThemeProvider } from "@/contexts/theme-provider";

export const metadata: Metadata = {
  title: "Devsloka UI",
  description:
    "Premium Components, Blocks, and Templates for React.js, Next.js, Remix.js, and React-Router-Dom v7.0.0",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main className="mx-auto w-full max-w-[88rem] items-start px-4">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
