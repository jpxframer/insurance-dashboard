"use client";

import type { ReactNode } from "react";
import { useScrolled } from "@/lib/use-scrolled";
import { cn } from "@/lib/cn";

/**
 * Pins a mobile page header's title row to the top of the viewport.
 *
 * `sticky` rather than the dashboard bar's `fixed`: the row keeps its place in
 * flow, so nothing below needs a matching top padding, and the rest of the
 * header — search, chips, tabs — scrolls away underneath it.
 *
 * The border is always present and only its colour animates, so the bar never
 * changes height and the page cannot jump. At rest it is transparent, leaving
 * the header's own bottom rule as the only line; once content slides under, it
 * fades in. Same treatment as `MobileHeader`, which is why both use
 * `useScrolled`.
 */
export function MobileStickyBar({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const scrolled = useScrolled();

  return (
    <div
      className={cn(
        "sticky top-0 z-30 border-b bg-white transition-colors duration-200 lg:hidden",
        scrolled ? "border-slate-200" : "border-transparent",
        className,
      )}
    >
      {children}
    </div>
  );
}
