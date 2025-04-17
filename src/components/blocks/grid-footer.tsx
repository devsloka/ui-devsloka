"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ChevronRight, Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function GridFooter() {
  const [hoveredCell, setHoveredCell] = useState<number | null>(null);

  const gridItems = [
    {
      title: "Products",
      items: ["Features", "Integrations", "Pricing", "Changelog"],
    },
    {
      title: "Resources",
      items: ["Blog", "Documentation", "Guides", "Help Center"],
    },
    { title: "Company", items: ["About", "Careers", "Press", "Partners"] },
    { title: "Legal", items: ["Privacy", "Terms", "Security", "Licenses"] },
  ];

  const contactInfo = [
    { icon: MapPin, text: "123 Innovation Street, Tech City, TC 10011" },
    { icon: Phone, text: "+1 (555) 123-4567" },
    { icon: Mail, text: "hello@gridui.com" },
  ];

  return (
    <footer className="relative bg-background overflow-hidden pt-16 pb-8">
      {/* Grid Pattern Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.02]">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute border-t border-l border-primary/20"
              style={{
                top: `${i * 5}%`,
                left: 0,
                right: 0,
                height: "1px",
              }}
            />
          ))}
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute border-l border-primary/20"
              style={{
                left: `${i * 5}%`,
                top: 0,
                bottom: 0,
                width: "1px",
              }}
            />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 mb-16">
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center space-x-2">
              <div className="grid grid-cols-2 gap-1">
                {[0, 1, 2, 3].map((i) => (
                  <motion.div
                    key={i}
                    className="w-5 h-5 rounded-md bg-primary"
                    initial={{ opacity: 0.5 }}
                    animate={{
                      opacity: [0.5, 1, 0.5],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 3,
                      delay: i * 0.2,
                      repeat: Infinity,
                      repeatType: "loop",
                    }}
                  />
                ))}
              </div>
              <span className="text-2xl font-bold">GridUI</span>
            </div>

            <p className="text-muted-foreground max-w-md">
              Building the future of user interfaces with a focus on
              accessibility, performance, and beautiful design.
            </p>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Contact Us</h3>
              <ul className="space-y-3">
                {contactInfo.map((item, index) => (
                  <motion.li
                    key={index}
                    className="flex items-start gap-3 text-muted-foreground"
                    whileHover={{ x: 5, color: "var(--primary)" }}
                  >
                    <item.icon className="w-5 h-5 mt-0.5 flex-shrink-0" />
                    <span>{item.text}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {gridItems.map((group, groupIndex) => (
              <div key={group.title} className="space-y-4">
                <h3 className="text-lg font-semibold">{group.title}</h3>
                <ul className="space-y-3">
                  {group.items.map((item, itemIndex) => {
                    const cellIndex = groupIndex * 10 + itemIndex;
                    return (
                      <motion.li key={item}>
                        <a
                          href="#"
                          className="group flex items-center text-muted-foreground hover:text-foreground transition-colors"
                          onMouseEnter={() => setHoveredCell(cellIndex)}
                          onMouseLeave={() => setHoveredCell(null)}
                        >
                          <motion.div
                            animate={{
                              x: hoveredCell === cellIndex ? 5 : 0,
                            }}
                            className="flex items-center"
                          >
                            <ChevronRight
                              className={`w-4 h-4 mr-1 transition-opacity duration-200 ${
                                hoveredCell === cellIndex
                                  ? "opacity-100"
                                  : "opacity-0"
                              }`}
                            />
                            {item}
                          </motion.div>
                        </a>
                      </motion.li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <p className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} GridUI. All rights reserved.
              </p>
              <div className="flex gap-4 text-sm text-muted-foreground">
                <a href="#" className="hover:text-foreground transition-colors">
                  Privacy
                </a>
                <a href="#" className="hover:text-foreground transition-colors">
                  Terms
                </a>
                <a href="#" className="hover:text-foreground transition-colors">
                  Cookies
                </a>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground">
                Subscribe to our newsletter
              </span>
              <div className="relative">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="pr-10 bg-muted/50 w-64"
                />
                <motion.div
                  className="absolute right-1 top-1/2 -translate-y-1/2"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button size="icon" className="h-7 w-7">
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
