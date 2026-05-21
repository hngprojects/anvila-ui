"use client";

import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQ_SECTIONS } from "@/data/faq";

interface SectionPillProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

function SectionPill({ label, isActive, onClick }: SectionPillProps) {
  return (
    <button
      onClick={onClick}
      className={`w-[140px] shrink-0 cursor-pointer rounded-xl border px-3 py-3 text-sm font-medium leading-snug whitespace-pre-line text-center transition-all ${
        isActive
          ? "border-teal-brand bg-[#F0FDFA] text-teal-brand"
          : "border-zinc-200 bg-white text-zinc-500 hover:border-zinc-300 hover:text-zinc-800"
      }`}
    >
      {label}
    </button>
  );
}

export function FaqPage() {
  const [openFaq, setOpenFaq] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string>(FAQ_SECTIONS[0].id);

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const el = document.getElementById(sectionId);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <main className="min-h-screen bg-[#FAFAFA]">

      <section className="relative overflow-hidden border-b border-zinc-100 px-5 pb-12 pt-16 sm:pt-24 sm:pb-14">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,#D4D4D8_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_40%,black_40%,transparent_100%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 h-[200px] w-[460px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(29,158,117,0.08)_0%,transparent_70%)]"
        />

        <div className="relative mx-auto flex max-w-[600px] flex-col items-center gap-4 text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full border-[0.5px] border-zinc-400 px-3.5 py-1.5">
            <span aria-hidden className="inline-block h-2 w-2 rounded-full bg-amber-400" />
            <span className="text-[11px] font-medium uppercase tracking-widest text-zinc-500">FAQs</span>
          </div>

          <h1 className="text-[32px] font-semibold leading-tight tracking-tight text-zinc-900 sm:text-[48px]">
            Frequently asked
          </h1>

          <p className="max-w-[440px] text-sm leading-relaxed text-zinc-500 sm:text-base">
            Have questions? Here are quick answers to some of the most common queries.
          </p>
        </div>
      </section>

      <section className="z-30 border-b border-zinc-100 bg-[#FAFAFA]/95 px-5 py-4 backdrop-blur-sm sm:px-8">
        <div className="mx-auto flex max-w-[960px] flex-wrap justify-center gap-2.5 sm:gap-3">
          {FAQ_SECTIONS.map((section) => (
            <SectionPill
              key={section.id}
              label={section.shortTitle}
              isActive={activeSection === section.id}
              onClick={() => scrollToSection(section.id)}
            />
          ))}
        </div>
      </section>

      {/* ── FAQ Sections ──────────────────────────────────────────────────── */}
      <section className="mx-auto w-full max-w-[760px] px-5 pb-24 pt-12 sm:px-8">
        <div className="flex flex-col gap-14">
          {FAQ_SECTIONS.map((section) => (
            <div key={section.id} id={section.id} className="flex flex-col gap-5 scroll-mt-36">
              {/* Section heading */}
              <div className="flex items-center gap-3">
                <span className="h-px flex-1 bg-zinc-200" />
                <h2 className="shrink-0 text-sm font-semibold uppercase tracking-widest text-teal-brand">
                  {section.title}
                </h2>
                <span className="h-px flex-1 bg-zinc-200" />
              </div>

              <Accordion
                type="single"
                collapsible
                value={openFaq ?? ""}
                onValueChange={(val) => setOpenFaq(val || null)}
                className="flex flex-col gap-3 border-none"
              >
                {section.faqs.map((faq, idx) => {
                  const key = `${section.id}-${idx}`;
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
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="border-t border-zinc-100 px-5 pb-5 pt-4 text-sm leading-relaxed text-zinc-500">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  );
                })}
              </Accordion>
            </div>
          ))}
        </div>
      </section>

    </main>
  );
}
