import {
  ChevronRight,
  FileText,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { AgentFile } from "@/interface";


export default function FileTree({
    files,
    activeId,
    onSelect,
    agentName,
}: {
    files: AgentFile[];
    activeId: string;
    onSelect: (id: string) => void;
    agentName: string;
}) {
    return (
        <div className="min-w-0">
            {/* Root folder */}
            <button
                className="flex w-full items-center gap-1.5 rounded px-2 py-1 text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
                aria-label="expand agent folder"
            >
                <ChevronRight size={14} className="shrink-0 rotate-90" />
                <span className="truncate">{agentName}</span>
            </button>

            {/* Files */}
            <ul className="ml-4 mt-0.5 space-y-0.5">
                {files.map((file) => (
                    <li key={file.id}>
                        <button
                            onClick={() => onSelect(file.id)}
                            className={cn(
                                "flex w-full items-center gap-2 rounded-md px-2 py-1 text-sm transition-colors text-left",
                                activeId === file.id
                                    ? "bg-[#1a6b5a]/10 text-[#1a6b5a] font-medium"
                                    : "text-gray-600 hover:bg-gray-100"
                            )}
                        >
                            <FileText size={13} className="shrink-0" />
                            <span className="truncate">{file.name}</span>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}