"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  CATALOG,
  CATALOG_CATEGORIES,
  type CatalogCategory,
  type CatalogEntry,
  type Edition,
} from "./data/catalog";

type CategoryFilter = CatalogCategory | "All";
type EditionFilter = Edition | "all";

const CATEGORY_FILTERS: { value: CategoryFilter; label: string }[] = [
  "All" as const,
  ...CATALOG_CATEGORIES,
].map((value) => ({ value, label: value }));

const EDITION_FILTERS: { value: EditionFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "free", label: "Free" },
  { value: "pro", label: "Pro" },
];

const COLLAPSED_COUNT = 12;

// Numbers stay fixed to the full catalog, so filtering never renumbers rows.
const NUMBERED_CATALOG = CATALOG.map((entry, i) => ({
  ...entry,
  number: String(i + 1).padStart(3, "0"),
}));

export function ComponentIndex() {
  const [category, setCategory] = useState<CategoryFilter>("All");
  const [edition, setEdition] = useState<EditionFilter>("all");
  const [preview, setPreview] = useState<CatalogEntry | null>(null);
  const [expanded, setExpanded] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  const entries = NUMBERED_CATALOG.filter(
    (entry) =>
      (category === "All" || entry.category === category) &&
      (edition === "all" || entry.edition === edition)
  );
  const visibleEntries = expanded
    ? entries
    : entries.slice(0, COLLAPSED_COUNT);
  const hiddenCount = entries.length - visibleEntries.length;

  // Move the preview with a transform instead of state: no re-render per frame.
  const handlePointerMove = (event: React.PointerEvent) => {
    const node = previewRef.current;
    if (!node) return;
    node.style.transform = `translate3d(${event.clientX + 24}px, ${event.clientY - 90}px, 0)`;
  };

  return (
    <div>
      <div className="flex flex-col gap-4 border-b border-border pb-4 font-mono text-xs uppercase tracking-wider md:flex-row md:items-center md:justify-between">
        <FilterGroup
          label="Category"
          options={CATEGORY_FILTERS}
          value={category}
          onChange={setCategory}
        />
        <FilterGroup
          label="Edition"
          options={EDITION_FILTERS}
          value={edition}
          onChange={setEdition}
        />
      </div>

      <div
        className="hidden grid-cols-12 gap-4 border-b border-border py-3 font-mono text-xs uppercase tracking-wider text-muted-foreground md:grid"
        aria-hidden
      >
        <span className="col-span-1">No.</span>
        <span className="col-span-6">Name</span>
        <span className="col-span-3">Category</span>
        <span className="col-span-2 text-right">Edition</span>
      </div>

      {entries.length > 0 ? (
        <ul
          onPointerMove={handlePointerMove}
          onPointerLeave={() => setPreview(null)}
        >
          {visibleEntries.map((entry) => (
            <li key={entry.href}>
              <Link
                href={entry.href}
                onPointerEnter={(event) =>
                  event.pointerType === "mouse" &&
                  setPreview(entry.image ? entry : null)
                }
                className="group grid grid-cols-12 items-baseline gap-4 border-b border-border py-4 transition-colors hover:border-foreground/40"
              >
                <span className="col-span-2 font-mono text-xs text-muted-foreground md:col-span-1">
                  {entry.number}
                </span>
                <span className="col-span-7 text-xl font-medium tracking-[-0.02em] transition-transform duration-300 group-hover:translate-x-2 md:col-span-6 md:text-2xl">
                  {entry.name}
                </span>
                <span className="hidden font-mono text-xs uppercase tracking-wider text-muted-foreground md:col-span-3 md:block">
                  {entry.category}
                </span>
                <span
                  className={cn(
                    "col-span-3 text-right font-mono text-xs uppercase tracking-wider md:col-span-2",
                    entry.edition === "pro" && "text-[#0A6EFF]"
                  )}
                >
                  {entry.edition}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="border-b border-border py-16 text-center font-mono text-xs uppercase tracking-wider text-muted-foreground">
          {edition === "pro"
            ? "The first Pro components are on their way."
            : "Nothing here yet."}
        </p>
      )}

      {hiddenCount > 0 && (
        <button
          type="button"
          onClick={() => setExpanded(true)}
          className="mt-6 cursor-pointer font-mono text-xs uppercase tracking-wider underline underline-offset-4 transition-colors hover:text-[#0A6EFF]"
        >
          Show all {entries.length} →
        </button>
      )}

      <div
        ref={previewRef}
        aria-hidden
        className={cn(
          "pointer-events-none fixed top-0 left-0 z-50 hidden w-72 border border-border bg-background transition-opacity duration-200 md:block",
          preview ? "opacity-100" : "opacity-0"
        )}
      >
        {preview?.image && (
          <>
            <div className="relative aspect-[4/3] bg-muted">
              <Image
                key={preview.image}
                src={preview.image}
                alt=""
                fill
                sizes="288px"
                className="object-cover"
              />
            </div>
            <p className="border-t border-border px-3 py-2 font-mono text-[0.625rem] uppercase tracking-wider">
              {preview.name} · open →
            </p>
          </>
        )}
      </div>
    </div>
  );
}

type FilterGroupProps<T extends string> = {
  label: string;
  options: { value: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
};

function FilterGroup<T extends string>({
  label,
  options,
  value,
  onChange,
}: FilterGroupProps<T>) {
  return (
    <div role="group" aria-label={label} className="flex flex-wrap gap-x-4 gap-y-2">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onChange(option.value)}
          aria-pressed={value === option.value}
          className={cn(
            "cursor-pointer underline-offset-4 transition-colors",
            value === option.value
              ? "text-foreground underline"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
