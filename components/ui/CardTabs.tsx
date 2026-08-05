"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

export interface CardTabItem {
  label: string;
  content: React.ReactNode;
}

export interface CardTabsProps {
  tabs: CardTabItem[];
  className?: string;
}

export function CardTabs({ tabs, className }: CardTabsProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className={cn("font-mono w-full", className)}>
      {/* Tab headers — index card style */}
      <div className="flex items-end" role="tablist" aria-label="Journey tabs">
        {tabs.map((tab, i) => (
          <button
            key={tab.label}
            role="tab"
            aria-selected={activeIndex === i}
            aria-controls={`tab-panel-${i}`}
            id={`tab-${i}`}
            onClick={() => setActiveIndex(i)}
            className={cn(
              "relative px-5 py-2 text-xs font-bold uppercase tracking-[0.15em] border-[4px] border-b-0 border-nb-ink transition-all duration-150 focus-visible:outline-[3px] focus-visible:outline-offset-0 focus-visible:outline-nb-blue",
              i !== 0 && "-ml-[4px]",
              activeIndex === i
                ? "bg-nb-canvas text-nb-ink z-10 translate-y-[4px]"
                : "bg-nb-muted text-nb-ink/50 hover:text-nb-ink hover:bg-nb-surface z-0"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Card body */}
      <div
        id={`tab-panel-${activeIndex}`}
        role="tabpanel"
        aria-labelledby={`tab-${activeIndex}`}
        className="bg-nb-canvas border-[4px] border-nb-ink shadow-[6px_6px_0_var(--nb-ink)] min-h-[320px]"
      >
        {/* Index metadata bar */}
        <div className="border-b-2 border-dashed border-nb-pink/60 px-6 py-3">
          <p className="text-[10px] tracking-[0.3em] text-nb-ink/50 uppercase font-mono">
            Journey · {String(activeIndex + 1).padStart(2, "0")} of{" "}
            {String(tabs.length).padStart(2, "0")} · {tabs[activeIndex].label}
          </p>
        </div>

        {/* Tab content */}
        <div className="p-6 md:p-8">
          {tabs[activeIndex].content}
        </div>
      </div>
    </div>
  );
}
