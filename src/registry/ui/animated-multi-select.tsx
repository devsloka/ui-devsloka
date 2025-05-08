"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Search, ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export type Option = {
  value: string;
  label: string;
};

type AnimatedMultiSelectProps = {
  options: Option[];
  placeholder?: string;
  onChange?: (selectedOptions: Option[]) => void;
  className?: string;
  maxHeight?: number;
};

export function AnimatedMultiSelect({
  options,
  placeholder = "Search...",
  onChange,
  className,
  maxHeight = 300,
}: AnimatedMultiSelectProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState("");
  const [selectedOptions, setSelectedOptions] = React.useState<Option[]>([]);
  const [filteredOptions, setFilteredOptions] =
    React.useState<Option[]>(options);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  // Filter options based on search input
  React.useEffect(() => {
    const filtered = options.filter(
      (option) =>
        !selectedOptions.some((selected) => selected.value === option.value) &&
        option.label.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredOptions(filtered);
  }, [searchValue, options, selectedOptions]);

  // Handle selection of an option
  const handleSelect = (option: Option) => {
    const newSelectedOptions = [...selectedOptions, option];
    setSelectedOptions(newSelectedOptions);
    setSearchValue("");
    onChange?.(newSelectedOptions);
    inputRef.current?.focus();
  };

  // Handle removal of a selected option
  const handleRemove = (option: Option) => {
    const newSelectedOptions = selectedOptions.filter(
      (selected) => selected.value !== option.value
    );
    setSelectedOptions(newSelectedOptions);
    onChange?.(newSelectedOptions);
  };

  // Handle click outside to close dropdown
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn("relative w-full font-sans", className)}
    >
      <motion.div
        initial={{ borderRadius: 8 }}
        animate={{
          borderRadius: isOpen ? "8px 8px 0 0" : 8,
          boxShadow: isOpen
            ? "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)"
            : "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
        }}
        className="flex flex-wrap items-center gap-2 p-2 border bg-background border-input rounded-lg overflow-hidden"
      >
        <div className="flex items-center text-muted-foreground">
          <Search className="w-4 h-4 mr-2" />
        </div>

        <div className="flex flex-wrap gap-2 flex-1 min-w-[100px]">
          <AnimatePresence>
            {selectedOptions.map((option) => (
              <motion.div
                key={option.value}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
                className="flex items-center gap-1 px-2 py-1 text-sm rounded-full bg-primary/10 text-primary"
              >
                <span>{option.label}</span>
                <button
                  type="button"
                  onClick={() => handleRemove(option)}
                  className="flex items-center justify-center w-4 h-4 rounded-full hover:bg-primary/20"
                >
                  <X className="w-3 h-3" />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>

          <input
            ref={inputRef}
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onFocus={() => setIsOpen(true)}
            placeholder={selectedOptions.length === 0 ? placeholder : ""}
            className="flex-1 min-w-[120px] bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground"
          />
        </div>

        <motion.button
          type="button"
          animate={{ rotate: isOpen ? 180 : 0 }}
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-center w-6 h-6 rounded-full hover:bg-muted"
        >
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        </motion.button>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute z-10 w-full mt-1 overflow-hidden bg-background border border-input rounded-b-lg shadow-lg"
            style={{ maxHeight: maxHeight }}
          >
            <div className="overflow-y-auto" style={{ maxHeight }}>
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option) => (
                  <motion.div
                    key={option.value}
                    whileHover={{ backgroundColor: "rgba(0,0,0,0.05)" }}
                    className="flex items-center justify-between px-4 py-2 cursor-pointer"
                    onClick={() => handleSelect(option)}
                  >
                    <span>{option.label}</span>
                    {selectedOptions.some(
                      (selected) => selected.value === option.value
                    ) && <Check className="w-4 h-4 text-primary" />}
                  </motion.div>
                ))
              ) : (
                <div className="px-4 py-2 text-sm text-muted-foreground">
                  No options found
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
