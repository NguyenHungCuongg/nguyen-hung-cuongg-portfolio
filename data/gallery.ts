import type { ArtworkItem, GalleryCategory } from "@/types";

export const galleryCategories: GalleryCategory[] = [
  { id: "book-cover", label: "Book Cover" },
  { id: "other", label: "Other" },
];

export const artworks: ArtworkItem[] = [
  // Placeholder data - replace with real images later
  {
    id: "book-cover-placeholder-1",
    title: "Book Cover 1",
    category: "book-cover",
    image: "/images/gallery/book-cover/placeholder-1.svg",
    year: "2024",
    alt: "Placeholder for book cover 1",
  },
  {
    id: "other-placeholder-1",
    title: "Digital Art Piece 1",
    category: "other",
    image: "/images/gallery/other/placeholder-1.svg",
    year: "2024",
    alt: "Placeholder for digital art piece 1",
  },
];
