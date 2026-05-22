"use client";

import * as React from "react";
import { Pencil, FileText, User, Tag, Clock, Download } from "lucide-react";
import MarkdownPreview from "./MarkDownPreview";
import FileTree from "./ChatFileTree";
import { AgentFile, ManifestDataProps } from "@/interface";

// ─── Types ────────────────────────────────────────────────────────────────────

interface ViewModeProps {
  owner?: string;       // e.g. "@maya.d"       — TODO: from GET /api/agents/:id
  version?: string;     // e.g. "v1.4.2"         — TODO: from GET /api/agents/:id
  updatedAt?: string;   // e.g. "30 mins ago"    — TODO: from GET /api/agents/:id
  downloads?: string | number; // e.g. "24,812"  — TODO: from GET /api/agents/:id/stats
  githubUrl?: string;   // e.g. "https://github.com/Anvila/under-grad"
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function FilePreviewPanel({
  files,
  manifest,
  viewMode,
  agentFolderName,
  noOuterBorder,
}: {
  files: AgentFile[];
  manifest: ManifestDataProps;
  viewMode?: ViewModeProps;
  agentFolderName?: string;
  noOuterBorder?: boolean;
}) {
  // In viewMode default to README.md; in normal mode default to first file
  const readmeFile = files.find((f) => f.name.toLowerCase() === "readme.md");
  const initialId = viewMode ? (readmeFile?.id ?? files[0]?.id ?? "") : (files[0]?.id ?? "");

  const [activeFileId, setActiveFileId] = React.useState(initialId);
  const [contentTab, setContentTab] = React.useState<"readme" | "source">("readme");

  const activeFile = files.find((f) => f.id === activeFileId) ?? files[0];

  // What to render in the content pane
  const contentToRender =
    viewMode && contentTab === "readme"
      ? (readmeFile?.content ?? activeFile?.content ?? "")
      : (activeFile?.content ?? "");

  // Inline tab buttons JSX — avoids defining a component inside render
  const tabButtons = viewMode ? (
    <>
      <button
        onClick={() => setContentTab("readme")}
        className={`px-4 py-2.5 text-xs font-medium border-b-2 transition-colors -mb-px ${
          contentTab === "readme"
            ? "border-[#005F5A] text-[#005F5A]"
            : "border-transparent text-gray-500 hover:text-gray-700"
        }`}
      >
        README.md
      </button>
      <button
        onClick={() => setContentTab("source")}
        className={`px-4 py-2.5 text-xs font-medium border-b-2 transition-colors -mb-px ${
          contentTab === "source"
            ? "border-[#005F5A] text-[#005F5A]"
            : "border-transparent text-gray-500 hover:text-gray-700"
        }`}
      >
        Source
      </button>
    </>
  ) : null;

  return (
    <section
      className={`flex flex-col lg:flex-row items-stretch bg-transparent md:bg-white min-w-0 flex-1 ${
        noOuterBorder ? "" : "rounded-2xl md:border md:border-gray-200 md:shadow-sm"
      }`}
    >
      {/* ── Left: file tree + content ─────────────────────────────────────── */}
      <div className="flex min-w-0 flex-1 flex-col">

        {/* Desktop header row */}
        {viewMode ? (
          // README.md / Source tabs (desktop)
          <div className="hidden md:flex items-center border-b border-gray-100 px-4 shrink-0">
            {tabButtons}
          </div>
        ) : (
          // Existing filename + edit button (desktop)
          <div className="hidden md:flex items-center justify-between border-b border-gray-100 px-4 py-3 shrink-0">
            <h2 className="truncate text-sm font-semibold text-gray-800">{activeFile?.name}</h2>
            <button className="text-gray-400 hover:text-gray-600 transition-colors" aria-label="edit">
              <Pencil size={14} />
            </button>
          </div>
        )}

        {/* Mobile header row */}
        {viewMode ? (
          // README.md / Source tabs (mobile)
          <div className="flex md:hidden items-center border-b border-gray-100 px-4 shrink-0">
            {tabButtons}
          </div>
        ) : (
          // Existing mobile horizontal file chips
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
        )}

        {/* Mobile: file chips for Source tab so user can pick which file to view */}
        {viewMode && contentTab === "source" && (
          <div className="flex md:hidden overflow-x-auto gap-2 px-4 py-2 shrink-0 scrollbar-hide border-b border-gray-100">
            {files.filter((f) => !f.folder || true).map((file) => {
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
        )}

        <div className="flex flex-col md:flex-row flex-1 min-h-0">
          {/* File tree sidebar (desktop only) */}
          <aside className="hidden md:block w-44 shrink-0 border-r border-gray-100 py-3 px-2">
            <FileTree
              files={files}
              activeId={activeFileId}
              onSelect={setActiveFileId}
              agentName={agentFolderName ?? "Anatassia Rhodes"}
            />
          </aside>

          {/* Content pane */}
          <div className="min-w-0 flex-1 px-4 py-4 md:px-5 overflow-y-auto bg-white md:bg-transparent rounded-xl border border-gray-200 md:border-0 shadow-sm md:shadow-none m-4 md:m-0">
            {viewMode && contentTab === "source" ? (
              <pre className="font-mono text-xs text-gray-800 whitespace-pre-wrap leading-relaxed">
                {activeFile?.content ?? ""}
              </pre>
            ) : (
              <MarkdownPreview content={contentToRender} />
            )}
          </div>
        </div>
      </div>

      {/* ── Right sidebar ──────────────────────────────────────────────────── */}
      {viewMode ? (
        // About sidebar (view mode)
        <aside className="w-full lg:w-[260px] shrink-0 border-t lg:border-t-0 lg:border-l border-gray-100 bg-transparent md:bg-[#FBFBFB]/50 p-4 space-y-4">
          {/* About */}
          <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
            <p className="mb-3 text-sm font-semibold text-gray-900">About</p>
            <ul className="space-y-3">
              <li className="flex items-center gap-2.5 text-[12px] text-gray-600">
                <User size={13} className="text-gray-400 shrink-0" />
                <span>{viewMode.owner ?? "@maya.d"}</span>
              </li>
              <li className="flex items-center gap-2.5 text-[12px] text-gray-600">
                <Tag size={13} className="text-gray-400 shrink-0" />
                <span>{viewMode.version ?? manifest.version}</span>
              </li>
              <li className="flex items-center gap-2.5 text-[12px] text-gray-600">
                <Clock size={13} className="text-gray-400 shrink-0" />
                <span>Updated {viewMode.updatedAt ?? "recently"}</span>
              </li>
              <li className="flex items-center gap-2.5 text-[12px] text-gray-600">
                <Download size={13} className="text-gray-400 shrink-0" />
                <span>{viewMode.downloads ?? "0"} downloads</span>
              </li>
            </ul>
          </div>

          {/* Skills & Capabilities */}
          <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
            <p className="mb-3 text-sm font-semibold text-gray-900">Skills &amp; Capabilities</p>
            <div className="flex flex-wrap gap-2">
              {manifest.skills.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center justify-center rounded-full border border-gray-300 bg-white px-3 py-1 text-[11px] text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* View on GitHub */}
          {viewMode.githubUrl && (
            <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
              <p className="mb-2 text-sm font-semibold text-gray-900">View on GitHub</p>
              <a
                href={viewMode.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[12px] text-[#005F5A] hover:underline break-all"
              >
                {viewMode.githubUrl.replace("https://", "")}
              </a>
            </div>
          )}
        </aside>
      ) : (
        // Manifest sidebar (create-agent / normal mode)
        <aside className="w-full lg:w-[280px] shrink-0 border-t md:border-t-0 lg:border-l border-gray-100 bg-transparent md:bg-[#FBFBFB]/50 p-4 space-y-4">
          {/* Manifest */}
          <div className="rounded-xl border border-gray-200 bg-white p-4 sm:p-5 shadow-sm">
            <p className="mb-4 text-sm font-semibold text-gray-900">Manifest</p>
            <dl className="space-y-3">
              {[
                { label: "Name", value: manifest.name },
                { label: "Version", value: manifest.version },
                { label: "Model", value: manifest.model },
                { label: "License", value: manifest.license },
                { label: "Files", value: String(manifest.files) },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  className="flex flex-row justify-between items-center py-0.5 md:flex-col md:items-start md:gap-1"
                >
                  <dt className="text-[12px] text-gray-500">{label}</dt>
                  <dd className="text-[13px] font-medium text-gray-900 break-words text-right md:text-left">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Skills */}
          <div className="rounded-xl border border-gray-200 bg-white p-4 sm:p-5 shadow-sm">
            <p className="mb-4 text-sm font-semibold text-gray-900">Skills &amp; Capabilities</p>
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
      )}
    </section>
  );
}
