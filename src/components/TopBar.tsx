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

export default function TopBar() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [modalType, setModalType] = React.useState<"publish" | "private">("publish");
  const [isSaving, setIsSaving] = React.useState(false);
  
  const { createAgent } = useAgent();

  const handleSavePrivate = async () => {
    setIsSaving(true);
    try {
      await createAgent({
        name: "New Private Agent",
        categories: "Custom",
        visibility: "Private"
      });
      setModalType("private");
      setIsModalOpen(true);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  const handlePublish = async () => {
    setIsSaving(true);
    try {
      await createAgent({
        name: "New Public Agent",
        categories: "Institutional",
        visibility: "Public"
      });
      setModalType("publish");
      setIsModalOpen(true);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSaving(false);
    }
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

        {/* Parent container of Publish button, Refresh, and Close icons */}
        <div 
          style={{ width: "188px", height: "32px", gap: "12px", display: "flex", alignItems: "center", justifyContent: "flex-end" }}
          className="shrink-0"
        >
          <button 
            onClick={handlePublish}
            disabled={isSaving}
            style={{ width: "116px", height: "32px", gap: "8px", border: "0.5px solid #0C5D56", paddingLeft: "20px", paddingRight: "16px", backgroundColor: "#0C5D56", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "8px", cursor: "pointer" }}
            className="text-[12px] font-semibold text-white hover:bg-[#0a4d47] transition-colors disabled:opacity-50 shrink-0 leading-none"
          >
            {isSaving && modalType === "publish" ? <Loader2 size={12} className="animate-spin" /> : null}
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
            disabled={isSaving}
            className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors whitespace-nowrap disabled:opacity-50 cursor-pointer"
          >
            {isSaving && modalType === "private" ? <Loader2 size={14} className="animate-spin" /> : null}
            <span className="hidden sm:inline">Save as Private</span>
            <span className="sm:hidden">Save</span>
          </button>
          <button 
            onClick={handlePublish}
            disabled={isSaving}
            className="flex items-center gap-2 rounded-lg bg-[#1a6b5a] px-4 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-white hover:bg-[#155a4a] transition-colors disabled:opacity-50 z-10 cursor-pointer"
          >
            {isSaving && modalType === "publish" ? <Loader2 size={14} className="animate-spin" /> : null}
            Publish
          </button>
        </div>
      </div>

      {/* Shared Modals */}
      {isModalOpen && modalType === "publish" && (
        <GithubPublishModal onClose={() => setIsModalOpen(false)} />
      )}

      {isModalOpen && modalType === "private" && (
        <KeepAgentPrivateModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onProceedToPayment={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
}