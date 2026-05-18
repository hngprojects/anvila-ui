import * as React from "react";

import { cn } from "@/lib/utils";

type DashboardHeaderProps = {
  title: string;
  actions?: React.ReactNode;
  className?: string;
};

export function DashboardHeader({
  title,
  actions,
  className,
}: DashboardHeaderProps) {
  return (
    <header
      className={cn(
        "flex shrink-0 flex-wrap items-left justify-between gap-4 border-b border-dashboard-border px-6 py-4",
        className,
      )}
    >
      {/* <h1 className="text-lg font-medium capitalize tracking-tight text-white">
        {title}
      </h1> */}
      {actions ? (
        <div className="flex flex-wrap items-right gap-3">{actions}</div>
      ) : null}
    </header>
  );
}
