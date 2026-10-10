import type { ComponentProps } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

export type FAQ = {
  question: string;
  answer: string;
};

export type FAQsBlockProps = {
  eyebrow?: string;
  title?: string;
  note?: string;
  supportEmail?: string;
  lastUpdated?: string;
  faqs?: FAQ[];
} & ComponentProps<"section">;

const DEFAULT_FAQS: FAQ[] = [
  {
    question: "Can I send invoices in more than one currency?",
    answer:
      "Yes. Ledgerline supports 41 currencies. Each client has a default currency, and you can override it on any single invoice. Exchange rates are taken from the European Central Bank at 16:00 CET on the issue date and printed in the invoice footer.",
  },
  {
    question: "What happens when a client pays late?",
    answer:
      "Nothing, unless you ask for it. You can turn on reminders at 3, 7 and 14 days past due, and optionally add a late fee as a fixed amount or a monthly percentage. Reminders come from your own address, not ours.",
  },
  {
    question: "Do you take a cut of card payments?",
    answer:
      "No. Card payments go through your own Stripe or Adyen account and you pay their standard rates. Ledgerline charges a flat monthly fee: €12 for Solo, €29 for Studio with up to five seats.",
  },
  {
    question: "Can my accountant get access without a paid seat?",
    answer:
      "Yes. Invite them as an Accountant from Settings → People. They can read every invoice and export VAT reports, but cannot create, edit or delete anything. Accountant seats are free and unlimited.",
  },
  {
    question: "How do I move my data out if I leave?",
    answer:
      "Settings → Export gives you a ZIP with every invoice as a PDF plus a CSV of clients, line items and payments. It is available on every plan, including after cancellation, for 90 days.",
  },
  {
    question: "Is there a limit on the number of clients or invoices?",
    answer:
      "No limits on either. The only cap is file storage for attachments: 5 GB on Solo and 50 GB on Studio. Invoice PDFs themselves don't count towards it.",
  },
];

export default function FAQsBlock({
  eyebrow = "Questions",
  title = "Things people ask before they switch",
  note = "Most of these come from the first week of a trial. If yours isn't here, it's probably a good one.",
  supportEmail = "support@ledgerline.app",
  lastUpdated = "Updated 2 Sep 2026",
  faqs = DEFAULT_FAQS,
  className,
  ...props
}: FAQsBlockProps) {
  return (
    <section
      data-slot="faqs-block"
      aria-labelledby="faqs-block-title"
      className={cn("bg-background text-foreground w-full", className)}
      {...props}
    >
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 md:grid-cols-12 md:gap-8 md:py-28">
        <div className="md:col-span-5">
          <div className="md:sticky md:top-24">
            <p className="text-muted-foreground font-mono text-xs tracking-wider uppercase">
              {eyebrow}
            </p>
            <h2
              id="faqs-block-title"
              className="mt-4 max-w-sm text-3xl font-semibold tracking-tight text-balance md:text-4xl"
            >
              {title}
            </h2>
            <p className="text-muted-foreground mt-5 max-w-sm text-sm leading-relaxed">
              {note}
            </p>
            <div className="mt-10 border-t pt-5 text-sm">
              <p className="text-muted-foreground">Still stuck?</p>
              <p className="mt-1">
                Write to{" "}
                <a
                  href={`mailto:${supportEmail}`}
                  className="decoration-primary font-medium underline underline-offset-4 outline-none hover:decoration-2 focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {supportEmail}
                </a>
                . A person reads every message.
              </p>
            </div>
            <p className="text-muted-foreground mt-6 font-mono text-[11px] tracking-wider uppercase">
              {lastUpdated}
            </p>
          </div>
        </div>

        <div className="md:col-span-7">
          <Accordion type="single" collapsible className="border-t">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={faq.question}
                value={`item-${index}`}
                className="border-b last:border-b"
              >
                <AccordionTrigger className="group gap-6 rounded-none py-6 text-base font-medium hover:no-underline md:text-lg">
                  <span className="flex items-baseline gap-5">
                    <span
                      aria-hidden="true"
                      className="text-muted-foreground group-data-[state=open]:text-primary font-mono text-xs tabular-nums"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="decoration-muted-foreground/40 underline-offset-4 group-hover:underline">
                      {faq.question}
                    </span>
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground max-w-prose pb-7 pl-10 text-[15px] leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}

export { FAQsBlock };
