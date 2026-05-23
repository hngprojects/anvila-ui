"use client";

import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

export type StatusModalVariant = "loading" | "success" | "error";

export type StatusModalAction = {
  label: string;
  onClick: () => void;
};

export type StatusModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  variant: StatusModalVariant;
  title: string;
  description?: string;
  primaryAction?: StatusModalAction;
  /** When true, overlay clicks and escape won't close (e.g. while publishing). */
  preventClose?: boolean;
  className?: string;
};

const variantConfig: Record<
  StatusModalVariant,
  {
    icon: React.ReactNode;
    iconClassName: string;
  }
> = {
  loading: {
    icon: <Loader2 className="size-8 animate-spin text-teal-accent" />,
    iconClassName: "bg-teal-accent/10",
  },
  success: {
    icon: <CheckCircle2 className="size-8 text-emerald-600" />,
    iconClassName: "bg-emerald-50",
  },
  error: {
    icon: <AlertCircle className="size-8 text-red-500" />,
    iconClassName: "bg-red-50",
  },
};

export function StatusModal({
  open,
  onOpenChange,
  variant,
  title,
  description,
  primaryAction,
  preventClose = false,
  className,
}: StatusModalProps) {
  const { icon, iconClassName } = variantConfig[variant];
  const isLoading = variant === "loading";
  const blockClose = preventClose || isLoading;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={!blockClose}
        className={cn(
          "max-w-sm gap-0 rounded-3xl border-none p-8 text-center shadow-2xl sm:max-w-sm",
          className,
        )}
        onEscapeKeyDown={(event) => {
          if (blockClose) event.preventDefault();
        }}
        onPointerDownOutside={(event) => {
          if (blockClose) event.preventDefault();
        }}
        onInteractOutside={(event) => {
          if (blockClose) event.preventDefault();
        }}
      >
        <div className="flex flex-col items-center gap-5">
          <div
            className={cn(
              "flex size-16 items-center justify-center rounded-full",
              iconClassName,
            )}
          >
            {icon}
          </div>

          <div className="space-y-2">
            <DialogTitle className="text-xl font-semibold text-logo">
              {title}
            </DialogTitle>
            {description ? (
              <DialogDescription className="text-sm leading-relaxed text-copy-muted">
                {description}
              </DialogDescription>
            ) : null}
          </div>

          {primaryAction && !isLoading ? (
            <Button
              className="mt-2 h-11 w-full rounded-xl bg-primary text-white hover:bg-primary/90"
              onClick={primaryAction.onClick}
            >
              {primaryAction.label}
            </Button>
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
  );
}
