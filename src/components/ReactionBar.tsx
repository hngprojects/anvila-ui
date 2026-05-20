"use client"

import {
    ThumbsUp,
    ThumbsDown,
    Copy,
    MoreHorizontal,
} from "lucide-react";


export default function ReactionBar() {
    return (
        <div className="flex items-center gap-3 text-gray-400">
            <button className="hover:text-gray-600 transition-colors" aria-label="thumbs up">
                <ThumbsUp size={14} />
            </button>
            <button className="hover:text-gray-600 transition-colors" aria-label="thumbs down">
                <ThumbsDown size={14} />
            </button>
            <button className="hover:text-gray-600 transition-colors" aria-label="copy">
                <Copy size={14} />
            </button>
            <button className="hover:text-gray-600 transition-colors" aria-label="more">
                <MoreHorizontal size={14} />
            </button>
        </div>
    )
}