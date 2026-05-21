"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { CheckIcon, FireIcon } from "@/components/icons";
import {
  BUILDER_FEATURES,
  STARTER_FEATURES,
  FAQS,
} from "@/data/landing/pricing";

export function Pricing() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <section className="flex w-full flex-col items-center gap-16 bg-[#FAFAFA] px-5 py-20">
      {/* Header */}
      <div className="flex flex-col items-center gap-5 text-center">
        <div className="inline-flex items-center gap-1.5 rounded-full border-[0.5px] border-zinc-400 px-3.5 py-1.5">
          <span
            aria-hidden
            className="inline-block h-2 w-2 rounded-full bg-amber-400"
          />
          <span className="text-[11px] font-medium uppercase tracking-widest text-zinc-500">
            Pricing
          </span>
        </div>

        <h2 className="m-0 max-w-[600px] text-center text-[32px] font-semibold leading-tight tracking-tight text-zinc-900 md:text-[40px]">
          Simple pricing for reusable agent setups.
        </h2>

        <p className="m-0 max-w-[560px] text-sm leading-relaxed text-zinc-500 md:text-base">
          Create your first 3 public setup packages for free. Pay once when you
          need more packages or want to keep a package private.
        </p>
      </div>

      {/* Cards */}
      <div className="mx-auto flex w-full max-w-[800px] flex-col gap-5 md:flex-row">
        {/* Starter */}
        <div className="flex flex-1 flex-col overflow-hidden rounded-[20px] border border-zinc-200 bg-white">
          <div className="flex items-center gap-2 border-b border-zinc-100 px-6 py-4">
            <span className="text-base font-semibold text-zinc-900">
              Starter
            </span>
          </div>
          <div className="flex flex-1 flex-col gap-5 p-6">
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-semibold tracking-tight text-zinc-900">
                $0
              </span>
            </div>
            <p className="min-h-[60px] text-sm leading-relaxed text-zinc-500">
              Best for trying Anvila and publishing your first public setup
              packages.
            </p>
            <button
              type="button"
              className="flex h-12 cursor-pointer items-center justify-center rounded-[10px] border border-zinc-200 bg-zinc-100 text-sm font-semibold text-zinc-800 transition-opacity hover:opacity-75"
            >
              Create free package
            </button>
            <div className="flex flex-col gap-3">
              <span className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
                What&apos;s included
              </span>
              <ul className="flex list-none flex-col gap-3 p-0">
                {STARTER_FEATURES.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-3 text-sm text-zinc-600"
                  >
                    <CheckIcon />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Builder */}
        <div className="flex flex-1 flex-col overflow-hidden rounded-[20px] border border-teal-brand bg-white shadow-[0_0_0_3px_rgba(12,93,86,0.10)]">
          <div className="flex items-center justify-between border-b border-teal-brand/10 bg-teal-brand px-6 py-4">
            <span className="text-base font-semibold text-white">Builder</span>
            <div className="flex items-center gap-1 rounded-full bg-white px-2.5 py-1">
              <FireIcon />
              <span className="text-[10px] font-semibold uppercase tracking-wide text-zinc-500">
                Most popular
              </span>
            </div>
          </div>
          <div className="flex flex-1 flex-col gap-5 p-6">
            <div className="flex items-baseline gap-1.5">
              <span className="text-4xl font-semibold tracking-tight text-zinc-900">
                $5
              </span>
              <span className="text-xs text-zinc-400">one time payment</span>
            </div>
            <p className="min-h-[60px] text-sm leading-relaxed text-zinc-500">
              Best for creating more packages, private setups, client projects,
              and internal workflows.
            </p>
            <button
              type="button"
              className="flex h-12 cursor-pointer items-center justify-center rounded-[10px] border-none bg-teal-brand text-sm font-semibold text-white transition-opacity hover:opacity-85"
            >
              Create paid package
            </button>
            <div className="flex flex-col gap-3">
              <span className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
                Everything in Builder
              </span>
              <ul className="flex list-none flex-col gap-3 p-0">
                {BUILDER_FEATURES.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-3 text-sm text-zinc-600"
                  >
                    <CheckIcon />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="mx-auto w-full max-w-[720px]">
        <h2 className="mb-8 text-center text-[28px] font-semibold tracking-tight text-zinc-900 md:text-[32px]">
          Frequently asked
        </h2>
        <div className="flex flex-col gap-3">
          {FAQS.map((faq, i) => (
            <div
              key={faq.q}
              className="overflow-hidden rounded-2xl border border-zinc-200 bg-white"
            >
              <button
                className="flex w-full cursor-pointer items-center justify-between gap-4 px-6 py-5 text-left"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                aria-expanded={openFaq === i}
                aria-controls={`faq-answer-${i}`}
              >
                <span className="text-sm font-semibold text-zinc-900 md:text-base">
                  {faq.q}
                </span>
                {openFaq === i ? (
                  <ChevronUp size={18} className="shrink-0 text-zinc-400" />
                ) : (
                  <ChevronDown size={18} className="shrink-0 text-zinc-400" />
                )}
              </button>
              {openFaq === i && (
                <div
                  id={`faq-answer-${i}`}
                  className="border-t border-zinc-100 px-6 py-5 text-sm leading-relaxed text-zinc-500"
                >
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

