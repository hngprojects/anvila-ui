"use client";

import { useMemo, useState } from "react";
import {
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Copy,
  Download,
  ExternalLink,
  FileText,
  Loader2,
  X,
} from "lucide-react";

import { Github } from "@/components/icons";
import MarkdownPreview from "@/components/create-agent/MarkDownPreview";
import { GithubPublishModal } from "@/components/publish-modal";
import type { AgentFileContent, AgentPersona, AgentSkill } from "@/lib/personas";

interface AgentPreviewPanelProps {
  persona: AgentPersona | null;
  files: AgentFileContent[];
  skills: AgentSkill[];
  isPublishing: boolean;
  publishError: string;
  onClose: () => void;
  onPublish: () => Promise<void>;
}

export default function AgentPreviewPanel({
  persona,
  files,
  skills,
  isPublishing,
  publishError,
  onClose,
  onPublish,
}: AgentPreviewPanelProps) {
  const [activeFileId, setActiveFileId] = useState(files[0]?.id ?? "");
  const [showLinks, setShowLinks] = useState(false);
  const [fileTreeOpen, setFileTreeOpen] = useState(false);

  const activeFile = useMemo(
    () => files.find((file) => file.id === activeFileId) ?? files[0],
    [activeFileId, files],
  );
  const isPublished = persona?.status === "published";
  const hasPublishLinks = Boolean(
    persona?.githubRepoUrl || persona?.githubCloneUrl || persona?.githubZipUrl,
  );

  return (
    <section className="flex h-full min-h-0 w-full flex-col overflow-hidden bg-[#FBFBFB] md:border-l md:border-gray-200">
      <div className="flex min-h-14 shrink-0 items-center justify-between border-b border-gray-200 px-4">
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-gray-950">
            {persona?.name || "Agent preview"}
          </p>
          <p className="truncate text-xs text-gray-500">
            {persona?.description || persona?.category || "Generated persona files"}
          </p>
        </div>
        <button
          onClick={onClose}
          className="ml-3 flex size-8 shrink-0 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-900"
          aria-label="Close preview"
        >
          <X size={18} />
        </button>
      </div>

      <div className="flex shrink-0 flex-wrap items-center justify-between gap-2 border-b border-gray-100 px-4 py-3">
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <span className="rounded-full border border-gray-200 bg-white px-2.5 py-1">
            {persona?.manifest.version || "0.1.0"}
          </span>
          <span className="rounded-full border border-gray-200 bg-white px-2.5 py-1">
            {persona?.manifest.model || "gemini-3-flash"}
          </span>
          <span className="rounded-full border border-gray-200 bg-white px-2.5 py-1">
            {persona?.manifest.license || "MIT"}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {hasPublishLinks && (
            <button
              onClick={() => setShowLinks(true)}
              className="inline-flex h-9 items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              <ExternalLink size={15} />
              Links
            </button>
          )}
          <button
            onClick={isPublished ? undefined : onPublish}
            disabled={isPublished || isPublishing}
            className="inline-flex h-9 items-center gap-2 rounded-lg bg-[#0C5D56] px-4 text-sm font-semibold text-white hover:bg-[#094a45] disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-500"
          >
            {isPublished ? (
              <>
                <CheckCircle2 size={15} />
                Published
              </>
            ) : isPublishing ? (
              <>
                <Loader2 size={15} className="animate-spin" />
                Publishing
              </>
            ) : (
              <>
                <Github size={15} />
                Publish
              </>
            )}
          </button>
        </div>
      </div>

      {publishError && (
        <div className="shrink-0 border-b border-red-100 bg-red-50 px-4 py-2 text-sm text-red-700">
          {publishError}
        </div>
      )}

      <div className="flex min-h-0 flex-1 flex-col lg:flex-row">
        <aside className="shrink-0 border-b border-gray-100 bg-white px-3 py-3 lg:w-52 lg:border-b-0 lg:border-r">
          <button
            type="button"
            onClick={() => setFileTreeOpen((open) => !open)}
            className="mb-2 flex w-full items-center gap-2 rounded-lg px-2 py-1 text-xs font-semibold uppercase text-gray-500 hover:bg-gray-50 lg:pointer-events-none"
          >
            <FileText size={13} />
            Files
            <span className="ml-auto lg:hidden">
              {fileTreeOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
            </span>
          </button>
          <div className={`${fileTreeOpen ? "block" : "hidden"} max-h-48 space-y-1 overflow-y-auto lg:block lg:max-h-none`}>
            {files.map((file) => (
              <button
                key={file.id}
                onClick={() => {
                  setActiveFileId(file.id);
                  setFileTreeOpen(false);
                }}
                className={`flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left text-sm ${
                  activeFile?.id === file.id
                    ? "bg-[#0C5D56]/10 font-medium text-[#0C5D56]"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <FileText size={14} className="shrink-0" />
                <span className="truncate">{file.name}</span>
              </button>
            ))}
          </div>
        </aside>

        <div className="min-w-0 flex-1 overflow-y-auto bg-white px-5 py-5">
          {activeFile ? (
            <MarkdownPreview content={activeFile.content} />
          ) : (
            <p className="text-sm text-gray-500">No preview files are available yet.</p>
          )}
        </div>

        <aside className="min-h-0 shrink-0 overflow-y-auto border-t border-gray-100 bg-[#FBFBFB] p-4 lg:w-72 lg:border-l lg:border-t-0">
          <div className="rounded-xl border border-gray-200 bg-white p-4">
            <p className="mb-3 text-sm font-semibold text-gray-900">Manifest</p>
            <dl className="space-y-3 text-sm">
              <Info label="Name" value={persona?.manifest.name || persona?.name || "Untitled agent"} />
              <Info label="Version" value={persona?.manifest.version || "0.1.0"} />
              <Info label="Model" value={persona?.manifest.model || "gemini-3-flash"} />
              <Info label="License" value={persona?.manifest.license || "MIT"} />
              <Info label="Files" value={String(files.length)} />
            </dl>
          </div>

          <div className="mt-4 rounded-xl border border-gray-200 bg-white p-4">
            <p className="mb-3 text-sm font-semibold text-gray-900">Skills</p>
            {skills.length > 0 ? (
              <div className="space-y-3">
                {skills.map((skill) => (
                  <div key={skill.slug || skill.name}>
                    <p className="text-sm font-medium text-gray-900">{skill.name}</p>
                    {skill.description && (
                      <p className="mt-0.5 text-xs leading-5 text-gray-500">{skill.description}</p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">No skills matched yet.</p>
            )}
          </div>

          {hasPublishLinks && persona && (
            <div className="mt-4 rounded-xl border border-gray-200 bg-white p-4">
              <p className="mb-3 text-sm font-semibold text-gray-900">GitHub</p>
              <div className="space-y-3">
                <PublishedLink label="Repo" value={persona.githubRepoUrl} href={persona.githubRepoUrl} />
                <PublishedLink label="Clone" value={persona.githubCloneUrl} />
                <PublishedLink label="ZIP" value={persona.githubZipUrl} href={persona.githubZipUrl} />
              </div>
            </div>
          )}

          {persona?.githubZipUrl && (
            <a
              href={persona.githubZipUrl}
              className="mt-4 inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              <Download size={15} />
              Download ZIP
            </a>
          )}
        </aside>
      </div>

      {showLinks && persona && (
        <GithubPublishModal
          onClose={() => setShowLinks(false)}
          agentName={persona.name}
          githubRepoUrl={persona.githubRepoUrl}
          githubCloneUrl={persona.githubCloneUrl}
          githubZipUrl={persona.githubZipUrl}
        />
      )}
    </section>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs text-gray-500">{label}</dt>
      <dd className="mt-0.5 break-words text-sm font-medium text-gray-900">{value}</dd>
    </div>
  );
}

function PublishedLink({
  label,
  value,
  href,
}: {
  label: string;
  value: string;
  href?: string;
}) {
  if (!value) return null;

  const content = (
    <span className="block truncate text-xs text-[#0C5D56]">{value}</span>
  );

  return (
    <div>
      <p className="mb-1 text-xs font-medium text-gray-500">{label}</p>
      <div className="flex min-w-0 items-center gap-2 rounded-lg bg-gray-50 px-2 py-2">
        {href ? (
          <a href={href} target="_blank" rel="noreferrer" className="min-w-0 flex-1 overflow-hidden">
            {content}
          </a>
        ) : (
          <div className="min-w-0 flex-1 overflow-hidden">{content}</div>
        )}
        <button
          type="button"
          onClick={() => navigator.clipboard.writeText(value)}
          className="flex size-7 shrink-0 items-center justify-center rounded-md text-gray-500 hover:bg-white hover:text-gray-900"
          aria-label={`Copy ${label}`}
        >
          <Copy size={14} />
        </button>
      </div>
    </div>
  );
}
