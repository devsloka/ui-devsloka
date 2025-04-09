"use client";

import React from "react";
import { FloatingDots } from "../devsloka-components/floating-dots";
import { useTheme } from "next-themes";

const Footer = () => {
  const { theme } = useTheme();
  const footerLink = [
    {
      title: "About",
      links: [
        { label: "Company", href: "/about" },
        { label: "Press", href: "/press" },
        { label: "Careers", href: "/careers" },
      ],
    },
    {
      title: "Support",
      links: [
        { label: "Help Center", href: "/help" },
        { label: "Contact Us", href: "/contact" },
        { label: "Privacy Policy", href: "/privacy" },
      ],
    },
    {
      title: "Community",
      links: [
        { label: "Blog", href: "/blog" },
        { label: "Forum", href: "/forum" },
        { label: "Events", href: "/events" },
      ],
    },
    {
      title: "Social",
      links: [
        { label: "Twitter", href: "https://twitter.com" },
        { label: "Facebook", href: "https://facebook.com" },
        { label: "Instagram", href: "https://instagram.com" },
      ],
    },
  ];
  return (
    <footer className="relative w-full border-t border-dashed h-[500px] overflow-hidden mx-auto">
      <FloatingDots
        color={theme === "dark" ? "white" : "#0A6EFF"}
        minRadius={0.1}
        maxRadius={0.8}
        minSpeed={0.1}
        maxSpeed={0.5}
      />
      <div className="p-4 md:p-6 lg:p-8 xl:p-10 max-w-[88rem]">
        <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {footerLink.map((section) => (
            <div key={section.title} className="mb-4 md:mb-0">
              <h3 className="text-sm md:text-base lg:text-lg font-semibold mb-2 md:mb-3 lg:mb-4">
                {section.title}
              </h3>
              <ul className="space-y-1 md:space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-xs md:text-sm lg:text-base text-gray-400 hover:text-primary transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <p className="absolute bottom-0 left-0 right-0 text-center text-[40px] xs:text-[50px] sm:text-[80px] md:text-[120px] lg:text-[150px] xl:text-[200px] font-bold translate-y-[5%] text-[#0A6EFF] leading-[0.8]">
        Devsloka Ui
      </p>
    </footer>
  );
};

export default Footer;
