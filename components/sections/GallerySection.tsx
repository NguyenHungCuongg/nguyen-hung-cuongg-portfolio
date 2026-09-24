import type { ArtworkItem, GalleryCategory } from "@/types";
import { GallerySectionClient } from "@/components/ui/GallerySectionClient";
import AnimatedContent from "@/components/ui/AnimatedContent";

interface GallerySectionProps {
  category: GalleryCategory;
  artworks: ArtworkItem[];
}

export function GallerySection({ category, artworks }: GallerySectionProps) {
  return (
    <section className="mb-16 md:mb-24">
      <AnimatedContent direction="horizontal" distance={30} duration={0.5} className="mb-8 inline-block">
        <h2 className="font-syne font-bold text-2xl md:text-3xl text-nb-ink border-b-[4px] border-nb-ink pb-2">
          {category.label}
        </h2>
      </AnimatedContent>
      <GallerySectionClient artworks={artworks} />
    </section>
  );
}
