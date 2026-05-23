"use client";

import { useState } from "react";

function PlusIcon({ size = 14 }: { size?: number }) {
  const isSmall = size <= 14;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox={isSmall ? "0 0 14 14" : "0 0 24 24"}
      fill="none"
      className="shrink-0"
    >
      {isSmall ? (
        <path
          d="M0.75 6.75H6.75M6.75 6.75H12.75M6.75 6.75V0.75M6.75 6.75V12.75"
          stroke="black"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ) : (
        <path
          d="M6 12H12M12 12H18M12 12V6M12 12V18"
          stroke="black"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
    </svg>
  );
}

function ArrowUpIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      className={`shrink-0 ${className}`}
    >
      <path
        d="M12 20L12 4M6 10L12 4L18 10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const CAREER_CHIPS = [
  "AI Developers & Engineers",
  "Prompt Engineers",
  "No-Code Builders",
  "Founders",
];

export function Hero() {
  const [value, setValue] = useState("");

  return (
    <section className="relative w-full overflow-hidden border-t border-zinc-100 bg-[#FAFAFA]">
      {/* Dotted background pattern */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,#D4D4D8_1px,transparent_1px)] [background-size:24px_24px]"
      />

      <div className="relative mx-auto flex w-full max-w-[1438px] flex-col items-center justify-center gap-2 px-6 py-6 md:min-h-[640px] md:px-20 md:py-10">
        <div className="flex w-full flex-col items-center gap-3 self-stretch">
          <h1 className="m-0 max-w-[805px] text-center text-xl font-medium leading-8 text-logo md:text-[52px] md:leading-normal">
            <span className="md:hidden">
              Build reusable AI agent packages from one clear setup.
            </span>
            <span className="hidden md:inline">
              Build reusable AI agent packages from one clear setup.
            </span>
          </h1>

          <p className="m-0 max-w-[728px] text-center text-sm font-normal leading-5 text-copy-muted md:text-base md:leading-6">
            Describe your agent setup in seconds and get a structured package
            you can publish, share, and reuse.
          </p>
        </div>

        <div aria-hidden className="h-4 md:h-6" />

        <div className="mx-auto flex w-full max-w-[800px] items-center justify-between gap-2 rounded-3xl border border-border-subtle bg-white p-4 shadow-[0_6px_18px_-2px_rgba(0,0,0,0.10)] md:h-[77px] md:gap-0.5 md:px-6">
          <div className="flex flex-1 items-center gap-2 md:gap-0">
            <span className="md:hidden">
              <PlusIcon size={24} />
            </span>
            <span className="hidden md:inline">
              <PlusIcon size={14} />
            </span>
            <label htmlFor="agent-setup-input" className="sr-only">
              Describe your agent setup
            </label>
            <input
              id="agent-setup-input"
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Describe your agent setup"
              className="flex-1 border-none bg-transparent text-xs font-normal leading-4 text-copy-muted outline-hidden focus:outline-hidden md:ml-4 md:text-xl md:font-medium md:leading-normal"
            />
          </div>
          <button
            type="button"
            aria-label="Submit"
            className={`flex shrink-0 cursor-pointer items-center justify-center rounded-full border-none p-4 transition-all ${
              value.trim().length > 0
                ? "bg-teal-accent text-white hover:bg-teal-accent/80"
                : "bg-muted-bg text-copy-heading"
            }`}
          >
            <ArrowUpIcon />
          </button>
        </div>

        <div aria-hidden className="hidden h-1.5 md:block" />

        <div className="flex flex-wrap items-center justify-center gap-3 md:gap-[13px]">
          {CAREER_CHIPS.map((chip, i) => {
            const isActive = i === 0;
            return (
              <button
                key={chip}
                type="button"
                className={`inline-flex items-center justify-center whitespace-nowrap rounded-2xl border-none px-4 py-2.5 text-base font-medium leading-normal md:px-5 ${
                  isActive
                    ? "bg-[#F0FDFA] text-teal-brand md:bg-zinc-100 md:text-copy-muted"
                    : "bg-zinc-100 text-copy-muted"
                }`}
              >
                {chip}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
