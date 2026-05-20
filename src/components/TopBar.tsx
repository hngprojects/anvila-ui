import * as React from "react";
import {
    Eye,
    RefreshCw,
    FileText,
    Cloud,
    CircleCheck,
} from "lucide-react";
import Modal from "./Modal";

// ─── Header Actions ───────────────────────────────────────────────────────────

function HeaderActions() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [modalType, setModalType] = React.useState<"publish" | "private">("publish");

  const openModal = (type: "publish" | "private") => {
    setModalType(type);
    setIsModalOpen(true);
  };

  return (
    <div className="flex items-center gap-4">
      <button className="text-gray-600 hover:text-gray-800 transition-colors" aria-label="Refresh">
        <RefreshCw size={18} />
      </button>
      <button 
        onClick={() => openModal("private")}
        className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
      >
        Save as Private
      </button>
      <button 
        onClick={() => openModal("publish")}
        className="rounded-lg bg-[#1a6b5a] px-6 py-2 text-sm font-medium text-white hover:bg-[#155a4a] transition-colors"
      >
        Publish
      </button>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="flex flex-col items-center justify-center py-4 text-center">
          <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-white">
            <CircleCheck size={44} className="text-[#22c55e]" strokeWidth={2.5} />
          </div>
          <h2 className="mb-6 text-[24px] font-bold text-black tracking-tight">
            {modalType === "publish" ? "Agent Published" : "Agent Saved"}
          </h2>
          <button 
            onClick={() => setIsModalOpen(false)}
            className="rounded-xl bg-[#1a6b5a] px-5 py-2 text-[13px] font-medium text-white hover:bg-[#155a4a] transition-colors"
          >
            Manage Agents
          </button>
        </div>
      </Modal>
    </div>
  );
}

// ─── Top Bar ──────────────────────────────────────────────────────────────────

export default function TopBar() {
  return (
    <div className="h-[56px] flex items-center justify-between px-2 pb-4 shrink-0 border-b border-gray-200 mb-4">
      {/* Left items */}
      <div className="flex items-center gap-4">
        <button className="flex items-center gap-2 rounded-lg bg-[#cbe7e0] px-4 py-2 text-sm font-small text-[#1a6b5a] transition-colors">
          <Eye size={18} />
          Preview
        </button>
        <button className="text-gray-600 hover:text-gray-800 transition-colors" aria-label="Document">
          <FileText size={20} />
        </button>
        <button className="text-gray-600 hover:text-gray-800 transition-colors" aria-label="Cloud">
          <Cloud size={20} />
        </button>
      </div>

      <HeaderActions />
    </div>
  );
}