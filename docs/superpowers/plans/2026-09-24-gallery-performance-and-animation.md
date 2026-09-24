# Gallery Performance Optimization & Animation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Optimize `/gallery` page performance (eliminate massive image payload bottlenecks and layout shifts) and add cohesive entrance and interaction animations referencing the existing Neubrutalist design language across the portfolio.

**Architecture:** 
1. **Performance:** Utilize `next/image` responsive `sizes` targeting masonry column widths (~350–450px) and `quality={80}`, paired with skeleton loading states and fade-in transitions on image load to prevent Cumulative Layout Shift (CLS) and save 70–85% bandwidth. Implement next/prev image preloading in the lightbox.
2. **Animation:** Integrate `AnimatedContent` (GSAP ScrollTrigger) for section headings, category dividers, and staggered entry of masonry artwork cards, matching the motion patterns in `Hero.tsx`, `Projects.tsx`, and `Journey.tsx`. Add smooth backdrop fade and tactile scale transitions to `GalleryLightbox`.

**Tech Stack:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, GSAP (via `AnimatedContent`), Phosphor Icons.

**Spec:** `docs/superpowers/specs/2026-09-24-gallery-page-design.md`

## Global Constraints

- Strict TypeScript enabled. No `any` types or unsafe casts.
- Follow Neubrutalist visual style (hard borders `3px`, offset shadows `5px 5px 0`, flat colors, square corners `border-radius: 0px`).
- Transitions limited to 120–180ms on `transform` and `opacity` only.
- Strict `prefers-reduced-motion` compliance across all animations.
- Must pass `npm run lint` and `npx tsc --noEmit`.

---

### Task 1: Optimize `ArtworkCard` Performance & Add Loading States

**Files:**
- Modify: `components/ui/ArtworkCard.tsx`

**Interfaces:**
- Consumes: `ArtworkItem` from `@/types`
- Produces: Enhanced `ArtworkCard` with responsive `sizes`, `quality={80}`, Neubrutalist skeleton placeholder, and smooth image fade-in.

- [x] **Step 1: Update `ArtworkCard.tsx` with responsive sizes, quality, and skeleton load state**

Update `components/ui/ArtworkCard.tsx` to handle loading state, responsive sizing, and aspect ratio container.

```tsx
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
```

- [x] **Step 2: Run linter and typecheck**

Run: `npm run lint` and `npx tsc --noEmit`
Expected: 0 errors

- [x] **Step 3: Commit Task 1**

```bash
git add components/ui/ArtworkCard.tsx
git commit -m "perf(gallery): optimize ArtworkCard with responsive sizes, quality, and skeleton loader"
```

---

### Task 2: Add Staggered Scroll Animations to Gallery Page & Sections

**Files:**
- Modify: `app/(main)/gallery/page.tsx`
- Modify: `components/sections/GallerySection.tsx`
- Modify: `components/ui/GallerySectionClient.tsx`

**Interfaces:**
- Consumes: `AnimatedContent` from `@/components/ui/AnimatedContent`
- Produces: Smooth entrance animations for Gallery header, category headers, and masonry artwork cards.

- [x] **Step 1: Animate Page Header in `app/(main)/gallery/page.tsx`**

Wrap `SectionHeading` in `AnimatedContent` for clean entrance on mount.

```tsx
import type { Metadata } from "next";
import { galleryCategories, artworks } from "@/data/gallery";
import { GallerySection } from "@/components/sections/GallerySection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import AnimatedContent from "@/components/ui/AnimatedContent";

export const metadata: Metadata = {
  title: "Gallery | N4C",
  description:
    "Selected artwork by Nguyen Hung Cuong — book covers and digital pieces.",
};

export default function GalleryPage() {
  return (
    <div className="mx-auto w-full max-w-[1400px] px-4 py-8 md:px-8 md:py-16 lg:px-12">
      <AnimatedContent direction="vertical" distance={40} duration={0.6} className="mb-12 md:mb-16">
        <SectionHeading
          title="Gallery"
          subtitle="Selected artwork — book covers and digital pieces."
        />
      </AnimatedContent>

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
```

- [x] **Step 2: Animate Category Headings in `components/sections/GallerySection.tsx`**

Wrap the category heading in `AnimatedContent` (`direction="horizontal"`, `distance={30}`).

```tsx
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
```

- [x] **Step 3: Stagger Card Entrance in `components/ui/GallerySectionClient.tsx`**

Wrap each `ArtworkCard` with `AnimatedContent` inside the CSS columns layout. Ensure `break-inside-avoid` and `mb-4` are applied to the wrapper to preserve flawless masonry flow. Stagger delays based on item column index (`(index % 6) * 0.07`).

```tsx
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
```

- [x] **Step 4: Run linter and typecheck**

Run: `npm run lint` and `npx tsc --noEmit`
Expected: 0 errors

- [x] **Step 5: Commit Task 2**

```bash
git add app/\(main\)/gallery/page.tsx components/sections/GallerySection.tsx components/ui/GallerySectionClient.tsx
git commit -m "feat(gallery): add staggered scroll animations matching site design system"
```

---

### Task 3: Enhance `GalleryLightbox` with Entrance Transitions and Image Preloading

**Files:**
- Modify: `components/ui/GalleryLightbox.tsx`

**Interfaces:**
- Consumes: `artworks` and `initialIndex`
- Produces: Animated, preloaded lightbox experience without flickering or abrupt pop-ups.

- [x] **Step 1: Update `GalleryLightbox.tsx` with smooth entrance animation and preloading**

Add modal open animation (`transition-opacity duration-200`), prefetching hidden `<Image />` for adjacent images (index - 1, index + 1) for instant Next/Prev switches, and tactile Neubrutalist button active states.

```tsx
"use client";

import * as React from "react";
import Image from "next/image";
import { createPortal } from "react-dom";
import {
  X as XIcon,
  ArrowLeft as ArrowLeftIcon,
  ArrowRight as ArrowRightIcon,
} from "@phosphor-icons/react";
import type { ArtworkItem } from "@/types";

interface GalleryLightboxProps {
  artworks: ArtworkItem[];
  initialIndex: number | null;
  onClose: () => void;
}

export function GalleryLightbox({
  artworks,
  initialIndex,
  onClose,
}: GalleryLightboxProps) {
  const [currentIndex, setCurrentIndex] = React.useState<number | null>(
    initialIndex
  );
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  React.useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

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

  React.useEffect(() => {
    if (currentIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") handlePrev();
      else if (e.key === "ArrowRight") handleNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [currentIndex, onClose, handlePrev, handleNext]);

  if (!isMounted || currentIndex === null || artworks.length === 0) return null;

  const currentArtwork = artworks[currentIndex];
  if (!currentArtwork) return null;

  const prevArtwork =
    artworks.length > 1
      ? artworks[currentIndex > 0 ? currentIndex - 1 : artworks.length - 1]
      : null;
  const nextArtwork =
    artworks.length > 1
      ? artworks[currentIndex < artworks.length - 1 ? currentIndex + 1 : 0]
      : null;

  const modalContent = (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/92 p-4 md:p-8 select-none transition-opacity duration-200"
      role="dialog"
      aria-modal="true"
      aria-label="Artwork viewer"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Hidden preloader for adjacent images */}
      {prevArtwork && (
        <div className="hidden" aria-hidden="true">
          <Image
            src={prevArtwork.image}
            alt=""
            width={1200}
            height={1600}
            priority
          />
        </div>
      )}
      {nextArtwork && (
        <div className="hidden" aria-hidden="true">
          <Image
            src={nextArtwork.image}
            alt=""
            width={1200}
            height={1600}
            priority
          />
        </div>
      )}

      {/* Close button */}
      <button
        type="button"
        onClick={onClose}
        className="absolute right-4 top-4 md:right-8 md:top-8 z-10 flex h-11 w-11 items-center justify-center border-[3px] border-white bg-white text-nb-ink shadow-[4px_4px_0_#fff] transition-all hover:-translate-y-1 active:translate-y-[2px] active:shadow-none focus-visible:outline-[3px] focus-visible:outline-offset-4 focus-visible:outline-nb-blue cursor-pointer"
        aria-label="Close"
      >
        <XIcon size={24} weight="bold" />
      </button>

      {/* Prev / Next controls */}
      {artworks.length > 1 && (
        <>
          <button
            type="button"
            onClick={handlePrev}
            className="absolute left-4 top-1/2 z-10 -translate-y-1/2 flex h-11 w-11 items-center justify-center border-[3px] border-white bg-white text-nb-ink shadow-[4px_4px_0_#fff] transition-all hover:-translate-x-1 active:translate-x-[2px] active:shadow-none focus-visible:outline-[3px] focus-visible:outline-offset-4 focus-visible:outline-nb-blue cursor-pointer"
            aria-label="Previous artwork"
          >
            <ArrowLeftIcon size={24} weight="bold" />
          </button>

          <button
            type="button"
            onClick={handleNext}
            className="absolute right-4 top-1/2 z-10 -translate-y-1/2 flex h-11 w-11 items-center justify-center border-[3px] border-white bg-white text-nb-ink shadow-[4px_4px_0_#fff] transition-all hover:translate-x-1 active:translate-x-[-2px] active:shadow-none focus-visible:outline-[3px] focus-visible:outline-offset-4 focus-visible:outline-nb-blue cursor-pointer"
            aria-label="Next artwork"
          >
            <ArrowRightIcon size={24} weight="bold" />
          </button>
        </>
      )}

      {/* Main Image Container */}
      <div className="relative w-full h-full max-w-[90vw] max-h-[90vh] flex items-center justify-center pointer-events-none">
        <Image
          key={currentArtwork.id}
          src={currentArtwork.image}
          alt={currentArtwork.alt}
          fill
          priority
          quality={85}
          className="object-contain transition-opacity duration-200"
          sizes="(max-width: 1024px) 90vw, 90vw"
        />
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
```

- [x] **Step 2: Run linter and typecheck**

Run: `npm run lint` and `npx tsc --noEmit`
Expected: 0 errors

- [x] **Step 3: Commit Task 3**

```bash
git add components/ui/GalleryLightbox.tsx
git commit -m "feat(gallery): add lightbox preloading, tactile hover/active states, and transitions"
```

---

### Task 4: Full System Verification & Build Test

**Files:**
- Entire repository verification

- [x] **Step 1: Execute production build**

Run: `npm run build`
Expected: Success with valid `/gallery` route generated.

- [x] **Step 2: Verify in browser**

Verify:
1. Gallery page `/gallery` loads smoothly without layout shifts or freeze.
2. Masonry cards stagger in as user scrolls down.
3. Lightbox opens cleanly, arrows switch immediately without black flash.
4. Esc key and backdrop click close modal.
