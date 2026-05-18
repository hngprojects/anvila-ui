"use client";

import { useState } from "react";
import { TextAlignJustify } from "lucide-react";
import Sidebar from "@/components/protected/sideBar";
import { Logo } from "@/components/icons";
import { useAuth, AuthProvider } from "@/context/auth";

export default function GeneratorClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <LayoutContent>{children}</LayoutContent>
    </AuthProvider>
  );
}

/* ---------------- INTERNAL COMPONENT ---------------- */

function LayoutContent({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* background grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,#D4D4D8_1px,transparent_1px)] [background-size:24px_24px]"
      />

      <div className="h-screen relative w-full flex p-3 gap-3 overflow-hidden font-sans">
        {/* Sidebar */}
        <Sidebar
          mobileOpen={mobileOpen}
          onMobileClose={() => setMobileOpen(false)}
        />

        {/* Right side */}
        <div className="flex flex-1 flex-col min-w-0 h-full overflow-hidden">
          {/* Mobile top bar */}
          <div className="flex md:hidden items-center pb-3 shrink-0">
            <button
              onClick={() => setMobileOpen(true)}
              className="w-9 h-9 flex items-center justify-center text-gray-600"
            >
              <TextAlignJustify size={20} />
            </button>

            <div className="flex items-center gap-1.5">
              <Logo />
              {!mobileOpen && (
                <span className="text-[#1a6b5a] font-bold text-xs uppercase">
                  Anvila
                </span>
              )}
            </div>
          </div>

          {/* Page */}
          <div className="flex-1 min-h-0 overflow-hidden"><AuthProvider>{children}</AuthProvider></div>
        </div>
      </div>
    </>
  );
}