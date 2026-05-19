"use client";

import { useRef, useState } from "react";
import { Plus, ArrowUp, FileText } from "lucide-react";
import { ChatInputProps } from "@/interface";

export default function ChatInput({ 
  prompt, 
  setPrompt, 
  hasInput, 
  sendBtnClass, 
  handleFileChange 
}: ChatInputProps) {
  const [showMenu, setShowMenu] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleAddDocs() {
    setShowMenu(false);
    fileInputRef.current?.click();
  }

  return (
    <div className="relative flex items-center gap-2 border rounded-full px-4 py-3 bg-white shadow-sm">
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        onChange={handleFileChange}
      />

      {/* Plus button */}
      <div className="relative">
        <button
          onClick={() => setShowMenu((v) => !v)}
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <Plus size={15} />
        </button>

        {/* Dropdown menu */}
        {showMenu && (
          <>
            <div
              className="fixed inset-0 z-10"
              onClick={() => setShowMenu(false)}
            />
            <div className="absolute bottom-9 left-0 z-20 bg-[#e5e5e5] rounded-xl shadow-md overflow-hidden min-w-[160px]">
              <button
                onClick={handleAddDocs}
                className="flex items-center gap-2 w-full px-4 py-2.5 text-sm font-medium text-black hover:bg-[#d4d4d4] transition-colors"
              >
                <FileText size={14} className="text-black" />
                Add docs / files
              </button>
            </div>
          </>
        )}
      </div>

      <input
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Describe your agent..."
        className="flex-1 text-sm bg-transparent outline-none text-black placeholder:text-gray-400"
      />

      {/* Send button */}
      <button
        disabled={!hasInput}
        className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${sendBtnClass}`}
      >
        <ArrowUp size={15} />
      </button>
    </div>
  );
}