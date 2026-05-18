"use client";
import { useAuth } from "@/context/auth";
export default function Page() {
  const { user } = useAuth();
  return <div>Hi, {user?.email} - {user?.display_name}. Weclome to page</div>;
}
