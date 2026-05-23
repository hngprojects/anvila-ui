"use client";

import { useState, useEffect } from "react";
import { TextAlignJustify } from "lucide-react";
import Sidebar from "@/components/protected/sideBar";
import { Logo } from "@/components/icons";
import { AuthProvider } from "@/context/auth";
import { AgentProvider } from "@/context/agent";
import { usePathname } from "next/navigation";

export default function GeneratorClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <AgentProvider>
        <LayoutContent>{children}</LayoutContent>
      </AgentProvider>
    </AuthProvider>
  );
}
 

function LayoutContent({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const isPreviewPage = pathname?.startsWith("/generator/create-agent") || pathname?.startsWith("/generator/my-agents") || false;

  useEffect(() => {
    const handleToggle = () => setMobileOpen((prev) => !prev);
    window.addEventListener("toggle-sidebar", handleToggle);
    return () => window.removeEventListener("toggle-sidebar", handleToggle);
  }, []);

  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,#D4D4D8_1px,transparent_1px)] [background-size:24px_24px]"
      />

      <div className="h-screen relative w-full flex p-3 gap-3 overflow-hidden font-sans">
      
        <Sidebar
          mobileOpen={mobileOpen}
          onMobileClose={() => setMobileOpen(false)}
        />

        <div className="flex flex-1 flex-col min-w-0 h-full overflow-hidden">
          {!isPreviewPage && (
            <div className="layout-mobile-topbar flex md:hidden items-center pb-3 shrink-0">
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
          )}

          <div className="flex-1 min-h-0 overflow-hidden">
            {children} 
          </div>
        </div>
      </div>
    </>
  );
}
