"use client";

import { useState, useEffect } from "react";

export function useScrollDirection(threshold = 50) {
  const [scrollDirection, setScrollDirection] = useState<"up" | "down">("up");
  const [isAtTop, setIsAtTop] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateScrollDirection = () => {
      const scrollY = window.scrollY;

      if (Math.abs(scrollY - lastScrollY) < 10) {
        ticking = false;
        return;
      }

      setIsAtTop(scrollY < threshold);
      setScrollDirection(scrollY > lastScrollY ? "down" : "up");
      lastScrollY = scrollY > 0 ? scrollY : 0;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollDirection);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll);
    // Initial check — deferred to avoid synchronous setState inside effect
    const initialCheck = setTimeout(() => {
      setIsAtTop(window.scrollY < threshold);
    }, 0);

    return () => {
      window.removeEventListener("scroll", onScroll);
      clearTimeout(initialCheck);
    };
  }, [threshold]);

  return { scrollDirection, isAtTop };
}
