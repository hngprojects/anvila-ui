
import * as React from "react";
import {FileText} from "lucide-react";
import ChatInput from "@/components/ChatInput";
import { ChatMessageProps } from "@/interface";
import ReactionBar from "../ReactionBar";


export default function ChatPanel({
    messages,
    onSend,
}: {
    messages: ChatMessageProps[];
    onSend: (msg: string) => void;
}) {
    const [input, setInput] = React.useState("");
    const scrollRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
    }, [messages]);

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        const trimmed = input.trim();
        if (!trimmed) return;
        onSend(trimmed);
        setInput("");
    }

    return (
        <section className="flex flex-col h-full bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden min-w-0">
            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 py-5 space-y-5">
                {messages.map((msg) => (
                    <div key={msg.id}>
                        {msg.role === "assistant" ? (
                            <div className="space-y-2">
                                <p className="text-sm text-gray-500 leading-relaxed italic">{msg.content}</p>
                                {/* Reaction bar */}
                               <ReactionBar />
                                {/* Agent card */}
                                {msg.card && (
                                    <div className="mt-3 flex items-center gap-3 rounded-2xl border border-gray-200 bg-[#F9F9F9] px-4 py-3 max-w-xs">
                                        <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-gray-100">
                                            <FileText size={16} className="text-gray-500" />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <p className="text-xs font-medium text-gray-700 leading-tight line-clamp-2">
                                                {msg.card.title}
                                            </p>
                                        </div>
                                        <button className="shrink-0 rounded-xl border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                                            {msg.card.action}
                                        </button>
                                    </div>
                                )}
                                {msg.card && (
                                    <ReactionBar />
                                )}
                            </div>
                        ) : (
                            <div className="flex justify-end">
                                <div className="max-w-[80%] rounded-2xl rounded-br-md bg-gray-100 px-4 py-3 text-sm text-gray-700">
                                    {msg.content}
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="mt-6 px-4 pb-4 pt-2 shrink-0">
                <ChatInput prompt={input} setPrompt={setInput} />
            </form>
        </section>
    );
}