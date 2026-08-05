"use client";

import { useState, useCallback, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import {
  ArrowLeftIcon,
  DownloadSimpleIcon,
  ArrowLineLeftIcon,
  ArrowLineRightIcon,
  MinusIcon,
  PlusIcon,
} from "@phosphor-icons/react";
import Link from "next/link";

// Configure the PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

const RESUME_API_URL = "/api/resume";
const RESUME_DOWNLOAD_URL = "/resume/Fullstack.pdf";
const MIN_SCALE = 0.5;
const MAX_SCALE = 2.0;
const SCALE_STEP = 0.2;

export function PdfViewer() {
  const [numPages, setNumPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [scale, setScale] = useState<number>(1.0);
  // Store the raw binary data for react-pdf
  const [pdfData, setPdfData] = useState<{ data: Uint8Array } | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch the PDF as an arrayBuffer on the client side.
  // We pass the raw Uint8Array to react-pdf to completely bypass any URL-based
  // interception from download managers (like IDM) that might cause a 0-byte read.
  useEffect(() => {
    const controller = new AbortController();

    async function fetchPdf() {
      try {
        const response = await fetch(RESUME_API_URL, {
          signal: controller.signal,
        });
        if (!response.ok) {
          throw new Error(`Server responded ${response.status}`);
        }
        const buffer = await response.arrayBuffer();
        setPdfData({ data: new Uint8Array(buffer) });
      } catch (err: unknown) {
        if (err instanceof Error && err.name === "AbortError") return;
        const message = err instanceof Error ? err.message : "Unknown error";
        setError(message);
        setIsLoading(false);
      }
    }

    fetchPdf();

    return () => {
      controller.abort();
    };
  }, []);

  const onDocumentLoadSuccess = useCallback(
    ({ numPages }: { numPages: number }) => {
      setNumPages(numPages);
      setIsLoading(false);
    },
    []
  );

  const onDocumentLoadError = useCallback((err: Error) => {
    setError(err.message);
    setIsLoading(false);
  }, []);

  const goToPrev = () => setCurrentPage((p) => Math.max(1, p - 1));
  const goToNext = () => setCurrentPage((p) => Math.min(numPages, p + 1));
  const zoomIn = () =>
    setScale((s) => Math.min(MAX_SCALE, +(s + SCALE_STEP).toFixed(1)));
  const zoomOut = () =>
    setScale((s) => Math.max(MIN_SCALE, +(s - SCALE_STEP).toFixed(1)));

  return (
    <div className="min-h-dvh flex flex-col bg-nb-canvas font-space">
      {/* ── Top bar ── */}
      <header className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b-[3px] border-nb-ink bg-nb-surface px-4 py-3 md:px-8">
        {/* Back */}
        <Link
          href="/"
          className="group inline-flex items-center gap-2 border-[3px] border-nb-ink bg-nb-canvas px-4 py-2 font-space text-sm font-bold text-nb-ink shadow-[3px_3px_0_var(--nb-ink)] transition-all duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0_var(--nb-ink)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none focus-visible:outline-[3px] focus-visible:outline-offset-4 focus-visible:outline-nb-blue"
          aria-label="Back to home"
        >
          <ArrowLeftIcon weight="bold" size={16} />
          <span className="hidden sm:inline">Back to home</span>
        </Link>

        {/* Title */}
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-nb-ink/50">
          Nguyen Hung Cuong — Resume
        </p>

        {/* Download */}
        <a
          href={RESUME_DOWNLOAD_URL}
          download="Nguyen-Hung-Cuong-Resume.pdf"
          className="inline-flex items-center gap-2 border-[3px] border-nb-ink bg-nb-yellow px-4 py-2 font-space text-sm font-bold text-nb-ink shadow-[3px_3px_0_var(--nb-ink)] transition-all duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0_var(--nb-ink)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none focus-visible:outline-[3px] focus-visible:outline-offset-4 focus-visible:outline-nb-blue"
        >
          <DownloadSimpleIcon weight="bold" size={16} />
          <span className="hidden sm:inline">Download</span>
        </a>
      </header>

      {/* ── PDF canvas area ── */}
      <main className="flex flex-1 flex-col items-center overflow-x-auto bg-nb-muted/40 px-4 py-8">
        {error ? (
          /* Error state */
          <div className="flex max-w-sm flex-col items-center gap-4 border-[3px] border-nb-ink bg-nb-surface p-8 shadow-[5px_5px_0_var(--nb-ink)] text-center">
            <p className="font-syne text-lg font-bold text-nb-ink">
              Could not load PDF
            </p>
            <p className="font-space text-sm text-nb-ink/60">{error}</p>
            <a
              href={RESUME_DOWNLOAD_URL}
              download="Nguyen-Hung-Cuong-Resume.pdf"
              className="inline-flex items-center gap-2 border-[3px] border-nb-ink bg-nb-yellow px-4 py-2 font-space text-sm font-bold shadow-[3px_3px_0_var(--nb-ink)] transition-all duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0_var(--nb-ink)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
            >
              <DownloadSimpleIcon weight="bold" size={16} />
              Download instead
            </a>
          </div>
        ) : (
          <>
            {/* Loading skeleton — shown until both fetch + PDF parse are done */}
            {isLoading && (
              <div
                className="w-[595px] max-w-full border-[3px] border-nb-ink bg-nb-surface shadow-[5px_5px_0_var(--nb-ink)]"
                style={{ height: "842px" }}
                aria-busy="true"
                aria-label="Loading resume PDF"
              >
                <div className="h-full w-full animate-pulse bg-nb-muted/60" />
              </div>
            )}

            {/* PDF Document — only rendered once pdfData is ready */}
            {pdfData && (
              <Document
                file={pdfData}
                onLoadSuccess={onDocumentLoadSuccess}
                onLoadError={onDocumentLoadError}
                loading={null}
                className={isLoading ? "hidden" : ""}
              >
                <div className="border-[3px] border-nb-ink shadow-[5px_5px_0_var(--nb-ink)]">
                  <Page
                    pageNumber={currentPage}
                    scale={scale}
                    renderTextLayer={true}
                    renderAnnotationLayer={true}
                    loading={null}
                  />
                </div>
              </Document>
            )}
          </>
        )}
      </main>

      {/* ── Bottom controls bar ── */}
      {!error && !isLoading && (
        <nav
          className="sticky bottom-0 z-10 flex flex-wrap items-center justify-center gap-4 border-t-[3px] border-nb-ink bg-nb-surface px-4 py-3"
          aria-label="PDF controls"
        >
          {/* Pagination — only shown for multi-page documents */}
          {numPages > 1 && (
            <div className="flex items-center gap-2">
              <button
                onClick={goToPrev}
                disabled={currentPage <= 1}
                aria-label="Previous page"
                className="flex h-9 w-9 items-center justify-center border-[3px] border-nb-ink bg-nb-canvas font-bold shadow-[2px_2px_0_var(--nb-ink)] transition-all duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[3px_3px_0_var(--nb-ink)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:translate-x-0 disabled:hover:translate-y-0 disabled:hover:shadow-[2px_2px_0_var(--nb-ink)] focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-nb-blue"
              >
                <ArrowLineLeftIcon weight="bold" size={15} />
              </button>

              <span className="font-mono text-sm text-nb-ink">
                <span className="font-bold">{currentPage}</span>
                <span className="text-nb-ink/40"> / {numPages}</span>
              </span>

              <button
                onClick={goToNext}
                disabled={currentPage >= numPages}
                aria-label="Next page"
                className="flex h-9 w-9 items-center justify-center border-[3px] border-nb-ink bg-nb-canvas font-bold shadow-[2px_2px_0_var(--nb-ink)] transition-all duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[3px_3px_0_var(--nb-ink)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:translate-x-0 disabled:hover:translate-y-0 disabled:hover:shadow-[2px_2px_0_var(--nb-ink)] focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-nb-blue"
              >
                <ArrowLineRightIcon weight="bold" size={15} />
              </button>
            </div>
          )}

          {/* Zoom */}
          <div className="flex items-center gap-2">
            <button
              onClick={zoomOut}
              disabled={scale <= MIN_SCALE}
              aria-label="Zoom out"
              className="flex h-9 w-9 items-center justify-center border-[3px] border-nb-ink bg-nb-canvas font-bold shadow-[2px_2px_0_var(--nb-ink)] transition-all duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[3px_3px_0_var(--nb-ink)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:translate-x-0 disabled:hover:translate-y-0 disabled:hover:shadow-[2px_2px_0_var(--nb-ink)] focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-nb-blue"
            >
              <MinusIcon weight="bold" size={15} />
            </button>

            <span className="font-mono text-sm font-bold text-nb-ink w-12 text-center">
              {Math.round(scale * 100)}%
            </span>

            <button
              onClick={zoomIn}
              disabled={scale >= MAX_SCALE}
              aria-label="Zoom in"
              className="flex h-9 w-9 items-center justify-center border-[3px] border-nb-ink bg-nb-canvas font-bold shadow-[2px_2px_0_var(--nb-ink)] transition-all duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[3px_3px_0_var(--nb-ink)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:translate-x-0 disabled:hover:translate-y-0 disabled:hover:shadow-[2px_2px_0_var(--nb-ink)] focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-nb-blue"
            >
              <PlusIcon weight="bold" size={15} />
            </button>
          </div>
        </nav>
      )}
    </div>
  );
}
