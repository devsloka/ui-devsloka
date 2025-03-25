"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";
import { ModeToggle } from "../ui/ModeToggle";
import { Menu } from "lucide-react";

const navLinks = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Components",
    href: "/components",
  },
  {
    name: "Template",
    href: "/template",
  },
  {
    name: "Docs",
    href: "/docs",
  },
  {
    name: "About",
    href: "/about",
  },
];
const Navbar = () => {
  const pathname = usePathname();
  return (
    <nav className="flex justify-between items-center fixed top-0 z-40 w-full px-12 border-b bg-background/50 backdrop-blur-xs h-12">
      <div className="flex items-center gap-2">
        <Image
          src={"/favicon.ico"}
          alt="logo"
          width={32}
          height={32}
          className="object-contain"
        />
        <span className="text-2xl font-bold text-[#0A6EFF]">Devsloka UI</span>
      </div>
      <ul className="hidden md:flex items-center gap-4">
        {navLinks.map((link) => (
          <li key={link.name}>
            <Link
              href={link.href}
              className={`${
                pathname === link.href
                  ? "text-[#0A6EFF] font-bold"
                  : "text-zinc-500"
              }`}
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>

      <div className="hidden md:flex items-center gap-4">
        <ModeToggle />
      </div>

      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" className="md:hidden">
            <Menu className="w-6 h-6" />
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <span className="text-2xl font-bold text-[#0A6EFF]">
              Devsloka UI
            </span>
          </SheetHeader>
          <ul className="flex flex-col gap-4 px-4">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className={`${
                    pathname === link.href
                      ? "text-[#0A6EFF] font-bold"
                      : "text-zinc-500"
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </SheetContent>
      </Sheet>
    </nav>
  );
};

export default Navbar;
