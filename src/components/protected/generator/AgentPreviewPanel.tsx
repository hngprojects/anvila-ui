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
  const hasPublishLinks = Boolean(
    persona?.githubRepoUrl || persona?.githubCloneUrl || persona?.githubZipUrl,
  );
  const agentName = persona?.name || "Agent";

  function handleRootFolderClick() {
    setShowSkillsFolder(false);
    if (files.length > 0) setActiveFileId(files[0].id);
  }

  function handleSkillsFolderClick() {
    setShowSkillsFolder(true);
    if (skills.length > 0) setActiveSkillSlug(skills[0]?.slug ?? "");
  }

  const skillContent = activeSkill
    ? `# ${activeSkill.name}\n\n${activeSkill.description ?? ""}`
    : "";

  return (
    <section className="flex h-full min-h-0 w-full flex-col overflow-hidden bg-white">
      <nav
        className="flex shrink-0 items-center justify-end gap-[10px] px-7 py-3"
      >
        <button
          type="button"
          onClick={onClose}
          className="flex items-center justify-center"
          aria-label="Refresh preview"
        >
          <PreviewRefreshIcon />
        </button>

        <button
          type="button"
          onClick={onSaveAsPrivate}
          className="flex h-8 items-center rounded-2xl px-3 text-sm"
          style={{ color: "#515151", fontFamily: "Inter, sans-serif", fontWeight: 400 }}
        >
          Save as Private
        </button>

        <button
          type="button"
          onClick={isPublished ? undefined : onPublish}
          disabled={isPublished || isPublishing}
          className="flex items-center justify-center gap-2 px-5 py-3 text-sm font-medium text-white transition disabled:cursor-not-allowed disabled:opacity-70"
          style={{
            borderRadius: 8,
            border: "0.5px solid #0C5D56",
            background: "#0C5D56",
            fontFamily: "Inter, sans-serif",
          }}
        >
          {isPublishing ? (
            <><Loader2 size={14} className="animate-spin" />Publishing</>
          ) : isPublished ? (
            "Published"
          ) : (
            "Publish"
          )}
        </button>
      </nav>

      <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto px-4 pb-6">
        {publishError && (
          <div className="shrink-0 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {publishError}
          </div>
        )}

        <div>
          <h1
            className="truncate"
            style={{
              color: "#050605",
              fontFamily: "var(--fonts-body, Geist), sans-serif",
              fontSize: 18,
              fontWeight: 600,
              lineHeight: "28px",
            }}
          >
            {agentName}
            {persona?.description ? ` - ${persona.description.split(" ").slice(0, 6).join(" ")}` : ""}
          </h1>
          <p
            className="mt-0.5 truncate"
            style={{
              color: "#050605",
              fontFamily: "var(--fonts-body, Geist), sans-serif",
              fontSize: 12,
              fontWeight: 400,
              lineHeight: "16px",
            }}
          >
            {persona?.description ?? "Generated agent"}
          </p>
        </div>

        <div
          className="flex flex-col gap-2 self-stretch"
          style={{
            borderRadius: 8,
            border: "1px solid #E4E4E7",
            padding: "8px 16px 0 16px",
          }}
        >
          <div className="flex items-center gap-3 py-1">
            <button
              type="button"
              onClick={handleRootFolderClick}
              className="flex items-center gap-1"
            >
              <FolderBreadcrumbIcon />
              <span
                style={{
                  color: "#18181B",
                  fontFamily: "var(--fonts-body, Geist), sans-serif",
                  fontSize: 12,
                  fontWeight: 600,
                  lineHeight: "16px",
                }}
              >
                {agentName}
              </span>
              {showSkillsFolder ? <BreadcrumbChevronRight /> : <BreadcrumbChevronDown />}
            </button>

            <span className="text-[#E4E4E7]">|</span>

            <button
              type="button"
              onClick={handleSkillsFolderClick}
              className="flex items-center gap-1"
            >
              <SkillsFolderIcon />
              <span
                style={{
                  color: "#18181B",
                  fontFamily: "var(--fonts-body, Geist), sans-serif",
                  fontSize: 12,
                  fontWeight: 400,
                  lineHeight: "16px",
                }}
              >
                Skills
              </span>
              {showSkillsFolder ? <BreadcrumbChevronDown /> : <BreadcrumbChevronRight />}
            </button>
          </div>

          <div
            className="flex items-center gap-4 overflow-x-auto"
            style={{ padding: "0 24px" }}
          >
            {showSkillsFolder
              ? skills.map((skill) => {
                  const id = skill.slug;
                  const isActive = activeSkillSlug === id;
                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => setActiveSkillSlug(id)}
                      className="flex shrink-0 items-center gap-1 text-left"
                      style={
                        isActive
                          ? {
                              borderRadius: 4,
                              border: "1px solid #0D9488",
                              background: "#CCFBF1",
                              width: 110,
                              padding: "8px 4px",
                            }
                          : {
                              borderRadius: 4,
                              border: "1px solid #E4E4E7",
                              width: 110,
                              padding: "8px 4px",
                            }
                      }
                    >
                      <FileTabDashIcon />
                      <span className="truncate text-[10px] text-[#3D3E3D]">
                        {skill.name}.ts
                      </span>
                    </button>
                  );
                })
              : files.map((file) => {
                  const isActive = activeFile?.id === file.id;
                  return (
                    <button
                      key={file.id}
                      type="button"
                      onClick={() => setActiveFileId(file.id)}
                      className="flex shrink-0 items-center gap-1 text-left"
                      style={
                        isActive
                          ? {
                              borderRadius: 4,
                              border: "1px solid #0D9488",
                              background: "#CCFBF1",
                              width: 110,
                              padding: "8px 4px",
                            }
                          : {
                              borderRadius: 4,
                              border: "1px solid #E4E4E7",
                              width: 110,
                              padding: "8px 4px",
                            }
                      }
                    >
                      <FileTabDashIcon />
                      <span className="truncate text-[10px] text-[#3D3E3D]">{file.name}</span>
                    </button>
                  );
                })}
          </div>

          <div
            className="self-stretch"
            style={{
              borderRadius: 14,
              border: "1px solid #E7E7E7",
              padding: "0 8px 24px 8px",
              minHeight: 120,
            }}
          >
            {showSkillsFolder ? (
              <MarkdownPreview content={skillContent} />
            ) : activeFile ? (
              <MarkdownPreview content={activeFile.content} />
            ) : (
              <p className="p-4 text-sm text-gray-400">No preview available yet.</p>
            )}
          </div>
        </div>

        <div className="flex gap-4 self-stretch">
          <div
            className="flex shrink-0 flex-col gap-3"
            style={{
              borderRadius: 12,
              border: "1px solid #E7E7E7",
              background: "#fff",
              width: 292,
              minHeight: 208,
              padding: 16,
            }}
          >
            <p
              style={{
                color: "#0C0E0D",
                fontFamily: "var(--fonts-body, Geist), sans-serif",
                fontSize: 12,
                fontWeight: 500,
                lineHeight: "16px",
              }}
            >
              Manifest
            </p>
            <dl className="flex flex-col gap-2">
              <ManifestRow label="Name" value={persona?.manifest?.name ?? persona?.name ?? "Untitled"} />
              <ManifestRow label="Version" value={persona?.manifest?.version ?? "0.1.0"} />
              <ManifestRow label="Model" value={persona?.manifest?.model ?? "gemini-3-flash"} />
              <ManifestRow label="License" value={persona?.manifest?.license ?? "MIT"} />
              <ManifestRow label="Files" value={String(files.length)} />
            </dl>
          </div>

          <div
            className="flex flex-1 flex-col gap-[10px] self-stretch"
            style={{
              borderRadius: 12,
              border: "1px solid #E7E7E7",
              background: "#fff",
              padding: 16,
            }}
          >
            <p
              style={{
                color: "#0C0E0D",
                fontFamily: "var(--fonts-body, Geist), sans-serif",
                fontSize: 12,
                fontWeight: 500,
                lineHeight: "16px",
              }}
            >
              Skills & Capabilities
            </p>
            <div className="flex flex-wrap gap-2">
              {skills.length > 0 ? (
                skills.map((skill) => (
                  <span
                    key={skill.slug}
                    className="flex items-center text-[11px] text-[#18181B]"
                    style={{
                      height: 30,
                      padding: "6px 12px",
                      borderRadius: 16,
                      border: "1px solid #B1B5B4",
                    }}
                  >
                    {skill.name}
                  </span>
                ))
              ) : (
                <p className="text-xs text-gray-400">No skills matched yet.</p>
              )}
            </div>
          </div>
        </div>

        {hasPublishLinks && persona && (
          <button
            type="button"
            onClick={() => setShowLinks(true)}
            className="self-start text-xs text-[#0C5D56] underline"
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

function ManifestRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-2">
      <dt
        style={{
          color: "#0C0E0D",
          fontFamily: "var(--fonts-body, Geist), sans-serif",
          fontSize: 12,
          fontWeight: 500,
          lineHeight: "16px",
        }}
      >
        {label}
      </dt>
      <dd
        className="truncate"
        style={{
          color: "#3D3E3D",
          fontFamily: "var(--fonts-body, Geist), sans-serif",
          fontSize: 12,
          fontWeight: 500,
          lineHeight: "16px",
        }}
      >
        {value}
      </dd>
    </div>
  );
}
