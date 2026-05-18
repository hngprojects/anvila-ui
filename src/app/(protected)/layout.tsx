"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import Sidebar from "@/components/protected/sideBar";
import { Logo } from "@/components/icons";

function useAuth() {
  return { user: { email: "amy@example.com", display_name: "Amy" } };
}

export default function GeneratorClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="h-screen w-full bg-[#FBFBFB] flex p-3 gap-3 overflow-hidden font-sans">
      {/* Sidebar */}
      <Sidebar
        user={user}
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />

      {/* Right side */}
      <div className="flex flex-1 flex-col min-w-0 h-full overflow-hidden">
        {/* Mobile top bar */}
        <div className="flex md:hidden items-center gap-3 pb-3 shrink-0">
          <button
            onClick={() => setMobileOpen(true)}
            className="w-9 h-9 flex items-center justify-center rounded-xl bg-white shadow-sm text-gray-600 hover:bg-gray-50 transition-all"
          >
            <Menu size={18} />
          </button>

          <div className="flex items-center gap-1.5">
            <Logo />
            {!mobileOpen && (
              <span className="text-[#1a6b5a] font-bold text-xs tracking-widest uppercase">
                Anvila
              </span>
            )}
          </div>
        </div>

        {/* Page */}
        <div className="flex-1 min-h-0 overflow-hidden">{children}</div>
      </div>
    </div>
  );
}