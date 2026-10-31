"use client";

import { useState } from "react";
import { achievements } from "@/data/portfolio";

const filters = [
  ["all", "All"],
  ["ai-math", "AI + Math"],
  ["engineering", "Data engineering"],
  ["leadership", "Analytics & leadership"],
] as const;

export function AchievementGrid() {
  const [filter, setFilter] = useState<string>("all");
  const items = achievements.filter(
    (achievement) => filter === "all" || achievement.category === filter,
  );
  return (
    <>
      <div className="impact-filters reveal" role="group" aria-label="Achievement categories">
        {filters.map(([value, label]) => (
          <button
            key={value}
            className={`filter-button${filter === value ? " is-active" : ""}`}
            type="button"
            aria-pressed={filter === value}
            onClick={() => setFilter(value)}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="impact-grid" id="achievement-grid" aria-live="polite">
        {items.map((item) => (
          <article className={`impact-card ${item.tone} reveal is-visible`} key={item.title}>
            <span className="card-type">{item.type}</span>
            <h3>{item.title}</h3>
            <div className="impact-metric">
              <strong>{item.metric}</strong>
              <span>{item.detail}</span>
            </div>
            <p>{item.description}</p>
          </article>
        ))}
      </div>
    </>
  );
}
