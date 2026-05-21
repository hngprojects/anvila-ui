"use client";

import React from "react";
import { motion } from "motion/react";
import { 
  ShieldPolicyIcon, 
  DataCollectIcon, 
  HowWeUseDataIcon, 
  DataSharingIcon, 
  DataSecurityIcon, 
  YourDataIcon,
  TransparencyIcon,
  DangerIcon,
  ManageDataSettingsIcon,
  DeleteIcon,
  DownloadIcon
} from "../icons";

const QUICK_SUMMARY_CARDS = [
  {
    icon: <DataCollectIcon className="h-10 w-10" />,
    title: "Data We Collect",
    description: "We collect what you provide, usage data, and device info."
  },
  {
    icon: <HowWeUseDataIcon className="h-10 w-10" />,
    title: "How We Use Data",
    description: "To power the AI Agent, improve responses, and personalize your experience."
  },
  {
    icon: <DataSharingIcon className="h-10 w-10" />,
    title: "Data Sharing",
    description: "We don't sell your data. We share with trusted services only as needed."
  },
  {
    icon: <DataSecurityIcon className="h-10 w-10" />,
    title: "Data Security",
    description: "We use encryption and strict security measures to keep your data safe."
  },
  {
    icon: <YourDataIcon className="h-8 w-8" />,
    title: "Your Data",
    description: "You can view, export, or delete your data anytime."
  }
];

const DETAILED_ITEMS = [
  {
    id: 1,
    icon: <DataCollectIcon className="h-6 w-6" />,
    title: "Data we collect",
    description: "Learn about the type of data that we collect to provide and improve our services."
  },
  {
    id: 2,
    icon: <HowWeUseDataIcon className="h-6 w-6" />,
    title: "How we use Data",
    description: "Understand how we use your data to deliver and enhance your experience."
  },
  {
    id: 3,
    icon: <DataSharingIcon className="h-6 w-6" />,
    title: "Data sharing and third parties",
    description: "See when and how we share data with trusted third parties."
  },
  {
    id: 4,
    icon: <DataSecurityIcon className="h-6 w-6" />,
    title: "Data Storage and security",
    description: "Discover how we store your data and the security measures we use."
  },
  {
    id: 5,
    icon: <YourDataIcon className="h-6 w-6" />,
    title: "Your Right & choices",
    description: "Learn about your right and how you can control your data."
  },
  {
    id: 6,
    icon: <TransparencyIcon className="h-6 w-6" />,
    title: "AI Transparency",
    description: "Important information about how our AI works and uses your data."
  }
];

const AI_TRANSPARENCY_LIST = [
  "We may retain conversations to maintain context and improve responses.",
  "You can turn off memory anytime in settings.",
  "Your data may be used to improve our AI models (you can opt out).",
  "Human reviews do not see your conversations."
];

const DATA_CONTROL_CARDS = [
  {
    icon: <ManageDataSettingsIcon className="h-10 w-10" />,
    title: "Manage Data Settings",
    description: "Customize what data we collect and how it's used."
  },
  {
    icon: <DeleteIcon className="h-10 w-10" />,
    title: "Delete my Data",
    description: "Permanently delete your account and data."
  },
  {
    icon: <DownloadIcon className="h-10 w-10" />,
    title: "Download my Data",
    description: "Export a copy of your data anytime."
  }
];

function ChevronLeftIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={`shrink-0 ${className}`}>
      <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function ChevronRightIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={`shrink-0 ${className}`}>
      <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function PrivacyPolicy() {
  const [currentCard, setCurrentCard] = React.useState(0);

  const nextCard = () => {
    setCurrentCard((prev) => (prev + 1) % QUICK_SUMMARY_CARDS.length);
  };

  const prevCard = () => {
    setCurrentCard((prev) => (prev - 1 + QUICK_SUMMARY_CARDS.length) % QUICK_SUMMARY_CARDS.length);
  };

  return (
    <main className="min-h-screen bg-background font-sans text-copy-muted">
      <div className="mx-auto max-w-[960px] px-6 py-10 md:px-10 md:py-16">
        {/* Hero Section */}
        <section className="relative mb-16 flex flex-col items-center text-center md:mb-20">
          {/* Ambient teal glow */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 h-[200px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(29,158,117,0.08)_0%,transparent_70%)]"
          />

          <div className="relative flex flex-col items-center gap-6">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="flex h-16 w-16 items-center justify-center rounded-full border border-teal-brand/20 bg-teal-surface text-teal-brand"
            >
              <ShieldPolicyIcon className="h-8 w-8" />
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="text-[32px] font-semibold leading-tight tracking-tight text-copy-heading md:text-[48px]"
            >
              Privacy & Data Policy
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="max-w-[500px] text-base text-copy-muted"
            >
              How your AI Agent collects, uses, and protects your data.
            </motion.p>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="max-w-[560px] text-sm leading-relaxed text-copy-faint"
            >
              We believe in transparency and giving you control over your data. Here&apos;s everything you need to know.
            </motion.p>
          </div>
        </section>

        {/* Quick Summary */}
        <section className="mb-16 md:mb-20">
          <h2 className="mb-6 text-xl font-semibold text-copy-heading">Quick Summary</h2>
          
          {/* Mobile Slider */}
          <div className="relative flex items-center justify-center md:hidden">
            <button 
              onClick={prevCard}
              className="absolute left-0 z-10 flex h-8 w-8 items-center justify-center rounded-full text-copy-heading transition-opacity hover:opacity-70"
            >
              <ChevronLeftIcon />
            </button>

            <div className="flex justify-center w-full px-10">
              <motion.div
                key={currentCard}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="flex w-full max-w-[260px] flex-col items-center rounded-2xl border border-border-subtle bg-surface-muted p-6 text-center"
              >
                <div className="mb-4 text-teal-brand">
                  {QUICK_SUMMARY_CARDS[currentCard].icon}
                </div>
                <h3 className="mb-2 text-sm font-semibold text-copy-heading">{QUICK_SUMMARY_CARDS[currentCard].title}</h3>
                <p className="text-xs leading-relaxed text-copy-muted">{QUICK_SUMMARY_CARDS[currentCard].description}</p>
              </motion.div>
            </div>

            <button 
              onClick={nextCard}
              className="absolute right-0 z-10 flex h-8 w-8 items-center justify-center rounded-full text-copy-heading transition-opacity hover:opacity-70"
            >
              <ChevronRightIcon />
            </button>
          </div>

          {/* Desktop Grid */}
          <div className="hidden grid-cols-5 gap-3 md:grid">
            {QUICK_SUMMARY_CARDS.map((card, idx) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex flex-col items-center rounded-2xl border border-border-subtle bg-surface-muted p-5 text-center transition-shadow hover:shadow-sm"
              >
                <div className="mb-3 text-teal-brand">
                  {card.icon}
                </div>
                <h3 className="mb-1.5 text-sm font-semibold text-copy-heading">{card.title}</h3>
                <p className="text-xs leading-relaxed text-copy-muted">{card.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Warning Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 flex items-center justify-center gap-2.5 rounded-xl border border-warning/20 bg-warning/5 px-4 py-3 text-sm font-medium text-warning md:justify-start"
        >
          <DangerIcon className="h-5 w-5 shrink-0" />
          <p>We never use your conversation for advertising.</p>
        </motion.div>

        {/* Detailed Items + AI Transparency */}
        <section className="mb-16 grid-cols-1 gap-8 md:mb-20 md:grid lg:grid-cols-12">
          <div className="space-y-3 lg:col-span-7">
            {DETAILED_ITEMS.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="flex items-center gap-4 rounded-2xl border border-border-subtle bg-surface-muted p-4 transition-colors hover:bg-surface-base"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal-surface text-teal-brand">
                  {item.icon}
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-copy-heading">
                    {item.id}. {item.title}
                  </h4>
                  <p className="text-xs leading-relaxed text-copy-muted">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 flex items-start lg:col-span-5 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex w-full flex-col rounded-2xl border border-border-subtle bg-teal-surface/50 p-6"
            >
              <h3 className="text-base font-semibold text-copy-heading">AI Transparency</h3>
              <ul className="mt-4 flex flex-col gap-3">
                {AI_TRANSPARENCY_LIST.map((text, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-xs leading-relaxed text-copy-muted">
                    <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-brand" />
                    <span>{text}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </section>

        {/* Data Control */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl border border-border-subtle bg-teal-surface/30 p-8 md:p-10"
        >
          <div className="mb-8">
            <h2 className="mb-2 text-xl font-semibold text-copy-heading">Your Data, your control</h2>
            <p className="text-sm text-copy-muted">Manage your data and privacy preferences.</p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {DATA_CONTROL_CARDS.map((card) => (
              <motion.div
                key={card.title}
                whileHover={{ y: -4 }}
                className="group flex cursor-pointer items-center gap-4 rounded-2xl border border-transparent bg-surface-base p-5 shadow-sm transition-all hover:border-teal-brand/20 hover:shadow-md"
              >
                <div className="shrink-0 text-teal-brand">
                  {card.icon}
                </div>
                <div>
                  <h4 className="mb-1 text-sm font-semibold text-copy-heading">{card.title}</h4>
                  <p className="text-xs leading-snug text-copy-muted">{card.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </main>
  );
}
