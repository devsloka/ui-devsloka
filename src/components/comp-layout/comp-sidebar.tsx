"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { sidebarItems } from "@/utilities/sidebarItems";

const CompSiidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex fixed top-12 bottom-0 left-0 w-64 overflow-y-auto border-r p-4 rounded-r-2xl bg-background">
      <nav className="w-full space-y-6">
        {sidebarItems.map((section) => (
          <div key={section.title} className="space-y-1">
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

                  {/* Nested children links */}
                  {/* {item.children && (
                    <div className="ml-4 space-y-1">
                      {item.children.map((subItem) => (
                        <Link
                          key={subItem.href}
                          href={subItem.href}
                          className={cn(
                            "group flex items-center px-4 py-2 rounded-lg",
                            "text-muted-foreground hover:text-foreground",
                            "text-sm transition-colors duration-200",
                            pathname === subItem.href &&
                              "text-blue-600 bg-blue-500/10 font-medium border-l-4 border-blue-500"
                          )}
                        >
                          <span className="truncate">{subItem.title}</span>
                        </Link>
                      ))}
                    </div>
                  )} */}
                </div>
              ))}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default CompSiidebar;
