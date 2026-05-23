import AgentDirectory from "@/components/protected/explore/AgentDirectory";

export const metadata = {
  title: "Search Agents | Anvila",
  description: "Search published Anvila agent personas by skill, category, and description.",
};

export default function AgentSearchPage() {
  return <AgentDirectory mode="search" />;
}
