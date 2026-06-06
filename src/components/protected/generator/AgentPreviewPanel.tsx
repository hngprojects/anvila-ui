"use client";

import { useMemo, useState } from "react";
import { Loader2 } from "lucide-react";
import {
  FolderBreadcrumbIcon,
  SkillsFolderIcon,
  BreadcrumbChevronDown,
  BreadcrumbChevronRight,
  FileTabDashIcon,
  PreviewRefreshIcon,
} from "@/components/icons";
import MarkdownPreview from "@/components/create-agent/MarkDownPreview";
import { GithubPublishModal } from "@/components/publish-modal";
import type { AgentPersona, AgentFileContent, AgentSkill } from "@/types/agent";

interface AgentPreviewPanelProps {
  persona: AgentPersona | null;
  files: AgentFileContent[];
  skills: AgentSkill[];
  isPublishing: boolean;
  publishError: string;
  onClose: () => void;
  onPublish: () => Promise<void>;
  onRefresh?: () => void;
  onSaveAsPrivate?: () => void;
}

export default function AgentPreviewPanel({
  persona,
  files,
  skills,
  isPublishing,
  publishError,
  onClose,
  onPublish,
  onRefresh,
  onSaveAsPrivate,
}: AgentPreviewPanelProps) {
  const [activeFileId, setActiveFileId] = useState(files[0]?.id ?? "");
  const [showSkillsFolder, setShowSkillsFolder] = useState(false);
  const [activeSkillSlug, setActiveSkillSlug] = useState(skills[0]?.slug ?? "");
  const [showLinks, setShowLinks] = useState(false);

  const activeFile = useMemo(() => files.find((f) => f.id === activeFileId) ?? files[0], [activeFileId, files]);
  const activeSkill = useMemo(() => skills.find((s) => s.slug === activeSkillSlug) ?? skills[0], [activeSkillSlug, skills]);

  const isPublished = persona?.status === "published";
  const hasPublishLinks = Boolean(persona?.githubRepoUrl || persona?.githubCloneUrl || persona?.githubZipUrl);
  const agentName = persona?.name ?? "Agent";
  const skillContent = activeSkill
    ? (activeSkill.content || activeSkill.description || "")
    : "";

  return (
    <section className="flex h-full min-h-0 w-full flex-col overflow-hidden bg-white">
      <nav className="flex shrink-0 items-center justify-end gap-[10px] px-7 py-3">
        <button type="button" onClick={onRefresh ?? onClose} className="flex items-center justify-center text-copy-muted" aria-label="Refresh">
          <PreviewRefreshIcon />
        </button>
        <button
          type="button"
          onClick={onSaveAsPrivate}
          disabled={!onSaveAsPrivate}
          className="flex self-stretch items-center justify-center gap-2 rounded-lg border border-save-private-border px-5 py-3 font-sans text-sm font-normal text-save-private outline-none disabled:cursor-not-allowed disabled:opacity-40"
        >
          Save as Private
        </button>
        <button
          type="button"
          onClick={isPublished ? undefined : onPublish}
          disabled={isPublished || isPublishing}
          className="flex self-stretch items-center justify-center gap-2 rounded-lg border-[0.5px] border-teal-brand bg-teal-brand px-5 py-3 font-sans text-sm font-medium text-white transition disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isPublishing ? <><Loader2 size={14} className="animate-spin" />Publishing</> : isPublished ? "Published" : "Publish"}
        </button>
      </nav>

      <div className="scrollbar-hide flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto px-4 pb-6">
        {publishError && (
          <div className="shrink-0 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{publishError}</div>
        )}

        <div>
          <h1 className="truncate font-sans text-lg font-semibold leading-7 text-dark-fg">{agentName}</h1>
          <p className="mt-0.5 truncate font-sans text-xs font-normal leading-4 text-dark-fg">{persona?.description ?? "Generated agent"}</p>
        </div>

        <div className="flex flex-col gap-2 self-stretch rounded-lg border border-border-subtle px-4 pb-0 pt-2">
          <div className="flex items-center gap-3 py-1">
            <button type="button" onClick={() => { setShowSkillsFolder(false); if (files.length > 0) setActiveFileId(files[0].id); }} className="flex items-center gap-1">
              <FolderBreadcrumbIcon />
              <span className="font-sans text-xs font-semibold leading-4 text-folder-fg">{agentName}</span>
              {showSkillsFolder ? <BreadcrumbChevronRight /> : <BreadcrumbChevronDown />}
            </button>
            <span className="text-border-subtle">|</span>
            <button type="button" onClick={() => { setShowSkillsFolder(true); if (skills.length > 0) setActiveSkillSlug(skills[0]?.slug ?? ""); }} className="flex items-center gap-1">
              <SkillsFolderIcon />
              <span className="font-sans text-xs font-normal leading-4 text-folder-fg">Skills</span>
              {showSkillsFolder ? <BreadcrumbChevronDown /> : <BreadcrumbChevronRight />}
            </button>
          </div>

          <div className="scrollbar-hide flex items-center gap-4 overflow-x-auto px-6">
            {showSkillsFolder
              ? skills.map((skill) => (
                  <button
                    key={skill.slug}
                    type="button"
                    onClick={() => setActiveSkillSlug(skill.slug)}
                    className={`flex w-[110px] shrink-0 items-center gap-1 rounded px-1 py-2 ${activeSkillSlug === skill.slug ? "border border-teal-accent bg-file-active" : "border border-border-subtle"}`}
                  >
                    <FileTabDashIcon />
                    <span className="truncate text-[10px] text-label-mid">{skill.name}.ts</span>
                  </button>
                ))
              : files.map((file) => (
                  <button
                    key={file.id}
                    type="button"
                    onClick={() => setActiveFileId(file.id)}
                    className={`flex w-[110px] shrink-0 items-center gap-1 rounded px-1 py-2 ${activeFile?.id === file.id ? "border border-teal-accent bg-file-active" : "border border-border-subtle"}`}
                  >
                    <FileTabDashIcon />
                    <span className="truncate text-[10px] text-label-mid">{file.name}</span>
                  </button>
                ))}
          </div>

          <div className="min-h-[120px] self-stretch rounded-[14px] border border-card-outline px-2 pb-6 pt-0">
            {showSkillsFolder
              ? skills.length === 0
                ? <p className="p-4 text-xs text-gray-400">No skills matched yet.</p>
                : <MarkdownPreview content={skillContent} />
              : activeFile
                ? <MarkdownPreview content={activeFile.content} />
                : <p className="p-4 text-xs text-gray-400">No preview available yet.</p>}
          </div>
        </div>

        <div className="flex gap-4 self-stretch">
          <div className="flex h-52 w-[292px] shrink-0 flex-col gap-3 rounded-xl border border-card-outline bg-white p-4">
            <p className="font-sans text-xs font-medium text-label-dark">Manifest</p>
            <dl className="flex flex-col gap-2">
              {[
                ["Name", persona?.manifest?.name ?? persona?.name ?? "Untitled"],
                ["Version", persona?.manifest?.version ?? "0.1.0"],
                ["Model", persona?.manifest?.model ?? "gemini-3-flash"],
                ["License", persona?.manifest?.license ?? "MIT"],
                ["Files", String(files.length)],
              ].map(([label, value]) => (
                <div key={label} className="flex items-center justify-between gap-2">
                  <dt className="font-sans text-xs font-medium leading-4 text-label-dark">{label}</dt>
                  <dd className="truncate font-sans text-xs font-medium leading-4 text-label-mid">{value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="flex flex-1 flex-col gap-[10px] self-stretch rounded-xl border border-card-outline bg-white p-4">
            <p className="font-sans text-xs font-medium text-label-dark">Skills & Capabilities</p>
            <div className="flex flex-wrap gap-2">
              {skills.length > 0
                ? skills.map((skill) => (
                    <span key={skill.slug} className="flex h-[30px] items-center rounded-2xl border border-tag-border px-3 py-1.5 font-sans text-[11px] text-folder-fg">
                      {skill.name}
                    </span>
                  ))
                : <p className="text-xs text-gray-400">No skills matched yet.</p>}
            </div>
          </div>
        </div>

        {hasPublishLinks && (
          <button type="button" onClick={() => setShowLinks(true)} className="self-start text-xs text-teal-brand underline">
            View GitHub links
          </button>
        )}
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
