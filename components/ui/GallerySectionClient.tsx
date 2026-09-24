"use client";

import * as React from "react";
import type { ArtworkItem } from "@/types";
import { ArtworkCard } from "./ArtworkCard";
import { GalleryLightbox } from "./GalleryLightbox";
import AnimatedContent from "@/components/ui/AnimatedContent";

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
          <AnimatedContent
            key={artwork.id}
            direction="vertical"
            distance={35}
            duration={0.5}
            delay={Math.min((index % 6) * 0.07, 0.35)}
            className="break-inside-avoid block mb-4"
          >
            <ArtworkCard
              artwork={artwork}
              onClick={() => setSelectedIndex(index)}
            />
          </AnimatedContent>
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
