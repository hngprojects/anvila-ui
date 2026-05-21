
import * as React from "react";
import {
    Pencil,
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
    <section className="flex flex-col lg:flex-row items-stretch rounded-2xl border border-gray-200 bg-white shadow-sm min-w-0 flex-1">
      {/* Left: file tree + content */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Header bar */}
        <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3 shrink-0">
          <h2 className="truncate text-sm font-semibold text-gray-800">{activeFile?.name}</h2>
          <button className="text-gray-400 hover:text-gray-600 transition-colors" aria-label="edit">
            <Pencil size={14} />
          </button>
        </div>

        <div className="flex flex-col sm:flex-row flex-1 min-h-0">
          {/* File tree sidebar */}
          <aside className="w-full sm:w-44 shrink-0 border-b sm:border-b-0 sm:border-r border-gray-100 py-3 px-2">
            <FileTree
              files={files}
              activeId={activeFileId}
              onSelect={setActiveFileId}
              agentName="Anatassia Rhodes"
            />
          </aside>

          {/* Content */}
          <div className="min-w-0 flex-1 px-4 sm:px-5 py-4 overflow-y-auto">
            <MarkdownPreview content={activeFile?.content ?? ""} />
          </div>
        </div>
      </div>

      {/* Right: manifest sidebar */}
      <aside className="w-full lg:w-[280px] shrink-0 border-t lg:border-t-0 lg:border-l border-gray-100 bg-[#FBFBFB]/50 p-4 space-y-4">
        {/* Manifest */}
        <div className="rounded-xl border border-gray-200 bg-white p-4 sm:p-5 shadow-sm">
          <p className="mb-4 text-sm font-medium text-gray-900">
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
              <div key={label} className="flex flex-col gap-1">
                <dt className="text-[12px] text-gray-500">{label}</dt>
                <dd className="text-[13px] font-medium text-gray-900 break-words">{value}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Skills */}
        <div className="rounded-xl border border-gray-200 bg-white p-4 sm:p-5 shadow-sm">
          <p className="mb-4 text-sm font-medium text-gray-900">
            Skills &amp; Capabilities
          </p>
          <div className="grid grid-cols-2 gap-2">
            {manifest.skills.map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center justify-center rounded-full border border-gray-300 bg-white px-2 py-1.5 text-[12px] font-normal text-gray-800 hover:bg-gray-50 transition-colors text-center"
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