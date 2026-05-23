"use client";

import { useState } from "react";
import { AGENTS, CATEGORIES } from "@/data/agents";
import { Category } from "@/types";

import {
  CategoryFilter,
  AgentGrid,
} from "./ExploreSections";

export default function ExploreClient() {
  const [activeCategory, setActiveCategory] =
    useState<Category>("All");

  const filteredAgents =
    activeCategory === "All"
      ? AGENTS
      : AGENTS.filter((a) =>
          a.category.includes(activeCategory)
        );

  return (
    <>
      <CategoryFilter
        categories={CATEGORIES}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />

      <AgentGrid agents={filteredAgents} />
    </>
  );
}