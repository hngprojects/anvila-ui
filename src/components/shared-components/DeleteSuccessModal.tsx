import { CircleCheck  } from "lucide-react";

export default function DeleteSuccessModal() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="w-full max-w-sm rounded-2xl bg-white shadow-xl p-10 mx-4 flex flex-col items-center text-center">

        {/* Icon */}
        <CircleCheck  className="w-12 h-12 text-green-600" strokeWidth={1.5} />

        {/* Text */}
        <h3 className="mt-4 text-lg font-bold text-gray-900">Successfully Deleted</h3>

        {/* Button */}
        <button className="mt-6 w-full rounded-lg bg-[#1a3a34] hover:bg-[#14302a] px-4 py-2.5 text-sm font-medium text-white cursor-pointer transition-colors">
          Back to My Agents
        </button>

      </div>
    </div>
  );
}