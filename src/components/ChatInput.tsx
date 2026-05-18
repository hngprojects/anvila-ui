"use client";

import { ChatInputProps } from "@/interface";
import { Plus, ArrowUp } from "lucide-react";


export default function ChatInput({ prompt, setPrompt }: ChatInputProps) {

    return (
            <>
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
            </>
         
    );
}