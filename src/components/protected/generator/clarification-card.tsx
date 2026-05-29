"use client";

import { useState } from "react";
import {
  ArrowRight,
  Loader2,
} from "lucide-react";

import type { ClarificationAnswer } from "@/components/protected/generator/api";
import { ClarificationPayload } from "@/types/agent";

interface ClarificationCardProps {
  payload: ClarificationPayload;
  readOnly?: boolean;
  answers?: ClarificationAnswer[];
  isSubmitting?: boolean;
  onSubmit?: (answers: ClarificationAnswer[]) => void;
}

export default function ClarificationCard({
  payload,
  answers: submittedAnswers,
  isSubmitting,
  onSubmit,
}: ClarificationCardProps) {
  const [answers, setAnswers] = useState<Record<string, string>>(() =>
    Object.fromEntries(
      (submittedAnswers ?? []).map((answer) => [answer.id, answer.answer]),
    ),
  );
  const [step, setStep] = useState(0);
  const questionCount = payload.questions.length;
  const activeQuestion =
    payload.questions[Math.min(step, Math.max(questionCount - 1, 0))];
  const selected = activeQuestion ? answers[activeQuestion.id] ?? "" : "";
  const canGoNext = step < questionCount - 1;
  const canMoveNext = Boolean(selected.trim());

  function updateAnswer(questionId: string, answer: string) {
    setAnswers((current) => ({
      ...current,
      [questionId]: answer,
    }));
  }

  function skipQuestion(questionId: string) {
    setAnswers((current) => {
      const next = { ...current };
      delete next[questionId];
      return next;
    });
  }

  function handleSubmit() {
    const nextAnswers = payload.questions
      .map((question) => ({
        id: question.id,
        answer: answers[question.id]?.trim() ?? "",
      }))
      .filter((answer) => answer.answer.length > 0);

    onSubmit?.(nextAnswers);
  }

  function handleSkip() {
    if (activeQuestion) skipQuestion(activeQuestion.id);
    if (canGoNext) {
      setStep((value) => Math.min(value + 1, questionCount - 1));
      return;
    }
    handleSubmit();
  }

  function handleNext() {
    if (canGoNext) {
      setStep((value) => Math.min(value + 1, questionCount - 1));
      return;
    }
    handleSubmit();
  }

  return (
    <div className="w-[579px] shrink-0 rounded-[14px] border-2 border-[#B1B5B4] bg-[#F4F4F5] p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-normal text-[#050605]">
          Question
        </span>
        <span className="text-xs font-medium text-[#050605]">
          {questionCount > 0 ? step + 1 : 0}/{questionCount}
        </span>
      </div>

      {/* Divider */}
      <div className="mt-4 h-px w-full bg-[#E4E4E7]" />

      {/* Content */}
      <div className="mt-4">
        {activeQuestion ? (
          <div className="min-w-0">
            <h2 className="truncate text-base font-semibold leading-6 text-[#050605]">
              {activeQuestion.question}
            </h2>

            {activeQuestion.options.length > 0 && (
              <div className="mt-4 grid gap-2">
                {activeQuestion.options.map((option) => {
                  const active = selected === option;

                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => updateAnswer(activeQuestion.id, option)}
                      className={`flex items-center gap-3 rounded-lg border px-4 py-3 text-left text-sm leading-5 transition-colors ${
                        active
                          ? "border-[#0C5D56] bg-[#0C5D56]/5 font-medium text-[#0C5D56]"
                          : "border-[#E4E4E4] bg-white text-[#050605] hover:border-[#B1B5B4]"
                      }`}
                    >
                      <span
                        className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${
                          active
                            ? "border-[#0C5D56] bg-[#0C5D56]"
                            : "border-[#E4E4E4] bg-white"
                        }`}
                      >
                        {active && (
                          <span className="h-1.5 w-1.5 rounded-full bg-white" />
                        )}
                      </span>
                      <span className="truncate">{option}</span>
                    </button>
                  );
                })}
              </div>
            )}

            <input
              value={activeQuestion.options.includes(selected) ? "" : selected}
              onChange={(event) =>
                updateAnswer(activeQuestion.id, event.target.value)
              }
              placeholder={
                activeQuestion.options.length > 0
                  ? "Or type your answer"
                  : "Type your answer"
              }
              className="mt-3 h-[47px] w-full rounded-[11px] border border-[#E4E4E4] bg-[#EEEFEE]/70 px-3 text-sm text-[#050605] outline-none ring-0 placeholder:text-gray-400 focus:border-[#0C5D56] focus:bg-white"
            />
          </div>
        ) : (
          <p className="text-sm text-gray-500">
            No clarification questions were provided.
          </p>
        )}
      </div>

      {/* Footer */}
      <div className="mt-6 flex items-center justify-end gap-4">
        <button
          type="button"
          onClick={handleSkip}
          disabled={isSubmitting || questionCount === 0}
          className="text-sm font-medium text-[#050605] transition-colors hover:text-[#0C5D56] disabled:cursor-not-allowed disabled:opacity-50"
        >
          Skip
        </button>

        <button
          type="button"
          onClick={handleNext}
          disabled={isSubmitting || !canMoveNext || questionCount === 0}
          className="inline-flex h-10 items-center gap-2 rounded-lg bg-[#0C5D56] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#094a45] disabled:cursor-not-allowed disabled:bg-[#E4E4E4] disabled:text-gray-500"
        >
          {isSubmitting ? <Loader2 size={15} className="animate-spin" /> : null}
          Next
          {!isSubmitting ? <ArrowRight size={15} /> : null}
        </button>
      </div>
    </div>
  );
}
