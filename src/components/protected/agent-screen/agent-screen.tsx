"use client";

import { useState, useRef, useEffect } from "react";
import {
  Plus,
  ArrowUp,
  Square,
 
  ThumbsDown,
  Copy,
  MoreHorizontal,
  Pencil,
  RotateCw,
  FileText,
  ChevronDown,
  ChevronRight,
  Users,
  AlertCircle,
 
} from "lucide-react";
import { ThumbsDownIcon, ThumbsUpIcon } from "@/components/icons";

type StateType = 1 | 2 | 3 | 4 | 5;

export default function AgentScreen() {
  const [activeState, setActiveState] = useState<StateType>(1);
  const [prompt, setPrompt] = useState("");
  const [copied, setCopied] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
 
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

 
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeState]);

  return (
    <main className="flex-1 bg-[#FBFBFB] md:rounded-2xl md:border md:border-gray-200 md:shadow-sm flex flex-col min-h-0 overflow-hidden relative">
     
     

      <div className="flex-1 overflow-y-auto px-4 md:px-8 pt-16 pb-6 space-y-8 scrollbar-hide">
        <div className="text-center text-xs text-gray-500 font-medium py-2">
          Apr 29 at 12:49 AM
        </div>
        <div className="flex flex-col items-end space-y-1.5 max-w-3xl ml-auto">
          <div className="bg-[#F3F4F6] text-gray-800 text-[15px] px-5 py-3 rounded-[20px] max-w-[85%] shadow-sm leading-relaxed">
            Build a content creator for skincare brand
          </div>
          <div className="flex items-center gap-3 pr-2">
            <button className="text-gray-400 hover:text-gray-600 transition-colors" title="Edit prompt">
              <Pencil size={14} />
            </button>
            <button className="text-gray-400 hover:text-gray-600 transition-colors" title="Retry prompt">
              <RotateCw size={14} />
            </button>
          </div>
        </div>

        <div className="flex flex-col items-start space-y-2 max-w-3xl mr-auto">
          <div className="bg-[#F3F4F6]/50 text-[#0c5d56] italic text-[15px] px-5 py-3.5 rounded-[20px] max-w-[90%] border border-gray-100/50 leading-relaxed">
            I&apos;d love to build this for you! Let me ask a couple of quick questions to make sure I create exactly what you envision ...
          </div>
          <div className="flex items-center gap-3.5 pl-2 text-gray-400">
            <button className="hover:text-gray-600 transition-colors"><ThumbsUpIcon /></button>
            <button className="hover:text-gray-600 transition-colors"><ThumbsDownIcon /></button>
            <button
              onClick={() => handleCopy("I'd love to build this for you! Let me ask a couple of quick questions to make sure I create exactly what you envision ...")}
              className="hover:text-gray-600 transition-colors relative"
            >
              <Copy size={14} />
              {copied && <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] bg-black text-white px-1.5 py-0.5 rounded">Copied!</span>}
            </button>
            <button className="hover:text-gray-600 transition-colors"><MoreHorizontal size={14} /></button>
          </div>
        </div>

        {/* 3. User Second Request */}
        <div className="flex flex-col items-end space-y-1.5 max-w-3xl ml-auto">
          <div className="bg-[#F3F4F6] text-gray-800 text-[15px] px-5 py-3 rounded-[20px] max-w-[85%] shadow-sm leading-relaxed">
            Agent type: content creator for a skincare brand and automates snapchat
          </div>
          <div className="flex items-center gap-3 pr-2">
            <button className="text-gray-400 hover:text-gray-600 transition-colors"><Pencil size={14} /></button>
            <button className="text-gray-400 hover:text-gray-600 transition-colors"><RotateCw size={14} /></button>
          </div>
        </div>

        {/* 4. Assistant Second Response */}
        <div className="flex flex-col items-start space-y-2 max-w-3xl mr-auto">
          <div className="bg-[#F3F4F6]/50 text-[#0c5d56] italic text-[15px] px-5 py-3.5 rounded-[20px] max-w-[90%] border border-gray-100/50 leading-relaxed">
            Got it - Agent Anatassia Rhodes content creator for a skincare brand. Let&apos;s verify some info about your brand before proceeding...
          </div>
          <div className="flex items-center gap-3.5 pl-2 text-gray-400">
            <button className="hover:text-gray-600 transition-colors"><ThumbsUpIcon className="" /></button>
            <button className="hover:text-gray-600 transition-colors"><ThumbsDownIcon className="" /></button>
            <button
              onClick={() => handleCopy("Got it - Agent Anatassia Rhodes content creator for a skincare brand. Let's verify some info about your brand before proceeding...")}
              className="hover:text-gray-600 transition-colors"
            >
              <Copy size={14} />
            </button>
            <button className="hover:text-gray-600 transition-colors"><MoreHorizontal size={14} /></button>
          </div>
        </div>

        {/* 5. Assistant Third Response */}
        <div className="flex flex-col items-start space-y-2 max-w-3xl mr-auto">
          <div className="bg-[#F3F4F6]/50 text-[#0c5d56] italic text-[15px] px-5 py-3.5 rounded-[20px] max-w-[90%] border border-gray-100/50 leading-relaxed">
            Got it- Nior is a skincare brand for middle aged women. Forging agent...
          </div>
          <div className="flex items-center gap-3.5 pl-2 text-gray-400">
            <button className="hover:text-gray-600 transition-colors"><ThumbsUpIcon className="" /></button>
            <button className="hover:text-gray-600 transition-colors"><ThumbsDownIcon className="" /></button>
            <button
              onClick={() => handleCopy("Got it- Nior is a skincare brand for middle aged women. Forging agent...")}
              className="hover:text-gray-600 transition-colors"
            >
              <Copy size={14} />
            </button>
            <button className="hover:text-gray-600 transition-colors"><MoreHorizontal size={14} /></button>
          </div>
        </div>

        {/* ---------------- STATE-SPECIFIC BLOCKS ---------------- */}

        {/* STATE 1: Generating Identity File */}
        {activeState === 1 && (
          <div className="flex flex-col items-start space-y-4 max-w-2xl mr-auto pl-2 animate-fade-in">
            {/* Generating Identity Header */}
            <div className="flex items-center gap-2.5 text-sm text-[#0c5d56] font-medium">
              <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700">
                <Users size={13} className="animate-pulse" />
              </div>
              <span className="italic">
                Generating Identity <span className="text-gray-400">files...</span>
              </span>
              <ChevronDown size={15} className="text-gray-400" />
            </div>

            {/* Skincare Brand AI Content Creator Agent Card */}
            <div className="w-full bg-white border border-gray-200/80 rounded-2xl shadow-sm overflow-hidden flex flex-col max-h-[300px]">
              {/* Header of Card */}
              <div className="flex items-center gap-2.5 px-5 py-4 border-b border-gray-100">
                <FileText size={18} className="text-gray-500 shrink-0" />
                <h3 className="font-semibold text-gray-700 text-sm truncate">
                  Skincare brand AI content creator agent
                </h3>
              </div>

              {/* Card Code Content (Markdown/Text block) */}
              <div className="flex-1 overflow-y-auto p-5 font-mono text-[13px] text-gray-600 leading-relaxed bg-[#FAFAFA]/55">
                <div className="space-y-4">
                  <div>
                    <span className="text-gray-400"># Identity</span>
                  </div>
                  <div>
                    <span className="text-gray-400"># Core Purpose</span>
                    <p className="mt-1 text-gray-700 font-sans">You are a content creator designed for a skincare brand Nior.</p>
                  </div>
                  <div>
                    <span className="text-gray-400">#Primary Responsibilities</span>
                    <ol className="mt-1 list-decimal pl-5 space-y-1 font-sans text-gray-700">
                      <li>Generate multiple content materials</li>
                      <li>Automate product campaigns for new collections</li>
                      <li>Stay current with industry best practices and emerging trends</li>
                    </ol>
                  </div>
                  <div>
                    <span className="text-gray-400">## Communication Style</span>
                    <p className="mt-1 text-gray-700 font-sans">Professional, insightful, and results-oriented.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STATE 2: Interrupted */}
        {activeState === 2 && (
          <div className="flex flex-col items-start space-y-4 max-w-2xl mr-auto pl-2 animate-fade-in">
            {/* Generating Identity Header (expanded/static) */}
            <div className="flex items-center gap-2.5 text-sm text-[#0c5d56] font-medium">
              <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700">
                <Users size={13} />
              </div>
              <span className="italic">
                Generating Identity <span className="text-gray-400">files...</span>
              </span>
              <ChevronDown size={15} className="text-gray-400" />
            </div>

            {/* Skincare Brand Card */}
            <div className="w-full bg-white border border-gray-200/80 rounded-2xl shadow-sm overflow-hidden flex flex-col max-h-[300px]">
              <div className="flex items-center gap-2.5 px-5 py-4 border-b border-gray-100">
                <FileText size={18} className="text-gray-500 shrink-0" />
                <h3 className="font-semibold text-gray-700 text-sm truncate">
                  Skincare brand AI content creator agent
                </h3>
              </div>
              <div className="flex-1 overflow-y-auto p-5 font-mono text-[13px] text-gray-600 leading-relaxed bg-[#FAFAFA]/55">
                <div className="space-y-4">
                  <div>
                    <span className="text-gray-400"># Identity</span>
                  </div>
                  <div>
                    <span className="text-gray-400"># Core Purpose</span>
                    <p className="mt-1 text-gray-700 font-sans">You are a content creator designed for a skincare brand Nior.</p>
                  </div>
                  <div>
                    <span className="text-gray-400">#Primary Responsibilities</span>
                    <ol className="mt-1 list-decimal pl-5 space-y-1 font-sans text-gray-700">
                      <li>Generate multiple content materials</li>
                      <li>Automate product campaigns for new collections</li>
                      <li>Stay current with industry best practices and emerging trends</li>
                    </ol>
                  </div>
                  <div>
                    <span className="text-gray-400">## Communication Style</span>
                    <p className="mt-1 text-gray-700 font-sans">Professional, insightful, and results-oriented.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Red Interruption Text & Actions */}
            <div className="w-full space-y-2">
              <div className="text-red-500 text-sm font-medium italic pl-1 flex items-center gap-1.5">
                <AlertCircle size={14} className="shrink-0" />
                Agent Forge response was interrupted!
              </div>
              <div className="flex items-center gap-3.5 pl-1 text-gray-400">
                <button className="hover:text-gray-600 transition-colors"><ThumbsUpIcon className="" /></button>
                <button className="hover:text-gray-600 transition-colors"><ThumbsDownIcon className="" /></button>
                <button className="hover:text-gray-600 transition-colors"><Copy size={14} /></button>
                <button className="hover:text-gray-600 transition-colors"><MoreHorizontal size={14} /></button>
              </div>
            </div>
          </div>
        )}

        {/* STATE 3: Matching Agent Skills */}
        {activeState === 3 && (
          <div className="flex flex-col items-start space-y-4 max-w-2xl mr-auto pl-2 animate-fade-in">
            {/* Matching agent skills Header */}
            <div className="flex items-center gap-2.5 text-sm text-[#0c5d56] font-medium">
              <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700">
                <Users size={13} className="animate-pulse" />
              </div>
              <span className="italic">
                Matching agent <span className="text-gray-400">skills...</span>
              </span>
              <ChevronRight size={15} className="text-gray-400" />
            </div>
          </div>
        )}

        {/* STATE 4: Generating Personalities File */}
        {activeState === 4 && (
          <div className="flex flex-col items-start space-y-4 max-w-2xl mr-auto pl-2 animate-fade-in">
            {/* Generating personalities files Header */}
            <div className="flex items-center gap-2.5 text-sm text-[#0c5d56] font-medium">
              <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700">
                <Users size={13} className="animate-pulse" />
              </div>
              <span className="italic">
                Generating personalities <span className="text-gray-400">files...</span>
              </span>
              <ChevronRight size={15} className="text-gray-400" />
            </div>
          </div>
        )}

        {/* STATE 5: Done Successfully */}
        {activeState === 5 && (
          <div className="flex flex-col items-start space-y-3.5 max-w-2xl mr-auto pl-2 animate-fade-in">
            {/* Done text */}
            <div className="bg-[#F3F4F6]/50 text-[#0c5d56] italic text-[15px] px-5 py-3.5 rounded-[20px] max-w-[90%] border border-gray-100/50 leading-relaxed">
              Done! Successfully created content creator- Anatassia Rhodes....
            </div>

            {/* Forged Anatassia Card */}
            <div className="w-[380px] max-w-full bg-white border border-gray-200/80 rounded-2xl p-4 shadow-sm flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-500 border border-gray-100 shrink-0">
                  <FileText size={20} />
                </div>
                <div className="min-w-0">
                  <h4 className="text-sm font-semibold text-gray-700 truncate">
                    Forged Anatassia
                  </h4>
                  <p className="text-xs text-gray-400 truncate">
                    content creator agent
                  </p>
                </div>
              </div>
              <button className="px-4 py-1.5 rounded-full text-xs font-semibold text-gray-600 bg-white border border-gray-200 hover:bg-gray-50 shadow-sm transition-all shrink-0">
                Preview
              </button>
            </div>

            {/* Action Bar */}
            <div className="flex items-center gap-3.5 pl-2 text-gray-400">
              <button className="hover:text-gray-600 transition-colors"><ThumbsUpIcon className="" /></button>
              <button className="hover:text-gray-600 transition-colors"><ThumbsDown size={14} /></button>
              <button className="hover:text-gray-600 transition-colors"><Copy size={14} /></button>
              <button className="hover:text-gray-600 transition-colors"><MoreHorizontal size={14} /></button>
            </div>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* ---------------- BOTTOM CONTROLLER INPUT BAR ---------------- */}
      <div className="px-6 py-5 bg-[#FBFBFB] md:border-t md:border-gray-100 shrink-0">
        <div className="w-full max-w-3xl mx-auto">
          <div className="flex items-center gap-2 border border-gray-200 rounded-full px-5 py-3.5 bg-white shadow-sm focus-within:border-emerald-600/40 focus-within:ring-2 focus-within:ring-emerald-500/5 transition-all">
            {/* Plus Icon */}
            <button className="text-gray-400 hover:text-gray-600 shrink-0" title="Attach file">
              <Plus size={18} />
            </button>

            {/* Input field */}
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe your agent..."
              className="flex-1 text-[15px] bg-transparent outline-none text-gray-800 placeholder-gray-400"
              onKeyDown={(e) => {
                if (e.key === "Enter" && prompt.trim() !== "") {
                  // Simulate transition on enter
                  setPrompt("");
                  if (activeState < 5) {
                    setActiveState((prev) => (prev + 1) as StateType);
                  } else {
                    setActiveState(1);
                  }
                }
              }}
            />

            {/* Action Button: Stop or Send */}
            {activeState === 1 || activeState === 3 || activeState === 4 ? (
              <button
                onClick={() => {
                  // Stop generation / go to state 2 (interrupted) or toggle idle
                  setActiveState(2);
                }}
                className="w-9 h-9 rounded-full bg-[#0c5d56] text-white flex items-center justify-center shadow-md hover:bg-[#005f5a] transition-all shrink-0 cursor-pointer"
                title="Stop generation"
              >
                <Square size={13} fill="white" className="text-white" />
              </button>
            ) : (
              <button
                onClick={() => {
                  // Advance or cycle
                  if (activeState === 2) {
                    setActiveState(3);
                  } else {
                    setActiveState(1);
                  }
                }}
                className="w-9 h-9 rounded-full bg-[#0c5d56] text-white flex items-center justify-center shadow-md hover:bg-[#005f5a] transition-all shrink-0 cursor-pointer"
                title="Send description"
              >
                <ArrowUp size={16} strokeWidth={2.5} />
              </button>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
