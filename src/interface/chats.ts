import { Dispatch, SetStateAction } from "react";

export interface ChatInputProps {
    prompt: string;
    setPrompt: Dispatch<SetStateAction<string>>;
    hasInput?: boolean;
    sendBtnClass?: string;
    handleFileChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface ChatMessageProps {
    id: string;
    role: "user" | "assistant";
    content: string;
    card?: {
        title: string;
        subtitle: string;
        action: string;
    };
};


export interface ManifestDataProps {
    name: string;
    version: string;
    model: string;
    license: string;
    files: number;
    skills: string[];
}


export interface ChatPanelProps {
    messages: ChatMessageProps[];
    onSend: (msg: string) => void;
}
export interface AgentFile {
    id: string;
    name: string;
    content: string;
};
