import type { Metadata, Viewport } from "next";
import "./globals.css";
import { geistMono, geistSans } from "@/lib/fonts";
import Navbar from "@/components/root/Navbar";
import { GitHubStars } from "@/components/root/github-stars";
import { ThemeProvider } from "@/contexts/theme-provider";
import Footer from "@/components/root/Footer";
import TestimonialBubble from "@/components/root/TestimonialBubble";
import { defaultSEO } from "@/config/seo/seo.config";
import { SiteJsonLd } from "@/components/seo/json-ld";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = defaultSEO;

export const viewport: Viewport = {
  themeColor: "#0A6EFF",
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
        <SiteJsonLd />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Analytics />
          <SpeedInsights />
          <Navbar github={<GitHubStars />} />
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
