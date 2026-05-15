"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQS } from "@/data/pricing";

export function PricingFaqs({
  openFaq,
  setOpenFaq,
}: {
  openFaq: string | null;
  setOpenFaq: (val: string | null) => void;
}) {
  return (
    <Accordion
      type="single"
      collapsible
      value={openFaq ?? ""}
      onValueChange={(val) => setOpenFaq(val || null)}
      className="flex flex-col gap-4 border-none"
    >
      {FAQS.map((faq, i) => {
        const key = `pricing-faq-${i}`;
        return (
          <AccordionItem
            key={key}
            value={key}
            className="border-none rounded-xl overflow-hidden bg-white ring-1 ring-copy-muted/10"
          >
            <AccordionTrigger
              className={`px-4 py-4 text-left text-base font-semibold leading-7 hover:no-underline hover:bg-transparent transition-colors ${
                openFaq === key ? "text-teal-accent" : "text-logo"
              }`}
            >
              {faq.q}
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-5 text-sm leading-6 text-copy-muted">
              {faq.a}
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}
