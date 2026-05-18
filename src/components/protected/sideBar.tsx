"use client";

import { useState } from "react";

import { Logo, Github } from "@/components/icons";

import {
  Plus,
  Search,
  Compass,
  Bot,
  ChevronDown,
  MoreHorizontal,
  X,
 PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";

import type {
  SidebarProps,
  CollapsedSidebarProps,
  ExpandedSidebarProps,
  MobileDrawerProps,
} from "@/types";

/* -------------------------------------------------------------------------- */
/*                                    DATA                                    */
/* -------------------------------------------------------------------------- */

const NAV_ITEMS = [
  { icon: Plus, label: "Create Agent", active: true },
  { icon: Search, label: "Search" },
  { icon: Compass, label: "Explore" },
  { icon: Bot, label: "My Agents" },
  { icon: Github, label: "GitHub" },
];

const RECENT_ITEMS = [
  "Real estate marketing ca...",
  "7 days of social media...",
  "Business plan outline...",
  "Landing page copy for...",
];

/* -------------------------------------------------------------------------- */
/*                                 USER AVATAR                                */
/* -------------------------------------------------------------------------- */

function UserAvatar({
  name,
  showName,
}: {
  name: string;
  showName?: boolean;
}) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  if (showName) {
    return (
      <div className="flex items-center gap-2 px-4 py-4 border-t border-gray-100">
        <div className="w-7 h-7 rounded-full bg-[#1a6b5a] flex items-center justify-center shrink-0">
          <span className="text-white text-[10px] font-semibold">
            {initials}
          </span>
        </div>

        <span className="text-sm text-gray-700 truncate">{name}</span>
      </div>
    );
  }

  return (
    <div className="w-7 h-7 rounded-full bg-[#1a6b5a] flex items-center justify-center">
      <span className="text-white text-[10px] font-semibold">
        {initials}
      </span>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                               NAVIGATION LIST                              */
/* -------------------------------------------------------------------------- */

function NavigationItems() {
  return (
    <nav className="px-3 space-y-1">
      {NAV_ITEMS.map(({ icon: Icon, label, active }) => (
        <button
          key={label}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
            active
              ? "bg-[#1a6b5a] text-white"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          <Icon size={15} />
          {label}
        </button>
      ))}
    </nav>
  );
}

/* -------------------------------------------------------------------------- */
/*                                RECENT ITEMS                                */
/* -------------------------------------------------------------------------- */

function RecentSection() {
  const [recentOpen, setRecentOpen] = useState(true);

  return (
    <div className="mt-5 px-3 flex-1 overflow-y-auto">
      <button
        onClick={() => setRecentOpen((o) => !o)}
        className="w-full flex items-center text-xs text-gray-400 uppercase tracking-wide mb-2"
      >
        Recent

        <ChevronDown
          size={13}
          className={`ml-auto transition-transform ${
            recentOpen ? "" : "-rotate-90"
          }`}
        />
      </button>

      {recentOpen &&
        RECENT_ITEMS.map((item) => (
          <div
            key={item}
            className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-gray-100 cursor-pointer group"
          >
            <span className="text-sm text-gray-600 truncate">{item}</span>

            <MoreHorizontal
              size={14}
              className="text-gray-300 group-hover:text-gray-500 shrink-0 ml-1"
            />
          </div>
        ))}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                              COLLAPSED SIDEBAR                             */
/* -------------------------------------------------------------------------- */

function CollapsedSidebar({
  user,
  onExpand,
}: CollapsedSidebarProps) {
  const displayName = user?.display_name ?? user?.email ?? "User";

  return (
    <aside className="hidden md:flex flex-col items-center w-[56px] min-w-[56px] shrink-0 rounded-2xl bg-white border border-gray-200 shadow-sm py-4 gap-2">
      {/* Expand button */}
      <button
        onClick={onExpand}
        className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 transition-all"
      >
        <PanelLeftOpen size={15} />
      </button>

      {/* Nav icons */}
      <div className="w-full flex flex-col items-center gap-1">
        {NAV_ITEMS.map(({ icon: Icon, label, active }) => (
          <button
            key={label}
            title={label}
            className={`w-8 h-8 flex items-center justify-center rounded-lg transition-all ${
              active
                ? "bg-[#1a6b5a] text-white"
                : "text-gray-400 hover:text-gray-700 hover:bg-gray-100"
            }`}
          >
            <Icon size={15} />
          </button>
        ))}
      </div>

      <div className="flex-1" />

      {/* User */}
      <UserAvatar name={displayName} />
    </aside>
  );
}

/* -------------------------------------------------------------------------- */
/*                               EXPANDED SIDEBAR                             */
/* -------------------------------------------------------------------------- */

function ExpandedSidebar({
  user,
  onCollapse,
}: ExpandedSidebarProps) {
  const displayName =
    user?.display_name ?? user?.email ?? "User";

  return (
    <aside className="hidden md:flex flex-col w-[224px] min-w-[224px] shrink-0 rounded-2xl bg-[#FBFBFB] border border-gray-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-5 pb-4">
        <Logo />

        <button
          onClick={onCollapse}
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <PanelLeftClose size={15} />
        </button>
      </div>

      {/* Navigation */}
      <NavigationItems />

      {/* Recent */}
      <RecentSection />

      {/* User */}
      <UserAvatar name={displayName} showName />
    </aside>
  );
}

/* -------------------------------------------------------------------------- */
/*                               MOBILE DRAWER                                */
/* -------------------------------------------------------------------------- */

function MobileDrawer({
  user,
  onClose,
}: MobileDrawerProps) {
  const displayName =
    user?.display_name ?? user?.email ?? "User";

  return (
    <div className="fixed inset-0 z-50 flex md:hidden">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/30"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="relative w-64 h-full bg-white shadow-xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-4 pt-5 pb-4">
          <Logo />

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={18} />
          </button>
        </div>

        {/* Navigation */}
        <NavigationItems />

        {/* Recent */}
        <RecentSection />

        {/* User */}
        <UserAvatar name={displayName} showName />
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                                   SIDEBAR                                  */
/* -------------------------------------------------------------------------- */

export default function Sidebar({
  user,
  mobileOpen,
  onMobileClose,
}: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      {collapsed ? (
        <CollapsedSidebar
          user={user}
          onExpand={() => setCollapsed(false)}
        />
      ) : (
        <ExpandedSidebar
          user={user}
          onCollapse={() => setCollapsed(true)}
        />
      )}

      {mobileOpen && (
        <MobileDrawer
          user={user}
          onClose={onMobileClose}
        />
      )}
    </>
  );
}