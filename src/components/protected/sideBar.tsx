"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Logo, Github } from "@/components/icons";
import { rememberSession } from "@/components/protected/generator/api";
import UserMenu from "@/components/protected/UserMenu";
import type { AgentSession } from "@/lib/personas";

import {
  CirclePlus,
  // Search,
  Globe,
  Bot,
  ChevronDown,
  Trash2,
  X,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";

 

const NAV_ITEMS = [
  { icon: CirclePlus, label: "Create Agent", path: "/generator" },
  // { icon: Search, label: "Search", path: "/agents/search" },
  { icon: Globe, label: "Explore", path: "/generator/explore" },
  { icon: Bot, label: "My Agents", path: "/generator/my-agents" },
  { icon: Github, label: "GitHub", path: "/generator/github" },
];

function NavigationItems({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <nav className="px-3 space-y-1">
      {NAV_ITEMS.map(({ icon: Icon, label, path }) => {
        const isActive = isNavActive(pathname, path);
        return (
          <button
            key={label}
            onClick={() => {
              router.push(path);
              if (onNavigate) onNavigate();
            }}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
              isActive
                ? "bg-[#1a6b5a] text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <Icon size={15} />
            {label}
          </button>
        );
      })}
    </nav>
  );
}

/* -------------------------------------------------------------------------- */
/* RECENT ITEMS                                */
/* -------------------------------------------------------------------------- */

function RecentSection() {
  const [recentOpen, setRecentOpen] = useState(true);
  const [sessions, setSessions] = useState<AgentSession[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [deletingId, setDeletingId] = useState("");
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    let cancelled = false;

    async function loadSessions() {
      setIsLoading(true);

      try {
        const res = await fetch("/api/chat/sessions?size=5", { cache: "no-store" });
        const json = await res.json();

        if (!cancelled && res.ok) {
          setSessions(Array.isArray(json.data) ? json.data : []);
        }
      } catch {
        if (!cancelled) setSessions([]);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    loadSessions();

    return () => {
      cancelled = true;
    };
  }, [pathname]);

  async function handleDeleteSession(session: AgentSession) {
    const confirmed = window.confirm("Delete this chat session?");
    if (!confirmed) return;

    setDeletingId(session.sessionId);

    try {
      const res = await fetch(`/api/chat/sessions/${session.sessionId}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Could not delete session");

      setSessions((current) =>
        current.filter((item) => item.sessionId !== session.sessionId),
      );

      if (pathname === `/generator/${session.agentId}`) {
        router.push("/generator");
      }
    } catch {
    } finally {
      setDeletingId("");
    }
  }

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

      {recentOpen && isLoading && (
        <div className="px-3 py-2 text-sm text-gray-400">Loading...</div>
      )}

      {recentOpen && !isLoading && sessions.length === 0 && (
        <div className="px-3 py-2 text-sm text-gray-400">No recent agents</div>
      )}

      {recentOpen &&
        !isLoading &&
        sessions.map((session) => {
          const isActive = pathname === `/generator/${session.agentId}`;

          return (
            <div
              key={session.sessionId}
              onClick={() => {
                rememberSession(session.agentId, session.sessionId);
                router.push(`/generator/${session.agentId}`);
              }}
              className={`group w-full cursor-pointer rounded-lg px-3 py-2 text-left transition ${
                isActive ? "bg-[#1a6b5a]/10" : "hover:bg-gray-100"
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <span
                  className={`truncate text-sm ${
                    isActive ? "font-medium text-[#1a6b5a]" : "text-gray-600"
                  }`}
                >
                  {session.personaName || "Untitled agent"}
                </span>
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    handleDeleteSession(session);
                  }}
                  disabled={deletingId === session.sessionId}
                  className="flex size-6 shrink-0 items-center justify-center rounded-md text-gray-300 opacity-0 transition hover:bg-red-50 hover:text-red-600 group-hover:opacity-100 disabled:cursor-not-allowed disabled:opacity-50"
                  aria-label="Delete chat session"
                >
                  <Trash2 size={13} />
                </button>
              </div>
              {session.lastMessagePreview && (
                <p className="mt-0.5 truncate text-xs text-gray-400">
                  {session.lastMessagePreview}
                </p>
              )}
            </div>
          );
        })}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* COLLAPSED SIDEBAR                             */
/* -------------------------------------------------------------------------- */

function CollapsedSidebar({ onExpand }: { onExpand: () => void }) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <aside className="hidden md:flex flex-col items-center w-[56px] min-w-[56px] shrink-0 rounded-2xl bg-white border border-gray-200 shadow-sm py-4 gap-2">
      <button
        onClick={onExpand}
        className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100"
      >
        <PanelLeftOpen size={15} />
      </button>

      <div className="w-full flex flex-col items-center gap-1">
        {NAV_ITEMS.map(({ icon: Icon, label, path }) => {
          const isActive = isNavActive(pathname, path);
          return (
            <button
              key={label}
              title={label}
              onClick={() => router.push(path)}
              className={`w-8 h-8 flex items-center justify-center rounded-lg ${
                isActive
                  ? "bg-[#1a6b5a] text-white"
                  : "text-gray-400 hover:text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Icon size={15} />
            </button>
          );
        })}
      </div>

      <div className="flex-1" />
      <UserMenu collapsed />
    </aside>
  );
}

/* -------------------------------------------------------------------------- */
/* EXPANDED SIDEBAR                             */
/* -------------------------------------------------------------------------- */

function ExpandedSidebar({ onCollapse }: { onCollapse: () => void }) {
  return (
    <aside className="hidden md:flex flex-col w-[224px] min-w-[224px] shrink-0 rounded-2xl bg-[#FBFBFB] border border-gray-200 shadow-sm overflow-hidden">
      <div className="flex items-center justify-between px-4 pt-5 pb-4">
        <Logo />
        <button
          onClick={onCollapse}
          className="text-gray-400 hover:text-gray-600"
        >
          <PanelLeftClose size={15} />
        </button>
      </div>

      <NavigationItems />
      <RecentSection />
      <UserMenu />
    </aside>
  );
}

/* -------------------------------------------------------------------------- */
/* MOBILE DRAWER                              */
/* -------------------------------------------------------------------------- */

function MobileDrawer({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex md:hidden">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />

      <div className="relative w-64 h-full bg-white shadow-xl flex flex-col">
        <div className="flex items-center justify-between px-4 pt-5 pb-4">
          <Logo />
          <button onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <NavigationItems onNavigate={onClose} />
        <RecentSection />
        <UserMenu />
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* SIDEBAR                                  */
/* -------------------------------------------------------------------------- */

export default function Sidebar({
  mobileOpen,
  onMobileClose,
}: {
  mobileOpen: boolean;
  onMobileClose: () => void;
}) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      {collapsed ? (
        <CollapsedSidebar onExpand={() => setCollapsed(false)} />
      ) : (
        <ExpandedSidebar onCollapse={() => setCollapsed(true)} />
      )}

      {mobileOpen && <MobileDrawer onClose={onMobileClose} />}
    </>
  );
}

function isNavActive(pathname: string, path: string) {
  if (pathname === path) return true;
  if (path !== "/generator") return false;

  const reservedRoutes = new Set(
    NAV_ITEMS.filter((item) => item.path !== "/generator").map((item) => item.path),
  );

  return pathname.startsWith("/generator/") && !reservedRoutes.has(pathname);
}
