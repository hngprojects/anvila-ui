import * as React from "react";
import {
    Pencil,
    FileText
} from "lucide-react";
import MarkdownPreview from "./MarkDownPreview";
import FileTree from "./ChatFileTree";
import { AgentFile, ManifestDataProps } from "@/interface";

export default function FilePreviewPanel({
  files,
  manifest,
}: {
  files: AgentFile[];
  manifest: ManifestDataProps;
}) {
  const [activeFileId, setActiveFileId] = React.useState(files[0]?.id ?? "");
  const activeFile = files.find((f) => f.id === activeFileId) ?? files[0];

  return (
    <section className="flex flex-col lg:flex-row items-stretch rounded-2xl md:border md:border-gray-200 bg-transparent md:bg-white md:shadow-sm min-w-0 flex-1">
      {/* Left: file tree + content */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Header bar (Desktop only) */}
        <div className="hidden md:flex items-center justify-between border-b border-gray-100 px-4 py-3 shrink-0">
          <h2 className="truncate text-sm font-semibold text-gray-800">{activeFile?.name}</h2>
          <button className="text-gray-400 hover:text-gray-600 transition-colors" aria-label="edit">
            <Pencil size={14} />
          </button>
        </div>

        {/* Mobile Horizontal Tabs Selector */}
        <div className="flex md:hidden overflow-x-auto gap-2 px-4 py-2 shrink-0 scrollbar-hide">
          {files.map((file) => {
            const isActive = file.id === activeFileId;
            return (
              <button
                key={file.id}
                onClick={() => setActiveFileId(file.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors shrink-0 ${
                  isActive
                    ? "bg-[#E4E4E7] border-[#D4D4D8] text-gray-900"
                    : "bg-white border-gray-200 text-gray-500 hover:text-gray-700"
                }`}
              >
                <FileText size={13} className="text-gray-400" />
                {file.name}
              </button>
            );
          })}
        </div>

        <div className="flex flex-col md:flex-row flex-1 min-h-0">
          {/* File tree sidebar (Desktop only) */}
          <aside className="hidden md:block w-44 shrink-0 border-r border-gray-100 py-3 px-2">
            <FileTree
              files={files}
              activeId={activeFileId}
              onSelect={setActiveFileId}
              agentName="Anatassia Rhodes"
            />
          </aside>

          {/* Content Card */}
          <div className="min-w-0 flex-1 px-4 py-4 md:px-5 overflow-y-auto bg-white md:bg-transparent rounded-xl border border-gray-200 md:border-0 shadow-sm md:shadow-none m-4 md:m-0">
            <MarkdownPreview content={activeFile?.content ?? ""} />
          </div>
        </div>
      </div>

      {/* Right: manifest sidebar */}
      <aside className="w-full lg:w-[280px] shrink-0 border-t md:border-t-0 lg:border-l border-gray-100 bg-transparent md:bg-[#FBFBFB]/50 p-4 space-y-4">
        {/* Manifest */}
        <div className="rounded-xl border border-gray-200 bg-white p-4 sm:p-5 shadow-sm">
          <p className="mb-4 text-sm font-semibold text-gray-900">
            Manifest
          </p>
          <dl className="space-y-3">
            {[
              { label: "Name", value: manifest.name },
              { label: "Version", value: manifest.version },
              { label: "Model", value: manifest.model },
              { label: "License", value: manifest.license },
              { label: "Files", value: String(manifest.files) },
            ].map(({ label, value }) => (
              <div key={label} className="flex flex-row justify-between items-center py-0.5 md:flex-col md:items-start md:gap-1">
                <dt className="text-[12px] text-gray-500">{label}</dt>
                <dd className="text-[13px] font-medium text-gray-900 break-words text-right md:text-left">{value}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Skills */}
        <div className="rounded-xl border border-gray-200 bg-white p-4 sm:p-5 shadow-sm">
          <p className="mb-4 text-sm font-semibold text-gray-900">
            Skills &amp; Capabilities
          </p>
          <div className="flex flex-wrap gap-2 md:grid md:grid-cols-2 md:gap-2">
            {manifest.skills.map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center justify-center rounded-full border border-gray-300 bg-white px-3 py-1.5 text-[12px] font-normal text-gray-800 hover:bg-gray-50 transition-colors text-center"
              >
                <span className="truncate">{skill}</span>
              </span>
            ))}
          </div>
        </div>
      </aside>
    </section>
  );
}