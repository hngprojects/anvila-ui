"use client";

import React from "react";
import { motion } from "motion/react";
import { 
  Database, 
  ShieldCheck, 
  UserCircle, 
  Share2, 
  Settings2, 
  FileText,
  Lock,
  Trash2,
  Download,
  CheckCircle2,
  Settings
} from "lucide-react";
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
    icon: <DataCollectIcon className="h-10 w-10" />,
    title: "Data we collect",
    description: "Learn about the type of data that we collect to provide and improve our services."
  },
  {
    id: 2,
    icon: <HowWeUseDataIcon className="h-10 w-10" />,
    title: "How we use Data",
    description: "Understand how we use your data to deliver and enhance your experience."
  },
  {
    id: 3,
    icon: <DataSharingIcon className="h-6 w-6" />,
    title: "Data shearing and third parties",
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

export function PrivacyPolicy() {
  const [currentCard, setCurrentCard] = React.useState(0);

  const nextCard = () => {
    setCurrentCard((prev) => (prev + 1) % QUICK_SUMMARY_CARDS.length);
  };

  const prevCard = () => {
    setCurrentCard((prev) => (prev - 1 + QUICK_SUMMARY_CARDS.length) % QUICK_SUMMARY_CARDS.length);
  };

  return (
    <main className="min-h-screen md:bg-white bg-[#F6F7F7] font-sans text-copy-muted">
      <div className="mx-auto max-w-[1440px] px-6 py-6 md:px-10 lg:px-20">
        <section 
          className="flex w-full md:max-w-[1439px] max-w-[342px] md:h-[310px] min-h-[207px] flex-col items-center text-center md:pt-[106px] pt-8 md:gap-[40px] gap-[8px] mb-8 mx-auto"
        >
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex h-20 w-20 items-center justify-center rounded-full md:border md:border-teal-brand/20 md:bg-teal-brand/5 text-teal-brand shrink-0 md:mb-0"
            >
              <ShieldPolicyIcon className="h-[56px] w-[56px]" />
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl tracking-tight text-logo md:text-5xl lg:text-6xl"
            >
              Privacy & Data Policy
            </motion.h1>
          </div>

          <div className="flex flex-col items-center gap-4">
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg font-medium text-copy-muted text-[18px]"
            >
              How your AI Agent collects, users, and protects your data.
            </motion.p>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="max-w-2xl text-[14px] leading-relaxed"
            >
              We believe in transparency and giving you control over your data. Here&apos;s everything you need to know.
            </motion.p>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="mb-6 text-xl font-bold text-logo text-center md:text-left">Quick Summary</h2>
          
          {/* Mobile Slider */}
          <div className="relative flex items-center justify-center md:hidden mb-12">
            <button 
              onClick={prevCard}
              className="absolute left-0 z-10 p-2 text-[#0C0E0D] hover:opacity-70 transition-opacity"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            <div className="flex justify-center w-full px-12">
              <motion.div
                key={currentCard}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex w-[230px] h-[188px] flex-col items-center justify-center rounded-lg border-r border-logo/10 bg-[#F4F4F5] p-6 text-center"
                style={{ gap: '16px' }}
              >
                <div>
                  {QUICK_SUMMARY_CARDS[currentCard].icon}
                </div>
                <h3 className="text-sm font-bold text-logo leading-tight">{QUICK_SUMMARY_CARDS[currentCard].title}</h3>
                <p className="text-[11px] leading-tight text-copy-muted">{QUICK_SUMMARY_CARDS[currentCard].description}</p>
              </motion.div>
            </div>

            <button 
              onClick={nextCard}
              className="absolute right-0 z-10 p-2 text-[#0C0E0D] hover:opacity-70 transition-opacity"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

          {/* Desktop Grid */}
          <div className="hidden grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 md:grid">
            {QUICK_SUMMARY_CARDS.map((card, idx) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex h-[188px] flex-col items-center justify-center rounded-lg border-r border-transparent bg-[#F4F4F5] p-6 text-center transition-all hover:shadow-sm"
              >
                <div className="mb-4">
                  {card.icon}
                </div>
                <h3 className="mb-2 text-sm font-bold text-logo">{card.title}</h3>
                <p className="text-[11px] leading-tight text-copy-muted">{card.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="mb-12 flex items-center justify-center md:justify-start gap-3 rounded-lg py-2 text-sm font-medium"
        >
          <DangerIcon className="h-5 w-5" />
          <p>We never use your conversation for advertising.</p>
        </motion.div>

        <section className="hidden md:grid mb-24 grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7 space-y-4">
            {DETAILED_ITEMS.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="flex items-center gap-4 rounded-lg bg-[#F4F4F5] p-3 transition-colors hover:bg-gray-100/80"
              >
                <div 
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F0FDFA] overflow-hidden"
                >
                  {item.icon}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-logo">
                    {item.id}. {item.title}
                  </h4>
                  <p className="text-xs text-copy-muted">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="lg:col-span-5 flex items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex w-full max-w-[495px] h-[246px] flex-col rounded-lg border border-[#9E9F9E] bg-[#FBFFFE] p-8 shadow-sm"
            >
              <h3 className="text-lg font-bold text-logo">AI Transparency</h3>
              <ul className="mt-6 flex w-full max-w-[416px] flex-col gap-4">
                {AI_TRANSPARENCY_LIST.map((text, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-xs leading-tight">
                    <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-copy-muted" />
                    <span>{text}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </section>

        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-xl border border-[#CECFCF] bg-[#F0FDFA]/28 p-10 md:p-12"
        >
          <div className="mb-8">
            <h2 className="mb-2 text-xl font-bold text-logo">Your Data, your control</h2>
            <p className="text-sm text-copy-muted">Manage your data and privacy preferences.</p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {DATA_CONTROL_CARDS.map((card, idx) => (
              <motion.div
                key={card.title}
                whileHover={{ y: -4 }}
                className="group flex cursor-pointer items-center gap-4 rounded-lg border border-transparent bg-white p-6 shadow-sm transition-all hover:border-teal-brand/20 hover:shadow-md"
              >
                <div className="shrink-0">
                  {card.icon}
                </div>
                <div>
                  <h4 className="mb-1 text-sm font-bold text-logo">{card.title}</h4>
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
