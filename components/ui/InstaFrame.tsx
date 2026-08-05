import Image from "next/image";
import { HeartIcon } from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/lib/utils";

export interface InstaFrameProps {
  className?: string;
  caption?: string;
  dateStamp?: string;
  imageUrl?: string;
  imageAlt?: string;
  children?: React.ReactNode;
}

export function InstaFrame({
  className,
  caption = "Full-stack",
  dateStamp = "05·27·96",
  imageUrl,
  imageAlt,
  children,
}: InstaFrameProps) {
  return (
    <div
      className={cn(
        "relative inline-block bg-white p-4 pb-14 shadow-[2px_2px_0_0_rgba(0,0,0,0.3)] rotate-[3deg] transition-transform duration-200 hover:rotate-[6deg] hover:-translate-y-1",
        className,
      )}
    >
      {/* Heart sticker */}
      <span
        aria-hidden="true"
        className="absolute -top-3 -right-3 w-10 h-10 bg-rose-400 rounded-full border-2 border-white flex items-center justify-center shadow-md rotate-12 z-10"
      >
        <HeartIcon className="w-5 h-5 text-white" weight="fill" />
      </span>
      {/* Photo area with hand-drawn-feel inner border */}
      <div className="w-42 h-42 bg-nb-canvas relative overflow-hidden flex items-center justify-center">
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={imageAlt || caption}
            fill
            sizes="250px"
            className="object-cover"
          />
        )}
        {children}
      </div>
      {/* Caption + date stamp */}
      <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
        <p className="font-mono text-sm text-nb-ink/80">{caption}</p>
        <span className="font-mono text-[10px] tracking-wider text-red-600 border border-red-600 px-1.5 py-0.5 -rotate-3">
          {dateStamp}
        </span>
      </div>
    </div>
  );
}
