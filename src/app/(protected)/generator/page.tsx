"use client";
import MainPage from "@/components/protected/mainContent";

// Replace with your real auth hook: import { useAuth } from "@/context/auth";
function useAuth() {
  return { user: { email: "amy@example.com", display_name: "Amy" } };
}

export default function AnvilaLayout() {
  const { user } = useAuth();
  return (
    <div className="flex h-screen w-full bg-gray-100 gap-3 font-sans overflow-hidden">
     

      {/* Right column */}
      <div className="flex flex-1 flex-col min-w-0 gap-0">
        <MainPage user={user} />
      </div>
    </div>
  );
}
