"use client";

import * as React from "react";
import {
    Eye,
    RefreshCw,
    FileText,
    Cloud,
    Loader2,
    Menu,
    ChevronDown,
    X
} from "lucide-react";

import { GithubPublishModal } from "./publish-modal";
import { useAgent } from "@/context/agent";
import KeepAgentPrivateModal from "./shared-components/KeepAgentPrivateModal";
import { AddPaymentMethodModal } from "./shared-components/AddPaymentMethodModal";
import PaymentStatusModal from "./shared-components/PaymentStatusModal";
import PaymentSuccessModal from "./shared-components/PaymentSuccessModal";

type PrivateStep = "idle" | "keep-private" | "add-payment" | "payment-status" | "payment-success";

export default function TopBar() {
  const [isPublishOpen, setIsPublishOpen] = React.useState(false);
  const [isSavingPublish, setIsSavingPublish] = React.useState(false);
  const [isSavingPrivate, setIsSavingPrivate] = React.useState(false);

  const [privateStep, setPrivateStep] = React.useState<PrivateStep>("idle");
  const [paymentStatus, setPaymentStatus] = React.useState<"processing" | "success" | "failed">("processing");
  const [paymentProgress, setPaymentProgress] = React.useState(0);
  const progressIntervalRef = React.useRef<ReturnType<typeof setInterval> | null>(null);

  const { createAgent } = useAgent();

  const clearProgressInterval = () => {
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
  };

  React.useEffect(() => () => clearProgressInterval(), []);

  const handleSavePrivate = async () => {
    setIsSavingPrivate(true);
    try {
      // TODO: endpoint stub — POST /api/agents { visibility: "Private" }
      await createAgent({ name: "New Private Agent", categories: "Custom", visibility: "Private" });
      setPrivateStep("keep-private");
    } catch (error) {
      console.error(error);
    } finally {
      setIsSavingPrivate(false);
    }
  };

  const handlePublish = async () => {
    setIsSavingPublish(true);
    try {
      // TODO: endpoint stub — POST /api/agents { visibility: "Public" }
      await createAgent({ name: "New Public Agent", categories: "Institutional", visibility: "Public" });
      setIsPublishOpen(true);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSavingPublish(false);
    }
  };

  const handleProceedToPayment = () => {
    setPrivateStep("add-payment");
  };

  const handlePay = () => {
    setPrivateStep("payment-status");
    setPaymentStatus("processing");
    setPaymentProgress(0);

    // TODO: endpoint stub — POST /api/payments/initiate { agentId, amount: 5.00 }
    // On success update status to "success"; on failure set to "failed"
    let progress = 0;
    progressIntervalRef.current = setInterval(() => {
      progress += 5;
      setPaymentProgress(progress);
      if (progress >= 100) {
        clearProgressInterval();
        setPaymentStatus("success");
      }
    }, 100);
  };

  const handlePaymentStatusAction = () => {
    if (paymentStatus === "success") {
      setPrivateStep("payment-success");
    } else {
      // Failed → let user retry payment form
      setPrivateStep("add-payment");
    }
  };

  const handleClosePrivateFlow = () => {
    clearProgressInterval();
    setPrivateStep("idle");
    setPaymentProgress(0);
    setPaymentStatus("processing");
  };

  return (
    <>
      {/* Mobile Top Bar Header */}
      <div className="flex md:hidden items-center justify-between w-full h-[48px] border-b border-gray-200 pb-2 px-1 mb-4 bg-white flex-nowrap">
        <div className="flex items-center gap-4 shrink-0">
          <button
            onClick={() => window.dispatchEvent(new CustomEvent("toggle-sidebar"))}
            className="text-gray-700 hover:text-gray-900 transition-colors flex items-center justify-center cursor-pointer"
            aria-label="Menu"
          >
            <Menu size={20} />
          </button>
          <button className="text-gray-700 hover:text-gray-900 transition-colors flex items-center justify-center cursor-pointer" aria-label="Cloud">
            <Cloud size={20} />
          </button>
        </div>

        <div
          style={{ width: "188px", height: "32px", gap: "12px", display: "flex", alignItems: "center", justifyContent: "flex-end" }}
          className="shrink-0"
        >
          <button
            onClick={handlePublish}
            disabled={isSavingPublish}
            style={{ width: "116px", height: "32px", gap: "8px", border: "0.5px solid #0C5D56", paddingLeft: "20px", paddingRight: "16px", backgroundColor: "#0C5D56", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "8px", cursor: "pointer" }}
            className="text-[12px] font-semibold text-white hover:bg-[#0a4d47] transition-colors disabled:opacity-50 shrink-0 leading-none"
          >
            {isSavingPublish ? <Loader2 size={12} className="animate-spin" /> : null}
            Publish
            <ChevronDown size={14} className="text-white/80" />
          </button>

          <button className="text-gray-700 hover:text-gray-900 transition-colors shrink-0 flex items-center justify-center cursor-pointer" aria-label="Refresh">
            <RefreshCw size={18} />
          </button>

          <button className="text-gray-700 hover:text-gray-900 transition-colors shrink-0 flex items-center justify-center cursor-pointer" aria-label="Close">
            <X size={20} />
          </button>
        </div>
      </div>

      {/* Desktop Top Bar Header */}
      <div className="hidden md:flex min-h-[56px] items-center justify-between px-2 pb-4 shrink-0 border-b border-gray-200 mb-4 gap-y-2 w-full">
        {/* Left items */}
        <div className="flex items-center gap-3 sm:gap-4">
          <button className="flex items-center gap-1.5 sm:gap-2 rounded-lg bg-[#cbe7e0] px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-small text-[#1a6b5a] transition-colors cursor-pointer">
            <Eye size={16} className="sm:w-[18px] sm:h-[18px]" />
            Preview
          </button>
          <button className="text-gray-600 hover:text-gray-800 transition-colors cursor-pointer" aria-label="Document">
            <FileText size={18} className="sm:w-[20px] sm:h-[20px]" />
          </button>
          <button className="text-gray-600 hover:text-gray-800 transition-colors cursor-pointer" aria-label="Cloud">
            <Cloud size={18} className="sm:w-[20px] sm:h-[20px]" />
          </button>
        </div>

        {/* Desktop Header Actions */}
        <div className="flex items-center gap-2 sm:gap-4">
          <button className="text-gray-600 hover:text-gray-800 transition-colors hidden sm:block cursor-pointer" aria-label="Refresh">
            <RefreshCw size={18} />
          </button>
          <button
            onClick={handleSavePrivate}
            disabled={isSavingPrivate}
            className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors whitespace-nowrap disabled:opacity-50 cursor-pointer"
          >
            {isSavingPrivate ? <Loader2 size={14} className="animate-spin" /> : null}
            <span className="hidden sm:inline">Save as Private</span>
            <span className="sm:hidden">Save</span>
          </button>
          <button
            onClick={handlePublish}
            disabled={isSavingPublish}
            className="flex items-center gap-2 rounded-lg bg-[#1a6b5a] px-4 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-white hover:bg-[#155a4a] transition-colors disabled:opacity-50 z-10 cursor-pointer"
          >
            {isSavingPublish ? <Loader2 size={14} className="animate-spin" /> : null}
            Publish
          </button>
        </div>
      </div>

      {/* Publish Modal */}
      {isPublishOpen && (
        <GithubPublishModal onClose={() => setIsPublishOpen(false)} />
      )}

      {/* Private Agent Payment Flow */}
      <KeepAgentPrivateModal
        isOpen={privateStep === "keep-private"}
        onClose={handleClosePrivateFlow}
        onProceedToPayment={handleProceedToPayment}
      />

      <AddPaymentMethodModal
        isOpen={privateStep === "add-payment"}
        onClose={handleClosePrivateFlow}
        onPay={handlePay}
      />

      <PaymentStatusModal
        isOpen={privateStep === "payment-status"}
        onClose={handleClosePrivateFlow}
        status={paymentStatus}
        progress={paymentProgress}
        onActionClick={handlePaymentStatusAction}
      />

      <PaymentSuccessModal
        isOpen={privateStep === "payment-success"}
        onClose={handleClosePrivateFlow}
      />
    </>
  );
}
