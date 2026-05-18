"use client";

import MainPage from "@/components/protected/mainContent";
import { useAuth } from "@/context/auth";

export default function AnvilaLayout() {
  const { user } = useAuth();

  return (
    <div className="flex h-screen w-full bg-[#FBFBFB] gap-3 font-sans overflow-hidden">
      {/* Right column */}
      <div className="flex flex-1 flex-col min-w-0 h-full overflow-hidden">
        <MainPage user={user ?? undefined} />
      </div>
    </div>
  );
}