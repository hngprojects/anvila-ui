"use client";

import { useState } from "react";
import { ChevronDown, LogOut } from "lucide-react";

import { useAuth } from "@/context/auth";

export default function UserMenu({ collapsed = false }: { collapsed?: boolean }) {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  const name = user?.display_name ?? user?.email ?? "User";
  const email = user?.email ?? "";
  const plan = user?.plan ?? "Free";

  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  if (collapsed) {
    return (
      <div className="relative">
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          title={name}
          aria-label="User menu"
          className="flex size-6 shrink-0 items-center justify-center rounded-3xl bg-teal-brand px-[3px] py-1"
        >
          <span className="text-center font-sans text-xs font-normal text-white">
            {initials}
          </span>
        </button>

        {open && (
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 rounded-xl border border-gray-200 bg-white p-3 shadow-lg">
            <div className="border-b border-gray-100 pb-3">
              <p className="text-sm font-semibold text-gray-900">{name}</p>
              <p className="mt-1 truncate text-xs text-gray-500">{email}</p>
            </div>
            <button
              type="button"
              onClick={logout}
              className="mt-3 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
            >
              <LogOut size={14} />
              Logout
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="flex w-full items-center gap-3 px-4 py-4 border-t border-gray-100 text-left"
      >
        <div className="w-8 h-8 rounded-full bg-[#1a6b5a] flex items-center justify-center shrink-0">
          <span className="text-white text-[11px] font-semibold">{initials}</span>
        </div>
        <div className="flex min-w-0 flex-1 flex-col">
          <span className="truncate text-sm font-medium text-gray-800">{name}</span>
          <span className="truncate text-xs text-gray-400 capitalize">{plan}</span>
        </div>
        <ChevronDown size={14} className="shrink-0 text-gray-400" />
      </button>

      {open && (
        <div className="absolute bottom-full left-3 right-3 mb-2 rounded-xl border border-gray-200 bg-white p-3 shadow-lg">
          <div className="border-b border-gray-100 pb-3">
            <p className="text-sm font-semibold text-gray-900">{name}</p>
            <p className="mt-1 truncate text-xs text-gray-500">{email}</p>
          </div>
          <button
            type="button"
            onClick={logout}
            className="mt-3 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
          >
            <LogOut size={14} />
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
