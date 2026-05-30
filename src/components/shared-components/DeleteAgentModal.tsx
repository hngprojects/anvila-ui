import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

type DeleteAgentModalProps = {
  agentName: string;
  isDeleting?: boolean;
  onCancel: () => void;
  onConfirmDelete: () => void;
};

export default function DeleteAgentModal({ agentName, isDeleting, onCancel, onConfirmDelete }: DeleteAgentModalProps) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="delete-agent-title"
      aria-describedby="delete-agent-description"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
    >
      <div className="w-full max-w-sm rounded-2xl bg-white shadow-xl p-6 mx-4 overflow-visible">
        <div className="flex items-center justify-center w-10 h-10 rounded-full mx-auto">
          <Trash2 className="w-5 h-5 text-red-500" />
        </div>

        <div className="mt-4 text-center">
          <h3 id="delete-agent-title" className="text-sm font-semibold text-gray-900">
            Delete agent
          </h3>
          <p id="delete-agent-description" className="mt-1.5 text-xs text-gray-500 leading-relaxed">
            Are you sure you want to delete <span className="font-medium text-gray-700">{agentName}</span>? This action cannot be undone.
          </p>
        </div>

        <div className="mt-6 flex flex-row gap-2">
          <Button type="button" size="sm" disabled={isDeleting} onClick={onCancel} className="flex-1 border border-[#005F5A] bg-[#005F5A] px-4 py-2 text-xs font-medium text-white hover:bg-[#005F5A] disabled:cursor-not-allowed disabled:opacity-60">
            Cancel
          </Button>
          <Button type="button" variant="destructive" size="sm" disabled={isDeleting} onClick={onConfirmDelete} className="flex-1 border border-red-600 bg-white px-4 py-2 text-xs font-medium text-red-600 hover:bg-red-50 hover:border-red-600 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-60">
            Delete Agent
          </Button>
        </div>
      </div>
    </div>
  );
}
