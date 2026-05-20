"use client"

import { useEffect, useRef, useState, useMemo } from "react"
import { Lock, Sparkles, X, Zap } from "lucide-react"

// ─── Types ────────────────────────────────────────────────────────────────────

export interface GenerationStep {
  id: string
  name: string
  durationSeconds: number
}

interface GenerationLoadingStateProps {
  preservedInput?: string
  steps?: GenerationStep[]
  onCancel?: () => void
}

// ─── Constants ────────────────────────────────────────────────────────────────

const GENERATION_STEPS: GenerationStep[] = [
  { id: "parse",     name: "Parsing requirements",       durationSeconds: 4 },
  { id: "scaffold",  name: "Scaffolding agent structure", durationSeconds: 6 },
  { id: "generate",  name: "Generating capabilities",    durationSeconds: 8 },
  { id: "integrate", name: "Configuring integrations",   durationSeconds: 7 },
  { id: "validate",  name: "Running validation checks",  durationSeconds: 5 },
]

const PROGRESS_MESSAGES = [
  "Analysing your requirements and scaffolding agent structure…",
  "Generating capability modules and routing logic…",
  "Configuring integrations and response handlers…",
  "Running validation and quality checks…",
  "Almost there — finalising your agent package…",
]

// ─── Helpers ──────────────────────────────────────────────────────────────────

type StepState = "done" | "active" | "pending"

function computeStepStates(
  steps: GenerationStep[],
  elapsed: number
): StepState[] {
  let cursor = 0
  return steps.map((s) => {
    const start = cursor
    const end = cursor + s.durationSeconds
    cursor = end                        // local, not shared across renders
    if (elapsed >= end)   return "done"
    if (elapsed >= start) return "active"
    return "pending"
  })
}

// ─── Spinner ──────────────────────────────────────────────────────────────────

function Spinner() {
  return (
    <div className="w-16 h-16 mx-auto mb-5">
      <svg
        viewBox="0 0 64 64"
        className="w-full h-full animate-spin"
        style={{ animationDuration: "1.2s", animationTimingFunction: "linear" }}
      >
        <circle
          cx="32" cy="32" r="26"
          className="stroke-green-100"
          strokeWidth="5"
          fill="none"
        />
        <circle
          cx="32" cy="32" r="26"
          stroke="#0C5D56"
          strokeWidth="5"
          fill="none"
          strokeLinecap="round"
          strokeDasharray="60 200"
          strokeDashoffset="0"
        />
      </svg>
    </div>
  )
}

// ─── Step icon ────────────────────────────────────────────────────────────────

function StepIcon({ state }: { state: StepState }) {
  if (state === "done") {
    return (
      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#0C5D56] flex items-center justify-center">
        <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none"
          stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>
    )
  }
  if (state === "active") {
    return (
      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-50 border-2 border-[#0C5D56] flex items-center justify-center">
        <svg
          className="w-3 h-3 animate-spin"
          style={{ animationDuration: "1.2s" }}
          viewBox="0 0 24 24" fill="none" stroke="#0C5D56" strokeWidth="2.5" strokeLinecap="round"
        >
          <line x1="12" y1="2"    x2="12" y2="6" />
          <line x1="12" y1="18"   x2="12" y2="22" />
          <line x1="4.93" y1="4.93"   x2="7.76" y2="7.76" />
          <line x1="16.24" y1="16.24" x2="19.07" y2="19.07" />
          <line x1="2"  y1="12"   x2="6"  y2="12" />
          <line x1="18" y1="12"   x2="22" y2="12" />
          <line x1="4.93" y1="19.07"  x2="7.76" y2="16.24" />
          <line x1="16.24" y1="7.76"  x2="19.07" y2="4.93" />
        </svg>
      </div>
    )
  }
  return (
    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center">
      <div className="w-2 h-2 rounded-full bg-gray-300" />
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function GenerationLoadingState({
  preservedInput = "",
  steps = GENERATION_STEPS,
  onCancel,
}: GenerationLoadingStateProps) {
  const totalDuration = useMemo(
    () => steps.reduce((sum, s) => sum + s.durationSeconds, 0),
    [steps]
  )

  const [elapsed, setElapsed]   = useState(0)
  const [msgIndex, setMsgIndex] = useState(0)
  const tickRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const msgRef  = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    tickRef.current = setInterval(() => {
      setElapsed((prev) => {
        if (prev >= totalDuration) {
          clearInterval(tickRef.current!)
          return totalDuration
        }
        return prev + 0.1
      })
    }, 100)

    msgRef.current = setInterval(() => {
      setMsgIndex((prev) => (prev + 1) % PROGRESS_MESSAGES.length)
    }, 4000)

    return () => {
      clearInterval(tickRef.current!)
      clearInterval(msgRef.current!)
    }
  }, [totalDuration])

  // Derived — no mutation, pure computation
  const stepStates = useMemo(
    () => computeStepStates(steps, elapsed),
    [steps, elapsed]
  )

  // Cap at 99% — parent resolves to 100 on success/failure
  const pct =
    totalDuration > 0
      ? Math.min(Math.round((elapsed / totalDuration) * 100), 99)
      : 0

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white border border-gray-100 rounded-2xl shadow-sm px-10 py-12 text-center">

        <Spinner />

        {/* Status badge */}
        <div className="inline-flex items-center gap-2 bg-green-50 border border-green-200 text-green-800 text-xs font-medium px-3 py-1.5 rounded-full mb-4">
          <span
            className="w-1.5 h-1.5 rounded-full bg-[#0C5D56]"
            style={{ animation: "pulse 1.4s ease-in-out infinite" }}
          />
          Generating your agent
        </div>

        <h1 className="text-xl font-semibold text-gray-900 mb-2">
          Building your agent…
        </h1>
        <p className="text-sm text-gray-500 leading-relaxed mb-7">
          This usually takes 15–30 seconds. Hang tight.
        </p>

        {/* Progress bar */}
        <div className="mb-6 text-left">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-medium text-gray-600">Overall progress</span>
            <span className="text-xs font-semibold text-[#0C5D56]">{pct}%</span>
          </div>
          <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#0C5D56] rounded-full transition-all duration-300"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>

        {/* Rotating message */}
        <div className="flex items-start gap-3 bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 mb-6 text-left min-h-[52px]">
          <Zap className="w-4 h-4 text-[#0C5D56] flex-shrink-0 mt-0.5" />
          <p className="text-xs text-gray-600 leading-relaxed">
            {PROGRESS_MESSAGES[msgIndex]}
          </p>
        </div>

        {/* Step list */}
        <div className="flex flex-col gap-2 mb-6 text-left">
          {steps.map((step, i) => {
            const state = stepStates[i]
            return (
              <div
                key={step.id}
                className={[
                  "flex items-center gap-3 rounded-xl px-4 py-3 border transition-colors duration-300",
                  state === "done"   ? "bg-green-50 border-green-100"  :
                  state === "active" ? "bg-white border-[#0C5D56]"     :
                                       "bg-gray-50 border-gray-100",
                ].join(" ")}
              >
                <StepIcon state={state} />
                <span className={[
                  "flex-1 text-sm font-medium",
                  state === "pending" ? "text-gray-400" : "text-gray-800",
                ].join(" ")}>
                  {step.name}
                </span>
                <span className={[
                  "text-xs",
                  state === "done"   ? "text-[#0C5D56] font-medium" :
                  state === "active" ? "text-[#0C5D56] font-medium" :
                                       "text-gray-400",
                ].join(" ")}>
                  {state === "done" ? "Done" : state === "active" ? "In progress…" : "Waiting"}
                </span>
              </div>
            )
          })}
        </div>

        {/* Locked input preview */}
        {preservedInput && (
          <div className="mb-5 text-left">
            <div className="flex items-center gap-1.5 mb-1.5">
              <Lock className="w-3 h-3 text-gray-400" />
              <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">
                Input locked during generation
              </span>
            </div>
            <div className="w-full border border-gray-100 rounded-xl px-4 py-3 bg-gray-50 text-sm text-gray-400 cursor-not-allowed select-none truncate">
              {preservedInput}
            </div>
          </div>
        )}

        {/* Cancel */}
        <button
          type="button"
          onClick={onCancel}
          disabled={!onCancel}
          className="w-full flex items-center justify-center gap-2 bg-white hover:bg-gray-50 active:scale-[0.98] text-gray-600 text-sm font-medium py-3 rounded-xl border border-gray-200 transition-all duration-150"
        >
          <X className="w-4 h-4 text-gray-400" />
          Cancel generation
        </button>

        {/* Footer */}
        <div className="mt-6 flex items-center justify-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[#2e7b78]" />
          <span className="text-xs text-gray-400">
            Your session is secure — generation runs server-side
          </span>
        </div>

      </div>
    </div>
  )
}
