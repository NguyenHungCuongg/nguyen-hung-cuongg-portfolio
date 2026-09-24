import type { Metadata } from "next";
import { galleryCategories, artworks } from "@/data/gallery";
import { GallerySection } from "@/components/sections/GallerySection";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Gallery | N4C",
  description:
    "Selected artwork by Nguyen Hung Cuong — book covers and digital pieces.",
};

export default function GalleryPage() {
  return (
    <div className="mx-auto w-full max-w-[1400px] px-4 py-8 md:px-8 md:py-16 lg:px-12">
      <div className="mb-12 md:mb-16">
        <SectionHeading
          title="Gallery"
          subtitle="Selected artwork — book covers and digital pieces."
        />
      </div>

      <div className="flex flex-col">
        {galleryCategories.map((category) => {
          const categoryArtworks = artworks.filter(
            (art) => art.category === category.id
          );

          if (categoryArtworks.length === 0) return null;

          return (
            <GallerySection
              key={category.id}
              category={category}
              artworks={categoryArtworks}
            />
          );
        })}
      </div>
    </div>
  );
}
