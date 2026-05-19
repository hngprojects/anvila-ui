"use client";

import { useState } from "react";

type Question = {
  question: string;
  placeholder: string;
};

const QUESTIONS: Question[] = [
  { question: "What is the name of your skincarebrand", placeholder: "e.g @nior" },
  { question: "Who is your target audience", placeholder: "e.g Nior" },
  { question: "What is your brand tone", placeholder: "e.g playful and bold" },
];

export function QuestionCard() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>(QUESTIONS.map(() => ""));

  const current = QUESTIONS[currentIndex];

  function handleNext() {
    if (currentIndex < QUESTIONS.length - 1) setCurrentIndex(currentIndex + 1);
  }

  function handleSkipAll() {
    setCurrentIndex(QUESTIONS.length - 1);
  }

  function handleChange(value: string) {
    const updated = [...answers];
    updated[currentIndex] = value;
    setAnswers(updated);
  }

  return (
    <div className="w-full max-w-[579px] rounded-2xl border-[2.5px] border-[#B1B5B4] bg-[#F4F4F5] p-4 md:p-5">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-black md:text-base">Questions</span>
        <span className="text-sm font-semibold text-black md:text-base">{currentIndex + 1}/{QUESTIONS.length}</span>
      </div>

      <div className="my-3 h-px w-full bg-[#E4E4E4]" />

      <div className="flex items-center justify-between gap-3">
        <label htmlFor={`question-${currentIndex}`} className="text-sm font-semibold text-black md:text-base">{current.question}</label>
        <span className="shrink-0 text-xs font-medium text-black md:text-sm">Writ short answer</span>
      </div>

      <input
        id={`question-${currentIndex}`}
        type="text"
        value={answers[currentIndex]}
        onChange={(e) => handleChange(e.target.value)}
        placeholder={current.placeholder}
        className="mt-4 w-full rounded-md border border-[#E4E4E4] bg-[#EEEFEE]/70 px-4 py-3 text-sm font-normal text-black outline-hidden placeholder:text-[#A1A1AA] focus:outline-hidden md:text-base"
      />

      <div className="mt-4 flex items-center justify-end gap-4">
        <button type="button" onClick={handleSkipAll} className="cursor-pointer text-sm font-medium text-black hover:opacity-70 md:text-base">Skip all</button>
        <button
          type="button"
          onClick={handleNext}
          disabled={currentIndex === QUESTIONS.length - 1}
          className="cursor-pointer rounded-lg border-[0.5px] border-[#9E9F9E] bg-teal-brand px-5 py-3 text-sm font-semibold text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 md:text-base"
        >
          Next
        </button>
      </div>
    </div>
  );
}

