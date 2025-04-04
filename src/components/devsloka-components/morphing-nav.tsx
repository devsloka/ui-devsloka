"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Home, Settings, User, Bell, Search } from "lucide-react";
import { cn } from "@/lib/utils";

export default function MorphingNav() {
  const [activeItem, setActiveItem] = useState("home");

  const navItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "profile", label: "Profile", icon: User },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "settings", label: "Settings", icon: Settings },
    { id: "search", label: "Search", icon: Search },
  ];

  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 mb-8 overflow-x-auto">
        <div className="flex space-x-2">
          {navItems.map((comp) => (
            <button
              key={comp.id}
              onClick={() => setActiveItem(comp.id)}
              className={cn(
                "relative px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors",
                activeItem === comp.id
                  ? "text-white"
                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              )}
            >
              {activeItem === comp.id && (
                <motion.div
                  layoutId="component-tab"
                  className="absolute inset-0 bg-primary rounded-lg"
                  transition={{ type: "spring", bounce: 0.2 }}
                />
              )}
              <span className="relative z-10">{comp.label}</span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
