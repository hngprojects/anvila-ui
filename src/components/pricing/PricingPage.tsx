"use client";

import { useState } from "react";
import Link from "next/link";
import { TableCheckIcon, TableDashIcon } from "@/components/icons";
import { PricingCard } from "./PricingCard";
import { PricingFaqs } from "./PricingFAQs";
import { FEATURES, PRICING_TIERS } from "@/data/pricing";

type CellValue =
  | { type: "check" }
  | { type: "dash" }
  | { type: "text"; value: string };

const ComparisonCell = ({ cell }: { cell: CellValue }) => {
  if (cell.type === "check") return <TableCheckIcon />;
  if (cell.type === "dash") return <TableDashIcon />;
  return (
    <span className="text-logo text-sm text-center leading-5">
      {cell.value}
    </span>
  );
};

export function PricingPage() {
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  return (
    <main className="min-h-screen bg-white">
      <section className="w-full bg-background py-10 sm:py-14">
        <div className="w-full px-6 pb-14 pt-4 md:px-10 xl:px-20">
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-copy-muted/30">
              <span className="w-1.5 h-1.5 rounded-full bg-warning shrink-0" />
              <span className="text-copy-muted text-xs font-medium tracking-[0.08em]">
                PRICING
              </span>
            </div>

            <h1 className="text-logo font-['Geist',_Inter,_sans-serif] text-2xl font-medium leading-8 sm:text-4xl sm:leading-tight lg:text-[60px] lg:leading-[72px] lg:whitespace-nowrap">
              Simple, honest pricing.
            </h1>

            <p className="text-copy-muted text-sm sm:text-base leading-6 max-w-lg">
              Public agents are always free. Upgrade monthly when private
              publishing and registry controls are ready.
            </p>
          </div>

          <div className="flex flex-col gap-10 w-full md:flex-row md:items-stretch md:gap-5 max-w-3xl mx-auto mt-15">
            {PRICING_TIERS.map((tier) => (
              <PricingCard key={tier.id} tier={tier} />
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="w-full max-w-[1280px] mx-auto px-5 py-16 sm:px-10 lg:px-20 flex flex-col gap-6">
          <h2 className="text-logo font-medium text-[30px] leading-[38px] text-center sm:font-bold sm:text-[48px]">
            Full Comparison
          </h2>

          <div className="w-full rounded-xl overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 bg-background border-b border-background">
              <span className="text-logo text-base font-normal leading-6 flex-1">
                Features
              </span>
              <div className="flex items-center gap-6 sm:gap-16">
                <span className="text-logo text-sm leading-5 w-20 text-center">
                  Public
                </span>
                <span className="text-logo text-sm leading-5 w-20 text-center">
                  Private
                </span>
              </div>
            </div>

            <div className="flex flex-col">
              {FEATURES.map(
                ({ feature, public: pub, private: priv }, i, arr) => (
                  <div
                    key={feature}
                    className={`flex items-center justify-between px-5 py-4 ${
                      i < arr.length - 1 ? "border-b border-background" : ""
                    }`}
                  >
                    <span className="text-logo text-sm leading-5 flex-1">
                      {feature}
                    </span>
                    <div className="flex items-center gap-6 sm:gap-16">
                      <div className="w-20 flex justify-center">
                        <ComparisonCell cell={pub} />
                      </div>
                      <div className="w-20 flex justify-center">
                        <ComparisonCell cell={priv} />
                      </div>
                    </div>
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="w-full bg-background">
        <div className="w-full max-w-[698px] mx-auto px-5 py-10 sm:px-6 sm:py-20 flex flex-col gap-7">
          <h2 className="text-logo font-medium text-[30px] leading-[38px] text-center sm:font-bold sm:text-[48px]">
            Frequently asked
          </h2>

          <PricingFaqs openFaq={openFaq} setOpenFaq={setOpenFaq} />
        </div>

        <div className="w-full flex justify-center px-5 pb-16 sm:pb-20">
          <Link href="/faq">
            <button className="w-[358px] h-[48px] rounded-lg border border-teal-brand flex items-center justify-center transition-opacity hover:opacity-80">
              <span className="text-teal-brand font-medium text-[18px] leading-[100%]">
                See more
              </span>
            </button>
          </Link>
        </div>
      </section>
    </main>
  );
}
