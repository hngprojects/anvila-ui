"use client";

import { useState } from "react";
import { Paperclip, X } from "lucide-react";
import { useAuth } from "@/context/auth";
import ChatInput from "@/components/ChatInput";

export default function MainPage() {
  const [prompt, setPrompt] = useState("");
  const [attachedFile, setAttachedFile] = useState<File | null>(null);
  const { user } = useAuth();

  const firstName = user?.display_name?.split(" ")[0] ?? "there";
  const hasInput = prompt.trim().length > 0 || attachedFile !== null;

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;
    setAttachedFile(file);
    e.target.value = "";
  }

  function handleRemoveFile() {
    setAttachedFile(null);
  }


const sendBtnClass = hasInput
  ? "bg-[#1a6b5a] text-white"
  : "bg-gray-200 text-gray-400 cursor-not-allowed";

  return (
    <main className="flex-1 bg-[#FBFBFB] md:rounded-2xl md:border md:border-gray-200 md:shadow-sm flex flex-col min-h-0 overflow-hidden">
      <div className="flex-1 flex flex-col items-center justify-center px-6 pb-10">
        <h1 className="text-2xl font-bold mb-8">
          What should we build, {firstName}?
        </h1>

        <div className="w-full max-w-lg">
          {/* File attachment preview */}
          {attachedFile && (
            <div className="flex items-center gap-2 mb-2 px-4 py-2 bg-white border border-gray-200 rounded-2xl shadow-sm text-sm text-gray-600">
              <Paperclip size={13} className="text-gray-400 shrink-0" />
              <span className="truncate flex-1">{attachedFile.name}</span>
              <button
                onClick={handleRemoveFile}
                className="text-gray-400 hover:text-gray-600 shrink-0"
              >
                <X size={13} />
              </button>
            </div>
          )}

          {/* Input row */}
          <ChatInput
            prompt={prompt}
            setPrompt={setPrompt}
            hasInput={hasInput}
            sendBtnClass={sendBtnClass}
            handleFileChange={handleFileChange}
          />
        </div>
      </div>
    </main>
  );
}
