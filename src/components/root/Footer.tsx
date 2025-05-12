"use client";

import React from "react";
import { FloatingDots } from "@/components/ui/floating-dots";
import { useTheme } from "next-themes";
import Link from "next/link";
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

const Footer = () => {
  const { theme } = useTheme();
  const footerData = {
    supportLinks: [
      { label: "Help Center", href: "/help" },
      { label: "Contact Us", href: "/contact" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Discord", href: "/discord" },
    ],
    accountLinks: [
      { label: "Components", href: "/components" },
      { label: "Templates", href: "/templates" },
      { label: "Blocks", href: "/blocks" },
      { label: "Prenium", href: "/prenium" },
    ],
    contactInfo: {
      address: "India",
      phone: "+91 840-705-3234",
      email: "support@devsloka.in",
    },
  };
  return (
    <footer className="relative w-full border-t border-dashed h-auto overflow-hidden mx-auto">
      <FloatingDots
        color={theme === "dark" ? "white" : "#0A6EFF"}
        minRadius={0.1}
        maxRadius={0.8}
        minSpeed={0.1}
        maxSpeed={0.5}
      />

      {/* Main Footer Content */}
      <div className="container mx-auto px-6 py-12 mb-10 sm:mb-36">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company Info */}
          <div>
            <Link href="/" className="inline-block mb-6">
              <span className="font-bold text-2xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
                UI Devsloka
              </span>
            </Link>
            <p className="text-neutral-400 mb-6">
              Discover premium components, blocks, and templates for React.js.
            </p>
            <div className="flex space-x-4">
              <Link
                href="#"
                className="text-neutral-400 hover:text-[#0A6EFF] transition-colors"
              >
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link
                href="#"
                className="text-neutral-400 hover:text-[#0A6EFF] transition-colors"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link
                href="#"
                className="text-neutral-400 hover:text-[#0A6EFF] transition-colors"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link
                href="#"
                className="text-neutral-400 hover:text-[#0A6EFF] transition-colors"
              >
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </Link>
            </div>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Support</h4>
            <ul className="space-y-3">
              {footerData.supportLinks.map((item, index) => (
                <li key={index}>
                  <Link
                    href={item.href}
                    className="text-neutral-400 hover:text-[#0A6EFF] transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Community Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Community</h4>
            <ul className="space-y-3">
              {footerData.accountLinks.map((item, index) => (
                <li key={index}>
                  <Link
                    href={item.href}
                    className="text-neutral-400 hover:text-[#0A6EFF] transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-[#0A6EFF]/80 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-neutral-400 whitespace-pre-line">
                  {footerData.contactInfo.address}
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-[#0A6EFF]/80 mr-3 flex-shrink-0" />
                <span className="text-neutral-400">
                  {footerData.contactInfo.phone}
                </span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-[#0A6EFF]/80 mr-3 flex-shrink-0" />
                <span className="text-neutral-400">
                  {footerData.contactInfo.email}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <p className="absolute bottom-0 left-0 right-0 text-center text-[40px] xs:text-[50px] sm:text-[80px] md:text-[120px] lg:text-[150px] xl:text-[200px] font-bold translate-y-[5%] text-[#0A6EFF] leading-[0.8] dark:opacity-70">
        Devsloka Ui
      </p>
    </footer>
  );
};

export default Footer;
