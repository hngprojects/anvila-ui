"use client";

import { useState } from "react";
import { ChevronDownIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

interface CustomSelectProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: boolean;
}

export function CustomSelect({
  options,
  value,
  onChange,
  placeholder = "Select...",
  error,
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex h-[44px] w-full items-center justify-between rounded-md border bg-white p-[10px] text-sm font-medium leading-6 focus:outline-none",
          error
            ? "border-red-500 focus:border-red-500"
            : "border-copy-muted/40 focus:border-teal-accent"
        )}
      >
        <span className={value ? "text-logo" : "text-copy-muted/50"}>
          {value || placeholder}
        </span>
        <span className={cn("transition-transform", isOpen && "rotate-180")}>
          <ChevronDownIcon />
        </span>
      </button>

      {isOpen && (
        <ul className="absolute top-full left-0 z-10 mt-1 w-full rounded-md border border-copy-muted/20 bg-white py-1 shadow-lg">
          {options.map((option) => (
            <li key={option}>
              <button
                type="button"
                onClick={() => {
                  onChange(option);
                  setIsOpen(false);
                }}
                className="w-full px-[10px] py-2 text-left text-base font-medium leading-6 text-logo transition-colors hover:bg-background"
              >
                {option}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
