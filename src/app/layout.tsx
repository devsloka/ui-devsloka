import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/root/Navbar";
import { ThemeProvider } from "@/contexts/theme-provider";
import Footer from "@/components/root/Footer";
import { generateSEO } from "@/config/seo/seo.utils";
import { Analytics } from "@vercel/analytics/next";

// Configure Poppins (variable font)
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${poppins.variable}`}>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Analytics />
          <Navbar />
          <main className="mx-auto w-full max-w-[88rem] items-start px-4">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
