"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { AgentData, ChatMessage } from "@/interface/agent";

interface AgentContextType {
  agents: AgentData[];
  isLoading: boolean;
  error: string | null;
  fetchAgents: (page?: number) => Promise<void>;
  createAgent: (agent: Omit<AgentData, "id" | "created" | "clone" | "owners">) => Promise<void>;
  deleteAgent: (id: string) => Promise<void>;
  currentPage: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
  goToPage: (page: number) => void;
  
  messages: ChatMessage[];
  setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
  prompt: string;
  setPrompt: (p: string) => void;
  attachedFile: File | null;
  setAttachedFile: (f: File | null) => void;
  radioStep: number;
  setRadioStep: React.Dispatch<React.SetStateAction<number>>;
  selectedRadioOptions: Record<number, string>;
  setSelectedRadioOptions: React.Dispatch<React.SetStateAction<Record<number, string>>>;
  radioOtherText: Record<number, string>;
  setRadioOtherText: React.Dispatch<React.SetStateAction<Record<number, string>>>;
  textStep: number;
  setTextStep: React.Dispatch<React.SetStateAction<number>>;
  textAnswers: Record<number, string>;
  setTextAnswers: React.Dispatch<React.SetStateAction<Record<number, string>>>;
  identityExpanded: boolean;
  setIdentityExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}

const AgentContext = createContext<AgentContextType | undefined>(undefined);

export function AgentProvider({ children }: { children: React.ReactNode }) {
  const [agents, setAgents] = useState<AgentData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [hasNext, setHasNext] = useState(false);
  const [hasPrev, setHasPrev] = useState(false);

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [prompt, setPrompt] = useState("");
  const [attachedFile, setAttachedFile] = useState<File | null>(null);
  const [radioStep, setRadioStep] = useState<number>(1);
  const [selectedRadioOptions, setSelectedRadioOptions] = useState<Record<number, string>>({
    1: "",
    2: "",
    3: "",
  });
  const [radioOtherText, setRadioOtherText] = useState<Record<number, string>>({
    1: "",
    2: "",
    3: "",
  });
  const [textStep, setTextStep] = useState<number>(1);
  const [textAnswers, setTextAnswers] = useState<Record<number, string>>({
    1: "",
    2: "",
    3: "",
  });
  const [identityExpanded, setIdentityExpanded] = useState(true);

  const fetchAgents = useCallback(async (page = 1) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/personas?page=${page}&size=20`);
      if (!res.ok) {
        setError("Failed to fetch agents");
        return;
      }
      const json = await res.json();
      const items = Array.isArray(json?.data) ? json.data : [];
      const mapped: AgentData[] = items.map((item: Record<string, unknown>) => ({
        id: String(item.id ?? ""),
        name: String(item.name ?? ""),
        categories: String(item.category ?? ""),
        visibility: String(item.visibility).toLowerCase() === "public" ? "Public" : "Private",
        clone: 0,
        owners: [],
        created: item.created_at
          ? new Date(String(item.created_at)).toLocaleDateString("en-US", { month: "short", day: "numeric" })
          : "",
      }));
      setAgents(mapped);
      const meta = json?.meta ?? {};
      setCurrentPage(meta.page ?? page);
      setTotalPages(meta.pages ?? 1);
      setHasNext(Boolean(meta.has_next));
      setHasPrev(Boolean(meta.has_prev));
    } catch {
      setError("Failed to fetch agents");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const goToPage = useCallback((page: number) => {
    fetchAgents(page);
  }, [fetchAgents]);

  useEffect(() => {
    let active = true;
    const init = async () => {
      await Promise.resolve();
      if (active) {
        fetchAgents();
      }
    };
    init();
    return () => {
      active = false;
    };
  }, [fetchAgents]);


  const createAgent = async (newAgentData: Omit<AgentData, "id" | "created" | "clone" | "owners">) => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const newAgent: AgentData = {
        ...newAgentData,
        id: Math.random().toString(36).substring(2, 9),
        created: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" }),
        clone: 0,
        owners: [
          { initials: "ME", username: "@current_user", color: "bg-blue-100 text-blue-700" },
        ],
      };
      setAgents((prev) => [newAgent, ...prev]);
    } catch (err) {
      setError("Failed to create agent");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteAgent = async (id: string) => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setAgents((prev) => prev.filter((a) => a.id !== id));
    } catch (err) {
      setError("Failed to delete agent");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AgentContext.Provider
      value={{
        agents,
        isLoading,
        error,
        fetchAgents,
        createAgent,
        deleteAgent,
        currentPage,
        totalPages,
        hasNext,
        hasPrev,
        goToPage,
        messages,
        setMessages,
        prompt,
        setPrompt,
        attachedFile,
        setAttachedFile,
        radioStep,
        setRadioStep,
        selectedRadioOptions,
        setSelectedRadioOptions,
        radioOtherText,
        setRadioOtherText,
        textStep,
        setTextStep,
        textAnswers,
        setTextAnswers,
        identityExpanded,
        setIdentityExpanded,
      }}
    >
      {children}
    </AgentContext.Provider>
  );
}

export function useAgent() {
  const context = useContext(AgentContext);
  if (context === undefined) {
    throw new Error("useAgent must be used within an AgentProvider");
  }
  return context;
}
