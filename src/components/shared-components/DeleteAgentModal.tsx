import { Trash2 } from "lucide-react";

export default function DeleteAgentModal() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="w-full max-w-sm rounded-2xl bg-white shadow-xl p-6 mx-4 overflow-visible">

        {/* Icon */}
        <div className="flex items-center justify-center w-10 h-10 rounded-full mx-auto">
          <Trash2 className="w-5 h-5 text-red-500" />
        </div>

        {/* Text */}
        <div className="mt-4 text-center">
          <h3 className="text-sm font-semibold text-gray-900">Delete agent</h3>
          <p className="mt-1.5 text-xs text-gray-500 leading-relaxed">
            Are you sure you want to delete{" "}
            <span className="font-medium text-gray-700">Customer Support Agent</span>?
            This action cannot be undone.
          </p>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex flex-row gap-2">
          <button className="flex-1 rounded-lg border border-gray-200 px-4 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 cursor-pointer transition-colors">
            Cancel
          </button>
          <button className="flex-1 rounded-lg bg-[#DC2626] hover:bg-[#B91C1C] px-4 py-2 text-xs font-medium text-white cursor-pointer transition-all duration-200">
           Delete Agent
          </button>
        </div>

      </div>
    </div>
  );
}