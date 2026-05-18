"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const CheckIcon = () => (
  <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-teal-brand">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="9"
      viewBox="0 0 12 9"
      fill="none"
    >
      <path
        d="M11.7502 0.251116C12.085 0.585938 12.085 1.12969 11.7502 1.46451L4.89308 8.32165C4.55826 8.65647 4.01451 8.65647 3.67969 8.32165L0.251116 4.89308C-0.0837054 4.55826 -0.0837054 4.01451 0.251116 3.67969C0.585938 3.34487 1.12969 3.34487 1.46451 3.67969L4.28772 6.50022L10.5395 0.251116C10.8743 -0.0837054 11.4181 -0.0837054 11.7529 0.251116H11.7502Z"
        fill="white"
      />
    </svg>
  </div>
);

const FireIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
  >
    <path
      d="M11.7734 7.46667C11.62 7.26667 11.4334 7.09333 11.26 6.92C10.8134 6.52 10.3067 6.23333 9.88003 5.81333C8.8867 4.84 8.6667 3.23333 9.30003 2C8.6667 2.15333 8.11337 2.5 7.64003 2.88C5.91337 4.26667 5.23337 6.71333 6.0467 8.81333C6.07337 8.88 6.10003 8.94667 6.10003 9.03333C6.10003 9.18 6.00003 9.31333 5.8667 9.36667C5.71337 9.43333 5.55337 9.39333 5.4267 9.28667C5.38886 9.25497 5.35722 9.21655 5.33337 9.17333C4.58003 8.22 4.46003 6.85333 4.9667 5.76C3.85337 6.66667 3.2467 8.2 3.33337 9.64667C3.37337 9.98 3.41337 10.3133 3.5267 10.6467C3.62003 11.0467 3.80003 11.4467 4.00003 11.8C4.72003 12.9533 5.9667 13.78 7.3067 13.9467C8.73337 14.1267 10.26 13.8667 11.3534 12.88C12.5734 11.7733 13 10 12.3734 8.48L12.2867 8.30667C12.1467 8 11.7734 7.46667 11.7734 7.46667ZM9.6667 11.6667C9.48003 11.8267 9.17337 12 8.93337 12.0667C8.1867 12.3333 7.44003 11.96 7.00003 11.52C7.79337 11.3333 8.2667 10.7467 8.4067 10.1533C8.52003 9.62 8.3067 9.18 8.22003 8.66667C8.14003 8.17333 8.15337 7.75333 8.33337 7.29333C8.46003 7.54667 8.59337 7.8 8.75337 8C9.2667 8.66667 10.0734 8.96 10.2467 9.86667C10.2734 9.96 10.2867 10.0533 10.2867 10.1533C10.3067 10.7 10.0667 11.3 9.6667 11.6667Z"
      fill="#ED5F15"
    />
  </svg>
);

const STARTER_FEATURES = [
  "3 public setup packages",
  "Browse and clone public packages",
  "GitHub-ready package structure",
  "Reusable personality, behavior, and Skill files",
];

const BUILDER_FEATURES = [
  "Extra public packages after the free limit",
  "Private package creation",
  "Hidden from the public registry",
  "GitHub-ready package export",
  "Ideal for client work and internal agent setups",
];

const FAQS = [
  {
    q: 'What does "one-time per agent" mean?',
    a: "You pay once to turn a specific agent setup private. No recurring subscriptions.",
  },
  {
    q: "Can I make a public agent private later?",
    a: "Yes, upgrade any public agent to professional at any time.",
  },
  {
    q: "Is there a limit on how many agents I can generate?",
    a: "No, both plans allow unlimited agent generation.",
  },
  {
    q: "What payment methods do you accept?",
    a: "All major credit cards, PayPal, and crypto.",
  },
  {
    q: "Do you offer refunds?",
    a: "Generally no, but contact support for issues.",
  },
];

export function Pricing() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <section className="flex w-full flex-col items-center justify-center gap-12 self-stretch bg-white px-5 py-20">
      {/* Header */}
      <div className="flex flex-col items-center gap-6 text-center">
        <div className="flex items-center gap-2 rounded-full border-[0.5px] border-zinc-400 px-3 py-1.5">
          <div className="h-2 w-2 rounded-full bg-warning" />
          <span className="text-xs font-medium leading-5 text-copy-muted">
            PRICING
          </span>
        </div>

        <h2 className="m-0 w-full text-center text-5xl font-medium leading-[48px] text-logo">
          Simple pricing for reusable <br /> agent setups.
        </h2>

        <p className="m-0 max-w-[665px] text-base font-normal leading-6 text-copy-muted">
          Create your first 3 public setup packages for free. Pay once when you
          need more packages or want to keep a package private.
        </p>
      </div>

      <div className="mx-auto flex w-full max-w-[800px] flex-col items-stretch gap-6 md:flex-row">
        {/* Starter Card */}
        <div className="flex flex-1 flex-col rounded-[20px] border-[2.5px] border-border-subtle bg-border-subtle">
          <div className="flex items-center gap-1.5 self-stretch rounded-t-[20px] bg-border-subtle px-6 py-3">
            <span className="text-lg font-semibold text-zinc-900">Starter</span>
          </div>
          <div className="flex flex-1 flex-col items-start gap-4 self-stretch rounded-[20px] border border-white bg-white p-6">
            <div className="flex items-baseline">
              <span className="text-4xl font-semibold text-copy-muted">$0</span>
            </div>
            <p className="m-0 min-h-[72px] text-base font-normal leading-6 text-copy-muted">
              Best for trying Anvila and publishing your first public setup
              packages.
            </p>
            <button
              type="button"
              className="flex h-[55.65px] cursor-pointer items-center justify-center gap-2.5 self-stretch whitespace-nowrap rounded-[10px] border-none bg-border-subtle px-4 py-4 text-lg font-bold text-zinc-900"
            >
              Create free package
            </button>
            <div className="flex flex-col gap-4 self-stretch">
              <span className="text-sm font-semibold text-zinc-900">
                What&apos;s included:
              </span>
              <ul className="m-0 flex list-none flex-col gap-3 p-0">
                {STARTER_FEATURES.map((f) => (
                  <li
                    key={f}
                    className="flex items-center gap-3 text-sm text-copy-muted"
                  >
                    <CheckIcon />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Builder Card */}
        <div className="flex flex-1 flex-col rounded-[20px] border-[2.5px] border-teal-brand bg-teal-brand">
          <div className="flex h-[68px] shrink-0 items-center justify-between gap-1.5 self-stretch rounded-t-[20px] bg-teal-brand px-6 py-3">
            <span className="text-lg font-semibold text-white">Builder</span>
            <div className="flex items-center gap-1 rounded-[20px] bg-white px-2.5 py-1">
              <FireIcon />
              <span className="text-[10px] font-semibold text-[#7A7A7A]">
                MOST POPULAR
              </span>
            </div>
          </div>
          <div className="flex flex-1 flex-col items-start gap-4 self-stretch rounded-[20px] border border-white bg-white p-6">
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-semibold text-copy-muted">$5</span>
              <span className="text-sm text-zinc-500">one time payment</span>
            </div>
            <p className="m-0 min-h-[72px] text-base font-normal leading-6 text-copy-muted">
              Best for creating more packages, private setups, client projects,
              and internal workflows.
            </p>
            <button
              type="button"
              className="flex h-[55.65px] cursor-pointer items-center justify-center gap-2.5 self-stretch whitespace-nowrap rounded-[10px] border-none bg-teal-brand px-4 py-4 text-lg font-bold text-white"
            >
              Create paid package
            </button>
            <div className="flex flex-col gap-4 self-stretch">
              <span className="text-sm font-semibold text-zinc-900">
                Everything in Builder:
              </span>
              <ul className="m-0 flex list-none flex-col gap-3 p-0">
                {BUILDER_FEATURES.map((f) => (
                  <li
                    key={f}
                    className="flex items-center gap-3 text-sm text-copy-muted"
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

      {/* FAQ Section */}
      <div className="mx-auto w-full max-w-4xl px-6 py-20">
        <h2 className="mb-12 text-center text-4xl font-bold text-logo">
          Frequently asked
        </h2>
        <div className="flex flex-col gap-4">
          {FAQS.map((faq, i) => (
            <div
              key={faq.q}
              className="rounded-xl border border-border-subtle bg-white"
            >
              <button
                className="flex w-full cursor-pointer items-center justify-between p-6 text-left"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                aria-expanded={openFaq === i}
                aria-controls={`faq-answer-${i}`}
              >
                <span className="font-semibold text-logo">{faq.q}</span>
                {openFaq === i ? (
                  <ChevronUp size={20} />
                ) : (
                  <ChevronDown size={20} />
                )}
              </button>
              {openFaq === i && (
                <div
                  id={`faq-answer-${i}`}
                  className="border-t border-border-subtle p-6 text-copy-muted"
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