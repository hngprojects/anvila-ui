"use client";

import React from "react";

interface KeepAgentPrivateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProceedToPayment: () => void;
}

const CheckCircleSVG = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    className="shrink-0"
  >
    <rect x="0.5" y="0.5" width="15" height="15" rx="7.5" fill="#F6F7F7" />
    <rect x="0.5" y="0.5" width="15" height="15" rx="7.5" stroke="#0C0E0D" />
    <circle cx="8.00078" cy="7.9998" r="3.2" fill="#0C0E0D" />
  </svg>
);

const features = [
  { left: "Full control & edits", right: "Private & secure" },
  { left: "Private repo", right: "Not publicly listed" },
  { left: "Business / personal use", right: "Only accessible to you" },
];

const KeepAgentPrivateModal: React.FC<KeepAgentPrivateModalProps> = ({
  isOpen,
  onClose,
  onProceedToPayment,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="keep-private-heading"
        className="relative flex w-full max-w-[620px] flex-col gap-6 rounded-[10px] border border-[#EDEDED] bg-white p-6 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.10)] md:p-[40px]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          aria-label="Close"
          onClick={onClose}
          className="absolute top-6 right-6 border-none bg-transparent cursor-pointer p-0 md:top-[40px] md:right-[40px]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M7.67083 9.30417L1.95417 15.0208C1.74028 15.2347 1.46806 15.3417 1.1375 15.3417C0.806944 15.3417 0.534722 15.2347 0.320833 15.0208C0.106944 14.8069 0 14.5347 0 14.2042C0 13.8736 0.106944 13.6014 0.320833 13.3875L6.0375 7.67083L0.320833 1.95417C0.106944 1.74028 0 1.46806 0 1.1375C0 0.806944 0.106944 0.534722 0.320833 0.320833C0.534722 0.106944 0.806944 0 1.1375 0C1.46806 0 1.74028 0.106944 1.95417 0.320833L7.67083 6.0375L13.3875 0.320833C13.6014 0.106944 13.8736 0 14.2042 0C14.5347 0 14.8069 0.106944 15.0208 0.320833C15.2347 0.534722 15.3417 0.806944 15.3417 1.1375C15.3417 1.46806 15.2347 1.74028 15.0208 1.95417L9.30417 7.67083L15.0208 13.3875C15.2347 13.6014 15.3417 13.8736 15.3417 14.2042C15.3417 14.5347 15.2347 14.8069 15.0208 15.0208C14.8069 15.2347 14.5347 15.3417 14.2042 15.3417C13.8736 15.3417 13.6014 15.2347 13.3875 15.0208L7.67083 9.30417Z"
              fill="black"
            />
          </svg>
        </button>

        <div className="flex flex-col items-start gap-2">
          <h1
            id="keep-private-heading"
            className="font-bold text-[32px] leading-tight text-[#0C0E0D] md:text-[40px]"
          >
            Keep Your Agent Private
          </h1>
          <p className="text-[16px] text-[#52525B]">
            Protect your work and keep full control over your agent.
          </p>
        </div>

        <div className="w-full rounded-[10px] border-[0.5px] border-[#CBCECD] bg-[#F6F7F7] overflow-hidden">
          <div className="h-[20px] w-full bg-[#337F7B]" />

          <div className="flex flex-col gap-4 p-4 md:p-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <span className="inline-flex w-fit items-center gap-[7px] rounded-[16px] border border-[rgba(31,193,107,0.10)] bg-[rgba(31,193,107,0.10)] px-[6px] py-[5px] text-sm font-medium text-[#1FC16B]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="7"
                  height="7"
                  viewBox="0 0 7 7"
                  fill="none"
                >
                  <circle cx="3.2" cy="3.2" r="3.2" fill="#1FC16B" />
                </svg>
                Private
              </span>

              <div className="flex items-baseline gap-1">
                <span className="font-bold text-[36px] text-[#0C0E0D] md:text-[44px]">
                  $5.00
                </span>
                <span className="text-sm text-[#52525B]">/one-time</span>
              </div>
            </div>

            <div className="rounded-[10px] border-[0.5px] border-[#CBCECD] bg-white p-4 md:p-5">
              <div className="grid grid-cols-1 gap-y-3 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-4">
                {features.map((row, i) => (
                  <React.Fragment key={i}>
                    <div className="flex items-center gap-3">
                      <CheckCircleSVG />
                      <span className="text-sm text-[#0C0E0D]">{row.left}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircleSVG />
                      <span className="text-sm text-[#0C0E0D]">{row.right}</span>
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={onProceedToPayment}
            className="rounded-lg bg-[#0C5D56] px-6 py-3 font-semibold text-white cursor-pointer hover:opacity-90 transition-opacity"
          >
            Proceed to Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default KeepAgentPrivateModal;
