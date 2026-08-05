import Image from "next/image";
import { cn } from "@/lib/utils";

export interface PolaroidCardProps {
  className?: string;
  caption?: string;
  imageUrl?: string;
  imageAlt?: string;
  children?: React.ReactNode;
}

export function PolaroidCard({
  className,
  caption = "Ho Chi Minh City",
  imageUrl,
  imageAlt,
  children,
}: PolaroidCardProps) {
  return (
    <div
      className={cn(
        "relative inline-block bg-nb-surface p-3 pb-12 shadow-[2px_2px_0_0_rgba(0,0,0,0.25)] -rotate-2 transition-transform duration-200 hover:-rotate-4 hover:-translate-y-1 border-[1px] border-nb-ink/10",
        className,
      )}
    >
      {/* Masking tape */}
      <span
        aria-hidden="true"
        className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-5 bg-yellow-200/80 border border-yellow-300/60 rotate-[-3deg] shadow-sm"
      />

      {/* Photo area template */}
      <div className="w-48 h-48 bg-nb-canvas flex flex-col items-center justify-center relative overflow-hidden">
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

      {/* Caption */}
      <p className="absolute bottom-3 left-0 right-0 text-center font-mono text-sm text-nb-ink/80">
        {caption}
      </p>
    </div>
  );
}
