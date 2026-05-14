import type { ReactNode } from "react";
import { AuthNavBar } from "@/components/auth/navbar";
import { AuthProvider } from "@/components/AuthProvider";
import { AuthStoreBridge } from "@/components/authStoreBridge";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <AuthStoreBridge />

      <div className="flex min-h-screen flex-col bg-[#fefeff]">
        <AuthNavBar />

        <div
          className="
            flex flex-1 items-center justify-center
            overflow-y-auto
            px-5 py-10
            max-md:items-start
            max-md:px-3
            max-md:py-5
          "
        >
          {children}
        </div>
      </div>
    </AuthProvider>
  );
}