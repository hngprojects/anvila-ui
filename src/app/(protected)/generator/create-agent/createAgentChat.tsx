"use client";

import { QuestionCard } from "./questionCard";

type Message =
  | { id: string; role: "user"; text: string; timestamp?: string }
  | { id: string; role: "ai"; text: string };

const MESSAGES: Message[] = [
  { id: "1", role: "user", text: "Build a content creator for skincare brand", timestamp: "Apr 29 at 12:49 AM" },
  { id: "2", role: "ai", text: "I would love to build this for you! Let me ask a couple of quick questions to make sure I create exactly what you envision ..." },
  { id: "3", role: "user", text: "Agent type: content creator for a skincare brand and automates snapchat" },
  { id: "4", role: "ai", text: "Got it - Agent Anatassia Rhodes content creator for a skincare brand. Lets verify some info about your brand before proceeding..." },
];

function PlusIcon() { return <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0"><path d="M1 7H13M7 1V13" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>; }
function ThumbsUpIcon() { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M2 9.5C2 8.67 2.67 8 3.5 8H7L10 2C11.1 2 12 2.9 12 4V8H17.5C18.6 8 19.5 8.9 19.5 10L18 18C17.8 19.2 16.8 20 15.5 20H7C5.34 20 4 18.66 4 17V9.5" stroke="#52525B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>; }
function ThumbsDownIcon() { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M22 14.5C22 15.33 21.33 16 20.5 16H17L14 22C12.9 22 12 21.1 12 20V16H6.5C5.4 16 4.5 15.1 4.5 14L6 6C6.2 4.8 7.2 4 8.5 4H17C18.66 4 20 5.34 20 7V14.5" stroke="#52525B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>; }
function CopyIcon() { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><rect x="8" y="8" width="13" height="13" rx="2" stroke="#52525B" strokeWidth="1.5" /><path d="M16 8V5C16 3.9 15.1 3 14 3H5C3.9 3 3 3.9 3 5V14C3 15.1 3.9 16 5 16H8" stroke="#52525B" strokeWidth="1.5" strokeLinecap="round" /></svg>; }
function MoreIcon() { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="5" cy="12" r="1.5" fill="#52525B" /><circle cx="12" cy="12" r="1.5" fill="#52525B" /><circle cx="19" cy="12" r="1.5" fill="#52525B" /></svg>; }
function PencilIcon() { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 20H21" stroke="#52525B" strokeWidth="1.5" strokeLinecap="round" /><path d="M16.5 3.5C17.328 2.672 18.672 2.672 19.5 3.5C20.328 4.328 20.328 5.672 19.5 6.5L7 19L3 20L4 16L16.5 3.5Z" stroke="#52525B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>; }
function RefreshIcon() { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M3 12C3 7.03 7.03 3 12 3C14.5 3 16.76 4.02 18.39 5.67L21 8M21 3V8H16M21 12C21 16.97 16.97 21 12 21C9.5 21 7.24 19.98 5.61 18.33L3 16M3 21V16H8" stroke="#52525B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>; }

function UserMessage({ text, timestamp }: { text: string; timestamp?: string }) {
  return (
    <>
      {timestamp && <div className="my-2 w-full text-center"><span className="text-xs font-medium text-zinc-700 md:text-sm">{timestamp}</span></div>}
      <div className="flex w-full justify-end">
        <div className="flex w-full max-w-[461px] flex-col items-end gap-3">
          <div className="rounded-2xl bg-zinc-100 px-5 py-3 text-center text-base font-medium text-black md:text-xl">{text}</div>
          <div className="flex items-center gap-3">
            <button type="button" aria-label="Edit" className="flex h-6 w-6 items-center justify-center hover:opacity-70"><PencilIcon /></button>
            <button type="button" aria-label="Retry" className="flex h-6 w-6 items-center justify-center hover:opacity-70"><RefreshIcon /></button>
          </div>
        </div>
      </div>
    </>
  );
}

function AiMessage({ text }: { text: string }) {
  return (
    <div className="flex w-full justify-start">
      <div className="flex w-full max-w-[705px] flex-col items-start gap-4">
        <div className="rounded-2xl bg-zinc-50 px-5 py-3"><p className="m-0 text-sm italic font-normal text-teal-brand md:text-lg">{text}</p></div>
        <div className="flex items-center gap-3">
          <button type="button" aria-label="Thumbs up" className="flex h-5 w-5 items-center justify-center hover:opacity-70"><ThumbsUpIcon /></button>
          <button type="button" aria-label="Thumbs down" className="flex h-5 w-5 items-center justify-center hover:opacity-70"><ThumbsDownIcon /></button>
          <button type="button" aria-label="Copy" className="flex h-5 w-5 items-center justify-center hover:opacity-70"><CopyIcon /></button>
          <button type="button" aria-label="More" className="flex h-5 w-5 items-center justify-center hover:opacity-70"><MoreIcon /></button>
        </div>
      </div>
    </div>
  );
}

export function CreateAgentChat() {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden rounded-3xl border border-[#E7E8EA] bg-[#FBFBFB]">
      <div className="flex-1 overflow-y-auto px-4 md:px-12">
        <div className="mx-auto flex w-full max-w-[900px] flex-col gap-8 py-6">
          {MESSAGES.map((msg) => msg.role === "user" ? <UserMessage key={msg.id} text={msg.text} timestamp={msg.timestamp} /> : <AiMessage key={msg.id} text={msg.text} />)}
          <div className="flex w-full justify-start"><QuestionCard /></div>
        </div>
      </div>
      <div className="flex shrink-0 items-center justify-center px-4 pb-4 md:px-12 md:pb-6">
        <div className="flex w-full max-w-[917px] items-center gap-3 rounded-full border border-[#A1A1AA] bg-white/20 px-6 py-2">
          <PlusIcon />
          <input type="text" placeholder="Describe your agent..." aria-label="Describe your agent" className="flex-1 border-none bg-transparent text-sm font-medium text-[#A1A1AA] outline-hidden placeholder:text-[#A1A1AA] focus:outline-hidden md:text-xl" />
          <button type="button" aria-label="Send" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal-brand md:h-12 md:w-12"><span className="block h-3 w-3 rounded-sm bg-white" /></button>
        </div>
      </div>
    </div>
  );
}

