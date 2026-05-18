"use client";

import { useState } from "react";
import type { User } from "@/types";
import { Plus, ArrowUp } from "lucide-react";

type MainContentProps = {
  user?: User;
};

export default function MainPage({ user }: MainContentProps) {
  const [prompt, setPrompt] = useState("");

  const firstName = user?.display_name?.split(" ")[0] ?? "there";

  return (
    <main className="flex-1 bg-[#FBFBFB] md:rounded-2xl md:border md:border-gray-200 md:shadow-sm flex flex-col min-h-0 overflow-hidden">
      <div className="flex-1 flex flex-col items-center justify-center text-[40px] font-bold px-6 pb-10">
        <h1 className="text-2xl font-bold mb-8">
          What should we build, {firstName}?
        </h1>

        <div className="w-full max-w-lg">
          <div className="flex items-center gap-2 border rounded-full px-4 py-3 bg-white shadow-sm">
            <Plus size={15} />
            <input
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe your agent..."
              className="flex-1 text-sm bg-transparent outline-none"
            />
            <button className="w-8 h-8 rounded-full bg-[#1a6b5a] text-white flex items-center justify-center">
              <ArrowUp size={15} />
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}