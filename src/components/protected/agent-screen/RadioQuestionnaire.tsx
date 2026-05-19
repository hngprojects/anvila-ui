"use client";

import React from "react";

interface RadioQuestionnaireProps {
  radioStep: number;
  title: string;
  options: string[];
  hasOther: boolean;
  selectedOption: string;
  otherText: string;
  onOptionChange: (option: string) => void;
  onOtherTextChange: (text: string) => void;
  onNext: () => void;
  onSkip: () => void;
}

export const RadioQuestionnaire: React.FC<RadioQuestionnaireProps> = ({
  radioStep,
  title,
  options,
  hasOther,
  selectedOption,
  otherText,
  onOptionChange,
  onOtherTextChange,
  onNext,
  onSkip,
}) => {
  const hasSelection = selectedOption !== "";
  const otherSelected = selectedOption === "other";

  return (
    <div className="max-w-full flex flex-col w-[593px] min-h-[296px] h-auto rounded-[15px] border border-[var(--border-default,#E4E4E7)] bg-[var(--bg-muted,#F4F4F5)] pt-[1px] pb-[1px] px-[20px] shadow-sm opacity-100">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-zinc-200 pt-3.5 pb-1.5 text-xs font-semibold text-black">
        <span>Questions</span>
        <span className="font-mono text-zinc-500">{radioStep}/3</span>
      </div>

      {/* Title */}
      <div className="flex items-center justify-between text-black mt-3 mb-1.5 font-sans font-semibold text-[12px] leading-[100%] tracking-[0px]">
        <span>{title}</span>
        <span className="text-[10px] font-normal text-zinc-500 font-sans">
          Select one answer
        </span>
      </div>

      {/* Options List — no overflow, no fixed height, grows naturally */}
      <div className="flex flex-col w-[593px] -ml-[20px] pl-[20px] opacity-100">
        {options.map((option) => {
          const isSelected = selectedOption === option;
          return (
            <label
              key={option}
              className={`flex items-center cursor-pointer text-xs transition-colors w-[486px] h-[37px] pt-[10px] pr-[16px] pb-[10px] pl-[16px] gap-[12px] opacity-100 ${
                hasSelection && !isSelected ? "text-zinc-400" : "text-zinc-950 font-medium"
              }`}
            >
              <input
                type="radio"
                name={`radio-${radioStep}`}
                checked={isSelected}
                onChange={() => onOptionChange(option)}
                className="sr-only"
              />
              <span
                className={`flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full border border-zinc-900 transition-all ${
                  isSelected ? "bg-white ring-2 ring-zinc-950" : "bg-white"
                }`}
              >
                {isSelected && <span className="h-1 w-1 rounded-full bg-zinc-950" />}
              </span>
              <span>{option}</span>
            </label>
          );
        })}

        {/* "Other" option row */}
        {hasOther && (
          <>
            <label
              className={`flex items-center cursor-pointer text-xs transition-colors w-[486px] h-[37px] pt-[10px] pr-[16px] pb-[10px] pl-[16px] gap-[12px] opacity-100 ${
                hasSelection && !otherSelected ? "text-zinc-400" : "text-zinc-950 font-medium"
              }`}
            >
              <input
                type="radio"
                name={`radio-${radioStep}`}
                checked={otherSelected}
                onChange={() => onOptionChange("other")}
                className="sr-only"
              />
              <span
                className={`flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full border border-zinc-900 transition-all ${
                  otherSelected ? "bg-white ring-2 ring-zinc-950" : "bg-white"
                }`}
              >
                {otherSelected && <span className="h-1 w-1 rounded-full bg-zinc-950" />}
              </span>
              <span>other</span>
            </label>

            {/* Input field — directly below "other", only when selected */}
            {otherSelected && (
              <div className="pl-[16px] pb-[10px] pt-[2px]">
                <input
                  type="text"
                  placeholder="pinterest post"
                  value={otherText}
                  onChange={(e) => onOtherTextChange(e.target.value)}
                  className="w-[344px] h-[41px] rounded-[6px] border border-[#E4E4E4] bg-[#EEEFEEB2] pt-[12px] pr-[16px] pb-[12px] pl-[16px] font-sans font-normal text-[16px] leading-[24px] tracking-[0px] text-gray-800 placeholder-zinc-400 focus:outline-none"
                />
              </div>
            )}
          </>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end gap-6 mt-auto pt-2 pb-3.5 border-t border-zinc-100">
        <button
          onClick={onSkip}
          className="text-xs font-semibold text-black hover:underline cursor-pointer bg-transparent border-none"
        >
          Skip all
        </button>
        <button
          onClick={onNext}
          disabled={!selectedOption || (otherSelected && !otherText.trim())}
          className={`font-semibold text-xs text-white transition-all flex items-center justify-center border-[0.5px] border-[#9E9F9E] w-[73px] h-[40px] rounded-[8px] py-[12px] px-[20px] gap-[8px] ${
            selectedOption && !(otherSelected && !otherText.trim())
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
