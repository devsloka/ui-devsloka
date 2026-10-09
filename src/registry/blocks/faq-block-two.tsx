"use client";

import { useId, useMemo, useState, type ComponentProps } from "react";
import { Search } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export type FAQGroup = {
  label: string;
  items: { question: string; answer: string }[];
};

export type FAQBlockTwoProps = {
  title?: string;
  description?: string;
  searchPlaceholder?: string;
  groups?: FAQGroup[];
} & ComponentProps<"section">;

const DEFAULT_GROUPS: FAQGroup[] = [
  {
    label: "Billing",
    items: [
      {
        question: "Who counts as a paid seat?",
        answer:
          "Anyone who builds or edits rotas. Staff who only view their shifts, swap with colleagues or clock in are free. A café with two managers and 30 staff pays for two seats.",
      },
      {
        question: "Can I pay yearly by bank transfer?",
        answer:
          "Yes, on any plan with five or more seats. Choose Annual → Invoice in Billing and we'll send a PDF with our IBAN. You have 30 days to pay; the account stays fully active meanwhile.",
      },
      {
        question: "What happens to my bill if I add someone mid-month?",
        answer:
          "We charge for the remaining days only, on your next invoice. Removing a seat gives a credit the same way. You'll never see a surprise charge between invoices.",
      },
    ],
  },
  {
    label: "Account",
    items: [
      {
        question: "Can one login manage several locations?",
        answer:
          "Yes. Add each site under Settings → Locations. Managers can be limited to one site or see all of them, and staff can be shared across sites without duplicate profiles.",
      },
      {
        question: "How do I hand the account over to someone else?",
        answer:
          "The current owner opens Settings → Ownership and picks another admin. They get an email to confirm; until they do, nothing changes. Billing details move with the account.",
      },
      {
        question: "Do you support single sign-on?",
        answer:
          "SAML and Google Workspace SSO are included on the Business plan. Okta and Entra ID are tested; any SAML 2.0 provider should work. SCIM provisioning is on the roadmap for Q1.",
      },
    ],
  },
  {
    label: "Product",
    items: [
      {
        question: "Does Fernway warn me about rest-period breaches?",
        answer:
          "Yes. Set the minimum rest between shifts (11 hours by default) and the maximum weekly hours for each contract type. Shifts that break a rule are flagged in amber before you publish, not after.",
      },
      {
        question: "Can staff see the rota without installing the app?",
        answer:
          "Every published rota has a private link per person that opens in any browser. They can also subscribe to it in Google or Apple Calendar, and changes appear within 15 minutes.",
      },
      {
        question: "Can I export timesheets to payroll?",
        answer:
          "Approved timesheets export as CSV, or sync directly to Xero, Sage and BrightPay. Breaks, overtime and holiday hours land in separate columns so nothing needs retyping.",
      },
    ],
  },
];

export function FAQBlockTwo({
  title = "Help centre, the short version",
  description = "The questions we answer most often, grouped by where they come up. Search across all of them.",
  searchPlaceholder = "Try “SSO” or “timesheets”",
  groups = DEFAULT_GROUPS,
  className,
  ...props
}: FAQBlockTwoProps) {
  const [query, setQuery] = useState("");
  const id = useId();
  const searchId = `${id}-search`;
  const titleId = `${id}-title`;

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return groups;
    return groups
      .map((group) => ({
        ...group,
        items: group.items.filter((item) =>
          `${item.question} ${item.answer}`.toLowerCase().includes(needle),
        ),
      }))
      .filter((group) => group.items.length > 0);
  }, [groups, query]);

  const total = groups.reduce((sum, group) => sum + group.items.length, 0);
  const matches = filtered.reduce((sum, group) => sum + group.items.length, 0);

  return (
    <section
      data-slot="faq-block-two"
      aria-labelledby={titleId}
      className={cn("bg-background text-foreground w-full", className)}
      {...props}
    >
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <div className="grid gap-8 border-b pb-10 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <h2
              id={titleId}
              className="text-3xl font-semibold tracking-tight text-balance md:text-5xl"
            >
              {title}
            </h2>
            <p className="text-muted-foreground mt-4 max-w-md text-sm leading-relaxed">
              {description}
            </p>
          </div>
          <div className="md:col-span-5">
            <label
              htmlFor={searchId}
              className="text-muted-foreground font-mono text-xs tracking-wider uppercase"
            >
              Search questions
            </label>
            <div className="relative mt-2">
              <Search
                aria-hidden="true"
                className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2"
              />
              <Input
                id={searchId}
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={searchPlaceholder}
                autoComplete="off"
                className="pl-9"
              />
            </div>
            <p
              aria-live="polite"
              className="text-muted-foreground mt-2 font-mono text-[11px] tracking-wider uppercase tabular-nums"
            >
              {query.trim()
                ? `${matches} of ${total} questions`
                : `${total} questions`}
            </p>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="grid gap-4 py-16 md:grid-cols-12">
            <p className="text-muted-foreground font-mono text-xs tracking-wider uppercase md:col-span-3">
              No match
            </p>
            <div className="md:col-span-9">
              <p className="text-lg font-medium tracking-tight">
                Nothing here mentions “{query.trim()}”.
              </p>
              <p className="text-muted-foreground mt-2 max-w-prose text-sm leading-relaxed">
                Try a shorter word, or{" "}
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="text-foreground decoration-primary rounded-sm underline underline-offset-4 outline-none hover:decoration-2 focus-visible:ring-2 focus-visible:ring-ring"
                >
                  clear the search
                </button>{" "}
                to see every question.
              </p>
            </div>
          </div>
        ) : (
          <Accordion type="single" collapsible>
            {filtered.map((group) => {
              const groupIndex = groups.findIndex(
                (original) => original.label === group.label,
              );
              return (
                <div
                  key={group.label}
                  role="group"
                  aria-label={group.label}
                  className="grid gap-2 border-b py-8 md:grid-cols-12 md:gap-8"
                >
                  <div className="md:col-span-3">
                    <p className="font-mono text-xs tracking-wider uppercase md:sticky md:top-24 md:pt-5">
                      <span className="text-muted-foreground tabular-nums">
                        {String(groupIndex + 1).padStart(2, "0")} /{" "}
                      </span>
                      {group.label}
                    </p>
                  </div>
                  <div className="divide-y md:col-span-9">
                    {group.items.map((item) => (
                      <AccordionItem
                        key={item.question}
                        value={`${group.label}-${item.question}`}
                        className="border-b-0"
                      >
                        <AccordionTrigger className="rounded-none py-5 text-base font-medium hover:no-underline [&[data-state=open]]:text-foreground">
                          <span className="decoration-muted-foreground/40 underline-offset-4 hover:underline">
                            {item.question}
                          </span>
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground max-w-prose pb-6 text-[15px] leading-relaxed">
                          {item.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </div>
                </div>
              );
            })}
          </Accordion>
        )}
      </div>
    </section>
  );
}
