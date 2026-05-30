import { CircleCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DeleteSuccessModalProps {
  onBackToAgents?: () => void;
}

export default function DeleteSuccessModal({ onBackToAgents }: DeleteSuccessModalProps) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="delete-success-title"
      aria-describedby="delete-success-description"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
    >
      <div className="w-full max-w-sm rounded-2xl bg-white shadow-xl p-10 mx-4 flex flex-col items-center text-center">
        <CircleCheck className="w-12 h-12 text-green-600" strokeWidth={1.5} />

        <h3 id="delete-success-title" className="mt-4 text-lg font-bold text-gray-900">
          Successfully Deleted
        </h3>

        <p id="delete-success-description" className="mt-2 text-sm text-gray-500">
          The agent has been permanently removed.
        </p>

        <Button type="button" onClick={onBackToAgents} className="mt-6 w-full rounded-lg bg-[#1a3a34] hover:bg-[#14302a] px-4 py-2.5 text-sm font-medium text-white">
          Back to My Agents
        </Button>
      </div>
    </div>
  );
}
