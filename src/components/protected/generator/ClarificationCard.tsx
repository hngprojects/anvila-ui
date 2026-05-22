"use client";

import { useMemo, useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

import type { ClarificationPayload } from "@/lib/personas";
import type { ClarificationAnswer } from "@/components/protected/generator/api";

interface ClarificationCardProps {
  payload: ClarificationPayload;
  readOnly?: boolean;
  answers?: ClarificationAnswer[];
  isSubmitting?: boolean;
  onSubmit?: (answers: ClarificationAnswer[]) => void;
}

type DraftAnswer = Record<string, { selected: string; custom: string; skipped: boolean }>;

export default function ClarificationCard({
  payload,
  readOnly,
  answers = [],
  isSubmitting,
  onSubmit,
}: ClarificationCardProps) {
  const [expanded, setExpanded] = useState(!readOnly);
  const [draft, setDraft] = useState<DraftAnswer>({});

  const answeredCount = readOnly
    ? answers.length
    : Object.entries(draft).filter(([, value]) => !value.skipped && getAnswer(value)).length;

  const submittedAnswers = useMemo(() => {
    return payload.questions
      .map((question) => {
        const value = draft[question.id];
        const answer = value ? getAnswer(value) : "";
        if (!answer) return null;
        return { id: question.id, answer };
      })
      .filter((answer): answer is ClarificationAnswer => Boolean(answer));
  }, [draft, payload.questions]);

  function updateQuestion(
    questionId: string,
    updater: (current: DraftAnswer[string]) => DraftAnswer[string],
  ) {
    setDraft((current) => ({
      ...current,
      [questionId]: updater(current[questionId] ?? { selected: "", custom: "", skipped: false }),
    }));
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
            {readOnly
              ? `${answeredCount} of ${payload.questions.length} answered`
              : `${payload.questions.length} questions`}
          </p>
        </div>
        {expanded ? <ChevronDown size={17} /> : <ChevronRight size={17} />}
      </button>

      {expanded && (
        <div className="space-y-4 px-4 py-4">
          {payload.questions.map((question, index) => {
            const current = draft[question.id] ?? { selected: "", custom: "", skipped: false };
            const storedAnswer = answers.find((answer) => answer.id === question.id)?.answer;
            const requiresInput = question.options.length === 0;
            const showCustom = question.allowCustom || requiresInput || current.selected === "__custom__";

            return (
              <div key={question.id} className="rounded-xl border border-gray-100 bg-gray-50/70 p-3">
                <div className="mb-3 flex items-start justify-between gap-3">
                  <p className="text-sm font-medium text-gray-900">
                    {index + 1}. {question.question}
                  </p>
                  {!readOnly && (
                    <button
                      type="button"
                      onClick={() =>
                        updateQuestion(question.id, (value) => ({
                          ...value,
                          selected: "",
                          custom: "",
                          skipped: true,
                        }))
                      }
                      className="shrink-0 text-xs font-medium text-gray-500 hover:text-gray-900"
                    >
                      Skip
                    </button>
                  )}
                </div>

                {readOnly ? (
                  <p className="rounded-lg bg-white px-3 py-2 text-sm text-gray-600">
                    {storedAnswer || "Skipped"}
                  </p>
                ) : (
                  <div className="space-y-2">
                    {question.options.map((option) => (
                      <label
                        key={option}
                        className={`flex cursor-pointer items-start gap-2 rounded-lg border bg-white px-3 py-2 text-sm transition ${
                          current.selected === option
                            ? "border-[#0C5D56] text-gray-950"
                            : "border-gray-200 text-gray-600 hover:border-gray-300"
                        }`}
                      >
                        <input
                          type="radio"
                          name={question.id}
                          checked={current.selected === option}
                          onChange={() =>
                            updateQuestion(question.id, (value) => ({
                              ...value,
                              selected: option,
                              skipped: false,
                            }))
                          }
                          className="mt-0.5"
                        />
                        <span>{option}</span>
                      </label>
                    ))}

                    {question.allowCustom && question.options.length > 0 && (
                      <label
                        className={`flex cursor-pointer items-center gap-2 rounded-lg border bg-white px-3 py-2 text-sm transition ${
                          current.selected === "__custom__"
                            ? "border-[#0C5D56] text-gray-950"
                            : "border-gray-200 text-gray-600 hover:border-gray-300"
                        }`}
                      >
                        <input
                          type="radio"
                          name={question.id}
                          checked={current.selected === "__custom__"}
                          onChange={() =>
                            updateQuestion(question.id, (value) => ({
                              ...value,
                              selected: "__custom__",
                              skipped: false,
                            }))
                          }
                        />
                        <span>Other</span>
                      </label>
                    )}

                    {showCustom && (
                      <input
                        value={current.custom}
                        onChange={(event) =>
                          updateQuestion(question.id, (value) => ({
                            ...value,
                            custom: event.target.value,
                            selected: requiresInput ? "__custom__" : value.selected,
                            skipped: false,
                          }))
                        }
                        placeholder="Enter your answer"
                        className="h-10 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-900 outline-none focus:border-[#0C5D56]"
                      />
                    )}
                  </div>
                )}
              </div>
            );
          })}

          {!readOnly && (
            <div className="flex justify-end gap-3 border-t border-gray-100 pt-4">
              <button
                type="button"
                onClick={() => onSubmit?.([])}
                disabled={isSubmitting}
                className="rounded-lg px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Skip all
              </button>
              <button
                type="button"
                onClick={() => onSubmit?.(submittedAnswers)}
                disabled={isSubmitting || submittedAnswers.length === 0}
                className="rounded-lg bg-[#0C5D56] px-4 py-2 text-sm font-semibold text-white hover:bg-[#094a45] disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400"
              >
                {isSubmitting ? "Submitting..." : "Continue"}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function getAnswer(value: DraftAnswer[string]) {
  if (value.skipped) return "";
  if (value.selected === "__custom__") return value.custom.trim();
  return value.selected || value.custom.trim();
}
