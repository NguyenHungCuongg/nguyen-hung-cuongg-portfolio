"use client";

import dynamic from "next/dynamic";

// react-pdf uses browser-only APIs (DOMMatrix, canvas) during module evaluation.
// Dynamic import with ssr:false prevents the server from evaluating the module at all.
const PdfViewer = dynamic(
  () => import("@/components/resume/PdfViewer").then((m) => ({ default: m.PdfViewer })),
  {
    ssr: false,
    loading: () => (
      <div className="min-h-dvh flex flex-col bg-nb-canvas font-space">
        {/* Minimal skeleton header */}
        <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b-[3px] border-nb-ink bg-nb-surface px-4 py-3 md:px-8">
          <div className="h-10 w-32 border-[3px] border-nb-ink bg-nb-muted animate-pulse" />
          <div className="h-4 w-48 bg-nb-muted/60 animate-pulse" />
          <div className="h-10 w-28 border-[3px] border-nb-ink bg-nb-muted animate-pulse" />
        </div>
        {/* A4 page skeleton */}
        <main className="flex flex-1 flex-col items-center bg-nb-muted/40 px-4 py-8">
          <div
            className="w-[595px] max-w-full border-[3px] border-nb-ink bg-nb-surface shadow-[5px_5px_0_var(--nb-ink)] animate-pulse"
            style={{ height: "842px" }}
            aria-busy="true"
            aria-label="Loading resume"
          />
        </main>
      </div>
    ),
  }
);

export default function ResumeClientWrapper() {
  return <PdfViewer />;
}
