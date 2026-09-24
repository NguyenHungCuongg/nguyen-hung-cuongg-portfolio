"use client";

import Image from "next/image";
import type { ArtworkItem } from "@/types";
import { cn } from "@/lib/utils";

interface ArtworkCardProps {
  artwork: ArtworkItem;
  onClick: () => void;
}

export function ArtworkCard({ artwork, onClick }: ArtworkCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group relative block w-full overflow-hidden break-inside-avoid cursor-pointer",
        "border-[3px] border-nb-ink shadow-[5px_5px_0_var(--nb-ink)]",
        "transition-all duration-150 hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[8px_8px_0_var(--nb-ink)]",
        "focus-visible:outline-[3px] focus-visible:outline-offset-4 focus-visible:outline-nb-blue",
        "mb-4 bg-nb-surface"
      )}
      aria-label={artwork.alt || "View artwork"}
    >
      <div className="relative aspect-auto w-full">
        <Image
          src={artwork.image}
          alt={artwork.alt}
          width={800}
          height={1200}
          className="w-full h-auto object-cover"
        />
      </div>
    </button>
  );
}
