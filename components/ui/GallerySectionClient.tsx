"use client";

import * as React from "react";
import type { ArtworkItem } from "@/types";
import { ArtworkCard } from "./ArtworkCard";
import { GalleryLightbox } from "./GalleryLightbox";

interface GallerySectionClientProps {
  artworks: ArtworkItem[];
}

export function GallerySectionClient({ artworks }: GallerySectionClientProps) {
  const [selectedIndex, setSelectedIndex] = React.useState<number | null>(null);

  if (artworks.length === 0) {
    return (
      <div className="py-8 text-nb-ink font-space text-lg">
        No artwork available in this category yet.
      </div>
    );
  }

  return (
    <>
      <div className="columns-1 md:columns-2 lg:columns-3 gap-4">
        {artworks.map((artwork, index) => (
          <ArtworkCard
            key={artwork.id}
            artwork={artwork}
            onClick={() => setSelectedIndex(index)}
          />
        ))}
      </div>

      <GalleryLightbox
        artworks={artworks}
        initialIndex={selectedIndex}
        onClose={() => setSelectedIndex(null)}
      />
    </>
  );
}
