import * as React from "react";

import { cn } from "@/lib/utils";

type MarkdownPreviewProps = {
  content: string;
  className?: string;
  compact?: boolean;
};

type ListBlock = {
  type: "list";
  ordered: boolean;
  items: { value: string; number?: number }[];
};

type TableBlock = {
  type: "table";
  rows: string[][];
};

type CodeBlock = {
  type: "code";
  language?: string;
  content: string;
};

type TextBlock = {
  type:
    | "heading"
    | "paragraph"
    | "blockquote"
    | "horizontal-rule"
    | "space";
  level?: number;
  text?: string;
};

type MarkdownBlock = ListBlock | TableBlock | CodeBlock | TextBlock;

export default function MarkdownPreview({
  content,
  className,
  compact = false,
}: MarkdownPreviewProps) {
  const blocks = React.useMemo(() => parseMarkdown(content), [content]);

  if (!content.trim()) {
    return <p className="text-sm text-gray-400">No content available.</p>;
  }

  return (
    <div
      className={cn(
        "min-w-0 space-y-3 break-words font-sans text-sm leading-6 text-gray-700",
        compact && "space-y-2 text-[13px] leading-5",
        className,
      )}
    >
      {blocks.map((block, index) => (
        <MarkdownBlockView
          key={index}
          block={block}
          compact={compact}
        />
      ))}
    </div>
  );
}

function MarkdownBlockView({
  block,
  compact,
}: {
  block: MarkdownBlock;
  compact: boolean;
}) {
  if (block.type === "space") {
    return <div className={compact ? "h-1" : "h-2"} />;
  }

  if (block.type === "horizontal-rule") {
    return <div className="h-px bg-gray-200" />;
  }

  if (block.type === "heading") {
    const sizeClass =
      block.level === 1
        ? "text-lg font-semibold text-gray-950"
        : block.level === 2
          ? "text-base font-semibold text-gray-900"
          : "text-sm font-semibold text-gray-800";
    const className = cn("mt-4 first:mt-0 tracking-normal", sizeClass);

    if (block.level === 1) {
      return <h1 className={className}>{renderInline(block.text ?? "")}</h1>;
    }

    if (block.level === 2) {
      return <h2 className={className}>{renderInline(block.text ?? "")}</h2>;
    }

    if (block.level === 3) {
      return <h3 className={className}>{renderInline(block.text ?? "")}</h3>;
    }

    return <h4 className={className}>{renderInline(block.text ?? "")}</h4>;
  }

  if (block.type === "blockquote") {
    return (
      <blockquote className="rounded-r-lg border-l-2 border-[#0C5D56]/40 bg-[#0C5D56]/5 py-2 pl-3 pr-4 text-sm text-gray-700">
        {renderInline(block.text ?? "")}
      </blockquote>
    );
  }

  if (block.type === "code") {
    return (
      <pre className="max-w-full overflow-x-auto rounded-lg border border-gray-200 bg-gray-950 px-3 py-2 text-xs leading-5 text-gray-100">
        <code>{block.content}</code>
      </pre>
    );
  }

  if (block.type === "list") {
    const ListTag = block.ordered ? "ol" : "ul";
    return (
      <ListTag
        className={cn(
          "space-y-1 pl-5 text-gray-700",
          block.ordered ? "list-decimal" : "list-disc",
        )}
      >
        {block.items.map((item, index) => (
          <li key={index} className="pl-1" value={item.number}>
            {renderInline(item.value)}
          </li>
        ))}
      </ListTag>
    );
  }

  if (block.type === "table") {
    const [head, ...body] = block.rows;
    return (
      <div className="max-w-full overflow-x-auto rounded-lg border border-gray-200">
        <table className="w-full min-w-max border-collapse text-left text-xs">
          {head && (
            <thead className="bg-gray-50 text-gray-800">
              <tr>
                {head.map((cell, index) => (
                  <th
                    key={index}
                    className="border-b border-gray-200 px-3 py-2 font-semibold"
                  >
                    {renderInline(cell)}
                  </th>
                ))}
              </tr>
            </thead>
          )}
          <tbody>
            {body.map((row, rowIndex) => (
              <tr key={rowIndex} className="odd:bg-white even:bg-gray-50/60">
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex} className="border-b border-gray-100 px-3 py-2">
                    {renderInline(cell)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <p className="text-gray-700">
      {renderInline(block.text ?? "")}
    </p>
  );
}

function parseMarkdown(content: string): MarkdownBlock[] {
  const lines = content.replace(/\r\n/g, "\n").split("\n");
  const blocks: MarkdownBlock[] = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index];
    const trimmed = line.trim();

    if (!trimmed) {
      index += 1;
      continue;
    }

    if (trimmed.startsWith("```")) {
      const language = trimmed.slice(3).trim() || undefined;
      const codeLines: string[] = [];
      index += 1;
      while (index < lines.length && !lines[index].trim().startsWith("```")) {
        codeLines.push(lines[index]);
        index += 1;
      }
      index += 1;
      blocks.push({ type: "code", language, content: codeLines.join("\n") });
      continue;
    }

    const heading = /^(#{1,6})\s+(.+)$/.exec(trimmed);
    if (heading) {
      blocks.push({
        type: "heading",
        level: heading[1].length,
        text: heading[2].trim(),
      });
      index += 1;
      continue;
    }

    if (/^(-{3,}|\*{3,}|_{3,})$/.test(trimmed)) {
      blocks.push({ type: "horizontal-rule" });
      index += 1;
      continue;
    }

    if (trimmed.startsWith(">")) {
      const quoteLines: string[] = [];
      while (index < lines.length && lines[index].trim().startsWith(">")) {
        quoteLines.push(lines[index].trim().replace(/^>\s?/, ""));
        index += 1;
      }
      blocks.push({ type: "blockquote", text: quoteLines.join(" ") });
      continue;
    }

    if (isTableStart(lines, index)) {
      const rows: string[][] = [];
      rows.push(parseTableRow(lines[index]));
      index += 2;
      while (index < lines.length && isTableRow(lines[index])) {
        rows.push(parseTableRow(lines[index]));
        index += 1;
      }
      blocks.push({ type: "table", rows });
      continue;
    }

    const listMatch = /^(\s*)([-*+]|\d+[.)])\s+(.+)$/.exec(line);
    if (listMatch) {
      const ordered = /\d+[.)]/.test(listMatch[2]);
      const items: { value: string; number?: number }[] = [];
      while (index < lines.length) {
        const match = /^(\s*)([-*+]|\d+[.)])\s+(.+)$/.exec(lines[index]);
        if (!match || /\d+[.)]/.test(match[2]) !== ordered) break;
        const number = ordered ? Number.parseInt(match[2], 10) : undefined;
        items.push({ value: match[3].trim(), number });
        index += 1;
      }
      blocks.push({ type: "list", ordered, items });
      continue;
    }

    const paragraphLines: string[] = [];
    while (index < lines.length && lines[index].trim()) {
      if (isBlockStart(lines, index) && paragraphLines.length > 0) break;
      paragraphLines.push(lines[index].trim());
      index += 1;
    }
    blocks.push({ type: "paragraph", text: paragraphLines.join(" ") });
  }

  return blocks;
}

function isBlockStart(lines: string[], index: number) {
  const trimmed = lines[index].trim();
  return (
    trimmed.startsWith("```") ||
    /^(#{1,6})\s+/.test(trimmed) ||
    trimmed.startsWith(">") ||
    /^(\s*)([-*+]|\d+[.)])\s+/.test(lines[index]) ||
    /^(-{3,}|\*{3,}|_{3,})$/.test(trimmed) ||
    isTableStart(lines, index)
  );
}

function isTableStart(lines: string[], index: number) {
  return (
    index + 1 < lines.length &&
    isTableRow(lines[index]) &&
    /^\s*\|?[\s:-]+\|[\s|:-]*$/.test(lines[index + 1])
  );
}

function isTableRow(line: string) {
  return line.includes("|") && line.trim().split("|").filter(Boolean).length > 1;
}

function parseTableRow(line: string) {
  return line
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((cell) => cell.trim());
}

function renderInline(text: string): React.ReactNode {
  const parts = text.split(/(`[^`]+`|\*\*[^*]+\*\*|__[^_]+__|\*[^*]+\*|_[^_]+_)/g);

  return parts.map((part, index) => {
    if (!part) return null;

    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code
          key={index}
          className="rounded border border-gray-200 bg-gray-100 px-1 py-0.5 text-[0.92em] text-gray-900"
        >
          {part.slice(1, -1)}
        </code>
      );
    }

    if (
      (part.startsWith("**") && part.endsWith("**")) ||
      (part.startsWith("__") && part.endsWith("__"))
    ) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }

    if (
      (part.startsWith("*") && part.endsWith("*")) ||
      (part.startsWith("_") && part.endsWith("_"))
    ) {
      return <em key={index}>{part.slice(1, -1)}</em>;
    }

    return <React.Fragment key={index}>{part}</React.Fragment>;
  });
}
