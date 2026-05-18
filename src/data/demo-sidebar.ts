import type { LucideIcon } from "lucide-react";
import {
  FolderOpen,
  Home,
  LayoutGrid,
  MessageSquare,
  Search,
  Settings,
} from "lucide-react";

export type DemoSidebarItem = {
  id: string;
  label: string;
  icon: LucideIcon;
  href: string;
};

/** Placeholder nav — replace with real routes when auth shell is ready. */
export const DEMO_SIDEBAR_ITEMS: DemoSidebarItem[] = [
  { id: "home", label: "Home", icon: Home, href: "/generator" },
  { id: "apps", label: "Apps", icon: LayoutGrid, href: "/generator" },
  { id: "chat", label: "Chat", icon: MessageSquare, href: "/generator" },
  { id: "folder", label: "Folder", icon: FolderOpen, href: "/generator" },
  { id: "search", label: "Search", icon: Search, href: "/generator" },
  { id: "settings", label: "Settings", icon: Settings, href: "/generator" },
];
