"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight, Loader2 } from "lucide-react";

import type { ClarificationPayload } from "@/lib/personas";
import type { ClarificationAnswer } from "@/components/protected/generator/api";

interface ClarificationCardProps {
  payload: ClarificationPayload;
  answers?: ClarificationAnswer[];
  readOnly?: boolean;
  isSubmitting?: boolean;
  onSubmit?: (answers: ClarificationAnswer[]) => void;
}

export default function ClarificationCard({
  payload,
  answers: providedAnswers,
  readOnly,
  isSubmitting,
  onSubmit,
}: ClarificationCardProps) {
  const [expanded, setExpanded] = useState(!readOnly);
  const [answers, setAnswers] = useState<Record<string, string>>(
    () =>
      (providedAnswers ?? []).reduce<Record<string, string>>((acc, item) => {
        acc[item.id] = item.answer;
        return acc;
      }, {}),
  );

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

  return (
    <div className="w-full max-w-2xl rounded-2xl border border-gray-200 bg-white shadow-sm">
      <button
        type="button"
        onClick={() => setExpanded((value) => !value)}
        className="flex w-full items-center justify-between gap-3 border-b border-gray-100 px-4 py-3 text-left"
      >
        <div>
          <p className="text-sm font-semibold text-gray-900">
            Clarification round {payload.round || 1}
          </p>
          <p className="mt-0.5 text-xs text-gray-500">
            {payload.questions.length} questions asked
          </p>
        </div>
        {expanded ? <ChevronDown size={17} /> : <ChevronRight size={17} />}
      </button>

      {expanded && (
        <div className="space-y-4 px-4 py-4">
          {payload.questions.map((question, index) => {
            const selected = answers[question.id] ?? "";
            const isOptionAnswer = question.options.includes(selected);
            const customAnswer = isOptionAnswer ? "" : selected;
            const showInput = question.allowCustom || question.options.length === 0 || Boolean(customAnswer);

            return (
              <div key={question.id} className="rounded-xl border border-gray-100 bg-gray-50/70 p-3">
                <p className="text-sm font-medium text-gray-900">
                  {index + 1}. {question.question}
                </p>

                {question.options.length > 0 && (
                  <div className="mt-3 flex flex-col gap-2">
                    {question.options.map((option) => {
                      const active = selected === option;

                      return (
                        <button
                          key={option}
                          type="button"
                          onClick={() => {
                            if (!readOnly) updateAnswer(question.id, option);
                          }}
                          disabled={readOnly}
                          className={`rounded-lg border px-3 py-2 text-left text-sm transition ${
                            active
                              ? "border-[#0C5D56] bg-[#0C5D56]/10 text-[#0C5D56]"
                              : "border-gray-200 bg-white text-gray-700"
                          }`}
                        >
                          {option}
                        </button>
                      );
                    })}
                  </div>
                )}

                {showInput && (
                  <input
                    value={customAnswer}
                    onChange={(event) => {
                      if (!readOnly) updateAnswer(question.id, event.target.value);
                    }}
                    placeholder={question.options.length > 0 ? "Other answer" : "Type your answer"}
                    readOnly={readOnly}
                    className="mt-3 h-10 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:border-[#0C5D56] read-only:cursor-default read-only:bg-gray-100"
                  />
                )}

                {!readOnly && selected && (
                  <button
                    type="button"
                    onClick={() => skipQuestion(question.id)}
                    className="mt-2 text-xs font-medium text-gray-500 hover:text-gray-800"
                  >
                    Clear answer
                  </button>
                )}
              </div>
            );
          })}

          {!readOnly && (
            <div className="flex justify-end border-t border-gray-100 pt-4">
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="inline-flex h-10 items-center gap-2 rounded-lg bg-[#0C5D56] px-4 text-sm font-semibold text-white hover:bg-[#094a45] disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-500"
              >
                {isSubmitting && <Loader2 size={15} className="animate-spin" />}
                Continue
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
