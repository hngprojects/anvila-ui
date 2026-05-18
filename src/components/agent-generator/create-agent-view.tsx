"use client";

import * as React from "react";

import { AgentChatPanel } from "@/components/agent-generator/agent-chat-panel";
import { AgentDetailsPanel } from "@/components/agent-generator/agent-details-panel";
import { CreateAgentHeaderActions } from "@/components/agent-generator/create-agent-header-actions";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { StatusModal, type StatusModalVariant } from "@/components/ui/status-modal";
import {
  DEMO_AGENT,
  DEMO_CHAT_MESSAGES,
  type ChatMessage,
} from "@/data/demo-agent";

type PublishModalState = {
  open: boolean;
  variant: StatusModalVariant;
};

const PUBLISH_DELAY_MS = 2000;

/** Demo publish: succeeds unless URL has ?publish=fail */
function shouldSimulatePublishFailure(): boolean {
  if (typeof window === "undefined") return false;
  return new URLSearchParams(window.location.search).get("publish") === "fail";
}

export function CreateAgentView() {
  const [messages, setMessages] = React.useState<ChatMessage[]>(DEMO_CHAT_MESSAGES);
  const [modal, setModal] = React.useState<PublishModalState>({
    open: false,
    variant: "loading",
  });
  const publishTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );

  React.useEffect(() => {
    return () => {
      if (publishTimeoutRef.current) clearTimeout(publishTimeoutRef.current);
    };
  }, []);

  function handleSend(content: string) {
    setMessages((prev) => [
      ...prev,
      { id: crypto.randomUUID(), role: "user", content },
      {
        id: crypto.randomUUID(),
        role: "assistant",
        content:
          "Thanks — I'll refine the agent configuration based on your message. (Demo response)",
      },
    ]);
  }

  function closeModal() {
    setModal((prev) => ({ ...prev, open: false }));
  }

  function handlePublish() {
    setModal({ open: true, variant: "loading" });

    if (publishTimeoutRef.current) clearTimeout(publishTimeoutRef.current);

    publishTimeoutRef.current = setTimeout(() => {
      const failed = shouldSimulatePublishFailure();
      setModal({
        open: true,
        variant: failed ? "error" : "success",
      });
    }, PUBLISH_DELAY_MS);
  }

  function handleRetryPublish() {
    handlePublish();
  }

  const isLoading = modal.open && modal.variant === "loading";

  return (
    <>
      <DashboardLayout
        activeSidebarId="apps"
        // header={
        //   <DashboardHeader
        //     title="create agent"
        //     actions={
        //       <CreateAgentHeaderActions
        //         onPublish={handlePublish}
        //         isPublishing={isLoading}
        //       />
        //     }
        //   />
        // }
        mainClassName="min-h-0 p-4 sm:p-6"
      >
        <div className="grid min-h-0 flex-1 gap-4 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-5">
          <AgentChatPanel messages={messages} onSend={handleSend} />
          <AgentDetailsPanel agent={DEMO_AGENT} />
        </div>
      </DashboardLayout>

      <StatusModal
        open={modal.open}
        onOpenChange={(open) => {
          if (!open && !isLoading) closeModal();
        }}
        variant={modal.variant}
        preventClose={isLoading}
        title={
          modal.variant === "loading"
            ? "Publishing Agent"
            : modal.variant === "success"
              ? "Agent Published"
              : "Publish Agent Failed"
        }
        description={
          modal.variant === "loading"
            ? "Wait while agent is processing, please don't close this window."
            : modal.variant === "error"
              ? "We couldn't publish agent. Please try again."
              : undefined
        }
        primaryAction={
          modal.variant === "success"
            ? { label: "Manage Agents", onClick: closeModal }
            : modal.variant === "error"
              ? { label: "Retry", onClick: handleRetryPublish }
              : undefined
        }
      />
    </>
  );
}
