"use client";

import { Download, Eye, Share2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type CreateAgentHeaderActionsProps = {
  onPreview?: () => void;
  onSavePrivate?: () => void;
  onPublish?: () => void;
  isPublishing?: boolean;
  className?: string;
};

export function CreateAgentHeaderActions({
  onPreview,
  onSavePrivate,
  onPublish,
  isPublishing = false,
  className,
}: CreateAgentHeaderActionsProps) {
  return (
    <div className={cn("flex flex-wrap items-center gap-2 sm:gap-3", className)}>
      <Button
        type="button"
        variant="outline"
        className="h-9 gap-2 rounded-lg border-white/20 bg-transparent text-sm text-white hover:bg-white/10 hover:text-white"
        onClick={onPreview}
      >
        <Eye className="size-4" />
        Preview
      </Button>

      <div className="hidden items-center gap-1 sm:flex">
        <button
          type="button"
          className="flex size-9 items-center justify-center rounded-lg text-white/60 transition-colors hover:bg-white/10 hover:text-white"
          aria-label="Share"
        >
          <Share2 className="size-4" />
        </button>
        <button
          type="button"
          className="flex size-9 items-center justify-center rounded-lg text-white/60 transition-colors hover:bg-white/10 hover:text-white"
          aria-label="Download"
        >
          <Download className="size-4" />
        </button>
      </div>

      <Button
        type="button"
        variant="ghost"
        className="h-9 text-sm text-white/80 hover:bg-white/10 hover:text-white"
        onClick={onSavePrivate}
        disabled={isPublishing}
      >
        Save as Private
      </Button>

      <Button
        type="button"
        className="h-9 rounded-lg bg-teal-brand px-5 text-sm text-white hover:bg-teal-brand/90"
        onClick={onPublish}
        disabled={isPublishing}
      >
        Publish
      </Button>
    </div>
  );
}
