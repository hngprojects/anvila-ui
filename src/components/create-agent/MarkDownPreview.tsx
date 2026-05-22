
import * as React from "react";

export default function MarkdownPreview({ content }: { content: string }) {
    // Split content into text segments and fenced code blocks
    const segments = content.split(/(```(?:[\w]*)?\n[\s\S]*?```)/g);

    return (
        <div className="space-y-2 text-sm text-gray-700 leading-relaxed">
            {segments.map((segment, si) => {
                const codeMatch = segment.match(/^```([\w]*)\n?([\s\S]*?)```$/);
                if (codeMatch) {
                    const code = codeMatch[2] ?? "";
                    return (
                        <pre
                            key={si}
                            className="rounded-md bg-[#F4F4F5] border border-gray-200 px-4 py-3 font-mono text-[12px] text-gray-800 whitespace-pre overflow-x-auto leading-relaxed my-2"
                        >
                            {code}
                        </pre>
                    );
                }

                // Plain text segment — render line by line
                return segment.split("\n").map((line, i) => {
                    if (line.startsWith("# ")) {
                        return (
                            <h1 key={`${si}-${i}`} className="text-base font-bold text-gray-900 mt-1">
                                {line.slice(2)}
                            </h1>
                        );
                    }
                    if (line.startsWith("## ")) {
                        return (
                            <h2 key={`${si}-${i}`} className="text-sm font-semibold text-gray-800 mt-3">
                                {line.slice(3)}
                            </h2>
                        );
                    }
                    if (line.startsWith("### ")) {
                        return (
                            <h3 key={`${si}-${i}`} className="text-xs font-semibold text-gray-700 uppercase tracking-wide mt-2">
                                {line.slice(4)}
                            </h3>
                        );
                    }
                    if (line.startsWith("- ")) {
                        return (
                            <li key={`${si}-${i}`} className="ml-4 list-disc text-xs text-gray-600">
                                {renderInline(line.slice(2))}
                            </li>
                        );
                    }
                    if (line.startsWith("| ") && line.includes("|")) {
                        if (/^\|[\s-|]+\|$/.test(line)) return null;
                        const cells = line.split("|").map((c) => c.trim()).filter(Boolean);
                        return (
                            <div key={`${si}-${i}`} className="flex gap-4 text-xs text-gray-600">
                                {cells.map((cell, ci) => (
                                    <span key={ci} className={ci === 0 ? "font-medium w-36" : ""}>{cell}</span>
                                ))}
                            </div>
                        );
                    }
                    if (line.startsWith("> ")) {
                        return (
                            <blockquote key={`${si}-${i}`} className="border-l-2 border-gray-300 pl-3 italic text-xs text-gray-500">
                                {line.slice(2)}
                            </blockquote>
                        );
                    }
                    if (line.trim() === "") {
                        return <div key={`${si}-${i}`} className="h-1" />;
                    }
                    return (
                        <p key={`${si}-${i}`} className="text-xs text-gray-600">
                            {renderInline(line)}
                        </p>
                    );
                });
            })}
        </div>
    );
}

function renderInline(text: string): React.ReactNode {
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**")) {
            return <strong key={i}>{part.slice(2, -2)}</strong>;
        }
        return <React.Fragment key={i}>{part}</React.Fragment>;
    });
}
