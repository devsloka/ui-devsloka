import { Input } from "@/components/ui/input";
import { useEffect, useId, useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "./dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import {
  Command,
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
  const id = useId();
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
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {/* Search input trigger */}
      <div className="relative">
        <Input
          id={id}
          className="pe-11"
          placeholder="Search components"
          type="search"
          onClick={() => setIsOpen(true)}
        />
        <div className="text-muted-foreground pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-2">
          <kbd className="text-muted-foreground/70 inline-flex h-5 max-h-full items-center rounded border px-1 font-[inherit] text-[0.625rem] font-medium">
            ⌘K
          </kbd>
        </div>
      </div>

      {/* Dialog content */}
      <DialogContent className="p-0 data-[state=open]:animate-contentShow">
        <VisuallyHidden>
          <DialogTitle>Search Components</DialogTitle>
        </VisuallyHidden>
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
      </DialogContent>
    </Dialog>
  );
}
