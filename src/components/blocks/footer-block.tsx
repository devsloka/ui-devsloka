import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

const FooterBlock = () => {
  return (
    <div>
      <footer className="relative overflow-hidden">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/5 dark:from-primary/10 dark:to-background pointer-events-none" />

        <div className="container mx-auto relative z-10 px-5">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 py-12">
            {/* Brand section */}
            <div className="md:col-span-4 space-y-4">
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-full bg-primary" />
                <span className="text-2xl font-bold">Brand</span>
              </div>
              <p className="text-muted-foreground">
                Creating beautiful digital experiences that inspire and connect
                people around the world.
              </p>
              <div className="flex space-x-4">
                <Button
                  size="icon"
                  variant="ghost"
                  className="rounded-full h-9 w-9"
                >
                  <Facebook className="h-4 w-4" />
                  <span className="sr-only">Facebook</span>
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="rounded-full h-9 w-9"
                >
                  <Twitter className="h-4 w-4" />
                  <span className="sr-only">Twitter</span>
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="rounded-full h-9 w-9"
                >
                  <Instagram className="h-4 w-4" />
                  <span className="sr-only">Instagram</span>
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="rounded-full h-9 w-9"
                >
                  <Linkedin className="h-4 w-4" />
                  <span className="sr-only">LinkedIn</span>
                </Button>
              </div>
            </div>

            {/* Links section */}
            <div className="md:col-span-2 space-y-4">
              <h3 className="font-semibold">Company</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Careers
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Press
                  </a>
                </li>
              </ul>
            </div>

            <div className="md:col-span-2 space-y-4">
              <h3 className="font-semibold">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Documentation
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Help Center
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Guides
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    API
                  </a>
                </li>
              </ul>
            </div>

            {/* Newsletter section */}
            <div className="md:col-span-4 space-y-4">
              <h3 className="font-semibold">Subscribe to our newsletter</h3>
              <p className="text-muted-foreground">
                Get the latest updates and news right at your inbox.
              </p>
              <div className="flex space-x-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="rounded-full"
                />
                <Button className="rounded-full">Subscribe</Button>
              </div>
            </div>
          </div>

          {/* Bottom section */}
          <div className="border-t py-6 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Brand. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Cookies
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FooterBlock;
