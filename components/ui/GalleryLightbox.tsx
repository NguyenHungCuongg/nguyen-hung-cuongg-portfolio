"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { XIcon, ArrowLeftIcon, ArrowRightIcon } from "@phosphor-icons/react";
import type { ArtworkItem } from "@/types";

interface GalleryLightboxProps {
  artworks: ArtworkItem[];
  initialIndex: number | null;
  onClose: () => void;
}

const emptySubscribe = () => () => {};

export function GalleryLightbox({
  artworks,
  initialIndex,
  onClose,
}: GalleryLightboxProps) {
  const [currentIndex, setCurrentIndex] = React.useState<number | null>(
    initialIndex
  );
  const [prevInitialIndex, setPrevInitialIndex] = React.useState<number | null>(
    initialIndex
  );

  if (initialIndex !== prevInitialIndex) {
    setPrevInitialIndex(initialIndex);
    setCurrentIndex(initialIndex);
  }

  const isMounted = React.useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );


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
  }, [currentIndex, onClose, handlePrev, handleNext]);

  if (!isMounted || currentIndex === null || artworks.length === 0) return null;

  const currentArtwork = artworks[currentIndex];
  if (!currentArtwork) return null;

  const modalContent = (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/92 p-4 md:p-8 select-none"
      role="dialog"
      aria-modal="true"
      aria-label="Artwork viewer"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute right-4 top-4 md:right-8 md:top-8 z-10 flex h-11 w-11 items-center justify-center border-[3px] border-white bg-white text-nb-ink transition-transform hover:-translate-y-1 focus-visible:outline-[3px] focus-visible:outline-offset-4 focus-visible:outline-nb-blue cursor-pointer"
        aria-label="Close"
      >
        <XIcon size={24} weight="bold" />
      </button>

      {artworks.length > 1 && (
        <>
          <button
            type="button"
            onClick={handlePrev}
            className="absolute left-4 top-1/2 z-10 -translate-y-1/2 flex h-11 w-11 items-center justify-center border-[3px] border-white bg-white text-nb-ink transition-transform hover:-translate-x-1 focus-visible:outline-[3px] focus-visible:outline-offset-4 focus-visible:outline-nb-blue cursor-pointer"
            aria-label="Previous artwork"
          >
            <ArrowLeftIcon size={24} weight="bold" />
          </button>

          <button
            type="button"
            onClick={handleNext}
            className="absolute right-4 top-1/2 z-10 -translate-y-1/2 flex h-11 w-11 items-center justify-center border-[3px] border-white bg-white text-nb-ink transition-transform hover:translate-x-1 focus-visible:outline-[3px] focus-visible:outline-offset-4 focus-visible:outline-nb-blue cursor-pointer"
            aria-label="Next artwork"
          >
            <ArrowRightIcon size={24} weight="bold" />
          </button>
        </>
      )}

      <div className="relative w-full h-full max-w-[90vw] max-h-[90vh] flex items-center justify-center pointer-events-none">
        <Image
          src={currentArtwork.image}
          alt={currentArtwork.alt}
          fill
          priority
          className="object-contain"
          sizes="(max-width: 1024px) 90vw, 90vw"
        />
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
