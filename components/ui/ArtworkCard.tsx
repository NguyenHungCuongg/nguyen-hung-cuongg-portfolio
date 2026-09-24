"use client";

import { useState } from "react";
import Image from "next/image";
import type { ArtworkItem } from "@/types";
import { cn } from "@/lib/utils";

interface ArtworkCardProps {
  artwork: ArtworkItem;
  onClick: () => void;
}

export function ArtworkCard({ artwork, onClick }: ArtworkCardProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group relative block w-full overflow-hidden break-inside-avoid cursor-pointer",
        "border-[3px] border-nb-ink shadow-[5px_5px_0_var(--nb-ink)]",
        "transition-all duration-150 hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[8px_8px_0_var(--nb-ink)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none",
        "focus-visible:outline-[3px] focus-visible:outline-offset-4 focus-visible:outline-nb-blue",
        "mb-4 bg-nb-surface text-left select-none"
      )}
      aria-label={artwork.alt || "View artwork"}
    >
      <div className="relative aspect-auto w-full min-h-[220px] bg-nb-surface overflow-hidden">
        {/* Neubrutalist Skeleton indicator while image is loading */}
        {isLoading && (
          <div className="absolute inset-0 z-0 flex items-center justify-center bg-nb-surface animate-pulse">
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-nb-ink/40">
              Loading...
            </span>
          </div>
        )}

        <Image
          src={artwork.image}
          alt={artwork.alt}
          width={800}
          height={1200}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 420px"
          quality={80}
          loading="lazy"
          onLoad={() => setIsLoading(false)}
          className={cn(
            "w-full h-auto object-cover transition-opacity duration-300",
            isLoading ? "opacity-0" : "opacity-100"
          )}
        />
      </div>
    </button>
  );
}

