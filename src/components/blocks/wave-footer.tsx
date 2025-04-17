"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Github,
  Instagram,
  Linkedin,
  Mail,
  Twitter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function WaveFooter() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [email, setEmail] = useState("");

  const links = [
    { title: "Company", items: ["About", "Careers", "Press", "Blog"] },
    {
      title: "Resources",
      items: ["Documentation", "Help Center", "Guides", "API"],
    },
    { title: "Legal", items: ["Privacy", "Terms", "Cookies", "Licenses"] },
  ];

  const socialLinks = [
    { icon: Twitter, label: "Twitter" },
    { icon: Instagram, label: "Instagram" },
    { icon: Github, label: "GitHub" },
    { icon: Linkedin, label: "LinkedIn" },
    { icon: Mail, label: "Email" },
  ];

  return (
    <footer className="relative overflow-hidden pt-20 pb-10 bg-background">
      {/* Animated Wave Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute bottom-0 left-0 right-0 h-40">
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className="absolute bottom-0 left-0 right-0 h-full opacity-10 dark:opacity-5"
              style={{
                background: `hsl(${200 + i * 20}, 100%, 50%)`,
                height: `${10 + i * 5}%`,
                zIndex: -i,
              }}
              animate={{
                translateX: [
                  i % 2 === 0 ? "-10%" : "10%",
                  i % 2 === 0 ? "10%" : "-10%",
                ],
              }}
              transition={{
                repeat: Infinity,
                repeatType: "mirror",
                duration: 20 + i * 5,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <motion.div
                className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-primary/60"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
              <span className="text-2xl font-bold">WaveUI</span>
            </div>
            <p className="text-muted-foreground max-w-xs">
              Creating beautiful, accessible, and performant user interfaces for
              the modern web.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <motion.button
                  key={social.label}
                  className="w-10 h-10 rounded-full flex items-center justify-center bg-muted hover:bg-primary hover:text-primary-foreground transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon className="w-5 h-5" />
                  <span className="sr-only">{social.label}</span>
                </motion.button>
              ))}
            </div>
          </div>

          {links.map((group) => (
            <div key={group.title} className="space-y-4">
              <h3 className="text-lg font-semibold">{group.title}</h3>
              <ul className="space-y-3">
                {group.items.map((item) => (
                  <li key={item}>
                    <motion.a
                      href="#"
                      className="group flex items-center text-muted-foreground hover:text-foreground transition-colors"
                      onMouseEnter={() => setHovered(`${group.title}-${item}`)}
                      onMouseLeave={() => setHovered(null)}
                      whileHover={{ x: 5 }}
                    >
                      {item}
                      <motion.span
                        initial={{ opacity: 0, x: -5 }}
                        animate={{
                          opacity: hovered === `${group.title}-${item}` ? 1 : 0,
                          x: hovered === `${group.title}-${item}` ? 0 : -5,
                        }}
                        className="ml-1"
                      >
                        <ArrowUpRight className="w-3 h-3 inline" />
                      </motion.span>
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Stay Updated</h3>
            <p className="text-muted-foreground">
              Subscribe to our newsletter for the latest updates and news.
            </p>
            <div className="flex space-x-2">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-muted/50"
              />
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button>Subscribe</Button>
              </motion.div>
            </div>
          </div>
        </div>

        <motion.div
          className="border-t pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <p>© {new Date().getFullYear()} WaveUI. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-foreground transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Cookies
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
