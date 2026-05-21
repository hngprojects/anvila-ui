import React from "react";
import { CheckCircle2, XCircle, X } from "lucide-react";

interface PaymentStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  status: "processing" | "success" | "failed";
  progress?: number;
  onActionClick?: () => void;
}

export default function PaymentStatusModal({
  isOpen,
  onClose,
  status,
  progress = 0,
  onActionClick,
}: PaymentStatusModalProps) {
  if (!isOpen) return null;

  const normalizedProgress = Math.min(100, Math.max(0, progress));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" 
        onClick={status !== "processing" ? onClose : undefined} 
      />

      {/* MODAL CONTAINER */}
      <div 
        role="dialog"
        aria-modal="true"
        aria-labelledby="payment-status-modal-title"
        className="relative w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-8 text-center shadow-2xl transition-all sm:p-10"
      >
        
        {/* CLOSE BUTTON */}
        {status !== "processing" && (
          <button 
            type="button"
            aria-label="Close payment status modal"
            onClick={onClose} 
            className="absolute right-5 top-5 text-[#667085] hover:text-[#344054] transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        )}

        <div className="flex flex-col items-center justify-center">
          
          {/* ICON SECTION */}
          {status === "processing" && (
            <div className="mb-6 flex items-center justify-center h-16 w-full">
              <div className="relative h-12 w-12 flex items-center justify-center">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute h-2.5 w-2.5 rounded-full bg-[#004D4D] animate-pulse"
                    style={{
                      transform: `rotate(${i * 45}deg) translateY(-18px)`,
                      animationDelay: `${i * 0.12}s`,
                      animationDuration: "0.9s"
                    }}
                  />
                ))}
              </div>
            </div>
          )}

          {status === "success" && (
            <div className="mb-6 rounded-full bg-green-50 p-3">
              <CheckCircle2 className="h-12 w-12 text-[#5B9B48]" />
            </div>
          )}

          {status === "failed" && (
            <div className="mb-6 rounded-full bg-red-50 p-3">
              <XCircle className="h-12 w-12 text-[#D92D20]" />
            </div>
          )}
          
          {/* ACCESSIBLE HEADER ID LINKED TO CONTAINER */}
          <h2 
            id="payment-status-modal-title" 
            className="text-2xl font-extrabold text-[#101828] tracking-tight mb-2"
          >
            {status === "processing" && "Payment processing"}
            {status === "success" && "Payment Successful"}
            {status === "failed" && "Payment Failed"}
          </h2>
          
          {/* DESCRIPTION */}
          <p className="text-sm font-medium text-[#475467] max-w-[340px] leading-relaxed mb-6">
            {status === "processing" && "Wait while we process, please don't close this window."}
            {status === "success" && "Your transaction went through smoothly! A receipt has been sent to your email."}
            {status === "failed" && "Something went wrong with your transaction. Please check your details and try again."}
          </p>

          {/* PROGRESS BAR */}
          {status === "processing" && (
            <div className="w-full max-w-[280px] h-2 bg-slate-100 rounded-full overflow-hidden mb-2">
              <div 
                className="h-full bg-[#004D4D] rounded-full transition-all duration-75 ease-out"
                style={{ width: `${normalizedProgress}%` }}
              />
            </div>
          )}

          {/* ACTION BUTTON */}
          {status !== "processing" && (
            <button
              type="button"
              onClick={onActionClick || onClose}
              className="w-full mt-2 rounded-xl bg-[#004D4D] py-3 text-sm font-semibold text-white shadow-md hover:bg-[#003333] transition-colors"
            >
              {status === "success" ? "Continue" : "Try Again"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}