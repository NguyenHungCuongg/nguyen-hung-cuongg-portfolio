export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen flex-1 bg-nb-canvas">
      <div className="scale-[2] sm:scale-[2.5] md:scale-[3]">
        <RetroSpinner />
      </div>
      <p className="mt-20 sm:mt-26 lg:mt-28 font-space lg:text-3xl text-xl font-bold tracking-[0.2em] text-nb-ink uppercase animate-pulse">
        Loading...
      </p>
    </div>
  );
}

const RetroSpinner = () => {
  return (
    <div className="relative w-32 h-20 bg-nb-yellow border-[4px] border-nb-ink shadow-[4px_4px_0px_var(--nb-ink)] font-mono">
      <div className="absolute top-1 left-1 right-1 h-2 bg-nb-ink/80" />
      <div className="absolute inset-2 top-4 flex items-center justify-around bg-nb-ink">
        <div className="w-7 h-7 rounded-full bg-nb-canvas border-[2px] border-nb-ink flex items-center justify-center shadow-inner">
          <div className="w-4 h-4 rounded-full border-[2px] border-nb-yellow border-t-transparent animate-spin" />
        </div>
        <div className="text-[8px] font-bold text-nb-yellow tracking-widest">
          ► REC
        </div>
        <div className="w-7 h-7 rounded-full bg-nb-canvas border-[2px] border-nb-ink flex items-center justify-center shadow-inner">
          <div
            className="w-4 h-4 rounded-full border-[2px] border-nb-yellow border-t-transparent animate-spin"
            style={{ animationDirection: "reverse" }}
          />
        </div>
      </div>
    </div>
  );
};
