import { Geist, Geist_Mono } from "next/font/google";

// Site-wide typefaces, applied through the --font-sans and --font-mono theme tokens.
export const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

export const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});
