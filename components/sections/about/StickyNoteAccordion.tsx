"use client";

import { useState } from "react";

export interface StickyNoteItem {
  color: string;
  q: string;
  a: string;
}

export const StickyNoteAccordion = ({ items }: { items: StickyNoteItem[] }) => {
  const [open, setOpen] = useState(0);

  return (
    <div className="font-space w-full space-y-4 md:pl-8">
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <div
            key={it.q}
            className={`${it.color} ${it.color === "bg-nb-blue" ? "text-nb-canvas" : "text-nb-ink"} border-[4px] border-nb-ink shadow-[6px_6px_0px_var(--nb-ink)] transition-transform ${
              isOpen ? "rotate-[-1deg]" : "rotate-[1deg]"
            }`}
          >
            <button
              onClick={() => setOpen(isOpen ? -1 : i)}
              aria-expanded={isOpen}
              className={`w-full flex items-center justify-between ${isOpen ? "px-6 py-6" : "px-6 py-8"} text-left text-base md:text-xl font-bold uppercase tracking-wider focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-nb-ink`}
            >
              <span className="flex items-center gap-3">
                <span className="text-xl font-syne">{isOpen ? "–" : "+"}</span>
                {it.q}
              </span>
              <span className="text-[10px] opacity-70 font-mono tracking-widest">
                TAP
              </span>
            </button>
            <div
              className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <div className="px-5 pb-5 text-base md:text-lg font-medium">
                  {it.a}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
