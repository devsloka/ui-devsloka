import type { Metadata, Viewport } from "next";
import "./globals.css";
import { geistMono, geistSans } from "@/lib/fonts";
import Navbar from "@/components/root/Navbar";
import { ThemeProvider } from "@/contexts/theme-provider";
import Footer from "@/components/root/Footer";
import TestimonialBubble from "@/components/root/TestimonialBubble";
import { generateSEO } from "@/config/seo/seo.utils";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = generateSEO({
  title: "Devsloka UI | Animated React & Next.js Components",
  description:
    "Devsloka UI offers a curated collection of animated, minimalist React & Next.js components, blocks, and templates—powered by Tailwind CSS, Shadcn UI & Framer Motion.",
  path: "/",
  image: "/og-homepage.png",
  keywords: [
    "devsloka ui",
    "react components",
    "nextjs templates",
    "tailwind css ui",
    "framer motion ui",
  ],
});

export const viewport: Viewport = {
  themeColor: "#da532c",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Analytics />
          <SpeedInsights />
          <Navbar />
          <main className="mx-auto w-full max-w-[88rem] items-start px-4">
            {children}
          </main>
          <Footer />
          <TestimonialBubble />
        </ThemeProvider>
      </body>
    </html>
  );
}
