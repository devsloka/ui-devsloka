import Image from "next/image";
import Link from "next/link";
import { FooterPixelField } from "./footer-pixel-field";

type FooterLink = { label: string; href: string };

const COLUMNS: { title: string; links: FooterLink[] }[] = [
  {
    title: "Library",
    links: [
      { label: "Components", href: "/components" },
      { label: "Blocks", href: "/blocks" },
      { label: "Templates", href: "/templates" },
      { label: "Backgrounds", href: "/components/backgrounds" },
      { label: "Hooks", href: "/utilities" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Installation", href: "/installation" },
      { label: "Docs", href: "/docs" },
      { label: "Changelog", href: "/changelog" },
      { label: "Pro", href: "/#editions" },
    ],
  },
  {
    title: "Studio",
    links: [
      { label: "Contact", href: "https://www.devsloka.in/contact-us" },
      { label: "X", href: "https://x.com/devsloka_ui" },
      { label: "Instagram", href: "https://www.instagram.com/devsloka.in" },
    ],
  },
];

const CONTACT = {
  email: "info@devsloka.in",
  phone: "+91 8407053234",
};

const BOTTOM_LINKS = [
  { label: "Made by", value: "devsloka.in", href: "https://www.devsloka.in" },
  { label: "", value: "X", href: "https://x.com/devsloka_ui" },
];

const isExternal = (href: string) => href.startsWith("http");

const Footer = () => {
  return (
    <footer className="overflow-hidden border-t border-border">
      <div className="mx-auto max-w-[88rem] px-4">
        <div className="grid grid-cols-1 gap-12 py-16 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="max-w-sm text-2xl font-medium leading-tight tracking-[-0.03em]">
              Animated React components you copy, paste and own.
            </p>
            <div className="mt-8 space-y-1 font-mono text-xs">
              <a
                href={`mailto:${CONTACT.email}`}
                className="block w-fit underline-offset-4 hover:underline"
              >
                {CONTACT.email}
              </a>
              <a
                href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}
                className="block w-fit text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
              >
                {CONTACT.phone}
              </a>
            </div>
          </div>

          <nav
            aria-label="Footer"
            className="grid grid-cols-2 gap-10 sm:grid-cols-3 md:col-span-7"
          >
            {COLUMNS.map((column) => (
              <div key={column.title}>
                <h2 className="mb-4 font-mono text-[0.6875rem] uppercase tracking-wider text-muted-foreground">
                  {column.title}
                </h2>
                <ul className="space-y-2">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        {...(isExternal(link.href) && {
                          target: "_blank",
                          rel: "noopener noreferrer",
                        })}
                        className="text-sm text-foreground/80 transition-colors hover:text-foreground"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>
      </div>

      <div className="mx-auto max-w-[88rem] px-4">
        <FooterPixelField />
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-[88rem] items-stretch divide-x divide-border text-xs sm:text-sm">
          <Link
            href="/"
            className="flex items-center gap-2.5 py-4 pr-4 pl-4 font-medium sm:pr-6"
          >
            <Image
              src="/favicon-dark.png"
              alt=""
              width={18}
              height={18}
              className="hidden object-contain dark:block"
            />
            <Image
              src="/favicon-light.png"
              alt=""
              width={18}
              height={18}
              className="object-contain dark:hidden"
            />
            Devsloka UI
          </Link>
          <span className="hidden items-center px-6 text-muted-foreground sm:flex">
            MIT licensed
          </span>
          <span className="flex flex-1 items-center px-6 text-muted-foreground">
            <span className="hidden md:inline">
              © {new Date().getFullYear()} Devsloka. Made in India.
            </span>
          </span>
          {BOTTOM_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 px-4 text-muted-foreground transition-colors hover:text-foreground sm:px-6"
            >
              {link.label && (
                <span className="hidden sm:inline">{link.label}</span>
              )}
              <span className="text-foreground">{link.value}</span>
              <span aria-hidden>↗</span>
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
