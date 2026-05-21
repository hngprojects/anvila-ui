"use client";

import React from "react";
import Link from "next/link";
import { Bell } from "lucide-react";
import { Logo } from "@/components/icons";

export default function MyAgentsEmptyState() {
  return (
    <div className="flex flex-col w-full h-full bg-[#FBFBFB]">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-gray-100 shrink-0">
        <h1 className="text-lg font-bold text-gray-900">My Agents</h1>
        <div className="relative cursor-pointer text-gray-600 hover:text-gray-900 transition-colors">
          <Bell size={20} />
          {/* Notification dot */}
          <span className="absolute top-0 right-0 w-2 h-2 bg-[#1a6b5a] rounded-full ring-2 ring-[#FBFBFB]" />
        </div>
      </header>

      {/* Main Content (Centered) */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <div className="mb-6 flex justify-center">
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
          className="inline-flex items-center justify-center rounded-lg bg-[#005F5A] px-6 py-2.5 text-sm font-medium text-white hover:bg-[#004f4a] transition-colors gap-2"
        >
          <span>+</span> Create Agent
        </Link>
      </main>
    </div>
  );
}
