import Link from "next/link";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 - Page Not Found | N4C",
  description: "The page you are looking for does not exist.",
};

export default function NotFound() {
  return (
    <div className="relative min-h-dvh w-full overflow-hidden bg-[#EAE6D9] flex flex-col items-center justify-center p-4 md:p-8">
      {/* Dotted background pattern */}
      <div className="absolute inset-0 opacity-30 bg-[radial-gradient(var(--nb-ink)_1px,transparent_1px)] [background-size:24px_24px]" />

      <main className="relative z-10 w-full max-w-3xl border-[6px] border-nb-ink bg-nb-canvas px-6 py-10 md:px-10 md:py-16 flex flex-col items-center text-center shadow-[16px_16px_0_var(--nb-ink)] md:shadow-[24px_24px_0_var(--nb-ink)]">
        {/* Angled Stamp */}
        <div className="absolute -top-5 -right-2 md:-top-6 md:-right-8 rotate-[12deg] border-[3px] border-[#E03E3E] bg-[#F9F7F1] px-4 py-1 md:px-6 md:py-2">
          <span className="font-space text-sm md:text-base font-bold uppercase tracking-widest text-[#E03E3E]">
            Return to sender
          </span>
        </div>

        {/* Header Text */}
        <p className="font-space text-xs md:text-sm font-bold uppercase tracking-[0.3em] text-nb-ink/60">
          Error &middot; Code 404 &middot; Route Not Found
        </p>

        {/* Giant 404 */}
        <h1 className="my-2 md:my-4 font-syne text-[7rem] md:text-[11rem] font-extrabold leading-none tracking-tighter text-nb-ink">
          404
        </h1>

        {/* Dashed Divider */}
        <div className="flex w-full max-w-2xl items-center gap-4 my-8 md:my-12">
          <div className="h-[2px] flex-1 border-b-[2px] border-dashed border-nb-ink/40" />
          <span className="font-space text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-nb-ink/60 whitespace-nowrap">
            End of line
          </span>
          <div className="h-[2px] flex-1 border-b-[2px] border-dashed border-nb-ink/40" />
        </div>

        {/* Message */}
        <h2 className="font-space text-xl md:text-3xl font-bold text-nb-ink">
          Oops! The page you&apos;re looking for isn&apos;t here.
        </h2>

        <p className="mt-4 md:mt-6 max-w-lg font-space text-sm md:text-base font-medium text-nb-ink/70">
          It may have been moved, renamed, or lost in the mail. Sorry about
          that.
        </p>

        {/* Terminal Text */}
        <div className="mt-10 mb-12 font-mono text-base md:text-xl font-bold text-nb-ink flex items-center gap-2">
          <span>$ navigate</span>
          <span className="inline-block h-5 w-3 md:h-6 md:w-3.5 bg-nb-ink animate-pulse" />
        </div>

        {/* Action Button */}
        <Link
          href="/"
          className="group flex items-center gap-3 border-[4px] border-nb-ink bg-nb-yellow px-6 py-3 md:px-8 md:py-4 shadow-[6px_6px_0_var(--nb-ink)] transition-all hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[10px_10px_0_var(--nb-ink)] hover:bg-nb-pink focus-visible:outline-[3px] focus-visible:outline-offset-4 focus-visible:outline-nb-blue"
        >
          <ArrowLeft
            weight="bold"
            className="h-5 w-5 md:h-6 md:w-6 transition-transform group-hover:-translate-x-1"
          />
          <span className="font-space text-sm md:text-lg font-bold uppercase tracking-wide">
            Go Back Home
          </span>
        </Link>
      </main>

      {/* Footer Text */}
      <div className="absolute bottom-6 font-space text-xs md:text-sm font-bold tracking-[0.2em] text-nb-ink/50 uppercase">
        &copy; {new Date().getFullYear()} &middot; If lost please return
      </div>
    </div>
  );
}
