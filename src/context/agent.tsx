"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { AgentData, ChatMessage } from "@/interface/agent";

interface AgentContextType {
  agents: AgentData[];
  isLoading: boolean;
  error: string | null;
  fetchAgents: () => Promise<void>;
  createAgent: (agent: Omit<AgentData, "id" | "created" | "clone" | "owners">) => Promise<void>;
  deleteAgent: (id: string) => Promise<void>;
  
  // Chat Persistence State
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

const LOCAL_STORAGE_KEY = "anvila_agents";

export function AgentProvider({ children }: { children: React.ReactNode }) {
  const [agents, setAgents] = useState<AgentData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Chat Persistence State
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

  // Simulate an API call to fetch agents
  const fetchAgents = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setAgents(Array.isArray(parsed) ? (parsed as AgentData[]) : []);
      } else {
        setAgents([]);
      }
    } catch {
      setError("Failed to fetch agents");
    } finally {
      setIsLoading(false);
    }
  }, []);

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


  // Simulate an API call to create an agent
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

      const updatedAgents = [newAgent, ...agents];
      setAgents(updatedAgents);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedAgents));
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

      const updatedAgents = agents.filter((a) => a.id !== id);
      setAgents(updatedAgents);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedAgents));
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
