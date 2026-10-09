"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { ModeToggle } from "../ui/ModeToggle";
import SearchCommand from "../ui/SearchCommand";
import { sidebarItems } from "@/utilities/sidebarItems";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Components", href: "/components" },
  { label: "Blocks", href: "/blocks" },
  { label: "Templates", href: "/templates" },
  { label: "Docs", href: "/docs" },
];

const isActivePath = (pathname: string, href: string) =>
  pathname === href || pathname.startsWith(`${href}/`);

function Wordmark() {
  return (
    <Link
      href="/"
      className="flex items-center gap-2.5"
      aria-label="Devsloka UI home"
    >
      <Image
        src="/favicon-dark.png"
        alt=""
        width={22}
        height={22}
        className="hidden object-contain dark:block"
      />
      <Image
        src="/favicon-light.png"
        alt=""
        width={22}
        height={22}
        className="object-contain dark:hidden"
      />
      <span className="text-[0.9375rem] font-medium tracking-[-0.02em]">
        Devsloka
      </span>
      <span className="font-mono text-[0.625rem] uppercase tracking-wider text-muted-foreground">
        UI
      </span>
    </Link>
  );
}

const Navbar = () => {
  const pathname = usePathname();

  return (
    <header className="fixed inset-x-0 top-0 z-40 h-14 border-b border-border bg-background">
      <nav
        aria-label="Main"
        className="mx-auto flex h-full max-w-[88rem] items-center justify-between gap-8 px-4"
      >
        <div className="flex items-center gap-12">
          <Wordmark />
          <ul className="hidden items-center gap-7 lg:flex">
            {NAV_LINKS.map((link) => {
              const isActive = isActivePath(pathname, link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "font-mono text-xs uppercase tracking-wider transition-colors",
                      isActive
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
            <li>
              <Link
                href="/#editions"
                className="flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-muted-foreground transition-colors hover:text-foreground"
              >
                Pro
                <span className="size-1.5 bg-[#0A6EFF]" aria-hidden />
              </Link>
            </li>
          </ul>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden lg:block">
            <SearchCommand />
          </div>
          <ModeToggle />
          <MobileMenu pathname={pathname} />
        </div>
      </nav>
    </header>
  );
};

function MobileMenu({ pathname }: { pathname: string }) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button
          type="button"
          className="flex size-8 cursor-pointer items-center justify-center text-muted-foreground transition-colors hover:text-foreground lg:hidden"
          aria-label="Open menu"
        >
          <Menu className="size-4" />
        </button>
      </SheetTrigger>
      <SheetContent className="gap-0 overflow-y-auto border-border p-0">
        <div className="flex h-14 shrink-0 items-center border-b border-border px-5">
          <SheetTitle className="sr-only">Menu</SheetTitle>
          <Wordmark />
        </div>

        <ul className="border-b border-border px-5 py-6">
          {[...NAV_LINKS, { label: "Pro", href: "/#editions" }].map((link) => (
            <li key={link.href}>
              <SheetClose asChild>
                <Link
                  href={link.href}
                  className={cn(
                    "block py-1.5 text-3xl font-medium tracking-[-0.04em] transition-colors",
                    isActivePath(pathname, link.href)
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {link.label}
                </Link>
              </SheetClose>
            </li>
          ))}
        </ul>

        <div className="space-y-8 px-5 py-6">
          {sidebarItems.map((group) => (
            <section key={group.title}>
              <h2 className="mb-3 font-mono text-[0.6875rem] uppercase tracking-wider text-muted-foreground">
                {group.title}
              </h2>
              <ul className="space-y-2">
                {group.children.map((child) => (
                  <li key={child.href}>
                    <SheetClose asChild>
                      <Link
                        href={child.href}
                        aria-current={pathname === child.href ? "page" : undefined}
                        className={cn(
                          "flex items-center gap-2 text-sm transition-colors",
                          pathname === child.href
                            ? "font-medium text-foreground"
                            : "text-foreground/80 hover:text-foreground"
                        )}
                      >
                        {pathname === child.href && (
                          <span aria-hidden className="size-1.5 shrink-0 bg-[#0A6EFF]" />
                        )}
                        {child.title}
                      </Link>
                    </SheetClose>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default Navbar;
