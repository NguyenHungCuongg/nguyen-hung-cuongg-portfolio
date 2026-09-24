# Gallery Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement a new `/gallery` page to showcase artwork using a masonry layout and a custom lightbox, integrated into the existing portfolio structure.

**Architecture:** A new Next.js App Router page at `app/(main)/gallery/page.tsx` that reads static data from `data/gallery.ts`. It renders a series of category sections (`GallerySection` -> Server) which encapsulate the client boundary (`GallerySectionClient` -> Client). The client component handles state for the masonry grid of `ArtworkCard`s and the `GalleryLightbox` overlay.

**Tech Stack:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, Phosphor Icons.

**Spec:** `docs/superpowers/specs/2026-09-24-gallery-page-design.md`

## Global Constraints

- Strict TypeScript enabled. No `any` types.
- Follow Neubrutalist visual style (hard borders, offset shadows, flat colors).
- Use Tailwind CSS utilities mapped to CSS custom properties from `DESIGN.md`.
- No new external dependencies (specifically no `react-masonry-css`).
- Use `@phosphor-icons/react` exclusively for icons.
- All code must pass `npm run lint` and `npm run build`.

---

### Task 1: Update Types & Navbar Config

**Files:**
- Modify: `types/index.ts`
- Modify: `data/site-config.ts`

**Interfaces:**
- Consumes: Existing type definitions.
- Produces: `ArtworkCategory`, `ArtworkItem`, `GalleryCategory` types available globally, and updated `SiteConfig`.

- [ ] **Step 1: Add new types**
Update `types/index.ts` to include the gallery types.

```typescript
export type ArtworkCategory = "book-cover" | "other";

export interface ArtworkItem {
  id: string;
  title: string;
  category: ArtworkCategory;
  image: string;
  year: string;
  alt: string;
  behanceUrl?: string;
}

export interface GalleryCategory {
  id: ArtworkCategory;
  label: string;
}
```

- [ ] **Step 2: Update Navbar config**
In `data/site-config.ts`, add the Gallery route to `navItems` array, placing it after "Skills".

```typescript
// Inside siteConfig.navItems:
{ label: "Gallery", href: "/gallery" },
```

- [ ] **Step 3: Verify with linter**
Run: `npm run lint`
Expected: PASS

- [ ] **Step 4: Commit**
```bash
git add types/index.ts data/site-config.ts
git commit -m "feat: add gallery types and nav config"
```

---

### Task 2: Create Data Layer & Assets Folders

**Files:**
- Create: `data/gallery.ts`

**Interfaces:**
- Consumes: Types from Task 1.
- Produces: `galleryCategories` and `artworks` static data exports.

- [ ] **Step 1: Create image directories**
Run:
```bash
mkdir -p public/images/gallery/book-cover
mkdir -p public/images/gallery/other
```

- [ ] **Step 2: Create `data/gallery.ts`**
Create the file and populate it with initial static data.

```typescript
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
    image: "/images/gallery/book-cover/placeholder-1.jpg",
    year: "2024",
    alt: "Placeholder for book cover 1",
  }
];
```

- [ ] **Step 3: Verify with linter**
Run: `npm run lint`
Expected: PASS

- [ ] **Step 4: Commit**
```bash
git add data/gallery.ts
git commit -m "feat: setup gallery data layer and asset folders"
```

---

### Task 3: Create ArtworkCard Component

**Files:**
- Create: `components/ui/ArtworkCard.tsx`

**Interfaces:**
- Consumes: `ArtworkItem` type.
- Produces: `ArtworkCard` React component.

- [ ] **Step 1: Write component**
Create `components/ui/ArtworkCard.tsx`. Ensure it's visually aligned with the Neubrutalist style and has the `onClick` handler. Note the `break-inside-avoid` utility for masonry.

```tsx
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
      onClick={onClick}
      className={cn(
        "group relative block w-full overflow-hidden break-inside-avoid cursor-pointer",
        "border-[3px] border-nb-ink shadow-[5px_5px_0_var(--nb-ink)]",
        "transition-all duration-150 hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[8px_8px_0_var(--nb-ink)]",
        "focus-visible:outline-[3px] focus-visible:outline-offset-4 focus-visible:outline-nb-blue",
        "mb-4 bg-nb-surface"
      )}
      aria-label={`View ${artwork.title}`}
    >
      <div className="relative aspect-auto w-full">
        <Image
          src={artwork.image}
          alt={artwork.alt}
          width={800} // intrinsic arbitrary width for layout
          height={1200} // intrinsic arbitrary height, preserves aspect ratio
          className="w-full h-auto object-cover"
        />
      </div>
    </button>
  );
}
```

- [ ] **Step 2: Verify component types**
Run: `npm run lint`
Expected: PASS

- [ ] **Step 3: Commit**
```bash
git add components/ui/ArtworkCard.tsx
git commit -m "feat: create ArtworkCard component"
```

---

### Task 4: Create GalleryLightbox Component

**Files:**
- Create: `components/ui/GalleryLightbox.tsx`

**Interfaces:**
- Consumes: `ArtworkItem` type.
- Produces: `GalleryLightbox` React component.

- [ ] **Step 1: Write component**
Create `components/ui/GalleryLightbox.tsx`. Client Component using `createPortal`.

```tsx
"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { XIcon, ArrowLeft, ArrowRight } from "@phosphor-icons/react";
import type { ArtworkItem } from "@/types";

interface GalleryLightboxProps {
  artworks: ArtworkItem[];
  initialIndex: number | null;
  onClose: () => void;
}

export function GalleryLightbox({ artworks, initialIndex, onClose }: GalleryLightboxProps) {
  const [currentIndex, setCurrentIndex] = React.useState<number | null>(initialIndex);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  React.useEffect(() => {
    if (currentIndex === null) {
      document.body.style.overflow = "unset";
      return;
    }
    
    document.body.style.overflow = "hidden";
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentIndex, onClose]);

  const handlePrev = React.useCallback(() => {
    setCurrentIndex((prev) => {
      if (prev === null) return null;
      return prev > 0 ? prev - 1 : artworks.length - 1;
    });
  }, [artworks.length]);

  const handleNext = React.useCallback(() => {
    setCurrentIndex((prev) => {
      if (prev === null) return null;
      return prev < artworks.length - 1 ? prev + 1 : 0;
    });
  }, [artworks.length]);

  if (!mounted || currentIndex === null) return null;

  const currentArtwork = artworks[currentIndex];

  const modalContent = (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/92 p-4 md:p-8"
      role="dialog"
      aria-modal="true"
      aria-label="Artwork viewer"
    >
      <button
        onClick={onClose}
        className="absolute right-4 top-4 md:right-8 md:top-8 z-10 flex h-11 w-11 items-center justify-center border-[3px] border-white bg-white text-nb-ink transition-transform hover:-translate-y-1 focus-visible:outline-[3px] focus-visible:outline-offset-4 focus-visible:outline-nb-blue"
        aria-label="Close"
      >
        <XIcon size={24} weight="bold" />
      </button>

      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 z-10 -translate-y-1/2 flex h-11 w-11 items-center justify-center border-[3px] border-white bg-white text-nb-ink transition-transform hover:-translate-x-1 focus-visible:outline-[3px] focus-visible:outline-offset-4 focus-visible:outline-nb-blue"
        aria-label="Previous artwork"
      >
        <ArrowLeft size={24} weight="bold" />
      </button>

      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 z-10 -translate-y-1/2 flex h-11 w-11 items-center justify-center border-[3px] border-white bg-white text-nb-ink transition-transform hover:translate-x-1 focus-visible:outline-[3px] focus-visible:outline-offset-4 focus-visible:outline-nb-blue"
        aria-label="Next artwork"
      >
        <ArrowRight size={24} weight="bold" />
      </button>

      <div className="relative w-full h-full max-w-[90vw] max-h-[90vh] flex items-center justify-center">
        <Image
          src={currentArtwork.image}
          alt={currentArtwork.alt}
          fill
          className="object-contain"
          sizes="(max-width: 1024px) 90vw, 90vw"
        />
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
```

- [ ] **Step 2: Verify component**
Run: `npm run lint`
Expected: PASS

- [ ] **Step 3: Commit**
```bash
git add components/ui/GalleryLightbox.tsx
git commit -m "feat: create GalleryLightbox component"
```

---

### Task 5: Create GallerySectionClient Component

**Files:**
- Create: `components/ui/GallerySectionClient.tsx`

**Interfaces:**
- Consumes: `ArtworkCard`, `GalleryLightbox`, `ArtworkItem` type.
- Produces: `GallerySectionClient` React component.

- [ ] **Step 1: Write component**
Create `components/ui/GallerySectionClient.tsx`. Client boundary holding masonry grid + lightbox.

```tsx
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
      <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
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
```

- [ ] **Step 2: Verify component**
Run: `npm run lint`
Expected: PASS

- [ ] **Step 3: Commit**
```bash
git add components/ui/GallerySectionClient.tsx
git commit -m "feat: create GallerySectionClient component"
```

---

### Task 6: Create GallerySection Component

**Files:**
- Create: `components/sections/GallerySection.tsx`

**Interfaces:**
- Consumes: `GalleryCategory`, `ArtworkItem` type, `GallerySectionClient`.
- Produces: `GallerySection` Server Component.

- [ ] **Step 1: Write component**
Create `components/sections/GallerySection.tsx`.

```tsx
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
```

- [ ] **Step 2: Verify component**
Run: `npm run lint`
Expected: PASS

- [ ] **Step 3: Commit**
```bash
git add components/sections/GallerySection.tsx
git commit -m "feat: create GallerySection component"
```

---

### Task 7: Create Gallery Page

**Files:**
- Create: `app/(main)/gallery/page.tsx`

**Interfaces:**
- Consumes: `GallerySection`, `galleryCategories`, `artworks` from `data/gallery.ts`.
- Produces: The main `/gallery` route page.

- [ ] **Step 1: Write page component**
Create `app/(main)/gallery/page.tsx`.

```tsx
import { Metadata } from "next";
import { galleryCategories, artworks } from "@/data/gallery";
import { GallerySection } from "@/components/sections/GallerySection";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Gallery | N4C",
  description: "Artwork by Nguyen Hung Cuong — book covers and digital pieces.",
};

export default function GalleryPage() {
  return (
    <main className="mx-auto w-full max-w-[1400px] px-4 py-8 md:px-8 md:py-16 lg:px-12">
      <div className="mb-12 md:mb-20">
        <SectionHeading title="Gallery" />
        <p className="mt-4 font-space text-lg text-nb-ink/80 md:text-xl max-w-2xl">
          Selected artwork — book covers and digital pieces.
        </p>
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
    </main>
  );
}
```

- [ ] **Step 2: Final Verification**
Run: `npm run build`
Expected: Build succeeds without type or lint errors. (Manual check locally using `npm run dev` to verify the `/gallery` page renders).

- [ ] **Step 3: Commit**
```bash
git add app/(main)/gallery/page.tsx
git commit -m "feat: create main gallery page"
```
