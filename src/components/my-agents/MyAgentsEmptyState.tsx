"use client";

import Link from "next/link";
import { Logo } from "@/components/icons";

export default function MyAgentsEmptyState() {
  return (
    <div className="flex flex-col w-full h-full bg-[#FBFBFB]">

      <main className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <div className="mb-4 flex justify-center">
          <Logo />
        </div>
        
        <h2 className="text-xl font-bold text-gray-900 mb-3">
          No Agents created yet
        </h2>
        
        <p className="text-sm text-gray-500 max-w-[340px] leading-relaxed mb-8">
          When new agents are created on Anvila, they&apos;ll appear here. You can then manage your agents, edit and push to Github
        </p>
        
        <Link 
          href="/generator"
          className="inline-flex items-center justify-center w-[320px] h-[48px] gap-[6px] rounded-[8px] pt-[6.4px] pb-[6.4px] pl-[4px] pr-[4px] bg-[#005F5A] text-sm font-medium text-white hover:bg-[#004f4a] transition-colors mt-[32px]"
        >
          <span>+</span> Create Agent
        </Link>
      </main>
    </div>
  );
}
