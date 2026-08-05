import React from "react";

interface PinnedNoteProps {
  children: React.ReactNode;
  subtitle?: string;
}

export const PinnedNote = ({ children, subtitle }: PinnedNoteProps) => {
  return (
    <div className="relative inline-block mt-2 mb-4 lg:mb-6">
      {/* Thumbtack */}
      <span
        aria-hidden="true"
        className="absolute -top-2 left-1/2 -translate-x-1/2 z-10 w-6 h-6 rounded-full bg-gradient-to-br from-red-400 to-red-600 border border-red-700 shadow-md"
      >
        <span className="absolute top-1 left-1.5 w-1.5 h-1.5 rounded-full bg-white/60" />
      </span>
      {/* Note content */}
      <div className="bg-nb-canvas px-6 py-4 pt-6 rotate-1 shadow-[5px_5px_0_var(--nb-ink)] transition-transform duration-200 hover:rotate-0">
        {subtitle && (
          <p className="font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] text-nb-orange mb-2 text-center">
            {subtitle}
          </p>
        )}
        <div className="text-nb-ink">{children}</div>
      </div>
    </div>
  );
};
