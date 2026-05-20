"use client";

import React from "react";

interface ShortAnswerVerificationProps {
  textStep: number;
  title: string;
  placeholder: string;
  answer: string;
  onAnswerChange: (text: string) => void;
  onNext: () => void;
  onSkip: () => void;
}

export const ShortAnswerVerification: React.FC<ShortAnswerVerificationProps> = ({
  textStep,
  title,
  placeholder,
  answer,
  onAnswerChange,
  onNext,
  onSkip,
}) => {
  return (
    <div className="max-w-full flex flex-col justify-between shadow-sm w-[579px] h-[208px] rounded-[15px] border-[2.5px] border-[#B1B5B4] bg-[var(--bg-muted,#F4F4F5)] pt-[16px] pb-[16px] px-[20px] opacity-100">
      <div className="flex items-center justify-between border-b border-zinc-200 pb-1.5 text-xs font-semibold text-black">
        <span>Questions</span>
        <span className="font-mono text-zinc-500">{textStep}/3</span>
      </div>

      <div className="flex-1 min-h-0 flex flex-col justify-center py-1.5">
        <div className="flex items-center justify-between text-black mb-2 font-sans font-semibold text-[12px] leading-[100%] tracking-[0px]">
          <span>{title}</span>
          <span className="text-[10px] font-normal text-zinc-500 font-sans">
            Write short answer
          </span>
        </div>

        <div className="mt-2 transition-all duration-200 border flex items-center shadow-sm w-[537px] max-w-full h-[48px] rounded-[6px] border-[1px] border-[#E4E4E4] pt-[12px] pr-[16px] pb-[12px] pl-[16px] gap-[8px] bg-[#EEEFEEB2]">
          <input
            type="text"
            placeholder={placeholder}
            value={answer}
            onChange={(e) => onAnswerChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && answer.trim()) {
                onNext();
              }
            }}
            className="text-[20px] font-medium leading-[100%] text-left text-gray-800 placeholder-zinc-400 tracking-normal focus:outline-none bg-transparent w-full h-full font-sans"
          />
        </div>
      </div>

      <div className="flex items-center justify-end gap-6 pt-1.5 border-t border-zinc-100">
        <button
          onClick={onSkip}
          className="text-xs font-semibold text-black hover:underline cursor-pointer bg-transparent border-none"
        >
          Skip all
        </button>
        <button
          onClick={onNext}
          disabled={!answer?.trim()}
          className={`font-semibold text-xs text-white transition-all flex items-center justify-center border-[0.5px] border-[#9E9F9E] w-[73px] h-[40px] rounded-[8px] py-[12px] px-[20px] gap-[8px] ${
            answer?.trim()
              ? "bg-[#0C5D56] opacity-100 cursor-pointer"
              : "bg-[#0C5D56]/40 opacity-60 cursor-not-allowed"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};
