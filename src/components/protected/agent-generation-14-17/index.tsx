"use client";

import { useState } from "react";
import { ThumbsUp, ThumbsDown, Copy, MoreHorizontal, Loader2 } from "lucide-react";
import ChatCard from "./chat-card";

export default function AgentGenerationFlow() {
  const [step, setStep] = useState(1);
  const [targetAudience, setTargetAudience] = useState("Middle aged women between 30-40 years");
  const [postFrequency, setPostFrequency] = useState("");

  const handleNext = () => {
    if (step === 1) {
      setStep(2);
    } else if (step === 2 && !postFrequency) {
      setPostFrequency("2-3 times per day");
      setStep(3);
    } else {
      setStep(4);
    }
  };

  return (
    <div className="space-y-6">
      {/* User Message 1 */}
      <div className="flex justify-end">
        <div className="bg-gray-100 text-gray-800 rounded-2xl px-4 py-2.5 max-w-[85%] md:max-w-[70%]">
          Build a content creator for skincare brand
        </div>
      </div>

      {/* Bot Message 1 */}
      <div className="space-y-2">
        <div className="text-[#1a6b5a] italic bg-[#1a6b5a]/5 rounded-2xl px-4 py-2.5 max-w-[85%] md:max-w-[70%]">
          {"I'd love to build this for you! Let me ask a couple of quick questions to make sure I create exactly what you envision..."}
        </div>
        <div className="flex items-center gap-3 text-gray-400 pl-2">
          <button className="hover:text-gray-600"><ThumbsUp size={14} /></button>
          <button className="hover:text-gray-600"><ThumbsDown size={14} /></button>
          <button className="hover:text-gray-600"><Copy size={14} /></button>
          <button className="hover:text-gray-600"><MoreHorizontal size={14} /></button>
        </div>
      </div>

      {/* User Message 2 */}
      <div className="flex justify-end">
        <div className="bg-gray-100 text-gray-800 rounded-2xl px-4 py-2.5 max-w-[85%] md:max-w-[70%]">
          Agent type: content creator for a skincare brand and automates snapchat
        </div>
      </div>

      {/* Bot Message 2 */}
      <div className="space-y-2">
        <div className="text-[#1a6b5a] bg-[#1a6b5a]/5 rounded-2xl px-4 py-2.5 max-w-[85%] md:max-w-[70%]">
          {"Got it - Agent Anatassia Rhodes content creator for a skincare brand. Let's verify some info about your brand before proceeding..."}
        </div>
        <div className="flex items-center gap-3 text-gray-400 pl-2">
          <button className="hover:text-gray-600"><ThumbsUp size={14} /></button>
          <button className="hover:text-gray-600"><ThumbsDown size={14} /></button>
          <button className="hover:text-gray-600"><Copy size={14} /></button>
          <button className="hover:text-gray-600"><MoreHorizontal size={14} /></button>
        </div>
      </div>

      {/* Screens 14 - 16 */}
      {step <= 3 && (
        <ChatCard
          step={step}
          targetAudience={targetAudience}
          setTargetAudience={setTargetAudience}
          postFrequency={postFrequency}
          setPostFrequency={setPostFrequency}
          onNext={handleNext}
          onPrev={() => setStep((p) => Math.max(1, p - 1))}
        />
      )}

      {/* Screen 17: Generating State */}
      {step === 4 && (
        <div className="space-y-4">
          <div className="text-[#1a6b5a] bg-[#1a6b5a]/5 rounded-2xl px-4 py-2.5 max-w-[85%] md:max-w-[70%]">
            Got it- Nior is a skincare brand for middle aged women. Forging agent...
          </div>
          <div className="flex items-center gap-3 text-gray-400 pl-2">
            <button className="hover:text-gray-600"><ThumbsUp size={14} /></button>
            <button className="hover:text-gray-600"><ThumbsDown size={14} /></button>
            <button className="hover:text-gray-600"><Copy size={14} /></button>
            <button className="hover:text-gray-600"><MoreHorizontal size={14} /></button>
          </div>

          <div className="flex items-center gap-2 text-xs font-medium text-[#1a6b5a] pl-2 cursor-pointer" onClick={() => setStep(1)}>
            <Loader2 size={14} className="animate-spin" />
            <span>Generating Identity files...</span>
            <span className="text-gray-400 text-[10px] ml-4">(Reset)</span>
          </div>
        </div>
      )}
    </div>
  );
}