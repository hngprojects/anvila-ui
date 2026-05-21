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
      className="flex flex-col gap-3 border-none"
    >
      {FAQS.map((faq, i) => {
        const key = `pricing-faq-${i}`;
        return (
          <AccordionItem
            key={key}
            value={key}
            className="overflow-hidden rounded-2xl border border-zinc-200 bg-white"
          >
            <AccordionTrigger
              className={`px-5 py-4 text-left text-sm font-semibold leading-6 hover:no-underline sm:text-base ${
                openFaq === key ? "text-teal-brand" : "text-zinc-900"
              }`}
            >
              {faq.q}
            </AccordionTrigger>
            <AccordionContent className="border-t border-zinc-100 px-5 pb-5 pt-4 text-sm leading-relaxed text-zinc-500">
              {faq.a}
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}
