"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  Logo,
  SidebarPanelIcon,
  NavPlusIcon,
  NavExploreIcon,
  NavMyAgentsIcon,
  NavGithubCatIcon,
} from "@/components/icons";

import { rememberSession } from "@/components/protected/generator/api";
import UserMenu from "@/components/protected/UserMenu";
import { ChevronDown, Trash2, X } from "lucide-react";
import type { AgentSession } from "@/types/agent";

const NAV_ITEMS = [
  { icon: NavPlusIcon, label: "Create Agent", path: "/generator" },
  { icon: NavExploreIcon, label: "Explore", path: "/generator/explore" },
  { icon: NavMyAgentsIcon, label: "My Agents", path: "/generator/my-agents" },
  { icon: NavGithubCatIcon, label: "GitHub", path: "/generator/github" },
];

function NavigationItems({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <nav className="flex flex-col items-start gap-1 self-stretch">
      {NAV_ITEMS.map(({ icon: Icon, label, path }) => {
        const isActive = isNavActive(pathname, path);
        return (
          <button
            key={label}
            onClick={() => { router.push(path); onNavigate?.(); }}
            className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all ${
              isActive ? "bg-teal-brand text-white" : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <Icon />
            {label}
          </button>
        );
      })}
    </nav>
  );
}

function RecentSection() {
  const [recentOpen, setRecentOpen] = useState(true);
  const [sessions, setSessions] = useState<AgentSession[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [deletingId, setDeletingId] = useState("");
  const pathname = usePathname();
  const router = useRouter();
  const [typing, setTyping] = useState<{ agentId: string; display: string } | null>(null);

  useEffect(() => {
    if (typeof BroadcastChannel === "undefined") return;
    const bc = new BroadcastChannel("agent-sessions");
    let interval: ReturnType<typeof setInterval> | null = null;

    bc.onmessage = (event) => {
      const { type, agentId, name } = event.data ?? {};
      if (type !== "update-name" || !agentId || !name) return;
      if (interval) clearInterval(interval);
      let i = 0;
      setTyping({ agentId, display: "" });
      interval = setInterval(() => {
        i++;
        setTyping({ agentId, display: name.slice(0, i) });
        if (i >= name.length) {
          if (interval) clearInterval(interval);
          setSessions((prev) => prev.map((s) => s.agentId === agentId ? { ...s, personaName: name } : s));
          setTyping(null);
        }
      }, 40);
    };

    return () => { if (interval) clearInterval(interval); bc.close(); };
  }, []);

  useEffect(() => {
    let cancelled = false;
    async function loadSessions() {
      setIsLoading(true);
      try {
        const res = await fetch("/api/chat/sessions?size=5", { cache: "no-store" });
        const json = await res.json();
        if (!cancelled && res.ok) setSessions(Array.isArray(json.data) ? json.data : []);
      } catch {
        if (!cancelled) setSessions([]);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }
    loadSessions();
    return () => { cancelled = true; };
  }, [pathname]);

  async function handleDeleteSession(session: AgentSession) {
    if (!window.confirm("Delete this chat session?")) return;
    setDeletingId(session.sessionId);
    try {
      const res = await fetch(`/api/chat/sessions/${session.sessionId}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Could not delete session");
      setSessions((c) => c.filter((i) => i.sessionId !== session.sessionId));
      if (pathname === `/generator/${session.agentId}`) router.push("/generator");
    } catch {
    } finally {
      setDeletingId("");
    }
  }

  return (
    <div className="mt-5 flex-1 overflow-y-auto px-3">
      <button
        onClick={() => setRecentOpen((o) => !o)}
        className="mb-2 flex w-full items-center text-xs uppercase tracking-wide text-gray-400"
      >
        Recent
        <ChevronDown size={13} className={`ml-auto transition-transform ${recentOpen ? "" : "-rotate-90"}`} />
      </button>

      {recentOpen && isLoading && <div className="px-3 py-2 text-sm text-gray-400">Loading...</div>}
      {recentOpen && !isLoading && sessions.length === 0 && <div className="px-3 py-2 text-sm text-gray-400">No recent agents</div>}

      {recentOpen && !isLoading && sessions.map((session) => {
        const isActive = pathname === `/generator/${session.agentId}`;
        const displayName = typing?.agentId === session.agentId ? typing.display : (session.personaName || "Untitled agent");
        return (
          <div
            key={session.sessionId}
            onClick={() => { rememberSession(session.agentId, session.sessionId); router.push(`/generator/${session.agentId}`); }}
            className={`group w-full cursor-pointer rounded-lg px-3 py-2 transition ${isActive ? "bg-teal-brand/10" : "hover:bg-gray-100"}`}
          >
            <div className="flex items-center justify-between gap-2">
              <span className={`truncate text-sm ${isActive ? "font-medium text-teal-brand" : "text-gray-600"}`}>
                {displayName}{typing?.agentId === session.agentId && <span className="animate-pulse">|</span>}
              </span>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); handleDeleteSession(session); }}
                disabled={deletingId === session.sessionId}
                className="flex size-6 shrink-0 items-center justify-center rounded-md text-gray-300 opacity-0 transition hover:bg-red-50 hover:text-red-600 group-hover:opacity-100 disabled:cursor-not-allowed disabled:opacity-50"
                aria-label="Delete chat session"
              >
                <Trash2 size={13} />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function CollapsedSidebar({ onExpand }: { onExpand: () => void }) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <aside className="hidden md:flex w-[72px] min-w-[72px] shrink-0 flex-col items-start gap-2 rounded-3xl border border-sidebar-border bg-sidebar-bg p-4">
      <button onClick={onExpand} className="flex items-center justify-center" aria-label="Expand sidebar">
        <SidebarPanelIcon />
      </button>

      <div className="flex flex-col items-start gap-1 self-stretch">
        {NAV_ITEMS.map(({ icon: Icon, label, path }) => {
          const isActive = isNavActive(pathname, path);
          return (
            <button
              key={label}
              title={label}
              aria-label={label}
              onClick={() => router.push(path)}
              className={isActive
                ? "flex h-12 shrink-0 items-center justify-center gap-[10px] self-stretch rounded-lg bg-teal-brand px-[10px]"
                : "flex items-center justify-center rounded-lg p-2 text-[#27272A] hover:bg-gray-100"
              }
            >
              <Icon />
            </button>
          );
        })}
      </div>

      <div className="flex-1" />

      <div className="flex h-20 w-full flex-col items-start justify-between self-stretch border-t border-border-subtle p-[10px]">
        <UserMenu collapsed />
      </div>
    </aside>
  );
}

function ExpandedSidebar({ onCollapse }: { onCollapse: () => void }) {
  return (
    <aside className="hidden md:flex w-[224px] min-w-[224px] shrink-0 flex-col overflow-hidden rounded-3xl border border-sidebar-border bg-sidebar-bg">
      <div className="flex items-center justify-between px-4 pb-4 pt-5">
        <Logo />
        <button onClick={onCollapse} className="text-[#A1A1AA] hover:text-gray-600" aria-label="Collapse sidebar">
          <SidebarPanelIcon />
        </button>
      </div>
      <NavigationItems />
      <RecentSection />
      <div className="flex h-20 flex-col items-start justify-between self-stretch border-t border-border-subtle p-[10px]">
        <UserMenu />
      </div>
    </aside>
  );
}

function MobileDrawer({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex md:hidden">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      <div className="relative flex h-full w-64 flex-col bg-white shadow-xl">
        <div className="flex items-center justify-between px-4 pb-4 pt-5">
          <Logo />
          <button onClick={onClose} aria-label="Close menu"><X size={18} /></button>
        </div>
        <NavigationItems onNavigate={onClose} />
        <RecentSection />
        <UserMenu />
      </div>
    </div>
  );
}

export default function Sidebar({ mobileOpen, onMobileClose }: { mobileOpen: boolean; onMobileClose: () => void }) {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <>
      {collapsed ? <CollapsedSidebar onExpand={() => setCollapsed(false)} /> : <ExpandedSidebar onCollapse={() => setCollapsed(true)} />}
      {mobileOpen && <MobileDrawer onClose={onMobileClose} />}
    </>
  );
}

function isNavActive(pathname: string, path: string) {
  if (pathname === path) return true;
  if (path !== "/generator") return false;
  const reserved = new Set(NAV_ITEMS.filter((i) => i.path !== "/generator").map((i) => i.path));
  return pathname.startsWith("/generator/") && !reserved.has(pathname);
}
