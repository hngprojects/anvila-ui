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
  onSaveAsPrivate,
}: AgentPreviewPanelProps) {
  const [activeFileId, setActiveFileId] = useState(files[0]?.id ?? "");
  const [showSkillsFolder, setShowSkillsFolder] = useState(false);
  const [activeSkillSlug, setActiveSkillSlug] = useState(skills[0]?.slug ?? "");
  const [showLinks, setShowLinks] = useState(false);

  const activeFile = useMemo(
    () => files.find((f) => f.id === activeFileId) ?? files[0],
    [activeFileId, files],
  );

  const activeSkill = useMemo(
    () => skills.find((s) => s.slug === activeSkillSlug) ?? skills[0],
    [activeSkillSlug, skills],
  );

  const isPublished = persona?.status === "published";
  const hasPublishLinks = Boolean(persona?.githubRepoUrl || persona?.githubCloneUrl || persona?.githubZipUrl);
  const agentName = persona?.name ?? "Agent";
  const skillContent = activeSkill ? `# ${activeSkill.name}\n\n${activeSkill.description ?? ""}` : "";

  function handleRootFolderClick() {
    setShowSkillsFolder(false);
    if (files.length > 0) setActiveFileId(files[0].id);
  }

  function handleSkillsFolderClick() {
    setShowSkillsFolder(true);
    if (skills.length > 0) setActiveSkillSlug(skills[0]?.slug ?? "");
  }

  return (
    <section className="flex h-full min-h-0 w-full flex-col overflow-hidden bg-white">
      <TopNav
        isPublished={isPublished}
        isPublishing={isPublishing}
        onRefresh={onClose}
        onSaveAsPrivate={onSaveAsPrivate}
        onPublish={onPublish}
      />

      <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto px-4 pb-6">
        {publishError && <ErrorBanner message={publishError} />}

        <AgentHeader name={agentName} description={persona?.description} />

        <FileBrowserCard
          agentName={agentName}
          files={files}
          skills={skills}
          activeFile={activeFile}
          activeSkillSlug={activeSkillSlug}
          showSkillsFolder={showSkillsFolder}
          skillContent={skillContent}
          onRootClick={handleRootFolderClick}
          onSkillsClick={handleSkillsFolderClick}
          onFileSelect={(id) => setActiveFileId(id)}
          onSkillSelect={(slug) => setActiveSkillSlug(slug)}
        />

        <div className="flex gap-4 self-stretch">
          <ManifestCard persona={persona} fileCount={files.length} />
          <SkillsCard skills={skills} />
        </div>

        {hasPublishLinks && (
          <button
            type="button"
            onClick={() => setShowLinks(true)}
            className="self-start text-xs text-teal-brand underline"
          >
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

function TopNav({
  isPublished,
  isPublishing,
  onRefresh,
  onSaveAsPrivate,
  onPublish,
}: {
  isPublished: boolean;
  isPublishing: boolean;
  onRefresh: () => void;
  onSaveAsPrivate?: () => void;
  onPublish: () => Promise<void>;
}) {
  return (
    <nav className="flex shrink-0 items-center justify-end gap-[10px] px-7 py-3">
      <button type="button" onClick={onRefresh} className="flex items-center justify-center" aria-label="Refresh">
        <PreviewRefreshIcon />
      </button>

      <button
        type="button"
        onClick={onSaveAsPrivate}
        disabled={!onSaveAsPrivate}
        className="flex h-8 items-center rounded-2xl px-3 font-sans text-sm font-normal text-save-private disabled:cursor-not-allowed disabled:opacity-40"
      >
        Save as Private
      </button>

      <button
        type="button"
        onClick={isPublished ? undefined : onPublish}
        disabled={isPublished || isPublishing}
        className="flex items-center gap-2 rounded-lg border-[0.5px] border-teal-brand bg-teal-brand px-5 py-3 font-sans text-sm font-medium text-white transition disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isPublishing ? (
          <><Loader2 size={14} className="animate-spin" />Publishing</>
        ) : isPublished ? "Published" : "Publish"}
      </button>
    </nav>
  );
}

function ErrorBanner({ message }: { message: string }) {
  return (
    <div className="shrink-0 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
      {message}
    </div>
  );
}

function AgentHeader({ name, description }: { name: string; description?: string }) {
  return (
    <div>
      <h1 className="truncate font-sans text-lg font-semibold leading-7 text-dark-fg">
        {name}
      </h1>
      <p className="mt-0.5 truncate font-sans text-xs font-normal leading-4 text-dark-fg">
        {description ?? "Generated agent"}
      </p>
    </div>
  );
}

function FileBrowserCard({
  agentName,
  files,
  skills,
  activeFile,
  activeSkillSlug,
  showSkillsFolder,
  skillContent,
  onRootClick,
  onSkillsClick,
  onFileSelect,
  onSkillSelect,
}: {
  agentName: string;
  files: AgentFileContent[];
  skills: AgentSkill[];
  activeFile: AgentFileContent | undefined;
  activeSkillSlug: string;
  showSkillsFolder: boolean;
  skillContent: string;
  onRootClick: () => void;
  onSkillsClick: () => void;
  onFileSelect: (id: string) => void;
  onSkillSelect: (slug: string) => void;
}) {
  return (
    <div className="flex flex-col gap-2 self-stretch rounded-lg border border-border-subtle px-4 pb-0 pt-2">
      <div className="flex items-center gap-3 py-1">
        <button type="button" onClick={onRootClick} className="flex items-center gap-1">
          <FolderBreadcrumbIcon />
          <span className="font-sans text-xs font-semibold leading-4 text-folder-fg">{agentName}</span>
          {showSkillsFolder ? <BreadcrumbChevronRight /> : <BreadcrumbChevronDown />}
        </button>

        <span className="text-border-subtle">|</span>

        <button type="button" onClick={onSkillsClick} className="flex items-center gap-1">
          <SkillsFolderIcon />
          <span className="font-sans text-xs font-normal leading-4 text-folder-fg">Skills</span>
          {showSkillsFolder ? <BreadcrumbChevronDown /> : <BreadcrumbChevronRight />}
        </button>
      </div>

      <div className="flex items-center gap-4 overflow-x-auto px-6">
        {showSkillsFolder
          ? skills.map((skill) => (
              <FileTab
                key={skill.slug}
                label={`${skill.name}.ts`}
                isActive={activeSkillSlug === skill.slug}
                onClick={() => onSkillSelect(skill.slug)}
              />
            ))
          : files.map((file) => (
              <FileTab
                key={file.id}
                label={file.name}
                isActive={activeFile?.id === file.id}
                onClick={() => onFileSelect(file.id)}
              />
            ))}
      </div>

      <div className="min-h-[120px] self-stretch rounded-[14px] border border-card-outline px-2 pb-6 pt-0">
        {showSkillsFolder
          ? <MarkdownPreview content={skillContent} />
          : activeFile
            ? <MarkdownPreview content={activeFile.content} />
            : <p className="p-4 text-xs text-gray-400">No preview available yet.</p>}
      </div>
    </div>
  );
}

function FileTab({ label, isActive, onClick }: { label: string; isActive: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-[110px] shrink-0 items-center gap-1 rounded px-1 py-2 ${
        isActive
          ? "border border-teal-accent bg-file-active"
          : "border border-border-subtle"
      }`}
    >
      <FileTabDashIcon />
      <span className="truncate text-[10px] text-label-mid">{label}</span>
    </button>
  );
}

function ManifestCard({ persona, fileCount }: { persona: AgentPersona | null; fileCount: number }) {
  return (
    <div className="flex h-52 w-[292px] shrink-0 flex-col gap-3 rounded-xl border border-card-outline bg-white p-4">
      <p className="font-sans text-xs font-medium text-label-dark">Manifest</p>
      <dl className="flex flex-col gap-2">
        <ManifestRow label="Name" value={persona?.manifest?.name ?? persona?.name ?? "Untitled"} />
        <ManifestRow label="Version" value={persona?.manifest?.version ?? "0.1.0"} />
        <ManifestRow label="Model" value={persona?.manifest?.model ?? "gemini-3-flash"} />
        <ManifestRow label="License" value={persona?.manifest?.license ?? "MIT"} />
        <ManifestRow label="Files" value={String(fileCount)} />
      </dl>
    </div>
  );
}

function ManifestRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-2">
      <dt className="font-sans text-xs font-medium leading-4 text-label-dark">{label}</dt>
      <dd className="truncate font-sans text-xs font-medium leading-4 text-label-mid">{value}</dd>
    </div>
  );
}

function SkillsCard({ skills }: { skills: AgentSkill[] }) {
  return (
    <div className="flex flex-1 flex-col gap-[10px] self-stretch rounded-xl border border-card-outline bg-white p-4">
      <p className="font-sans text-xs font-medium text-label-dark">Skills & Capabilities</p>
      <div className="flex flex-wrap gap-2">
        {skills.length > 0 ? (
          skills.map((skill) => (
            <span
              key={skill.slug}
              className="flex h-[30px] items-center rounded-2xl border border-tag-border px-3 py-1.5 font-sans text-[11px] text-folder-fg"
            >
              {skill.name}
            </span>
          ))
        ) : (
          <p className="text-xs text-gray-400">No skills matched yet.</p>
        )}
      </div>
    </div>
  );
}
