import * as React from "react";
import {
    Eye,
    RefreshCw,
    FileText,
    Cloud,
    CircleCheck,
    Loader2
} from "lucide-react";
import Modal from "./Modal";
import { useRouter } from "next/navigation";
import { GithubPublishModal } from "./publish-modal";
import { useAgent } from "@/context/agent";

// ─── Header Actions ───────────────────────────────────────────────────────────

function HeaderActions() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [modalType, setModalType] = React.useState<"publish" | "private">("publish");
  const [isSaving, setIsSaving] = React.useState(false);
  const router = useRouter();
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
    <div className="flex items-center gap-2 sm:gap-4 mt-2 sm:mt-0">
      <button className="text-gray-600 hover:text-gray-800 transition-colors hidden sm:block" aria-label="Refresh">
        <RefreshCw size={18} />
      </button>
      <button 
        onClick={handleSavePrivate}
        disabled={isSaving}
        className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors whitespace-nowrap disabled:opacity-50"
      >
        {isSaving && modalType === "private" ? <Loader2 size={14} className="animate-spin" /> : null}
        <span className="hidden sm:inline">Save as Private</span>
        <span className="sm:hidden">Save</span>
      </button>
      <button 
        onClick={handlePublish}
        disabled={isSaving}
        className="flex items-center gap-2 rounded-lg bg-[#1a6b5a] px-4 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-white hover:bg-[#155a4a] transition-colors disabled:opacity-50"
      >
        {isSaving && modalType === "publish" ? <Loader2 size={14} className="animate-spin" /> : null}
        Publish
      </button>

      {isModalOpen && modalType === "publish" && (
        <GithubPublishModal onClose={() => setIsModalOpen(false)} />
      )}

      {isModalOpen && modalType === "private" && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <div className="flex flex-col items-center justify-center py-4 text-center">
            <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-white">
              <CircleCheck size={44} className="text-[#22c55e]" strokeWidth={2.5} />
            </div>
            <h2 className="mb-6 text-[24px] font-bold text-black tracking-tight">
              Agent Saved
            </h2>
            <button 
              onClick={() => setIsModalOpen(false)}
              className="rounded-xl bg-[#1a6b5a] px-5 py-2 text-[13px] font-medium text-white hover:bg-[#155a4a] transition-colors"
            >
              Manage Agents
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ─── Top Bar ──────────────────────────────────────────────────────────────────

export default function TopBar() {
  return (
    <div className="min-h-[56px] flex flex-wrap items-center justify-between px-2 pb-4 shrink-0 border-b border-gray-200 mb-4 gap-y-2">
      {/* Left items */}
      <div className="flex items-center gap-3 sm:gap-4">
        <button className="flex items-center gap-1.5 sm:gap-2 rounded-lg bg-[#cbe7e0] px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-small text-[#1a6b5a] transition-colors">
          <Eye size={16} className="sm:w-[18px] sm:h-[18px]" />
          Preview
        </button>
        <button className="text-gray-600 hover:text-gray-800 transition-colors" aria-label="Document">
          <FileText size={18} className="sm:w-[20px] sm:h-[20px]" />
        </button>
        <button className="text-gray-600 hover:text-gray-800 transition-colors" aria-label="Cloud">
          <Cloud size={18} className="sm:w-[20px] sm:h-[20px]" />
        </button>
      </div>

      <HeaderActions />
    </div>
  );
}