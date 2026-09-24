# Gallery Page — Design Spec

**Date:** 2026-09-24  
**Author:** Brainstorming session  
**Status:** Approved

---

## 1. Goal

Add a `/gallery` route to the N4C portfolio that showcases Nguyen Hung Cuong's artwork (book covers, digital art, and future categories). The gallery is a full, separate page — not an anchor section on the home page — and targets the same recruiter/collaborator audience as the main portfolio while also serving as a secondary creative showcase.

**Primary target:** Recruiters and collaborators who already visited the portfolio and are curious about the design practice.  
**Non-goal:** The gallery must not overshadow the software engineering focus of the portfolio. It is clearly positioned as secondary.

---

## 2. Scope

### In scope
- New route: `app/(main)/gallery/page.tsx`
- New data layer: `data/gallery.ts`, `ArtworkItem` + `ArtworkCategory` types in `types/index.ts`
- New UI components: `GallerySection`, `GallerySectionClient`, `ArtworkCard`, `GalleryLightbox`
- Navbar entry: "Gallery" link added to `siteConfig.navItems`
- Initial artwork categories: `book-cover` and `other`
- CSS columns masonry layout (zero new dependencies)
- Lightbox overlay: image-only, keyboard navigable, accessible

### Out of scope
- Individual artwork detail pages (`/gallery/[slug]`) -- not needed
- Category filter tabs or sidebar -- sections are always visible (section-based scroll)
- Backend, CMS, or dynamic data
- Dark mode
- Download, share, or purchase flows

---

## 3. Data Layer

### Types -- `types/index.ts`

Extendable union -- add new categories here as needed:
  export type ArtworkCategory = "book-cover" | "other";

  export interface ArtworkItem {
    id: string;              // unique slug, e.g. "book-cover-01"
    title: string;           // display title
    category: ArtworkCategory;
    image: string;           // path relative to public/, e.g. "/images/gallery/book-cover/cover-01.jpg"
    year: string;            // e.g. "2024"
    alt: string;             // required, meaningful alt text for screen readers
    behanceUrl?: string;     // optional external link
  }

  export interface GalleryCategory {
    id: ArtworkCategory;
    label: string;           // human-readable: "Book Cover", "Other"
  }

To add a new category later:
1. Add to the ArtworkCategory union type
2. Add a GalleryCategory entry in data/gallery.ts
3. Add ArtworkItem entries with the new category

### Data file -- `data/gallery.ts`

  export const galleryCategories: GalleryCategory[] = [
    { id: "book-cover", label: "Book Cover" },
    { id: "other", label: "Other" },
  ];

  export const artworks: ArtworkItem[] = [
    // TODO: populate with real artwork once images are ready
  ];

### Image storage

  public/images/gallery/
    book-cover/    -- book cover images
    other/         -- other artwork images

---

## 4. Routing

- Route: `app/(main)/gallery/page.tsx`
- Inherits Navbar and Footer from `app/(main)/layout.tsx` -- no layout changes needed
- Server Component (no "use client")
- SEO metadata: title "Gallery | N4C", description about the artwork

---

## 5. Page Structure

  /gallery
  - Page heading: "Gallery" (SectionHeading component)
  - Sub-copy: "Selected artwork -- book covers and digital pieces."
  - For each GalleryCategory:
    - Category heading (h2, font-syne font-bold, border-b-[4px] border-nb-ink)
    - GallerySectionClient (Client Component)
      - ArtworkCard[] in masonry grid
      - GalleryLightbox overlay

---

## 6. Component Design

### GallerySection (Server Component)

Props: category: GalleryCategory, artworks: ArtworkItem[]

Renders category h2 heading + passes artworks to GallerySectionClient.

### GallerySectionClient (Client Component -- "use client")

Props: artworks: ArtworkItem[]
State: selectedIndex: number | null

Renders masonry grid of ArtworkCards + GalleryLightbox.
This is the ONLY Client boundary for the section.

### ArtworkCard (Client Component)

Props: artwork: ArtworkItem, onClick: () => void

Visual:
- next/image inside break-inside-avoid container
- Border: 3px solid var(--nb-ink)
- Shadow: 5px 5px 0 var(--nb-ink)
- Hover: translate(-2px, -2px) + shadow 8px 8px 0
- Transition: 150ms on transform only

### GalleryLightbox (Client Component -- "use client")

Props: artworks: ArtworkItem[], initialIndex: number | null, onClose: () => void

Behavior:
- fixed inset-0 overlay, rgba(0,0,0,0.92) background (justified for modal only)
- Centered image: max 90vh x 90vw, object-fit contain
- Close (XIcon) + Prev/Next buttons (ArrowLeft/ArrowRight icons)
- Button style: border-[3px] border-white, white bg, ink text
- Keyboard: Escape = close, ArrowLeft/Right = navigate
- Accessibility: role="dialog", aria-modal="true", aria-label="Artwork viewer", focus trap
- Reduced motion: no animation if prefers-reduced-motion: reduce
- Render via createPortal to document.body

---

## 7. Masonry Layout (CSS Columns, zero new dependencies)

Mobile:   columns: 1
Tablet:   columns: 2  (>=768px)
Desktop:  columns: 3  (>=1024px)
Gap: 16px between items
Each card: break-inside: avoid, margin-bottom: 16px

Note: CSS columns produces column-order (not row-order). Acceptable for artwork galleries.

---

## 8. Server/Client Boundary

  GallerySection (Server)
    h2 heading
    GallerySectionClient (Client) <-- boundary
      ArtworkCard (onClick -> state)
      ArtworkCard (onClick -> state)
      GalleryLightbox (reads + resets state)

---

## 9. Navbar Change

In data/site-config.ts, add to navItems:
  { label: "Gallery", href: "/gallery" }

Position: after "Skills" (last current item).
No Navbar code changes needed -- it already iterates navItems.

---

## 10. Files Changed / Created

| Action   | File |
|----------|------|
| Modified | types/index.ts -- ArtworkCategory, ArtworkItem, GalleryCategory |
| Modified | data/site-config.ts -- Gallery nav item |
| Created  | data/gallery.ts |
| Created  | app/(main)/gallery/page.tsx |
| Created  | components/sections/GallerySection.tsx |
| Created  | components/ui/GallerySectionClient.tsx |
| Created  | components/ui/ArtworkCard.tsx |
| Created  | components/ui/GalleryLightbox.tsx |
| Created  | public/images/gallery/book-cover/ (directory) |
| Created  | public/images/gallery/other/ (directory) |

---

## 11. Accessibility Checklist

- All ArtworkItem.alt fields must be meaningful (not "image" or "artwork")
- Lightbox: role="dialog", aria-modal="true", aria-label
- Focus trap active in lightbox; focus returns to triggering card on close
- Keyboard: Escape closes, ArrowLeft/Right navigate
- All buttons: visible :focus-visible styles + 44x44px min target size
- Section h2 headings maintain correct hierarchy under page h1

---

## 12. Out-of-Scope Decisions

- Lightbox text: image-only intentionally. Can add title/year below image later without data changes.
- Filter tabs: not needed for 2 categories. Revisit if 5+ categories arise.
- /gallery/[slug] pages: lightbox covers zoom requirement.
- react-masonry-css: rejected to avoid new dependencies. Revisit if ordering is a real complaint.
- behanceUrl field: in type for future use, not rendered in initial lightbox.
