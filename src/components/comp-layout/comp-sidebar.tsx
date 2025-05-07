"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { sidebarItems } from "@/utilities/sidebarItems";

const CompSidebar = () => {
  const pathname = usePathname();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SiteNavigationElement",
    name: "Secondary Navigation",
    description: "Supplementary website navigation menu",
    url: pathname,
    mainEntity: sidebarItems.flatMap((section) =>
      section.children.map((item) => ({
        "@type": "NavigationElement",
        name: item.title,
        description: `Navigate to ${item.title}`,
        url: item.href,
      }))
    ),
  };

  return (
    <div
      aria-label="Secondary navigation"
      className="w-64 overflow-y-auto border-l border-dashed p-4 bg-background"
    >
      {/* Secondary navigation structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <nav>
        <ul className="w-full">
          {sidebarItems.map((section) => (
            <li key={section.title} className="space-y-1 pb-5">
              <h3 className="px-4 text-sm font-bold mb-2">{section.title}</h3>
              <ul className="flex flex-col space-y-1">
                {section.children.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <motion.li
                      key={item.href}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Link
                        href={item.href}
                        className={cn(
                          "group flex items-center px-4 py-2 rounded-lg",
                          "text-muted-foreground hover:text-foreground",
                          "transition-colors duration-200",
                          "hover:bg-muted/70 hover:text-foreground",
                          isActive &&
                            "bg-muted/70 font-medium border-l-4 border-blue-500"
                        )}
                        aria-current={isActive ? "page" : undefined}
                      >
                        <span className="truncate text-xs">{item.title}</span>
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default CompSidebar;
