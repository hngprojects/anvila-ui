"use client";

import { useState } from "react";
import { Plus, ArrowUp } from "lucide-react";
import { useAuth } from "@/context/auth";
import ChatInput from "../ChatInput";



export default function MainPage() {
  const [prompt, setPrompt] = useState("");
   const { user } = useAuth();

  const firstName = user?.display_name?.split(" ")[0] ?? "there";

  return (
    <main className="flex-1 bg-[#FBFBFB] md:rounded-2xl md:border md:border-gray-200 md:shadow-sm flex flex-col min-h-0 overflow-hidden">
      <div className="flex-1 flex flex-col items-center justify-center text-[40px] font-bold px-6 pb-10">
        <h1 className="text-2xl font-bold mb-8">
          What should we build, {firstName}?
        </h1>
        <ChatInput prompt={prompt} setPrompt={setPrompt}/>
      </div>
    </main>
  );
}