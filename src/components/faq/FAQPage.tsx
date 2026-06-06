"use client";

import { useEffect, useRef, useState } from "react";
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
      className={
        isActive
          ? "w-[140px] shrink-0 cursor-pointer rounded-xl border border-teal-brand bg-white px-3 py-3 text-sm font-medium text-teal-brand transition-colors hover:bg-teal-brand/5 whitespace-pre-line text-center leading-snug focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-brand focus-visible:ring-offset-2"
          : "w-[140px] shrink-0 cursor-pointer rounded-xl border border-copy-muted/20 bg-white px-3 py-3 text-sm font-medium text-copy-muted transition-colors hover:border-copy-muted/30 hover:text-logo whitespace-pre-line text-center leading-snug focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-brand focus-visible:ring-offset-2"
      }
    >
      {label}
    </button>
  );
}

export function FaqPage() {
  const [openFaq, setOpenFaq] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string>(
    FAQ_SECTIONS[0].id,
  );
  const faqContainerRef = useRef<HTMLElement>(null);

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  useEffect(() => {
    const container = faqContainerRef.current;
    if (!container) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!["ArrowDown", "ArrowUp", "Home", "End"].includes(e.key)) return;
      const target = e.target as HTMLElement;
      if (target.getAttribute("data-slot") !== "accordion-trigger") return;
      e.preventDefault();
      e.stopPropagation();
      const triggers = Array.from(
        container.querySelectorAll<HTMLButtonElement>(
          '[data-slot="accordion-trigger"]',
        ),
      );
      const len = triggers.length;
      if (e.key === "Home") {
        requestAnimationFrame(() => triggers[0]?.focus());
        return;
      }
      if (e.key === "End") {
        requestAnimationFrame(() => triggers[len - 1]?.focus());
        return;
      }
      const idx = triggers.indexOf(target as HTMLButtonElement);
      if (idx === -1) return;
      if (e.key === "ArrowDown") requestAnimationFrame(() => triggers[Math.min(idx + 1, len - 1)]?.focus());
      else if (e.key === "ArrowUp") requestAnimationFrame(() => triggers[Math.max(idx - 1, 0)]?.focus());
    };
    container.addEventListener("keydown", handleKeyDown, { capture: true });
    return () =>
      container.removeEventListener("keydown", handleKeyDown, {
        capture: true,
      });
  }, []);

  return (
    <main className="min-h-screen bg-background">
      <section className="flex flex-col items-center gap-4 px-5 pt-16 pb-10 sm:px-10 sm:pt-20 sm:pb-12 lg:px-20">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-copy-muted/30 bg-white">
          <span className="w-1.5 h-1.5 rounded-full bg-warning shrink-0" />
          <span className="text-copy-muted text-xs font-medium tracking-[0.08em]">
            FAQs
          </span>
        </div>

        <h1 className="text-logo font-medium text-[30px] leading-[38px] text-center sm:font-bold sm:text-[48px]">
          Frequently asked
        </h1>

        <p className="text-copy-muted text-sm sm:text-base leading-6 text-center max-w-lg">
          Have questions? Here are quick answers to some of the most common
          queries.
        </p>
      </section>

      <section className="w-full max-w-[1280px] mx-auto px-5 sm:px-10 lg:px-20 pb-8">
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
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

      <section
        ref={faqContainerRef}
        className="w-full max-w-[960px] mx-auto px-5 sm:px-10 lg:px-20 pb-20 flex flex-col gap-12"
      >
        {FAQ_SECTIONS.map((section) => (
          <div key={section.id} id={section.id} className="flex flex-col gap-6">
            <h2 className="text-teal-brand font-semibold text-lg pl-2">
              {section.title}
            </h2>

            <Accordion
              type="single"
              collapsible
              value={openFaq ?? ""}
              onValueChange={(val) => setOpenFaq(val || null)}
              className="flex flex-col gap-4 border-none"
            >
              {section.faqs.map((faq, idx) => {
                const key = `${section.id}-${idx}`;
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
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-5 text-sm leading-6 text-copy-muted">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </div>
        ))}
      </section>
    </main>
  );
}
