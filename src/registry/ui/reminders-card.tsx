"use client";

import { useId, useRef, useState, useSyncExternalStore } from "react";
import { Check, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export type Reminder = { id: string; label: string; done: boolean };

export type RemindersCardProps = Omit<
  React.ComponentProps<"section">,
  "title"
> & {
  title?: React.ReactNode;
  listTitle?: React.ReactNode;
  /** Reminders (controlled). */
  reminders?: Reminder[];
  defaultReminders?: Reminder[];
  onRemindersChange?: (reminders: Reminder[]) => void;
  /** IANA time zone for the header clock. Defaults to the visitor's own. */
  timeZone?: string;
  /** Hide the header clock. */
  showClock?: boolean;
  /** Called by "Done" when no reminder is being added. */
  onDone?: () => void;
  doneLabel?: React.ReactNode;
  placeholder?: string;
  /** Any CSS color. Tints the header gradient and the card. */
  accent?: string;
};

const EASE_OUT = "ease-[cubic-bezier(0.23,1,0.32,1)]";

// Soft light spots over the accent, like a lit glass widget.
const HEADER_GLOW = [
  "radial-gradient(120% 140% at 20% -10%, color-mix(in oklab, var(--reminders-accent) 35%, white), transparent 55%)",
  "radial-gradient(90% 120% at 105% 110%, color-mix(in oklab, var(--reminders-accent) 45%, white), transparent 50%)",
  "var(--reminders-accent)",
].join(", ");

let nextId = 0;
const createId = () => `reminder-${Date.now().toString(36)}-${nextId++}`;

export function RemindersCard({
  title = "Reminders",
  listTitle = "Tasks for Today",
  reminders,
  defaultReminders = [],
  onRemindersChange,
  timeZone,
  showClock = true,
  onDone,
  doneLabel = "Done",
  placeholder = "New reminder",
  accent = "#0A6EFF",
  className,
  style,
  ...props
}: RemindersCardProps) {
  const listTitleId = useId();
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const time = useClock(showClock ? (timeZone ?? "local") : undefined);

  const [uncontrolled, setUncontrolled] = useState(defaultReminders);
  const items = reminders ?? uncontrolled;
  const update = (next: Reminder[]) => {
    if (reminders === undefined) setUncontrolled(next);
    onRemindersChange?.(next);
  };

  const [adding, setAdding] = useState(false);
  const [draft, setDraft] = useState("");

  const toggle = (id: string) =>
    update(
      items.map((item) =>
        item.id === id ? { ...item, done: !item.done } : item,
      ),
    );

  // Adds the draft and keeps the field open for the next one, like Reminders on iOS.
  const commit = () => {
    const label = draft.trim();
    if (label) update([...items, { id: createId(), label, done: false }]);
    setDraft("");
  };
  // Done and × both keep what was typed, so closing never loses a reminder.
  const finishAdding = () => {
    commit();
    setAdding(false);
  };

  const openAdding = () => {
    setAdding(true);
    // The input mounts on this render; focus it right after.
    requestAnimationFrame(() => inputRef.current?.focus());
  };

  return (
    <section
      data-slot="reminders-card"
      aria-labelledby={listTitleId}
      style={
        {
          "--reminders-accent": accent,
          "--reminders-paper": `color-mix(in oklab, ${accent} 5%, white)`,
          "--reminders-ink": `color-mix(in oklab, ${accent} 22%, #0b0f19)`,
          ...style,
        } as React.CSSProperties
      }
      className={cn(
        "w-full max-w-md overflow-hidden rounded-[2.5rem] text-[var(--reminders-ink)] shadow-2xl shadow-black/10 ",
        className,
      )}
      {...props}
    >
      <header
        style={{ background: HEADER_GLOW }}
        className="flex items-start justify-between gap-4 px-8 pt-7 pb-14 text-white "
      >
        <div>
          <h3 className="text-lg leading-tight font-semibold">{title}</h3>
          {showClock && (
            <p className="text-base font-medium text-white/70 tabular-nums">
              <span className="sr-only">Current time </span>
              {/* Empty until mounted: the server can't know the visitor's clock. */}
              {time ?? " "}
            </p>
          )}
        </div>
        <button
          type="button"
          onClick={adding ? finishAdding : onDone}
          className={cn(
            "inline-flex h-10 cursor-pointer items-center rounded-full bg-white/25 px-4 text-sm font-semibold text-white ring-1 ring-white/30 backdrop-blur-sm outline-none",
            "transition-[background-color,transform] duration-[160ms]",
            EASE_OUT,
            "hover:bg-white/35 focus-visible:ring-2 focus-visible:ring-white active:scale-[0.97] motion-reduce:active:scale-100",
          )}
        >
          {doneLabel}
        </button>
      </header>

      <div className="relative -mt-8 rounded-t-[2.5rem] bg-[var(--reminders-paper)] px-8 pt-8 pb-8">
        <h4 id={listTitleId} className="text-3xl font-bold tracking-[-0.03em]">
          {listTitle}
        </h4>

        <ul className="mt-5 flex flex-col gap-3.5 pr-16">
          {items.map((item) => (
            <li
              key={item.id}
              className={cn(
                "transition-[opacity,transform] duration-200 starting:opacity-0 starting:translate-y-1 motion-reduce:starting:translate-y-0",
                EASE_OUT,
              )}
            >
              <ReminderCheckbox item={item} onToggle={() => toggle(item.id)} />
            </li>
          ))}

          {adding && (
            <li
              className={cn(
                "flex items-center gap-3 transition-[opacity,transform] duration-200 starting:opacity-0 starting:translate-y-1 motion-reduce:starting:translate-y-0",
                EASE_OUT,
              )}
            >
              <span
                aria-hidden
                className="size-6 shrink-0 rounded-full border-[1.5px] border-[var(--reminders-ink)] opacity-40"
              />
              <label htmlFor={inputId} className="sr-only">
                {placeholder}
              </label>
              <input
                ref={inputRef}
                id={inputId}
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                    commit();
                  } else if (event.key === "Escape") {
                    // Escape cancels: drop the draft.
                    setDraft("");
                    setAdding(false);
                  }
                }}
                placeholder={placeholder}
                enterKeyHint="done"
                autoComplete="off"
                className="min-w-0 flex-1 bg-transparent text-lg outline-none placeholder:text-current placeholder:opacity-40"
              />
            </li>
          )}
        </ul>

        <button
          type="button"
          onClick={adding ? finishAdding : openAdding}
          aria-label={adding ? "Finish adding reminders" : "Add reminder"}
          aria-expanded={adding}
          aria-controls={adding ? inputId : undefined}
          className={cn(
            "absolute right-7 bottom-7 flex size-16 cursor-pointer items-center justify-center rounded-full bg-[var(--reminders-paper)] outline-none",
            "shadow-[0_0_0_1px_color-mix(in_oklab,var(--reminders-accent)_25%,transparent),0_8px_20px_-8px_color-mix(in_oklab,var(--reminders-accent)_45%,transparent)]",
            "transition-[background-color,transform] duration-[160ms]",
            EASE_OUT,
            "hover:bg-white focus-visible:ring-2 focus-visible:ring-[var(--reminders-accent)] active:scale-[0.97] motion-reduce:active:scale-100",
          )}
        >
          {/* + turns into × while adding. */}
          <Plus
            aria-hidden
            className={cn(
              "size-7 stroke-[1.75] transition-transform duration-200",
              EASE_OUT,
              adding && "rotate-45",
            )}
          />
        </button>
      </div>
    </section>
  );
}

function ReminderCheckbox({
  item,
  onToggle,
}: {
  item: Reminder;
  onToggle: () => void;
}) {
  return (
    <label className="group flex cursor-pointer items-start gap-3 text-lg">
      <input
        type="checkbox"
        checked={item.done}
        onChange={onToggle}
        className="peer sr-only"
      />
      <span
        aria-hidden
        className={cn(
          "mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full border-[1.5px] border-[var(--reminders-ink)] text-[var(--reminders-paper)]",
          "transition-[background-color,border-color,opacity,transform] duration-150",
          EASE_OUT,
          "opacity-40 group-hover:opacity-60 group-active:scale-[0.92] motion-reduce:group-active:scale-100",
          "peer-checked:bg-[var(--reminders-ink)] peer-checked:opacity-100",
          "peer-focus-visible:ring-2 peer-focus-visible:ring-[var(--reminders-accent)] peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-[var(--reminders-paper)]",
          // The check fades in from slightly smaller, never from nothing.
          "[&>svg]:scale-90 [&>svg]:opacity-0 [&>svg]:transition-[opacity,transform] [&>svg]:duration-150 peer-checked:[&>svg]:scale-100 peer-checked:[&>svg]:opacity-100",
        )}
      >
        <Check className="size-3.5 stroke-[3]" />
      </span>
      {/* Done reminders read darker in this design; open ones are muted. */}
      <span className="opacity-55 transition-opacity duration-150 peer-checked:opacity-100">
        {item.label}
      </span>
    </label>
  );
}

// "14:17" in a time zone ("local" for the visitor's), updating on each minute boundary.
function useClock(timeZone: string | undefined) {
  return useSyncExternalStore(
    subscribeToMinutes,
    () => (timeZone ? formatClock(timeZone) : null),
    () => null,
  );
}

function subscribeToMinutes(onTick: () => void) {
  let interval: ReturnType<typeof setInterval> | undefined;
  const timeout = setTimeout(
    () => {
      onTick();
      interval = setInterval(onTick, 60_000);
    },
    60_000 - (Date.now() % 60_000),
  );
  return () => {
    clearTimeout(timeout);
    clearInterval(interval);
  };
}

const clockFormatters = new Map<string, Intl.DateTimeFormat>();

function formatClock(timeZone: string) {
  let formatter = clockFormatters.get(timeZone);
  if (!formatter) {
    formatter = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23",
      timeZone: timeZone === "local" ? undefined : timeZone,
    });
    clockFormatters.set(timeZone, formatter);
  }
  return formatter.format(new Date());
}
