"use client";

import { useEffect, useRef } from "react";

export function CursorGrid() {
  const highlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // The parent element (e.g., section) needs to have relative position
    const parent = highlightRef.current?.parentElement;
    if (!parent) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = parent.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (highlightRef.current) {
        highlightRef.current.style.setProperty("--x", `${x}px`);
        highlightRef.current.style.setProperty("--y", `${y}px`);
      }
    };

    parent.addEventListener("mousemove", handleMouseMove);
    return () => parent.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      ref={highlightRef}
      className="absolute inset-0 z-0 pointer-events-none"
      style={{
        maskImage:
          "radial-gradient(circle 200px at var(--x, -1000px) var(--y, -1000px), black, transparent)",
        WebkitMaskImage:
          "radial-gradient(circle 200px at var(--x, -1000px) var(--y, -1000px), black, transparent)",
        backgroundImage:
          "linear-gradient(rgba(0,0,0, 0.12) 1px, transparent 2px), linear-gradient(90deg, rgba(0,0,0, 0.12) 2px, transparent 1px)",
        backgroundSize: "48px 48px",
      }}
    />
  );
}
