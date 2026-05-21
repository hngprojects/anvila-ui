import { AGENT_SUBTITLE, AGENT_TITLE, DEMO_FILES, MANIFEST } from "@/data/agents";
import TopBar from "../TopBar";
import FilePreviewPanel from "./FilePreviewPanel";

export default function PreviewSection() {
    return (
        <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
            {/* Top bar (fixed) */}
            <div className="shrink-0 px-4 pt-3 z-10">
                <TopBar />
            </div>

            {/* Scrollable Area */}
            <div className="flex-1 overflow-y-auto min-h-0 flex flex-col">
                {/* Page title row */}
                <div className="shrink-0 border-b border-gray-100 px-5 py-3">
                    <h1 className="text-sm font-semibold text-gray-900 truncate">{AGENT_TITLE}</h1>
                    <p className="mt-0.5 text-xs text-gray-500 truncate">{AGENT_SUBTITLE}</p>
                </div>

                {/* File preview + manifest */}
                <div className="min-w-0 flex-1 flex flex-col min-h-[500px]" >
                    <FilePreviewPanel files={DEMO_FILES} manifest={MANIFEST} />
                </div>
            </div>
        </div>
    );
}