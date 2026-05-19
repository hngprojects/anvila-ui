"use client";

import { useRef, useState } from "react";
import { Plus, ArrowUp, Paperclip, X, FileText } from "lucide-react";
import { useAuth } from "@/context/auth";

export default function MainPage() {
  const [prompt, setPrompt] = useState("");
  const [attachedFile, setAttachedFile] = useState<File | null>(null);
  const [showMenu, setShowMenu] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
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

  function handleAddDocs() {
    setShowMenu(false);
    fileInputRef.current?.click();
  }

  // Button classes:
  // mobile  (no md prefix): green bg when empty → transparent bg when has input
  // desktop (md prefix):    gray bg when empty  → green bg when has input
  const sendBtnClass = hasInput
    ? "bg-transparent text-[#1a6b5a] md:bg-[#1a6b5a] md:text-white"
    : "bg-[#1a6b5a] text-white md:bg-gray-200 md:text-gray-400 md:cursor-not-allowed";

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
        </div>
      </div>
    </main>
  );
}
