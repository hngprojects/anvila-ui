"use client";

import { useState } from "react";
import Link from "next/link";
import { TableCheckIcon, TableDashIcon } from "@/components/icons";
import { PricingCard } from "./pricing-card";
import { PricingFaqs } from "./pricing-faqs";
import { FEATURES, PRICING_TIERS } from "@/data/pricing";

type CellValue =
  | { type: "check" }
  | { type: "dash" }
  | { type: "text"; value: string };

const ComparisonCell = ({ cell }: { cell: CellValue }) => {
  if (cell.type === "check") return <TableCheckIcon />;
  if (cell.type === "dash") return <TableDashIcon />;
  return <span className="text-center text-sm leading-5 text-zinc-700">{cell.value}</span>;
};

export function PricingPage() {
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  return (
    <main className="min-h-screen bg-white">

      <section className="relative overflow-hidden bg-[#FAFAFA] px-6 pb-20 pt-16 sm:pt-24">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,#D4D4D8_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_40%,black_40%,transparent_100%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/3 h-[240px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(29,158,117,0.09)_0%,transparent_70%)]"
        />

        <div className="relative mx-auto flex max-w-[720px] flex-col items-center gap-5 text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full border-[0.5px] border-zinc-400 px-3.5 py-1.5">
            <span aria-hidden className="inline-block h-2 w-2 rounded-full bg-amber-400" />
            <span className="text-[11px] font-medium uppercase tracking-widest text-zinc-500">Pricing</span>
          </div>

          <h1 className="text-[32px] font-semibold leading-tight tracking-tight text-zinc-900 sm:text-[48px] lg:text-[56px]">
            Simple, honest pricing.
          </h1>

          <p className="max-w-[480px] text-sm leading-relaxed text-zinc-500 sm:text-base">
            Public agents are always free. Pay once to go private. No subscriptions, no surprises.
          </p>
        </div>

        {/* Pricing cards */}
        <div className="relative mx-auto mt-14 flex w-full max-w-[760px] flex-col gap-5 md:flex-row md:items-stretch">
          {PRICING_TIERS.map((tier) => (
            <PricingCard key={tier.id} tier={tier} />
          ))}
        </div>
      </section>

      <section className="px-5 py-16 sm:px-8 sm:py-20">
        <div className="mx-auto w-full max-w-[900px]">
          <h2 className="mb-10 text-center text-[28px] font-semibold tracking-tight text-zinc-900 sm:text-[36px]">
            Full comparison
          </h2>

          <div className="overflow-hidden rounded-2xl border border-zinc-200">
            {/* Table header */}
            <div className="flex items-center justify-between border-b border-zinc-200 bg-zinc-50 px-5 py-4">
              <span className="flex-1 text-sm font-semibold text-zinc-500 uppercase tracking-widest">Features</span>
              <div className="flex items-center gap-6 sm:gap-16">
                <span className="w-20 text-center text-sm font-semibold text-zinc-700">Public</span>
                <span className="w-20 text-center text-sm font-semibold text-zinc-700">Private</span>
              </div>
            </div>

            {/* Rows */}
            {FEATURES.map(({ feature, public: pub, private: priv }, i, arr) => (
              <div
                key={feature}
                className={`flex items-center justify-between px-5 py-4 ${
                  i % 2 === 0 ? "bg-white" : "bg-zinc-50/50"
                } ${i < arr.length - 1 ? "border-b border-zinc-100" : ""}`}
              >
                <span className="flex-1 text-sm text-zinc-700">{feature}</span>
                <div className="flex items-center gap-6 sm:gap-16">
                  <div className="flex w-20 justify-center"><ComparisonCell cell={pub} /></div>
                  <div className="flex w-20 justify-center"><ComparisonCell cell={priv} /></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#FAFAFA] px-5 py-16 sm:px-8 sm:py-20">
        <div className="mx-auto w-full max-w-[680px]">
          <h2 className="mb-10 text-center text-[28px] font-semibold tracking-tight text-zinc-900 sm:text-[36px]">
            Frequently asked
          </h2>

          <PricingFaqs openFaq={openFaq} setOpenFaq={setOpenFaq} />

          <div className="mt-10 flex justify-center">
            <Link href="/faq">
              <button className="inline-flex h-12 w-full max-w-[320px] items-center justify-center rounded-lg border border-teal-brand text-sm font-semibold text-teal-brand transition-opacity hover:opacity-75 sm:w-[320px]">
                See all questions
              </button>
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
