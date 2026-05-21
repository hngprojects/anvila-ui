import * as React from "react";
import {
    RefreshCw,
    FileText,
    Cloud,
} from "lucide-react";

import { GithubPublishModal } from "./publish-modal";
import KeepAgentPrivateModal from "./shared-components/KeepAgentPrivateModal";

function HeaderActions() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [modalType, setModalType] = React.useState<"publish" | "private">("publish");

  const openModal = (type: "publish" | "private") => {
    setModalType(type);
    setIsModalOpen(true);
  };

  return (
    <div className="flex items-center gap-2 sm:gap-4 mt-2 sm:mt-0">
      <button className="text-gray-600 hover:text-gray-800 transition-colors hidden sm:block" aria-label="Refresh">
        <RefreshCw size={18} />
      </button>
      <button
        onClick={() => openModal("private")}
        className="rounded-lg border border-gray-300 bg-white px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors whitespace-nowrap"
      >
        <span className="hidden sm:inline">Save as Private</span>
        <span className="sm:hidden">Save</span>
      </button>
      <button
        onClick={() => openModal("publish")}
        className="rounded-lg bg-[#1a6b5a] px-4 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-white hover:bg-[#155a4a] transition-colors"
      >
        Publish
      </button>

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
    </div>
  );
}

export default function TopBar() {
  return (
    <div className="min-h-[56px] flex flex-wrap items-center justify-between px-2 pb-4 shrink-0 border-b border-gray-200 mb-4 gap-y-2">
      <div className="flex items-center gap-3 sm:gap-4">
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