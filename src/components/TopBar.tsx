import * as React from "react";
import {
    ChevronRight,
    Eye,
    RefreshCw,
    Download,
    FileText,
    Plus,
    ArrowUp,
    ThumbsUp,
    ThumbsDown,
    Copy,
    MoreHorizontal,
    Pencil,
    Cloud,
} from "lucide-react";

// ─── Header Actions ───────────────────────────────────────────────────────────

function HeaderActions() {
  return (
    <div className="flex items-center gap-4">
      <button className="text-gray-600 hover:text-gray-800 transition-colors" aria-label="Refresh">
        <RefreshCw size={18} />
      </button>
      <button className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
        Save as Private
      </button>
      <button className="rounded-lg bg-[#1a6b5a] px-6 py-2 text-sm font-medium text-white hover:bg-[#155a4a] transition-colors">
        Publish
      </button>
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