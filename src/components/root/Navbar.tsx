"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";
import { ModeToggle } from "../ui/ModeToggle";
import { Menu } from "lucide-react";
import { BsTwitterX } from "react-icons/bs";
import SearchCommand from "../ui/SearchCommand";
import { useId } from "react";
import { sidebarItems } from "../../utilities/sidebarItems";

const navLinks = [
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
    name: "Blocks",
    href: "/blocks",
  },
];

const Navbar = () => {
  const pathname = usePathname();
  const sheetId = useId();

  const renderSidebarItems = (items: typeof sidebarItems) => {
    return items.map((item) => (
      <li key={sheetId + item.title}>
        <span className="font-bold text-muted-foreground">{item.title}</span>
        <ul className="pl-4">
          {item.children.map((child) => (
            <li key={sheetId + child.href}>
              <Link
                href={child.href}
                className={`${
                  pathname === child.href
                    ? "text-[#0A6EFF] font-bold"
                    : "text-zinc-500"
                }`}
              >
                {child.title}
              </Link>
            </li>
          ))}
        </ul>
      </li>
    ));
  };

  return (
    <nav className="fixed top-0 z-40 w-full border-b border-dashed bg-background/80 backdrop-blur-lg h-16">
      <div className="h-full max-w-[88rem] mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-24">
          <Link href="/">
            <div className="flex items-center gap-2">
              {" "}
              <Image
                src={"/favicon.ico"}
                alt="logo"
                width={32}
                height={32}
                className="object-contain"
              />
              <span className="text-2xl font-bold text-[#0A6EFF]">
                Devsloka UI
              </span>
            </div>
          </Link>
          <ul className="hidden lg:flex items-center gap-5">
            {navLinks.map((link) => (
              <li key={sheetId + link.name}>
                <Link
                  href={link.href}
                  className={`${
                    pathname === link.href
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground/80"
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="hidden lg:flex items-center gap-4">
          <Button variant={"outline"}>
            <BsTwitterX />
          </Button>
          <ModeToggle />
          <SearchCommand />
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="lg:hidden">
              <Menu className="w-6 h-6" />
            </Button>
          </SheetTrigger>
          <SheetContent className="overflow-y-auto max-h-screen">
            <SheetHeader>
              <span className="text-2xl font-bold text-[#0A6EFF]">
                Devsloka UI
              </span>
            </SheetHeader>
            <ul className="flex flex-col gap-4 px-4">
              {navLinks.map((link) => (
                <li key={sheetId + link.href}>
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
            <ul className="flex flex-col gap-4 px-4">
              {renderSidebarItems(sidebarItems)}
            </ul>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default Navbar;
