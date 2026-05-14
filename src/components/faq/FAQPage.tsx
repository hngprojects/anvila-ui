"use client";

import { useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@/components/icons";
import { FAQ_SECTIONS } from "./FAQData";

interface FaqAccordionProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

function FaqAccordion({
  question,
  answer,
  isOpen,
  onToggle,
}: FaqAccordionProps) {
  return (
    <div className="rounded-xl border border-copy-muted/10 bg-white overflow-hidden">
      <button
        className="flex w-full items-center justify-between p-4 text-left gap-3"
        onClick={onToggle}
      >
        <span
          className={`font-semibold text-base leading-7 transition-colors ${
            isOpen ? "text-teal-accent" : "text-[#2D2D2D]"
          }`}
        >
          {question}
        </span>
        <span
          className={`shrink-0 transition-colors ${isOpen ? "text-teal-accent" : "text-[#2D2D2D]"}`}
        >
          {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
        </span>
      </button>
      {isOpen && (
        <div className="px-6 pb-5 text-sm leading-6 text-copy-muted">
          {answer}
        </div>
      )}
    </div>
  );
}

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
          ? 'w-[140px] shrink-0 cursor-pointer rounded-lg border border-teal-brand bg-white px-3 py-3 text-sm font-medium text-teal-brand transition-colors hover:bg-teal-brand/5 whitespace-pre-line text-center leading-snug'
          : 'w-[140px] shrink-0 cursor-pointer rounded-lg border border-copy-muted/20 bg-white px-3 py-3 text-sm font-medium text-copy-muted transition-colors hover:border-copy-muted/30 hover:text-logo whitespace-pre-line text-center leading-snug'
      }
    >
      {label}
    </button>
  )
}

export function FaqPage() {
  const [openFaq, setOpenFaq] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string>(
    FAQ_SECTIONS[0].id,
  );

  const toggleFaq = (key: string) => {
    setOpenFaq(openFaq === key ? null : key);
  };

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <main className="min-h-screen bg-background">
      <section className="flex flex-col items-center gap-4 px-5 pt-16 pb-10 sm:px-10 sm:pt-20 sm:pb-12 lg:px-20">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-copy-muted/30 bg-white">
          <span className="w-1.5 h-1.5 rounded-full bg-warning shrink-0" />
          <span className="text-copy-muted text-xs font-medium tracking-[0.08em]">
            FAQs
          </span>
        </div>

        {/* Title */}
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

      <section className="w-full max-w-[960px] mx-auto px-5 sm:px-10 lg:px-20 pb-20 flex flex-col gap-12">
        {FAQ_SECTIONS.map((section) => (
          <div key={section.id} id={section.id} className="flex flex-col gap-6">
            <h2 className="text-teal-brand font-semibold text-lg">
              {section.title}
            </h2>

            <div className="flex flex-col gap-4">
              {section.faqs.map((faq, idx) => {
                const key = `${section.id}-${idx}`;
                return (
                  <FaqAccordion
                    key={key}
                    question={faq.question}
                    answer={faq.answer}
                    isOpen={openFaq === key}
                    onToggle={() => toggleFaq(key)}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
