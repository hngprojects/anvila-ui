"use client";

type ChatCardProps = {
  step: number;
  targetAudience: string;
  setTargetAudience: (val: string) => void;
  postFrequency: string;
  setPostFrequency: (val: string) => void;
  onNext: () => void;
  onPrev: () => void;
};

export default function ChatCard({
  step,
  targetAudience,
  setTargetAudience,
  postFrequency,
  setPostFrequency,
  onNext,
  onPrev,
}: ChatCardProps) {
  return (
    <div className="max-w-2xl border border-gray-200 rounded-2xl p-4 bg-[#F9FAFB] space-y-4 shadow-sm">
      {/* Header section */}
      <div className="flex justify-between items-center border-b border-gray-100 pb-2 text-xs font-semibold text-gray-500">
        <span>Questions</span>
        <span>{step === 1 ? "2/3" : "3/3"}</span>
      </div>

      {/* Question Text */}
      <div>
        <p className="text-xs md:text-sm font-bold text-gray-800 mb-1">
          {step === 1 ? "Who is your target audience?" : "How often do you want to post?"}
        </p>
        <p className="text-[10px] text-gray-400">Writ short answer</p>
      </div>

      {/* Input Box */}
      <div className="bg-white border border-gray-200 rounded-xl p-3">
        {step === 1 ? (
          <input
            type="text"
            value={targetAudience}
            onChange={(e) => setTargetAudience(e.target.value)}
            className="w-full bg-transparent outline-none text-sm text-gray-700"
          />
        ) : (
          <input
            type="text"
            value={postFrequency}
            onChange={(e) => setPostFrequency(e.target.value)}
            placeholder="e.g Nior"
            className="w-full bg-transparent outline-none text-sm text-gray-700"
          />
        )}
      </div>

      {/* Card Action Buttons */}
      <div className="flex justify-end items-center gap-4 pt-2">
        <button 
          type="button" 
          onClick={onPrev}
          className="text-xs font-medium text-gray-400 hover:text-gray-600"
        >
          Skip all
        </button>
        <button
          type="button"
          onClick={onNext}
          className="bg-[#1a6b5a] hover:bg-[#124e42] text-white text-xs font-medium px-4 py-2 rounded-xl transition-colors shadow-sm"
        >
          Next
        </button>
      </div>
    </div>
  );
}