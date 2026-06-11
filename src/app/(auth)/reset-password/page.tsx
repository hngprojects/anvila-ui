import { Suspense } from "react";
import SetNewPasswordForm from "@/components/auth/ResetPasswordForm";
import { Loader2 } from "lucide-react";

export default function ResetPasswordPage() {
  return (
    <Suspense 
      fallback={
        <div className="flex w-full max-w-[520px] h-[400px] flex-col items-center justify-center rounded-xl border border-[#E6E6E6] bg-[#F6F7F7] p-6 sm:p-8">
          <Loader2 className="animate-spin h-8 w-8 text-[#004D4D]" />
          <p className="text-xs text-[#667085] mt-2 font-medium">Loading...</p>
        </div>
      }
    >
      <SetNewPasswordForm />
    </Suspense>
  );
}