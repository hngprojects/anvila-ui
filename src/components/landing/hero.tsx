"use client";

import { useState } from "react";
import { ArrowUpIcon, PlusIcon } from "@/components/Icons/landing";
import { AVATARS, CAREER_CHIPS, FEATURES } from "@/data/landing/hero";

export function Hero() {
  const [value, setValue] = useState("");

  return (
    <section className="relative w-full overflow-hidden border-t border-border-subtle bg-background">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,#d4d4d8_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_40%,black_40%,transparent_100%)]"
      />

      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[30%] h-[280px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(29,158,117,0.10)_0%,transparent_70%)]"
      />

      <div className="relative mx-auto flex w-full max-w-[960px] flex-col items-center px-6 py-12 md:py-16">
        <div className="mb-6 inline-flex items-center gap-1.5 rounded-full border border-teal-brand/20 bg-teal-surface px-3.5 py-1.5 text-xs font-medium text-teal-brand">
          <span className="flex h-4 w-4 items-center justify-center rounded-full bg-teal-brand/10">
            <span className="h-1.5 w-1.5 rounded-full bg-teal-mid" />
          </span>
          Now in beta · Trusted by builders
        </div>

        {/* Headline */}
        <h1 className="mb-4 max-w-[680px] text-center text-[28px] font-semibold leading-tight tracking-tight text-copy-heading md:text-[48px]">
          Build reusable{" "}
          <em className="not-italic text-teal-brand">AI agent</em>
          <br className="hidden md:block" /> packages from one clear setup.
        </h1>

        {/* Subheading */}
        <p className="mb-9 max-w-[500px] text-center text-sm leading-relaxed text-copy-muted md:text-base">
          Describe your agent in seconds. Get a structured, publishable package
          you can share, clone, and reuse across every project.
        </p>

        {/* Input */}
        <div
          className={`mx-auto mb-5 flex w-full max-w-[720px] items-center gap-2.5 rounded-3xl border border-border-subtle bg-surface-base px-5 py-3 shadow-[0_6px_24px_-4px_rgba(0,0,0,0.08)] transition-shadow duration-200 focus-within:shadow-[0_8px_28px_-4px_rgba(12,93,86,0.14),0_0_0_2px_rgba(12,93,86,0.15)]`}
        >
          <span className="text-copy-faint">
            <PlusIcon size={16} />
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
            className="flex-1 border-none bg-transparent text-sm font-normal text-copy-body outline-none placeholder:text-copy-faint md:text-[15px]"
          />
          <button
            type="button"
            aria-label="Submit"
            className={`flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full border-none transition-all ${
              value.trim().length > 0
                ? "bg-teal-brand text-white hover:bg-teal-brand/80"
                : "bg-surface-muted text-copy-muted"
            }`}
          >
            <ArrowUpIcon />
          </button>
        </div>

        {/* Chips */}
        <div className="mb-10 flex flex-wrap items-center justify-center gap-2">
          {CAREER_CHIPS.map((chip) => (
            <div
              key={chip}
              className="inline-flex items-center justify-center whitespace-nowrap rounded-full border border-transparent bg-surface-muted px-4 py-2 text-sm font-medium text-copy-muted"
            >
              {chip}
            </div>
          ))}
        </div>

        {/* Social proof */}
        <div className="mb-12 flex items-center gap-3">
          <div className="flex">
            {AVATARS.map((av, i) => (
              <div
                key={av.initials}
                style={{ marginLeft: i === 0 ? 0 : -8 }}
                className={`flex h-7 w-7 items-center justify-center rounded-full border-2 border-surface-base text-[9px] font-semibold ${av.bg} ${av.text}`}
              >
                {av.initials}
              </div>
            ))}
          </div>
          <p className="text-sm text-copy-muted">
            <span className="font-medium text-copy-body">2,400+ builders</span>{" "}
            have packaged their agents
          </p>
        </div>

        {/* Feature cards */}
        <div className="grid w-full max-w-[720px] grid-cols-1 gap-3 md:grid-cols-3">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="flex flex-col gap-2 rounded-2xl border border-border-subtle bg-surface-base p-4"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-[10px] border border-teal-brand/12 bg-teal-surface text-teal-brand">
                {f.icon}
              </div>
              <p className="text-sm font-semibold text-copy-heading">
                {f.title}
              </p>
              <p className="text-xs leading-relaxed text-copy-muted">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
