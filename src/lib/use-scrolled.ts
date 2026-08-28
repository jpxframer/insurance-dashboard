"use client";

import { useEffect, useState } from "react";

/**
 * True once the page has scrolled past `threshold`.
 *
 * Used to fade in the mobile header's bottom border, so the bar reads as flush
 * with the page at rest and lifted off it once content slides underneath.
 */
export function useScrolled(threshold = 4) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > threshold);
    }

    // Run once on mount — a reload can restore a non-zero scroll position.
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return scrolled;
}
