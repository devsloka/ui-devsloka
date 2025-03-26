"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { sidebarItems } from "@/utilities/sidebarItems";
import { motion } from "motion/react";

const CompSidebar = () => {
  const pathname = usePathname();

  return (
    <motion.aside className="hidden lg:flex fixed top-12 bottom-0 w-64 overflow-y-auto border-x border-dashed p-4 bg-background">
      <motion.nav className="w-full space-y-6">
        {sidebarItems.map((section, index) => (
          <motion.div
            key={section.title}
            className="space-y-1"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 + index * 0.05, duration: 0.3 }}
          >
            <h3 className="px-4 text-sm font-bold">{section.title}</h3>
            <div className="flex flex-col space-y-1">
              {section.children.map((item) => (
                <div key={item.href} className="space-y-1">
                  <Link
                    href={item.href}
                    className={cn(
                      "group flex items-center px-4 py-2 rounded-lg",
                      "text-muted-foreground hover:text-foreground",
                      "transition-colors duration-200",
                      "hover:bg-muted/70 hover:text-foreground",
                      pathname === item.href &&
                        "bg-muted/70 font-medium border-l-4 border-blue-500"
                    )}
                  >
                    <span className="truncate text-xs">{item.title}</span>
                  </Link>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.nav>
    </motion.aside>
  );
};

export default CompSidebar;
