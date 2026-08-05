import { HandWavingIcon } from "@phosphor-icons/react";

export const TextNote = () => (
  <div className="w-full h-full bg-nb-canvas border-[4px] border-nb-ink shadow-[8px_8px_0_var(--nb-ink)] font-mono transition-transform flex flex-col">
    {/* Header bar */}
    <div className="flex items-center justify-between px-4 py-2 border-b-[4px] border-nb-ink bg-nb-muted">
      <span className="text-[10px] font-black uppercase tracking-[0.3em] text-nb-ink">
        First Draft
      </span>
      <span className="text-[9px] uppercase tracking-[0.2em] text-nb-ink/60">
        No. 2 pencil OK
      </span>
    </div>

    {/* Paper body */}
    <div className="relative flex-grow py-4">
      {/* Red margin line */}
      <div
        aria-hidden="true"
        className="absolute top-0 bottom-0 left-10 md:left-12 w-0 border-l-[2px] border-red-400/70 pointer-events-none"
      />

      {/* Content with blue lines */}
      <div className="w-full h-full bg-transparent bg-local bg-[repeating-linear-gradient(transparent,transparent_43px,#a8c4e0_43px,#a8c4e0_44px)] leading-[44px] text-lg pl-14 md:pl-16 pr-4 pt-[6px] pb-6 font-medium text-nb-ink">
        <span className="font-syne text-2xl md:text-3xl font-bold bg-nb-yellow px-2 border-[2px] border-nb-ink inline-flex items-center gap-2 leading-none shadow-sm -rotate-2 relative z-10 -top-1">
          Hello!{" "}
          <HandWavingIcon
            weight="fill"
            className="text-nb-ink animate-bounce"
          />
        </span>
        <br />I am{" "}
        <span className="font-bold bg-nb-yellow px-1 border-[2px] border-nb-ink shadow-sm relative -top-[1px]">
          Nguyen Hung Cuong
        </span>
        , a Software Engineer based in Ho Chi Minh City. I&apos;m a Software
        Developer with a year of real-world experience under my belt. I also
        take on freelance design gigs on the side for some extra income.
      </div>
    </div>

    {/* Footer bar */}
    <div className="flex items-center justify-between px-4 py-2 border-t-[2px] border-dashed border-nb-ink/40 text-[9px] uppercase tracking-[0.25em] text-nb-ink/60 mt-auto bg-nb-canvas">
      <span>Rev. 03 · Do not fold</span>
      <span>Words: 34</span>
    </div>
  </div>
);
