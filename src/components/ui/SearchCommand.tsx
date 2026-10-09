import { useEffect, useState } from "react";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { LuLayoutGrid } from "react-icons/lu";
import Link from "next/link";
import { sidebarItems } from "@/utilities/sidebarItems";

export default function SearchCommand() {
  const [isOpen, setIsOpen] = useState(false);

  // Keyboard shortcut handler
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setIsOpen(true);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="flex h-8 w-56 cursor-pointer items-center justify-between gap-4 border border-border px-3 font-mono text-xs uppercase tracking-wider text-muted-foreground transition-colors hover:border-foreground/40 hover:text-foreground"
      >
        <span>Search components</span>
        <kbd className="font-mono text-[0.625rem]">⌘K</kbd>
      </button>
      <CommandDialog open={isOpen} onOpenChange={setIsOpen}>
        <Command className="rounded-lg border shadow-2xs md:min-w-[450px]">
          <CommandInput placeholder="Type a component or search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>

            {sidebarItems.map(
              (group) =>
                group.children.length > 0 && (
                  <CommandGroup key={group.title} heading={group.title}>
                    {group.children.map((item) => (
                      <Link href={item.href} passHref key={item.href}>
                        <CommandItem onSelect={() => setIsOpen(false)}>
                          <LuLayoutGrid className="mr-2 h-4 w-4" />
                          <span>{item.title}</span>
                        </CommandItem>
                      </Link>
                    ))}
                  </CommandGroup>
                )
            )}

            <CommandSeparator />

            <CommandGroup heading="Settings">
              <CommandItem>
                <LuLayoutGrid className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  );
}
