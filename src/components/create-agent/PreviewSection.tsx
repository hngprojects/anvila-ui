import { AGENT_SUBTITLE, AGENT_TITLE, DEMO_FILES, MANIFEST } from "@/data/agents";
import TopBar from "../TopBar";
import FilePreviewPanel from "./FilePreviewPanel";
import { Folder } from "lucide-react";

export default function PreviewSection() {
    return (
        <div id="preview-screen-root" className="flex-1 flex flex-col min-w-0 h-full overflow-hidden bg-white">
            <div className="shrink-0 px-4 pt-3 z-10">
                <TopBar />
            </div>

            <div className="flex-1 overflow-y-auto min-h-0 flex flex-col">
                <div className="block md:hidden px-4 pt-2 pb-3 text-left">
                    <h1 className="text-[20px] font-bold text-gray-900 leading-snug">
                        {AGENT_TITLE}
                    </h1>
                    <p className="mt-2 text-[12px] text-gray-600 leading-relaxed">
                        {AGENT_SUBTITLE}
                    </p>
                    <div className="border-b border-gray-100 my-4" />
                    
                    <div className="flex items-center gap-2 text-gray-500 text-[13px] font-normal py-1">
                        <span className="text-gray-400">&gt;</span>
                        <Folder size={16} className="text-gray-600 fill-gray-50" />
                        <span className="text-gray-700 font-medium">Anatassia Rhodes</span>
                    </div>
                </div>

                <div className="hidden md:block shrink-0 border-b border-gray-100 px-5 py-3">
                    <h1 className="text-sm font-semibold text-gray-900 truncate">{AGENT_TITLE}</h1>
                    <p className="mt-0.5 text-xs text-gray-500 truncate">{AGENT_SUBTITLE}</p>
                </div>

                <div className="min-w-0 flex-1 flex flex-col min-h-[500px]" >
                    <FilePreviewPanel files={DEMO_FILES} manifest={MANIFEST} />
                </div>
            </div>
        </div>
    );
}