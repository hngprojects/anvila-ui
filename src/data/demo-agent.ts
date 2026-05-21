export type AgentModel = {
  id: string;
  name: string;
  selected: boolean;
};

export type AgentSkill = {
  id: string;
  label: string;
};

export type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

export type AgentDraft = {
  name: string;
  description: string;
  model: string;
  version: string;
  status: string;
  mainGoal: string;
  instructions: string[];
  models: AgentModel[];
  skills: AgentSkill[];
};

export const DEMO_AGENT: AgentDraft = {
  name: "Anastasia Rhodes",
  description: "Content creator agent for MOR.",
  model: "Mistral 7B",
  version: "1.0.0",
  status: "Draft",
  mainGoal:
    "Create engaging, on-brand social content for MOR campaigns across platforms.",
  instructions: [
    "Research trending topics in the client's niche before drafting posts.",
    "Match tone to brand guidelines: professional yet approachable.",
    "Suggest visuals and hashtags for each piece of content.",
    "Flag sensitive topics and escalate when uncertain.",
  ],
  models: [
    { id: "mistral", name: "Mistral 7B", selected: true },
    { id: "llama", name: "Llama 2", selected: false },
    { id: "mixtral", name: "Mixtral 8x7B", selected: false },
  ],
  skills: [
    { id: "research", label: "Research Tools" },
    { id: "data", label: "Data Analysis" },
    { id: "experiments", label: "Experiments" },
    { id: "web", label: "Web Search" },
    { id: "files", label: "File Generator" },
    { id: "chat", label: "Group Chat" },
  ],
};

export const DEMO_CHAT_MESSAGES: ChatMessage[] = [
  {
    id: "1",
    role: "assistant",
    content:
      "Hi! I'm here to help you build your agent. Tell me what kind of agent you'd like to create — for example, a content creator, research assistant, or customer support bot.",
  },
  {
    id: "2",
    role: "user",
    content:
      "I need a content creator agent for MOR. It should research trends and write on-brand social posts.",
  },
  {
    id: "3",
    role: "assistant",
    content:
      "Got it. I've drafted Anastasia Rhodes — a content creator focused on MOR campaigns. Review the instructions and skills on the right, then publish when you're ready.",
  },
];
