import React from "react";
import { cn } from "@/lib/utils";

export interface MarqueeRibbonProps {
  className?: string;
  items?: string[];
}

export function MarqueeRibbon({
  className,
  items = [
    "★ SOFTWARE ENGINEER",
    "▸ DESIGN WITH PASSION",
    "✱ DEVELOP WITH PURPOSE",
    "▸ THINK WITH CLARITY",
    "★ BUILDING SCALABLE SYSTEMS",
    "✱ NGUYEN HUNG CUONG",
  ],
}: MarqueeRibbonProps) {
  return (
    <div
      className={cn(
        "w-full bg-nb-ink text-nb-yellow border-t-[4px] border-nb-ink font-mono overflow-hidden select-none flex",
        className,
      )}
    >
      <div className="py-2.5 whitespace-nowrap animate-[mqFoot_20s_linear_infinite] text-sm tracking-widest font-bold flex shrink-0 min-w-full">
        {[...items, ...items, ...items, ...items].map((t, i) => (
          <span key={i} className="inline-flex items-center px-6 shrink-0">
            {t} <span className="opacity-30 ml-12">·</span>
          </span>
        ))}
      </div>
      <style>{`
        @keyframes mqFoot { 
          0% { transform: translateX(0); } 
          100% { transform: translateX(-25%); } 
        }
      `}</style>
    </div>
  );
}
