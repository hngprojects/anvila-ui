export type AgentVisibility = "Public" | "Private";

export interface ChatMessage {
  id: string;
  sender: "user" | "assistant";
  text?: string;
  type:
    | "text"
    | "thinking"
    | "questionnaire"
    | "verification-card"
    | "forging-identity"
    | "forging-skills"
    | "forging-personalities"
    | "forging-done"
    | "forging-interrupted";
}

export interface AgentOwner {
  initials: string;
  username: string;
  color: string;
}

export interface AgentData {
  id: string;
  name: string;
  categories: string;
  visibility: AgentVisibility;
  clone: number;
  owners: AgentOwner[];
  created: string;
}
