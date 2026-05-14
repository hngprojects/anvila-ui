"use client";

import { useState } from "react";
import { ChevronDownIcon } from "@/components/icons";

const ENQUIRY_OPTIONS = [
  "General Enquiry",
  "Technical Support",
  "Partnerships & Enterprise",
  "Media & Press",
  "Billing & Payments",
];

interface ContactCard {
  icon: React.ReactNode;
  title: string;
  description: string;
  responseTime?: string;
  email: string;
  highlighted?: boolean;
}

const CONTACT_CARDS: ContactCard[] = [
  {
    icon: <TechnicalSupportIcon />,
    title: "Technical Support",
    description:
      "Struggling with a GitHub sync or the dna.md structure? Our developers are here to help you troubleshoot your Forge.",
    responseTime: "Under 24 hours",
    email: "anvila.dev@gmail.com",
  },
  {
    icon: <PartnershipIcon />,
    title: "Partnerships & Enterprise",
    description:
      'Looking for private registries or custom "Agent DNA" for your organization?\n Let\'s build a tailored solution',
    email: "anvila.dev@gmail.com",
    highlighted: true,
  },
  {
    icon: <MediaIcon />,
    title: "Media & Press",
    description:
      "Interested in featuring Anvila's mission to standardize portable intelligence?",
    email: "anvila.dev@gmail.com",
  },
];

 function TechnicalSupportIcon() {
  return (
    <img
      src="/icons/Icon.png"
      alt="Technical Support"
      width={48}
      height={48}
    />
  );
}

function PartnershipIcon() {
  return (
    <img
      src="/icons/Icon (1).png"
      alt="Partnerships & Enterprise"
      width={48}
      height={48}
    />
  );
}

function MediaIcon() {
  return (
    <img
      src="/icons/Icon (2).png"
      alt="Media & Press"
      width={48}
      height={48}
    />
  );
}

export function Contact() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedEnquiry, setSelectedEnquiry] = useState("");

  const handleSelectEnquiry = (option: string) => {
    setSelectedEnquiry(option);
    setIsDropdownOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
    
      <section className="w-full bg-[#F8FAFC] py-10 sm:py-20">
        <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center gap-4 px-5 text-center sm:px-10 lg:px-20">
          <div className="flex items-center gap-2 rounded-full border border-[#A1A1AA]/50 px-3 py-1.5">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-warning" />
            <span className="text-xs font-medium tracking-[0.08em] text-copy-muted">
              CONTACT US
            </span>
          </div>

          <h1 className="font-['Geist',_Inter,_sans-serif] text-2xl font-medium leading-8 text-[#000000] sm:text-4xl sm:leading-tight lg:text-[48px] lg:leading-[56px]">
            Need any help? Contact us
          </h1>

          <p className="max-w-lg text-sm leading-6 text-copy-muted sm:text-base">
            Have questions about the Anvila protocol or need help scaling your AI
            workforce? Our team of architects is ready to assist.
          </p>
        </div>
      </section>

    
      <section className="w-full bg-[#F8FAFC] flex justify-center items-center px-4 sm:px-6">
        <div className="mx-auto w-full max-w-[1063px] rounded-[20px] px-4 py-6 sm:px-10 sm:py-[36px] md:px-[109px] bg-[#FFFFFF]">
          <h2 className="mb-8 text-center text-[18px] font-bold leading-6 text-[#000000] sm:text-[30px] sm:leading-[38px]">
            Get in Touch
          </h2>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col items-center gap-6"

          >
        
            <div className="grid w-full max-w-[845px] grid-cols-1 gap-6 sm:grid-cols-2">

              <div className="flex flex-col gap-1.5">
                <label className="text-[14px] sm:text-[18px] font-medium leading-6 text-[#000000]">
                  Full Name<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter full name"
                  className="h-[44px] w-full rounded-[6px] border border-[#B1B5B4] bg-white p-[10px] text-[14px] sm:text-[18px] font-medium leading-6 text-[#000000] placeholder:text-[#A1A1AA] focus:bo

                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[14px] sm:text-[18px] font-medium leading-6 text-[#111928]">
                  Email Address<span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="h-[44px] w-full rounded-[6px] border border-[#B1B5B4] bg-white p-[10px] text-[14px] sm:text-[18px] font-medium leading-6 text-[#000000] placeholder:text-[#A1A1AA] focus:bo
                />
              </div>
            </div>

         
            <div className="grid w-full max-w-[845px] grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <label className="text-[14px] sm:text-[18px] font-medium leading-6 text-[#111928]">
                  Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="+234- 00000-00000"
                  className="h-[44px] w-full rounded-[6px] border border-[#B1B5B4] bg-white p-[10px] text-[14px] sm:text-[18px] font-medium leading-6 text-[#000000] placeholder:text-[#A1A1AA] focus:bo

                />
              </div>
              <div className="relative flex flex-col gap-1.5">
                <label className="text-[14px] sm:text-[18px] font-medium leading-6 text-[#111928]">
                  Enquiry Type
                </label>
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex h-[44px] w-full items-center justify-between rounded-[6px] border border-[#B1B5B4] bg-white p-[10px] text-[14px] sm:text-[18px] font-medium leading-6 focus:border-tea

                >
                  <span
                    className={
                      selectedEnquiry ? "text-[#000000]" : "text-[#A1A1AA]"
                    }
                  >
                    {selectedEnquiry || "Enquiry"}
                  </span>
                  <span
                    className={`transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
                  >
                    <ChevronDownIcon />
                  </span>
                </button>

                {isDropdownOpen && (
                  <ul className="absolute top-full left-0 z-10 mt-1 w-full rounded-[6px] border border-[#B1B5B4] bg-white py-1 shadow-lg">
                    {ENQUIRY_OPTIONS.map((option) => (
                      <li key={option}>
                        <button
                          type="button"
                          onClick={() => handleSelectEnquiry(option)}
                          className="w-full px-[10px] py-2 text-left   text-[16px] font-medium leading-6 text-[#000000] transition-colors hover:bg-[#F4F4F5]"
                        >
                          {option}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

          
            <div className="flex w-full max-w-[845px] flex-col gap-1.5">
              <label className="text-[14px] sm:text-[18px] font-medium leading-6 text-[#111928]">
                How can we help you?<span className="text-red-500">*</span>
              </label>
              <textarea
                placeholder="Write your message here..."
                className="h-[200px] w-full resize-none rounded-[16px] border border-[#A1A1AA] bg-white p-[10px] text-[14px] sm:text-[18px] font-medium leading-6 text-[#111928] placeholder:text-[#A1A1
              />
            </div>

          
            <button
              type="submit"
              className="h-[48px] w-full max-w-[845px] rounded-[8px] border-[0.5px] border-[#004C48] bg-[#004C48] px-5 py-3 text-[14px] sm:text-[18px] font-medium leading-6 text-white transition-opaci
            >
              Send Message
            </button>
          </form>
        </div>
      </section>

      
      <section className="w-full py-10 sm:py-16 bg-[#F8FAFC]">
        <div className="mx-auto grid w-full max-w-[1440px] grid-cols-1 gap-6 px-5 sm:px-10 md:grid-cols-3 lg:px-20 bg-[#F8FAFC]">
          {CONTACT_CARDS.map((card) => (
            <div
              key={card.title}
              className={`flex flex-col gap-4 rounded-[12px] p-6 ${
                card.highlighted
                  ? "bg-teal-brand text-white"
                  : "bg-[#FFFFFF] text-[#111928] border border-[#E4E4E7]"
              }`}
            >
              {card.icon}
              <h3
                className={`text-lg font-semibold ${card.highlighted ? "text-white" : "text-[#111928]"}`}
              >
                {card.title}
              </h3>
              <p
                className={`text-sm leading-relaxed ${card.highlighted ? "text-white/80" : "text-copy-muted"}`}
              >
                {card.description}
              </p>

              {card.responseTime && (
                <p
                  className={`text-xs font-medium ${card.highlighted ? "text-white/70" : "text-[#0D9488]"}`}
                >
                  <span>
                    Response time: {card.responseTime}
                  </span>
                </p>
              )}

              {card.highlighted && (
                <hr className="border-t border-white/30" />
              )}

              <p
                className={`text-sm font-medium ${card.highlighted ? "text-white" : "text-[#111928]"}`}
              >
                Email: {card.email}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
