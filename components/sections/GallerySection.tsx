import type { ArtworkItem, GalleryCategory } from "@/types";
import { GallerySectionClient } from "@/components/ui/GallerySectionClient";

interface GallerySectionProps {
  category: GalleryCategory;
  artworks: ArtworkItem[];
}

export function GallerySection({ category, artworks }: GallerySectionProps) {
  return (
    <section className="mb-16 md:mb-24">
      <h2 className="font-syne font-bold text-2xl md:text-3xl text-nb-ink border-b-[4px] border-nb-ink pb-2 mb-8 inline-block">
        {category.label}
      </h2>
      <GallerySectionClient artworks={artworks} />
    </section>
  );
}
