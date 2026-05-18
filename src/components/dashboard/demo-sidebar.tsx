"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { LogoIcon } from "@/components/icons";
import { cn } from "@/lib/utils";
import { DEMO_SIDEBAR_ITEMS } from "@/data/demo-sidebar";

type DemoSidebarProps = {
  activeId?: string;
  className?: string;
};

export function DemoSidebar({ activeId = "apps", className }: DemoSidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "flex w-[72px] shrink-0 flex-col items-center border-r border-dashboard-border bg-dashboard-sidebar py-6",
        className,
      )}
    >
      <Link
        href="/generator"
        className="mb-8 flex size-10 items-center justify-center rounded-xl text-teal-brand"
        aria-label="Anvila home"
      >
        <LogoIcon className="size-8" />
      </Link>

      <nav className="flex flex-1 flex-col items-center gap-2" aria-label="Main">
        {DEMO_SIDEBAR_ITEMS.map((item) => {
          const isActive =
            item.id === activeId ||
            (item.href !== "#" && pathname === item.href && activeId === undefined);
          const Icon = item.icon;

          return (
            <Link
              key={item.id}
              href={item.href}
              title={item.label}
              className={cn(
                "flex size-11 items-center justify-center rounded-xl text-white/50 transition-colors hover:bg-white/5 hover:text-white",
                isActive && "bg-teal-brand text-white hover:bg-teal-brand hover:text-white",
              )}
              aria-current={isActive ? "page" : undefined}
            >
              <Icon className="size-5" strokeWidth={1.75} />
              <span className="sr-only">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
