import AgentWorkspace from "@/components/protected/generator/AgentWorkspace";

export default async function AgentPage({
  params,
}: {
  params: Promise<{ agentId: string }>;
}) {
  const { agentId } = await params;

  return (
    <div className="flex h-full min-w-0 flex-1 flex-col overflow-hidden">
      <AgentWorkspace agentId={agentId} />
    </div>
  );
}
