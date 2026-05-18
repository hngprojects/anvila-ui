import * as React from "react";

import { DemoSidebar } from "@/components/dashboard/demo-sidebar";
import { cn } from "@/lib/utils";

type DashboardLayoutProps = {
  children: React.ReactNode;
  /** Optional page header (title, actions) rendered above main content. */
  header?: React.ReactNode;
  /** Highlighted demo sidebar item id. */
  activeSidebarId?: string;
  className?: string;
  mainClassName?: string;
};

export function DashboardLayout({
  children,
  header,
  activeSidebarId,
  className,
  mainClassName,
}: DashboardLayoutProps) {
  return (
    <div
      className={cn(
        "flex min-h-screen bg-dashboard-bg text-white",
        className,
      )}
    >
      <DemoSidebar activeId={activeSidebarId} />
      <div className="flex min-h-screen min-w-0 flex-1 flex-col">
        {header}
        <main className={cn("flex min-h-0 flex-1 flex-col", mainClassName)}>
          {children}
        </main>
      </div>
    </div>
  );
}
