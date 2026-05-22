"use client";

import GeneratorComposer from "@/components/protected/generator/GeneratorComposer";

export default function AnvilaLayout() {
  return (
    <div className="flex h-full min-w-0 flex-1 flex-col overflow-hidden">
      <GeneratorComposer />
    </div>
  );
}
