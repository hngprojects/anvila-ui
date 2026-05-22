"use client";

import { useState } from "react";
import { ChevronRight, FileText, Folder } from "lucide-react";
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
    // Collect unique folder names; all start expanded
    const folderNames = [...new Set(files.filter((f) => f.folder).map((f) => f.folder!))];
    const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(folderNames));

    const toggleFolder = (name: string) => {
        setExpandedFolders((prev) => {
            const next = new Set(prev);
            if (next.has(name)) { next.delete(name); } else { next.add(name); }
            return next;
        });
    };

    // Render the file list in array order; insert folder groups at the position of their first file
    const renderedFolders = new Set<string>();
    const items: React.ReactNode[] = [];

    for (const file of files) {
        if (file.folder) {
            if (renderedFolders.has(file.folder)) continue;
            renderedFolders.add(file.folder);

            const isExpanded = expandedFolders.has(file.folder);
            const folderFiles = files.filter((f) => f.folder === file.folder);

            items.push(
                <li key={`folder-${file.folder}`}>
                    <button
                        onClick={() => toggleFolder(file.folder!)}
                        className="flex w-full items-center gap-1.5 rounded px-2 py-1 text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                        <ChevronRight
                            size={13}
                            className={cn(
                                "shrink-0 text-gray-500 transition-transform duration-150",
                                isExpanded && "rotate-90"
                            )}
                        />
                        <Folder size={13} className="shrink-0 text-gray-500" />
                        <span className="truncate">{file.folder}</span>
                    </button>

                    {isExpanded && (
                        <ul className="ml-5 mt-0.5 space-y-0.5">
                            {folderFiles.map((f) => (
                                <li key={f.id}>
                                    <button
                                        onClick={() => onSelect(f.id)}
                                        className={cn(
                                            "flex w-full items-center gap-2 rounded-md px-2 py-1 text-sm transition-colors text-left",
                                            activeId === f.id
                                                ? "bg-[#1a6b5a]/10 text-[#1a6b5a] font-medium"
                                                : "text-gray-600 hover:bg-gray-100"
                                        )}
                                    >
                                        <FileText size={13} className="shrink-0" />
                                        <span className="truncate">{f.name}</span>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </li>
            );
        } else {
            items.push(
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
            );
        }
    }

    return (
        <div className="min-w-0">
            {/* Root folder row */}
            <button
                className="flex w-full items-center gap-1.5 rounded px-2 py-1 text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
                aria-label="expand agent folder"
            >
                <ChevronRight size={14} className="shrink-0 rotate-90" />
                <span className="truncate">{agentName}</span>
            </button>

            <ul className="ml-4 mt-0.5 space-y-0.5">{items}</ul>
        </div>
    );
}
